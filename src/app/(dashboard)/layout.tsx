import { Header } from "@/components/common/header";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-14">{children}</main>
    </>
  );
}
