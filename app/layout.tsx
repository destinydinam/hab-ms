import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import ReactQueryClientProvider from "./react-query-client-provider";
import { appName } from "@/lib/utils";
import ClientLayout from "./client-layout";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - " + appName,
  description: "A Hospital Appointment Booking and Management System",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
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
          <ClientLayout />
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
