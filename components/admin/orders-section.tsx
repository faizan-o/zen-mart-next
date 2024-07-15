"use client";

import { Order } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { BarLoader, ScaleLoader } from "react-spinners";
import { getAllOrders, getAllOrdersCount } from "@/data/orders";
import { Switch } from "../ui/switch";
import { toogleCurrentOrderDelivered } from "@/server-actions/order";
import { toast } from "sonner";
import { MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const OrdersSection = () => {
  const [orders, setOrders] = useState<Order[] | null>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const itemsPerPage = 10;

  const toogleOrderDelivered = ({
    current,
    id,
  }: {
    current: boolean;
    id: string;
  }) => {
    toast("Updating Order");
    startTransition(async () => {
      await toogleCurrentOrderDelivered({
        current,
        id,
      });
    });
  };

  const OrderReusable = ({ order }: { order: Order }) => {
    return (
      <Collapsible
        key={order.id}
        className="rounded-md border-2 border-gray-600 mt-5 px-2 sm:px-10 py-5"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-5">
          {order.isDelivered ? <FaCheckCircle className="text-2xl" /> : <MdPending />}
            <div>
              <h1>{order.id}</h1>
              <p className="text-[12px] font-semibold text-gray-500 w-[70%]">
                {order.createdAt.toDateString()}
              </p>
            </div>
          </div>
          <CollapsibleTrigger className="border-[1px] border-white p-1 h-fit rounded-md">
            <ChevronDownIcon />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 mt-5">
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer ID</h1>
            <p>{order.customerId}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer Name</h1>
            <p>{order.customerName}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer Country</h1>
            <p>{order.customerCountry}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer State</h1>
            <p>{order.customerState}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer City</h1>
            <p>{order.customerCity}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer Address</h1>
            <p className="line-clamp-1">{order.customerAddress}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer Email</h1>
            <p>{order.customerEmail}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Customer Zip Code</h1>
            <p>{order.customerZipCode}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Order Placed</h1>
            <p>{order.createdAt.toDateString()}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Estimated Delivery</h1>
            <p>{order.estimatedDeliveryTime.toDateString()}</p>
          </div>
          <div className="flex justify-between items-center py-1">
            <h1 className="font-semibold">IsDelivered</h1>
            <Switch
              checked={order.isDelivered}
              onCheckedChange={(e) =>
                toogleOrderDelivered({
                  current: order.isDelivered,
                  id: order.id,
                })
              }
            />
          </div>
          {order.isDelivered && order.deliveredAtTime && (
            <div className="flex justify-between">
              <h1 className="font-semibold">Delivered At</h1>
              <p>{order.deliveredAtTime.toDateString()}</p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const ProductsSectionReusable = ({ orders }: { orders: Order[] | null }) => (
    <section>
      <h1 className="font-semibold mt-5 text-[12px]">
        Orders - ({totalOrders})
      </h1>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold myp-5 text-[12px]">
          Total Pages ({totalPages})
        </h1>
        {isPending && <ScaleLoader color="cyan" height={14} />}
      </div>
      <div>
        {!orders ||
          (orders.length < 1 && (
            <div className="w-full flex justify-center items-center py-10">
              <BarLoader color="#ffffff" height={5} loading={true} />
            </div>
          ))}
        {orders?.map((product) => (
          <OrderReusable key={product.id} order={product} />
        ))}
      </div>
      <div className="py-10 font-semibold">
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className="select-none cursor-pointer"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <PaginationPrevious />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              const pageIndex = startPage + index + 1;
              return (
                <PaginationItem
                  key={pageIndex}
                  className={`select-none cursor-pointer  px-2 py-1 rounded-md ${
                    pageIndex === currentPage ? "border-2 border-white" : ""
                  }`}
                  onClick={() => setCurrentPage(pageIndex)}
                >
                  {pageIndex}
                </PaginationItem>
              );
            })}
            <PaginationItem
              className="select-none cursor-pointer"
              onClick={() => {
                if (currentPage < Math.ceil(totalOrders / itemsPerPage)) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );

  useEffect(() => {
    startTransition(async () => {
      const fetchAllProducts = async () => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = currentPage * itemsPerPage;
        const orders = await getAllOrders({
          start: startIdx,
          end: endIdx,
        });

        const productsCount = await getAllOrdersCount();
        setTotalOrders(productsCount);
        setOrders(orders);
      };
      fetchAllProducts();
    });
  }, [itemsPerPage, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalOrders / itemsPerPage));
  }, [totalOrders, itemsPerPage]);

  useEffect(() => {
    setStartPage(
      Math.max(Math.min(Math.max(currentPage - 1, 0), totalPages - 5), 0)
    );
  }, [currentPage, totalPages]);

  return <ProductsSectionReusable orders={orders} />;
};

export default OrdersSection;
