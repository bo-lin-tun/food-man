import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: "ADMIN" | "SUB_ADMIN";
      companyId?: string;
      emailVerified?: Date;
    };
  }
}
