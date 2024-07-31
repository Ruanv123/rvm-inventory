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

interface Props {}

export function SelectCategory({ onValueChange, defaultValue }: SelectProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="select category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories.map((crr, idx) => (
          <SelectItem value={String(crr.id)} key={idx}>
            {crr.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
