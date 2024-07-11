"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { ResponseData } from "../types";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/mail";

export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<ResponseData> => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Email!" };

  const email = validatedFields.data.email;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email Does Not Exist!" };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Confirmation Email Sent!" };
};
