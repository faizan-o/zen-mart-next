import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { deleteProduct } from "@/server-actions/product";
import { Category, Product } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TransitionStartFunction } from "react";

const ProductComponent = ({
  product,
  categories,
  startTransition,
}: {
  product: Product;
  categories: Category[];
  startTransition: TransitionStartFunction;
}) => {
  const onProductDelete = (productId: string) => {
    startTransition(async () => await deleteProduct(productId));
  };

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
              categories?.find((category) => category.id === product.categoryId)
                ?.type
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

export default ProductComponent;
