import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import AccountCreateForm from "./account-create-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useOpenAccount } from "../hook/use-open-account";
import { useGetAccount } from "../api/use-get-account";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();
  const mutation = useCreateAccount();
  const getAccount = useGetAccount(id);

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
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
        <AccountCreateForm
          id={getAccount.data?.id}
          onSubmit={onSubmit}
          defaultValue={{ name: "" }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
