"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getProductById } from "./products";
import { Product } from "@prisma/client";

export const getWishlistProducts = async (): Promise<
  (Product | null)[] | null
> => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) return null;

    const products = await Promise.all(
      existingUser.wishlist.map(async (pId) => await getProductById(pId))
    );

    return products;
  } catch (e) {
    return null;
  }
};
