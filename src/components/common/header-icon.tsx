import { Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderIcon() {
  return (
    <Link href={"/"} className="hidden lg:flex items-center">
      <Wallet className="w-8 h-8 text-white" />
      <p className="text-2xl font-semibold text-white ml-2.5">FinTrack</p>
    </Link>
  );
}
