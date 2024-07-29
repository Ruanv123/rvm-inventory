"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductFilter() {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const debouncedSearch = useDebounce(value);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("query", debouncedSearch);
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, debouncedSearch]);

  return (
    <Input
      placeholder="filter by name...."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}
