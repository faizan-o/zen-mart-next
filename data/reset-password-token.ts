import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export const getResetPasswordTokenByEmail = async (email: string): Promise<PasswordResetToken | null> => {
    try {
        const user = await db.passwordResetToken.findFirst({
            where: { email },
        });

        return user;
    } catch (err) {
        return null;
    }
}

export const getResetPasswordTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    const user = await db.passwordResetToken.findFirst({
      where: { token },
    });

    return user;
  } catch (err) {
    return null;
  }
};