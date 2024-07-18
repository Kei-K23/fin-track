"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hook/use-new-account";

export default function HomePage() {
  const { onOpen } = useNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>Add new account</Button>
    </div>
  );
}
