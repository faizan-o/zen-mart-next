"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CartProduct, CheckOutProduct } from "@/types";
import { getProductById } from "@/data/products";

export const getCurrentUserCart = async (): Promise<
  CheckOutProduct[] | null
> => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const fetchedUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        cart: true,
      },
    });

    if (!fetchedUser) return null;

    const cartProductIds = fetchedUser.cart;
    if (!cartProductIds) return null;

    return fetchedUser.cart;
  } catch (err) {
    return null;
  }
};

export const getCurrentUserCartWithProducts = async (): Promise<
  CartProduct[] | null
> => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const fetchedUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        cart: true,
      },
    });

    if (!fetchedUser) return null;

    const cartProductIds = fetchedUser.cart;
    if (!cartProductIds) return null;

    const products = await Promise.all(
      fetchedUser.cart.map(async (p) => {
        const product = await getProductById(p.id);
        if (product)
          return {
            ...product,
            quantity: p.quantity,
          };
      })
    );

    return products.filter((product) => product !== undefined);
  } catch (err) {
    return null;
  }
};
