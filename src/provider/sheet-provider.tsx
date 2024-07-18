"use client";

import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
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
    </>
  );
}