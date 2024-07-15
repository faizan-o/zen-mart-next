"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { Badge } from "@/components/ui/badge";
import { getUserOrders } from "@/data/orders";
import { Order } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getUserOrders();
      setOrders(orders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="px-5 py-10 min-h-full">
      {loading && <ScaleLoader color="cyan" height={10} />}
      {(!orders || orders.length === 0) && (
        <div className="min-h-[50vh] flex justify-center items-center">
          <h1 className="text-center font-bold text-3xl">No Orders Found</h1>
        </div>
      )}
      {orders && orders.length > 0 && (
        <div className="flex justify-center items-center flex-wrap mt-5">
          {orders.map((order) => {
            const twoDaysLater =
              order.deliveredAtTime && new Date(order.deliveredAtTime);
            twoDaysLater && twoDaysLater.setDate(twoDaysLater.getDate() + 2);

            if (
              !order.isDelivered ||
              (order.deliveredAtTime &&
                twoDaysLater &&
                new Date() < twoDaysLater)
            ) {
              return (
                <CardWrapper
                  headerHeading="Order Details"
                  headerLabel="Your Order Details"
                  className="h-[450px]"
                >
                  <div className="space-y-5">
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Products</h1>
                      <p>
                        {order.products.reduce(
                          (acc, cur) => acc + cur.quantity,
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between text-white">
                      <h1 className="font-semibold">Is Delivered</h1>
                      {order.isDelivered ? (
                        <Badge className="bg-green-600 text-white">YES</Badge>
                      ) : (
                        <Badge className="bg-red-600 text-white">NO</Badge>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Order Placed</h1>
                      {order.createdAt.toDateString()}
                    </div>
                    {!order.isDelivered && (
                      <div className="flex justify-between">
                        <h1 className="font-semibold">Estimated Delivery</h1>
                        {order.estimatedDeliveryTime.toDateString()}
                      </div>
                    )}
                    {order.isDelivered && order.deliveredAtTime && (
                      <div className="flex justify-between">
                        <h1 className="font-semibold">Estimated Delivery</h1>
                        {order.deliveredAtTime.toDateString()}
                      </div>
                    )}
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Payment Method</h1>
                      {order.paymentMethod}
                    </div>
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Is Paid</h1>
                      {order.hasBeenPaid ? (
                        <Badge className="bg-green-600 text-white">YES</Badge>
                      ) : (
                        <Badge className="bg-red-600 text-white">NO</Badge>
                      )}
                    </div>
                    <div className="flex justify-around border-y-2 my-2 py-2 border-white">
                      <h1 className="font-semibold">Total Price</h1>
                      <p>{order.totalPrice}$</p>
                    </div>
                  </div>
                </CardWrapper>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
