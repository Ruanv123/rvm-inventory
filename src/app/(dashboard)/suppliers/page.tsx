import { getSuppliers } from "@/_actions/supplier";
import { EmptyTable } from "@/components/shared/empty-table";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PlusCircle } from "lucide-react";
import Link from "next/link";
import { SeachFilter } from "../products/_components/filter";
import Pagination from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteSupplierButton } from "./_components/deleteButton";

export default async function SuppliersPage({
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

  const { data, totalCount, totalPages } = await getSuppliers({
    search,
    limit,
    offset,
  });

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Suppliers</h1>
        <Link href="/suppliers/create" prefetch={false}>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Supplier
            </span>
          </Button>
        </Link>
      </div>

      {data.length > 0 ? (
        <section className="grid gap-2 items-end">
          <div className="flex">
            <SeachFilter />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Addres</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>
                      {supplier.contact.map((c, i) => (
                        <p key={i}>{c}</p>
                      ))}
                    </TableCell>
                    <TableCell>{supplier.address || "-"}</TableCell>
                    <TableCell>
                      <Link
                        href={supplier.website || ""}
                        prefetch={false}
                        target="_blank"
                      >
                        {supplier.website || "-"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{supplier.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <EllipsisVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DeleteSupplierButton id={supplier.id}>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DeleteSupplierButton>
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      ) : (
        <EmptyTable
          name="Supplier"
          buttonLink="/suppliers/create"
          description=""
          title=""
        />
      )}
    </>
  );
}
