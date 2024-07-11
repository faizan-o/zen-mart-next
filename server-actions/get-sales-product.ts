"use server";

import { db } from "@/lib/db";
import { Product } from "@prisma/client";

export const getSalesProduct = async (
  count: number
): Promise<Product[] | null> => {
  try {
    const salesProducts = await db.product.findMany({
      orderBy: {
        discount: "desc",
      },
      take: count,
    });

    return salesProducts;
  } catch (err) {
    return null;
  }
};
