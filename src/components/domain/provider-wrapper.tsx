"use client"

import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "../ui/toaster";

export interface ProviderWrapperProps {
  children: React.ReactNode 
}

export default function ProviderWrapper({children}: ProviderWrapperProps) {

  const [client] = useState(new QueryClient())

  return (
    <>
      <AuthProvider>
          <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
        <Toaster />
    </>
  );
}