"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { MovementType, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface GetMovimentatiosProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

interface createMovimentationProps {
  quantity: number;
  type: MovementType;
  reason?: string;
  productId: string;
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

export async function createMovimentation(data: createMovimentationProps) {
  const session = await auth();
  if (!session) return;

  //logica de verificacao de estoque
  const product = await prisma.product.findUnique({
    where: { id: +data.productId },
  });

  if (!product) throw new Error("Product not found");

  if (data.type === "OUT") {
    if (product?.stockQuantity < data.quantity) {
      throw new Error("Insufficient quantity");
    }
  }

  //  Incrementar ou decrementar na quantidade do produto
  const increment = await prisma.product.update({
    where: { id: product.id },
    data: {
      stockQuantity:
        data.type === "OUT"
          ? product.stockQuantity - data.quantity
          : product.stockQuantity + data.quantity,
    },
  });

  // criando na tabela a movimentacao
  const movement = await prisma.movement.create({
    data: {
      quantity: data.quantity,
      type: data.type,
      reason: data.reason,
      productId: +data.productId,
      organizationId: session?.user.organizationId,
    },
  });

  revalidatePath("/movimentations");
  // return movement;
  return data;
}
