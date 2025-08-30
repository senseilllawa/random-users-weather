import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Users & Weather",
  description: "Random users with weather by location",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main className="container py-6" suppressHydrationWarning>
          {children}
        </main>
      </body>
    </html>
  );
}
