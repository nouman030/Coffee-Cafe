import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NS Coffee | Artisanal Micro-Roasters & Specialty Cafe",
  description: "Experience obsessively sourced micro-lot single origins, slow cold drip brews, and precision espresso flights crafted by NS Coffee Roasters.",
  keywords: ["specialty coffee", "artisan roaster", "NS coffee", "single origin", "micro-lot", "cold drip", "espresso flight"],
  authors: [{ name: "NS Coffee Roasters" }],
  openGraph: {
    title: "NS Coffee | Artisanal Micro-Roasters & Specialty Cafe",
    description: "Obsessively crafted roasts, cold drip extractions, and signature barista flights.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className="bg-[#0b0a09] text-[#efe8dc] antialiased selection:bg-[#ff5b14] selection:text-[#0b0a09]">
        {children}
      </body>
    </html>
  );
}
