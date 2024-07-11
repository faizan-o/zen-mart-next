"use client";

import { cn } from "@/lib/utils";
import { searchProducts } from "@/server-actions/search";
import { SearchProductRespone } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { FaSearch } from "react-icons/fa";

const SearchProductInput = () => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<SearchProductRespone[] | null>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const fetchedProducts = await searchProducts(query);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [query, isInputFocused]);

  const handleFocus = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }

    setIsInputFocused(true);
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => {
      setIsInputFocused(false);
    }, 100);
  };

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  const redirectToProduct = (productId: string) => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
    startTransition(() => {
      router.push(`/products/${productId}`);
    });
  };

  return (
    <div
      className={cn("w-full relative bg-primary-foreground rounded-t-md", {
        "rounded-md": !query || (query && !isInputFocused),
      })}
    >
      <div className="flex gap-2 space-x-2 items-center px-2">
        <FaSearch className="text-[20px]" />
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="outline-0 py-3 bg-inherit *:focus:outline-0 w-fullborder-none font-semibold text-[12px] rounded-sm"
          placeholder="Search Product"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
      </div>
      {query && (isInputFocused || isPending) && (
        <div className="absolute w-full bg-inherit rounded-b-md translate-y-[100%] bottom-0">
          {!products ||
            (products && products?.length < 1 && (
              <h1 className="font-semibold text-center py-5">
                No Products Found
              </h1>
            ))}
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div
                key={product.id}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={(_) => redirectToProduct(product.id)}
                className="flex w-full cursor-pointer py-2 hover:bg-gray-600"
              >
                <div className="w-[20%] p-4">
                  <Image
                    src={product.image}
                    alt="Product Image"
                    width={786}
                    height={340}
                    className="w-full"
                  />
                </div>
                <div className="w-[80%]">
                  <h1 className="font-semibold">{product.name}</h1>
                  <p className="text-[10px] text-gray-400">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchProductInput;
