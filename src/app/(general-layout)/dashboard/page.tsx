"use client";

import { H1 } from "~/components/typography";
import MyEventCard from "../my-event-card";
import MyTicketCard from "../my-ticket-card";
import AddItem from "../add-card";
import { Badge } from "~/components/ui/badge";
import { useNetwork } from "wagmi";

export default function Page() {
  const { chain } = useNetwork();
  const chainBadge = chain?.name ?? chain?.id;
  return (
    <main className="container py-10">
      <H1 className="flex items-center gap-5 mt-4 mb-10">
        My events
        <Badge variant="secondary">{chainBadge}</Badge>
      </H1>
      <div className="grid grid-cols-4 gap-5">
        <MyEventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <MyEventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <AddItem />
      </div>
      <hr className="my-10" />
      <H1 className="flex items-center gap-5 mt-4 mb-10">
        My tickets
        <Badge variant="secondary">{chainBadge}</Badge>
      </H1>
      <div className="grid grid-cols-4 gap-5">
        <MyTicketCard id="sample-id" />
      </div>
    </main>
  );
}
