import { Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderIcon() {
  return (
    <Link href={"/"} className="hidden lg:flex items-center group">
      <Wallet className="w-6 h-6 text-white group-hover:animate-pulse" />
      <p className="text-[20px] font-semibold text-white ml-2.5">FinTrack</p>
    </Link>
  );
}
