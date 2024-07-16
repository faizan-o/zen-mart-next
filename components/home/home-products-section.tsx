"use client";
import { getSalesProduct } from "@/server-actions/get-sales-product";
import { useState, useEffect } from "react";
import ProductCard from "../product";
import { Product } from "@prisma/client";
import SkeletonCard from "../skeleton-card";
import { HOME_SECTION_HEADING } from "@/constants/home";

const ProductsSection = () => {
  const [salesProducts, setSalesProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchSalesProducts = async () => {
      const fetchedSalesProduct = await getSalesProduct(8);

      setSalesProducts(fetchedSalesProduct);
    };

    fetchSalesProducts();
  }, []);

  return (
    <section className="text-gray-600">
      <h1 className="mt-20 text-3xl pl-4 text-white font-bold">
        {HOME_SECTION_HEADING}
      </h1>
      <div className="container pt-4 pb-10 w-full">
        {salesProducts && (
          <div className="flex flex-col sm:flex-row gap-5 flex-wrap justify-center items-center w-full mb-20">
            {salesProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="" />
            ))}
          </div>
        )}
        {!salesProducts && (
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
