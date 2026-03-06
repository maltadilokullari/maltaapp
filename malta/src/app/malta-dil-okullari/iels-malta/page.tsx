'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSchoolBySlug } from '../../data/schools';

// Price Calculator Component
function PriceCalculator() {
  const [duration, setDuration] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [program, setProgram] = useState('');
  const [result, setResult] = useState('');

  const durationMap: Record<string, string> = {
    '6 Hafta': '6',
    '1 Ay': '4',
    '3 Ay': '12',
    '6 Ay': '24',
  };

  const priceData: Record<string, Record<string, string>> = {
    "Day's Inn Hotel (4 kişi)": {
      '4': '1402€',
      '6': '2053€',
      '12': '4009€',
      '24': '7919€',
    },
    "Day's Inn Hotel (2 kişi)": {
      '4': '1523€',
      '6': '2236€',
      '12': '4373€',
      '24': '8648€',
    },
    "Day's Inn Hotel (1 kişi)": {
      '4': '2097€',
      '6': '3097€',
      '12': '6026€',
      '24': '11954€',
    },
    'Tigne Suites (2 kişi)': {
      '4': '1691€',
      '6': '2487€',
      '12': '4795€',
      '24': '9492€',
    },
    'Aile Yanı (2 kişi)': {
      '4': '1763€',
      '6': '2595€',
      '12': '5012€',
      '24': '9925€',
    },
  };

  const handleCalculate = () => {
    const weeks = durationMap[duration];
    if (!weeks || !accommodation) {
      setResult('Seçiminiz için fiyat bulunamadı, lütfen tabloyu kontrol edin.');
      return;
    }

    const price = priceData[accommodation]?.[weeks];
    if (!price) {
      setResult('Seçiminiz için fiyat bulunamadı, lütfen tabloyu kontrol edin.');
      return;
    }

    setResult(`Tahmini Paket Fiyatı: ${price}`);
  };

  return (
    <div className="border-4 border-blue-500 rounded-2xl p-6 bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label htmlFor="calc-duration" className="block text-sm font-medium text-slate-700 mb-2">
            Süre
          </label>
          <select
            id="calc-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Seçiniz</option>
            <option>1 Ay</option>
            <option>6 Hafta</option>
            <option>3 Ay</option>
            <option>6 Ay</option>
          </select>
        </div>
        <div>
          <label htmlFor="calc-accommodation" className="block text-sm font-medium text-slate-700 mb-2">
            Konaklama
          </label>
          <select
            id="calc-accommodation"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Seçiniz</option>
            <option>Day's Inn Hotel (4 kişi)</option>
            <option>Day's Inn Hotel (2 kişi)</option>
            <option>Day's Inn Hotel (1 kişi)</option>
            <option>Tigne Suites (2 kişi)</option>
            <option>Aile Yanı (2 kişi)</option>
          </select>
        </div>
        <div>
          <label htmlFor="calc-program" className="block text-sm font-medium text-slate-700 mb-2">
            Program
          </label>
          <select
            id="calc-program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Seçiniz</option>
            <option>Genel İngilizce</option>
            <option>Yoğun İngilizce</option>
            <option>Sınav Hazırlık</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Hesapla
          </button>
        </div>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold text-blue-900">{result}</p>
          <p className="text-sm text-blue-700 mt-2">
            Bu tutar, yukarıdaki 2026 her şey dahil paket fiyat tablosu baz alınarak gösterilmektedir.
          </p>
        </div>
      )}
    </div>
  );
}

