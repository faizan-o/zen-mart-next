import { auth, signOut } from "@/auth";
import SettingsForm from "@/components/auth/settings-form";
import React from "react";

const SettingsPage: React.FC = async () => {
  return (
    <div className="h-full flex justify-center items-center">
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
