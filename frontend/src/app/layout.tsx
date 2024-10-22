import React, { ReactNode } from 'react';
import ClientProvider from './ClientProvider';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontRegular = localFont({
  src: "./fonts/cairo-regular.woff2",
  variable: "--font-sans",
  weight: "300",
});
const fontMono = localFont({
  src: "./fonts/oxanium-mono.woff2",
  variable: "--font-mono",
  weight: "300",
});

export const metadata: Metadata = {
  title: "COMtelemetry",
  description: "Get ya data here"
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${fontRegular.variable} ${fontMono.variable}`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
