import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'EC Malta Dil Okulu | 2026 Fiyatları | St. Julian\'s',
  description:
    'EC Malta Dil Okulu (2026), St. Julian\'s bölgesinde uluslararası dil okulu zincirinin Malta\'daki temsilcisi. Sistemli yapı ve dengeli öğrenme temposu arayan öğrenciler için öne çıkan bir okuldur.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ec-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'EC Malta Dil Okulu | 2026 Fiyatları | St. Julian\'s',
    description:
      'EC Malta Dil Okulu (2026), St. Julian\'s bölgesinde uluslararası dil okulu zincirinin Malta\'daki temsilcisi. Sistemli yapı ve dengeli öğrenme temposu arayan öğrenciler için öne çıkan bir okuldur.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ec-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ec-malta/EC-Malta-Dil-Okulu.webp',
        width: 1200,
        height: 630,
        alt: 'EC Malta Dil Okulu 2026 - St. Julian\'s bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EC Malta Dil Okulu | 2026 Fiyatları',
    description:
      'EC Malta Dil Okulu (2026), St. Julian\'s bölgesinde uluslararası dil okulu zincirinin Malta\'daki temsilcisi. Sistemli yapı ve dengeli öğrenme temposu arayan öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/ec-malta/EC-Malta-Dil-Okulu.webp'],
  },
  keywords: [
    'EC Malta',
    'EC Malta Dil Okulu',
    'EC Malta 2026',
    'EC Malta fiyatları',
    'EC Malta programları',
    'EC Malta St. Julian\'s',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'St. Julian\'s dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function ECMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
