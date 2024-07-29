"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function registerUser(data: Prisma.UserCreateInput) {
  try {
    console.log("entrou aqui");
    data.password = bcrypt.hashSync(data.password, 10);
    await prisma.user.create({
      data: data,
    });
  } catch (error) {
    console.log("action error", error);
  }
}
