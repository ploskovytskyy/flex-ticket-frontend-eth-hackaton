import { H1, Large, Subtle } from "~/components/typography";
import TicketCard from "../../ticket-card";
import { Badge } from "~/components/ui/badge";
import { data } from "./fake-data";
import { Button } from "~/components/ui/button";
import { CornerDownLeft, PartyPopper, Ticket } from "lucide-react";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <main className="relative container py-10">
      <Subtle className="absolute top-5">
        <Link href="/" className="hover:text-foreground">
          Events
        </Link>
        {" / "}
        <Link href="/" className="text-foreground underline">
          Event Name
        </Link>
      </Subtle>
      {/* <Subtle>by: 0x239CaA02A475b78Ff90B32291757653eC4Ac6c3e</Subtle> */}
      <H1 className="flex items-center gap-3 mt-5 mb-4">
        <PartyPopper className="w-8 h-8" />
        Event name
      </H1>
      <p className="mb-2 font-medium">10 Jun 2023 - 13 Jun 2023</p>
      <p className="mb-10 max-w-xl text-slate-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        aliquid ut officiis ratione sed voluptate in quod obcaecati repudiandae.
        Aliquam consectetur fugit incidunt sit, voluptates hic impedit animi
        dolorum quasi.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        <TicketCard id="sample-id" />
        <TicketCard id="sample-id" />
        <TicketCard id="sample-id" />
      </div>
      <Subtle>
        Event created by: 0x239CaA02A475b78Ff90B32291757653eC4Ac6c3e
      </Subtle>
    </main>
  );
}
