import type { Metadata } from 'next';

// Tarih - sayfadan alınacak
const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Malta Öğrenci Vizesi 2026 | Başvuru Süreci, Gerekli Belgeler ve Rehber',
  description:
    'Malta öğrenci vizesi 2026: Başvuru süreci, gerekli belgeler, vize ücretleri, başvuru adımları ve sıkça sorulan sorular. Malta dil okulu için vize rehberi.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Malta Öğrenci Vizesi 2026 | Başvuru Süreci, Gerekli Belgeler ve Rehber',
    description:
      'Malta öğrenci vizesi 2026: Başvuru süreci, gerekli belgeler, vize ücretleri, başvuru adımları ve sıkça sorulan sorular.',
    url: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Öğrenci Vizesi 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malta Öğrenci Vizesi 2026 | Başvuru Süreci, Gerekli Belgeler ve Rehber',
    description:
      'Malta öğrenci vizesi 2026: Başvuru süreci, gerekli belgeler, vize ücretleri, başvuru adımları ve sıkça sorulan sorular.',
    images: ['https://maltadilokuluingilizce.com/malta-ogrenci-vizesi.webp'],
  },
  keywords: [
    'Malta öğrenci vizesi',
    'Malta vize başvurusu',
    'Malta dil okulu vizesi',
    'Malta öğrenci vizesi 2026',
    'Malta vize gerekli belgeler',
    'Malta vize ücretleri',
    'Malta vize başvuru süreci',
    'Malta vize randevu',
    'VFS Global Malta',
  ],
};

export default function MaltaVizesiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
