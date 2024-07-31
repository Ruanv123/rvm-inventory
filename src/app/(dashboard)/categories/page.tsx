import { getCategories } from "@/_actions/category";
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
import { format } from "date-fns";
import { EllipsisVertical, PlusCircle } from "lucide-react";
import { CreateCategoryModal } from "./_components/create-category-modal";
import { DeleteCategoryButton } from "./_components/deleteButton";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 7;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages } = await getCategories({
    search,
    limit,
    offset,
  });

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>

        <CreateCategoryModal>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Category
            </span>
          </Button>
        </CreateCategoryModal>
      </div>

      {data.length > 0 ? (
        <section className="grid gap-2 items-end">
          <div className="flex justify-between items-start">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.status === "ACTIVE" ? (
                        <Badge variant={"outline"}>Active</Badge>
                      ) : (
                        <Badge variant={"destructive"}>Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>{category._count.products.toFixed()}</TableCell>
                    <TableCell>
                      {format(new Date(category.createdAt), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(category.updatedAt), "dd/MM/yyyy")}
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
                          <DeleteCategoryButton id={category.id}>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DeleteCategoryButton>
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
        <EmptyTable name="Categorie" buttonLink="" description="" title="" />
      )}
    </>
  );
}
