import * as z from "zod";

export const NewCampaignSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  productOrCategoryUrl: z.string(),
  typeCondition: z.enum(["PRODUCT", "CATEGORY", "PRICE"]),
  priceCondition: z.enum(["LESSTHAN", "GREATERTHAN"]).optional(),
  discountToSet: z
    .string()
    .refine((num) => !isNaN(parseFloat(num)))
    .optional(),
  productId: z.string().optional(),
  categoryId: z.string().optional(),
  priceCoefficient: z.string().optional(),
});

export const UpdateProductSchema = z.object({
  name: z.string().min(4, "Min 4 Characters"),
  description: z.string().min(1, "Cannot Be Empty"),
  price: z.string().refine((price) => !isNaN(parseFloat(price)), {
    message: "Must Be A Decimal Number",
  }),
  isOnSale: z.boolean(),
  discount: z.optional(
    z.string().refine((discount: string) => !isNaN(parseFloat(discount)), {
      message: "Must Be A Decimal Number",
    })
  ),
  categoryId: z.string(),
});

export const NewProductSchema = z.object({
  name: z.string().min(4, "Min 4 Characters"),
  image: z.string().optional(),
  description: z.string().min(1, "Cannot Be Empty"),
  price: z.string().refine((price) => !isNaN(parseFloat(price)), {
    message: "Must Be A Decimal Number",
  }),
  isOnSale: z.boolean(),
  discount: z.optional(
    z.string().refine((discount: string) => !isNaN(parseFloat(discount)), {
      message: "Must Be A Decimal Number",
    })
  ),
  categoryId: z.string(),
});

export const NewCategorySchema = z.object({
  type: z.string().min(4, "Min 4 Characters"),
});

export const EditCategorySchema = z.object({
  type: z.string().min(4, "Min 4 Characters"),
});

export const SettingsSchema = z.object({
  name: z.string(),
  isTwoFactorEnabled: z.boolean(),
});

export const ResetSchema = z.object({
  email: z.string().email("Email Is Required"),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Min 6 Characters Required"),
});

export const LoginSchema = z.object({
  email: z.string().email("Email Is Required"),
  password: z.string().min(1, "Password Is Required"),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email("Email Is Required"),
  password: z.string().min(6, "Minimum Six Characters Required"),
  name: z.string().min(4, "Four Character Username Required"),
});
