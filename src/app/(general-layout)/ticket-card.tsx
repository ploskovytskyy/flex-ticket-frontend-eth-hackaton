"use client";

import { H3, Small, Subtle } from "~/components/typography";
import { Button } from "~/components/ui/button";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { data } from "./events/[id]/fake-data";
import { Badge } from "~/components/ui/badge";
import { useAccount } from "wagmi";
import { Connect } from "~/components/connect";

import { useContractWrite, useNetwork } from "wagmi";
import { contracts } from "~/lib/contracts";
import { abi } from "~/lib/abi";
import { parseEther } from "viem";
import { useToast } from "~/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  eventId: string | number;
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
  eventId,
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
  const { toast } = useToast();
  const { chain } = useNetwork();
  const contractAddress = contracts[chain?.network || ""]?.address;

  const { write, isLoading } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "buyTicket",
    value: parseEther("0.001"),
    args: [eventId, index],
    onError(err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: (
          <p>
            {(err as Error & { shortMessage: string })?.shortMessage ||
              err?.message ||
              "Unknown Error"}
          </p>
        ),
      });
    },
    onSuccess() {
      toast({
        title: "Hooray! Your transaction has been executed",
      });
    },
  });

  return (
    <div className="grid border rounded-lg px-4 py-5 hover:shadow-lg transition-all">
      <H3 className="mb-1 flex items-center justify-between">
        {_tierName}
        <Badge variant="secondary">{25 - 11} left</Badge>
      </H3>
      <hr className="my-3" />
      <div className="flex gap-6">
        <Small className="grid gap-1">
          <Subtle>Initial price:</Subtle>
          <span>{BigInt(_initialPrice).toString()}</span>
        </Small>
        <Small className="grid gap-1">
          <Subtle>Current price:</Subtle>
          <span>3.32</span>
        </Small>
      </div>
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
      {isConnected ? (
        <Button onClick={() => write()} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 animate-spin mr-2" />
              Loading...
            </>
          ) : (
            "Buy for 3.32"
          )}
        </Button>
      ) : (
        <Connect />
      )}
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
