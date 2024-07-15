"use server";

import { sendContactEmail } from "@/lib/mail";
import { ContactUsSchema } from "@/schemas";
import { ResponseData } from "@/types";
import * as z from "zod";

export const sendCustomerContactEmail = async (
  values: z.infer<typeof ContactUsSchema>
): Promise<ResponseData> => {
  const validated = ContactUsSchema.safeParse(values);

  if (!validated.success) return { error: "Invalid Input!" };

  try {
    const { name, email, message } = validated.data;
    await sendContactEmail(name, email, message);
    return { success: "Email Sent Successfully!" };
  } catch (err) {
    return { error: "Failed To Send Email" };
  }
};
