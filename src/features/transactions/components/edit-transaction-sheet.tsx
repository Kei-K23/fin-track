import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenTransaction } from "../hook/use-open-transaction";
import { Loader2 } from "lucide-react";
import useConfirm from "@/hooks/use-confirm";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useGetTransaction } from "../api/use-get-transaction";
import TransactionCreateForm from "./transaction-create-form";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export default function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();
  const editTransaction = useEditTransaction(id);
  const getTransaction = useGetTransaction(id);
  const getAccounts = useGetAccounts();
  const accountCreate = useCreateAccount();
  const getCategories = useGetCategories();
  const categoryCreate = useCreateCategory();
  const deleteTransaction = useDeleteAccount(id);
  const accountOptions = getAccounts.data
    ? getAccounts.data.map((a) => ({
        label: a.name,
        value: a.id,
      }))
    : [];
  const categoryOptions = getCategories.data
    ? getCategories.data.map((c) => ({
        label: c.name,
        value: c.id,
      }))
    : [];
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Delete transaction",
    message: "Are you sure you want to delete this transaction?",
  });

  const onSubmit = (values: FormValues) => {
    editTransaction.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const isOk = await confirm();
    if (isOk) {
      deleteTransaction.mutate(
        { id },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const onCreateCategory = (name: string) =>
    categoryCreate.mutate({
      name,
    });

  const onCreateAccount = (name: string) =>
    accountCreate.mutate({
      name,
    });

  const isLoading =
    getTransaction.isLoading ||
    getAccounts.isLoading ||
    getCategories.isLoading;

  const isPending =
    editTransaction.isPending ||
    deleteTransaction.isPending ||
    accountCreate.isPending ||
    getTransaction.isLoading ||
    categoryCreate.isPending;

  const defaultValue = getTransaction.data
    ? {
        accountId: getTransaction.data.accountId,
        categoryId: getTransaction.data.categoryId,
        amount: getTransaction.data.amount.toString(),
        date: getTransaction.data.date
          ? new Date(getTransaction.data.date)
          : new Date(),
        notes: getTransaction.data.notes,
        payee: getTransaction.data.payee,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        notes: "",
        payee: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit or delete an existing transaction
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionCreateForm
              id={getTransaction.data?.id}
              onSubmit={onSubmit}
              defaultValue={defaultValue}
              disabled={isPending}
              onDelete={onDelete}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
