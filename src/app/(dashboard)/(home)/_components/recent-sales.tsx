import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

interface RecentSalesCardProps {
  name: string;
  quantity: number;
  imageUrl: string;
  type: "IN" | "OUT";
  reason: string | null;
}

export async function RecentSales() {
  const session = await auth();
  const user = session?.user.organizationId;

  const recentSales = await prisma.movement.findMany({
    where: { organizationId: user },
    select: {
      id: true,
      Product: true,
      reason: true,
      quantity: true,
      type: true,
    },
    orderBy: { date: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8 h-fit">
      {recentSales.map((sale) => (
        <RecentSalesCard
          key={sale.id}
          name={sale.Product.name}
          imageUrl={sale.Product.imageUrl || ""}
          quantity={sale.quantity}
          type={sale.type}
          reason={sale.reason}
        />
      ))}
    </div>
  );
}

function RecentSalesCard({
  name,
  imageUrl,
  quantity,
  type,
  reason,
}: RecentSalesCardProps) {
  return (
    <div className="flex items-center">
      <Avatar className="h-12 w-12">
        <AvatarImage src={imageUrl} alt="Avatar" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p
          className="text-sm text-muted-foreground truncate"
          style={{ maxWidth: 180 }}
        >
          {reason}
        </p>
      </div>
      <div className="ml-auto font-medium">
        {type === "IN" ? "+" : "-"}
        {quantity}
      </div>
    </div>
  );
}
