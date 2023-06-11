"use client";

import { H1, H3 } from "~/components/typography";
import { Search } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { useAccount, useNetwork } from "wagmi";
import { Connect } from "~/components/connect";
import EventsList from "./events-list";

export default function Home() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const chainBadge = chain?.name ?? chain?.id;

  return (
    <main className="container py-10">
      <H1 className="flex items-center gap-3 mt-4 mb-10">
        <Search className="w-8 h-8" />
        Explore Events
        {isConnected && <Badge variant="secondary">{chainBadge}</Badge>}
      </H1>
      {isConnected ? (
        <EventsList />
      ) : (
        <div className="grid gap-5 max-w-lg px-5 py-5 rounded-lg border mx-auto my-40 text-center">
          <H3>Connect your wallet</H3>
          <Connect />
        </div>
      )}
    </main>
  );
}
