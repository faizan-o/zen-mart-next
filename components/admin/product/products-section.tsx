"use client";

import { getAllProducts, getAllProductsCount } from "@/data/products";
import { Category, Product } from "@prisma/client";
import React, { useEffect, useState, useTransition } from "react";
import { Query } from "@/types";
import {
  adminSearchProductsByCategory,
  adminSearchProductsByTitleOrDescription,
} from "@/server-actions/search";
import ProductsSectionWithPagination from "./products-section-with-pagination";

const ProductsSection = ({
  searchQuery,
  isPendingState,
  categories,
}: {
  searchQuery: Query;
  isPendingState: boolean;
  categories: Category[] | null;
}) => {
  const [queriedProducts, setQueriedProducts] = useState<Product[] | null>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const itemsPerPage = 10;
  const totalPages = totalProducts / itemsPerPage;
  const startPage = Math.min(Math.max(currentPage - 1, 0), totalPages - 5);

  useEffect(() => {
    startTransition(async () => {
      const fetchAllProducts = async () => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = currentPage * itemsPerPage;
        const products = await getAllProducts({
          start: startIdx,
          end: endIdx,
        });

        const productsCount = await getAllProductsCount();
        setTotalProducts(productsCount || 0);
        setQueriedProducts(products);
      };
      fetchAllProducts();
    });
  }, [itemsPerPage, currentPage, isPendingState]);

  useEffect(() => {
    startTransition(async () => {
      if (
        !searchQuery.query &&
        queriedProducts &&
        queriedProducts?.length < totalProducts
      ) {
        startTransition(async () => {
          const startIdx = (currentPage - 1) * itemsPerPage;
          const endIdx = currentPage * itemsPerPage;
          const products = await getAllProducts({
            start: startIdx,
            end: endIdx,
          });

          return setQueriedProducts(products);
        });
      }

      if (!searchQuery.query) return;

      if (searchQuery.type === "CATEGORIES") {
        startTransition(async () => {
          const startIdx = (currentPage - 1) * itemsPerPage;
          const endIdx = currentPage * itemsPerPage;
          const products = await adminSearchProductsByCategory({
            query: searchQuery.query,
            start: startIdx,
            end: endIdx,
          });

          setQueriedProducts(products);
        });
      }
      if (searchQuery.type === "TITLE") {
        startTransition(async () => {
          const startIdx = (currentPage - 1) * itemsPerPage;
          const endIdx = currentPage * itemsPerPage;
          const products = await adminSearchProductsByTitleOrDescription({
            query: searchQuery.query,
            start: startIdx,
            end: endIdx,
          });

          setQueriedProducts(products);
        });
      }
    });
  }, [searchQuery]);

  return (
    <ProductsSectionWithPagination
      products={queriedProducts}
      isPending={isPending && isPendingState}
      currentPage={currentPage}
      categories={categories}
      itemsPerPage={itemsPerPage}
      setCurrentPage={setCurrentPage}
      startTransition={startTransition}
      startPage={startPage}
      totalProducts={totalProducts}
      totalPages={totalPages}
      searchQuery={searchQuery}
    />
  );
};

export default ProductsSection;
