import CardWrapper from "@/components/auth/card-wrapper";
import CustomFormInput from "@/components/custom-form-input";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CAMPAIGN_CONDITION_TYPES,
  CAMPAIGN_PRICE_CONDITION_TYPES,
} from "@/constants/dashboard";
import { NewCampaignSchema } from "@/schemas";
import { createCampaign } from "@/server-actions/campaign";
import { ProductsWithIdAndName } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product } from "@prisma/client";
import React, {
  TransitionStartFunction,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface NewCampaignFormProps {
  setError: React.Dispatch<string | undefined>;
  setSuccess: React.Dispatch<string | undefined>;
  startSubmitTransition: TransitionStartFunction;
  error: string;
  success: string;
  isSubmitPending: boolean;
  categories: Category[];
  products: ProductsWithIdAndName[];
}

const NewCampaignForm = ({
  setError,
  setSuccess,
  startSubmitTransition,
  error,
  success,
  isSubmitPending,
  categories,
  products,
}: NewCampaignFormProps) => {
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

  const categoryFieldOptions = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => ({
      value: category.id,
      label: category.type,
    }));
  }, [categories]);

  const productFieldOptions = useMemo(() => {
    if (!products) return [];

    return products.map((product) => ({
      value: product.id,
      label: product.name,
    }));
  }, [categories]);

  const campaignType = form.watch("typeCondition");

  const [imageFile, setImageFile] = useState<File | null>();
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);
    }
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
          <CustomFormInput
            formControl={form.control}
            name="name"
            label="Campaign Name"
            isSubmitPending={isSubmitPending}
            inputPlaceHolder="Biggest Laptop Sale etc"
            inputType="TEXT_INPUT"
          />
          <CustomFormInput
            formControl={form.control}
            name="productOrCategoryUrl"
            label="OnClick URL"
            isSubmitPending={isSubmitPending}
            inputPlaceHolder="https://zenmart.com/categories/:id"
            inputType="TEXT_INPUT"
          />
          <CustomFormInput
            formControl={form.control}
            name="discountToSet"
            label="Discount To Set"
            isSubmitPending={isSubmitPending}
            inputPlaceHolder="23 in %"
            inputType="TEXT_INPUT"
          />
          <CustomFormInput
            formControl={form.control}
            name="typeCondition"
            label="Discount To Set"
            isSubmitPending={isSubmitPending}
            inputPlaceHolder="23 in %"
            inputType="TEXT_INPUT"
          />
          <CustomFormInput
            formControl={form.control}
            name="typeCondition"
            label="Condition Type"
            isSubmitPending={isSubmitPending}
            inputType="SELECT"
            options={CAMPAIGN_CONDITION_TYPES}
          />
          {campaignType === "PRICE" && (
            <>
              <CustomFormInput
                formControl={form.control}
                name="priceCondition"
                label="Price Condition"
                isSubmitPending={isSubmitPending}
                inputType="SELECT"
                options={CAMPAIGN_PRICE_CONDITION_TYPES}
              />
              <CustomFormInput
                formControl={form.control}
                name="priceCoefficient"
                label="Price Coefficient"
                isSubmitPending={isSubmitPending}
                inputType="TEXT_INPUT"
              />
            </>
          )}
          {campaignType === "CATEGORY" && (
            <CustomFormInput
              formControl={form.control}
              name="categoryId"
              label="Category"
              isSubmitPending={isSubmitPending}
              inputType="SELECT"
              inputPlaceHolder="Select A Category"
              options={categoryFieldOptions}
            />
          )}
          {campaignType === "PRODUCT" && (
            <CustomFormInput
              formControl={form.control}
              name="productId"
              label="Product"
              isSubmitPending={isSubmitPending}
              inputType="SELECT"
              options={productFieldOptions}
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
          <Button type="submit" className="w-full" disabled={isSubmitPending}>
            Create Campaign
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewCampaignForm;
