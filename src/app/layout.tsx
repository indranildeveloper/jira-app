import { FC } from "react";

import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Inter, Fira_Code } from "next/font/google";

import QueryProvider from "@/components/providers/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { RootLayoutProps } from "@/interfaces/RootLayoutProps";

import "@/styles/globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jira App",
  description: "The next generation task management app.",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${firaCode.variable} min-h-screen antialiased`}
      >
        <NuqsAdapter>
          <QueryProvider>
            <main className="font-sans">{children}</main>
            <Toaster theme="light" richColors />
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout;
