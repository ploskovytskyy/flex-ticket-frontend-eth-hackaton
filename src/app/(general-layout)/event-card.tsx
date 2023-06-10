import Link from "next/link";
import { H3, P, Subtle } from "~/components/typography";

type Props = {
  id: string;
  name: string;
  description: string;
  owner: string;
  startDate: string;
  endDate: string;
};

export default function EventCard({
  id,
  name,
  description,
  owner,
  startDate,
  endDate,
}: Props) {
  return (
    <Link href={`/events/${id}`}>
      <div className="grid border rounded-lg px-4 py-5 hover:border-slate-300 cursor-pointer">
        <Subtle>
          {startDate} - {endDate}
        </Subtle>
        <H3 className="mb-2">{name}</H3>
        <p className="line-clamp-2 mb-2">{description}</p>
        <Subtle>by: {owner}</Subtle>
      </div>
    </Link>
  );
}
