"use client";

import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { addProductToCart } from "@/server-actions/cart";
import { addProductToWishlist } from "@/server-actions/wishlist";
import { useState } from "react";

const ProductDetailsSection = ({
  productToShowDetails,
}: {
  productToShowDetails: Product;
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = async (productId: string) => {
    const res = await addProductToCart({ productId, quantity });
    toast(res.error || res.success);
  };

  const addToWishlist = async (productId: string) => {
    const res = await addProductToWishlist({ productId });
    toast(res.error || res.success);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap md:p-28">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            width={2080}
            height={2080}
            src={productToShowDetails.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {productToShowDetails.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              The Deluxe Edition
            </h1>
            <div className="flex mb-4">
              <span className="w-28 text-white border-[1px] flex justify-between items-center">
                <span
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="cursor-pointer border-r-[2px] h-full flex justify-center items-center px-2"
                >
                  +
                </span>
                <span>{quantity}</span>
                <span
                  onClick={() =>
                    quantity > 0 ? setQuantity((prev) => prev - 1) : null
                  }
                  className="cursor-pointer border-l-[2px] h-full flex justify-center items-center px-2"
                >
                  -
                </span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">
              {productToShowDetails.description}
            </p>
            <div className="h-1 my-5 w-full bg-white" />
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-600 space-x-4 flex justify-center items-center">
                {productToShowDetails.isOnSale &&
                  productToShowDetails.discount && (
                    <span>
                      $
                      {Math.ceil(
                        productToShowDetails.price *
                          (productToShowDetails.discount / 100)
                      )}
                    </span>
                  )}
                <span
                  className={cn({
                    "line-through": productToShowDetails.isOnSale,
                    "text-[15px]": productToShowDetails.isOnSale,
                  })}
                >
                  ${productToShowDetails.price}
                </span>
              </span>
              <Button
                onClick={(_) => addToCart(productToShowDetails.id)}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add To Cart
              </Button>
              <Button
                onClick={(_) => addToWishlist(productToShowDetails.id)}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSection;
