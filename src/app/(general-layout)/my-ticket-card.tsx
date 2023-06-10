"use client";

import { H3, Subtle } from "~/components/typography";
import { Button } from "~/components/ui/button";

import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { data } from "./events/[id]/fake-data";
import { Badge } from "~/components/ui/badge";
import { useAccount } from "wagmi";
import { Connect } from "~/components/connect";

type Props = {
  id: string;
};

export default function MyTicketCard({ id }: Props) {
  const { isConnected } = useAccount();
  return (
    <div className="grid border rounded-lg px-4 py-5">
      <Subtle className="mb-2">10 Jun 2023 - 13 Jun 2023</Subtle>
      <H3 className="mb-2 flex items-center justify-between">
        Full Ticket
        <Badge variant="secondary">Hacker</Badge>
      </H3>
      <p className="line-clamp-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est
        earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!
      </p>
      <hr className="my-3" />
      {isConnected ? <Button>Show QR Code</Button> : <Connect />}
    </div>
  );
}
