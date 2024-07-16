"use client";

import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { getAllCategories } from "@/data/categories";
import type { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Query, QueryTypes } from "@/types";
import ProductsSection from "./products-section";
import NewProductForm from "./new-product-form";
import HeaderWithCreationDialog from "../header";
import { SEARCH_PRODUCTS_HEADING } from "@/constants/dashboard";

const ProductsDashboard = () => {
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (error) {}
    };

    fetchCategories();
  }, []);

  const [searchQuery, setSearchQuery] = useState<Query>({
    query: "",
    type: QueryTypes.TITLE.toString(),
  });

  return (
    <div className="flex flex-col px-4 w-full">
      <HeaderWithCreationDialog
        heading="Products"
        hasButton
        btnLabel="Add Product"
      >
        <NewProductForm
          startSubmitTransition={startSubmitTransition}
          categories={categories!}
          isSubmitPending={isSubmitPending}
        />
      </HeaderWithCreationDialog>
      <section className="w-full py-5 mt-5 mb-10 shadow-gray-900 shadow-2xl border-[1px] border-gray-600 rounded-md px-4">
        <h1 className="font-semibold text-3xl pb-5">
          {SEARCH_PRODUCTS_HEADING}
        </h1>
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
            onValueChange={(value: string) =>
              setSearchQuery({ ...searchQuery, type: value })
            }
            value={searchQuery.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="font-semibold">
                <SelectItem value={QueryTypes.CATEGORIES.toString()}>
                  {QueryTypes.CATEGORIES.toString()}
                </SelectItem>
                <SelectItem value={QueryTypes.TITLE.toString()}>
                  {QueryTypes.TITLE.toString()}
                </SelectItem>
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
