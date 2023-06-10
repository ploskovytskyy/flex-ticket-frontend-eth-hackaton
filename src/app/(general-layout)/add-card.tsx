import { Plus } from "lucide-react";
import { Subtle } from "~/components/typography";

export default function AddItem({ label }: { label?: string }) {
  return (
    <div className="grid group gap-3 text-center content-center justify-center border rounded-lg px-4 py-5 hover:border-slate-300 cursor-pointer">
      <span className="w-10 h-10 bg-slate-50 rounded-full grid content-center justify-center group-hover:scale-110 group-hover:bg-slate-100 transition-all">
        <Plus />
      </span>
      <Subtle>{label || "Add"}</Subtle>
    </div>
  );
}
