import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://parallaxresearch.group";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Parallax Research Group",
    template: "%s | Parallax Research Group",
  },
  description: "Independent research across markets, economics, and technology.",
  icons: {
    icon: [{ url: "/brand/15_favicon_navy_tile.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/brand/15_favicon_navy_tile.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "Parallax Research Group",
    description: "Independent research across markets, economics, and technology.",
    url: SITE_URL,
    siteName: "Parallax Research Group",
    type: "website",
    // Square for now (matches the only social asset exported so far). A
    // 1200x630 landscape version would render better on platforms that crop
    // to that ratio (e.g. Twitter/X, some Slack unfurls); swap this out if
    // Nirmay exports one later.
    images: [{ url: "/brand/16_social_square.png", width: 1024, height: 1024, alt: "Parallax Research Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallax Research Group",
    description: "Independent research across markets, economics, and technology.",
    images: ["/brand/16_social_square.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
