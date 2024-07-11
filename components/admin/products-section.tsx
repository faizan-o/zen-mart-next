"use client";

import { getAllProducts, getAllProductsCount } from "@/data/products";
import { Category, Product } from "@prisma/client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Query } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { deleteProduct } from "@/server-actions/product";
import { BarLoader, ScaleLoader } from "react-spinners";
import {
  adminSearchProductsByCategory,
  adminSearchProductsByTitleOrDescription,
} from "@/server-actions/search";

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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const itemsPerPage = 10;

  const onProductDelete = (productId: string) => {
    startTransition(async () => await deleteProduct(productId));
  };

  const ProductReusable = ({
    product,
    categories,
  }: {
    product: Product;
    categories: Category[];
  }) => {
    return (
      <Collapsible
        key={product.id}
        className="rounded-md border-2 border-gray-600 mt-5 px-2 sm:px-10 py-5"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <Image
              src={product.image}
              alt={`${product.name} Image`}
              width={1920}
              height={1080}
              className="w-16 h-16"
            />
            <div>
              <h1>{product.name}</h1>
              <p className="text-[12px] font-semibold text-gray-500 w-[70%]">
                {product.description}
              </p>
            </div>
          </div>
          <CollapsibleTrigger className="border-[1px] border-white p-1 h-fit rounded-md">
            <ChevronDownIcon />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 mt-5">
          <div className="flex justify-between">
            <h1 className="font-semibold">Product ID</h1>
            <p>{product.id}</p>
          </div>
          <div className="flex justify-between">
            <h1 className="font-semibold">Price</h1>
            <p>{product.price}$</p>
          </div>
          <div className="flex justify-between items-center py-1">
            <h1 className="font-semibold">IsOnSale</h1>
            <p>
              {product.isOnSale ? (
                <Badge className="bg-green-600 text-white font-semibold p-2 px-6">
                  YES
                </Badge>
              ) : (
                <Badge className="bg-red-600 text-white font-semibold p-1 px-6">
                  NO
                </Badge>
              )}
            </p>
          </div>
          {product.isOnSale && (
            <div className="flex justify-between">
              <h1 className="font-semibold">Discount</h1>
              <p>{product.discount}%</p>
            </div>
          )}
          <div className="flex justify-between">
            <h1 className="font-semibold">Category</h1>
            <p>
              {
                categories?.find(
                  (category) => category.id === product.categoryId
                )?.type
              }
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Edit</h1>
            <Link href={`/admin/dashboard/update-product/${product.id}`}>
              <Button className="px-6">Edit Product</Button>
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Delete</h1>
            <Button
              onClick={(e) => onProductDelete(product.id)}
              variant="destructive"
            >
              Delete Product
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const ProductsSectionReusable = ({
    products,
  }: {
    products: Product[] | null;
  }) => (
    <section>
      <h1 className="font-semibold mt-5">Total Products ({totalProducts})</h1>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold mt-5">Total Pages ({totalPages})</h1>
        {(isPending || isPendingState) && (
          <ScaleLoader color="cyan" height={14} />
        )}
      </div>
      <div>
        {!products ||
          (products.length < 1 && !searchQuery && (
            <div className="w-full flex justify-center items-center py-10">
              <BarLoader color="#ffffff" height={5} loading={true} />
            </div>
          ))}
        {products?.map((product) => (
          <ProductReusable
            key={product.id}
            product={product}
            categories={categories as Category[]}
          />
        ))}
      </div>
      <div className="py-10 font-semibold">
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className="select-none cursor-pointer"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <PaginationPrevious />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              const pageIndex = startPage + index + 1;
              return (
                <PaginationItem
                  key={pageIndex}
                  className={`select-none cursor-pointer  px-2 py-1 rounded-md ${
                    pageIndex === currentPage ? "border-2 border-white" : ""
                  }`}
                  onClick={() => setCurrentPage(pageIndex)}
                >
                  {pageIndex}
                </PaginationItem>
              );
            })}
            <PaginationItem
              className="select-none cursor-pointer"
              onClick={() => {
                if (currentPage < Math.ceil(totalProducts / itemsPerPage)) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );

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
    setTotalPages(Math.ceil(totalProducts / itemsPerPage));
  }, [totalProducts, itemsPerPage]);

  useEffect(() => {
    setStartPage(Math.min(Math.max(currentPage - 1, 0), totalPages - 5));
  }, [currentPage, totalPages]);

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

  return <ProductsSectionReusable products={queriedProducts} />;
};

export default ProductsSection;
