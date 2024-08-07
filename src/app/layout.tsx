import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryClientProviders from "@/provider/query-client-provider";
import SheetProvider from "@/provider/sheet-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fin-Track",
  description: "Your financial app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProviders>
            {children}
            <SheetProvider />
            <Toaster />
          </QueryClientProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
