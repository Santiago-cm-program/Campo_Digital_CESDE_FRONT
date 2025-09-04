import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { use } from "react";
import Sidebar from "@/componentes/Sidebar";
import Footer from "@/componentes/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campo Digital",
  description: "Ecommerce para el Agro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
     <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >  
       <header/> 
        <div className="flex min-h-screen">
          <Sidebar/>
          <main className="flex-1">{children}</main>
        </div>
      <Footer/>      
      </body>      
    </html>
  );
}
