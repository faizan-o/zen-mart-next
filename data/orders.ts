"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Order } from "@prisma/client";

export const getUserOrders = async (): Promise<Order[] | null> => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const orders = await db.order.findMany({
      where: {
        customerId: user.id,
      },
    });

    return orders;
  } catch (e) {
    return null;
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    return order;
  } catch (e) {
    return null;
  }
};

export const getAllOrdersCount = async (): Promise<number> => {
  try {
    const ordersCount = await db.order.count();
    return ordersCount;
  } catch (e) {
    return 0;
  }
};

export const getAllOrders = async ({
  start,
  end,
}: {
  start: number;
  end: number;
}): Promise<Order[] | null> => {
  try {
    const orders = await db.order.findMany({
      skip: start,
      take: end - start,
    });
    return orders;
  } catch (e) {
    return null;
  }
};
