import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { MobileNavigation } from "@/components/shared/MobileNavigation"
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
