/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";
import { Router, Search, X } from "lucide-react";
import { PostponedPathnameNormalizer } from "next/dist/server/future/normalizers/request/postponed";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export type ProductStatus = "ACTIVE" | "DELETED" | "NONE";

const formSchema = z.object({
  barCode: z.string().optional(),
  name: z.string().optional(),
  status: z.enum([Status.ACTIVE, Status.DELETED, "NONE"]).optional(),
});

export type handleProductFilterProps = z.infer<typeof formSchema>;

export function ProductTableFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const barCode = searchParams?.get("barCode");
  const productName = searchParams?.get("search");
  const status = searchParams?.get("status") as ProductStatus | undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barCode: barCode ?? "",
      name: productName ?? "",
      status: status ?? "ACTIVE",
    },
  });

  const handleFilter = useCallback(
    (data: handleProductFilterProps) => {
      const params = new URLSearchParams(searchParams.toString());
      if (data.name) {
        params.set("search", data.name);
      } else {
        params.delete("search");
      }

      if (data.barCode) {
        params.set("barCode", data.barCode.toString());
      } else {
        params.delete("barCode");
      }

      if (data.status) {
        params.set("status", data.status);
      } else {
        params.delete("status");
      }

      return router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );

  const handleClearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.delete("barCode");
    params.delete("status");

    router.replace(`${pathname}?${params.toString()}`);
    form.reset({
      barCode: "",
      name: "",
      status: "NONE",
    });
  }, [searchParams]);

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={form.handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filters:</span>
      <Input
        placeholder="Product BarCode"
        className="h-8 w-auto"
        {...form.register("barCode")}
      />
      <Input
        placeholder="Product Name"
        className="h-8 w-[320px]"
        {...form.register("name")}
      />
      <Controller
        control={form.control}
        name="status"
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NONE">all</SelectItem>
              <SelectItem value={Status.ACTIVE}>Active</SelectItem>
              <SelectItem value={Status.DELETED}>Deleted</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filter results
      </Button>
      <Button
        variant="outline"
        size="xs"
        type="button"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remove filters
      </Button>
    </form>
  );
}
