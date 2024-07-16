"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import CardWrapper from "../auth/card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { NewCampaignSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createCampaign, deleteCampaign } from "@/server-actions/campaign";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Campaign, Category } from "@prisma/client";
import { getAllCategories } from "@/data/categories";
import { getAllProductsIdAndName } from "@/data/products";
import { ProductsWithIdAndName } from "@/types";
import { getAllCampaigns } from "@/data/campaigns";
import Image from "next/image";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { calculateTotalPrice } from "@/lib/price";

const CampaignsDashboard = () => {
  const form = useForm<z.infer<typeof NewCampaignSchema>>({
    resolver: zodResolver(NewCampaignSchema),
    defaultValues: {
      name: "",
      image: "",
      productOrCategoryUrl: "",
      typeCondition: "PRODUCT",
      priceCondition: "LESSTHAN",
      discountToSet: "0",
      productId: "",
      categoryId: "",
      priceCoefficient: "",
    },
  });

  const campaignType = form.watch("typeCondition");

  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);

  const toggleIsProductsOpen = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsProductsOpen((s) => !s);
  };

  const [imageFile, setImageFile] = useState<File | null>();
  const [error, setError] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [products, setProducts] = useState<ProductsWithIdAndName[] | null>(
    null
  );
  const [currentCamapignProducts, setCurrentCampaignProducts] = useState<
    ProductsWithIdAndName[] | null
  >(null);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [success, setSuccess] = useState<string | undefined>();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };

    const fetchProducts = async () => {
      const products = await getAllProductsIdAndName();
      setProducts(products);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await getAllCampaigns();
      setCampaigns(campaigns);
    };

    fetchCampaigns();
  }, [isSubmitPending]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);
    }
  };

  const deleteCurrentCampaign = (campaign: Campaign) => {
    startSubmitTransition(async () => {
      await deleteCampaign(campaign);
    });
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);
    imageFormData.append("folder", "Campaigns");

    try {
      const res: any = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });
      const data = await res.json();
      return data?.url;
    } catch (err) {
      return null;
    }
  };

  const onNewCampaignFormSubmit = (
    values: z.infer<typeof NewCampaignSchema>
  ) => {
    setError("");
    setSuccess("");
    startSubmitTransition(async () => {
      try {
        const imageUrl = await uploadImage();
        if (!imageUrl) {
          setError("Image Could Not Be Uploaded");
          return;
        }
        values.image = imageUrl;
        const data = await createCampaign(values);
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      } catch (err) {
        setError("Something Went Wrong");
      }
    });
  };

  return (
    <div className="w-full px-5">
      <div className="flex justify-between px-5 mt-5 border-[2px] border-gray-600 py-10 rounded-md">
        <h1 className="font-semibold text-3xl">Campaigns</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Campaign</Button>
          </DialogTrigger>
          <DialogContent className="max-h-full overflow-y-auto">
            <CardWrapper
              headerHeading="Create Campaign"
              headerLabel="Create New Campaign"
              className="border-none"
            >
              <Form {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(onNewCampaignFormSubmit)}
                >
                  <FormField
                    disabled={isSubmitPending}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormDescription className="text-[10px]">
                          Name Of Your Campaign
                        </FormDescription>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Campaign Name"
                            className=""
                            type="text"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={isSubmitPending}
                    control={form.control}
                    name="productOrCategoryUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OnClick URL</FormLabel>
                        <FormDescription className="text-[10px]">
                          The URL Where Customers Are Redirected After Clicking
                          On The Image
                        </FormDescription>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`${process.env.BASE_URL}/product-with-sale`}
                            className=""
                            type="text"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={isSubmitPending}
                    control={form.control}
                    name="discountToSet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Discount</FormLabel>
                        <FormDescription className="text-[10px]">
                          How Much Discount Should Be Applied The Product(s)
                        </FormDescription>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="30, 40 etc in %"
                            className=""
                            type="text"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled={isSubmitPending}
                    control={form.control}
                    name="typeCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <Collapsible>
                          <CollapsibleTrigger>
                            <h1 className="text-[10px] text-gray-400 hover:text-gray-500 cursor-pointer">
                              What To Apply The Discount On?
                            </h1>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <FormDescription className="text-[10px]">
                              <h1>Product - A Single Product</h1>
                              <h1>Category - A Whole Product</h1>
                              <h1>Price - Product(s) With Price Condition</h1>
                            </FormDescription>
                          </CollapsibleContent>
                        </Collapsible>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="PRODUCT">Product</SelectItem>
                                <SelectItem value="CATEGORY">
                                  Category
                                </SelectItem>
                                <SelectItem value="PRICE">Price</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {campaignType === "PRICE" && (
                    <>
                      <FormField
                        disabled={isSubmitPending}
                        control={form.control}
                        name="priceCondition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Condition</FormLabel>
                            <FormDescription className="text-[10px]">
                              Which Condition To Apply?
                            </FormDescription>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select A Condition" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="LESSTHAN">
                                      LESS THAN
                                    </SelectItem>
                                    <SelectItem value="None">None</SelectItem>
                                    <SelectItem value="GREATERTHAN">
                                      GREATER THAN
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled={isSubmitPending}
                        control={form.control}
                        name="priceCoefficient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Coeffecient</FormLabel>
                            <FormDescription className="text-[10px]">
                              The Price To Which The Condition Is Applied
                            </FormDescription>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {campaignType === "CATEGORY" && (
                    <FormField
                      disabled={isSubmitPending}
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormDescription className="text-[10px]">
                            Category To Which The Discount Is Applied
                          </FormDescription>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Category To Apply Discount" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {categories?.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.type}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  {campaignType === "PRODUCT" && (
                    <FormField
                      disabled={isSubmitPending}
                      control={form.control}
                      name="productId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product</FormLabel>
                          <FormDescription className="text-[10px]">
                            Product To Which The Discount Is Applied
                          </FormDescription>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Product To Apply Discount" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {products?.map((product) => (
                                    <SelectItem
                                      key={product.id}
                                      value={product.id}
                                    >
                                      {product.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  <input
                    className="hidden"
                    onChange={handleImageChange}
                    type="file"
                    accept="images/*"
                    ref={imageFileInputRef}
                  />
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    onClick={(e) => imageFileInputRef.current?.click()}
                    className="w-full"
                    disabled={isSubmitPending}
                    type="button"
                    variant="secondary"
                  >
                    {imageFile ? imageFile.name : "Choose Image"}
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitPending}
                  >
                    Create Campaign
                  </Button>
                </form>
              </Form>
            </CardWrapper>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col justify-between mt-5 space-y-5 py-5 rounded-md">
        {campaigns?.map((campaign) => (
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
                    <p className="text-[12px]">
                      {campaign.productOrCategoryUrl}
                    </p>
                  </div>
                  {campaign.modifiedCategoryId && (
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold">Category</h1>
                      <p className="text-[12px]">
                        {
                          categories?.find(
                            (category) =>
                              category.id === campaign.modifiedCategoryId
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
                      open={
                        isProductsOpen && currentCampaign?.id === campaign.id
                      }
                    >
                      <CollapsibleTrigger className="flex items-center space-x-2">
                        <ChevronDownIcon
                          className={
                            isProductsOpen ? "-rotate-180" : "rotate-0"
                          }
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
        ))}
      </div>
    </div>
  );
};

export default CampaignsDashboard;
