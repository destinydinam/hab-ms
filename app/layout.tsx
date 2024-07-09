import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import ReactQueryClientProvider from "./react-query-client-provider";
import { appName } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - " + appName,
  description: "A Hospital Appointment Booking and Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body className={inter.className}>
          <main>{children}</main>
          <Analytics />
          <Toaster
            richColors
            position="top-right"
            theme="light"
            duration={3000}
          />
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
