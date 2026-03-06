import type { Metadata } from 'next';

// Tarih - sayfadan alınacak
const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Biz Kimiz? | Malta Dil Okulu Danışmanlık Ekibi | 8 Yıllık Deneyim',
  description:
    'Malta\'da 8 yıldır yaşayan, dil okullarında eğitim almış deneyimli ekibimiz. Malta dil okulu seçimi, konaklama, vize danışmanlığı ve öğrenci destek hizmetleri. Ücretsiz danışmanlık.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/biz-kimiz',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Biz Kimiz? | Malta Dil Okulu Danışmanlık Ekibi | 8 Yıllık Deneyim',
    description:
      'Malta\'da 8 yıldır yaşayan, dil okullarında eğitim almış deneyimli ekibimiz. Malta dil okulu seçimi, konaklama, vize danışmanlığı ve öğrenci destek hizmetleri. Ücretsiz danışmanlık.',
    url: 'https://maltadilokuluingilizce.com/biz-kimiz',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'website',
    modifiedTime: dateModified,
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-hizmetler/biz-kimiz-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Dil Okulu Danışmanlık Ekibi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biz Kimiz? | Malta Dil Okulu Danışmanlık Ekibi | 8 Yıllık Deneyim',
    description:
      'Malta\'da 8 yıldır yaşayan, dil okullarında eğitim almış deneyimli ekibimiz. Ücretsiz danışmanlık.',
    images: ['https://maltadilokuluingilizce.com/malta-hizmetler/biz-kimiz-hero.webp'],
  },
  keywords: [
    'Malta dil okulu danışmanlık',
    'Malta dil okulu ekibi',
    'Malta öğrenci danışmanlığı',
    'Malta dil okulu seçimi',
    'Malta vize danışmanlığı',
    'Malta konaklama planlama',
    'Malta öğrenci destek hizmetleri',
    'Malta dil okulu rehberi',
    'Malta\'da yaşayan danışman',
    'Malta İngilizce eğitimi danışmanlık',
  ],
  authors: [{ name: 'Malta Dil Okulu İngilizce' }],
  creator: 'Malta Dil Okulu İngilizce',
  publisher: 'Malta Dil Okulu İngilizce',
};

export default function BizKimizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
