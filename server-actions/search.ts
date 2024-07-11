"use server";

import { db } from "@/lib/db";
import { SearchProductRespone } from "@/types";
import { Product } from "@prisma/client";

export const searchProducts = async (
  query: string
): Promise<SearchProductRespone[] | null> => {
  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: query,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
      },
      take: 5,
    });
    return products;
  } catch (err) {
    return null;
  }
};

export const adminSearchProductsByCategory = async ({
  query,
  start,
  end,
}: {
  query: string;
  start: number;
  end: number;
}): Promise<Product[] | null> => {
  try {
    const category = await db.category.findFirst({
      where: {
        OR: [
          {
            type: {
              startsWith: query,
              mode: "insensitive",
            },
          },
          {
            type: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const products = await db.product.findMany({
      where: { categoryId: category?.id },
      skip: start,
      take: end - start,
    });
    return products;
  } catch (err) {
    return null;
  }
};

export const adminSearchProductsByTitleOrDescription = async ({
  query,
  start,
  end,
}: {
  query: string;
  start: number;
  end: number;
}): Promise<Product[] | null> => {
  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: query,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: start,
      take: end - start,
    });

    return products;
  } catch (err) {
    return null;
  }
};
