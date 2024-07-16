import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateTotalPrice } from "@/lib/price";
import { deleteCampaign } from "@/server-actions/campaign";
import { ProductsWithIdAndName } from "@/types";
import { Campaign, Category } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { TransitionStartFunction, useEffect, useState } from "react";

interface CampaignComponentProps {
  campaign: Campaign;
  categories: Category[];
  products: ProductsWithIdAndName[] | null;
  startSubmitTransition: TransitionStartFunction;
}

const CampaignComponent = ({
  campaign,
  categories,
  products,
  startSubmitTransition,
}: CampaignComponentProps) => {
  const [currentCamapignProducts, setCurrentCampaignProducts] = useState<
    ProductsWithIdAndName[] | null
  >(null);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    let productsToSet: ProductsWithIdAndName[] = [];

    if (!currentCampaign) return;

    products?.forEach((product) => {
      if (currentCampaign?.modifiedProductIds.includes(product.id)) {
        productsToSet.push(product);
      }
    });

    setCurrentCampaignProducts(productsToSet);
  }, [currentCampaign, products]);

  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);

  const toggleIsProductsOpen = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsProductsOpen((s) => !s);
  };

    const deleteCurrentCampaign = (campaign: Campaign) => {
        startSubmitTransition(async () => {
        await deleteCampaign(campaign);
        });
    };

  return (
    <div
      className="border-[2px] w-full px-5 py-5 space-y-4 border-gray-600 rounded-md flex flex-col"
      key={campaign.id}
    >
      <div className="w-full h-fit">
        <Image
          src={campaign.image}
          width={2560}
          height={1440}
          alt="Campaign Image"
          className="w-full rounded-md object-cover"
        />
      </div>
      <Collapsible>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-2xl">{campaign.name}</h1>
            <CollapsibleTrigger
              asChild
              className="rounded-md p-1 border-[2px] border-gray-600 cursor-pointer active:bg-gray-50/5"
            >
              <div>
                <ChevronDownIcon />
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-5 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">ID</h1>
              <p className="font-semibold">{campaign.id}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Type</h1>
              <p className="font-semibold">{campaign.type}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Discount Applied</h1>
              <p className="font-semibold">{campaign.discountSet}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">URL</h1>
              <p className="text-[12px]">{campaign.productOrCategoryUrl}</p>
            </div>
            {campaign.modifiedCategoryId && (
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Category</h1>
                <p className="text-[12px]">
                  {
                    categories?.find(
                      (category) => category.id === campaign.modifiedCategoryId
                    )?.type
                  }
                </p>
              </div>
            )}
            {campaign.type === "PRICE" && (
              <>
                <div className="flex justify-between space-y-4 items-center">
                  <h1 className="font-semibold">Price Coefficient</h1>
                  <p className="">{campaign.priceCoefficient}</p>
                </div>
                <div className="flex justify-between space-y-4 items-center">
                  <h1 className="font-semibold">Price Condition</h1>
                  <p className="">{campaign.priceCondition}</p>
                </div>
              </>
            )}
            {campaign.modifiedProductIds && (
              <Collapsible
                onOpenChange={(e) => toggleIsProductsOpen(campaign)}
                open={isProductsOpen && currentCampaign?.id === campaign.id}
              >
                <CollapsibleTrigger className="flex items-center space-x-2">
                  <ChevronDownIcon
                    className={isProductsOpen ? "-rotate-180" : "rotate-0"}
                  />
                  <h1 className="font-semibold">Products</h1>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-5 space-x-3">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Original Price</TableHead>
                        <TableHead>Sale Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCamapignProducts?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.price}$</TableCell>
                          <TableCell>
                            {calculateTotalPrice({
                              isOnSale: !!product.discount,
                              discount: product.discount,
                              price: product.price,
                            })}
                            $
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </Collapsible>
            )}
            <div className="flex justify-between items-center">
              <h1>Delete Campaign</h1>
              <Button
                variant="destructive"
                type="button"
                onClick={(e) => deleteCurrentCampaign(campaign)}
              >
                Delete
              </Button>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default CampaignComponent;
