import ProductsSection from "@/components/products-section";
import { getAllCategories } from "@/data/categories";
import { getProductsByCategoryId } from "@/data/products";
import { ProductByCategory } from "@/types";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const categories = await getAllCategories();
  const category =
    categories && categories.at(Math.floor(Math.random() * categories.length));

  return {
    title: "All Categories",
    description:
      "See All Categories And Find The Best Product You Are Looking For in All Categories",
    openGraph: {
      title: `Buy Products From ${category?.type} Category`,
      description:
        "Find The Best Product You Are Looking For In All Categories",
    },
  };
};

const Categories = async () => {
  const categories = await getAllCategories();
  const productsByCategory: ProductByCategory[] | null = categories
    ? await Promise.all(
        categories.map(async (category) => {
          const products = await getProductsByCategoryId(category.id, 6);
          return {
            category: category,
            products,
          };
        })
      )
    : null;

  return (
    <>
      {productsByCategory &&
        productsByCategory.map(
          (productByCategory) =>
            productByCategory.products && (
              <ProductsSection
                key={productByCategory.category.id}
                category={productByCategory.category}
                products={productByCategory.products}
              />
            )
        )}
    </>
  );
};

export default Categories;
