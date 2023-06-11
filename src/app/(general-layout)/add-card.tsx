import { Plus } from "lucide-react";
import { Subtle } from "~/components/typography";
import { cn } from "~/lib/utils";

export default function AddItem({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid h-full group gap-3 text-center content-center justify-items-center border rounded-lg px-4 py-5 hover:border-slate-300 cursor-pointer hover:shadow-lg transition-all",
        className
      )}
    >
      <span className="w-10 h-10 bg-slate-50 rounded-full grid content-center justify-center group-hover:scale-110 group-hover:bg-slate-100 transition-all">
        <Plus />
      </span>
      <Subtle>{label || "Add"}</Subtle>
    </div>
  );
}
