import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarWrapper from "@/components/Navigation/Navbar";
import SidebarWrapper from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgoVis_",
  description: "An algorithm visualizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <NavbarWrapper />
        <div className="h-screen overflow-y-scroll">
          <div className="flex mt-20">
            <SidebarWrapper />
            <div className="bg-slate-800 w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
