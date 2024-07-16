import { Category, Product } from "@prisma/client";
import { BarLoader, ScaleLoader } from "react-spinners";
import ProductComponent from "./product";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Query } from "@/types";
import { TransitionStartFunction } from "react";

const ProductsSectionWithPagination = ({
  products,
  isPending,
  totalProducts,
  totalPages,
  searchQuery,
  categories,
  startTransition,
  currentPage,
  setCurrentPage,
  startPage,
  itemsPerPage
}: {
  products: Product[] | null;
  isPending: boolean;
  totalProducts: number;
  totalPages: number;
  searchQuery?: Query;
  categories: Category[] | null;
  startTransition: TransitionStartFunction;
  currentPage: number;
  setCurrentPage: (newValue: number | ((prevValue: number) => number)) => void;
  startPage: number;
  itemsPerPage: number;
}) => (
  <section>
    <h1 className="font-semibold mt-5">Total Products ({totalProducts})</h1>
    <div className="flex justify-between items-center">
      <h1 className="font-semibold mt-5">Total Pages ({totalPages})</h1>
      {isPending && <ScaleLoader color="cyan" height={14} />}
    </div>
    <div>
      {!products ||
        (products.length < 1 && !searchQuery && (
          <div className="w-full flex justify-center items-center py-10">
            <BarLoader color="#ffffff" height={5} loading={true} />
          </div>
        ))}
      {products?.map((product) => (
        <ProductComponent
          key={product.id}
          product={product}
          categories={categories as Category[]}
          startTransition={startTransition}
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

export default ProductsSectionWithPagination;
