"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DefaultRedirectAfterLogin } from "@/constants/routes";
import { useSearchParams } from "next/navigation";

const Social = () => {
  type AuthenticationProvider = "google" | "github";

  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL");

  const onClickHandler = async (
    provider: AuthenticationProvider
  ): Promise<void> => {
    await signIn(provider, {
      callbackUrl: callbackURL || DefaultRedirectAfterLogin,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => onClickHandler("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClickHandler("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
