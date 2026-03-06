import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Malta Dil Okulu İngilizce',
  description: 'Malta dil okulları danışmanlık hizmetlerimiz kapsamında toplanan kişisel verilerin korunması, işlenmesi ve saklanması hakkında detaylı gizlilik politikası. 2016\'dan beri Malta\'da faaliyet gösteren ekibimiz ile güvenli veri işleme.',
  keywords: [
    'gizlilik politikası',
    'malta dil okulu gizlilik',
    'kişisel veri koruma',
    'kvkk uyum',
    'malta dil okulu veri güvenliği',
    'malta öğrenci veri koruma',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Gizlilik Politikası | Malta Dil Okulu İngilizce',
    description: 'Kişisel verilerinizin korunması ve güvenli işlenmesi hakkında detaylı bilgi.',
    url: 'https://maltadilokuluingilizce.com/gizlilik-politikasi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/gizlilik-politikasi',
  },
};

export default function GizlilikPolitikasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
