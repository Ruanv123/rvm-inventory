"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function SeachFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder="filter by name...."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query") || ""}
      className="max-w-[350px] md:max-w-[650px]"
    />
  );
}
