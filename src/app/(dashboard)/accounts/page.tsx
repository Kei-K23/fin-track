"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewAccount } from "@/features/accounts/hook/use-new-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

export default function AccountPage() {
  const accountQuery = useGetAccounts();
  const deleteAccount = useDeleteAccount();
  const { onOpen } = useNewAccount();

  let isDisabled = accountQuery.isLoading || deleteAccount.isPending;

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
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Account page</CardTitle>
          <Button disabled={isDisabled} onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            <span>Add new</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filerKey="name"
            columns={columns}
            data={accountQuery.data!}
            disabled={isDisabled}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              deleteAccount.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
