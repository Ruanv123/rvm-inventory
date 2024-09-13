import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { type DefaultSession, AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  organizationId: number;
  // isTwoFactorEnabled: boolean;
  // isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// const loginSchema = z.object({
//   email: z
//     .string({ required_error: "Email is required" })
//     .min(1, "Email is required")
//     .email("Invalid email"),
//   password: z
//     .string({ required_error: "Password is required" })
//     .min(1, "Password is required")
//     .min(8, "Password must be more than 8 characters")
//     .max(32, "Password must be less than 32 characters"),
// });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: null,
          role: user.role as UserRole,
          organizationId: user.organizationId,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
      }

      if (session.user && token.organizationId) {
        session.user.organizationId = token.organizationId as number;
      }

      if (session.user && token.userRole) {
        session.user.role = token.userRole as UserRole;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: { id: Number(user.id) },
        });

        if (!existingUser) return token;

        token.userRole = existingUser.role;
        token.organizationId = existingUser.organizationId;
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.picture = existingUser.avatarUrl;
      }

      return token;
    },
  },
});
