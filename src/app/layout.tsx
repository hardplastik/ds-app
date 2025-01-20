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

  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
      document.body.style.zoom = '0.99';
  });
  
  document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
  
    document.body.style.zoom = '0.99';
  });
  document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      document.body.style.zoom = '1';
  });

  return (
    <html lang="en">
      <title>Athlos One</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="HandheldFriendly" content="true" />
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
