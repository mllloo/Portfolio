import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "./globals.css";
import "./responsive.css";
import GlassCursor from "./components/GlassCursor";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "Millonoel Rodriguez — Software Engineer", description: "Portfolio of Millonoel Rodriguez, a software engineer, designer, and entrepreneur building useful digital experiences." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body><GlassCursor />{children}</body></html>;
}
