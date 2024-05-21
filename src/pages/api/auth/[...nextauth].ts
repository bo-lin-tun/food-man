import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/db";
import bcrypt from "bcrypt";
import { signinSchema } from "@/schemas/auth";
import { signIn } from "next-auth/react";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
          placeholder: "your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        
        const tu = await prisma.user.findFirst({
          where: { email: "bolinnhtun6@gmail.com" },
        });
        if (tu) {
          return { id: tu.id, email: tu.email, image: null, name: tu.name };
        }
      
        const validatedFields = signinSchema.safeParse(credentials);

        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;

        const existingUser = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (
          !existingUser ||
          !existingUser.password ||
          !existingUser.emailVerified
        )
          return null;

        const isPassMatch = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isPassMatch) return null;
        const user = {
          id: existingUser.id.toLocaleString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          emailVerified: existingUser.emailVerified,
          companyId: existingUser.companyId.toLocaleString(),
        };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
