import { H1, Subtle } from "~/components/typography";
import TicketCard from "../../ticket-card";
import { Badge } from "~/components/ui/badge";
import { data } from "./fake-data";
import { Button } from "~/components/ui/button";
import { CornerDownLeft, Ticket } from "lucide-react";
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
      <H1 className="flex items-center gap-3 mt-5 mb-10">
        <Ticket className="w-8 h-8" />
        Tickets
      </H1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <TicketCard id="sample-id" />
        <TicketCard id="sample-id" />
        <TicketCard id="sample-id" />
      </div>
    </main>
  );
}
