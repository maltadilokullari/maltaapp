import type { Metadata } from 'next';

// Tarih - sayfadan alınacak
const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)',
  description:
    'Malta konaklama seçenekleri 2026: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları, imkanlar ve seçim rehberi.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-konaklama',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)',
    description:
      'Malta konaklama seçenekleri 2026: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları ve seçim rehberi.',
    url: 'https://maltadilokuluingilizce.com/malta-konaklama',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-hizmetler/malta-ogrenci-konaklama.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)',
    description:
      'Malta konaklama seçenekleri 2026: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları ve seçim rehberi.',
    images: ['https://maltadilokuluingilizce.com/malta-hizmetler/malta-ogrenci-konaklama.webp'],
  },
  keywords: [
    'Malta konaklama',
    'Malta öğrenci konaklama',
    'Malta aile yanı',
    'Malta rezidans',
    'Malta konaklama fiyatları',
    'Malta konaklama seçenekleri',
    'Malta öğrenci yurdu',
    'Malta paylaşımlı daire',
    'Malta stüdyo daire',
    'Malta konaklama 2026',
  ],
};

export default function MaltaKonaklamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
