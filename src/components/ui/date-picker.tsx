import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { es } from "date-fns/locale/es";

export interface DatePickerProps {
  value?: Date
  onSetDate?: (value?: Date) => void;
}

export default function DatePicker({
  value,
  onSetDate
}: DatePickerProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              onClick={() => {setIsOpen(!isOpen)}}
              variant="outline"
              className={cn(
                'w-full justify-between text-left font-normal bg-slate-50 border-slate-900',
                !value && 'text-gray-400'
              )}
            >
              {value ? format(value, "dd 'de' MMMM 'de' yyyy", {locale: es}) : 'DD/MM/YY'}
              <CalendarIcon className="mr-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(newDate) => {
                setIsOpen(false);
                if (onSetDate) {
                  onSetDate(newDate)
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
  );
}