import type { Metadata } from "next";
import { Raleway, JetBrains_Mono, Righteous } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});

// setup your fonts

export const metadata: Metadata = {
  title: "Nostrum Store | Modern OTC Medicine Marketplace",
  description:
    "Shop OTC medicines securely at Nostrum Store. A comprehensive healthcare e-commerce platform featuring integrated inventory tracking, seller dashboards, and streamlined order fulfillment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.variable} ${raleway.variable} ${righteous.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
