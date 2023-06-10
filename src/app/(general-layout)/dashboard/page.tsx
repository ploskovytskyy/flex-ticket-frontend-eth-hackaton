import { H1, H2 } from "~/components/typography";
import EventCard from "../event-card";
import TicketCard from "../ticket-card";
import MyEventCard from "../my-event-card";
import MyTicketCard from "../my-ticket-card";
import AddItem from "../add-card";

export default function Page() {
  return (
    <main className="container py-10">
      <H1 className="flex items-center gap-5 mt-5 mb-10">My events</H1>
      <div className="grid grid-cols-4 gap-5">
        <MyEventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <MyEventCard
          id="sample-id"
          name="Name"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum est earum ex veritatis! Totam consequatur ab vitae minima nostrum veniam!"
          startDate="10 Jun 2023"
          endDate="13 Jun 2023"
        />
        <AddItem />
      </div>
      <hr className="my-10" />
      <H1 className="flex items-center gap-5 mt-5 mb-10">My tickets</H1>
      <div className="grid grid-cols-4 gap-5">
        <MyTicketCard id="sample-id" />
      </div>
    </main>
  );
}
