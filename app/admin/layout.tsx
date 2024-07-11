import React from "react";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="h-full">{children}</div>;
};

export default AdminLayout;
