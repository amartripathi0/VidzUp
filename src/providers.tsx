import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./components/theme/theme-provider";
import ReactQueryProvider from "./react-query";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <ClerkProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
