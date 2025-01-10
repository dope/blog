import type { Metadata } from "next";

import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE } from "./lib/constants";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Header } from "./components/ui";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth bg-dark text-light`}
    >
      <body>
        <main className="max-w-xl mx-auto px-6 py-36 md:px-0">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
