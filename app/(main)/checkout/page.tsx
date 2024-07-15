"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import CheckOutCard from "@/components/checkout/checkout-card";
import CheckOutForm from "@/components/checkout/checkout-form";
import { getCurrentUserCartWithProducts } from "@/data/cart";
import { cn } from "@/lib/utils";
import { CartProduct } from "@/types";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const CheckOutPage = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  const [areCartProductsThere, setAreCartProductsThere] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = (products: CartProduct[]) => {
    return products.reduce((total, product) => {
      const { isOnSale, discount, price, quantity } = product;
      const finalPrice =
        isOnSale && discount ? discount * price * quantity : price * quantity;
      return Math.ceil(total + finalPrice);
    }, 0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const fetchedCartProducts = await getCurrentUserCartWithProducts();
      setCartProducts(fetchedCartProducts);
      if (fetchedCartProducts && fetchedCartProducts.length > 0) {
        setAreCartProductsThere(true);
      }
      setTotalPrice(calculateTotalPrice(fetchedCartProducts||[]));
    };

    fetchCart();
    setIsLoading(false);
  }, []);

  return (
    <div
      className={cn(
        "min-h-full flex flex-col-reverse md:flex-row items-center",
        {
          "justify-center": !areCartProductsThere,
          "justify-between": areCartProductsThere,
        }
      )}
    >
      {isLoading && (
        <ScaleLoader
          className="absolute left-5 top-20"
          loading
          height={13}
          color="cyan"
        />
      )}
      {!areCartProductsThere && (
        <CardWrapper
          headerHeading="Order Details"
          headerLabel="Your Order Details"
          backButtonHref="/categories"
          backButtonLabel="Back To Shopping"
        >
          <h1 className="text-center font-bold">No Products In Your Cart</h1>
        </CardWrapper>
      )}
      {areCartProductsThere && cartProducts && (
        <>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <CheckOutForm
              totalPrice={totalPrice}
              cartProducts={cartProducts}
              areCartProductsThere={areCartProductsThere}
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <CheckOutCard totalPrice={totalPrice} products={cartProducts} />
          </div>
        </>
      )}
    </div>
  );
};

export default CheckOutPage;
