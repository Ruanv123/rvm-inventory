"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterStatus() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelectedStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("status") === status) {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={searchParams.get("status") === "active"}
          onCheckedChange={() => handleSelectedStatus("active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={searchParams.get("status") === "deleted"}
          onCheckedChange={() => handleSelectedStatus("deleted")}
        >
          Deleted
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
