import { getMovimentations } from "@/_actions/movimentation";
import { EmptyTable } from "@/components/shared/empty-table";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function MovimentationsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    status?: string;
  };
}) {
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 7;
  const offset = (currentPage - 1) * limit;

  const { data, totalCount, totalPages } = await getMovimentations({
    search,
    limit,
    offset,
  });

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Movimentations</h1>
        <Link href="/movimentations/create">
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Movimentation
            </span>
          </Button>
        </Link>
      </div>

      {data.length > 0 ? (
        <section className="grid gap-2 items-end">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((movimentation) => (
                  <TableRow key={movimentation.id}>
                    <TableCell>{movimentation.id}</TableCell>
                    <TableCell>{movimentation.Product.name}</TableCell>
                    <TableCell>{movimentation.quantity}</TableCell>
                    <TableCell>{movimentation.reason || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={"outline"}>{movimentation.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(movimentation.date), "HH:mm dd-MM-yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
          />
        </section>
      ) : (
        <EmptyTable name="Movimentation" buttonLink="" />
      )}
    </>
  );
}
