import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NavbarWrapper from "@/components/Navigation/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sorted_",
  description: "A sorting algorithm visualizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden bg-slate-800`}>
        <NavbarWrapper />
        <div className="flex mt-20 h-screen">
          <div className="bg-slate-800 w-full">{children}</div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
