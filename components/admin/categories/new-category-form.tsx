import CardWrapper from "@/components/auth/card-wrapper";
import CustomFormInput from "@/components/custom-form-input";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { NewCategorySchema } from "@/schemas";
import { createCategory } from "@/server-actions/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface NewCategoryFormProps {
  setError: (err: string) => void;
  setSuccess: (msg: string) => void;
  startTransition: TransitionStartFunction;
  isPending: boolean;
  error: string;
  success: string;
}

const NewCategoryForm = ({
  setError,
  setSuccess,
  startTransition,
  isPending,
  error,
  success,
}: NewCategoryFormProps) => {
  const form = useForm({
    resolver: zodResolver(NewCategorySchema),
    defaultValues: { type: "" },
  });

  const onSubmit = async (values: z.infer<typeof NewCategorySchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const data = await createCategory(values);
        data && data.error && setError(data?.error);
        data && data.success && setSuccess(data?.success);
      } catch (err) {
        setError("Something Went Wrong!");
      }
    });
  };

  return (
    <>
      <DialogTitle className="hidden">New Category</DialogTitle>
      <CardWrapper
        headerHeading="New Category"
        headerLabel="Create A New Category"
        backButtonHref=""
        backButtonLabel=""
        className="border-none"
      >
        <Form {...form}>
          <form
            className="mt-2 space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CustomFormInput
              formControl={form.control}
              inputType="TEXT_INPUT"
              isSubmitPending={isPending}
              label="Name"
              name="type"
              inputPlaceHolder="New Category Name"
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

export default NewCategoryForm;
