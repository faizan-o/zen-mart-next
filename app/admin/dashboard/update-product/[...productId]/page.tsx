"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import CustomFormInput from "@/components/custom-form-input";
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
  const categoryFieldOptions =
    categories && categories.map((c) => ({ label: c.type, value: c.id }));
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
        className="max-h-full overflow-y-auto"
      >
        <Form {...form}>
          <form
            className="mt-2 space-y-4"
            onSubmit={form.handleSubmit(onEditProductFormSubmit)}
          >
            <CustomFormInput
              formControl={form.control}
              name="name"
              label="Name"
              isSubmitPending={isSubmitPending}
              inputPlaceHolder="Product Name"
              inputType="TEXT_INPUT"
            />
            <CustomFormInput
              formControl={form.control}
              name="description"
              label="Description"
              isSubmitPending={isSubmitPending}
              inputPlaceHolder="Product Description"
              inputType="TEXT_INPUT"
            />
            <CustomFormInput
              formControl={form.control}
              name="price"
              label="Price"
              isSubmitPending={isSubmitPending}
              inputPlaceHolder="Product Price ($)"
              inputType="TEXT_INPUT"
            />
            <CustomFormInput
              formControl={form.control}
              inputType="SWITCH"
              isSubmitPending={isSubmitPending}
              label="Is On Sale"
              inputDescription="Set Wether The Product Will Have The Given Discount"
              name="isOnSale"
            />
            {isOnSale && (
              <CustomFormInput
                formControl={form.control}
                inputType="TEXT_INPUT"
                isSubmitPending={isSubmitPending}
                label="Discount"
                inputPlaceHolder="Discount In %"
                name="discount"
              />
            )}
            <CustomFormInput
              formControl={form.control}
              name="categoryId"
              isSubmitPending={isSubmitPending}
              label="Category"
              inputType="SELECT"
              options={categoryFieldOptions || []}
              inputPlaceHolder="Select A Category"
            />
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
