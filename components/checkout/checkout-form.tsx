"use client";
import * as z from "zod";
import { CheckoutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import CardWrapper from "../auth/card-wrapper";
import { Input } from "../ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CartProduct } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { OrderProduct } from "@prisma/client";
import { createOrder } from "@/server-actions/order";
import { toast } from "sonner";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";

const CheckOutForm = ({
  areCartProductsThere,
  cartProducts,
  totalPrice,
}: {
  areCartProductsThere: boolean;
  cartProducts: CartProduct[];
  totalPrice: number;
}) => {
  const user = useCurrentUser();
  const [orderProducts, setOrderProducts] = useState<OrderProduct[] | null>(
    null
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      customerName: user?.name || "",
      customerEmail: user?.email || "",
      customerCountry: "",
      customerCity: "",
      customerState: "",
      customerAddress: "",
      customerPhoneNumber: "",
      paymentMethod: "CashOnDelivery",
      totalPrice: totalPrice,
      hasBeenPaid: false,
    },
  });

  useEffect(() => {
    const products: OrderProduct[] = cartProducts.map((p) => ({
      id: p.id,
      quantity: p.quantity,
    }));
    setOrderProducts(products);
  }, []);

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (values: z.infer<typeof CheckoutSchema>) => {
    const data = await createOrder(values, orderProducts);
    toast(data.success || data.error);
    if (values.paymentMethod === "OnlinePayment" && data.orderId) {
      router.push(`/payment/${data.orderId}`);
    }
  };

  return (
    <CardWrapper
      className="mt-5 md:mt-0 w-full"
      headerHeading="Checkout"
      headerLabel="Place Your Order"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              name="customerName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerPhoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerCountry"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerState"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerCity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerZipCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your ZipCode</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerAddress"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="paymentMethod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select A Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Payment Methods</SelectLabel>
                          <SelectItem value="CashOnDelivery">
                            Cash On Delivery
                          </SelectItem>
                          <SelectItem value="OnlinePayment">
                            Online Payment
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {paymentMethod === "OnlinePayment" ? (
              <Button type="submit" className="w-full py-5">
                Proceed To Payment
              </Button>
            ) : (
              <Button className="w-full py-2" type="submit">
                Place Order
              </Button>
            )}
            <ErrorMessage
              errors={form.formState.errors}
              name="customerZipCode"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default CheckOutForm;
