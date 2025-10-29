import { Footer, Header } from "@/components/layout"
import { Partners } from "@/components/shared"
import { MobileNavigation } from "@/components/shared/navigation"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Chelsea_Market, Open_Sans } from "next/font/google"
import "./globals.css"

const chelseaMarket = Chelsea_Market({
  variable: "--font-chelsea-market",
  subsets: ["latin"],
  weight: ["400"], // Chelsea Market n'a qu'un seul poids
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Tous les poids disponibles
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
    <html lang="fr" className={`${openSans.variable} ${chelseaMarket.variable}`}>
      <head>
        {/* Preconnect vers Sanity CDN pour images optimisées */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
            <body className="antialiased">
              <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Partners />
              <Footer />
              <MobileNavigation />
              <Toaster />
            </body>
    </html>
  );
}
