"use server";

import { db } from "@/lib/db";
import { AnalyticalCounts, CategoryRevenue } from "@/types";

export const getCounts = async (): Promise<AnalyticalCounts> => {
  const productsCount = await db.product.count();
  const usersCount = await db.user.count();
  const ordersCount = await db.order.count();
  const categoriesCount = await db.category.count();
  const campaignsCount = await db.campaign.count();
  const aggregation = await db.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });
  const revenue = aggregation._sum.totalPrice || 0;

  return {
    productsCount,
    usersCount,
    ordersCount,
    categoriesCount,
    campaignsCount,
    revenue,
  };
};

export const getCategoryRevenue = async (): Promise<
  CategoryRevenue[] | null
> => {
  try {
    const categories = await db.category.findMany({});
    const categoryRevenue = categories.map(async (category) => {
      const categorySum = await db.product.aggregate({
        where: { categoryId: category.id },
        _sum: {
          price: true,
        },
      });

      const productCount = await db.product.count({
        where: { categoryId: category.id },
      });
      return {
        categoryName: category.type,
        revenue: categorySum._sum.price || 0,
        productCount: productCount,
      };
    });
    const data = await Promise.all(categoryRevenue);
    return data;
  } catch {
    return null;
  }
};
