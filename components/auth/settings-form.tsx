"use client";

import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateData } from "@/server-actions/update-data";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { signOutUser } from "@/server-actions/sign-out-user";
import { toast } from "sonner";

const SettingsForm = () => {
  const currentUser = useCurrentUser();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: currentUser?.name || "",
      isTwoFactorEnabled: false,
    },
  });

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      try {
        const data = await updateData(values, currentUser?.id);
        setSuccess(data?.success);
        setError(data?.error);
      } catch (error) {
        setError("Something Went Wrong");
      }
    });
  };

  const logout = async () => {
    toast("Signing Out");
    await signOutUser();
  };

  return (
    <CardWrapper
      headerHeading="Settings"
      headerLabel="User Settings"
      backButtonLabel="Back To Home Page"
      backButtonHref="/"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className="font-semibold"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-row justify-between items-center border-[1px] border-gray-800 rounded-md p-4">
                <div>
                  <FormLabel className="text-[18px]">
                    Two Factor Authentication
                  </FormLabel>
                  <FormDescription className="text-[10px] w-3/4 mt-1">
                    Enable Two Factor Authentication To Receive An OTP Every
                    Time You Log In For Better Protection
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-4">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button type="submit" className="w-full mt-4">
            Update Data
          </Button>
          <Link href="/reset">
            <Button variant="secondary" className="w-full mt-4">
              Change Password
            </Button>
          </Link>
          <Button onClick={logout} variant="secondary" className="w-full mt-4">
            Sign Out
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SettingsForm;
