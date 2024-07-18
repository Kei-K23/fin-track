import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useNewAccount } from "../hook/use-new-account";

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your finance transactions.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      <SheetFooter>
        <button className="ml-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Create Account
        </button>
      </SheetFooter>
    </Sheet>
  );
}
