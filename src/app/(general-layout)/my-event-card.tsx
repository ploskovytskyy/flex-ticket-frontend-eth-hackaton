import { ExternalLink, Pen } from "lucide-react";
import Link from "next/link";
import { H3, Subtle } from "~/components/typography";
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
    <div className="grid border rounded-lg px-4 py-5 hover:border-slate-300 cursor-pointer">
      <Subtle>
        {startDate} - {endDate}
      </Subtle>
      <H3 className="mb-2">{name}</H3>
      <p className="line-clamp-2 mb-4">{description}</p>
      <Link href={`/events/${id}`} className="grid mb-2">
        <Button variant="secondary" className="flex gap-2">
          <ExternalLink className="w-4" />
          Open
        </Button>
      </Link>
      <Button className="flex gap-2">
        <Pen className="w-4" />
        Edit
      </Button>
    </div>
  );
}
