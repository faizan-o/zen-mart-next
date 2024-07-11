"use server";

import { db } from "@/lib/db";
import { ResponseData } from "@/types";
import { currentUser } from "./use-current-user";

export const addProductToWishlist = async ({
  productId,
}: {
  productId: string;
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
        wishlist: true,
      },
    });

    if (!fetchedUser) return { error: "User Not Found" };

    if (fetchedUser.wishlist.includes(productId)) {
      return { success: "Already Present In The Wishlist" };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        wishlist: {
          push: productId,
        },
      },
    });
    return { success: "Added To Wishlist!" };
  } catch (err) {
    return { error: "Item Could Not Be Added To Wishlist" };
  }
};

export const deleteCurrentProductFromWishlist = async (
  productId: string
): Promise<boolean> => {
  try {
    const user = await currentUser();

    if (!user) return false;

    const fetchedUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        wishlist: true,
      },
    });

    if (!fetchedUser) return false;

    const newWishlist = fetchedUser.wishlist.filter((p) => p !== productId);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        wishlist: newWishlist,
      },
    });

    return true;
  } catch (err) {
    return false;
  }
};
