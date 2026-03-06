import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Inlingua Malta | 2026 Fiyatları | Sliema',
  description:
    'Inlingua Malta Dil Okulu (2026), Sliema bölgesinde daha akademik ve yapılandırılmış bir öğrenme yaklaşımı arayan öğrenciler için öne çıkan bir okuldur. Ders içerikleri sistematik ilerler.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Inlingua Malta | 2026 Fiyatları | Sliema',
    description:
      'Inlingua Malta Dil Okulu (2026), Sliema bölgesinde daha akademik ve yapılandırılmış bir öğrenme yaklaşımı arayan öğrenciler için öne çıkan bir okuldur. Ders içerikleri sistematik ilerler.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/Inlingua-malta/inlingua-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
        width: 1200,
        height: 630,
        alt: 'Inlingua Malta Dil Okulu 2026 - Sliema bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inlingua Malta | 2026 Fiyatları',
    description:
      'Inlingua Malta Dil Okulu (2026), Sliema bölgesinde daha akademik ve yapılandırılmış bir öğrenme yaklaşımı arayan öğrenciler için öne çıkan bir okuldur.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/Inlingua-malta/inlingua-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp'],
  },
  keywords: [
    'Inlingua Malta',
    'Inlingua Malta Dil Okulu',
    'Inlingua Malta 2026',
    'Inlingua Malta fiyatları',
    'Inlingua Malta programları',
    'Inlingua Malta Sliema',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'Sliema dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function InlinguaMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
