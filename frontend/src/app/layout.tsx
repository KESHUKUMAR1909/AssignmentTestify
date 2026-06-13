import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "SaaS Platform Feature Expansion - Dashboard",
  description: "A comprehensive SaaS platform dashboard featuring task management, inventory, HR vault, SOP tracking, and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
