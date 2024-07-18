import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useNewAccount } from "../hook/use-new-account";
import AccountCreateForm from "./account-create-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();

  const onSubmit = (values: FormValues) => {
    console.log({ values });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your finance transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountCreateForm onSubmit={onSubmit} defaultValue={{ name: "" }} />
      </SheetContent>
    </Sheet>
  );
}
