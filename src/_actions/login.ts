"use server";

import DropboxResetPasswordEmail from "@/components/mail/forgot-mail";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { render } from "@react-email/components";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function ResetPasswordEmail(to: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email: to } });

    if (!user) {
      throw new Error("User not found");
    }

    const token = randomUUID();

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token },
    });

    const url = `http://localhost:3000/forgot-password/${token}`;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [to],
      subject: "Welcome to Resend!",
      html: render(
        DropboxResetPasswordEmail({
          userFirstname: user.name,
          resetPasswordLink: url,
        })
      ),
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
