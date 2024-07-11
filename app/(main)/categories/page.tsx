import ProductsSection from "@/components/products-section";
import { getAllCategories } from "@/data/categories";
import { getProductsByCategoryId } from "@/data/products";
import { ProductByCategory } from "@/types";
import { Product } from "@prisma/client";
import React from "react";

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
