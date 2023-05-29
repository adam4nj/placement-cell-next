import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        role: {
          type: "role",
        },
        username: {
          label: "Username",
          type: "username",
          placeholder: "Your Username",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.username || !credentials.password) return null;

        const user = await db.user.findUniqueOrThrow({
          where: {
            username: credentials.username,
          },
        });
        const isValidPassword = credentials.password === user.password;
        if (!user || !isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          username: token.username,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        username: dbUser.username,
        picture: dbUser.image,
        role: dbUser.role,
      };
    },
  },
};
