"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUserCart } from "@/data/cart";
import { getProductById } from "@/data/products";
import { calculateTotalPrice } from "@/lib/price";
import { deleteProductFromCart, updateUserCart } from "@/server-actions/cart";
import { CheckOutProduct } from "@/types";
import { Product } from "@prisma/client";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<CheckOutProduct[] | null>(
    null
  );
  const [products, setProducts] = useState<(Product | null)[] | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    const getCartProducts = async () => {
      const cartProducts = await getCurrentUserCart();
      setCartProducts(cartProducts);
      if (cartProducts && cartProducts.length > 0) {
        const products = await Promise.all(
          cartProducts.map(async (p) => await getProductById(p.id))
        );
        setProducts(products);
      }
    };

    getCartProducts();
  }, [isPending]);

  const removeCartProduct = (productId: string) => {
    startTransition(async () => {
      const res = await deleteProductFromCart(productId);
      toast(res.error || res.success);
    });
  };

  const incrementQuantity = (productId: string) => {
    setCartProducts((prevCartProducts) => {
      if (!prevCartProducts) return prevCartProducts;

      const updatedCartProducts = prevCartProducts.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });

      return updatedCartProducts;
    });
  };

  const decrementQuantity = (productId: string) => {
    setCartProducts((prevCartProducts) => {
      if (!prevCartProducts) return prevCartProducts;

      const updatedCartProducts = prevCartProducts.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity: p.quantity > 0 ? p.quantity - 1 : 0,
          };
        }
        return p;
      });

      return updatedCartProducts;
    });
  };

  const updateCartAndRedirect = async () => {
    toast("Preparing For Checkout");
    const res = await updateUserCart(cartProducts);

    if (!res) {
      toast("Checkout Failed");
    }
    router.push("/checkout/");
  };

  const CartProduct = ({ product }: { product: Product }) => (
    <TableRow>
      <TableCell className="flex items-center space-x-4">
        <div className="h-14 w-14 my-2">
          <Image
            src={product.image}
            alt={`${product.name} Image`}
            width={400}
            height={400}
          />
        </div>
        <h1 className="hidden sm:block font-semibold">{product.name}</h1>
      </TableCell>
      <TableCell className="max-sm:hidden">
        {product.isOnSale && product.discount ? (
          <Badge className="">{product.discount}%</Badge>
        ) : (
          <Badge className="">0%</Badge>
        )}
      </TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>
        <div className="flex items-start select-none">
          <div className="flex flex-col items-center">
            <span
              onClick={() => incrementQuantity(product.id)}
              className="cursor-pointer"
            >
              <ChevronUpIcon />
            </span>
            <span className="">
              {cartProducts &&
                cartProducts.find((p) => p.id === product.id)?.quantity}
            </span>
            <span
              onClick={() => decrementQuantity(product.id)}
              className="cursor-pointer"
            >
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <Button
          onClick={(_) => removeCartProduct(product.id)}
          variant="destructive"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <section className="px-5 my-10">
      <div>
        <h1 className="font-bold text-4xl">Continue Shopping</h1>
        <div className="h-[2px] bg-gray-500  w-full my-5" />
        <h1 className="font-bold text-2xl">Your Cart</h1>
        <p className="text-[12px] font-semibold text-gray-500">
          You Have {(cartProducts && cartProducts?.length) || 0} Item
          {cartProducts && cartProducts?.length > 1 ? "s" : ""} In Your Cart
        </p>
        {!cartProducts && (
          <ScaleLoader height={12} className="mt-5" color="cyan" loading />
        )}
        {!cartProducts ||
          (!(cartProducts.length > 0) && (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <h1 className="text-center font-semibold text-3xl py-20">
                Your Cart Is Empty
              </h1>
              <Link href="/categories/" className="hover:underline text-[12px]">
                Start Shopping
              </Link>
            </div>
          ))}
        {cartProducts && cartProducts.length > 0 && (
          <Table className="my-12">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="max-sm:hidden">Discount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products &&
                products.map(
                  (product) =>
                    product !== null && (
                      <CartProduct key={product.id} product={product} />
                    )
                )}
            </TableBody>
          </Table>
        )}
      </div>
      {cartProducts && cartProducts.length > 0 && (
        <div className="border-2 border-white w-full max-w-[400px] rounded-md sm:ml-auto mr-5 mx-auto px-5">
          <div className="flex justify-between items-center py-4">
            <h1 className="font-bold">Products</h1>
            <h1 className="font-bold">Prices</h1>
          </div>
          {cartProducts.map((product) => {
            const curProduct =
              products && products.find((p) => p && p.id === product.id);
            if (curProduct) {
              return (
                <div key={product.id} className="flex justify-between py-4">
                  <h1>{curProduct.name}</h1>
                  <p>
                    {calculateTotalPrice({
                      isOnSale: curProduct.isOnSale,
                      discount: curProduct.discount,
                      price: curProduct.price,
                      quantity: product.quantity,
                    })}
                  </p>
                </div>
              );
            }
          })}
          <Button onClick={updateCartAndRedirect} className="w-full my-5">
            CheckOut
          </Button>
        </div>
      )}
    </section>
  );
};

export default CartPage;
