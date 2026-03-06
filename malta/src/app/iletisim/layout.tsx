import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'İletişim | Malta Dil Okulları | Ücretsiz Danışmanlık | Türkiye & Malta Ofis',
  description:
    'Malta dil okulları başvuru, kayıt ve danışmanlık için iletişime geçin. Türkiye: +90 543 963 24 16, Malta: +356 99 14 30 66. Ücretsiz danışmanlık, okul seçimi, vize danışmanlığı ve öğrenci destek hizmetleri.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/iletisim',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'İletişim | Malta Dil Okulları | Ücretsiz Danışmanlık | Türkiye & Malta Ofis',
    description:
      'Malta dil okulları başvuru, kayıt ve danışmanlık için iletişime geçin. Türkiye ve Malta ofislerimizden ücretsiz danışmanlık alın.',
    url: 'https://maltadilokuluingilizce.com/iletisim',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'website',
    modifiedTime: dateModified,
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari-iletisim.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Dil Okulları İletişim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | Malta Dil Okulları | Ücretsiz Danışmanlık',
    description: 'Malta dil okulları başvuru ve danışmanlık için iletişime geçin. Türkiye ve Malta ofislerimizden bize ulaşın.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari-iletisim.webp'],
  },
  keywords: [
    'Malta dil okulu iletişim',
    'Malta dil okulu telefon',
    'Malta dil okulu danışmanlık',
    'Malta dil okulu başvuru',
    'Malta dil okulu kayıt',
    'Malta öğrenci vizesi danışmanlık',
    'Malta dil okulu Türkiye ofis',
    'Malta dil okulu Malta ofis',
    'Malta dil okulu ücretsiz danışmanlık',
    'Malta dil okulu başvuru formu',
  ],
  authors: [{ name: 'Malta Dil Okulu İngilizce' }],
  creator: 'Malta Dil Okulu İngilizce',
  publisher: 'Malta Dil Okulu İngilizce',
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
