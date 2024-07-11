"use server";

import { db } from "@/lib/db";

export const makeAdmin = async (
  userId: string,
  currentRole: string
): Promise<void> => {
  try {
    if (currentRole === "ADMIN") {
      await db.user.update({
        where: { id: userId },
        data: { role: "USER" },
      });
      return;
    }
    await db.user.update({
      where: { id: userId },
      data: { role: "ADMIN" },
    });
  } catch (err) {}
};
