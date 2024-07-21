"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transactions";
import { useNewTransaction } from "@/features/transactions/hook/use-new-transaction";
import UploadButton from "./upload-button";
import ImportCard from "./import-card";
import { transactions } from "@/db/schema";
import useSelectAccountAndConfirmTransaction from "@/features/transactions/hook/use-select-account";
import { toast } from "sonner";
import { useCreateTransactions } from "@/features/transactions/api/use-create-transactions";

enum VARIANT {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_VALUE = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionPage() {
  const [AccountModal, confirm] = useSelectAccountAndConfirmTransaction();
  const [variant, setVariant] = useState<VARIANT>(VARIANT.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_VALUE);

  const onUpload = (results: typeof INITIAL_IMPORT_VALUE) => {
    console.log(results);

    setImportResults(results);
    setVariant(VARIANT.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_VALUE);
    setVariant(VARIANT.LIST);
  };

  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useDeleteTransactions();
  const createTransactions = useCreateTransactions();
  const { onOpen } = useNewTransaction();
  const data = transactionsQuery.data || [];

  let isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

  const onSubmitInput = async (
    values: (typeof transactions.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (isDisabled) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="w-[150px] h-[30px]" />
            <Skeleton className="w-[100px] h-[30px]" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Loader2 className="text-center size-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANT.IMPORT) {
    return (
      <>
        <AccountModal />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitInput}
        />
      </>
    );
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Transaction page
            </CardTitle>
            <div className="flex lg:flex-row flex-col gap-2">
              <Button disabled={isDisabled} onClick={onOpen}>
                <Plus className="size-4 mr-2" />
                <span>Add new</span>
              </Button>
              <UploadButton onUpload={onUpload} />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              filerKey="payee"
              columns={columns}
              data={data}
              disabled={isDisabled}
              onDelete={async (rows) => {
                const ids = rows.map((row) => row.original.id);
                deleteTransactions.mutate({ ids });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
