import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) NextResponse.json({ error: "Unauthorized" });

  const data = await prisma.supplier.findMany({
    where: { organizationId: session?.user.organizationId, status: "ACTIVE" },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ data });
}
