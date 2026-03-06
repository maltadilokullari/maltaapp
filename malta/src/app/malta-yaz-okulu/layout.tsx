import type { Metadata } from 'next';

// Tarih üretme fonksiyonu (sayfadaki ile aynı mantık)
function getDateModified(): string {
  const now = new Date();
  const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
  const year = istanbulDate.getFullYear();
  const month = String(istanbulDate.getMonth() + 1).padStart(2, '0');
  const day = String(istanbulDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const metadata: Metadata = {
  title: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
  description: 'Malta yaz okulları 2026: çocuk ve genç programları, okul karşılaştırmaları, yaş grupları, konaklama seçenekleri ve başvuru/vize süreci.',
  keywords: 'malta yaz okulu, malta yaz okulları, malta yaz okulu 2026, malta gençler için dil okulu, malta yaz programı',
  alternates: {
    canonical: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/',
  },
  openGraph: {
    title: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
    description: 'Malta yaz okulları 2026: çocuk ve genç programları, okul karşılaştırmaları, yaş grupları, konaklama seçenekleri ve başvuru/vize süreci.',
    url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/',
    siteName: 'Malta Dil Okulu İngilizce',
    type: 'article',
    publishedTime: '2026-01-01',
    modifiedTime: getDateModified(),
    authors: ['Malta Dil Okulu İngilizce'],
    images: [
      {
        url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/malta-yaz-okullari.webp',
        width: 1200,
        height: 630,
        alt: 'Malta Yaz Okulları 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
    description: 'Malta yaz okulları 2026: çocuk ve genç programları, okul karşılaştırmaları, yaş grupları, konaklama seçenekleri ve başvuru/vize süreci.',
    images: ['https://maltadilokuluingilizce.com/malta-yaz-okullari/malta-yaz-okullari.webp'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

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
      '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#webpage',
      url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/',
      name: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
      description: 'Malta yaz okulları 2026: çocuk ve genç programları, okul karşılaştırmaları, yaş grupları, konaklama seçenekleri ve başvuru/vize süreci.',
      isPartOf: {
        '@id': 'https://maltadilokuluingilizce.com/#website',
      },
      about: {
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#article',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable-yaz-hero', '.speakable-yaz-schools-summary'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Ana Sayfa',
          item: 'https://maltadilokuluingilizce.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Malta Dil Okulları',
          item: 'https://maltadilokuluingilizce.com/malta-dil-okullari',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Malta Yaz Okulları',
          item: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/',
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#article',
      headline: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
      description: 'Malta yaz okulları 2026: çocuk ve genç programları, okul karşılaştırmaları, yaş grupları, konaklama seçenekleri ve başvuru/vize süreci.',
      author: {
        '@id': 'https://maltadilokuluingilizce.com/#organization',
      },
      publisher: {
        '@id': 'https://maltadilokuluingilizce.com/#organization',
      },
      mainEntityOfPage: {
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#webpage',
      },
      datePublished: '2026-01-01',
      dateModified: dateModified,
    },
    {
      '@type': 'ItemList',
      '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#schools',
      name: 'Malta Yaz Okulları 2026 – Program Sunan Okullar',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ESE Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#ese-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'EC Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#ec-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'BELS Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#bels-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'IELS Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#iels-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Gateway School of English',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#gateway-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'ACE English Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#ace-english-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'AM Language Studio',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#am-language-studio-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Inlingua Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#inlingua-malta-yaz-okulu',
        },
        {
          '@type': 'ListItem',
          position: 9,
          name: 'Clubclass Malta',
          url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#clubclass-malta-yaz-okulu',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Malta yaz okulları kaç yaş için uygundur?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Malta yaz okulları genellikle 8–17 yaş arası çocuklar ve gençler için planlanır. Programlar çoğunlukla Junior ve Teen gruplarına ayrılır ve yaşa göre ders/aktivite düzeni değişebilir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Malta yaz okulu programları kaç hafta sürer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Program süreleri okul ve döneme göre değişmekle birlikte genellikle 1–8 hafta aralığında seçenekler bulunur. Aileler çoğunlukla 2–4 haftalık paketleri tercih eder.',
          },
        },
        {
          '@type': 'Question',
          name: 'Malta yaz okulu fiyatlarına neler dahil olur?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paketlerin çoğunda İngilizce dersleri, program tipine göre konaklama, yemek planı, aktiviteler/geziler ve bazı paketlerde havaalanı transferi yer alabilir. Dahil olan hizmetler okul ve pakete göre değişir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Malta yaz okullarında haftada kaç saat İngilizce dersi olur?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Çoğu Malta yaz okulu programında haftalık ders yükü genellikle 15–20 saat İngilizce dersi olacak şekilde planlanır. Ders saatleri okulun programına göre değişebilir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Aktiviteler ve geziler zorunlu mu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Birçok programda aktiviteler ve geziler yaz okulunun temel parçasıdır ve öğrenciler genellikle gözetmenler eşliğinde katılır. Aktivite içeriği okul ve yaş grubuna göre farklılık gösterebilir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Malta yaz okulunda hangi konaklama seçenekleri var?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En yaygın seçenekler aile yanı, residence/yurt ve bazı programlarda resort otel konaklamasıdır. Konaklama türü, öğrencinin yaşına ve seçilen pakete göre belirlenir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Yeşil pasaport ile Malta yaz okuluna vize gerekir mi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yeşil pasaport sahipleri için Malta\'da 90 güne kadar vize muafiyeti bulunabilir; bu nedenle 90 günü aşmayan programlarda çoğunlukla vize başvurusu gerekmeyebilir. (Süre ve koşullar seyahat planına göre değişebilir.)',
          },
        },
        {
          '@type': 'Question',
          name: 'Bordo pasaport ile Malta yaz okuluna vize gerekir mi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Bordo pasaport ile Malta yaz okuluna katılımda genellikle vize gereklidir. Başvuru dosyası, okul kabul belgesi ve konaklama evrakları hazırlanır.',
          },
        },
        {
          '@type': 'Question',
          name: 'Vize başvurusu için destek sağlıyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet. Bordo pasaportlu öğrenciler için başvuru ve evrak hazırlığı sürecinde ücretsiz danışmanlık ve destek sağlıyoruz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Malta yaz okulu için ne zaman başvurmak gerekir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popüler programlarda kontenjanlar hızlı dolabildiği için özellikle yaz dönemi için erken başvuru önerilir. Vize gereken durumlarda süreç planlaması için başvuruyu daha erken yapmak avantaj sağlar.',
          },
        },
      ],
    },
  ],
};

export default function MaltaYazOkuluLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
