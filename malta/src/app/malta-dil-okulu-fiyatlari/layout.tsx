import type { Metadata } from 'next';

// Tarih - sayfadan alınacak (client component'te hesaplanıyor)
const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Malta Dil Okulu Fiyatları 2026 | Güncel Fiyat Listesi ve Hesaplama',
  description:
    "Malta dil okulu fiyatları 2026: Haftalık, aylık ve dönemlik eğitim ücretleri. Konaklama fiyatları, yaşam maliyetleri ve toplam bütçe hesaplama. Tüm okulların fiyat karşılaştırması.",
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Malta Dil Okulu Fiyatları 2026 | Güncel Fiyat Listesi ve Hesaplama',
    description:
      "Malta dil okulu fiyatları 2026: Haftalık, aylık ve dönemlik eğitim ücretleri. Konaklama fiyatları, yaşam maliyetleri ve toplam bütçe hesaplama.",
    url: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari.webp',
        width: 1200,
        height: 675,
        alt: 'Malta Dil Okulu Fiyatları 2026 - Tüm okulların karşılaştırmalı fiyat listesi ve paket seçenekleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malta Dil Okulu Fiyatları 2026 | Güncel Fiyat Listesi ve Hesaplama',
    description:
      "Malta dil okulu fiyatları 2026: Haftalık, aylık ve dönemlik eğitim ücretleri. Konaklama fiyatları, yaşam maliyetleri ve toplam bütçe hesaplama.",
    images: ['https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari.webp'],
  },
  keywords: [
    'Malta dil okulu fiyatları',
    'Malta dil okulu ücretleri',
    'Malta İngilizce eğitim fiyatları',
    'Malta dil okulu maliyeti',
    'Malta dil okulu bütçe',
    'Malta konaklama fiyatları',
    'Malta yaşam maliyeti',
    'Malta dil okulu fiyat karşılaştırma',
    'Malta dil okulu 2026 fiyatları',
    'ESE Malta fiyatları',
    'ESE Malta dil okulu fiyatları',
    'ESE Malta 2026 fiyatları',
    'EC Malta fiyatları',
    'IELS Malta fiyatları',
    'ACE Malta fiyatları',
  ],
};

export default function MaltaDilOkuluFiyatlariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
