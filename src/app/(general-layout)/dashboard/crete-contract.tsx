"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import AddItem from "../add-card";

export default function CreateContract() {
  return (
    <Dialog>
      <DialogTrigger className="min-h-[230px]">
        <AddItem />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new event</DialogTitle>
          <DialogDescription>
            This action will create a transition to create a new event.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
