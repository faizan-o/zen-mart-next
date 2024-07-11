"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import RegisterForm from "./register-form";
import { Button } from "../ui/button";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const RegisterButton = ({
  children,
  mode = "redirect",
  asChild,
}: RegisterButtonProps) => {
  const router = useRouter();

  const onRegisterButtonClick = (): void => {
    router.push("/auth/register");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={ asChild }>
          { children }
        </DialogTrigger>
        <DialogContent>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button className="w-full" onClick={onRegisterButtonClick}>
      {children}
    </Button>
  );
};

export default RegisterButton;
