"use client";

import { H1 } from "~/components/typography";
import EventCard from "./event-card";
import { Search } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { useNetwork } from "wagmi";

export default function Home() {
  const { chain } = useNetwork();
  const chainBadge = chain?.name ?? chain?.id;
  return (
    <main className="container py-10">
      <H1 className="flex items-center gap-3 mt-4 mb-10">
        <Search className="w-8 h-8" />
        Explore Events
        <Badge variant="secondary">{chainBadge}</Badge>
      </H1>
      <div className="grid grid-cols-4 gap-5">
        <EventCard
          id="sample-id"
          name="Lorem ipsum dolor, sit amet consectetur"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="0x239CaA02A475b78Ff90B32291757653eC4Ac6c3e"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
      </div>
    </main>
  );
}
