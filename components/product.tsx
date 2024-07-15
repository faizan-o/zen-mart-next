import type { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProductCard = ({
  product,
  className,
  showRemoveButton,
  removeFunction,
}: {
  product: Product;
  className?: string;
  showRemoveButton?: boolean;
  removeFunction?: () => Promise<void>;
}) => {
  return (
    <div
      className={cn("w-3/4 md:w-1/4 border-[1px] p-5 rounded-md", className)}
    >
      <div className="py-6 h-[24rem] md:h-[25rem] mt-5">
        <div className="relative pt-6 py-6 rounded-lg h-full">
          <Image
            className="h-40 rounded w-full object-contain object-center mb-6"
            src={product.image}
            width={1920}
            height={1080}
            alt="content"
          />
          <h3 className="tracking-widest text-indigo-500 line-clamp-1 font-medium">
            {product.name}
          </h3>
          <h2 className="text-lg title-font mb-4 flex items-center">
            {product.isOnSale && product.discount ? (
              <>
                <Badge className="absolute top-3 left-3">
                  {product.discount}%
                </Badge>
                <span className="font-medium text-white">
                  {Math.ceil(product.price * (product.discount / 100))}$
                </span>
                <span className="text-gray line-through text-[14px] ml-2 font-extralight">
                  {product.price}$
                </span>
              </>
            ) : (
              <span className="font-medium text-white">{product.price}$</span>
            )}
          </h2>
          <p className="leading-relaxed text-[13px] mb-5 line-clamp-3">
            {product.description}
          </p>
        </div>
      </div>
      <Link href={`/products/${product.id}`}>
        <Button className="w-full">Buy Now</Button>
      </Link>
      {showRemoveButton && (
        <Button onClick={removeFunction} variant="destructive" className="w-full mt-4">
          Remove
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
