import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'ACE English Malta | 2026 Fiyatları | St. Julian\'s',
  description:
    'ACE English Malta Dil Okulu (2026), St. Julian\'s bölgesinde modern eğitim yaklaşımı ve tempolu ders yapısıyla kısa sürede ilerlemek isteyen öğrenciler için öne çıkan bir okuldur.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'ACE English Malta | 2026 Fiyatları | St. Julian\'s',
    description:
      'ACE English Malta Dil Okulu (2026), St. Julian\'s bölgesinde modern eğitim yaklaşımı ve tempolu ders yapısıyla kısa sürede ilerlemek isteyen öğrenciler için öne çıkan bir okuldur.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/ace-english-malta-kampus.webp',
        width: 1200,
        height: 630,
        alt: 'ACE English Malta Dil Okulu 2026 - St. Julian\'s bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACE English Malta | 2026 Fiyatları',
    description:
      'ACE English Malta Dil Okulu (2026), St. Julian\'s bölgesinde modern eğitim yaklaşımı ve tempolu ders yapısıyla kısa sürede ilerlemek isteyen öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/ace-english-malta-kampus.webp'],
  },
  keywords: [
    'ACE English Malta',
    'ACE English Malta Dil Okulu',
    'ACE English Malta 2026',
    'ACE English Malta fiyatları',
    'ACE English Malta programları',
    'ACE English Malta St. Julian\'s',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'St. Julian\'s dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function ACEEnglishMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
