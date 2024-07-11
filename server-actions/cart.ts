"use server";

import { db } from "@/lib/db";
import { CheckOutProduct, ResponseData } from "@/types";
import { currentUser } from "./use-current-user";
import { getProductById } from "@/data/products";

export const addProductToCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<ResponseData> => {
  try {
    const user = await currentUser();

    if (!user) return { error: "Not Logged In" };

    const fetchedUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        cart: true,
      },
    });

    if (!fetchedUser) return { error: "User Not Found" };

    if (fetchedUser.cart.find((p) => p.id === productId)) {
      return { success: "Already Present In The Cart" };
    }

    const product = {
      id: productId,
      quantity: quantity,
    };

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: {
          push: product,
        },
      },
    });
    return { success: "Added To Cart!" };
  } catch (err) {
    return { error: "Item Could Not Be Added To Cart" };
  }
};

export const updateUserCart = async (
  products: CheckOutProduct[] | null
): Promise<boolean> => {
  try {
    const user = await currentUser();

    if (!user) return false;

    if (products) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          cart: products,
        },
      });
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteProductFromCart = async (
  productId: string
): Promise<ResponseData> => {
  try {
    const user = await currentUser();

    if (!user) return { error: "Not Logged In" };

    const fetchedUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        cart: true,
      },
    });

    if (!fetchedUser) return { error: "User Not Found" };

    if (!fetchedUser.cart.find((p) => p.id === productId)) {
      return { success: "Item Not Present In The Cart" };
    }

    const newCartProductsIds: CheckOutProduct[] = fetchedUser.cart.filter(
      (p) => p.id !== productId
    );

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: newCartProductsIds,
      },
    });

    return { success: "Removed Item From The Cart" };
  } catch (err) {
    return { error: "Item Could Not Be Deleted From Cart" };
  }
};
