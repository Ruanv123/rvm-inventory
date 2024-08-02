"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

interface GetUserProps {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}

export async function registerUser(data: Prisma.UserCreateInput) {
  try {
    data.password = bcrypt.hashSync(data.password, 10);
    await prisma.user.create({
      data: data,
    });
  } catch (error) {
    console.log("action error", error);
  }
}

export async function updatePasswordLogged(data: string) {
  const session = await auth();
  if (!session?.user) return;

  const userId = Number(session.user.id);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      password: bcrypt.hashSync(data, 10),
    },
  });
}

export async function updateUser(data: Prisma.UserUpdateInput) {
  const session = await auth();
  if (!session?.user) return;

  const user = await prisma.user.update({
    where: { id: Number(session.user.id) },
    data: data,
  });

  return user;
}

export async function getAllUsers({
  search,
  limit = 10,
  offset = 0,
}: GetUserProps) {
  const session = await auth();
  const data = await prisma.user.findMany({
    where: {
      organizationId: session?.user.organizationId,
      name: { contains: search },
    },
    skip: offset,
    take: limit,
  });

  const totalCount = await prisma.user.count({
    where: { organizationId: session?.user.organizationId },
  });

  const totalPages = Math.ceil(totalCount / 10);

  return { data, totalCount, totalPages };
}
