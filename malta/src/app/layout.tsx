import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOProvider from "./SEOProvider";
import VerificationMeta from "@/components/VerificationMeta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Tarih - tek kaynak
const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026 | Güncel Fiyatlar & Karşılaştırma",
  description:
    "Malta dil okulları 2026 güncel karşılaştırması. ESE, EC, IELTS, ACE ve diğer okulların program temposu, bölgeler, fiyatlar ve vize süreci. Hangi okul kime uygun? Ücretsiz danışmanlık.",
  alternates: {
    canonical: "https://maltadilokuluingilizce.com/",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026 | Güncel Fiyatlar & Karşılaştırma",
    description:
      "Malta dil okulları 2026 güncel karşılaştırması. ESE, EC, IELTS, ACE ve diğer okulların program temposu, bölgeler, fiyatlar ve vize süreci. Hangi okul kime uygun? Ücretsiz danışmanlık.",
    url: "https://maltadilokuluingilizce.com/",
    siteName: "Malta Dil Okulu İngilizce",
    locale: "tr_TR",
    type: "article",
    publishedTime: "2026-01-01",
    modifiedTime: dateModified,
    authors: ["Malta Dil Okulu İngilizce"],
    images: [
      {
        url: "https://maltadilokuluingilizce.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026 | Güncel Fiyatlar & Karşılaştırma",
    description:
      "Malta dil okulları 2026 güncel karşılaştırması. ESE, EC, IELTS, ACE ve diğer okulların program temposu, bölgeler, fiyatlar ve vize süreci.",
    images: ["https://maltadilokuluingilizce.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SEOProvider />
        <VerificationMeta />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
