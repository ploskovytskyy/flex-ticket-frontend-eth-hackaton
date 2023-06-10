"use client";

import { H3, Small, Subtle } from "~/components/typography";
import { Button } from "~/components/ui/button";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { data } from "./events/[id]/fake-data";
import { Badge } from "~/components/ui/badge";
import { useAccount } from "wagmi";
import { Connect } from "~/components/connect";

type Props = {
  id: string;
};

export default function TicketCard({ id }: Props) {
  const { isConnected } = useAccount();
  return (
    <div className="grid border rounded-lg px-4 py-5 hover:shadow-lg transition-all">
      <H3 className="mb-3 flex items-center justify-between">
        Full Ticket
        <Badge variant="secondary">{25 - 11} left</Badge>
      </H3>
      <p className="line-clamp-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est
        earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!
      </p>
      <hr className="my-3" />
      <Small className="mb-2">Initial price: $23</Small>
      <Small>Current price: $34.23</Small>
      <hr className="my-3" />
      <Subtle className="mb-2">Price chart:</Subtle>
      <div className="grid bg-slate-50 py-2 rounded-lg mb-4">
        <ResponsiveContainer height={80}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {isConnected ? <Button>Mint for $34.23</Button> : <Connect />}
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <span className="grid p-2 bg-white rounded-lg shadow-lg">
        <Subtle>{payload[0].payload.date}</Subtle>
        {`$${payload[0].value}`}
      </span>
    );
  }

  return null;
};
