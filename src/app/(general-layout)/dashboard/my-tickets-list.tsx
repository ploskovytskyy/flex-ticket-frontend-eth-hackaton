"use client";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { Large } from "~/components/typography";
import { Skeleton } from "~/components/ui/skeleton";
import { abi } from "~/lib/abi";
import { contracts } from "~/lib/contracts";

export default function MyTicketsList() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const contractAddress = contracts[chain?.network || ""].address;

  return <div>MyTicketsList</div>;
}
