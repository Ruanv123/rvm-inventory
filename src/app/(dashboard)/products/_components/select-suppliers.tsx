"use client";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

export function SelectSuppliers({ onValueChange, defaultValue }: SelectProps) {
  const [suppliers, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    fetch("/api/supplier")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="select supplier" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {suppliers.map((crr, idx) => (
          <SelectItem value={String(crr.id)} key={idx}>
            {crr.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
