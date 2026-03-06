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
    '4 Hafta': '4',
    '6 Hafta': '6',
    '8 Hafta': '8',
    '12 Hafta': '12',
    '15 Hafta': '15',
    '16 Hafta': '16',
    '24 Hafta': '24',
  };

  const priceData: Record<string, Record<string, string>> = {
    'Ekonomi Apt.': {
      '4': '2105€',
      '6': '2195€',
      '8': '2885€',
      '12': '4265€',
      '15': '5300€',
      '16': '5645€',
      '24': '8405€',
    },
    'Superior Apt.': {
      '4': '2365€',
      '6': '2435€',
      '8': '3205€',
      '12': '4745€',
      '15': '5900€',
      '16': '6285€',
      '24': '9365€',
    },
    'Superior Plus Apt.': {
      '4': '2585€',
      '6': '2915€',
      '8': '3845€',
      '12': '5704€',
      '15': '7100€',
      '16': '7565€',
      '24': '11285€',
    },
    'GE30 Ekonomi Apt.': {
      '4': '2505€',
      '6': '2795€',
      '8': '3685€',
      '12': '5465€',
      '15': '6800€',
      '16': '7245€',
      '24': '10805€',
    },
    'GE30 Superior Apt.': {
      '4': '2665€',
      '6': '3035€',
      '8': '4005€',
      '12': '4945€',
      '15': '7400€',
      '16': '7885€',
      '24': '11765€',
    },
    'GE30 Superior Plus Apt.': {
      '4': '2985€',
      '6': '3515€',
      '8': '4645€',
      '12': '6905€',
      '15': '8600€',
      '16': '9165€',
      '24': '13685€',
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
            <option>4 Hafta</option>
            <option>6 Hafta</option>
            <option>8 Hafta</option>
            <option>12 Hafta</option>
            <option>15 Hafta</option>
            <option>16 Hafta</option>
            <option>24 Hafta</option>
          </select>
        </div>
        <div>
          <label htmlFor="calc-accommodation" className="block text-sm font-medium text-slate-700 mb-2">
            Konaklama & Program
          </label>
          <select
            id="calc-accommodation"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Seçiniz</option>
            <option>Ekonomi Apt.</option>
            <option>Superior Apt.</option>
            <option>Superior Plus Apt.</option>
            <option>GE30 Ekonomi Apt.</option>
            <option>GE30 Superior Apt.</option>
            <option>GE30 Superior Plus Apt.</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-2 text-white font-semibold hover:from-blue-700 hover:to-orange-600 transition-colors"
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

export default function ESEMaltaPage() {
  const school = getSchoolBySlug('ese-malta');
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
    const baseMessage = 'Merhaba, ESE Malta hakkında bilgi almak istiyorum.';
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta',
        name: 'ESE Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'ESE Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması. AI Overview uyumlu hızlı yanıtlar.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#article',
        headline: 'ESE Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'ESE Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/ese-malta-dil-okulu.webp',
            width: 1200,
            height: 630,
            name: 'ESE Malta Dil Okulu 2026',
            caption: 'ESE Malta Dil Okulu - St. Julian\'s bölgesinde İngilizce eğitimi',
            description: 'ESE Malta Dil Okulu 2026: St. Julian\'s merkezi konum, modern kampüs, uluslararası öğrenci yapısı ve akreditasyonlu eğitim programları',
          },
        ],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '.speakable-ec-fiyatlar',
            '.speakable-ec-programlar',
            '.speakable-ec-konaklama',
          ],
          xpath: [],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#breadcrumb',
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
            name: 'ESE Malta',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta',
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
          latitude: school.region === "St. Julian's" ? 35.9214 : school.region === "Sliema" ? 35.9128 : 35.9069,
          longitude: school.region === "St. Julian's" ? 14.4889 : school.region === "Sliema" ? 14.5022 : 14.4786,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Malta',
          identifier: 'MT',
        },
        parentOrganization: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
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
        '@type': 'VideoObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#video',
        name: 'ESE Malta Öğrenci Deneyimi (2026)',
        description: 'ESE Malta Dil Okulu\'nda eğitim alan öğrencilerin tipik bir gününü yansıtan video. Derslerin işleyişi, sınıf içi iletişim ve okulun uluslararası öğrenci ortamı.',
        thumbnailUrl: 'https://img.youtube.com/vi/C3Ujs_fF2ic/maxresdefault.jpg',
        uploadDate: '2026-01-01',
        contentUrl: 'https://www.youtube.com/watch?v=C3Ujs_fF2ic',
        embedUrl: 'https://www.youtube.com/embed/C3Ujs_fF2ic',
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'ESE Malta 2026 fiyatları ne kadar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ESE Malta fiyatı kurs türüne ve hafta sayısına göre değişir. Genel İngilizce programı €250/hafta\'dan başlar; konaklama eklenirse toplam bütçe seçilen oda tipine göre yükselir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta\'da yaş sınırı var mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ESE\'de programlara göre yaş aralığı değişir: Teen & Junior 9–17 yaş, yetişkin programları ise 17+ yaş grubuna uygundur.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta kursları hangi gün başlıyor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Genel İngilizce kursları her Pazartesi başlar. Bu yüzden en kolay başlangıç tarihi Pazartesi olacak şekilde planlanır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta\'da haftada kaç ders var?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'İki ana seçenek var: GE20 (20 ders / 15 saat) ve GE30 (30 ders / 22,5 saat). Daha hızlı gelişim için GE30 tercih edilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta sınıflar kaç kişilik?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sınıflar maksimum 12 kişilik. Bu da konuşma pratiği ve öğretmen ilgisini artırır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta\'da seviye tespit testi nasıl yapılıyor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Okula başlamadan önce online seviye testi çözülür. Test 60 sorudan oluşur ve 45 dakika sürer; süre bitince otomatik kapanır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta havaalanı transferi var mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. ESE Malta 7/24 havaalanı transferi sağlar. Uçuş bilgilerini önceden paylaşıp transferi planlamak yeterlidir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta\'da depozito alınıyor mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Check-in sırasında €100 depozito alınır (nakit). Konaklama sonunda hasar yoksa geri verilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta dersler sabah mı öğlen mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ders saatleri sabit değildir. Seviye ve sınıf planına göre sabah veya öğlen grubu çıkabilir; saatler kayıt sonrası yerleştirme ile netleşir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ESE Malta kurs bitince sertifika veriyor mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Kurs bitince katılım/bitirme sertifikası verilir; sertifikada kurs süresi ve seviye bilgisi yer alır.',
            },
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/ese-malta-dil-okulu.webp',
        width: 1200,
        height: 630,
        name: 'ESE Malta Dil Okulu 2026',
        caption: 'ESE Malta Dil Okulu - St. Julian\'s bölgesinde İngilizce eğitimi',
        description: 'ESE Malta Dil Okulu 2026: St. Julian\'s merkezi konum, modern kampüs, uluslararası öğrenci yapısı ve akreditasyonlu eğitim programları',
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#fiyat-tablosu',
        name: 'ESE Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)',
        description: 'ESE Malta Dil Okulu 2026 yılı için konaklama dahil paket fiyatları tablosu',
        about: 'ESE Malta fiyatları, eğitim süresi ve konaklama tipine göre değişen 2026 paket fiyatları',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ese-malta/#konaklama-listesi',
        name: 'ESE Malta Konaklama Türleri',
        description: 'ESE Malta Dil Okulu konaklama seçenekleri: öğrenci apartmanı, aile yanı, residence',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Öğrenci Apt. (2 Kişi)',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Öğrenci Apt. (1 kişi)',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Aile Yanı (2 kişi)',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'EC Studio Daire',
          },
        ],
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
                  <strong>ESE Malta Dil Okulu</strong>: <strong>2026</strong> <strong>Fiyatları ve Programlar</strong>
                </h1>
                <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed" itemProp="description">
                  <p>
                    <strong>ESE Malta Dil Okulu (2026)</strong>, Malta'da <strong>İngilizce eğitimi</strong> planlayan öğrencilerin en çok araştırdığı okullardan biridir. <strong>St. Julian's bölgesindeki merkezi konumu</strong>, modern kampüs yapısı ve düzenli eğitim sistemiyle hem derslere odaklanmak hem de Malta'daki öğrenci hayatını yaşamak isteyenler için iyi bir seçenektir.
                  </p>
                  <p>
                    <strong>ESE Malta'da sınıflar</strong> uluslararası bir öğrenci yapısına sahiptir; bu da <strong>İngilizce pratiğini</strong> sadece derslerde değil gün içinde doğal şekilde artırmaya yardımcı olur. Okulun <strong>akreditasyonlara sahip olması</strong> ve eğitim standardının belli bir seviyede ilerlemesi, Türkiye'den giden öğrencilerin "güvenilir bir okul mu?" sorusuna da net bir karşılık verir. Bu sayfada <strong>ESE Malta'nın programlarını</strong> ve okul yapısını <strong>2026 dönemi</strong> için güncel haliyle inceleyebilirsin.
                  </p>
                </div>
                <div className="text-sm text-slate-600 mt-6">
                  Son kontrol: <time dateTime={lastUpdated} className="font-semibold">{lastUpdated}</time> • fiyatları ve program bilgileri
                  günceldir.
                </div>
              </div>

              {/* Sağ Kolon - Form Card */}
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-blue-500">
                {/* Logo */}
                <div className="text-center mb-6">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/ese-malta.png"
                    alt="ESE Malta dil okulu logosu"
                    width={200}
                    height={80}
                    className="mx-auto object-contain"
                    priority
                  />
                  <div className="mt-4 border-t-2 border-blue-500"></div>
                </div>

                {/* Form Başlık ve Açıklama */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
                  ESE Malta 2026 Fiyat ve Program Bilgi Formu
                </h2>
                <p className="text-center mb-6 text-slate-700 text-sm">
                  ESE Malta Dil Okulu'nun 2026 yılına ait güncel fiyatlarını, program türlerini ve toplam maliyet detaylarını öğrenin.
                </p>

                {/* Form Inputs */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-lg border-2 border-blue-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-900 mb-2">
                      Cep Telefon Numarası
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full rounded-lg border-2 border-blue-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20ESE%20Malta%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-3 text-center text-base font-bold text-white transition hover:from-blue-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  >
                    ESE Malta 2026 Fiyatlarını Göster
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
                    ESE Malta Bilgileri
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#ese-malta-fiyatlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          1
                        </span>
                        <span className="leading-relaxed">ESE Malta Dil Okulu 2026 Güncel Fiyatları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ese-malta-programlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          2
                        </span>
                        <span className="leading-relaxed">ESE Malta Dil Okulu Programları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ese-malta-konaklama"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          3
                        </span>
                        <span className="leading-relaxed">ESE Malta Konaklama Türleri</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ese-malta-aktiviteler"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          4
                        </span>
                        <span className="leading-relaxed">ESE Malta Sosyal Aktiviteleri</span>
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
                        href="#ese-malta-deneyim"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          5
                        </span>
                        <span className="leading-relaxed">ESE Malta'da Bir Öğrencinin Günü</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ese-malta-kayit"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          6
                        </span>
                        <span className="leading-relaxed">ESE Malta Dil Okulu Kayıt Süreci</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ese-malta-vize"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          7
                        </span>
                        <span className="leading-relaxed">ESE Malta Dil Okulu ve Vize Durumu</span>
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
                        <span className="leading-relaxed">ESE Malta Kimler İçin Uygun / Uygun Değil?</span>
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
                        href="#ese-malta-faq"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          9
                        </span>
                        <span className="leading-relaxed">ESE Malta Dil Okulu Hakkında En Çok Sorulan Sorular</span>
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
                  src="/malta-dil-okullari/ese-malta/ese-malta-dil-okulu.webp"
                  alt="ESE Malta Dil Okulu 2026 - St. Julian's bölgesinde İngilizce eğitimi, kampüs, sınıf ortamı, programlar ve fiyatlar"
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
                ESE Malta Dil Okulu 2026 - St. Julian's bölgesinde İngilizce eğitimi, kampüs, sınıf ortamı, programlar ve fiyatlar
              </figcaption>
              <meta itemProp="name" content="ESE Malta Dil Okulu 2026" />
              <meta itemProp="description" content="ESE Malta Dil Okulu 2026: St. Julian's merkezi konum, modern kampüs, uluslararası öğrenci yapısı, akreditasyonlu eğitim programları, güncel fiyatlar ve öğrenci deneyimi" />
            </figure>
          </div>
        </section>

        {/* Fiyatlar Bölümü */}
        <section className="bg-white py-12" id="ese-malta-fiyatlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ESE Malta 2026 Güncel Fiyatları (Konaklama Tiplerine Göre)
            </h2>
            
            {/* H2 Alt Açıklama Paragrafı (Snippet Odaklı) */}
            <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-4 speakable-ec-fiyatlar">
              <p>
                <strong>ESE Malta fiyatları 2026</strong> yılında eğitim süresi, program yoğunluğu ve konaklama tipine göre değişir; <strong>4–24 hafta</strong> arası programlar için <strong>konaklama dahil</strong> tahmini <strong>paket maliyetleri</strong> aşağıdaki tabloda yer alır.
              </p>
              <p>
                Bu sayfa <strong>ESE Malta paket fiyatlarını</strong> anlatır; tablodaki tutarlar kurs + konaklama ve zorunlu ücretlerin toplamını yansıtır ve <strong>2026 eğitim dönemi</strong> için geçerlidir.
              </p>
              <p>
                <strong>ESE Malta fiyatları</strong> konaklama tipine ve seçilen programa göre değişir; en düşük tahmini paket maliyeti <strong>4 haftalık Ekonomi Apartman</strong> seçeneğinde <strong>2.105€</strong> olarak görülür.
              </p>
              <p>
                Program süresi uzadıkça toplam maliyet artar; <strong>24 haftalık</strong> programlarda toplam maliyet <strong>8.405€</strong> ile <strong>13.685€</strong> arasında değişir.
              </p>
            </div>

            {/* Hızlı Cevap / Özet Satırı (Snippet Boost) */}
            <p className="text-base md:text-lg font-semibold text-slate-900 mb-8 bg-blue-50 border-l-4 border-blue-500 pl-4 py-2">
              Kısaca: <strong>2026</strong> yılı için <strong>ESE Malta fiyatları</strong>, en düşük <strong>2.105€</strong> ile başlar; süre, program yoğunluğu (GE30) ve konaklama tipine göre değişen tahmini paket maliyetleri aşağıdaki tabloda yer alır.
            </p>
            
            {/* Fiyat Tablosu */}
            <div className="mb-6">
              <div className="overflow-x-auto relative" role="region" aria-label="ESE Malta fiyat tablosu">
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full pointer-events-none hidden md:block z-10" aria-hidden="true"></div>
                <div className="md:hidden text-xs text-slate-500 mb-2 text-center bg-blue-50 border border-blue-100 rounded px-2 py-1">
                  ← → Kaydırarak tüm sütunları görebilirsin
                </div>
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm min-w-[800px]" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">ESE Malta fiyatları 2026 - Konaklama dahil paket fiyatları tablosu</caption>
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
                    <tr className="border-b border-slate-100 hover:bg-blue-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Ekonomi Apt.</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700 font-semibold">2105€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2195€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2885€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4265€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5300€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5645€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">8405€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-blue-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Superior Apt.</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2365€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2435€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3205€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4745€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5900€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6285€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">9365€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-blue-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Superior Plus Apt.</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2585€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2915€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3845€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5704€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7100€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7565€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">11285€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-orange-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">GE30 Ekonomi Apt.</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2505€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2795€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3685€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5465€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6800€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7245€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">10805€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-orange-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">GE30 Superior Apt.</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2665€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3035€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4005€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4945€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7400€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7885€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">11765€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-orange-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">GE30 Superior Plus Apt.</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2985€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3515€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4645€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">6905€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">8600€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">9165€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">13685€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablo Altı Mikro Açıklama */}
            <p className="text-sm text-slate-600 mb-8 text-center">
              <strong>ESE Malta fiyatları</strong> <strong>2026</strong> yılı için geçerlidir; en düşük fiyat <strong>4 haftalık Ekonomi Apartman</strong> seçeneğinde <strong>2.105€</strong> olarak görülür. Tablodaki tutarlar tahmini paket fiyatıdır; okul, konaklama ve zorunlu ücretler dahildir.
            </p>

            {/* Fiyat Hesaplama */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                ESE Malta için Tahmini Paket Fiyatını Hesapla (2026)
              </h3>
              <p className="text-base text-slate-700 mb-6">
                Hesaplama, yukarıdaki tablodaki <strong>ESE Malta paket fiyatlarını</strong> esas alır; tahmini toplam maliyet gösterilir.
              </p>
              <PriceCalculator />
            </div>

            {/* Internal Link */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-base text-slate-700">
                ESE Malta dışındaki okulların fiyatlarını da incelemek istersen, detaylı karşılaştırma için{' '}
                <Link href="/malta-dil-okulu-fiyatlari" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline">
                  Malta Dil Okulu Fiyatları
                </Link>{' '}
                sayfamıza göz atabilirsin.
              </p>
            </div>

            {/* Dahil Olanlar */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ESE Malta Her Şey Dahil Paket Fiyatlarına Neler Dahil?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Fiyata Dahil Olanlar</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    ESE Malta <strong>2026</strong> her şey dahil paket fiyatlarına aşağıdaki hizmetler dahildir:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-slate-700">İngilizce dil eğitimi (seçilen hafta sayısı boyunca)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-slate-700">Seçilen konaklama tipi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-slate-700">Okul kayıt ücreti</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span className="text-slate-700">Eğitim materyalleri</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ESE Malta Dil Okulu Fiyatı Hesaplamasında Dikkat Edilenler (2026)</h3>
              <p>
                <strong>ESE Malta 2026</strong> paket fiyatları; eğitim süresi, program türü ve konaklama tercihine göre değişebilir. Aşağıdaki maddeler, toplam bütçeyi hesaplarken en çok fark yaratan kalemleri net şekilde özetler.
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>
                  <strong>15 hafta ve üzeri</strong> eğitimlerde, kampanya kapsamında İstanbul–Malta gidiş–dönüş uçak bileti sunulmaktadır.
                </li>
                <li>
                  <strong>8 hafta ve üzeri</strong> programlarda, uzun dönem indirimli paket fiyatlar geçerlidir.
                </li>
                <li>
                  Konaklamalar için haftalık <strong>25€</strong> hizmet bedeli faturalandırılır.
                </li>
                <li>
                  <strong>28 Haziran – 30 Ağustos</strong> tarihleri arasında, seçilen konaklama türüne göre haftalık <strong>70€</strong> yaz sezonu farkı uygulanır.
                </li>
                <li>
                  Tek kişilik oda tercihlerinde haftalık <strong>170€</strong> fiyat farkı bulunur.
                </li>
                <li>
                  Okul kayıt aşamasında; <strong>50€</strong> kayıt, <strong>30€</strong> kitap, <strong>30€</strong> konaklama yerleştirme olmak üzere toplam <strong>110€</strong> ek masraf oluşur.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Programlar Bölümü */}
        <section className="bg-slate-50 py-12" id="ese-malta-programlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ESE Malta Dil Okulu Programları (Hangisi Sana Uygun?)
            </h2>
            <div className="speakable-ec-programlar">
            
            {/* H2 Alt Açıklama Paragrafı */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              <strong>ESE Malta programları</strong> süre, ders yoğunluğu ve hedefe göre ayrılır; her program farklı öğrenci ihtiyaçlarına yöneliktir. Program seçimi, <strong>ESE Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Bu program türü, <strong>ESE Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>ESE Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  Bu program türü, <strong>ESE Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>ESE Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-dil-okulu-kampus.webp"
                  alt="ESE Malta dil okulu kampüsü ve sınıf ortamı - Programlara dahil olan hizmetler"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                  style={{ minHeight: '400px', maxHeight: '600px' }}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ESE Malta Dil Okulu Kampüs İmkânları</h3>
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
        <section className="bg-white py-12" id="ese-malta-konaklama">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ESE Malta Konaklama Türleri – Okula Uzaklık ve Konfor Karşılaştırması
            </h2>
            <div className="speakable-ec-konaklama">
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              <strong>ESE Malta'da konaklama seçenekleri</strong>; okula yakınlık, konfor seviyesi ve yaşam tarzına göre değişir. Aşağıdaki karşılaştırma, Türkiye'den gidecek öğrencilerin "hangi konaklama bana uygun?" sorusuna hızlı ve net cevap vermesi için hazırlanmıştır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Medvista Apartments */}
              <div className="bg-blue-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Medvista Apartments</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">Balluta Bay çevresi, St. Julian's hattı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">10–20 dk (yürüyüş/toplu taşıma).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Self-catering apartman; paylaşımlı yaşam, ortak mutfak ve ortak alanlar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Bütçeyi korurken sosyal ortamı kaybetmezsin; farklı milletlerle aynı ev düzeni günlük pratik için avantaj sağlar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Bütçe odaklı, bağımsız yaşam isteyen ve sosyal çevre kurmak isteyen öğrenciler.</span>
                  </div>
                </div>
              </div>
              
              {/* Springfields House */}
              <div className="bg-blue-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Springfields House</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">Daha sakin bir yerleşim bölgesi.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">10–25 dk (konuma göre değişir).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Aydınlık self-catering apartman; daha düzenli ev rutini.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">"Ev gibi" konaklama isteyen öğrenciler için sakin ve rahat bir seçenek.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Gürültü sevmeyen, daha sakin tempoda konaklama isteyen öğrenciler.</span>
                  </div>
                </div>
              </div>
              
              {/* Valley View */}
              <div className="bg-blue-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Valley View</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">Sakin bir bölgede, vadi manzaralı konum.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">10–30 dk (konuma göre değişir).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Self-catering apartman; paylaşımlı oda/ev düzeni.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Uzun dönemlerde bütçe yönetimini kolaylaştırır; sakin ortam ders odaklı öğrenciler için iyi olur.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Uzun dönem kalacak, bütçeyi net yönetmek isteyen öğrenciler.</span>
                    </div>
                  </div>
                </div>
              
              {/* Superior Apartments */}
              <div className="bg-orange-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Superior Apartments</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">St. Julian's – Sliema hattında merkezi bölgeler.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">10–25 dk.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Self-catering ama daha konforlu; daha iyi ortak alan standardı.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Konfor seviyesi yükselir; uzun süreli kalışlarda yaşam kalitesi belirgin şekilde artar.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Konfor isteyen ama otel yerine apartman düzenini tercih eden öğrenciler.</span>
                    </div>
                  </div>
                </div>
                
              {/* Superior Plus Apartments */}
              <div className="bg-orange-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Superior Plus Apartments</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">Okula ulaşımı kolay, daha iyi standartta apartmanlar.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">10–25 dk.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Daha sakin, daha düzenli, daha konforlu apartman deneyimi.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Özellikle uzun dönem gelen öğrenciler için daha rahat bir yaşam ve çalışma ortamı sağlar.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Konaklamada kaliteyi öncelikleyen, uzun dönem kalacak öğrenciler.</span>
                    </div>
                  </div>
                </div>
              
              {/* Number 11 */}
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Number 11 | Handwritten Collection</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">ESE okuluna komşu (next door).</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">0–2 dk.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Otel düzeni; daha rahat rutin ve hizmet standardı.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">En büyük avantajı "okula en yakın konaklama" olması; günlük düzen isteyenler için pratik.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Paylaşımlı yaşam istemeyen, konfor + lokasyon isteyen öğrenciler.</span>
                    </div>
                  </div>
                </div>
                
              {/* The George Hotel */}
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">The George Hotel</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">ESE okulunun karşısı, merkezi St. Julian's bölgesi.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">1–3 dk.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Şehir oteli; daha yüksek konfor.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Merkezi konum + otel konforu; yoğun tempoda okula yakın kalmak isteyenlere uygundur.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Konforu ve merkezi yaşamı önemseyen öğrenciler.</span>
                    </div>
                  </div>
                </div>
              
              {/* Host Family */}
              <div className="bg-blue-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Host Family</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">Ailelerin yaşadığı bölgeler; konum aileye göre değişir.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">20–45 dk (hat/konuma göre değişir).</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Ev ortamı; düzenli rutin, günlük iletişim.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Sınıf dışında İngilizceyi gerçek hayatta kullanma fırsatı sağlar; adaptasyonu kolaylaştırır.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">İlk kez yurtdışına çıkacak, daha sakin ve düzenli yaşam isteyen öğrenciler.</span>
                    </div>
                  </div>
                </div>
              
              {/* Residence */}
              <div className="bg-orange-50 rounded-lg p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Residence</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                      <span className="text-sm text-slate-600">Öğrenci yoğunluklu rezidans bölgeleri; sosyal alanlara yakın.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                      <span className="text-sm text-slate-600">10–30 dk (konuma göre değişir).</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                      <span className="text-sm text-slate-600">Sosyal ve hareketli; öğrenci ortamı, ortak alanlar.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                      <span className="text-sm text-slate-600">Hızlı arkadaş çevresi + sosyal pratik; Malta'ya hızlı adapte olmayı kolaylaştırır.</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                      <span className="text-sm text-slate-600">Sosyal ortam isteyen, öğrenci hayatını aktif yaşamak isteyen öğrenciler.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ESE Malta Konaklama Fiyatlarını Etkileyen Faktörler (2026)</h3>
              <p className="text-slate-700">
                <strong>2026 yılında ESE Malta konaklama fiyatları, yaz sezonunda artan talep nedeniyle haftalık bazda yükselebilir.</strong> Okula yakınlık ve oda tipi (tek kişilik, paylaşımlı veya özel banyolu) toplam maliyeti doğrudan etkiler. Uzun dönem konaklamalarda haftalık birim maliyet düşerken, kısa süreli programlarda sezon farkı daha belirgin hale gelir.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler Bölümü */}
        <section className="bg-slate-50 py-12" id="ese-malta-aktiviteler">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              ESE Malta Sosyal Aktiviteleri ve Öğrenci Deneyimi
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center leading-relaxed">
              <strong>ESE Malta'da</strong> öğrenciler için her hafta <strong>sosyal ve kültürel etkinlikler</strong> düzenlenir; amaç, <strong>İngilizceyi</strong> sınıf dışında da pratik etmek ve <strong>Malta'yı</strong> daha hızlı tanımaktır. <strong>ESE Malta sosyal aktiviteleri</strong> haftalık program halinde yayınlanır ve öğrenci topluluğu oluşturmayı hedefler.
            </p>
            
            {/* Aktiviteler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-hos-geldin-etkinligi-orientation.webp"
                  alt="ESE Malta hoş geldin etkinliği ve oryantasyon - St. Julian's dil okulu"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Hoş Geldin Etkinliği (Orientation)</h3>
                  <p className="text-slate-700 text-sm">İlk günlerde okul/şehir bilgilendirmesi, kampüs ve sınıf sistemi.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-haftalik-sosyal-program-etkinlikler.webp"
                  alt="ESE Malta haftalık sosyal program etkinlikleri - öğrenci aktiviteleri"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">ESE Sosyal Programı (Haftalık Etkinlik Akışı)</h3>
                  <p className="text-slate-700 text-sm">Her hafta Pazartesi yayınlanan sosyal etkinlik programı ve öğrenci topluluğu aktiviteleri.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-ingilizce-dil-etkinlikleri-atolyeler.webp"
                  alt="ESE Malta İngilizce dil etkinlikleri ve atölyeler - konuşma pratiği"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">İngilizce Dil Etkinlikleri ve Atölyeler</h3>
                  <p className="text-slate-700 text-sm">Konuşma kulübü, pratik ve workshoplar.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-sehir-turlari-kulturel-gezi-programlari.webp"
                  alt="ESE Malta şehir turları ve kültürel gezi programları - Valletta Mdina"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Şehir Turları ve Kültürel Gezi Programları</h3>
                  <p className="text-slate-700 text-sm">Valletta, Mdina vb. geziler ve pratik fırsatı.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-tekne-turlari-deniz-aktiviteleri.webp"
                  alt="ESE Malta tekne turları ve deniz aktiviteleri - Malta öğrenci etkinlikleri"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Tekne Turları ve Deniz Aktiviteleri</h3>
                  <p className="text-slate-700 text-sm">Sezon döneminde popüler sosyal etkinlikler.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/ese-malta/ese-malta-mezuniyet-kapanis-etkinligi.webp"
                  alt="ESE Malta mezuniyet ve kapanış etkinliği - sertifika töreni"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Mezuniyet / Kapanış Etkinliği</h3>
                  <p className="text-slate-700 text-sm">Program sonunda kapanış/mezuniyet etkinliği.</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-slate-600">
              <strong>ESE Malta'da</strong> sosyal aktiviteler ve etkinlik programı her hafta <strong>Pazartesi</strong> yayınlanır; bazı aktiviteler <strong>ücretsiz</strong>, bazıları <strong>ücretli</strong> olabilir (ulaşım, giriş bileti, tur bedeli gibi).
            </p>
          </div>
        </section>

        {/* Öğrenci Deneyimi Bölümü */}
        <section className="bg-white py-12" id="ese-malta-deneyim">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ESE Malta'da Bir Öğrencinin Günü – Gerçek Deneyim (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              ESE Malta'da 2026 yılı boyunca eğitim alan öğrenciler, sınıf içi İngilizce derslerini sosyal aktiviteler ve günlük yaşam pratiğiyle birleştirir. Aşağıdaki videoda, ESE Malta'da eğitim alan bir öğrencinin ders ortamını, okul atmosferini ve Malta'daki günlük öğrenci deneyimini gerçek haliyle izleyebilirsiniz.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/C3Ujs_fF2ic"
                    title="ESE Malta öğrenci deneyimi - St. Julian's dil okulu"
                    className="w-full h-full rounded-lg"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerçek Öğrenci Deneyimi – ESE Malta Dil Okulu</h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Bu video, ESE Malta Dil Okulu'nda eğitim alan bir öğrencinin tipik bir gününü yansıtmaktadır. Ders içeriği, sınıf ortamı ve okulun sosyal yapısı, öğrencilerin İngilizceyi yalnızca derslerde değil günlük yaşamda da aktif olarak kullanmasını hedefler.
                  </p>
                  <p>
                    ESE Malta'da öğrenciler, farklı milletlerden katılımcılarla uluslararası bir ortamda eğitim alır. 2026 yılı boyunca okulda düzenlenen sosyal ve kültürel aktiviteler, öğrencilerin hem Malta'yı tanımasına hem de İngilizce pratiğini hızlandırmasına katkı sağlar.
                  </p>
                  <p>
                    Bu deneyim, ESE Malta Dil Okulu'nun yalnızca akademik değil, aynı zamanda sosyal gelişimi de önemseyen eğitim yaklaşımını göstermektedir.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-12 italic">
              Not: Videoda yer alan deneyim, öğrencinin kişisel gözlemlerini yansıtmaktadır; program içeriği ve aktiviteler dönemsel olarak değişiklik gösterebilir.
            </p>
            
            {/* Türk Öğrenciler için Deneyim */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Türk Öğrenciler için ESE Malta Deneyimi (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                <strong>ESE Malta Dil Okulu'nda</strong> <strong>2026</strong> boyunca Türk öğrenciler de aktif olarak eğitim alır. Okul, sınıflarda tek millet yoğunluğunu azaltacak şekilde uluslararası dengeyi korumaya çalışır; bu da Türk öğrencilerin <strong>İngilizce pratiğini</strong> yalnızca derste değil, okul ortamında ve sosyal hayatta da sürdürmesini kolaylaştırır.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler Ne Beklemeli?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">ESE Malta'da Türk öğrenciler bulunur; ancak sınıflar uluslararası denge gözetilerek oluşturulur.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">St. Julian's bölgesi hareketlidir; okul çevresi kafe, sahil ve sosyal alanlara yakın olduğu için ders sonrası pratik yapmak kolaydır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">İlk hafta oryantasyon ve seviye belirleme ile düzen hızlı oturur; özellikle yeni başlayanlar için adaptasyon süreci rahattır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Sosyal programlar sayesinde farklı milletlerden arkadaş edinmek hızlıdır; bu da konuşma pratiğini doğal şekilde artırır.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler için Avantajlar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Uluslararası sınıf ortamı sayesinde İngilizceyi aktif kullanma zorunluluğu oluşur (Türkçe'ye kaçma azalır).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Okulun St. Julian's konumu, ders sonrası sosyal hayata karışmayı kolaylaştırır; pratik hayatın içinde devam eder.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">ESE'nin sosyal aktiviteleri ve öğrenci topluluğu sayesinde hızlı arkadaş çevresi oluşur.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Uzun dönem programlarda, aynı çevreyle daha uzun süre vakit geçirildiği için kalıcı arkadaşlık + daha düzenli pratik sağlanır.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 italic">
                Not: ESE Malta'da sınıf dağılımları, öğrencilerin milliyetlerine göre değil seviyelerine ve program türlerine göre yapılır.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">ESE Malta Dil Okulu – Türkiye Resmi Temsilcisi</h3>
                <p className="text-slate-700 mb-4">
                  ESE Malta Dil Okulu'nun Türkiye resmi temsilcisi olarak, 2026 yılı boyunca kayıt, fiyatlandırma, konaklama ve vize süreçlerinde öğrencilere birebir destek sağlıyoruz. Tüm bilgiler güncel ESE Malta programları ve resmi fiyatlar üzerinden paylaşılır.
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
                ESE Malta Dil Okulu Öğrenci Profili (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                <strong>ESE Malta Dil Okulu'nda</strong> farklı ülkelerden ve yaş gruplarından öğrenciler eğitim alır. Okulun <strong>Avrupa ağırlıklı</strong> öğrenci yapısı, <strong>uluslararası sınıf ortamı</strong> oluşturur ve Türk öğrenciler için <strong>İngilizce pratiği</strong> açısından avantajlı bir deneyim sunar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Nationality Mix (Ülke Dağılımı)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Türk Öğrenci Oranı</span>
                      <span className="text-sm font-bold text-orange-600">%6</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-[6%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">İtalya</span>
                      <span className="text-sm font-medium text-slate-600">%22</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-[22%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Almanya</span>
                      <span className="text-sm font-medium text-slate-600">%18</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full w-[18%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Fransa</span>
                      <span className="text-sm font-medium text-slate-600">%15</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full w-[15%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">İspanya</span>
                      <span className="text-sm font-medium text-slate-600">%12</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-[12%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Polonya</span>
                      <span className="text-sm font-medium text-slate-600">%9</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pink-400 h-2 rounded-full w-[9%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Çek Cumhuriyeti</span>
                      <span className="text-sm font-medium text-slate-600">%8</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-cyan-400 h-2 rounded-full w-[8%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Diğer</span>
                      <span className="text-sm font-medium text-slate-600">%10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full w-[10%]"></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 italic">
                    <strong>ESE Malta'da</strong> <strong>Avrupa ağırlıklı</strong> öğrenci yapısı bulunur; Türk öğrenciler bulunur ancak sınıflar <strong>uluslararası dengede</strong> oluşturulur.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Yaş Dağılımı</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">18-20</span>
                      <span className="text-sm font-medium text-slate-600">%28</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pink-300 h-2 rounded-full w-[28%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">21-25</span>
                      <span className="text-sm font-medium text-slate-600">%38</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-300 h-2 rounded-full w-[38%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">26-30</span>
                      <span className="text-sm font-medium text-slate-600">%18</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-300 h-2 rounded-full w-[18%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">31-40</span>
                      <span className="text-sm font-medium text-slate-600">%12</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-300 h-2 rounded-full w-[12%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">41+</span>
                      <span className="text-sm font-medium text-slate-600">%4</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full w-[4%]"></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-4">
                    <strong>ESE Malta'da</strong> öğrencilerin büyük bölümü <strong>18–30 yaş aralığında</strong>dır; okul <strong>genç ağırlıklı</strong> bir öğrenci profiline sahiptir ve sosyal aktiviteler bu yaş grubuna uygun şekilde düzenlenir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kayıt Süreci Bölümü */}
        <section className="bg-slate-50 py-12" id="ese-malta-kayit">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ESE Malta Dil Okulu Kayıt Süreci (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              ESE Malta kayıt süreci <strong>2026</strong> yılında ağırlıklı olarak <strong>online</strong> yürütülür; adayın program seçimi, planlanan süre ve kontenjan durumuna göre süreç adımları netleşir ve kayıt takvimi buna göre ilerler.
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
                  ESE Malta Dil Okulu kayıt süreci <strong>2026</strong> yılında <strong>online</strong> yürütülür; adımlar program türü ve eğitim süresine göre değişiklik gösterebilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kayıt Sürecinde ve Eğitim Boyunca Yanındayız</h3>
                <p className="text-slate-700 mb-6">
                  ESE Malta kayıt sürecinden eğitim bitimine kadar, öğrencilerimize rehberlik ve danışmanlık desteği sunuyoruz.
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
        <section className="bg-white py-12" id="ese-malta-vize">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ESE Malta Dil Okulu ve Vize Durumu (2026)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Yeşil Pasaport Sahipleri İçin ESE Malta</h3>
                <p className="text-slate-700">
                  2026 yılında yeşil pasaport sahibi Türk vatandaşları, ESE Malta dil eğitimi programlarında 90 güne kadar vize başvurusu yapmadan Malta'da kalabilir. Bu süre, kısa dönem dil eğitimi planlayan öğrenciler için kayıt sürecini hızlandırır ve ek vize evrakı gerektirmez. Eğitim süresi 90 günü aştığında, yeşil pasaport sahipleri için de Malta öğrenci vizesi gerekliliği doğar ve başvuru süreci eğitim süresine göre planlanır.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bordo Pasaport Sahipleri İçin ESE Malta</h3>
                <p className="text-slate-700">
                  Bordo pasaport sahibi öğrenciler için ESE Malta dil eğitimi programlarında vize gerekliliği, seçilen eğitim süresine göre belirlenir. Kısa dönem ve uzun dönem programlarda başvuru süreçleri ve istenen belgeler farklılık gösterebilir. Kayıt aşamasında eğitim süresine uygun vize türü netleştirilir ve bordo pasaportlu öğrenciler için vize sürecinde bilgilendirme ve yönlendirme desteği sağlanır.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8">
              ESE Malta dil eğitimi programlarında vize şartları, pasaport türü ve eğitim süresine göre değişebilir; kayıt planlaması yapılırken güncel kurallar dikkate alınmalıdır. Malta öğrenci vizesi başvuru şartları, güncel evrak listesi ve süreç detaylarıyla ilgili kapsamlı bilgiye{' '}
              <Link href="/malta-ogrenci-vizesi" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Malta öğrenci vizesi rehberimizden
              </Link>{' '}
              ulaşabilirsin.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">ESE Malta Dil Okulu İçin Ücretsiz Vize Danışmanlığı (2026)</h3>
              <p className="text-slate-700 mb-4">
                ESE Malta Dil Okulu'na kayıt sürecinde vize, pasaport türü ve eğitim süresine göre değişkenlik gösterebilir. Bordo ve yeşil pasaport sahipleri için güncel vize gerekliliklerini, evrak sürecini ve doğru başvuru yolunu ücretsiz olarak değerlendiriyoruz.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">ESE Malta özelinde güncel vize bilgisi</span>
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
                ESE Malta Dil Okulu İçin Vize Bilgisi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Bölümü */}
        <section className="bg-white py-12" id="uygunluk">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              <strong>ESE Malta</strong> Kimler İçin Uygun / Kimler İçin Uygun Değil?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>✅</span>
                  <strong>ESE Malta</strong> Kimler İçin Uygun?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span className="text-slate-700">Hedefi net olup (kariyer, sınav, akademik) programa düzenli devam edebilenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span className="text-slate-700">Yoğun ders temposunu ve ödev/tekrar rutinini yönetebilenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span className="text-slate-700">Sınıf dışında da İngilizce pratik yapmak isteyen; sosyal ortamı aktif kullanacak olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span className="text-slate-700">Uluslararası sınıf yapısında farklı kültürlerle iletişim kurmayı sevenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span className="text-slate-700">Toplam maliyeti (kurs + konaklama + yaşam) gerçekçi biçimde planlayanlar.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>⚠️</span>
                  <strong>ESE Malta</strong> Kimler İçin Uygun Değil?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Kısa sürede garanti sonuç veya "çok az çalışmayla hızlı akıcılık" bekleyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Yoğun programa zaman ayıramayan ya da düzenli devam edemeyecek olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Ders dışı pratikten kaçınıp sadece "derste öğreneyim yeter" yaklaşımında olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Kararını yalnızca en düşük fiyat üzerinden veren; kalite/konum/yoğunluğu önemsemeyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">•</span>
                    <span className="text-slate-700">Sosyal ortama uyumlanmakta zorlanan, uluslararası ortamdan rahatsız olabilecek kişiler.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <section className="bg-slate-50 py-12" id="ese-malta-faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
                ESE Malta Dil Okulu Hakkında En Çok Sorulan Sorular (2026)
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Türkiye'den en çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
              </p>
            </div>
            
            <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
              {[
                {
                  question: 'ESE Malta 2026 fiyatları ne kadar?',
                  answer: 'ESE Malta fiyatı kurs türüne ve hafta sayısına göre değişir. Genel İngilizce programı €250/hafta\'dan başlar; konaklama eklenirse toplam bütçe seçilen oda tipine göre yükselir.',
                },
                {
                  question: 'ESE Malta\'da yaş sınırı var mı?',
                  answer: 'ESE\'de programlara göre yaş aralığı değişir: Teen & Junior 9–17 yaş, yetişkin programları ise 17+ yaş grubuna uygundur.',
                },
                {
                  question: 'ESE Malta kursları hangi gün başlıyor?',
                  answer: 'Genel İngilizce kursları her Pazartesi başlar. Bu yüzden en kolay başlangıç tarihi Pazartesi olacak şekilde planlanır.',
                },
                {
                  question: 'ESE Malta\'da haftada kaç ders var?',
                  answer: 'İki ana seçenek var: GE20 (20 ders / 15 saat) ve GE30 (30 ders / 22,5 saat). Daha hızlı gelişim için GE30 tercih edilir.',
                },
                {
                  question: 'ESE Malta sınıflar kaç kişilik?',
                  answer: 'Sınıflar maksimum 12 kişilik. Bu da konuşma pratiği ve öğretmen ilgisini artırır.',
                },
                {
                  question: 'ESE Malta\'da seviye tespit testi nasıl yapılıyor?',
                  answer: 'Okula başlamadan önce online seviye testi çözülür. Test 60 sorudan oluşur ve 45 dakika sürer; süre bitince otomatik kapanır.',
                },
                {
                  question: 'ESE Malta havaalanı transferi var mı?',
                  answer: 'Evet. ESE Malta 7/24 havaalanı transferi sağlar. Uçuş bilgilerini önceden paylaşıp transferi planlamak yeterlidir.',
                },
                {
                  question: 'ESE Malta\'da depozito alınıyor mu?',
                  answer: 'Evet. Check-in sırasında €100 depozito alınır (nakit). Konaklama sonunda hasar yoksa geri verilir.',
                },
                {
                  question: 'ESE Malta dersler sabah mı öğlen mi?',
                  answer: 'Ders saatleri sabit değildir. Seviye ve sınıf planına göre sabah veya öğlen grubu çıkabilir; saatler kayıt sonrası yerleştirme ile netleşir.',
                },
                {
                  question: 'ESE Malta kurs bitince sertifika veriyor mu?',
                  answer: 'Evet. Kurs bitince katılım/bitirme sertifikası verilir; sertifikada kurs süresi ve seviye bilgisi yer alır.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                    onClick={() => setAcikIndex(acikIndex === index ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                    aria-expanded={acikIndex === index}
                    aria-controls={`faq-answer-${index}`}
                >
                    <span className="font-semibold text-slate-900 pr-4" itemProp="name">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                        acikIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                  {acikIndex === index && (
                  <div
                      id={`faq-answer-${index}`}
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-700"
                    itemProp="acceptedAnswer"
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                      <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </div>
              ))}
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
                Bu sayfadaki bilgiler; <strong>ESE Malta Dil Okulu</strong>'nun resmi kaynakları, <strong>2026 güncel fiyat listeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak hazırlanmış ve düzenli olarak güncellenmektedir.
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
