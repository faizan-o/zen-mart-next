import { getCategoryById } from "@/data/categories";
import { getProductById } from "@/data/products";
import React from "react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = await getCategoryById(params.category);
  const products = category ? await getProductById(category.id) : null;
  return <div>{JSON.stringify(params)}</div>;
};

export default CategoryPage;
