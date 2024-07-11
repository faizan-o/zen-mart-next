import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByEmail = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    const vfToken: VerificationToken | null =
      await db.verificationToken.findFirst({
        where: { email },
      });
    return vfToken;
  } catch (e) {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const vfToken: VerificationToken | null =
      await db.verificationToken.findFirst({
        where: { token },
      });
    return vfToken;
  } catch (e) {
    return null;
  }
};
