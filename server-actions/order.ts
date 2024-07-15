"use server";

import { ResponseData } from "@/types";
import { currentUser } from "./use-current-user";
import { CheckoutSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { OrderProduct } from "@prisma/client";

export const createOrder = async (
  values: z.infer<typeof CheckoutSchema>,
  cartProducts: OrderProduct[] | null
): Promise<ResponseData & { orderId?: string }> => {
  try {
    if (!cartProducts || cartProducts.length === 0)
      return { error: "Cart Is Empty!" };

    const user = await currentUser();
    if (!user || !user.id) return { error: "You Are Not Logged In" };

    const validatedFields = CheckoutSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid Input!" };

    const {
      customerName,
      customerEmail,
      customerCountry,
      customerState,
      customerZipCode,
      paymentMethod,
      customerCity,
      customerAddress,
      customerPhoneNumber,
      hasBeenPaid,
      totalPrice,
    } = validatedFields.data;

    const createdAt = new Date();
    const estimatedDeliveryTime = new Date(
      createdAt.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    const order = await db.order.create({
      data: {
        customerId: user.id,
        customerName,
        customerEmail,
        customerCountry,
        customerState,
        customerZipCode,
        customerCity,
        customerAddress,
        customerPhoneNumber,
        paymentMethod,
        createdAt,
        estimatedDeliveryTime,
        products: cartProducts,
        hasBeenPaid: false,
        totalPrice,
        isDelivered: false,
      },
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: [],
      },
    });

    if (paymentMethod === "OnlinePayment") {
      return {
        success: "Order Placed Successfully!",
        orderId: order.id,
      };
    }

    return { success: "Order Placed Successfully!" };
  } catch (err) {
    return { error: "Something Went Wrong" };
  }
};

export const payOrder = async (orderId: string) => {
  await db.order.update({
    where: { id: orderId },
    data: { hasBeenPaid: true },
  });
};

export const toogleCurrentOrderDelivered = async ({
  id,
  current,
}: {
  id: string;
  current: boolean;
}) => {
  try {
    await db.order.update({
      where: { id },
      data: { isDelivered: !current, deliveredAtTime: new Date() },
    });
  } catch (err) {}
};
