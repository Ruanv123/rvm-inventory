"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface GetCategorieProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

export async function getCategories({
  search,
  limit = 10,
  offset = 0,
}: GetCategorieProps) {
  const session = await auth();
  const data = await prisma.category.findMany({
    where: {
      name: { contains: search },
      status: "ACTIVE",
      organizationId: session?.user.organizationId,
    },
    select: {
      createdAt: true,
      id: true,
      name: true,
      status: true,
      updatedAt: true,
      products: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.category.count({
    where: {
      name: { contains: search },
      status: "ACTIVE",
      organizationId: session?.user.organizationId,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}

export async function createCategory(data: { name: string }) {
  const session = await auth();
  if (!session) return;

  const category = await prisma.category.create({
    data: {
      name: data.name,
      Organization: { connect: { id: session.user.organizationId } },
    },
  });

  revalidatePath("/categories");
  return category;
}

export async function deleteCategories(id: number) {
  const category = await prisma.category.update({
    where: { id },
    data: {
      status: "DELETED",
    },
  });
  revalidatePath("/categories");
  return category;
}
