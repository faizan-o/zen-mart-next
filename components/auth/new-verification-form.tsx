"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { PulseLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { newVerification } from "@/server-actions/verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState } from "react";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) return;

    const data = await newVerification(token);
    if (data?.success) {
      setSuccess(data.success);
    }
    if (data?.error) {
      setError(data.error);
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerHeading="Verification"
      headerLabel="Verification Confirmation"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
    >
      {!success && !error && (
        <div className="flex items-center w-full justify-center">
          <PulseLoader color="#ffffff" />
        </div>
      )}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </CardWrapper>
  );
};

export default NewVerificationForm;
