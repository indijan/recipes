import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Merriweather } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "iPhone Shortcut + AI Recipe Demo",
  description:
    "The Shortcut sends JSON and the web app generates personalized recipe ideas.",
};

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${merriweather.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
