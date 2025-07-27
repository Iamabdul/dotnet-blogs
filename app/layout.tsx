import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalyticsScript from "./googleAnalyticsScript";
import CookieBanner from "./cookieBanner";
import ConsentModeScript from "./consentModeScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DNBDN - .NET Development Hub",
  description:
    "Stay updated with the latest .NET development news, tutorials, and videos from the past week.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalyticsScript
          GA_MEASUREMENT_ID={
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string
          }
        />
        <ConsentModeScript />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
