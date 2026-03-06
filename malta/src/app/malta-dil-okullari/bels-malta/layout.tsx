import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'BELS Malta | 2026 Fiyatları | St. Paul\'s Bay',
  description:
    'BELS Malta Dil Okulu (2026), St. Paul\'s Bay bölgesinde daha küçük sınıflar ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan butik bir dil okuludur. Eğitim yaklaşımı bireysel takibe dayanır.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/bels-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'BELS Malta | 2026 Fiyatları | St. Paul\'s Bay',
    description:
      'BELS Malta Dil Okulu (2026), St. Paul\'s Bay bölgesinde daha küçük sınıflar ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan butik bir dil okuludur. Eğitim yaklaşımı bireysel takibe dayanır.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/bels-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/bels-malta/bels-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
        width: 1200,
        height: 630,
        alt: 'BELS Malta Dil Okulu 2026 - St. Paul\'s Bay bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BELS Malta | 2026 Fiyatları',
    description:
      'BELS Malta Dil Okulu (2026), St. Paul\'s Bay bölgesinde daha küçük sınıflar ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan butik bir dil okuludur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/bels-malta/bels-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp'],
  },
  keywords: [
    'BELS Malta',
    'BELS Malta Dil Okulu',
    'BELS Malta 2026',
    'BELS Malta fiyatları',
    'BELS Malta programları',
    'BELS Malta St. Paul\'s Bay',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'St. Paul\'s Bay dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function BELSMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
