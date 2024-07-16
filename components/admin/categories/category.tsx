import CardWrapper from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@prisma/client";
import React, { TransitionStartFunction } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import EditCategoryForm from "./edit-category-button";
import EditCategoryButton from "./edit-category-button";
import DeleteCategoryButton from "./delete-category-button";

interface CategoryProps {
  category: Category;
  startTransition: TransitionStartFunction;
  isPending: boolean;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
  itemsCount: number;
}

const CategoryComponent = ({
  category,
  startTransition,
  isPending,
  setError,
  setSuccess,
  itemsCount,
}: CategoryProps) => {
  return (
    <div
      className="w-full flex justify-between my-5 rounded-md border-[1px] border-gray-700 py-5 px-5"
      key={category.id}
    >
      <h1 className="text-2xl font-bold">
        {category.type} ({itemsCount})
      </h1>
      <div className="space-x-5">
        <DeleteCategoryButton
          categoryId={category.id}
          startTransition={startTransition}
        />
        <EditCategoryButton
          category={category}
          startTransition={startTransition}
          setError={setError}
          setSuccess={setSuccess}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default CategoryComponent;
