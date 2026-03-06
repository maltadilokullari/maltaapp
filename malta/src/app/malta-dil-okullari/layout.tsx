import type { Metadata } from 'next';

// Tarih - sayfadan alınacak (client component'te hesaplanıyor)
const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Malta Dil Okulları 2026 | Karşılaştırma ve Seçim Rehberi',
  description:
    "Malta'daki dil okulları karşılaştırması: ESE, EC, IELTS, ACE ve diğer okulların detaylı incelemesi. Öğrenci profili, bölge ve program temposuna göre okul seçimi. Hangi okul kime uygun?",
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Malta Dil Okulları 2026 | Karşılaştırma ve Seçim Rehberi',
    description:
      "Malta'daki dil okulları karşılaştırması: ESE, EC, IELTS, ACE ve diğer okulların detaylı incelemesi. Öğrenci profili, bölge ve program temposuna göre okul seçimi.",
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari-dis/ese-malta-dil-okulu-st-julians.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Dil Okulları Karşılaştırma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malta Dil Okulları 2026 | Karşılaştırma ve Seçim Rehberi',
    description:
      "Malta'daki dil okulları karşılaştırması: ESE, EC, IELTS, ACE ve diğer okulların detaylı incelemesi. Öğrenci profili, bölge ve program temposuna göre okul seçimi.",
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari-dis/ese-malta-dil-okulu-st-julians.webp'],
  },
  keywords: [
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'Malta dil okulu karşılaştırma',
    'ESE Malta',
    'EC Malta',
    'IELS Malta',
    'ACE English Malta',
    'Malta dil okulu seçimi',
    'Malta dil okulu fiyatları',
    'Malta dil okulu bölgeleri',
  ],
};

export default function MaltaDilOkullariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
