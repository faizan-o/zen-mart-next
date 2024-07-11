"use client";

import ProductCard from "@/components/product";
import ProductsSection from "@/components/products-section";
import SkeletonCard from "@/components/skeleton-card";
import { Button } from "@/components/ui/button";
import { getWishlistProducts } from "@/data/wishlist";
import { deleteCurrentProductFromWishlist } from "@/server-actions/wishlist";
import { Product } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const WishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[] | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const products = await getWishlistProducts();
      if (products) {
        setWishlistProducts(products.filter((p) => p !== null));
      }
    };

    fetchWishlistProducts();
  }, [isPending]);

  const removeCurrentProductFromWishlist = async (productId: string) => {
    startTransition(async () => {
      const res = await deleteCurrentProductFromWishlist(productId);
      if (!res) {
        toast("Error Deleting Current Product");
      }
      if (res) {
        toast("Successfully Deleted Product");
      }
    });
  };

  return (
    <section className="text-gray-600">
      <h1 className="text-3xl px-5 text-white font-bold my-12">Wishlist</h1>
      <div className="container pt-4 pb-10 w-full">
        {wishlistProducts && wishlistProducts.length === 0 && (
          <div className="w-full h-full">
            <h1>No Products In Wishlist</h1>
          </div>
        )}
        {wishlistProducts && wishlistProducts.length > 0 && (
          <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:gap-5 flex-wrap justify-center items-center w-full mb-20">
            {wishlistProducts.map((product) => (
              <>
                <ProductCard
                  product={product}
                  showRemoveButton
                  removeFunction={() =>
                    removeCurrentProductFromWishlist(product.id)
                  }
                />
              </>
            ))}
          </div>
        )}
        {!wishlistProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
