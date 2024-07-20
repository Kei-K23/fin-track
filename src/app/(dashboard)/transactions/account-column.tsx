import { Button } from "@/components/ui/button";
import { useOpenAccount } from "@/features/accounts/hook/use-open-account";
import React from "react";

type AccountColumnProps = {
  account: string | null;
  accountId: string | null;
};
export default function AccountColumn({
  account,
  accountId,
}: AccountColumnProps) {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    if (!accountId) return;
    onOpenAccount(accountId);
  };
  return (
    <Button onClick={onClick} variant={"link"}>
      {account}
    </Button>
  );
}
