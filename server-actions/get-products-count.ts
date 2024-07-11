"use server";

import { db } from "@/lib/db";

export const getProductsCount = async (): Promise<{
  [key: string]: number;
} | null> => {
  try {
    const result = await db.product.groupBy({
      by: ["categoryId"],
      _count: {
        categoryId: true,
      },
    });

    const counts: any = result.reduce((acc, cur) => {
      // @ts-ignore
      acc[cur.categoryId] = cur._count.categoryId;
      return acc;
    }, {});

    return counts;
  } catch (e) {
    return null;
  }
};
