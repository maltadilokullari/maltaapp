import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'AM Language Malta | 2026 Fiyatları | Sliema',
  description:
    'AM Language Malta Dil Okulu (2026), Sliema bölgesinde daha odaklı bir öğrenme ortamı ve dengeli sınıf yapısı arayan öğrenciler için öne çıkan bir okuldur. Program yapısı pratike dayalıdır.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/am-language-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'AM Language Malta | 2026 Fiyatları | Sliema',
    description:
      'AM Language Malta Dil Okulu (2026), Sliema bölgesinde daha odaklı bir öğrenme ortamı ve dengeli sınıf yapısı arayan öğrenciler için öne çıkan bir okuldur. Program yapısı pratike dayalıdır.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/am-language-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/am-language-malta/am-language-malta-dil-okulu.webp',
        width: 1200,
        height: 630,
        alt: 'AM Language Malta Dil Okulu 2026 - Sliema bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AM Language Malta | 2026 Fiyatları',
    description:
      'AM Language Malta Dil Okulu (2026), Sliema bölgesinde daha odaklı bir öğrenme ortamı ve dengeli sınıf yapısı arayan öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/am-language-malta/am-language-malta-dil-okulu.webp'],
  },
  keywords: [
    'AM Language Malta',
    'AM Language Malta Dil Okulu',
    'AM Language Malta 2026',
    'AM Language Malta fiyatları',
    'AM Language Malta programları',
    'AM Language Malta Sliema',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'Sliema dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function AMLanguageMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
