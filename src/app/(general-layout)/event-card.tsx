import { format } from "date-fns";
import { User } from "lucide-react";
import Link from "next/link";
import { shortenAddress } from "~/components/account";
import { H4, Subtle } from "~/components/typography";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { bigIntToDate } from "~/lib/utils";

type Props = {
  id: string | number;
  name: string;
  owner: string;
  startDate: bigint;
  endDate: bigint;
};

export default function EventCard({
  id,
  name,
  owner,
  startDate,
  endDate,
}: Props) {
  const start = bigIntToDate(startDate);
  const end = bigIntToDate(endDate);
  return (
    <div className="grid border rounded-lg px-4 py-5 hover:border-slate-300 hover:shadow-lg transition-all">
      <Subtle className="mb-2">
        {start} - {end}
      </Subtle>
      <Link href={`/events/${id}`} className="hover:underline">
        <H4 className="mb-4 line-clamp-2">{name}</H4>
      </Link>
      {/* <p className="text-sm line-clamp-2 mb-4">{description}</p> */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-slate-100 grid place-content-center">
          <User className="w-5" />
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-left">
                <Subtle className="leading-none">Owner</Subtle>
                {shortenAddress(owner)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{owner}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
