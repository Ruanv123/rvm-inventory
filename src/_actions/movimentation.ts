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

type SalesByMonth = {
  [key: string]: {
    quantity: number;
    total: number;
  };
};

export async function getMovimentations({
  search,
  limit = 9,
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

  if (!product) {
    return {
      status: 400,
      message: "Product not found",
    };
  }

  if (data.type === "OUT") {
    if (product?.stockQuantity < data.quantity) {
      return {
        status: 400,
        message: "Insufficient quantity in stock",
      };
    }
  }

  //  Incrementar ou decrementar na quantidade do produto
  await prisma.product.update({
    where: { id: product.id },
    data: {
      stockQuantity:
        data.type === "OUT"
          ? product.stockQuantity - data.quantity
          : product.stockQuantity + data.quantity,
    },
  });

  // criando na tabela a movimentacao
  await prisma.movement.create({
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
  return {
    status: 201,
    message: "Movimentation created successfully",
  };
}

export async function getTotalRevenue() {
  const data = await prisma.movement.aggregate({
    where: {
      type: "IN",
      date: {
        gte: new Date("2022-01-01"),
        lte: new Date("2022-12-31"),
      },
    },
    _sum: {
      quantity: true,
    },
  });

  console.log(data);
}

export async function getMovimentationByMonth() {
  const session = await auth();
  const organizationId = session?.user.organizationId;

  const productsSale = await prisma.movement.findMany({
    where: { type: "OUT", organizationId },
    select: {
      quantity: true,
      date: true,
      Product: {
        select: {
          price: true,
        },
      },
    },
  });

  const salesByMonth = productsSale.reduce<SalesByMonth>((acc, sale) => {
    const month = sale.date.getMonth(); // getMonth() retorna o mês de 0 a 11
    const year = sale.date.getFullYear();
    const monthYear = `${month}-${year}`;

    if (!acc[monthYear]) {
      acc[monthYear] = { quantity: 0, total: 0 };
    }

    acc[monthYear].quantity += sale.quantity;
    acc[monthYear].total += sale.quantity * sale.Product.price;

    return acc;
  }, {});

  // Mapear números dos meses para abreviações
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Construir o array final com os meses do ano
  const salesArray = monthNames.map((name, index) => {
    const key = `${index}-${new Date().getFullYear()}`;
    return {
      name,
      total: salesByMonth[key]?.total || 0,
    };
  });

  return salesArray;
}
