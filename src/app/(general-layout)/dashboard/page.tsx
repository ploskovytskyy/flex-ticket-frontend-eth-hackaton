"use client";

import { H1, H3 } from "~/components/typography";
import MyTicketCard from "../my-ticket-card";
import { Badge } from "~/components/ui/badge";
import { useAccount, useNetwork } from "wagmi";
import { Connect } from "~/components/connect";
import ReadContract from "~/components/read-contract";
import MyEventCard from "../my-event-card";
import CreateContract from "./crete-contract";
import AddItem from "../add-card";
import Link from "next/link";

export default function Page() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainBadge = chain?.name ?? chain?.id;

  return (
    <main className="container py-10">
      {isConnected ? (
        <>
          <H1 className="flex items-center gap-5 mt-4 mb-10">
            My events
            <Badge variant="secondary">{chainBadge}</Badge>
          </H1>
          <ReadContract filterByAddress functionName="getAllEvents">
            {({ data }) => (
              <>
                {data.map((event, index) => {
                  return (
                    <MyEventCard
                      key={index}
                      id="sample-id"
                      name="Name"
                      description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
                      startDate="10 Jun 2023"
                      endDate="13 Jun 2023"
                    />
                  );
                })}
                <Link href="/events/create" className="min-h-[230px]">
                  <AddItem />
                </Link>
              </>
            )}
          </ReadContract>
          <hr className="my-10" />
          <H1 className="flex items-center gap-5 mt-4 mb-10">
            Purchased tickets
            <Badge variant="secondary">{chainBadge}</Badge>
          </H1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <MyTicketCard id="sample-id" />
          </div>
        </>
      ) : (
        <div className="grid gap-5 max-w-lg px-5 py-5 rounded-lg border mx-auto my-40 text-center">
          <H3>Connect your wallet</H3>
          <Connect />
        </div>
      )}
    </main>
  );
}
