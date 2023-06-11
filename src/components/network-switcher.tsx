"use client";

import { useNetwork, useSwitchNetwork } from "wagmi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowLeftRight } from "lucide-react";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, isLoading, switchNetwork } = useSwitchNetwork({
    onError(error) {
      console.log(error.message);
    },
  });

  return (
    <>
      {switchNetwork ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="w-full">
                {isLoading ? "Switching" : "Switch network"}
                <ArrowLeftRight className="ml-2 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Switch to</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {chains
                .filter((listChain) => listChain.id !== chain?.id)
                .map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => switchNetwork(chain.id)}
                  >
                    <span>{chain.name}</span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </>
  );
}
