import ProductCard from "@/components/product";
import ProductsSection from "@/components/products-section";
import { getCategoryById } from "@/data/categories";
import { getProductById, getProductsByCategoryId } from "@/data/products";
import { logo } from "@/public/export";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const category = await getCategoryById(params.category);

  return {
    title: `Buy Products From ${category?.type}`,
    description: `Discover our selection of ${category?.type} products at ZenMart`,
    openGraph: {
      title: `Buy Products From ${category?.type}`,
      description: `Discover our selection of ${category?.type} products at ZenMart`,
      images: [`${process.env.BASE_URL}/logo.png`],
      url: new URL(`${process.env.BASE_URL}/categories/${params.category}`),
      type: "website",
      siteName: "ZenMart",
    },
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = await getCategoryById(params.category);
  const products = category
    ? await getProductsByCategoryId(category.id, 200)
    : null;
  return (
    <ProductsSection
      category={category ? category : undefined}
      products={products!}
    />
  );
};

export default CategoryPage;
