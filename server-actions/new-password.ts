"use server";

import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";
import { ResponseData } from "../types";
import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null
): Promise<ResponseData> => {
  if (!token) return { error: "Missing Token!" };

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) return { error: "Invalid Token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Expired Token!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Account Does Not Exist" };

  const validateFields = ResetPasswordSchema.safeParse(values);

  if (!validateFields.success) return { error: "Invalid Password" };

  const { password } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password Updated!" };
};
