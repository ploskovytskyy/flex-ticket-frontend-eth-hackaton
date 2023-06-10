"use client";

import Link from "next/link";
import HeaderAccount from "./account";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import logo from "../flex-ticket-logo.svg";

import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const links = [
  {
    href: "/",
    label: "Explore events",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
  },
];

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div>
      <header className="py-4 border-b">
        <div className="flex items-center justify-between container">
          <div className="flex items-center gap-20">
            <Link href="/">
              <Image alt="Flex Ticket" src={logo} width={140} />
            </Link>
          </div>
          <div className="flex items-center">
            {links.map(({ href, label }) => (
              <Button key={href} asChild variant="link">
                <Link
                  href={href}
                  className={cn(href === pathname && "underline")}
                >
                  {label}
                </Link>
              </Button>
            ))}
            <span className="block mx-4 h-[30px] w-[1px] bg-border" />
            <HeaderAccount />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
