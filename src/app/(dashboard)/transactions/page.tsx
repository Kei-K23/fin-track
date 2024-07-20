"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transactions";
import { useNewTransaction } from "@/features/transactions/hook/use-new-transaction";

export default function TransactionPage() {
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useDeleteTransactions();
  const { onOpen } = useNewTransaction();
  const data = transactionsQuery.data || [];

  let isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

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
  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Transaction page
            </CardTitle>
            <Button disabled={isDisabled} onClick={onOpen}>
              <Plus className="size-4 mr-2" />
              <span>Add new</span>
            </Button>
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
