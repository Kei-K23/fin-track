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
import { useOpenAccount } from "../hook/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import useConfirm from "@/hooks/use-confirm";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();
  const mutation = useEditAccount(id);
  const getAccount = useGetAccount(id);
  const deleteAccount = useDeleteAccount(id);
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete account",
    message: "Are you sure you want to delete this account?",
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const isOk = await confirm();
    if (isOk) {
      deleteAccount.mutate(
        { id },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const isDisabled = getAccount.isLoading || deleteAccount.isPaused;

  const defaultValue = getAccount.data
    ? {
        name: getAccount.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>
              Edit or delete an existing account
            </SheetDescription>
          </SheetHeader>
          {isDisabled ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountCreateForm
              id={getAccount.data?.id}
              onSubmit={onSubmit}
              defaultValue={defaultValue}
              disabled={isDisabled}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
