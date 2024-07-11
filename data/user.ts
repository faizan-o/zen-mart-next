"use server";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { FetchedUsers } from "@/types";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    return user;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async (): Promise<FetchedUsers[] | null> => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        role: true,
        isTwoFactorEnabled: true,
        emailVerified: true,
      },
    });
    return users;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    return null;
  }
};
