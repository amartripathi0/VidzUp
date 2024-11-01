import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import {Manrope} from 'next/font/google'
const manrope = Manrope({subsets : ['latin']})
export const metadata: Metadata = {
  title: "VidzUp",
  description: "Upload and Share AI Powered Videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-[#171717] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
