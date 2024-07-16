"use client";

import React, { useEffect, useState, useTransition } from "react";

import { deleteCategory } from "@/server-actions/category";
import { getAllCategories } from "@/data/categories";
import { getProductsCount } from "@/server-actions/get-products-count";
import HeaderWithCreationDialog from "../header";
import NewCategoryForm from "./new-category-form";
import { toast } from "sonner";
import CategoryComponent from "./category";
import { Category } from "@prisma/client";

const CategoriesDashboard = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoriesItemCount, setCategoriesItemsCount] = useState<{
    [key: string]: number;
  } | null>(null);

  const fetchAllData = async () => {
    try {
      const fetchedCategories = await getAllCategories();
      const productsCountByCategory = await getProductsCount();

      setCategories(fetchedCategories);
      setCategoriesItemsCount(productsCountByCategory);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [isPending]);

  useEffect(() => {
    (error || success) && toast(error || success);
  }, [error, success]);

  const deleteProductCategory = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteCategory(id);
        fetchAllData();
      } catch (err) {}
    });
  };

  return (
    <div className="flex flex-col px-4">
      <HeaderWithCreationDialog
        heading="Categories"
        hasButton
        btnLabel="Add Category"
      >
        <NewCategoryForm
          error={error || ""}
          success={success || ""}
          isPending={isPending}
          setError={setError}
          setSuccess={setSuccess}
          startTransition={startTransition}
        />
      </HeaderWithCreationDialog>
      <div className="">
        {categories?.map((category) => (
          <CategoryComponent
            category={category}
            startTransition={startTransition}
            itemsCount={categoriesItemCount?.[category.id] || 0}
            isPending={isPending}
            setError={setError}
            setSuccess={setSuccess}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesDashboard;
