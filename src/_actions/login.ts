"use server";

import { signIn, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function login(email: string, password: string) {
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });

  revalidatePath("/");
}

export const logout = async () => {
  await signOut({ redirectTo: "/signin" });
  revalidatePath("/signin");
};
