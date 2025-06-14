import type { Metadata } from "next";
import { inter } from "@/lib/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocCheck",
  description:
    "Easily book real-time doctor appointments with our healthcare platform. Find doctors by specialty, view availability, and schedule visits instantly—no calls, no wait.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
