import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frame In Goa | Hacker House Goa 2026",
  description: "Create your official Hacker House Goa profile frame and builder card in seconds.",
  icons: {
    icon: "/HHGOA-LOGO.png",
  },
  openGraph: {
    title: "Frame In Goa | Hacker House Goa 2026",
    description: "Create your official Hacker House Goa profile frame and builder card in seconds.",
    images: [{
      url: "/branding/og-image.png", // We will add a default OG image later
      width: 1200,
      height: 630,
    }],
  },
};

import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Background />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
