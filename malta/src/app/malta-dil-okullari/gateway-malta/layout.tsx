import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Gateway Malta | 2026 Fiyatları | San Gwann',
  description:
    'Gateway Malta Dil Okulu (2026), San Gwann bölgesinde daha küçük ölçekli ve sakin bir okul yapısı arayan öğrenciler için öne çıkan bir okuldur. Öğrenme süreci bireysel odaklı ve dengeli ilerler.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Gateway Malta | 2026 Fiyatları | San Gwann',
    description:
      'Gateway Malta Dil Okulu (2026), San Gwann bölgesinde daha küçük ölçekli ve sakin bir okul yapısı arayan öğrenciler için öne çıkan bir okuldur. Öğrenme süreci bireysel odaklı ve dengeli ilerler.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/gateway-malta-dil-okulu.webp',
        width: 1200,
        height: 630,
        alt: 'Gateway Malta Dil Okulu 2026 - San Gwann bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gateway Malta | 2026 Fiyatları',
    description:
      'Gateway Malta Dil Okulu (2026), San Gwann bölgesinde daha küçük ölçekli ve sakin bir okul yapısı arayan öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/gateway-malta-dil-okulu.webp'],
  },
  keywords: [
    'Gateway Malta',
    'Gateway Malta Dil Okulu',
    'Gateway Malta 2026',
    'Gateway Malta fiyatları',
    'Gateway Malta programları',
    'Gateway Malta San Gwann',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'San Gwann dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function GatewayMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
