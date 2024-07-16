import CardWrapper from "@/components/auth/card-wrapper";
import CustomFormInput from "@/components/custom-form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { EditCategorySchema } from "@/schemas";
import { updateCategory } from "@/server-actions/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import React, { TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import * as z from "zod";

interface EditCategoryFormProps {
  category: Category;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const EditCategoryButton = ({
  category,
  isPending,
  startTransition,
  setError,
  setSuccess,
}: EditCategoryFormProps) => {
  const editForm = useForm({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: { type: category.type || "" },
  });

  const onEditFormSubmit = async (
    id: string,
    values: z.infer<typeof EditCategorySchema>
  ) => {
    startTransition(async () => {
      try {
        const data = await updateCategory(id, values);
        setError(data?.error);
        setSuccess(data?.success);
      } catch (err) {
        setError("Something Went Wrong!");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogTitle className="hidden">Edit Category</DialogTitle>
        <CardWrapper
          headerHeading="Edit Product Category"
          headerLabel="Change Properties"
          className="border-none"
        >
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit((values) =>
                onEditFormSubmit(category.id, values)
              )}
            >
              <CustomFormInput
                formControl={editForm.control}
                name="type"
                label="New Name"
                inputType="TEXT_INPUT"
                isSubmitPending={isPending}
                inputPlaceHolder="New Category Name"
              />
              <Button type="submit" className="w-full mt-4">
                Update
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryButton;
