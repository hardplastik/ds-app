"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
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
          </QueryClientProvider>
        </AuthProvider>
        <Toaster />
    </>
  );
}