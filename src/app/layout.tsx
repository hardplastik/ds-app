"use client";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from "next/font/google";
import { useState } from "react";
import "./globals.css";


const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [client] = useState(new QueryClient())

  return (
    <html lang="en">
      <title>Athlos One</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <body
        className={`${inter.variable} antialiased`}
      >
        <AuthProvider>
          <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
