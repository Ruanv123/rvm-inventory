/* eslint-disable @next/next/no-img-element */
import { getProducts } from "@/_actions/product";
import { EmptyTable } from "@/components/shared/empty-table";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { EllipsisVertical, PlusCircle } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./_components/deleteButton";
import {
  ProductStatus,
  ProductTableFilters,
} from "./_components/product-filters";

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    status?: string;
    barCode?: string;
  };
}) {
  const search = searchParams?.query || "";
  const barCode = searchParams?.barCode || "";
  const status = searchParams?.status
    ? (searchParams?.status as ProductStatus)
    : "ACTIVE";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 7;
  const offset = (currentPage - 1) * limit;

  const { data, totalCount, totalPages } = await getProducts({
    search,
    limit,
    offset,
    status,
    barCode,
  });

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <Link href="/products/create">
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </Link>
      </div>

      <ProductTableFilters />
      {data.length > 0 ? (
        <section className="grid gap-2 items-end">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>BarCode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">In Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <img
                        src={product.imageUrl || ""}
                        alt={product.name}
                        width="64"
                        height="64"
                        className="aspect-square rounded-md object-cover border"
                      />
                    </TableCell>
                    <TableCell className="w-[200px]">{product.name}</TableCell>
                    <TableCell
                      className="truncate max-w-[150px]"
                      style={{ maxWidth: "150px" }}
                      title={product.description}
                    >
                      {product.description}
                    </TableCell>
                    <TableCell className="w-[250px]">
                      {product.barCode}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {product.status === "ACTIVE" ? (
                        <Badge variant={"outline"} className="border-green-300">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant={"destructive"}>Deleted</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <EllipsisVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DeleteButton id={product.id}>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DeleteButton>
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
        <EmptyTable name="Product" buttonLink="/products/create" />
      )}
    </>
  );
}
