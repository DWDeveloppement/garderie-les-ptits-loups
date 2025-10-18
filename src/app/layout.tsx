import { Footer, Header } from "@/components/layout"
import { MobileNavigation } from "@/components/shared/navigation"
import { Theme } from "@radix-ui/themes"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garderie Les P'tits Loups",
  description: "Garderie Les P'tits Loups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect vers Sanity CDN pour images optimisées */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme
          appearance="light"
          accentColor="purple"
          grayColor="gray"
          radius="medium"
          scaling="100%"
        >
          <Header />
          <main className="pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNavigation />
        </Theme>
      </body>
    </html>
  );
}
