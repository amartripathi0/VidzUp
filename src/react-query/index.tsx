"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};
const client = new QueryClient();
const ReactQueryProvider = (props: Props) => {
  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
