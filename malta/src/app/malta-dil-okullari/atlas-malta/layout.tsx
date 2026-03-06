import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Atlas Malta | 2026 Fiyatları | Pembroke',
  description:
    'Atlas Malta Dil Okulu (2026), Pembroke bölgesinde daha küçük ölçekli, düzenli ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan bir okuldur. Öğrenme süreci istikrarlı ilerler.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Atlas Malta | 2026 Fiyatları | Pembroke',
    description:
      'Atlas Malta Dil Okulu (2026), Pembroke bölgesinde daha küçük ölçekli, düzenli ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan bir okuldur. Öğrenme süreci istikrarlı ilerler.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/atlas-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
        width: 1200,
        height: 630,
        alt: 'Atlas Malta Dil Okulu 2026 - Pembroke bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Malta | 2026 Fiyatları',
    description:
      'Atlas Malta Dil Okulu (2026), Pembroke bölgesinde daha küçük ölçekli, düzenli ve sakin bir öğrenme ortamı arayan öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/atlas-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp'],
  },
  keywords: [
    'Atlas Malta',
    'Atlas Malta Dil Okulu',
    'Atlas Malta 2026',
    'Atlas Malta fiyatları',
    'Atlas Malta programları',
    'Atlas Malta Pembroke',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'Pembroke dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function AtlasMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
