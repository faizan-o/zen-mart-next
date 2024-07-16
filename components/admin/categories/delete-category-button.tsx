import { Button } from "@/components/ui/button";
import React, { TransitionStartFunction } from "react";
import { FaTrash } from "react-icons/fa6";
import { deleteCategory } from "@/server-actions/category";

const DeleteCategoryButton = ({
  categoryId,
  startTransition,
}: {
  categoryId: string;
  startTransition: TransitionStartFunction;
}) => {
  return (
    <Button
      onClick={() =>
        startTransition(async () => await deleteCategory(categoryId))
      }
      className="text-[12px]"
    >
      <FaTrash />
    </Button>
  );
};

export default DeleteCategoryButton;
