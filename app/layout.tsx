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
  openGraph: {
    title: "Parallax Research Group",
    description: "Independent research across markets, economics, and technology.",
    url: SITE_URL,
    siteName: "Parallax Research Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallax Research Group",
    description: "Independent research across markets, economics, and technology.",
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
