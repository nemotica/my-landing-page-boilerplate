import { siteConfig } from "@/config/site";
import { defaultLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import BaiDuAnalytics from "@/src/app/BaiDuAnalytics";
import GoogleAnalytics from "@/src/app/GoogleAnalytics";
import { TailwindIndicator } from "@/src/components/TailwindIndicator";
import { ThemeProvider } from "@/src/components/ThemeProvider";
import Footer from "@/src/components/footer/Footer";
import Header from "@/src/components/header/Header";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

// wy createdAt 2024-05-08 15:20
import { ClerkProvider } from '@clerk/nextjs';

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};
export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string[] | undefined };
}) {
  return (
    <html lang={(lang && lang[0]) || defaultLocale} suppressHydrationWarning>
      <head />
      {/* wy createdAt 2024-05-08 15:20 */}
      <ClerkProvider>
        {/*  wy createdAt 2024-05-08 15:20 */}
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme={siteConfig.nextThemeColor}
            enableSystem
          >
            <Header />
            <main className="flex flex-col items-center py-6">{children}</main>
            <Footer />
            <Analytics />
            <TailwindIndicator />
          </ThemeProvider>
          {process.env.NODE_ENV === "development" ? (
            <></>
          ) : (
            <>
              <GoogleAnalytics />
              <BaiDuAnalytics />
            </>
          )}
        </body>

        {/* wy createdAt 2024-05-08 15:20 */}
      </ClerkProvider>
      {/*  wy createdAt 2024-05-08 15:20 */}

    </html>
  );
}
