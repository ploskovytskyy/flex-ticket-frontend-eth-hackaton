"use client";

import { H1, Subtle } from "~/components/typography";
import TicketCard from "../../ticket-card";
import { PartyPopper } from "lucide-react";
import Link from "next/link";
import ReadContract from "~/components/read-contract";
import { bigIntToDate } from "~/lib/utils";
import { notFound } from "next/navigation";

export default function Page({
  params,
}: {
  params: {
    id: number | string;
  };
}) {
  return (
    <main className="relative container py-10">
      <ReadContract functionName="getAllEvents" gridLayout={false}>
        {({ data }) => {
          if (!data || !data.length) notFound();
          const event = data.find((_, index) => index === +params.id);
          if (!event) notFound();
          const { name, description, owner, startDate, endDate } = event;

          const start = bigIntToDate(startDate);
          const end = bigIntToDate(endDate);

          return (
            <>
              <Subtle className="absolute top-5">
                <Link href="/" className="hover:text-foreground">
                  Events
                </Link>
                {" / "}
                <Link href="/" className="text-foreground underline">
                  {name}
                </Link>
              </Subtle>
              <H1 className="flex items-center gap-3 mt-5 mb-4">
                <PartyPopper className="w-8 h-8" />
                {name}
              </H1>
              <p className="mb-2 font-medium">
                {start} - {end}
              </p>
              <p className="mb-10 max-w-xl text-slate-500">{description}</p>

              <div className="mb-10">
                <ReadContract
                  functionName="getTiersByEventId"
                  args={[params.id]}
                >
                  {({ data }) => {
                    if (!data?.length) return null;
                    return (
                      <>
                        {data.map((tier, index) => (
                          <TicketCard
                            key={index}
                            tier={tier}
                            eventId={params.id}
                            index={index}
                          />
                        ))}
                      </>
                    );
                  }}
                </ReadContract>
              </div>

              <Subtle>Event created by: {owner}</Subtle>
            </>
          );
        }}
      </ReadContract>
    </main>
  );
}
