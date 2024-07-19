"use client";

import EditAccountSheet from "@/features/accounts/components/edit-account-sheet";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditCategorySheet from "@/features/categories/components/edit-category-sheet";
import NewCategorySheet from "@/features/categories/components/new-category-sheet";
import useIsMounted from "@/hooks/use-is-mounted";
import React from "react";

export default function SheetProvider() {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null; // SheetProvider should only render when the component is mounted
  }

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
}
