import { JSX } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export interface DropDownProps {
  placeholder?: string;
  value?: string | number;
  options?: DropDownOptionProps[];
  onSelect?: (vale: string) => void 
}

export interface DropDownOptionProps {
  label: string | JSX.Element;
  value: number | string
}

export default function DropDown({
  placeholder,
  value,
  options,
  onSelect
}: DropDownProps) {
  return (
    <Select value={value?.toString()}
          onValueChange={(value) => onSelect && onSelect(value)}
        >
          <SelectTrigger className="bg-slate-50 border-slate-900">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
  );
}