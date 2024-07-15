"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import {
  sendTwoFactorAuthenticationTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DefaultRedirectAfterLogin } from "@/routes";
import { LoginSchema } from "@/schemas";
import type { VerificationToken } from "@prisma/client";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginResponseData } from "../types";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackURL?: string | null
): Promise<LoginResponseData> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Exception Occurred: Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);


  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Credentials Don't Exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken: VerificationToken =
      await generateVerificationToken(email);

    const res = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation Email Sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: "Invalid Code!" };
      if (twoFactorToken.token !== code) return { error: "Invalid Code!" };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) return { error: "Expired Code!" };

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorAuthenticationTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );

      return { isTwoFactorAuthentication: true };
    }
  }

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: callbackURL || DefaultRedirectAfterLogin,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "AccessDenied":
          return { error: "Invalid Credentials!" };
        case "CallbackRouteError":
          return { error: "Wrong Email Or Password!" };
        default:
          return { error: "Something Went Wrong!" };
      }
    }
    throw err;
  }
  return { success: "Login Successful!" };
};
