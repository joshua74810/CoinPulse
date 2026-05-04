import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinPulse",
  description: "Crypto Screener App with a Built-in High Frequency Terminal & Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className = "dark"
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Header/>
        {children}
        </body>
    </html>
  );
}
