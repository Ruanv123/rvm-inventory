"use server";

import prisma from "@/lib/db";

interface getOrganizationsProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

export async function getOrganizations({
  search,
  limit = 10,
  offset = 1,
}: getOrganizationsProps) {
  const data = await prisma.organization.findMany({
    where: { name: { contains: search } },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.organization.count({
    where: { name: { contains: search } },
  });

  const totalPages = Math.ceil(totalCount / 10);

  return { data, totalCount, totalPages };
}
