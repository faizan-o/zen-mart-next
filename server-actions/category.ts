"use server";

import { EditCategorySchema, NewCategorySchema } from "@/schemas";
import * as z from "zod";
import { currentUser } from "./use-current-user";
import { ResponseData } from "../types";
import { db } from "@/lib/db";
import { getAllCategories } from "@/data/categories";

export const createCategory = async (
  values: z.infer<typeof NewCategorySchema>
): Promise<ResponseData> => {
  const user = await currentUser();

  if (!user) return { error: "Not Logged In" };
  if (user.role.toString() === "USER") return { error: "Not An Admin" };

  const validated = NewCategorySchema.safeParse(values);

  if (!validated.success) return { error: "Invalid Input!" };

  const allCategories = await getAllCategories();

  const isDuplicate = allCategories?.some(
    (category) => category.type === validated.data.type
  );

  if (isDuplicate) return { error: "Duplicate Category" };

  try {
    await db.category.create({
      data: {
        type: validated.data.type,
      },
    });
  } catch (err) {
    return { error: "Something Went Wrong!" };
  }

  return { success: "Category Created Successfully" };
};

export const deleteCategory = async (id: string) => {
  try {
    await db.category.delete({
      where: { id },
    });
  } catch (e) {}
};

export const updateCategory = async (
  id: string,
  values: z.infer<typeof EditCategorySchema>
): Promise<ResponseData> => {
  const validated = EditCategorySchema.safeParse(values);

  if (!validated.success) return { error: "Invalid Input!" };

  try {
    await db.category.update({
      where: { id },
      data: {
        type: validated.data.type,
      },
    });
    return { success: "Updated Successfully" };
  } catch (e) {
    return { error: "Something Went Wrong" };
  }
};
