import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alex = Alex_Brush({
  variable: "--font-alex",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Our Little Universe ❤️ Sakshi & Aditya",
  description: "A private cinematic digital scrapbook and love story dedicated to Sakshi and Aditya. Two names. One beautiful collection of memories.",
  authors: [{ name: "Aditya" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${alex.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-zinc-100 bg-midnight selection:bg-wine-dark selection:text-rose-light min-h-screen">
        {children}
      </body>
    </html>
  );
}
