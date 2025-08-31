import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { RealtimeProvider } from "@/utils/hooks/realtime-provider";
import UserProvider from "@/utils/hooks/user-provider";
import QueryProvider from "@/utils/hooks/query-provider";

// ✅ Correct variable name
const atkinson = Atkinson_Hyperlegible({
  weight: [ "400", "700" ],
  variable: "--font-atkinson-hyperlegible",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "equip",
  description: "Booking system for Father Saturnino Urios University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={'/equip_logo_2.png'} type="image/png" />
      </head>
      <body
        className={`${atkinson.variable} antialiased bg-slate-50`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
