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

export function SelectProducts({ onValueChange, defaultValue }: SelectProps) {
  const [products, setProducts] = useState<{ id: number; name: string, barCode: string }[]>(
    []
  );

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="select product" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="none">none</SelectItem>
        {products.map((crr, idx) => (
          <SelectItem value={String(crr.id)} key={idx}>
            {crr.name} - {crr.barCode}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
