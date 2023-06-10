import Link from "next/link";
import HeaderAccount from "./account";
import { Button } from "~/components/ui/button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="py-4 border-b">
        <div className="flex items-center justify-between container">
          <div className="flex items-center gap-20">
            <Link href="/" className="">
              <span className="font-black text-xl">Flex Ticket</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button asChild variant="link">
              <Link href="/" className="">
                Explore events
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/dashboard" className="">
                Dashboard
              </Link>
            </Button>
            <span className="block mx-4 h-[30px] w-[1px] bg-border" />
            <HeaderAccount />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
