import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function TotalRevenue() {
  const session = await auth();
  const totalProducts = await prisma.product.count({
    where: { organizationId: session?.user.organizationId, status: "ACTIVE" },
  });

  const totalProductsByLAstMonth = await prisma.product.count({
    where: {
      organizationId: session?.user.organizationId,
      status: "ACTIVE",
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
  });

  const percetentageByLastMonth = Math.round(
    (totalProductsByLAstMonth / totalProducts) * 100
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalProducts}</div>
        <p className="text-xs text-muted-foreground">
          {totalProductsByLAstMonth > 0 && "+"}
          {percetentageByLastMonth}% from last month
        </p>
      </CardContent>
    </Card>
  );
}
