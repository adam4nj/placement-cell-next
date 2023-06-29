"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const QueryProvider = (props: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{props.children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default QueryProvider;
