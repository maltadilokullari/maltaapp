import type { Metadata } from 'next';

const dateModified = new Date().toISOString().split('T')[0];

export const metadata: Metadata = {
  title: 'Clubclass Malta | 2026 Fiyatları | Swieqi',
  description:
    'Clubclass Malta Dil Okulu 2026 fiyatları: 4 hafta 1.196€\'dan başlar. Swieqi\'de kampüs içi konaklama, havuz ve spor salonu. Genel İngilizce ve Yoğun İngilizce programları.',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-dil-okullari/clubclass-malta',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Clubclass Malta | 2026 Fiyatları | Swieqi',
    description:
      'Clubclass Malta Dil Okulu 2026 fiyatları: 4 hafta 1.196€\'dan başlar. Swieqi\'de kampüs içi konaklama, havuz ve spor salonu. Genel İngilizce ve Yoğun İngilizce programları.',
    url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/clubclass-malta',
    siteName: 'Malta Dil Okulu İngilizce',
    locale: 'tr_TR',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: dateModified,
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/clubclass-malta/clubclass-malta-dil-okulu.webp',
        width: 1200,
        height: 630,
        alt: 'Clubclass Malta Dil Okulu 2026 - Swieqi bölgesinde İngilizce eğitimi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clubclass Malta | 2026 Fiyatları',
    description:
      'Clubclass Malta Dil Okulu 2026 fiyatları: 4 hafta 1.196€\'dan başlar. Swieqi\'de kampüs içi konaklama, havuz ve spor salonu.',
    images: ['https://maltadilokuluingilizce.com/malta-dil-okullari/clubclass-malta/clubclass-malta-dil-okulu.webp'],
  },
  keywords: [
    'Clubclass Malta',
    'Clubclass Malta Dil Okulu',
    'Clubclass Malta 2026',
    'Clubclass Malta fiyatları',
    'Clubclass Malta programları',
    'Clubclass Malta Swieqi',
    'Malta dil okulları',
    'Malta İngilizce eğitimi',
    'Swieqi dil okulu',
    'Malta akreditasyonlu dil okulu',
  ],
};

export default function ClubclassMaltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
