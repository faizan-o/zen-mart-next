"use client";

import { loadStripe } from "@stripe/stripe-js";
import CheckOutPaymentCard from "@/components/checkout/checkout-payment-card";
import { convertToSubCurrency } from "@/lib/currency";
import CardWrapper from "@/components/auth/card-wrapper";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Order } from "@prisma/client";
import { getOrderById } from "@/data/orders";
import { ScaleLoader } from "react-spinners";

interface OrderPaymentPageProps {
  params: {
    orderId: string;
  };
}

const OrderPaymentPage = ({ params }: OrderPaymentPageProps) => {
  const STRIPE_PROMISE = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  const [order, setOrder] = useState<Order | null>(null);
  const [isOrderBeingFetched, setIsOrderBeingFetched] = useState<boolean>(true);

  useEffect(() => {
    getOrderById(params.orderId).then((order) => setOrder(order));
    setIsOrderBeingFetched(false);
  }, []);

  if (isOrderBeingFetched) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <CardWrapper headerHeading="Loading" headerLabel="Loading Order Data">
          <div className="text-center">
            <ScaleLoader height={15} color="cyan" />
          </div>
        </CardWrapper>
      </div>
    );
  }

  if ((!order && !isOrderBeingFetched) || order === null) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <CardWrapper
          headerHeading="No Order Found"
          headerLabel="No Order Was Found WIth Current Id"
          backButtonLabel="Back To Shopping"
          backButtonHref="/"
        >
          <h1 className="text-center"></h1>
        </CardWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-full flex justify-center items-center">
      <CardWrapper headerHeading="Payment" headerLabel="Payment For Your Order">
        <Elements
          stripe={STRIPE_PROMISE}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(order.totalPrice),
            currency: "usd",
          }}
        >
          <CheckOutPaymentCard amount={order.totalPrice} orderId={order.id} />
        </Elements>
      </CardWrapper>
    </div>
  );
};

export default OrderPaymentPage;
