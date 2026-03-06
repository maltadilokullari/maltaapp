import type { Metadata } from 'next';

// Tarih üretme fonksiyonu
function getDateModified(): string {
  const now = new Date();
  const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
  const year = istanbulDate.getFullYear();
  const month = String(istanbulDate.getMonth() + 1).padStart(2, '0');
  const day = String(istanbulDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const metadata: Metadata = {
  title: 'Malta Work & Study Programı 2026 | Malta\'da Dil Eğitimi Alırken Çalışma',
  description: 'Malta Work & Study 2026 rehberi: 15 hafta minimum dil eğitimi, 20 saat part-time çalışma hakkı, vize süreci, fiyatlar ve iş bulma. Malta\'da öğrenci olarak çalışma şartları ve bütçe hesaplama.',
  keywords: 'malta work and study, malta work study 2026, malta dil okulu çalışma, malta öğrenci çalışma izni, malta work and study programı, malta öğrenci vizesi, malta part time iş, malta dil okulu fiyatları',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-work-and-study/',
  },
  openGraph: {
    title: 'Malta Work & Study Programı 2026 | Malta\'da Dil Eğitimi Alırken Çalışma',
    description: 'Malta Work & Study 2026 rehberi: 15 hafta minimum dil eğitimi, 20 saat part-time çalışma hakkı, vize süreci, fiyatlar ve iş bulma. Malta\'da öğrenci olarak çalışma şartları ve bütçe hesaplama.',
    url: 'https://maltadilokuluingilizce.com/malta-work-and-study/',
    siteName: 'Malta Dil Okulu İngilizce',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: getDateModified(),
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/work-and-study/malta-work-and-study-programi-nedir-2026.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Work & Study Programı 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malta Work & Study Programı 2026 | Malta\'da Dil Eğitimi Alırken Çalışma',
    description: 'Malta Work & Study 2026 rehberi: 15 hafta minimum dil eğitimi, 20 saat part-time çalışma hakkı, vize süreci, fiyatlar ve iş bulma.',
    images: ['https://maltadilokuluingilizce.com/work-and-study/malta-work-and-study-programi-nedir-2026.webp'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function MaltaWorkAndStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dateModified = getDateModified();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://maltadilokuluingilizce.com/#website',
        url: 'https://maltadilokuluingilizce.com',
        name: 'Malta Dil Okulu İngilizce',
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://maltadilokuluingilizce.com/#organization',
        name: 'Malta Dil Okulu İngilizce',
        url: 'https://maltadilokuluingilizce.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://maltadilokuluingilizce.com/logo-header.png',
          width: 1200,
          height: 630,
        },
        description:
          'Malta dil okulları danışmanlık, başvuru ve kayıt hizmetleri. Malta\'da 8 yıldır yaşayan ekibimizle ücretsiz danışmanlık, okul seçimi, vize danışmanlığı ve öğrenci destek hizmetleri sunuyoruz.',
        foundingDate: '2016',
        foundingLocation: {
          '@type': 'Place',
          addressCountry: 'MT',
        },
        areaServed: [
          {
            '@type': 'Country',
            name: 'Turkey',
            identifier: 'TR',
          },
          {
            '@type': 'Country',
            name: 'Malta',
            identifier: 'MT',
          },
        ],
        knowsAbout: [
          'Malta Dil Okulları',
          'Malta Öğrenci Vizesi',
          'Malta Konaklama',
          'Malta Work and Study',
          'İngilizce Dil Eğitimi',
          'Malta Öğrenci Yaşamı',
          'Malta Dil Okulu Başvuru',
          'Malta Dil Okulu Kayıt',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+905439632416',
            contactType: 'Customer Service',
            areaServed: {
              '@type': 'Country',
              identifier: 'TR',
            },
            availableLanguage: ['tr', 'en'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+35699143066',
            contactType: 'Customer Service',
            areaServed: {
              '@type': 'Country',
              identifier: 'MT',
            },
            availableLanguage: ['tr', 'en'],
          },
          {
            '@type': 'ContactPoint',
            email: 'bilgi@maltadilokuluingilizce.com',
            contactType: 'Customer Service',
            areaServed: [
              {
                '@type': 'Country',
                identifier: 'TR',
              },
              {
                '@type': 'Country',
                identifier: 'MT',
              },
            ],
            availableLanguage: ['tr', 'en'],
          },
        ],
        sameAs: [],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-work-and-study/',
        name: 'Malta Work & Study Programı 2026',
        isPartOf: { '@id': 'https://maltadilokuluingilizce.com/#website' },
        about: { '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#article' },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-work-study-hero'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Malta Dil Okulları',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Malta Work & Study 2026',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#article',
        headline: 'Malta Work & Study Programı 2026',
        description: 'Malta Work & Study 2026: Dil eğitimi alırken çalışma şartları, fiyatlar, vize süreci ve part-time iş bulma rehberi.',
        mainEntityOfPage: { '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#webpage' },
        author: { '@id': 'https://maltadilokuluingilizce.com/#organization' },
        publisher: { '@id': 'https://maltadilokuluingilizce.com/#organization' },
        datePublished: '2026-01-01',
        dateModified: dateModified,
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Malta Work & Study ile tam zamanlı çalışabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Malta Work & Study programı kapsamında öğrenciler haftada maksimum 20 saat part-time çalışabilir. Full-time çalışma, öğrenci statüsünde mümkün değildir.',
            },
          },
          {
            '@type': 'Question',
            name: 'İlk 90 gün çalışmak zorunlu mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Malta\'da Work & Study sürecinin ilk 90 günü yalnızca eğitim odaklıdır. Çalışma izni başvurusu bu sürenin ardından yapılabilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta\'da öğrenci olarak ayda ne kadar kazanılır?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '2026 itibarıyla saatlik ücretler genellikle 7–9 € arasındadır. Haftada 20 saat çalışan bir öğrenci, aylık ortalama 550–750 € gelir elde edebilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'İngilizce seviyem düşükse Work & Study yapabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Program İngilizce eğitimi ile başladığı için başlangıç seviyesindeki öğrenciler için de uygundur. İş bulma süreci, temel iletişim seviyesine ulaşıldıktan sonra daha kolay ilerler.',
            },
          },
          {
            '@type': 'Question',
            name: 'İş bulamazsam Work & Study programı iptal olur mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Work & Study bir çalışma programı değil, eğitim temelli bir sistemdir. İş bulamamak programın iptal edilmesine neden olmaz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta Work & Study 2026 yılında gerçekten mantıklı mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'İngilizce pratiği, bütçe kontrolü ve Avrupa deneyimini birlikte hedefleyen öğrenciler için Malta Work & Study, 2026 itibarıyla dengeli ve erişilebilir bir seçenektir.',
            },
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#toc',
        name: 'İçindekiler',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Malta Work & Study 2026 Süreci', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#surec' },
          { '@type': 'ListItem', position: 2, name: 'Malta Work & Study 2026 Şartları', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#sartlar' },
          { '@type': 'ListItem', position: 3, name: 'Malta Work & Study Fiyatları 2026', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#fiyatlar' },
          { '@type': 'ListItem', position: 4, name: 'Malta\'da Çalışarak İngilizce Öğrenmek (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#calisarak-ingilizce' },
          { '@type': 'ListItem', position: 5, name: 'Malta Work & Study Bütçe Hesaplama (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#butce-hesaplama' },
          { '@type': 'ListItem', position: 6, name: 'Malta Work & Study Ülke Karşılaştırması (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#work-and-study-karsilastirma' },
          { '@type': 'ListItem', position: 7, name: 'Work & Study Vize Süreci ve Resmî Kaynaklar (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#vize-ve-resmi-kaynaklar' },
          { '@type': 'ListItem', position: 8, name: 'Part-Time İş Bulma Rehberi (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#is-bulma-rehberi' },
          { '@type': 'ListItem', position: 9, name: 'Kimler İçin Uygun? (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#uygunluk' },
          { '@type': 'ListItem', position: 10, name: 'Sık Sorulan Sorular (2026)', url: 'https://maltadilokuluingilizce.com/malta-work-and-study/#sss' },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
