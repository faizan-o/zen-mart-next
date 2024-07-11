"use server";

import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { ResponseData } from "../types";
import { db } from "@/lib/db";

export const updateData = async (
  values: z.infer<typeof SettingsSchema>,
  userId: string | undefined
): Promise<ResponseData> => {
  if (!userId) return { error: "User Does Not Exist!" };

  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Inputs!" };

  const { name, isTwoFactorEnabled } = validatedFields.data;

  if (!name) return { error: "Name Cannot Be Blank" };

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name,
        isTwoFactorEnabled,
      },
    });
  } catch (err) {
    return { error: "Something Went Wrong" };
  }

  return { success: "Updated Data Successfully" };
};
