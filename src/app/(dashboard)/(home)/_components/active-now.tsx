import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function ActiveNow() {
  const session = await auth();
  const organizationId = session?.user.organizationId;

  const products = await prisma.product.count({
    where: { organizationId, status: "ACTIVE" },
  });

  return (
    <Card>
      {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">All Products</CardTitle>
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{products}</div>
        <p className="text-xs text-muted-foreground">+201 since last hour</p>
      </CardContent> */}
    </Card>
  );
}
