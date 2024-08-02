"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface GetSuppliersProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

interface createSupplierProps {
  name: string;
  address?: string | undefined;
  website?: string | undefined;
  contacts: { value: string }[];
}

export async function getSuppliers({
  search,
  limit = 10,
  offset = 1,
}: GetSuppliersProps) {
  const session = await auth();

  const data = await prisma.supplier.findMany({
    where: {
      name: { contains: search },
      status: "ACTIVE",
      organizationId: session?.user.organizationId,
    },
    select: {
      _count: {
        select: {
          products: true,
        },
      },
      address: true,
      contact: true,
      createdAt: true,
      id: true,
      name: true,
      organizationId: true,
      updatedAt: true,
      website: true,
      status: true,
    },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.supplier.count({
    where: {
      name: { contains: search },
      status: "ACTIVE",
      organizationId: session?.user.organizationId,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}

export async function createSupplier(data: createSupplierProps) {
  const session = await auth();
  if (!session) return;

  await prisma.supplier.create({
    data: {
      name: data.name,
      address: data.address,
      website: data.website,
      contact: data.contacts.map((c) => c.value),
      organizationId: session?.user.organizationId,
    },
  });

  revalidatePath("/suppliers");
  return {
    status: 201,
    message: "Supplier created successfully",
  };
}

export async function deleteSupplier(id: number) {
  const supplier = await prisma.supplier.update({
    where: { id },
    data: { status: "DELETED" },
  });
  revalidatePath("/suppliers");
  return supplier;
}
