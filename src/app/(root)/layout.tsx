import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";


import "../globals.css";
import Leftbar from "@/components/shared/Leftbar";
import Bottombar from "@/components/shared/Bottombar";
import Rightbar from "@/components/shared/Rightbar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider

      >
        <html lang='en'>
        <body className={inter.className}>
        <Topbar />

        <main className='flex flex-row'>
          <Leftbar />
          <section className='main-container'>
            <div className='w-full max-w-4xl'>{children}</div>
          </section>
          {/* @ts-ignore */}
          <Rightbar />
        </main>

        <Bottombar />
        </body>
        </html>
      </ClerkProvider
       >
  );
}