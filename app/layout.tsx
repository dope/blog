import type { Metadata } from "next";

import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE } from "./lib/constants";

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
    <html lang="en">
      <body>
        <main className="max-w-sm mx-auto py-20">{children}</main>
      </body>
    </html>
  );
}
