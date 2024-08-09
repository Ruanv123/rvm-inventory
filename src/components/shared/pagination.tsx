"use client";

import { useState } from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronsLeft } from "lucide-react";

interface Props {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState(currentPage);

  function handlePageChange(page: number) {
    setCurrent(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  if (totalPages < 2) return null;

  // function renderPaginationItems() {
  //   const items = [];

  //   // Add the Previous button
  //   if (current > 1) {
  //     items.push(
  //       <PaginationItem key="prev">
  //         <PaginationPrevious
  //           href=""
  //           onClick={() => handlePageChange(current - 1)}
  //         />
  //       </PaginationItem>
  //     );
  //   }

  //   // Render page numbers and ellipsis
  //   for (let i = 1; i <= totalPages; i++) {
  //     if (i === current) {
  //       items.push(
  //         <PaginationItem key={i}>
  //           <PaginationLink href="" isActive>
  //             {i}
  //           </PaginationLink>
  //         </PaginationItem>
  //       );
  //     } else if (i < current - 2 || i > current + 2) {
  //       if (i === 1 || i === totalPages) {
  //         items.push(
  //           <PaginationItem key={i}>
  //             <PaginationLink href="" onClick={() => handlePageChange(i)}>
  //               {i}
  //             </PaginationLink>
  //           </PaginationItem>
  //         );
  //       } else if (
  //         (i === current - 3 && i !== 1) ||
  //         (i === current + 3 && i !== totalPages)
  //       ) {
  //         items.push(
  //           <PaginationItem key={`ellipsis-${i}`}>
  //             <PaginationEllipsis />
  //           </PaginationItem>
  //         );
  //       }
  //     } else {
  //       items.push(
  //         <PaginationItem key={i}>
  //           <PaginationLink href="" onClick={() => handlePageChange(i)}>
  //             {i}
  //           </PaginationLink>
  //         </PaginationItem>
  //       );
  //     }
  //   }

  //   if (current < totalPages) {
  //     items.push(
  //       <PaginationItem key="next">
  //         <PaginationNext
  //           href={""}
  //           onClick={() => handlePageChange(current + 1)}
  //         />
  //       </PaginationItem>
  //     );
  //   }

  //   return items;
  // }

  return (
    <div className="flex justify-between">
      <p className="text-sm">Showing 1-10 of {totalItems} items</p>
      <div>
        <ShadcnPagination className="w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (current - 1 === 0) return;
                  return handlePageChange(current - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem>{current}</PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => {
                  if (current + 1 > totalPages) return;
                  return handlePageChange(current + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      </div>
    </div>
  );
}
