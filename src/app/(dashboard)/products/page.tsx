import { getProducts } from "@/_actions/product";
import { EmptyTable } from "@/components/shared/empty-table";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductFilter } from "./_components/filter";

export default async function ProductPage({
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

  const { data, totalPages } = await getProducts({ search, limit, offset });

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <Link href="/products/create">
          <Button>Add Product</Button>
        </Link>
      </div>

      {data.length > 0 ? (
        <section className="grid gap-2 items-end">
          <div className="flex">
            <ProductFilter />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">In Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width="64"
                        height="64"
                        className="aspect-square rounded-md object-cover border"
                      />
                    </TableCell>
                    <TableCell className="w-[250px]">{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-fit h-fit border p-1 rounded-md">
                            <EllipsisVertical size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <button></button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      ) : (
        <EmptyTable
          name="Product"
          buttonLink="/products/create"
          description=""
          title=""
        />
      )}
    </>
  );
}

// export function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Products</CardTitle>
//         <CardDescription>
//           Manage your products and view their sales performance.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="hidden w-[100px] sm:table-cell">
//                 <span className="sr-only">Image</span>
//               </TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="hidden md:table-cell">Price</TableHead>
//               <TableHead className="hidden md:table-cell">
//                 Total Sales
//               </TableHead>
//               <TableHead className="hidden md:table-cell">Created at</TableHead>
//               <TableHead>
//                 <span className="sr-only">Actions</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             <TableRow>
//               <TableCell className="hidden sm:table-cell">
//                 <Image
//                   alt="Product image"
//                   className="aspect-square rounded-md object-cover"
//                   height="64"
//                   src="/placeholder.svg"
//                   width="64"
//                 />
//               </TableCell>
//               <TableCell className="font-medium">
//                 Laser Lemonade Machine
//               </TableCell>
//               <TableCell>
//                 <Badge variant="outline">Draft</Badge>
//               </TableCell>
//               <TableCell className="hidden md:table-cell">$499.99</TableCell>
//               <TableCell className="hidden md:table-cell">25</TableCell>
//               <TableCell className="hidden md:table-cell">
//                 2023-07-12 10:42 AM
//               </TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                       <MoreHorizontal className="h-4 w-4" />
//                       <span className="sr-only">Toggle menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell className="hidden sm:table-cell">
//                 <Image
//                   alt="Product image"
//                   className="aspect-square rounded-md object-cover"
//                   height="64"
//                   src="/placeholder.svg"
//                   width="64"
//                 />
//               </TableCell>
//               <TableCell className="font-medium">
//                 Hypernova Headphones
//               </TableCell>
//               <TableCell>
//                 <Badge variant="outline">Active</Badge>
//               </TableCell>
//               <TableCell className="hidden md:table-cell">$129.99</TableCell>
//               <TableCell className="hidden md:table-cell">100</TableCell>
//               <TableCell className="hidden md:table-cell">
//                 2023-10-18 03:21 PM
//               </TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                       <MoreHorizontal className="h-4 w-4" />
//                       <span className="sr-only">Toggle menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell className="hidden sm:table-cell">
//                 <Image
//                   alt="Product image"
//                   className="aspect-square rounded-md object-cover"
//                   height="64"
//                   src="/placeholder.svg"
//                   width="64"
//                 />
//               </TableCell>
//               <TableCell className="font-medium">AeroGlow Desk Lamp</TableCell>
//               <TableCell>
//                 <Badge variant="outline">Active</Badge>
//               </TableCell>
//               <TableCell className="hidden md:table-cell">$39.99</TableCell>
//               <TableCell className="hidden md:table-cell">50</TableCell>
//               <TableCell className="hidden md:table-cell">
//                 2023-11-29 08:15 AM
//               </TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                       <MoreHorizontal className="h-4 w-4" />
//                       <span className="sr-only">Toggle menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell className="hidden sm:table-cell">
//                 <Image
//                   alt="Product image"
//                   className="aspect-square rounded-md object-cover"
//                   height="64"
//                   src="/placeholder.svg"
//                   width="64"
//                 />
//               </TableCell>
//               <TableCell className="font-medium">
//                 TechTonic Energy Drink
//               </TableCell>
//               <TableCell>
//                 <Badge variant="secondary">Draft</Badge>
//               </TableCell>
//               <TableCell className="hidden md:table-cell">$2.99</TableCell>
//               <TableCell className="hidden md:table-cell">0</TableCell>
//               <TableCell className="hidden md:table-cell">
//                 2023-12-25 11:59 PM
//               </TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                       <MoreHorizontal className="h-4 w-4" />
//                       <span className="sr-only">Toggle menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell className="hidden sm:table-cell">
//                 <Image
//                   alt="Product image"
//                   className="aspect-square rounded-md object-cover"
//                   height="64"
//                   src="/placeholder.svg"
//                   width="64"
//                 />
//               </TableCell>
//               <TableCell className="font-medium">
//                 Gamer Gear Pro Controller
//               </TableCell>
//               <TableCell>
//                 <Badge variant="outline">Active</Badge>
//               </TableCell>
//               <TableCell className="hidden md:table-cell">$59.99</TableCell>
//               <TableCell className="hidden md:table-cell">75</TableCell>
//               <TableCell className="hidden md:table-cell">
//                 2024-01-01 12:00 AM
//               </TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                       <MoreHorizontal className="h-4 w-4" />
//                       <span className="sr-only">Toggle menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell className="hidden sm:table-cell">
//                 <Image
//                   alt="Product image"
//                   className="aspect-square rounded-md object-cover"
//                   height="64"
//                   src="/placeholder.svg"
//                   width="64"
//                 />
//               </TableCell>
//               <TableCell className="font-medium">Luminous VR Headset</TableCell>
//               <TableCell>
//                 <Badge variant="outline">Active</Badge>
//               </TableCell>
//               <TableCell className="hidden md:table-cell">$199.99</TableCell>
//               <TableCell className="hidden md:table-cell">30</TableCell>
//               <TableCell className="hidden md:table-cell">
//                 2024-02-14 02:14 PM
//               </TableCell>
//               <TableCell>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button aria-haspopup="true" size="icon" variant="ghost">
//                       <MoreHorizontal className="h-4 w-4" />
//                       <span className="sr-only">Toggle menu</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </CardContent>
//       <CardFooter>
//         <div className="text-xs text-muted-foreground">
//           Showing <strong>1-10</strong> of <strong>32</strong> products
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
