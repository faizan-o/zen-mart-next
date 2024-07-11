"use server";

import { db } from "@/lib/db";
import type { Category } from "@prisma/client";

export const getAllCategories = async (): Promise<Category[] | null> => {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (e) {
    return null;
  }
};

export const getCategoryById = async (id: string): Promise<Category | null> => { 
  try {
    const category = await db.category.findUnique({
      where: {id}
    })
    return category;
  } catch (err) {
    return null;
  }
}

