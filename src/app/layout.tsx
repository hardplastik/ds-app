import ProviderWrapper from "@/components/domain/provider-wrapper";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";


const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Athlos One',
}

export const viewport: Viewport = {
  userScalable: false,
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width',
  minimumScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <body
        className={`${inter.variable} antialiased`}
      >
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
