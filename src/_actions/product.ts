"use server";

import prisma from "@/lib/db";

interface GetProductsProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

export async function getProducts({
  search,
  limit = 10,
  offset = 5,
}: GetProductsProps) {
  const data = await prisma.product.findMany({
    where: { name: { contains: search } },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.product.count({
    where: { name: { contains: search } },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
