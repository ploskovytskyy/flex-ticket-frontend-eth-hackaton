import { ExternalLink, Pen } from "lucide-react";
import Link from "next/link";
import { H4, Subtle } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { bigIntToDate } from "~/lib/utils";

type Props = {
  id: string | number;
  name: string;
  description: string;
  startDate: bigint;
  endDate: bigint;
};

export default function MyEventCard({
  id,
  name,
  description,
  startDate,
  endDate,
}: Props) {
  return (
    <div className="grid border rounded-lg px-4 py-5 hover:border-slate-300 hover:shadow-lg transition-all">
      <Subtle className="mb-2">
        {bigIntToDate(startDate)} - {bigIntToDate(endDate)}
      </Subtle>
      <H4 className="mb-2">{name}</H4>
      <p className="line-clamp-2 mb-4">{description}</p>
      <div className="grid gap-2">
        <Link href={`/events/${id}`} className="grid">
          <Button variant="secondary" className="flex gap-2">
            <ExternalLink className="w-4" />
            Open event page
          </Button>
        </Link>
        {/* <Button disabled className="flex gap-2">
          <Pen className="w-4" />
          Edit
        </Button> */}
      </div>
    </div>
  );
}
