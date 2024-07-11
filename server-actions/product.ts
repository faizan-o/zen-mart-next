"use server";

import { db } from "@/lib/db";
import { NewProductSchema, UpdateProductSchema } from "@/schemas";
import { ResponseData } from "@/types";
import * as z from "zod";
import { currentRole } from "./use-current-role";

export const createProduct = async (
  values: z.infer<typeof NewProductSchema>
): Promise<ResponseData> => {
  const isAdmin = (await currentRole()) === "ADMIN";
  if (!isAdmin) return { error: "Not An Admin" };

  const validatedFields = NewProductSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Input" };

  const { name, description, price, isOnSale, discount, image, categoryId } =
    validatedFields.data;

  if (!image) return { error: "No Image Found!" };

  const floatPrice = parseFloat(price);
  const floatDiscount =
    discount && discount !== "00" ? parseFloat(discount) : undefined;
  try {
    if (isOnSale) {
      await db.product.create({
        data: {
          name,
          price: floatPrice,
          description,
          image,
          isOnSale,
          discount: floatDiscount,
          categoryId,
        },
      });
      return { success: "Product Created Successfully" };
    }

    await db.product.create({
      data: {
        name,
        price: floatPrice,
        description,
        image,
        isOnSale,
        categoryId,
      },
    });

    return { success: "Product Created Successfully" };
  } catch (e) {
    return { error: "Something Went Wrong" };
  }
};

export const updateProduct = async (
  values: z.infer<typeof UpdateProductSchema>,
  productId: string
): Promise<ResponseData> => {
  const isAdmin = (await currentRole()) === "ADMIN";
  if (!isAdmin) return { error: "Not An Admin" };

  const validatedFields = UpdateProductSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Input" };

  const { name, description, price, isOnSale, discount, categoryId } =
    validatedFields.data;

  const floatPrice = parseFloat(price);
  const floatDiscount =
    discount && discount !== "00" ? parseFloat(discount) : undefined;
  try {
    if (isOnSale) {
      await db.product.update({
        where: {
          id: productId,
        },
        data: {
          name,
          price: floatPrice,
          description,
          isOnSale,
          discount: floatDiscount,
          categoryId,
        },
      });
      return { success: "Product Updated Successfully" };
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price: floatPrice,
        description,
        isOnSale,
        categoryId,
      },
    });

    return { success: "Product Updated Successfully" };
  } catch (_) {
    return { error: "Something Went Wrong" };
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const isAdmin = (await currentRole()) === "ADMIN";
  if (!isAdmin) return;

  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
  } catch (_) {}
};
