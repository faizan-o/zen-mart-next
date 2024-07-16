import { searchProducts } from "@/server-actions/search";
import { SearchProductRespone } from "@/types";
import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./search-product.css";
import Link from "next/link";
import Image from "next/image";

const SearchProductInput = () => {
  const [query, setQuery] = useState<string>("");
  const [queriedProducts, setQueriedProducts] = useState<
    SearchProductRespone[] | null
  >(null);

  useEffect(() => {
    const queryProducts = async () => {
      const products = await searchProducts(query);
      setQueriedProducts(products);
    };

    queryProducts();
  }, [query]);

  return (
    <div className="w-full bg-gray-900 p-4 relative rounded-md search-input-wrapper">
      <div className="flex items-center space-x-3">
        <FaSearch />
        <input
          type="text"
          className="w-full text-sm bg-transparent border-0 focus:outline-none"
          placeholder="Search Product"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {queriedProducts && queriedProducts.length > 0 ? (
        <div className="search-input-products-section">
          {queriedProducts.map((product: SearchProductRespone) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="flex items-center mt-5 space-x-2 hover:bg-gray-700 px-4">
                <Image
                  src={product.image}
                  width={1920}
                  height={1080}
                  alt={`${product.name} Image`}
                  className="w-10 h-10"
                />
                <div className="flex flex-col">
                  <h1>{product.name}</h1>
                  <p className="text-[11px] line-clamp-2 text-gray-500">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        queriedProducts &&
        queriedProducts?.length < 1 && (
          <div>
            <h1 className="text-center pt-5">No Products Found</h1>
          </div>
        )
      )}
    </div>
  );
};

export default SearchProductInput;
