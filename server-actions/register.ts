"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import type { VerificationToken } from "@prisma/client";
import { ResponseData } from "../types";

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<ResponseData> => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Exception Occurred: Invalid Fields" };
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: "Email Already Exists" };

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken: VerificationToken =
      await generateVerificationToken(email);

    const res = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification Email Sent." };
  } catch (err) {
    return { error: "Something Went Wrong!" };
  }
};
