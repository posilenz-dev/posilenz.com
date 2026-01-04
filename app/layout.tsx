import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Posilenz - Where Data Finds Clarity",
  description: "Posilenz integrates systems, unifies disparate data, and builds predictable workflows so your organisation operates with structured certainty, confidence and clarity.",
  metadataBase: new URL("https://posilenz.com"),
  openGraph: {
    title: "Posilenz - Where Data Finds Clarity",
    description: "Posilenz integrates systems, unifies disparate data, and builds predictable workflows so your organisation operates with structured certainty, confidence and clarity.",
    url: "https://posilenz.com",
    siteName: "Posilenz",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Posilenz - Where Data Finds Clarity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posilenz - Where Data Finds Clarity",
    description: "Posilenz integrates systems, unifies disparate data, and builds predictable workflows so your organisation operates with structured certainty, confidence and clarity.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "any" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
