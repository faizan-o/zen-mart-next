"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditCategorySchema, NewCategorySchema } from "@/schemas";
import { useForm } from "react-hook-form";
import CardWrapper from "../auth/card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/server-actions/category";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Category } from "@prisma/client";
import { getAllCategories } from "@/data/categories";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getProductsCount } from "@/server-actions/get-products-count";
import { z } from "zod";

const CategoriesDashboard = () => {
  const form = useForm({
    resolver: zodResolver(NewCategorySchema),
    defaultValues: { type: "" },
  });

  const editForm = useForm({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: { type: "" },
  });

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
  }, []);

  const onSubmit = async (values: z.infer<typeof NewCategorySchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const data = await createCategory(values);
        setError(data?.error);
        setSuccess(data?.success);
        fetchAllData(); // Refetch data after creating a category
      } catch (err) {
        setError("Something Went Wrong!");
      }
    });
  };

  const onEditFormSubmit = async (
    id: string,
    values: z.infer<typeof EditCategorySchema>
  ) => {
    startTransition(async () => {
      try {
        const data = await updateCategory(id, values);
        setError(data?.error);
        setSuccess(data?.success);
        fetchAllData(); // Refetch data after updating a category
      } catch (err) {
        setError("Something Went Wrong!");
      }
    });
  };

  const deleteProductCategory = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteCategory(id);
        fetchAllData(); // Refetch data after deleting a category
      } catch (err) {}
    });
  };

  return (
    <div className="flex flex-col px-4">
      <Dialog>
        <div className="border-[1px] mt-2 rounded-md border-gray-700 flex justify-between px-5 py-10">
          <h1 className="text-3xl font-bold">Categories</h1>
          <DialogTrigger asChild>
            <Button variant="default">Add Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-screen overflow-y-auto">
            <DialogTitle className="hidden">New Category</DialogTitle>
            <CardWrapper
              headerHeading="New Category"
              headerLabel="Create A New Category"
              backButtonHref=""
              backButtonLabel=""
              className="border-none"
            >
              <Form {...form}>
                <form
                  className="mt-2 space-y-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Category Name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </form>
              </Form>
            </CardWrapper>
          </DialogContent>
        </div>
      </Dialog>
      <div className="">
        {categories?.map((category) => (
          <div
            className="w-full flex justify-between mt-5 border-[1px] border-gray-700 py-5 px-5"
            key={category.id}
          >
            <h1 className="text-2xl font-bold">
              {category.type} ({categoriesItemCount?.[category.id] || 0})
            </h1>
            <div className="space-x-5">
              <Button
                onClick={() => deleteProductCategory(category.id)}
                className="text-[12px]"
              >
                <FaTrash />
              </Button>
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
                        <FormField
                          control={editForm.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Type</FormLabel>
                              <FormControl>
                                <Input {...field} type="text" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full mt-4">
                          Update
                        </Button>
                      </form>
                    </Form>
                  </CardWrapper>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesDashboard;
