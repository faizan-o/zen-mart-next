import { db } from "@/lib/db";
import { TwoFactorToken, User } from "@prisma/client";

export const getTwoFactorTokenByEmail = async (
  email: string
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch (err) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (
  token: string
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (err) {
    return null;
  }
};
