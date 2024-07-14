import Header from "@/components/common/header";
import React from "react";

type DashboardLayoutProps = {
  child: React.ReactNode;
};
export default function DashboardLayout({ child }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-14">{child}</main>
    </>
  );
}
