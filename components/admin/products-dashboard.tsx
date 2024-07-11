"use client";

import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { NewProductSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "../auth/card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { DialogTitle } from "@radix-ui/react-dialog";
import { getAllCategories } from "@/data/categories";
import type { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createProduct } from "@/server-actions/product";
import { Query, QueryTypes } from "@/types";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import ProductsSection from "./products-section";

const ProductsDashboard = () => {
  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: "",
      isOnSale: false,
      discount: "00",
      categoryId: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isOnSale = form.watch("isOnSale");

  useEffect(() => {
    isOnSale ? form.setValue("discount", "") : null;
  }, [isOnSale, form]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[] | null>(null);

  const [searchQuery, setSearchQuery] = useState<Query>({
    query: "",
    type: "CATEGORIES",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (error) {}
    };

    fetchCategories();
  }, []);

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);
    imageFormData.append("folder", "Products");

    try {
      const res: any = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });
      const data = await res.json();
      return data?.url;
    } catch (err) {
      return null;
    }
  };

  const onSubmit = async (values: z.infer<typeof NewProductSchema>) => {
    setError("");
    setSuccess("");
    startSubmitTransition(async () => {
      try {
        const imageUrl = await uploadImage();
        if (!imageUrl) {
          setError("Image Could Not Be Uploaded");
          return;
        }
        values.image = imageUrl;
        const data = await createProduct(values);
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      } catch (err) {
        setError("Something Went Wrong");
      }
    });
  };

  return (
    <div className="flex flex-col px-4">
      <Dialog>
        <div className="border-[1px] mt-2 rounded-md border-gray-700 flex justify-between px-5 py-10">
          <h1 className="text-3xl font-bold">Products</h1>
          <DialogTrigger asChild>
            <Button variant="default" className="font-semibold">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-screen">
            <DialogTitle className="hidden">New Product</DialogTitle>
            <CardWrapper
              headerHeading="New Product"
              className="border-none font-medium"
              lessGap
            >
              <Form {...form}>
                <form
                  className="mt-2 space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    disabled={isSubmitPending}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Product Name"
                          />
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
                        <FormItem
                          className={`${isOnSale ? "w-1/2" : "w-full"}`}
                        >
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
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
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
                  <input
                    className="hidden"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    disabled={isSubmitPending}
                    className="w-full"
                    variant="outline"
                  >
                    {imageFile?.name || "Choose Image"}
                  </Button>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitPending}
                  >
                    Create Product
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
          </DialogContent>
        </div>
      </Dialog>
      <section className="w-full py-5 mt-5 mb-10 shadow-gray-900 shadow-2xl border-[1px] border-gray-600 rounded-md px-4">
        <h1 className="font-semibold text-3xl pb-5">Search Products</h1>
        <div className="grid grid-cols-3 grid-rows-1">
          <Input
            type="text"
            className="col-span-2"
            value={searchQuery.query}
            placeholder="Product"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery({ ...searchQuery, query: e.target.value })
            }
          />
          <Select
            onValueChange={(value: QueryTypes) =>
              setSearchQuery({ ...searchQuery, type: value })
            }
            value={searchQuery.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="font-semibold">
                <SelectItem value="CATEGORIES">CATEGORY</SelectItem>
                <SelectItem value="TITLE">TITLE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ProductsSection
          searchQuery={searchQuery}
          isPendingState={isSubmitPending}
          categories={categories}
        />
      </section>
    </div>
  );
};

export default ProductsDashboard;
