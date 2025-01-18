import { cn } from "@/lib/utils";
import { SimpleRecord } from "@/types/SimpleRecord";


export interface ProgramWeeksBarProps {
  value?: string | number
  options?: SimpleRecord[];
  onSelect?: (value: string | number) => void
}

export default function ProgramWeeksBar({
  value,
  options,
  onSelect
}: ProgramWeeksBarProps) {
  return (
    <div className="w-full space-x-3 whitespace-nowrap overflow-auto pb-2">
      {
        options?.map((option, optionIndex) => (
          <button key={option.value} className={
            cn("py-[6px] px-3 rounded-sm border border-outer-space-500 font-semibold text-sm text-outer-space-500 leading-5",
              optionIndex != value && "opacity-50 border-none"
            )
          } onClick={() => onSelect && onSelect(optionIndex)}>
            {option.label}
          </button>
        ))
      }
      
    </div>
  );
}