"use client";

import { H3, Small, Subtle } from "~/components/typography";
import { Button } from "~/components/ui/button";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { data } from "./events/[id]/fake-data";
import { Badge } from "~/components/ui/badge";
import { useAccount } from "wagmi";
import { Connect } from "~/components/connect";

type Props = {
  tier: {
    _basePrice: bigint;
    _baseURI: string;
    _initialPrice: bigint;
    _symbol: string;
    _tierName: string;
    _totalTickets: bigint;
  };
  index: number;
};

export default function TicketCard({
  tier: {
    _basePrice,
    _baseURI,
    _initialPrice,
    _symbol,
    _tierName,
    _totalTickets,
  },
  index,
}: Props) {
  const { isConnected } = useAccount();
  return (
    <div className="grid border rounded-lg px-4 py-5 hover:shadow-lg transition-all">
      <H3 className="mb-1 flex items-center justify-between">
        {_tierName}
        <Badge variant="secondary">{25 - 11} left</Badge>
      </H3>
      <hr className="my-3" />
      <Small className="mb-2">
        Initial price: {BigInt(_initialPrice).toString()}
      </Small>
      <Small>Current price: 3.32</Small>
      <hr className="my-3" />
      <Subtle className="mb-2">Price chart (fake data):</Subtle>
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
      {isConnected ? <Button>Mint for 3.32</Button> : <Connect />}
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
