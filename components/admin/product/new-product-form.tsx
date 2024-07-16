import CardWrapper from "@/components/auth/card-wrapper";
import CustomFormInput from "@/components/custom-form-input";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { NewProductSchema } from "@/schemas";
import { createProduct } from "@/server-actions/product";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import React, {
  type TransitionStartFunction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface NewProductFormProps {
  startSubmitTransition: TransitionStartFunction;
  isSubmitPending: boolean;
  categories: Category[];
}

const NewProductForm = ({
  startSubmitTransition,
  isSubmitPending,
  categories,
}: NewProductFormProps) => {
  const categoryFieldOptions =
    categories &&
    categories.map((c) => ({
      label: c.type,
      value: c.id,
    }));

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: "",
      isOnSale: false,
      discount: "",
      categoryId: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isOnSale = form.watch("isOnSale");

  useEffect(() => {
    isOnSale ? form.setValue("discount", "") : null;
  }, [isOnSale, form]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

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
    imageFormData.append("folder", "Products");

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

  const onSubmit = async (values: z.infer<typeof NewProductSchema>) => {
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
        const data = await createProduct(values);
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      } catch (err) {
        setError("Something Went Wrong");
      }
    });
  };

  return (
    <>
      <DialogTitle className="hidden">New Product</DialogTitle>
      <CardWrapper
        headerHeading="New Product"
        className="border-none font-medium"
        lessGap
      >
        <Form {...form}>
          <form
            className="mt-2 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CustomFormInput
              formControl={form.control}
              name="name"
              label="Name"
              isSubmitPending={isSubmitPending}
              inputPlaceHolder="Product Name"
              inputType="TEXT_INPUT"
            />
            <CustomFormInput
              formControl={form.control}
              name="description"
              label="Description"
              isSubmitPending={isSubmitPending}
              inputPlaceHolder="Product Description"
              inputType="TEXT_INPUT"
            />
            <CustomFormInput
              formControl={form.control}
              name="price"
              label="Price"
              isSubmitPending={isSubmitPending}
              inputPlaceHolder="Product Price ($)"
              inputType="TEXT_INPUT"
            />
            <CustomFormInput
              formControl={form.control}
              inputType="SWITCH"
              isSubmitPending={isSubmitPending}
              label="Is On Sale"
              inputDescription="Set Wether The Product Will Have The Given Discount"
              name="isOnSale"
            />
            {isOnSale && (
              <CustomFormInput
                formControl={form.control}
                inputType="TEXT_INPUT"
                isSubmitPending={isSubmitPending}
                label="Discount"
                inputPlaceHolder="Discount In %"
                name="discount"
              />
            )}
            <CustomFormInput
              formControl={form.control}
              name="categoryId"
              isSubmitPending={isSubmitPending}
              label="Category"
              inputType="SELECT"
              options={categoryFieldOptions}
              inputPlaceHolder="Select A Category"
            />
            <input
              className="hidden"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              disabled={isSubmitPending}
              className="w-full"
              variant="outline"
            >
              {imageFile?.name || "Choose Image"}
            </Button>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isSubmitPending}>
              Create Product
            </Button>
            <ErrorMessage
              errors={form.formState.errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

export default NewProductForm;