export default function IELSMaltaPage() {
  const school = getSchoolBySlug('iels-malta');
  const [lastUpdated, setLastUpdated] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [acikIndex, setAcikIndex] = useState<number | null>(null);

  useEffect(() => {
    // Son güncelleme tarihi
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);

    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // WhatsApp link handler
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const baseMessage = 'Merhaba, IELS Malta hakkında bilgi almak istiyorum.';
    let userInfo = '';
    
    if (contactName || contactPhone) {
      userInfo = `\n\nAd Soyad: ${contactName} | Telefon: ${contactPhone}`;
    }
    
    const fullMessage = baseMessage + userInfo;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=35699143066&text=${encodeURIComponent(fullMessage)}`;
    
    e.currentTarget.href = whatsappUrl;
  };


  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!school) {
    return <div>Okul bulunamadı</div>;
  }

  // Tarih - tek kaynak
  const dateModified = new Date().toISOString().split('T')[0];
  const datePublished = '2026-01-01';

  // Structured Data - @graph yapısı
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
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
        '@type': 'WebSite',
        '@id': 'https://maltadilokuluingilizce.com/#website',
        url: 'https://maltadilokuluingilizce.com',
        name: 'Malta Dil Okulu İngilizce',
        description: "Malta'daki dil okulları hakkında detaylı bilgi ve karşılaştırma rehberi",
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta',
        name: 'IELS Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'IELS Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması. AI Overview uyumlu hızlı yanıtlar.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#article',
        headline: 'IELS Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'IELS Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/iels-malta.webp',
            width: 1200,
            height: 630,
            name: 'IELS Malta Dil Okulu 2026',
            caption: 'IELS Malta Dil Okulu 2026 - Kampüs, sınıf ortamı, programlar ve fiyatlar hakkında detaylı bilgi',
            description: 'IELS Malta Dil Okulu 2026: Güncel fiyatlar, program türleri, konaklama seçenekleri, sosyal aktiviteler ve öğrenci deneyimi hakkında detaylı rehber',
          },
        ],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '.speakable-iels-fiyatlar',
            '.speakable-iels-programlar',
            '.speakable-iels-konaklama',
          ],
          xpath: [],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#breadcrumb',
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
            name: 'IELS Malta',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta',
          },
        ],
      },
      {
        '@type': ['EducationalOrganization', 'LanguageSchool'],
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        name: school.name,
        description: school.description,
        image: `https://maltadilokuluingilizce.com${school.logo}`,
        url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: school.region,
          addressCountry: 'MT',
          addressRegion: 'Malta',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: school.region === "St. Julian's" ? 35.9214 : 35.9128,
          longitude: school.region === "St. Julian's" ? 14.4889 : 14.5022,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Malta',
          identifier: 'MT',
        },
        parentOrganization: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'IELS Malta 20 Ders Programı',
            description: 'IELS Malta 20 ders programı - Genel İngilizce kursu',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
          },
          {
            '@type': 'Offer',
            name: 'IELS Malta 30 Ders Programı',
            description: 'IELS Malta 30 ders programı - Yoğun İngilizce kursu',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'IELS Malta Kurs Programları',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: '20 Ders Programları',
            },
            {
              '@type': 'OfferCatalog',
              name: '30 Ders Programları',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#service`,
        name: `${school.name} Dil Eğitimi Hizmeti`,
        description: `${school.name} - Malta'da İngilizce dil eğitimi, konaklama ve öğrenci destek hizmetleri`,
        provider: {
          '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Malta',
          identifier: 'MT',
        },
        serviceType: 'Language Education',
        category: 'English Language School',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'IELS Malta Dil Okulu 2026 fiyatları ne kadar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'IELS Malta 2026 paket fiyatları; kurs süresi, konaklama tipi ve sezona göre değişir. En ekonomik paketler 4 haftada 1.402€ seviyesinden başlar; 24 haftalık paketlerde toplam maliyet seçilen konaklamaya göre 7.919€–11.954€ aralığına çıkabilir.',
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da yaş sınırı var mı?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "IELS Malta yetişkin öğrencilere uygun programlar sunar ve genellikle 16 yaş ve üzeri öğrenci kabul edilir. Dönemsel özel programlarda yaş kriterleri değişebilir.",
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da en uygun konaklama hangisi?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "En ekonomik seçenek genellikle Day's Inn Hotel 4 kişilik paylaşımlı konaklamadır. Daha az kişiyle konaklama, tek kişilik oda veya studio seçenekleri bütçeyi yükseltir.",
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta fiyatlarına yaz sezonu farkı uygulanır mı?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. 1 Haziran – 31 Ağustos 2026 tarihleri arasında haftalık 91€ yaz sezonu farkı uygulanır. Tigne Suites konaklamada 24 hafta ve üzeri kayıtlarda yaz sezonu farkı alınmaz.',
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da hangi İngilizce kursları var?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "IELS Malta'da Genel İngilizce, Yoğun İngilizce, İş İngilizcesi ve sınav hazırlık (IELTS/Cambridge) gibi farklı hedeflere uygun kurs seçenekleri bulunur.",
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da Türk öğrenci oranı ne kadar?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "IELS Malta'da Türkiye'den öğrenciler bulunur; ancak sınıflar uluslararası dengede oluşturulur. Bu sayede öğrenciler ders içinde ve dışında farklı milletlerle daha fazla İngilizce pratik yapar.",
            },
          },
          {
            '@type': 'Question',
            name: 'IELS Malta sertifika veriyor mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Kurs sonunda katılım ve seviye bilgilerini içeren başarı/katılım sertifikası verilir; bu belge eğitim sürecinizi resmi olarak belgelemenize yardımcı olur.',
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da konaklama nasıl ayarlanır?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Konaklama; kayıt aşamasında okul aracılığıyla veya danışmanlık desteğiyle rezerve edilebilir. Day's Inn, Tigne Suites ve aile yanı gibi seçeneklerde müsaitlik ve tarih aralığı belirleyicidir.",
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da sosyal aktiviteler var mı?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Evet. Okulun dönemsel sosyal programında şehir turları, kültürel geziler ve sezonluk deniz aktiviteleri gibi etkinlikler bulunabilir; bu etkinlikler İngilizce pratiğini hızlandırır.",
            },
          },
          {
            '@type': 'Question',
            name: "IELS Malta'da kaç hafta eğitim almak mantıklı?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hedefe göre değişir: 4 hafta Malta deneyimi ve pratik için iyi bir başlangıçtır; 8–12 hafta konuşma akıcılığı için daha dengelidir; 24 hafta ve üzeri programlar ise daha belirgin seviye ilerlemesi sağlar.',
            },
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/iels-malta.webp',
        width: 1200,
        height: 630,
        name: 'IELS Malta Dil Okulu 2026',
        caption: 'IELS Malta Dil Okulu 2026 - Kampüs, sınıf ortamı, programlar ve fiyatlar hakkında detaylı bilgi',
        description: 'IELS Malta Dil Okulu 2026: Güncel fiyatlar, program türleri, konaklama seçenekleri, sosyal aktiviteler ve öğrenci deneyimi hakkında detaylı rehber',
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#fiyat-tablosu',
        name: 'IELS Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)',
        description: 'IELS Malta Dil Okulu 2026 yılı için konaklama dahil paket fiyatları tablosu',
        about: 'IELS Malta fiyatları, eğitim süresi ve konaklama tipine göre değişen 2026 paket fiyatları',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#konaklama-listesi',
        name: 'IELS Malta Konaklama Türleri',
        description: 'IELS Malta Dil Okulu konaklama seçenekleri: Day\'s Inn Hotel, Tigne Suites, aile yanı',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Day\'s Inn Hotel (4 kişi)',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Day\'s Inn Hotel (2 kişi)',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Day\'s Inn Hotel (1 kişi)',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Tigne Suites (2 kişi)',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Aile Yanı (2 kişi)',
          },
        ],
      },
      {
        '@type': 'Course',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#course-20`,
        name: 'IELS Malta 20 Ders Genel İngilizce Kursu',
        description: 'IELS Malta 20 ders programı - Haftalık 20 ders Genel İngilizce eğitimi',
        provider: {
          '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        },
        courseCode: 'IELS-20',
        educationalLevel: 'Beginner to Advanced',
        teaches: 'English Language',
        inLanguage: 'en',
        coursePrerequisites: 'None',
      },
      {
        '@type': 'Course',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#course-30`,
        name: 'IELS Malta 30 Ders Yoğun İngilizce Kursu',
        description: 'IELS Malta 30 ders programı - Haftalık 30 ders Yoğun İngilizce eğitimi',
        provider: {
          '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        },
        courseCode: 'IELS-30',
        educationalLevel: 'Beginner to Advanced',
        teaches: 'English Language',
        inLanguage: 'en',
        coursePrerequisites: 'None',
      },
      {
        '@type': 'VideoObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/iels-malta/#video',
        name: 'IELS Malta Öğrenci Deneyimi (2026)',
        description: 'IELS Malta Dil Okulu\'nda eğitim alan öğrencilerin tipik bir gününü yansıtan video. Derslerin işleyişi, sınıf içi iletişim ve okulun uluslararası öğrenci ortamı.',
        thumbnailUrl: 'https://img.youtube.com/vi/_u3voR1--vw/maxresdefault.jpg',
        uploadDate: '2026-01-01',
        contentUrl: 'https://www.youtube.com/watch?v=_u3voR1--vw',
        embedUrl: 'https://www.youtube.com/embed/_u3voR1--vw',
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <Link
                href="/malta-dil-okullari"
                className="text-slate-600 hover:text-slate-900 hover:underline transition-colors"
              >
                Malta Dil Okulları
              </Link>
              <span className="text-slate-400" aria-hidden="true">›</span>
              <Link
                href={`/malta-dil-okullari/${school.slug}`}
                className="text-slate-900 font-medium hover:text-slate-700 hover:underline transition-colors"
              >
                {school.name}
              </Link>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white py-16 md:py-20" itemScope itemType="https://schema.org/Article">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
              {/* Sol Kolon - İçerik */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight" itemProp="headline">
                  <strong>IELS Malta Dil Okulu</strong>: <strong>2026</strong> <strong>Fiyatları ve Programlar</strong>
                </h1>
                <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed" itemProp="description">
                  <p>
                    <strong>IELS Malta Dil Okulu</strong>, Malta'da İngilizce eğitimi almak isteyen Türk öğrencilerin en çok araştırdığı okullardan biri. Bu sayfada IELS'in <strong>2026</strong> güncel kurs fiyatlarını, program seçeneklerini ve okulun öne çıkan avantajlarını tek tek inceleyebilir; sana en uygun eğitimi seçerken ihtiyaç duyacağın tüm detaylara kolayca ulaşabilirsin.
                  </p>
                  <p>
                    Kurs süresi uzadıkça fiyatların nasıl değiştiğini, farklı program türlerinin kimlere daha uygun olduğunu ve konaklama seçeneklerinin toplam bütçeyi nasıl etkilediğini sade bir şekilde anlatıyoruz. Böylece karar aşamasına gelmeden önce sürpriz yaşamadan, IELS Malta hakkında net ve güvenilir bir fikir edinebilirsin.
                  </p>
                </div>
                <div className="text-sm text-slate-600 mt-6">
                  Son kontrol: <time dateTime={lastUpdated} className="font-semibold">{lastUpdated}</time> • fiyatları ve program bilgileri
                  günceldir.
                </div>
              </div>

              {/* Sağ Kolon - Form Card */}
              <div className="bg-[#EFF6FF] rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100">
                {/* Logo */}
                <div className="text-center mb-4">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/iels-malta.png"
                    alt="IELS Malta dil okulu logosu"
                    width={200}
                    height={60}
                    className="mx-auto"
                    unoptimized
                  />
                  <div className="mt-4 border-t border-blue-200"></div>
                </div>

                {/* Form Başlık ve Açıklama */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
                  IELS Malta 2026 Fiyat ve Program Bilgi Formu
                </h2>
                <p className="text-center mb-6 text-slate-700 text-sm">
                  IELS Malta Dil Okulu'nun 2026 yılına ait güncel fiyatlarını, program türlerini ve toplam maliyet detaylarını öğrenin.
                </p>

                {/* Form Inputs */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-900 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-900 mb-2">
                      Cep Telefon Numarası
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20IELS%20Malta%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    IELS Malta 2026 Fiyatlarını Göster
                  </a>
                  <p className="text-xs text-slate-600 text-center">
                    Bilgileriniz gizli tutulur ve üçüncü kişilerle paylaşılmaz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section id="içindekiler" className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
            <nav aria-label="İçindekiler" itemScope itemType="https://schema.org/SiteNavigationElement">
              <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">İçindekiler</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    IELS Malta Bilgileri
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#iels-malta-fiyatlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          1
                        </span>
                        <span className="leading-relaxed">IELS Malta Dil Okulu 2026 Güncel Fiyatları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#iels-malta-programlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          2
                        </span>
                        <span className="leading-relaxed">IELS Malta Dil Okulu Programları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#iels-malta-konaklama"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          3
                        </span>
                        <span className="leading-relaxed">IELS Malta Konaklama Türleri</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#iels-malta-aktiviteler"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          4
                        </span>
                        <span className="leading-relaxed">IELS Malta Sosyal Aktiviteleri</span>
                      </Link>
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Öğrenci Deneyimi ve Süreçler
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#ogrenci-deneyimi"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          5
                        </span>
                        <span className="leading-relaxed">IELS Malta'da Bir Öğrencinin Günü</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#iels-malta-kayit"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          6
                        </span>
                        <span className="leading-relaxed">IELS Malta Dil Okulu Kayıt Süreci</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#iels-malta-vize"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          7
                        </span>
                        <span className="leading-relaxed">IELS Malta Dil Okulu ve Vize Durumu</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#uygunluk"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          8
                        </span>
                        <span className="leading-relaxed">IELS Malta Kimler İçin Uygun / Uygun Değil?</span>
                      </Link>
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Sıkça Sorulan Sorular
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#iels-malta-faq"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          9
                        </span>
                        <span className="leading-relaxed">IELS Malta Dil Okulu Hakkında En Çok Sorulan Sorular</span>
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </nav>

            {/* Öne Çıkarılan Görsel */}
            <figure className="mt-8" itemScope itemType="https://schema.org/ImageObject">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta.webp"
                  alt="IELS Malta Dil Okulu 2026 - Kampüs, sınıf ortamı, programlar ve fiyatlar hakkında detaylı bilgi"
                  width={1200}
                  height={630}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                  quality={90}
                  itemProp="contentUrl"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-slate-600" itemProp="caption">
                IELS Malta Dil Okulu 2026 - Kampüs, sınıf ortamı, programlar ve fiyatlar hakkında detaylı bilgi
              </figcaption>
              <meta itemProp="name" content="IELS Malta Dil Okulu 2026" />
              <meta itemProp="description" content="IELS Malta Dil Okulu 2026: Güncel fiyatlar, program türleri, konaklama seçenekleri, sosyal aktiviteler ve öğrenci deneyimi hakkında detaylı rehber" />
            </figure>
          </div>
        </section>

        {/* Fiyatlar Bölümü */}
        <section className="bg-white py-12" id="iels-malta-fiyatlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              IELS Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)
            </h2>
            
            {/* H2 Alt Açıklama Paragrafı (Snippet Odaklı) */}
            <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-4 speakable-iels-fiyatlar">
              <p>
                <strong>IELS Malta fiyatları</strong> <strong>2026</strong> yılında eğitim süresi ve konaklama tipine göre değişir; <strong>4–24 hafta</strong> arası programlar için konaklama dahil tahmini paket maliyetleri tabloda yer alır.
              </p>
              <p>
                Bu sayfa, <strong>IELS Malta paket fiyatlarını</strong> anlatır; tablodaki tutarlar kurs, konaklama ve zorunlu ücretlerin toplamını yansıtır ve <strong>2026</strong> eğitim dönemi için geçerlidir.
              </p>
              <p>
                <strong>IELS Malta fiyatları</strong> konaklama tipine göre değişir; en düşük tahmini paket maliyeti <strong>4 haftalık Day's Inn Hotel (4 kişi)</strong> seçeneğinde <strong>1.402€</strong> olarak görülür.
              </p>
              <p>
                Fiyatlar eğitim süresi uzadıkça artar; <strong>24 haftalık</strong> programlarda toplam maliyet <strong>7.919€</strong> ile <strong>11.954€</strong> arasında değişir.
              </p>
            </div>

            {/* Hızlı Cevap / Özet Satırı (Snippet Boost) */}
            <p className="text-base md:text-lg font-semibold text-slate-900 mb-8 bg-blue-50 border-l-4 border-blue-500 pl-4 py-2">
              Kısaca: <strong>2026</strong> yılı için <strong>IELS Malta fiyatları</strong>, en düşük <strong>1.402€</strong> ile başlar; süre ve konaklama tipine göre değişen tahmini paket maliyetleri aşağıdaki tabloda yer alır.
            </p>
            
            {/* Fiyat Tablosu */}
            <div className="mb-6">
              <div className="overflow-x-auto relative" role="region" aria-label="iels Malta fiyat tablosu">
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full pointer-events-none hidden md:block z-10" aria-hidden="true"></div>
                <div className="md:hidden text-xs text-slate-500 mb-2 text-center bg-blue-50 border border-blue-100 rounded px-2 py-1">
                  ← → Kaydırarak tüm sütunları görebilirsin
                </div>
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm min-w-[800px]" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">iels Malta fiyatları 2026 - Konaklama dahil paket fiyatları tablosu</caption>
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b border-slate-200 sticky left-0 z-20 bg-slate-50 md:bg-slate-50">Konaklama Tipi</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">4 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">6 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">8 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">12 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">15 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">16 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">24 Hafta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Day's Inn Hotel (4 kişi)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">1402€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2053€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2705€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4009€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4979€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5312€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7919€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Day's Inn Hotel (2 kişi)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">1523€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2236€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2948€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4373€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5435€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5798€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">8648€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Day's Inn Hotel (1 kişi)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2097€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3097€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4050€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6026€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7502€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">8002€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">11954€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Tigne Suites (2 kişi)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">1691€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2487€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3230€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4795€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5963€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6361€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">9492€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Aile Yanı (2 kişi)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">1763€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2595€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3374€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5012€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6333€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6650€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">9925€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablo Altı Mikro Açıklama */}
            <p className="text-sm text-slate-600 mb-8 text-center">
              <strong>iels Malta fiyatları</strong> <strong>2026</strong> yılı için geçerlidir; en düşük fiyat <strong>4 haftalık Day's Inn Hotel (4 kişi)</strong> seçeneğine aittir. Tablodaki tutarlar tahmini paket fiyatıdır; okul, konaklama ve zorunlu ücretler dahildir.
            </p>

            {/* Fiyat Hesaplama */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                IELS Malta için Tahmini Paket Fiyatını Hesapla (2026)
              </h3>
              <p className="text-base text-slate-700 mb-6">
                Hesaplama, yukarıdaki tablodaki <strong>IELS Malta paket fiyatlarını</strong> esas alır; tahmini toplam maliyet gösterilir.
              </p>
              <PriceCalculator />
            </div>

            {/* Internal Link */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-base text-slate-700">
                iels Malta dışındaki okulların fiyatlarını da incelemek istersen, detaylı karşılaştırma için{' '}
                <Link href="/malta-dil-okulu-fiyatlari" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                  Malta Dil Okulu Fiyatları
                </Link>{' '}
                sayfamıza göz atabilirsin.
              </p>
            </div>

            {/* Dahil Olanlar */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">IELS Malta Her Şey Dahil Paket Fiyatlarına Neler Dahil?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Fiyata Dahil Olanlar</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    IELS Malta <strong>2026</strong> her şey dahil paket fiyatlarına aşağıdaki hizmetler dahildir:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">İngilizce dil eğitimi (seçilen hafta sayısı boyunca)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Seçilen konaklama tipi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Okul kayıt ücreti</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Eğitim materyalleri</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Kurs bitim sertifikası</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Fiyata Dahil Olmayan Ek Masraflar</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-400 font-bold">×</span>
                      <span className="text-slate-700">Uçak bileti</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-400 font-bold">×</span>
                      <span className="text-slate-700">Vize masrafları</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-400 font-bold">×</span>
                      <span className="text-slate-700">Havalimanı transferi (isteğe bağlı)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-400 font-bold">×</span>
                      <span className="text-slate-700">Kişisel harcamalar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fiyat Hesaplama Notları */}
            <div className="mt-12 space-y-4 text-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">IELS Malta Dil Okulu Fiyatı Hesaplamasında Dikkat Edilenler (2026)</h3>
              <p>
                <strong>IELS Malta Dil Okulu</strong> <strong>2026</strong> paket fiyatları, <strong>eğitim süresi</strong> ve <strong>konaklama tipine</strong> göre belirlenir; fiyatlar <strong>4–24 hafta</strong> arası programlar için geçerlidir.
              </p>
              <p>
                Paket ücretlerine <strong>kurs</strong> ve <strong>konaklama</strong> dahildir; <strong>dönemsel kampanyalar</strong>, <strong>yaz sezonu farkı</strong> ve <strong>opsiyonel hizmetler</strong> toplam maliyeti değiştirebilir.
              </p>
              <p>
                <strong>1 Haziran – 31 Ağustos 2026</strong> tarihleri arasında <strong>haftalık 91€</strong> yaz sezonu farkı uygulanır.
              </p>
              <p>
                <strong>Tigne Suites</strong> konaklamalarda <strong>24 hafta ve üzeri</strong> kayıtlarda yaz sezonu farkı alınmaz.
              </p>
              <p>
                <strong>Day's Inn Hotel studio (mutfaklı oda)</strong> için <strong>haftalık 42€</strong>, <strong>tek kişilik kullanımda</strong> ek <strong>7€</strong> fark bulunur.
              </p>
              <p>
                <strong>Opsiyonel hizmetler</strong> kapsamında <strong>haftalık kahvaltı 56€</strong>, <strong>akşam yemeği 161€</strong> olarak sunulur.
              </p>
              <p>
                <strong>2026 yılına özel kampanyalarda</strong>, <strong>Genel İngilizce 20 ders</strong> yerine <strong>30 ders</strong> seçeneği <strong>ek ücret olmadan</strong> sunulabilir (<strong>dönemsel</strong>).
              </p>
            </div>
          </div>
        </section>

        {/* Programlar Bölümü */}
        <section className="bg-slate-50 py-12" id="iels-malta-programlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              IELS Malta Dil Okulu Programları (Hangisi Sana Uygun?)
            </h2>
            <div className="speakable-iels-programlar">
            
            {/* H2 Alt Açıklama Paragrafı */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              <strong>IELS Malta programları</strong> süre, ders yoğunluğu ve hedefe göre ayrılır; her program farklı öğrenci ihtiyaçlarına yöneliktir. Program seçimi, <strong>IELS Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
            </p>
            
            {/* Program Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow relative overflow-hidden group h-full flex flex-col focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Genel İngilizce</h3>
                <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                  Günlük iletişim ve temel dil becerilerini sistemli ilerletmek isteyenler için uygundur.
                </p>
                <ul className="space-y-2 mb-4 flex-grow">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Haftalık 20 ders</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Minimum 1 hafta süre</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Dengeli öğrenme temposu</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-600 mt-auto pt-4 border-t border-slate-100">
                  Bu program türü, <strong>IELS Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow relative overflow-hidden group h-full flex flex-col focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">İş İngilizcesi</h3>
                <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                  Profesyonel iletişim ve iş ortamında yazışma, toplantı becerilerini geliştirmek isteyenler için uygundur.
                </p>
                <ul className="space-y-2 mb-4 flex-grow">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Haftalık 30 ders</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Minimum 1 hafta süre</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>İş odaklı içerik</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-600 mt-auto pt-4 border-t border-slate-100">
                  Program seçimi, <strong>IELS Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow relative overflow-hidden group h-full flex flex-col focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Akademik Yıl Programı</h3>
                <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                  Uzun dönem plan yapabilen ve istikrarlı, sürdürülebilir ilerleme hedefleyenler için uygundur.
                </p>
                <ul className="space-y-2 mb-4 flex-grow">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Haftalık 20 ders</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Minimum 24 hafta süre</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Uzun dönem eğitim</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-600 mt-auto pt-4 border-t border-slate-100">
                  Bu program türü, <strong>IELS Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow relative overflow-hidden group h-full flex flex-col focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Mini Grup İngilizce</h3>
                <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                  Küçük sınıf ortamında daha yakın takip ve pratik odaklı hızlı ilerleme isteyenler için uygundur.
                </p>
                <ul className="space-y-2 mb-4 flex-grow">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Haftalık 20 ders</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Minimum 1 hafta süre</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Küçük sınıf yapısı</span>
                  </li>
                </ul>
                <p className="text-xs text-slate-600 mt-auto pt-4 border-t border-slate-100">
                  Program seçimi, <strong>IELS Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
                </p>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <a
                href="https://wa.me/35699143066"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-500/50 bg-orange-50 px-6 py-3 text-base font-semibold text-orange-700 transition hover:bg-orange-100 hover:border-orange-500"
              >
                Temsilciden Bilgi Al
              </a>
            </div>
            
            {/* Programlara Dahil Olanlar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <figure itemScope itemType="https://schema.org/ImageObject">
                  <Image
                    src="/malta-dil-okullari/iels-malta/iels-malta-dil-okulu.webp"
                    alt="IELS Malta dil okulu kampüsü ve sınıf ortamı - Programlara dahil olan hizmetler"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover rounded-lg mb-4"
                    style={{ minHeight: '400px', maxHeight: '600px' }}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    itemProp="contentUrl"
                  />
                  <figcaption className="text-sm text-slate-600 text-center mt-2" itemProp="caption">
                    IELS Malta dil okulu kampüsü ve sınıf ortamı - Programlara dahil olan hizmetler
                  </figcaption>
                  <meta itemProp="name" content="IELS Malta Dil Okulu Kampüs ve Sınıf Ortamı 2026" />
                  <meta itemProp="description" content="IELS Malta dil okulu kampüsü, sınıf ortamı ve programlara dahil olan temel hizmetler hakkında görsel bilgi" />
                </figure>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Programlara dahil olan temel hizmetler</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Seviye belirleme sınavı</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Uluslararası sınıflarda İngilizce dersler</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Kurs süresince eğitim materyalleri</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Öğrenci portalı</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Sosyal ve kültürel etkinlikler</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Okul içi Wi-Fi ve çalışma alanları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Ücretsiz Wi-Fi ve Bilgisayar Kullanımı</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Hoş Geldin Etkinliği</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">İngilizce Dil Etkinlikleri ve Atölyeler</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Kampüs İmkânları */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">IELS Malta Dil Okulu Kampüs İmkânları</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <div className="text-2xl mb-2">💻</div>
                  <span className="text-sm text-slate-700">Etkileşimli Akıllı Tahtalar</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <div className="text-2xl mb-2">📚</div>
                  <span className="text-sm text-slate-700">Bireysel Çalışma Alanları</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <div className="text-2xl mb-2">🛋️</div>
                  <span className="text-sm text-slate-700">Öğrenci Dinlenme Alanı</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <div className="text-2xl mb-2">📖</div>
                  <span className="text-sm text-slate-700">Kütüphane ve Kaynak Alanları</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <div className="text-2xl mb-2">🌐</div>
                  <span className="text-sm text-slate-700">Ücretsiz İnternet Erişimi</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                  <div className="text-2xl mb-2">🏋️</div>
                  <span className="text-sm text-slate-700">Anlaşmalı Spor Salonu İndirimi</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Konaklama Bölümü */}
        <section className="bg-white py-12" id="iels-malta-konaklama">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              IELS Malta Konaklama Türleri – Okula Uzaklık ve Konfor Karşılaştırması
            </h2>
            <div className="speakable-iels-konaklama">
            <p className="text-base md:text-lg text-slate-700 mb-6 leading-relaxed">
              IELS Malta'da sunulan konaklama seçenekleri; okula uzaklık, konfor seviyesi ve yaşam tarzına göre değişir.
              Aşağıdaki karşılaştırma, Türkiye'den gidecek öğrencilerin "hangi konaklama bana uygun?" sorusuna hızlı ve net
              cevap vermesi için hazırlanmıştır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* 1) Tigne Suites */}
              <article className="rounded-xl border border-slate-200 bg-[#EFF6FF] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">Tigne Suites (IELS'e Komşu Öğrenci Apartmanı)</h3>

                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">Sliema – IELS okuluna komşu (next door).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">1–5 dk (yürüyüş).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">
                      Apartman düzeni; paylaşımlı yaşam. Self-catering (kendi yemeğini yapmaya uygun) konaklama.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">
                      Okula en yakın seçeneklerden biri olduğu için gün içinde ciddi zaman kazandırır. Sliema merkezde olduğu
                      için market, kafe ve sosyal alanlara erişim çok rahattır.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">
                      Okula yakın kalmak isteyen, daha özgür yaşam tarzını seven ve "konum + bütçe" dengesini önemseyen
                      öğrenciler.
                    </div>
                  </div>
                </div>
              </article>

              {/* 2) Day's Inn */}
              <article className="rounded-xl border border-slate-200 bg-[#EFF6FF] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">Day's Inn Hotel &amp; Residence (IELS'in Rezidans/Oteli)</h3>

                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">Sliema merkez; deniz kıyısına, sosyal alanlara ve toplu taşımaya yakın.</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">5–15 dk (yürüyüş / kısa ulaşım).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">
                      Otel/rezidans konforu; daha düzenli, daha az paylaşım. Studio seçeneklerinde mini mutfak avantajı.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">
                      24 saat resepsiyon gibi güven veren detaylar sunar. Yaz döneminde rooftop havuz/teras gibi ekstra
                      imkanlar sayesinde "konfor" arayan öğrenciler için güçlü bir seçenektir.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">
                      Konforu öncelikleyen, ilk kez Malta'ya giden, daha güvenli ve düzenli bir konaklama isteyen öğrenciler.
                    </div>
                  </div>
                </div>
              </article>

              {/* 3) IELS Lodge */}
              <article className="rounded-xl border border-slate-200 bg-[#EFF6FF] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">IELS Lodge (Okul Üstü Konaklama – Onsite)</h3>

                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">IELS okul binasının üst katı (aynı bina).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">0–2 dk (asansör/merdiven).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">
                      Pratik ve hızlı; "okul üstünde" konaklama. Ortak kullanım alanları (mutfak/pişirme alanı, lounge) ile
                      paylaşımlı düzende.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">
                      Ulaşım derdi olmadığı için derslere yetişme kolaylaşır. Programı yoğun olan öğrenciler için maksimum
                      pratiklik sağlar.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">
                      Kısa süreli gelen, ders temposu yoğun olan, her gün yol/ulaşım ile uğraşmak istemeyen öğrenciler.
                    </div>
                  </div>
                </div>
              </article>

              {/* 4) Host Family */}
              <article className="rounded-xl border border-slate-200 bg-[#EFF6FF] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">Host Family (Aile Yanı Konaklama – Half Board)</h3>

                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">Yerel Maltalı ailelerin yaşadığı bölgeler.</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">20–45 dk (otobüs ile; konuma göre değişir).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">
                      Daha sakin ve düzenli; ev ortamı. Günlük iletişimle pratik İngilizce imkanı ve kültüre yakın deneyim.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">
                      Half board (kahvaltı + akşam yemeği) dahil olduğu için bütçeyi kontrol etmeyi kolaylaştırır. Özellikle
                      ilk kez yurtdışına çıkan öğrenciler için adaptasyon sürecini rahatlatır.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">
                      Daha düzenli bir ortam isteyen, kültürel deneyim arayan, "yemek dahil" konaklama ile bütçesini net tutmak
                      isteyen öğrenciler.
                    </div>
                  </div>
                </div>
              </article>

              {/* 5) CampusHUB */}
              <article className="rounded-xl border border-slate-200 bg-[#EFF6FF] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">CampusHUB Residence (University of Malta Kampüsü)</h3>

                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">University of Malta kampüsü.</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">25 dk (otobüs) / 40 dk (yürüyüş).</div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">
                      Kampüs atmosferi; sosyal ve hareketli. Öğrenci rezidansı düzeni, ortak alanlar ve günlük kampüs yaşamı.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">
                      Spor salonu, açık havuz, restoran/kafe ve market gibi imkanlar sayesinde "kampüs hayatı" sevenler için
                      çok iyi bir seçenektir.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">
                      Sosyal ortam isteyen, kampüs deneyimi yaşamak isteyen, farklı ülkelerden öğrencilerle iç içe yaşamayı
                      seven öğrenciler.
                    </div>
                  </div>
                </div>
              </article>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">IELS Malta Konaklama Fiyatlarını Etkileyen Faktörler (2026)</h3>
              <p className="text-slate-700">
                <strong>2026 yılında IELS Malta konaklama fiyatları, yaz sezonunda artan talep nedeniyle haftalık bazda yükselebilir.</strong> Okula yakınlık ve oda tipi (tek kişilik, paylaşımlı veya özel banyolu) toplam maliyeti doğrudan etkiler. Uzun dönem konaklamalarda haftalık birim maliyet düşerken, kısa süreli programlarda sezon farkı daha belirgin hale gelir.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler Bölümü */}
        <section className="bg-slate-50 py-12" id="iels-malta-aktiviteler">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              IELS Malta Sosyal Aktiviteleri ve Öğrenci Deneyimi (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center">
              IELS Malta'da ders dışı etkinlikler, yeni arkadaşlıklar kurmak ve İngilizce pratiğini hızlandırmak için önemli bir avantaj sağlar. Aşağıdaki etkinlikler, okulun haftalık sosyal programında en sık karşılaşılan deneyimleri özetler.
            </p>
            
            {/* Aktiviteler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta-orientation-seviye-belirleme.webp"
                  alt="IELS Malta orientation etkinliği ve seviye belirleme"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Hoş Geldin Etkinliği (Orientation)</h3>
                  <p className="text-slate-700 text-sm">İlk gün seviye belirleme, okul tanıtımı ve sınıf düzeniyle hızlıca adapte olmanı sağlar.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta-haftalik-sosyal-program.webp"
                  alt="IELS Malta haftalık sosyal programı"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">IELS Sosyal Programı (Haftalık Etkinlik Akışı)</h3>
                  <p className="text-slate-700 text-sm">IELS'in haftalık sosyal programı, yeni arkadaşlık kurmanı ve ders dışında İngilizce pratik yapmanı hızlandırır.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta-english-workshop-konusma-pratigi.webp"
                  alt="IELS Malta İngilizce dil etkinlikleri ve konuşma pratiği atölyeleri"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">İngilizce Dil Etkinlikleri ve Atölyeler</h3>
                  <p className="text-slate-700 text-sm">Konuşma odaklı buluşmalar, pratik aktiviteler ve workshop'larla öğrendiklerini günlük hayata taşımana yardımcı olur.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta-sehir-turlari-valletta-mdina.webp"
                  alt="IELS Malta şehir turları Valletta ve Mdina kültürel gezileri"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Şehir Turları ve Kültürel Gezi Programları</h3>
                  <p className="text-slate-700 text-sm">Valletta, Mdina gibi kültürel duraklara yapılan gezilerle Malta'yı tanırken doğal şekilde İngilizce pratik yaparsın.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta-tekne-turu-deniz-aktiviteleri.webp"
                  alt="IELS Malta tekne turları ve deniz aktiviteleri"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Tekne Turları ve Deniz Aktiviteleri</h3>
                  <p className="text-slate-700 text-sm">Sezon döneminde düzenlenen tekne turları ve deniz aktiviteleri, sosyal ortamı güçlendirirken Malta deneyimini tamamlar.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/iels-malta/iels-malta-mezuniyet-kapanis-etkinligi.webp"
                  alt="IELS Malta mezuniyet ve kapanış etkinliği"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Mezuniyet / Kapanış Etkinliği</h3>
                  <p className="text-slate-700 text-sm">Program sonunda yapılan kapanış/mezuniyet etkinliği, sürecini keyifli bir finalle tamamlamanı sağlar.</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-slate-600">
              2026 boyunca IELS Malta'da sosyal aktiviteler ve etkinlik programı her hafta Pazartesi yayınlanır; bazı aktiviteler ücretsiz, bazıları ücretli olabilir.
            </p>
          </div>
        </section>

        {/* Öğrenci Deneyimi Bölümü */}
        <section className="bg-white py-12" id="ogrenci-deneyimi" itemScope itemType="https://schema.org/VideoObject">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" itemProp="name">
              IELS Malta'da Bir Öğrencinin Günü – Gerçek Deneyim (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8" itemProp="description">
              IELS Malta'da 2026 yılı boyunca eğitim alan öğrenciler, sınıf içi İngilizce derslerini Sliema'daki günlük yaşam ve sosyal pratikle birleştirir. Aşağıdaki videoda, IELS Malta'da eğitim alan bir öğrencinin ders ortamını, okul atmosferini ve Malta'daki tipik öğrenci gününü gerçek haliyle izleyebilirsiniz.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/_u3voR1--vw"
                    title="IELS Malta Öğrenci Deneyimi (2026)"
                    aria-label="IELS Malta Öğrenci Deneyimi (2026)"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    itemProp="embedUrl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerçek Öğrenci Deneyimi – IELS Malta Dil Okulu</h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Bu video, IELS Malta Dil Okulu'nda eğitim alan öğrencilerin tipik bir gününü yansıtmaktadır. Derslerin işleyişi, sınıf içi iletişim ve okulun uluslararası öğrenci ortamı; İngilizceyi yalnızca derslerde değil, gün içinde de aktif kullanmanı hedefler.
                  </p>
                  <p>
                    IELS Malta'nın Sliema'daki merkezi konumu sayesinde öğrenciler ders sonrası Malta'yı daha kolay keşfeder; kafeler, sahil yürüyüşleri ve sosyal buluşmalar gibi günlük anlar İngilizce pratiğini doğal şekilde artırır.
                  </p>
                  <p>
                    Eğer IELS Malta hakkında daha detaylı bilgi almak istersen; 2026 fiyatlar, programlar ve konaklama seçeneklerini sayfanın devamında inceleyebilir veya temsilciden bilgi alarak sana en uygun planı oluşturabiliriz.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-12 italic">
              Not: Videoda yer alan deneyim, öğrencinin kişisel gözlemlerini yansıtmaktadır; program içeriği ve etkinlikler dönemsel olarak değişiklik gösterebilir.
            </p>
            
            {/* Türk Öğrenciler için Deneyim */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Türk Öğrenciler için IELS Malta Deneyimi (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                IELS Malta Dil Okulu'nda 2026 boyunca Türk öğrenciler aktif olarak eğitim alır. Okul, sınıflarda milliyet dengesini koruyarak Türk öğrencilerin İngilizce pratiğini maksimum seviyede tutmayı hedefler ve Malta'daki günlük yaşamla akademik eğitimi birleştiren bir öğrenim deneyimi sunar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler Ne Beklemeli?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">IELS Malta'da Türk öğrenciler bulunur ancak sınıflar uluslararası dengede oluşturulur; tek millete dayanmaz.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">İngilizce iletişim hem sınıf içinde hem de okul dışı sosyal etkinliklerle ön plandadır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Yeni başlayanlar için adaptasyon süreci kolay; seviye belirleme ve orientation etkinlikleriyle ilk günler konforlu geçer.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Okulun Sliema'daki merkezi konumu, günlük pratik ve sosyal yaşamı birleştirir.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler için Avantajlar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Eğitim öncesi ve süreç boyunca Türkçe danışmanlık desteği sağlanır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Kayıt, vize ve konaklama süreçlerinde rehberlik hizmeti verilir; tüm süreç tek noktadan yönetilir.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Haftalık sosyal programlar ve etkinliklerle hızlı sosyal adaptasyon fırsatı yaratılır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Uzun dönem programlarda daha dengeli uluslararası öğrenci profili ile İngilizce pratiğin günlük hayata yayılır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">IELS'in Sliema konumu, Malta şehir yaşamına erişimi kolaylaştırarak pratik İngilizce kullanımını artırır.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 italic">
                Not: IELS Malta'da sınıf dağılımları, öğrencilerin milliyetlerine göre değil seviyelerine ve program türlerine göre yapılır. 2026 yılı öğrenci profili dönemsel olarak değişiklik gösterebilir.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">IELS Malta Dil Okulu – Türkiye Resmi Temsilcisi</h3>
                <p className="text-slate-700 mb-4">
                  IELS Malta Dil Okulu'nun Türkiye resmi temsilcisi olarak, 2026 yılı boyunca kayıt, fiyatlandırma, konaklama ve vize süreçlerinde öğrencilere birebir destek sağlıyoruz. Tüm bilgiler güncel IELS Malta programları ve resmi fiyatlar üzerinden paylaşılır.
                </p>
                <a
                  href="tel:+905439632416"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-orange-700 hover:text-orange-800"
                >
                  <span>📞</span>
                  Türkiye İletişim Hattı: <strong>0543 963 24 16</strong>
                </a>
                <p className="text-sm text-slate-600 mt-4 italic">
                  Not: Bu hat üzerinden yapılan görüşmeler bilgilendirme ve uygunluk analizi amaçlıdır.
                </p>
              </div>
            </div>
            
            {/* Öğrenci Profili */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                IELS Malta Dil Okulu Öğrenci Profili (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                IELS Malta'da 2026 yılı boyunca farklı ülkelerden ve yaş gruplarından öğrenciler eğitim almaktadır. Aşağıdaki dağılımlar, okulun uluslararası yapısını ve Türk öğrenciler için ortamı net şekilde gösterir.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Nationality Mix (Ülke Dağılımı)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Türk öğrenci oranı</span>
                      <span className="text-sm font-bold text-blue-600">%13</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full" style={{ height: '6px' }}>
                      <div className="bg-blue-600 rounded-full" style={{ height: '6px', width: '13%' }}></div>
                    </div>
                    
                    {[
                      { label: "Other", value: 22 },
                      { label: "Brezilya", value: 17 },
                      { label: "Kolombiya", value: 16 },
                      { label: "Güney Kore", value: 11 },
                      { label: "Japonya", value: 8 },
                      { label: "İtalya", value: 5 },
                      { label: "Almanya", value: 4 },
                      { label: "Fransa", value: 2 },
                      { label: "İspanya", value: 2 }
                    ].map((item, index) => {
                      const colors = [
                        "bg-slate-400",
                        "bg-blue-500",
                        "bg-blue-400",
                        "bg-indigo-400",
                        "bg-indigo-500",
                        "bg-purple-400",
                        "bg-purple-500",
                        "bg-pink-400",
                        "bg-pink-500"
                      ];
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <span className="text-sm font-medium text-slate-600">%{item.value}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full" style={{ height: '6px' }}>
                            <div className={`${colors[index]} rounded-full`} style={{ height: '6px', width: `${item.value}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-slate-600 mt-4 italic">
                    Türk öğrenciler bulunur ancak sınıflar uluslararası dengede oluşturulur.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Yaş Dağılımı</h3>
                  <div className="space-y-3">
                    {[
                      { label: "18-20", value: 12 },
                      { label: "21-25", value: 22 },
                      { label: "26-30", value: 18 },
                      { label: "31-40", value: 20 },
                      { label: "41+", value: 28 }
                    ].map((item, index) => {
                      const colors = [
                        "bg-blue-300",
                        "bg-blue-500",
                        "bg-indigo-400",
                        "bg-indigo-500",
                        "bg-blue-600"
                      ];
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <span className="text-sm font-medium text-slate-600">%{item.value}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full" style={{ height: '6px' }}>
                            <div className={`${colors[index]} rounded-full`} style={{ height: '6px', width: `${item.value}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-slate-600 mt-4 italic">
                    IELS Malta'da yetişkin öğrenci profili güçlüdür; özellikle uzun dönem ve kariyer odaklı programlarda daha olgun yaş grupları da yer alabilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kayıt Süreci Bölümü */}
        <section className="bg-slate-50 py-12" id="iels-malta-kayit">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              IELS Malta Dil Okulu Kayıt Süreci (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              IELS Malta kayıt süreci <strong>2026</strong> yılında ağırlıklı olarak <strong>online</strong> yürütülür; adayın program seçimi, planlanan süre ve kontenjan durumuna göre süreç adımları netleşir ve kayıt takvimi buna göre ilerler.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Program ve süre seçimi</h3>
                      <p className="text-slate-700">Kurs yoğunluğu ve hedefe göre en uygun program ile eğitim süresi belirlenir.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Online ön kayıt formu</h3>
                      <p className="text-slate-700">Temel bilgiler alınır ve tercih edilen tarih aralığı sisteme girilir.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Okuldan uygunluk ve fiyat onayı</h3>
                      <p className="text-slate-700">Kontenjan ve konaklama uygunluğu teyit edilir; 2026 güncel paket fiyatı paylaşılır.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Resmi kayıt ve ödeme</h3>
                      <p className="text-slate-700">Onay sonrası kayıt sözleşmesi tamamlanır ve ödeme adımları planlanır.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Vize ve seyahat hazırlığı</h3>
                      <p className="text-slate-700">Gerekli belgeler hazırlanır, seyahat planı ve başlangıç tarihi netleştirilir.</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 mt-6">
                  IELS Malta Dil Okulu kayıt süreci <strong>2026</strong> yılında <strong>online</strong> yürütülür; adımlar program türü ve eğitim süresine göre değişiklik gösterebilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kayıt Sürecinde ve Eğitim Boyunca Yanındayız</h3>
                <p className="text-slate-700 mb-6">
                  IELS Malta kayıt sürecinden eğitim bitimine kadar, öğrencilerimize rehberlik ve danışmanlık desteği sunuyoruz.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">7+ yıllık yurt dışı eğitim danışmanlığı deneyimi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Kayıt sürecinde şeffaf ve adım adım rehberlik</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Eğitim süresi boyunca Türkçe destek</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Vize ve resmi belgelerde yönlendirme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Malta'ya varış öncesi ve sonrası bilgilendirme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Öğrenci topluluğu ve iletişim desteği</span>
                  </li>
                </ul>
                <p className="text-slate-700 text-sm italic">
                  Amacımız satış yapmak değil; öğrencinin süreci net anlayarak, bilinçli karar vermesini sağlamaktır.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vize Bölümü */}
        <section className="bg-white py-12" id="iels-malta-vize">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              IELS Malta Dil Okulu ve Vize Durumu (2026)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Yeşil Pasaport Sahipleri İçin IELS Malta</h3>
                <p className="text-slate-700">
                  2026 yılında yeşil pasaport sahibi Türk vatandaşları, IELS Malta dil eğitimi programlarında 90 güne kadar vize başvurusu yapmadan Malta'da kalabilir. Bu süre, kısa dönem dil eğitimi planlayan öğrenciler için kayıt sürecini hızlandırır ve ek vize evrakı gerektirmez. Eğitim süresi 90 günü aştığında, yeşil pasaport sahipleri için de Malta öğrenci vizesi gerekliliği doğar ve başvuru süreci eğitim süresine göre planlanır.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bordo Pasaport Sahipleri İçin IELS Malta</h3>
                <p className="text-slate-700">
                  Bordo pasaport sahibi öğrenciler için IELS Malta dil eğitimi programlarında vize gerekliliği, seçilen eğitim süresine göre belirlenir. Kısa dönem ve uzun dönem programlarda başvuru süreçleri ve istenen belgeler farklılık gösterebilir. Kayıt aşamasında eğitim süresine uygun vize türü netleştirilir ve bordo pasaportlu öğrenciler için vize sürecinde bilgilendirme ve yönlendirme desteği sağlanır.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8">
              IELS Malta dil eğitimi programlarında vize şartları, pasaport türü ve eğitim süresine göre değişebilir; kayıt planlaması yapılırken güncel kurallar dikkate alınmalıdır. Malta öğrenci vizesi başvuru şartları, güncel evrak listesi ve süreç detaylarıyla ilgili kapsamlı bilgiye{' '}
              <Link href="/malta-ogrenci-vizesi" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Malta öğrenci vizesi rehberimizden
              </Link>{' '}
              ulaşabilirsin.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">IELS Malta Dil Okulu İçin Ücretsiz Vize Danışmanlığı (2026)</h3>
              <p className="text-slate-700 mb-4">
                IELS Malta Dil Okulu'na kayıt sürecinde vize, pasaport türü ve eğitim süresine göre değişkenlik gösterebilir. Bordo ve yeşil pasaport sahipleri için güncel vize gerekliliklerini, evrak sürecini ve doğru başvuru yolunu ücretsiz olarak değerlendiriyoruz.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">IELS Malta özelinde güncel vize bilgisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Bordo & yeşil pasaport için net yönlendirme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Kısa ve uzun dönem eğitim ayrımı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Ücretsiz ön değerlendirme</span>
                </li>
              </ul>
              <a
                href="tel:+905439632416"
                className="inline-block rounded-lg bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                IELS Malta Dil Okulu İçin Vize Bilgisi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Bölümü */}
        <section className="bg-white py-12" id="uygunluk">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              <strong>IELS Malta</strong> Kimler İçin Uygun / Kimler İçin Uygun Değil?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>✓</span>
                  IELS Malta Kimler İçin Uygun?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Malta'da uluslararası sınıf ortamında İngilizce pratiğini hızlandırmak isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Sliema'da merkezi konumda kalıp ders + sosyal yaşamı birlikte yaşamak isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Day's Inn / Tigne Suites / aile yanı gibi seçeneklerle bütçesini yönetebilenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">4–12 hafta gibi programlarda düzenli devam edip gelişimini takip etmek isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Ders dışında etkinliklerle konuşma pratiğini artırmayı hedefleyenler.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>⚠</span>
                  IELS Malta Kimler İçin Uygun Değil?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Malta'ya gidip sadece gezip, derslere düzenli katılmayacak olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Tek millet ağırlıklı sınıf bekleyenler (IELS'te uluslararası denge korunur).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">"En ucuz okul olsun" diyerek sadece fiyat odaklı karar verenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Kısa sürede mucize sonuç bekleyip pratik yapmaya zaman ayırmayanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Konaklama ve bütçe planı yapmadan gidip toplam maliyeti yönetmekte zorlanacak olanlar.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <section className="bg-slate-50 py-12" id="iels-malta-faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
                IELS Malta Dil Okulu Hakkında En Çok Sorulan Sorular (2026)
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                En çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
              </p>
            </div>
            
            <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 0 ? null : 0)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 0}
                  aria-controls="faq-answer-0"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta Dil Okulu 2026 fiyatları ne kadar?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 0 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 0 && (
                  <div
                    id="faq-answer-0"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      IELS Malta 2026 paket fiyatları; kurs süresi, konaklama tipi ve sezona göre değişir. En ekonomik paketler 4 haftada 1.402€ seviyesinden başlar; 24 haftalık paketlerde toplam maliyet seçilen konaklamaya göre 7.919€–11.954€ aralığına çıkabilir.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 1 ? null : 1)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 1}
                  aria-controls="faq-answer-1"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da yaş sınırı var mı?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 1 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 1 && (
                  <div
                    id="faq-answer-1"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      IELS Malta yetişkin öğrencilere uygun programlar sunar ve genellikle 16 yaş ve üzeri öğrenci kabul edilir. Dönemsel özel programlarda yaş kriterleri değişebilir.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 2 ? null : 2)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 2}
                  aria-controls="faq-answer-2"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da en uygun konaklama hangisi?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 2 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 2 && (
                  <div
                    id="faq-answer-2"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      En ekonomik seçenek genellikle Day's Inn Hotel 4 kişilik paylaşımlı konaklamadır. Daha az kişiyle konaklama, tek kişilik oda veya studio seçenekleri bütçeyi yükseltir.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 3 ? null : 3)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 3}
                  aria-controls="faq-answer-3"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta fiyatlarına yaz sezonu farkı uygulanır mı?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 3 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 3 && (
                  <div
                    id="faq-answer-3"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      Evet. 1 Haziran – 31 Ağustos 2026 tarihleri arasında haftalık 91€ yaz sezonu farkı uygulanır. Tigne Suites konaklamada 24 hafta ve üzeri kayıtlarda yaz sezonu farkı alınmaz.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 4 ? null : 4)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 4}
                  aria-controls="faq-answer-4"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da hangi İngilizce kursları var?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 4 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 4 && (
                  <div
                    id="faq-answer-4"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      IELS Malta'da Genel İngilizce, Yoğun İngilizce, İş İngilizcesi ve sınav hazırlık (IELTS/Cambridge) gibi farklı hedeflere uygun kurs seçenekleri bulunur.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 5 ? null : 5)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 5}
                  aria-controls="faq-answer-5"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da Türk öğrenci oranı ne kadar?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 5 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 5 && (
                  <div
                    id="faq-answer-5"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      IELS Malta'da Türkiye'den öğrenciler bulunur; ancak sınıflar uluslararası dengede oluşturulur. Bu sayede öğrenciler ders içinde ve dışında farklı milletlerle daha fazla İngilizce pratik yapar.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 6 ? null : 6)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 6}
                  aria-controls="faq-answer-6"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta sertifika veriyor mu?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 6 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 6 && (
                  <div
                    id="faq-answer-6"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      Evet. Kurs sonunda katılım ve seviye bilgilerini içeren başarı/katılım sertifikası verilir; bu belge eğitim sürecinizi resmi olarak belgelemenize yardımcı olur.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 7 ? null : 7)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 7}
                  aria-controls="faq-answer-7"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da konaklama nasıl ayarlanır?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 7 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 7 && (
                  <div
                    id="faq-answer-7"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      Konaklama; kayıt aşamasında okul aracılığıyla veya danışmanlık desteğiyle rezerve edilebilir. Day's Inn, Tigne Suites ve aile yanı gibi seçeneklerde müsaitlik ve tarih aralığı belirleyicidir.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 8 ? null : 8)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 8}
                  aria-controls="faq-answer-8"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da sosyal aktiviteler var mı?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 8 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 8 && (
                  <div
                    id="faq-answer-8"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      Evet. Okulun dönemsel sosyal programında şehir turları, kültürel geziler ve sezonluk deniz aktiviteleri gibi etkinlikler bulunabilir; bu etkinlikler İngilizce pratiğini hızlandırır.
                    </p>
                  </div>
                )}
              </div>

              <div
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setAcikIndex(acikIndex === 9 ? null : 9)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={acikIndex === 9}
                  aria-controls="faq-answer-9"
                >
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">IELS Malta'da kaç hafta eğitim almak mantıklı?</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      acikIndex === 9 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {acikIndex === 9 && (
                  <div
                    id="faq-answer-9"
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">
                      Hedefe göre değişir: 4 hafta Malta deneyimi ve pratik için iyi bir başlangıçtır; 8–12 hafta konuşma akıcılığı için daha dengelidir; 24 hafta ve üzeri programlar ise daha belirgin seviye ilerlemesi sağlar.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bu İçerik Nasıl Hazırlandı? */}
        <section className="bg-slate-50/50 border-b border-slate-200 py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Bu İçerik Nasıl Hazırlandı?
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Bu sayfadaki bilgiler; <strong>IELS Malta Dil Okulu</strong>'nun resmi kaynakları, <strong>2026 güncel fiyat listeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak hazırlanmış ve düzenli olarak güncellenmektedir.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Son güncelleme:{' '}
                <time dateTime={dateModified} className="font-medium text-slate-900">
                  {lastUpdated || new Date().toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </p>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:bg-orange-600"
            aria-label="Sayfa başına dön"
          >
            <span className="text-2xl">↑</span>
          </button>
        )}
      </main>
    </>
  );
}
