"use client";

import EventCard from "./event-card";
import ReadContract from "~/components/read-contract";

export default function EventsList() {
  return (
    <ReadContract functionName="getAllEvents">
      {({ data }) =>
        data.length
          ? data.map(({ owner, name, startDate, endDate }, index) => {
              return (
                <EventCard
                  key={index}
                  id={index}
                  name={name}
                  owner={owner}
                  startDate={startDate}
                  endDate={endDate}
                />
              );
            })
          : "Events list is empty"
      }
    </ReadContract>
  );
}
