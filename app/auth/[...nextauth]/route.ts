import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { Awaitable, DefaultUser } from "next-auth";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

interface User extends DefaultUser {
  role?: "student" | "company" | "admin";
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile): Awaitable<User> {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          role: profile.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    session({ session, user }) {
      session.user = user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
