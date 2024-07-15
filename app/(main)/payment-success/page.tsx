"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { payOrder } from "@/server-actions/order";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const PaymentSuccess = () => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    payOrder(params.get("order")!).then((data) => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-full flex justify-center items-center">
      <CardWrapper
        headerHeading="Payment SuccessFull"
        headerLabel="Your Payment Was Successful"
        backButtonHref="/orders/"
        backButtonLabel="See Your Orders"
      >
        <div className="">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <ScaleLoader height={13} color="cyan" />
            </div>
          ) : (
            <h1 className="bg-gradient-to-br from-red-600 via-blue-600 to-green-600 font-bold bg-clip-text text-transparent text-2xl text-center">
              Thanks For Shopping
            </h1>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};

export default PaymentSuccess;
