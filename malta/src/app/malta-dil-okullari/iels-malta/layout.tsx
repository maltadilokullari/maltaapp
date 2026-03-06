import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'IELS Malta Dil Okulu | 2026 Fiyatları | Sliema',
  description:
    'IELS Malta Dil Okulu (2026), Sliema bölgesinde yoğun ders temposu ve hızlı ilerleme hedefi olan öğrenciler için öne çıkan bir okuldur. Program yapısı disiplinli ve kısa sürede sonuç almak isteyenlere yöneliktir.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'IELS Malta Dil Okulu | 2026 Fiyatları | Sliema',
    description:
      'IELS Malta Dil Okulu (2026), Sliema bölgesinde yoğun ders temposu ve hızlı ilerleme hedefi olan öğrenciler için öne çıkan bir okuldur. Program yapısı disiplinli ve kısa sürede sonuç almak isteyenlere yöneliktir.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/iels-malta-dil-okulu.webp',
        width: 1200,
        height: 630,
        alt: 'IELS Malta Dil Okulu 2026 - Sliema bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IELS Malta Dil Okulu | 2026 Fiyatları',
    description:
      'IELS Malta Dil Okulu (2026), Sliema bölgesinde yoğun ders temposu ve hızlı ilerleme hedefi olan öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/iels-malta-dil-okulu.webp'],
  },
  keywords: [
    'IELS Malta',
    'IELS Malta Dil Okulu',
    'IELS Malta 2026',
    'IELS Malta fiyatları',
    'IELS Malta programları',
    'IELS Malta Sliema',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'Sliema dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function IELSMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
