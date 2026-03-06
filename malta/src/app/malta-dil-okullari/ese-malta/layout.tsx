import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'ESE Malta Dil Okulu | 2026 Fiyatları | St. Julian\'s',
  description:
    'ESE Malta Dil Okulu (2026), Malta\'da İngilizce eğitimi planlayan öğrencilerin en çok araştırdığı okullardan biridir. St. Julian\'s bölgesindeki merkezi konumu, modern kampüs yapısı ve uluslararası öğrenci yapısıyla akreditasyonlu eğitim programları.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'ESE Malta Dil Okulu | 2026 Fiyatları | St. Julian\'s',
    description:
      'ESE Malta Dil Okulu (2026), Malta\'da İngilizce eğitimi planlayan öğrencilerin en çok araştırdığı okullardan biridir. St. Julian\'s bölgesindeki merkezi konumu, modern kampüs yapısı ve uluslararası öğrenci yapısıyla akreditasyonlu eğitim programları.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/ese-malta-dil-okulu.webp',
        width: 1200,
        height: 630,
        alt: 'ESE Malta Dil Okulu 2026 - St. Julian\'s bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESE Malta Dil Okulu | 2026 Fiyatları',
    description:
      'ESE Malta Dil Okulu (2026), Malta\'da İngilizce eğitimi planlayan öğrencilerin en çok araştırdığı okullardan biridir. St. Julian\'s bölgesindeki merkezi konumu ve modern kampüs yapısı.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/ese-malta-dil-okulu.webp'],
  },
  keywords: [
    'ESE Malta',
    'ESE Malta Dil Okulu',
    'ESE Malta 2026',
    'ESE Malta fiyatları',
    'ESE Malta programları',
    'ESE Malta St. Julian\'s',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'St. Julian\'s dil okulu',
    'Malta akreditasyonlu dil okulu',
    'Malta uluslararası öğrenci',
  ],
};

export default function ESEMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
