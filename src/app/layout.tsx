import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Club Registration",
  description: "Display Tech Club events and allow people to register",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
