import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type ResponsiveNavigationProps = {
  routes: { href: string; label: string }[];
};
export default function ResponsiveNavigation({
  routes,
}: ResponsiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsOpen(true)}
          className="w-auto font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition bg-white/10"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-2">
        <nav className="flex flex-col gap-y-2 pt-6">
          {routes.map(({ href, label }) => (
            <Button
              onClick={() => onClick(href)}
              key={label}
              variant={href === pathname ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
