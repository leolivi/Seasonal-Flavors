import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/layouts/footer";
import Header from "@/layouts/header";
import SessionProvider from "@/providers/session-provider";
import { Toaster } from "@/components/toaster/toaster";

const cordaRegular = localFont({
  src: "./fonts/corda/Corda-Regular.ttf",
  variable: "--font-corda-regular",
  preload: false,
});
const cordaMedium = localFont({
  src: "./fonts/corda/Corda-Medium.ttf",
  variable: "--font-corda-medium",
  weight: "600",
  preload: false,
});
const cordaBold = localFont({
  src: "./fonts/corda/Corda-Bold.ttf",
  variable: "--font-corda-bold",
  preload: false,
});
const figTreeRegular = localFont({
  src: "./fonts/figtree/Figtree-Regular.ttf",
  variable: "--font-figtree-regular",
  preload: false,
});
const figTreeMedium = localFont({
  src: "./fonts/figtree/Figtree-Medium.ttf",
  variable: "--font-figtree-medium",
  preload: false,
});

export const metadata: Metadata = {
  title: "Seasonal Flavors",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          lang="de"
        />
      </head>
      <body
        className={`${cordaRegular.variable} ${cordaMedium.variable} ${cordaBold.variable} ${figTreeRegular.variable} ${figTreeMedium.variable} flex min-h-screen flex-col bg-sfwhite antialiased`}
      >
        <SessionProvider>
          <Header />
          <Toaster />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
