"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

interface GetMovimentatiosProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

export async function getMovimentations({
  search,
  limit = 10,
  offset = 1,
}: GetMovimentatiosProps) {
  const session = await auth();

  const data = await prisma.movement.findMany({
    where: {
      Product: {
        name: { contains: search },
      },
      organizationId: session?.user.organizationId,
      type: "IN",
    },
    select: {
      date: true,
      reason: true,
      quantity: true,
      type: true,
      id: true,
      Product: {
        select: {
          name: true,
        },
      },
    },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.movement.count({
    where: {
      Product: {
        name: { contains: search },
      },
      organizationId: session?.user.organizationId,
      type: "IN",
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
