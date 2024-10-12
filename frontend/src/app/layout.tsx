import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";

const cordaRegular = localFont({
  src: "./fonts/corda/Corda-Regular.ttf",
  variable: "--font-corda-regular",
  // weight: "100 900",
});
const cordaMedium = localFont({
  src: "./fonts/corda/Corda-Medium.ttf",
  variable: "--font-corda-medium",
  weight: "600",
});
const cordaBold = localFont({
  src: "./fonts/corda/Corda-Bold.ttf",
  variable: "--font-corda-bold",
  // weight: "100 900",
});
const figTreeRegular = localFont({
  src: "./fonts/figtree/Figtree-Regular.ttf",
  variable: "--font-figtree-regular",
  // weight: "100 900",
});
const figTreeMedium = localFont({
  src: "./fonts/figtree/Figtree-Medium.ttf",
  variable: "--font-figtree-medium",
  // weight: "100 900",
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
      <body
        className={`${cordaRegular.variable} ${cordaMedium.variable} ${cordaBold.variable} ${figTreeRegular.variable} ${figTreeMedium.variable} bg-sfwhite antialiased`}
      >
        <Header />
        {children}

        <Footer />
      </body>
    </html>
  );
}
