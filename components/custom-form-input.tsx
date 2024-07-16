import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import type { Control } from "react-hook-form";
import { Input } from "./ui/input";
import {
  NewCampaignSchema,
  NewCategorySchema,
  NewProductSchema,
} from "@/schemas";
import * as z from "zod";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CustomFormInputProps {
  formControl: Control<z.infer<any>>;
  isSubmitPending: boolean;
  label: string;
  name: keyof z.infer<any>;
  inputPlaceHolder?: string;
  inputType: "SWITCH" | "TEXT_INPUT" | "SELECT";
  inputDescription?: string;
  options?: { label: string; value: string }[];
}

const CustomFormInput = ({
  formControl,
  isSubmitPending,
  label,
  name,
  inputPlaceHolder,
  inputType,
  inputDescription,
  options = [],
}: CustomFormInputProps) => {
  return (
    <FormField
      control={formControl}
      name={name as string}
      disabled={isSubmitPending}
      render={({ field }) => {
        if (inputType === "SELECT") {
          return (
            <FormItem className="w-full">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value as string}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={inputPlaceHolder || ""} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options &&
                        options.map((option) => (
                          <SelectItem
                            key={option.value}
                            className="w-full"
                            value={option.value}
                          >
                            <p className="w-full">{option.label}</p>
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          );
        }
        if (inputType === "SWITCH") {
          return (
            <FormItem className="flex justify-between items-center border-[1px] border-gray-700 p-5 rounded-md">
              <div className="">
                <FormLabel>{label}</FormLabel>
                {inputDescription && (
                  <FormDescription className="w-3/4">
                    {inputDescription}
                  </FormDescription>
                )}
              </div>
              <FormControl>
                <Switch
                  onCheckedChange={field.onChange}
                  checked={field.value as boolean}
                />
              </FormControl>
            </FormItem>
          );
        }
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {/*@ts-ignore*/}
              <Input {...field} placeholder={inputPlaceHolder || ""} />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default CustomFormInput;
