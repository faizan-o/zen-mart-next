"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import type { VerificationToken } from "@prisma/client";
import { ResponseData } from "../types";

type NullableToken = VerificationToken | null;

export const newVerification = async (token: string): Promise<ResponseData> => {
  const existingToken: NullableToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token Does Not Exist" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token Has Expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Account Does Not Exist" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Account Verified" };
};
