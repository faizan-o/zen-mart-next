import { Category, Product } from "@prisma/client";
import React from "react";
import SkeletonCard from "./skeleton-card";
import ProductCard from "./product";
import Link from "next/link";
import { Button } from "./ui/button";

const ProductsSection = ({
  isWholeCategoryPage,
  category,
  products,
  heading,
}: {
  isWholeCategoryPage?:boolean
  category?: Category;
  heading?: string;
  products: Product[];
}) => {
  return (
    <section className="text-gray-600">
      {category && (
        <div className="my-20 flex justify-between items-center px-5 md:px-10">
          <h1 className="text-3xl text-white font-bold">{category.type}</h1>
          <div className="">
            <Link href={isWholeCategoryPage ? `/categories/${category.id}` : '/categories/'}>
              <Button className="px-7">See All</Button>
            </Link>
          </div>
        </div>
      )}
      {heading && (
        <h1 className="text-3xl px-5 text-white font-bold my-20">{heading}</h1>
      )}
      <div className="container pt-4 pb-10 w-full">
        {products && (
          <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:gap-5 flex-wrap justify-center items-center w-full mb-20">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
