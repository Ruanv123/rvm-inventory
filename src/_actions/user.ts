"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

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
