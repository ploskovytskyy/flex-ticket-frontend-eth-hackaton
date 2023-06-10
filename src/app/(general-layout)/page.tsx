import { H1 } from "~/components/typography";
import EventCard from "./event-card";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <main className="container py-10">
      <H1 className="flex items-center gap-5 mt-5 mb-10">
        <Search className="w-10 h-10" />
        Explore Events
      </H1>
      <div className="grid grid-cols-4 gap-5">
        <EventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="owner"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <EventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="owner"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <EventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="owner"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <EventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="owner"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <EventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="owner"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <EventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          owner="owner"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
      </div>
    </main>
  );
}
