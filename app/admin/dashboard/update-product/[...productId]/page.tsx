"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getAllCategories } from "@/data/categories";
import { getProductById } from "@/data/products";
import { UpdateProductSchema } from "@/schemas";
import { updateProduct } from "@/server-actions/product";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const EditProductPage = () => {
  const params = useParams();

  const productId = params.productId[0];

  const [isSubmitPending, startTransition] = useTransition();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof UpdateProductSchema>>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      isOnSale: false,
      discount: "00",
      categoryId: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      price: currentProduct?.price.toString() || "",
      isOnSale: currentProduct?.isOnSale || false,
      discount: currentProduct?.discount?.toString() || "00",
      categoryId: currentProduct?.categoryId,
    });
  }, [currentProduct, form]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(productId);
      setCurrentProduct(product);
    };

    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const isOnSale = form.watch("isOnSale");

  const onEditProductFormSubmit = (
    values: z.infer<typeof UpdateProductSchema>
  ) => {
    setSuccess("");
    setError("");
    startTransition(async () => {
      try {
        const data = await updateProduct(values, currentProduct?.id as string);
        setSuccess(data?.success);
        setError(data?.error);
      } catch (_) {
        setError("Something Went Wrong");
      }
    });
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardWrapper
        headerHeading="Edit Product"
        headerLabel="Edit Current Product"
        backButtonLabel="Back To Dashboard"
        backButtonHref="/admin/dashboard"
      >
        <Form {...form}>
          <form
            className="mt-2 space-y-4"
            onSubmit={form.handleSubmit(onEditProductFormSubmit)}
          >
            <FormField
              control={form.control}
              disabled={isSubmitPending}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Product Name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isSubmitPending}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Product Description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              disabled={isSubmitPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Product Price In $"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isOnSale"
              disabled={isSubmitPending}
              render={({ field }) => (
                <FormItem className="flex justify-between border-[1px] border-gray-700 p-3 rounded-md">
                  <div className="">
                    <FormLabel>Is On Sale</FormLabel>
                    <FormDescription className="w-3/4">
                      Set The Product On Sale If You Want To Give Discount
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex w-full justify-around">
              {isOnSale && (
                <FormField
                  control={form.control}
                  name="discount"
                  disabled={isSubmitPending}
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Discount In %"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="categoryId"
                disabled={isSubmitPending}
                render={({ field }) => (
                  <FormItem className={`${isOnSale ? "w-1/2" : "w-full"}`}>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isSubmitPending}>
              Update Product
            </Button>
            <ErrorMessage
              errors={form.formState.errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default EditProductPage;
