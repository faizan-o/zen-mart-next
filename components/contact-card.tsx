"use client";

import { FaMailBulk } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaVoicemail,
  FaYoutube,
} from "react-icons/fa6";
import { FcCallback } from "react-icons/fc";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactUsSchema } from "@/schemas";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import * as z from "zod";
import { sendCustomerContactEmail } from "@/server-actions/contact";
import { toast } from "sonner";
import { useTransition } from "react";

const ContactCard = () => {
  const form = useForm({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ContactUsSchema>) => {
    startTransition(async () => {
      const data = await sendCustomerContactEmail(values);
      toast(data.success || data.error);
      form.reset();
    });
  };

  const LeftCard = () => (
    <div className="w-full md:w-[50%] py-10">
      <h1 className="font-bold text-2xl">Contact Creators</h1>
      <p className="text-sm text-gray-400">
        Contact Creator Directly Through Email Or Phone Number.
      </p>
      <div className="py-5 flex items-center space-x-2">
        <FaMailBulk className="text-cyan-600" />
        <h1 className="text-sm text-gray-400">roocking.prince@gmail.com</h1>
      </div>
      <div className="py-5 flex items-center space-x-2">
        <FcCallback />
        <h1 className="text-sm text-gray-400">+192 6789 9908</h1>
      </div>
      <div className="py-5 flex items-center space-x-2">
        <FaInstagram className="text-cyan-600" />
        <h1 className="text-sm text-gray-400">Muhammad Faizan</h1>
      </div>
      <div className="py-5 flex items-center space-x-2">
        <FaFacebook className="text-cyan-600" />
        <h1 className="text-sm text-gray-400">@muhammad_faizan</h1>
      </div>
      <div className="py-5 flex items-center space-x-2">
        <FaLinkedin className="text-cyan-600" />
        <h1 className="text-sm text-gray-400">@faizan</h1>
      </div>
      <div className="py-5 flex items-center space-x-2">
        <FaYoutube className="text-cyan-600" />
        <h1 className="text-sm text-gray-400">@next-dev</h1>
      </div>
      <div className="py-5 flex items-center space-x-2">
        <FaTwitter className="text-cyan-600" />
        <h1 className="text-sm text-gray-400">@next-dev-twitter</h1>
      </div>
    </div>
  );

  const RightCard = () => (
    <div className="w-full md:w-[50%] py-10">
      <Form {...form}>
        <h1 className="font-bold text-2xl">Contact Form</h1>
        <p className="text-sm text-gray-400">
          Fill Your Details Below And Hit Send To Notify The Creators
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 px-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Name" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-5 px-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-5 px-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none h-[20rem]"
                      placeholder="Your Message Here"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full py-5 my-4"
            >
              Send Message
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  return (
    <div
      style={{
        boxShadow: "-5px -5px 10px #00000099, 5px 5px 10px #00000099",
      }}
      className="w-[90%] flex flex-col-reverse md:flex-row px-10"
    >
      <LeftCard />
      <RightCard />
    </div>
  );
};

export default ContactCard;
