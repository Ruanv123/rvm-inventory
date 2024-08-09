import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function SalesCard() {
  const session = await auth();
  const organizationId = session?.user.organizationId;

  const salesTotal = await prisma.movement.findMany({
    where: { organizationId: organizationId, type: "OUT" },
    select: {
      quantity: true,
      id: true,
      Product: {
        select: {
          id: true,
          price: true,
        },
      },
    },
  });

  const totalSales = salesTotal
    .map((sale) => {
      return sale.Product.price * sale.quantity;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalSales.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
        <p className="text-xs text-muted-foreground">+19% from last month</p>
      </CardContent>
    </Card>
  );
}
