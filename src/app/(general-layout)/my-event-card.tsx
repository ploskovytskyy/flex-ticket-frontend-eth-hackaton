import { ExternalLink, Pen } from "lucide-react";
import Link from "next/link";
import { H3, Small, Subtle } from "~/components/typography";
import { Button } from "~/components/ui/button";

type Props = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
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
      <Subtle>
        {startDate} - {endDate}
      </Subtle>
      <H3 className="mb-2">{name}</H3>
      <p className="line-clamp-3 mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-2">
        <Link href={`/events/${id}`} className="grid">
          <Button variant="secondary" className="flex gap-2">
            <ExternalLink className="w-4" />
            Open
          </Button>
        </Link>
        <Button disabled className="flex gap-2">
          <Pen className="w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
}
