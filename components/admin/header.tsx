import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import NewProductForm from "./product/new-product-form";
import { DialogTitle } from "@radix-ui/react-dialog";

interface HeaderProps {
  heading: string;
  hasButton: boolean;
  children?: React.ReactNode;
  btnLabel?: string;
}

const HeaderWithCreationDialog = ({
  heading,
  hasButton,
  children,
  btnLabel,
}: HeaderProps) => {
  if (hasButton) {
    return (
      <Dialog>
        <div className="border-[1px] w-full my-10 rounded-md border-gray-700 flex justify-between px-5 py-10">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <DialogTrigger asChild>
            <Button variant="default" className="font-semibold">
              {btnLabel}
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[500px] overflow-y-auto
            max-h-screen"
          >
            <DialogTitle className="hidden">{btnLabel}</DialogTitle>
            {children}
          </DialogContent>
        </div>
      </Dialog>
    );
  }
  return (
    <div className="border-[1px] mt-2 rounded-md w-full border-gray-700 flex justify-between px-5 py-10">
      <h1 className="text-3xl font-bold">{heading}</h1>
    </div>
  );
};

export default HeaderWithCreationDialog;
