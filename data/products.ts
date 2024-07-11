"use server";

import { db } from "@/lib/db";
import { ProductsWithIdAndName } from "@/types";
import { Product } from "@prisma/client";

export const getAllProducts = async ({
  start,
  end,
}: {
  start: number;
  end: number;
}): Promise<Product[] | null> => {
  try {
    const products = await db.product.findMany({
      skip: start,
      take: end - start,
    });
    return products;
  } catch (e) {
    return null;
  }
};

export const getAllProductsIdAndName = async (): Promise<
  ProductsWithIdAndName[] | null
> => {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        discount: true,
        price: true,
      },
    });
    return products;
  } catch (e) {
    return null;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    return product;
  } catch (e) {
    return null;
  }
};

export const getAllProductsCount = async (): Promise<number | null> => {
  try {
    const _count = await db.product.count();
    return _count;
  } catch (e) {
    return null;
  }
};

export const getProductsByCategoryId = async (
  categoryId: string,
  quantity: number | undefined
): Promise<Product[] | null> => {
  try {
    const products = await db.product.findMany({
      where: { categoryId: categoryId },
      take: quantity,
    });
    return products;
  } catch (e) {
    return null;
  }
};
