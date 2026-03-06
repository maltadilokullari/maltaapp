import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Malta Dil Okulları',
  description:
    'Malta\'da dil okulu planlayan öğrenciler için hazırladığımız blog yazılarında; vize süreci, konaklama, fiyatlar, ulaşım ve öğrenci yaşamına dair güncel bilgileri paylaşıyoruz. Gerçek öğrenci deneyimleri, pratik ipuçları ve sık sorulan sorularla Malta\'ya daha hazırlıklı gidin.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/blog',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Blog | Malta Dil Okulları',
    description:
      'Malta\'da dil okulu planlayan öğrenciler için hazırladığımız blog yazılarında; vize süreci, konaklama, fiyatlar, ulaşım ve öğrenci yaşamına dair güncel bilgileri paylaşıyoruz.',
    url: 'https://maltadilokuluingilizce.com/blog',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Rehberleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Malta Dil Okulları',
    description: 'Malta\'da dil okulu planlayan öğrenciler için vize, konaklama, fiyatlar ve öğrenci yaşamına dair güncel bilgiler.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari.webp'],
  },
  keywords: [
    'Malta rehberleri',
    'Malta dil eğitimi',
    'Malta öğrenci vizesi',
    'Malta konaklama',
    'Malta öğrenci yaşamı',
    'Malta dil okulu rehberi',
    'Malta blog',
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
