"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}
type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

import React from "react";

const SelectComponent = (props: Props) => {
  const {
    options,
    value,
    onChange,
    className,
    disabled,
    required,
    placeholder,
  } = props;

  return (
    <Select onValueChange={onChange} defaultValue={value} required={required}>
      <SelectTrigger
        className={`border rounded px-3 py-2 ${className} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        <SelectValue placeholder={placeholder || "Sélectionnez une option"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
