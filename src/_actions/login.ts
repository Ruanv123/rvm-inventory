"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    revalidatePath("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Invalid credentials!" };
      }
    }

    throw error;
  }
}

export const logout = async () => {
  await signOut({ redirectTo: "/signin" });
  revalidatePath("/signin");
};
