"use client";

import { usePathname } from "next/navigation";
import NavigationItem from "./navigation-item";
import { useMedia } from "react-use";
import ResponsiveNavigation from "./responsive-navigation";

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
  // Mobile view
  const isMobile = useMedia("(max-width: 1024px)", false);

  // Responsive navigation for mobile views
  if (isMobile) {
    return <ResponsiveNavigation routes={ROUTES} />;
  }

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
