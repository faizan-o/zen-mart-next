"use server";

import { db } from "@/lib/db";
import { NewCampaignSchema } from "@/schemas";
import { ResponseData } from "@/types";
import * as z from "zod";
import { currentRole } from "./use-current-role";
import { Campaign, Product } from "@prisma/client";

export const createCampaign = async (
  values: z.infer<typeof NewCampaignSchema>
): Promise<ResponseData> => {
  const isAdmin = (await currentRole()) === "ADMIN";

  if (!isAdmin) return { error: "Not An Admin" };

  const validatedFields = NewCampaignSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Input!" };

  const {
    name,
    image,
    productOrCategoryUrl,
    typeCondition,
    priceCondition,
    discountToSet,
    productId,
    categoryId,
    priceCoefficient,
  } = validatedFields.data;

  if (!image) return { error: "Image Is Required" };

  if (!discountToSet) return { error: "Discount Is Required" };
  const floatDiscount = parseFloat(parseFloat(discountToSet).toFixed(2));

  if (!floatDiscount) return { error: "Invalid Discount!" };

  if (typeCondition === "PRODUCT") {
    if (!productId) return { error: "Product Is Required" };

    try {
      await db.product.update({
        where: { id: productId },
        data: {
          isOnSale: true,
          discount: floatDiscount,
        },
      });

      await db.campaign.create({
        data: {
          name,
          image,
          productOrCategoryUrl,
          type: typeCondition,
          discountSet: floatDiscount,
          modifiedProductIds: [productId],
        },
      });
    } catch (error) {
      return { error: "Something Went Wrong!" };
    }
  }

  if (typeCondition === "CATEGORY") {
    if (!categoryId) return { error: "Product Is Required" };
    const modifiedProductIds: string[] = [];
    try {
      const updatedProducts = await db.product.updateMany({
        where: {
          categoryId: categoryId,
        },
        data: {
          isOnSale: true,
          discount: floatDiscount,
        },
      });

      const modifiedProducts: { id: string }[] = await db.product.findMany({
        where: { categoryId },
        select: {
          id: true,
        },
      });

      modifiedProducts.forEach((product) =>
        modifiedProductIds.push(product.id)
      );

      await db.campaign.create({
        data: {
          name,
          discountSet: floatDiscount,
          image,
          productOrCategoryUrl,
          type: typeCondition,
          modifiedCategoryId: categoryId,
          modifiedProductIds,
        },
      });
    } catch (error) {
      return { error: "Something Went Wrong!" };
    }
  }

  if (typeCondition === "PRICE") {
    if (!priceCoefficient) return { error: "Price Coefficient Is Required!" };
    const floatPriceCoefficient = parseFloat(
      parseFloat(priceCoefficient).toFixed(2)
    );
    if (!floatPriceCoefficient)
      return { error: "Price Coefficient Is Invalid!" };
    if (!priceCondition || !priceCondition)
      return { error: "Price and PriceCondition Is Required" };

    const modifiedProductIds: string[] = [];

    if (priceCondition === "LESSTHAN") {
      const modifiedProducts = await db.product.findMany({
        where: {
          price: {
            lt: floatPriceCoefficient,
          },
        },
        select: {
          id: true,
        },
      });

      if (!modifiedProducts) return { error: "No Products Match Condition" };

      await db.product.updateMany({
        where: {
          price: {
            lt: floatPriceCoefficient,
          },
        },
        data: {
          isOnSale: true,
          discount: floatDiscount,
        },
      });

      modifiedProducts.forEach((product) =>
        modifiedProductIds.push(product.id)
      );
    }

    if (priceCondition === "GREATERTHAN") {
      const modifiedProducts = await db.product.findMany({
        where: {
          price: {
            gt: floatPriceCoefficient,
          },
        },
        select: {
          id: true,
        },
      });

      if (!modifiedProducts) return { error: "No Products Match Condition" };

      await db.product.updateMany({
        where: {
          price: {
            gt: floatPriceCoefficient,
          },
        },
        data: {
          isOnSale: true,
          discount: floatDiscount,
        },
      });

      modifiedProducts.forEach((product) =>
        modifiedProductIds.push(product.id)
      );
    }

    await db.campaign.create({
      data: {
        name,
        image,
        productOrCategoryUrl,
        discountSet: floatDiscount,
        type: typeCondition,
        priceCoefficient: floatPriceCoefficient,
        priceCondition,
        modifiedProductIds,
      },
    });

    try {
    } catch (error) {
      return { error: "Something Went Wrong!" };
    }
  }

  return { success: `Successfully Created ${typeCondition} Campaign` };
};

export const deleteCampaign = async (campaign: Campaign): Promise<void> => {
  try {
    campaign.modifiedProductIds.map(async (_id) => {
      await db.product.update({
        where: {
          id: _id,
        },
        data: {
          isOnSale: false,
          discount: undefined,
        },
      });
    });
    await db.campaign.delete({
      where: {
        id: campaign.id,
      },
    });
  } catch (error) {}
};
