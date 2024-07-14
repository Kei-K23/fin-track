"use client";

import { usePathname } from "next/navigation";
import NavigationItem from "./navigation-item";

const ROUTES = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex gap-x-2 overflow-x-hidden">
      {ROUTES.map(({ href, label }) => (
        <NavigationItem
          key={label}
          href={href}
          label={label}
          isActive={pathname === href}
        />
      ))}
    </nav>
  );
}
