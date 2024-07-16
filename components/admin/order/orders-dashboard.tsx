"use client";

import { useEffect, useState} from "react";
import { getAllOrders } from "@/data/orders";
import { Order } from "@prisma/client";
import OrdersSection from "./orders-section";

const OrdersDashboard = () => {
  const [orers, setOrders] = useState<Order[] | null>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders({
          start: 0,
          end: 10,
        });
        setOrders(fetchedOrders);
      } catch (error) {}
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col px-4">
      <section className="w-full py-5 mt-5 mb-10 shadow-gray-900 shadow-2xl border-[1px] border-gray-600 rounded-md px-4">
        <h1 className="font-semibold text-3xl pb-5">Customer Orders</h1>
        <div className="h-1 bg-gray-600 w-full rounded-full" />
        <OrdersSection />
      </section>
    </div>
  );
};

export default OrdersDashboard;
