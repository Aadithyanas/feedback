import type { Metadata } from "next";
import { Fustat, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";

const fustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduPortal — Career Training & Feedback Platform",
  description:
    "Register for mock interviews, resume reviews, portfolio feedback, and hands-on tech training. Share your feedback to help educators improve.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-black">
      <body
        className={`${fustat.variable} ${inter.variable} font-sans antialiased min-h-screen bg-white text-black`}
        style={{ WebkitFontSmoothing: "antialiased" }}
      >
        <Navbar />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
