"use client";

import SettingsForm from "@/components/auth/settings-form";
import { useSearchParams } from "next/navigation";
import React from "react";

// @ts-ignore
const SettingsPage: React.FC = () => {
  const params = useSearchParams();

  if (params.get("redirected_from") === "login")
    return window.location.replace("/settings");

  return (
    <div className="h-full flex justify-center items-center">
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
