import { cn } from "@/lib/utils";
import { SimpleRecord } from "@/types/SimpleRecord";


export interface ProgramSessionsBar {
  value?: string | number
  options?: SimpleRecord[];
  onSelect?: (value: string | number) => void
}

export default function ProgramSessionsBar({
  value,
  options,
  onSelect
}: ProgramSessionsBar) {
  return (
    <div className="w-full space-x-3 flex-none whitespace-nowrap overflow-auto -mt-2">
      {
        options?.map((option, optionIndex) => (
          <button key={option.value} className={
            cn("font-semibold text-xs text-outer-space-500 leading-5",
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