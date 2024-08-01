"use server";

import DropboxResetPasswordEmail from "@/components/mail/forgot-mail";
import prisma from "@/lib/db";
import { render } from "@react-email/components";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

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

    const url = `${process.env.NEXT_URL}/forgot-password/${token}`;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [to],
      subject: "Rvm Systems - Reset Your Password",
      html: render(
        DropboxResetPasswordEmail({
          userFirstname: user.name,
          resetPasswordLink: url,
        })
      ),
    });

    if (error) throw new Error("Failed to send email");

    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function ResetPasswordToken(token: string, password: string) {
  try {
    if (!token) throw new Error("Token not found");

    const user = await prisma.user.findFirst({ where: { resetToken: token } });

    if (!user) throw new Error("Token expired");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid)
      throw new Error("Password is the same as previous one");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: bcrypt.hashSync(password, 10),
        resetToken: null,
      },
    });

    return;
  } catch (error) {
    console.log(error);
  }
}
