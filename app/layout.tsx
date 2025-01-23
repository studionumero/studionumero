import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Metrics from "./metrics";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Numero",
  description: "A worker cooperative design studio committed to creating digital products that transcend barriers of accessibility, location, language, and socioeconomic status.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-surface xl:pt-24 ${roboto.className}`} >
        <h1 className="hidden xl:flex uppercase font-black xl:ml-[72px] text-sm mb-4 absolute">STUDIO<br />NUMERO</h1>
        <div className="flex flex-col xl:ml-[72px] xl:mr-[72px] xl:items-center">
          {children}
        </div>
      </body>
      <Metrics />
    </html>
  );
}
