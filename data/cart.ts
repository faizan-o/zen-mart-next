"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CheckOutProduct } from "@/types";

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
