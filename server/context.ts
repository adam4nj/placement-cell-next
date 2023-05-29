import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { db } from "@/lib/db";

export async function createContext(opts?: CreateNextContextOptions) {
  return { db };
}

export type Context = inferAsyncReturnType<typeof createContext>;
