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
      return {
        status: 404,
        message: "User not found",
      };
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

    if (error) {
      return { status: 500, message: "Internal server error" };
    }

    return {
      status: 200,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.log(error);
  }
}

export async function ResetPasswordToken(token: string, password: string) {
  try {
    if (!token) {
      return {
        status: 400,
      };
    }

    const user = await prisma.user.findFirst({ where: { resetToken: token } });

    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return {
        status: 400,
        message: "New password cannot be the same as the old one",
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: bcrypt.hashSync(password, 10),
        resetToken: null,
      },
    });

    return {
      status: 200,
      message: "Password reset successfully",
    };
  } catch (error) {
    console.log(error);
  }
}
