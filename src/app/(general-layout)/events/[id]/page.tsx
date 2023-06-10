import { H1 } from "~/components/typography";
import TicketCard from "../../ticket-card";
import { Badge } from "~/components/ui/badge";
import { data } from "./fake-data";
import { Button } from "~/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <main className="container py-10">
      <Link href="/">
        <Button size="sm" variant="ghost" className="flex gap-2">
          <CornerDownLeft className="w-4" />
          Go back
        </Button>
      </Link>
      <H1 className="flex items-center gap-5 mt-5 mb-10">Tickets</H1>
      <div className="grid grid-cols-4 gap-5">
        <TicketCard id="sample-id" />
        <TicketCard id="sample-id" />
        <TicketCard id="sample-id" />
      </div>
    </main>
  );
}
