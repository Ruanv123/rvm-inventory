"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface GetProductsProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

interface createProductProps {
  imageUrl?: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  barCode: string;
  categoryId: string;
  supplierId: string;
}

export async function getProducts({
  search,
  limit = 10,
  offset = 1,
}: GetProductsProps) {
  const session = await auth();

  const data = await prisma.product.findMany({
    where: {
      name: { contains: search },
      status: "ACTIVE",
      organizationId: session?.user.organizationId,
    },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.product.count({
    where: {
      name: { contains: search },
      status: "ACTIVE",
      organizationId: session?.user.organizationId,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}

export async function createProduct(data: createProductProps) {
  const session = await auth();
  if (!session) return;

  const exisitingProduct = await prisma.product.findUnique({
    where: { barCode: data.barCode },
  });

  if (exisitingProduct) {
    return {
      status: 409,
      message: "Product already exists with barCode.",
    };
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: data.price,
      barCode: data.barCode,
      stockQuantity: data.stockQuantity,
      Organization: { connect: { id: session.user.organizationId } },
      Category: { connect: { id: +data.categoryId } },
      Supplier: { connect: { id: +data.supplierId } },
    },
  });

  revalidatePath("/products");
  return {
    status: 201,
    message: "Product created successfully",
  };
}

export async function deleteProduct(id: number) {
  const product = await prisma.product.update({
    where: { id },
    data: {
      status: "DELETED",
    },
  });
  revalidatePath("/products");
  return product;
}
