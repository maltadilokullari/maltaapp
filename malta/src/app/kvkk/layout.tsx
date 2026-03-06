import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Malta Dil Okulu İngilizce',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında Malta dil okulu danışmanlık hizmetlerimiz için aydınlatma metni ve kişisel veri işleme bilgilendirmesi. KVKK uyumlu veri koruma.',
  keywords: [
    'kvkk',
    'kvkk aydınlatma metni',
    'kişisel verilerin korunması kanunu',
    'malta dil okulu kvkk',
    'kvkk uyum',
    'kişisel veri işleme',
    'malta öğrenci kvkk',
    '6698 sayılı kanun',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'KVKK Aydınlatma Metni | Malta Dil Okulu İngilizce',
    description: '6698 sayılı KVKK kapsamında kişisel veri işleme bilgilendirmesi ve aydınlatma metni.',
    url: 'https://maltadilokuluingilizce.com/kvkk',
    type: 'website',
  },
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/kvkk',
  },
};

export default function KVKKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
