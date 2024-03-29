import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { loginFormSchema } from "./validators/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
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
        if (!credentials) return null;
        const { username, password } = loginFormSchema.parse(credentials);

        const user = await db.user.findUnique({
          where: {
            username: username,
          },
        });
        if (!user) return null;
        const isValidPassword = password === user.password;

        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          status: user.status,
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
        session.user.status = token.status;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
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
        status: dbUser.status,
      };
    },
    redirect() {
      return "/verifyuser";
    },
  },
};

export const getUser = async () => await getServerSession(authOptions);
