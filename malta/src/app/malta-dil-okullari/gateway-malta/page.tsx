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
    'Gateway Residans (3 Kişi)': {
      '4': '1384€',
      '6': '2076€',
      '8': '2040€',
      '12': '3360€',
      '15': '4200€',
      '16': '4480€',
      '24': '6480€',
    },
    'Gateway Residans (2 Kişi)': {
      '4': '1460€',
      '6': '2196€',
      '8': '2200€',
      '12': '3600€',
      '15': '4500€',
      '16': '4800€',
      '24': '6960€',
    },
    'Gateway Residans (1 Kişi)': {
      '4': '2140€',
      '6': '3210€',
      '8': '3680€',
      '12': '5520€',
      '15': '6900€',
      '16': '7360€',
      '24': '10800€',
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
    <div className="border-4 border-green-500 rounded-2xl p-6 bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="calc-duration" className="block text-sm font-medium text-slate-700 mb-2">
            Süre
          </label>
          <select
            id="calc-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-lg border-2 border-green-400 px-4 py-2 text-slate-900 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/30"
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
            Konaklama
          </label>
          <select
            id="calc-accommodation"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="w-full rounded-lg border-2 border-green-400 px-4 py-2 text-slate-900 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/30"
          >
            <option value="">Seçiniz</option>
            <option>Gateway Residans (3 Kişi)</option>
            <option>Gateway Residans (2 Kişi)</option>
            <option>Gateway Residans (1 Kişi)</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-2 text-white font-semibold hover:from-green-700 hover:to-emerald-600 transition-colors shadow-md"
          >
            Hesapla
          </button>
        </div>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
          <p className="font-semibold text-green-900">{result}</p>
          <p className="text-sm text-green-700 mt-2">
            Bu tutar, yukarıdaki 2026 her şey dahil paket fiyat tablosu baz alınarak gösterilmektedir.
          </p>
        </div>
      )}
    </div>
  );
}

export default function GatewayMaltaPage() {
  const school = getSchoolBySlug('gateway-malta');
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
    const baseMessage = 'Merhaba, Gateway Malta hakkında bilgi almak istiyorum.';
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta',
        name: 'Gateway Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'Gateway Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması. AI Overview uyumlu hızlı yanıtlar.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#article',
        headline: 'Gateway Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'Gateway Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/Gateway-malta/gateway-malta-kampus-sinif-ortami.webp',
            width: 1200,
            height: 630,
            name: 'Gateway Malta Dil Okulu kampüs ve sınıf ortamı',
            caption: 'Gateway Malta Dil Okulu kampüs ve sınıf ortamı - San Ġwann bölgesinde İngilizce eğitimi',
            description: 'Gateway Malta Dil Okulu 2026: San Ġwann kampüsü, sınıf ortamı, 8 sınıf, kütüphane ve avlu/bahçe alanları',
          },
        ],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '.speakable-gateway-fiyatlar',
            '.speakable-gateway-programlar',
            '.speakable-gateway-konaklama',
          ],
          xpath: [],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#breadcrumb',
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
            name: 'Gateway Malta',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta',
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
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Gateway Malta fiyatları neye göre değişir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta fiyatları hafta sayısı + program yoğunluğu + konaklama tipi seçimine göre değişir. En büyük farkı konaklama belirler; süre uzadıkça toplam maliyet artar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Gateway Malta yaz sezonu farkı ne zaman uygulanır?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da yaz sezonu farkı 28 Haziran – 1 Ekim tarihleri arasında uygulanır. Bu dönemde kısa süreli programlarda haftalık sezon farkı eklenir.',
            },
          },
          {
            '@type': 'Question',
            name: "Gateway Malta'da konaklama seçimi bütçeyi nasıl etkiler?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da bütçeyi en çok etkileyen kalem konaklama tipidir. Rezidans, aile yanı ve apart seçenekleri toplam maliyeti doğrudan değiştirir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Gateway Malta tek kişilik oda farkı ne kadar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da tek kişilik oda farkı haftalık +125€\'dur. Bu fark, konaklama süresi boyunca haftalık olarak eklenir.',
            },
          },
          {
            '@type': 'Question',
            name: "Gateway Malta'da kaç hafta eğitim almak mantıklı?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da verimli sonuç için ideal süre 8–12 hafta arasıdır. 4 hafta başlangıç için uygundur; 12+ hafta kalıcı gelişim sağlar.',
            },
          },
          {
            '@type': 'Question',
            name: "Gateway Malta'da hangi programlar var?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da en çok tercih edilen programlar Genel İngilizce ve Yoğun İngilizce\'dir. Program seçimi hedefe göre yapılır (konuşma, hız, seviye ilerleme).',
            },
          },
          {
            '@type': 'Question',
            name: "Gateway Malta'da ders seviyesi nasıl belirleniyor?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da seviye, kayıt sonrası yapılan seviye tespit sınavı ile belirlenir. Sonuca göre öğrenci uygun sınıfa yerleştirilir.',
            },
          },
          {
            '@type': 'Question',
            name: "Gateway Malta'da sosyal aktiviteler ücretli mi?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta\'da sosyal aktivitelerin bir kısmı ücretsiz, bir kısmı ücretlidir. Haftalık aktivite planına göre gezi ve etkinlik ücretleri değişebilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Gateway Malta kayıt süreci nasıl işler?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gateway Malta kayıt süreci program seçimi → tarih → konaklama → ödeme → okul onayı şeklinde ilerler. Onay sonrası okul, resmi kayıt belgesini paylaşır.',
            },
          },
          {
            '@type': 'Question',
            name: "Gateway Malta'da çalışmak mümkün mü?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta\'da dil okulu öğrencileri için çalışma hakkı vize ve oturum şartlarına göre değişir. Başvuru öncesi güncel şartlar kontrol edilerek plan yapılmalıdır.',
            },
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/Gateway-malta/gateway-malta-kampus-sinif-ortami.webp',
        width: 1200,
        height: 630,
        name: 'Gateway Malta Dil Okulu kampüs ve sınıf ortamı',
        caption: 'Gateway Malta Dil Okulu kampüs ve sınıf ortamı - San Ġwann bölgesinde İngilizce eğitimi',
        description: 'Gateway Malta Dil Okulu 2026: San Ġwann kampüsü, sınıf ortamı, 8 sınıf, kütüphane ve avlu/bahçe alanları',
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#fiyat-tablosu',
        name: 'Gateway Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)',
        description: 'Gateway Malta Dil Okulu 2026 yılı için konaklama dahil paket fiyatları tablosu',
        about: 'Gateway Malta fiyatları, eğitim süresi ve konaklama tipine göre değişen 2026 paket fiyatları',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#konaklama-listesi',
        name: 'Gateway Malta Konaklama Türleri',
        description: 'Gateway Malta Dil Okulu konaklama seçenekleri: öğrenci rezidansı, aile yanı, apart',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Gateway Residans (3 Kişi)',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gateway Residans (2 Kişi)',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Gateway Residans (1 Kişi)',
          },
        ],
      },
      {
        '@type': 'VideoObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/gateway-malta/#video',
        name: 'Gateway Malta Öğrenci Deneyimi (2026)',
        description: 'Gateway Malta Dil Okulu\'nda eğitim alan öğrencilerin tipik bir gününü yansıtan video. Derslerin işleyişi, sınıf içi iletişim ve okulun uluslararası öğrenci ortamı.',
        thumbnailUrl: 'https://img.youtube.com/vi/icljvUay0C4/maxresdefault.jpg',
        uploadDate: '2026-01-01',
        contentUrl: 'https://www.youtube.com/watch?v=icljvUay0C4',
        embedUrl: 'https://www.youtube.com/embed/icljvUay0C4?start=31',
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
                  <strong>Gateway Malta Dil Okulu</strong>: <strong>2026</strong> <strong>Fiyatları ve Programlar</strong>
                </h1>
                <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed" itemProp="description">
                  <p>
                    <strong>Gateway Malta Dil Okulu</strong> (<strong>Gateway School of English – GSE</strong>) (<strong>2026</strong>), Malta'da İngilizce eğitimi planlayan öğrenciler için <strong>San Ġwann</strong> bölgesinde konumlanan, kampüs düzeniyle öne çıkan bir dil okuludur. <strong>San Ġwann</strong>; <strong>Sliema</strong> ve <strong>St. Julian's</strong> hattına yakın yapısı sayesinde öğrencilerin hem derslere düzenli devam etmesini hem de Malta'daki sosyal yaşama kolayca karışmasını sağlar. Okul binasında <strong>8 sınıf</strong>, öğrencilerin kullanabildiği <strong>kütüphane</strong> ve mola saatleri için <strong>avlu/bahçe alanı</strong> bulunur; sınıflarda <strong>interaktif tahta</strong> kullanımı da ders akışını daha pratik hale getirir.
                  </p>
                  <p>
                    Bu sayfada <strong>Gateway Malta 2026</strong> güncel fiyatlarını, <strong>Genel İngilizce</strong> ve <strong>Yoğun İngilizce</strong> gibi program seçeneklerini, kurs süresi uzadıkça toplam maliyetin nasıl değiştiğini ve konaklama tercihinin bütçeye etkisini net şekilde bulabilirsin. Ayrıca Türkiye'den giden öğrencilerin en çok sorduğu sorulara göre kaç hafta gitmeli, hangi program kime uygun ve toplam bütçe nasıl planlanır gibi konuları kısa ve anlaşılır şekilde özetledik.
                  </p>
                </div>
                <div className="text-sm text-slate-600 mt-6">
                  Son kontrol: <time dateTime={lastUpdated} className="font-semibold">{lastUpdated}</time> • fiyatları ve program bilgileri
                  günceldir.
                </div>
              </div>

              {/* Sağ Kolon - Form Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-green-500">
                {/* Logo */}
                <div className="text-center mb-4">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/gateway-malta.png"
                    alt="Gateway Malta dil okulu logosu"
                    width={200}
                    height={60}
                    className="mx-auto"
                    unoptimized
                  />
                  <div className="mt-4 border-t-2 border-green-500"></div>
                </div>

                {/* Form Başlık ve Açıklama */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
                  Gateway Malta 2026 Fiyat ve Program Bilgi Formu
                </h2>
                <p className="text-center mb-6 text-slate-700 text-sm">
                  Gateway Malta Dil Okulu'nun 2026 yılına ait güncel fiyatlarını, program türlerini ve toplam maliyet detaylarını öğrenin.
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
                      className="w-full rounded-lg border-2 border-green-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/30"
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
                      className="w-full rounded-lg border-2 border-green-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Gateway%20Malta%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
                  >
                    Gateway Malta 2026 Fiyatlarını Göster
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
                    Gateway Malta Bilgileri
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#gateway-malta-fiyatlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          1
                        </span>
                        <span className="leading-relaxed">Gateway Malta Dil Okulu 2026 Güncel Fiyatları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#gateway-malta-programlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          2
                        </span>
                        <span className="leading-relaxed">Gateway Malta Dil Okulu Programları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#gateway-malta-konaklama"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          3
                        </span>
                        <span className="leading-relaxed">Gateway Malta Konaklama Türleri</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#gateway-malta-aktiviteler"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          4
                        </span>
                        <span className="leading-relaxed">Gateway Malta Sosyal Aktiviteleri</span>
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
                        href="#gateway-malta-deneyim"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          5
                        </span>
                        <span className="leading-relaxed">Gateway Malta'da Bir Öğrencinin Günü</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#gateway-malta-kayit"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          6
                        </span>
                        <span className="leading-relaxed">Gateway Malta Dil Okulu Kayıt Süreci</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#gateway-malta-vize"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          7
                        </span>
                        <span className="leading-relaxed">Gateway Malta Dil Okulu ve Vize Durumu</span>
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
                        <span className="leading-relaxed">Gateway Malta Kimler İçin Uygun / Uygun Değil?</span>
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
                        href="#gateway-malta-faq"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          9
                        </span>
                        <span className="leading-relaxed">Gateway Malta Dil Okulu Hakkında En Çok Sorulan Sorular</span>
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
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-kampus-sinif-ortami.webp"
                  alt="Gateway Malta Dil Okulu kampüs ve sınıf ortamı - San Ġwann bölgesinde İngilizce eğitimi"
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
                Gateway Malta Dil Okulu kampüs ve sınıf ortamı - San Ġwann bölgesinde İngilizce eğitimi
              </figcaption>
              <meta itemProp="name" content="Gateway Malta Dil Okulu kampüs ve sınıf ortamı" />
              <meta itemProp="description" content="Gateway Malta Dil Okulu 2026: San Ġwann kampüsü, sınıf ortamı, 8 sınıf, kütüphane ve avlu/bahçe alanları" />
            </figure>
          </div>
        </section>

        {/* Fiyatlar Bölümü */}
        <section className="bg-white py-12" id="gateway-malta-fiyatlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Gateway Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)
            </h2>
            
            {/* H2 Alt Açıklama Paragrafı (Snippet Odaklı) */}
            <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-4 speakable-gateway-fiyatlar">
              <p>
                <strong>Gateway Malta fiyatları</strong>, seçilen konaklama türü ve eğitim süresine göre değişir; <strong>4–24 hafta</strong> arası programlar için konaklama dahil paket fiyatlar tabloda yer alır.
              </p>
              <p>
                Bu sayfa <strong>Gateway Malta paket fiyatlarını</strong> anlatır; tablodaki tutarlar <strong>kurs + konaklama</strong> toplamını yansıtır ve ilgili dönem için geçerlidir.
              </p>
              <p>
                <strong>Gateway Malta fiyatları</strong> konaklama tipine göre değişir; en düşük tahmini paket maliyeti <strong>4 haftalık Gateway Rezidans (3 kişi)</strong> seçeneğinde <strong>1.384 €</strong> olarak görülür.
              </p>
              <p>
                Fiyatlar eğitim süresi uzadıkça artar; <strong>24 haftalık</strong> programlarda toplam maliyet konaklamaya göre <strong>6.480 €</strong> ile <strong>10.800 €</strong> arasında değişir.
              </p>
            </div>

            {/* Hızlı Cevap / Özet Satırı (Snippet Boost) */}
            <p className="text-base md:text-lg font-semibold text-slate-900 mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 pl-4 py-2">
              Kısaca: <strong>Gateway Malta fiyatları</strong>, en düşük <strong>1.384 €</strong> ile başlar; süre ve konaklama tipine göre değişen tahmini paket maliyetleri aşağıdaki tabloda yer alır.
            </p>
            
            {/* Fiyat Tablosu */}
            <div className="mb-6">
              <div className="overflow-x-auto relative" role="region" aria-label="Gateway Malta fiyat tablosu">
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full pointer-events-none hidden md:block z-10" aria-hidden="true"></div>
                <div className="md:hidden text-xs text-slate-500 mb-2 text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded px-2 py-1">
                  ← → Kaydırarak tüm sütunları görebilirsin
                </div>
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm min-w-[800px]" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">Gateway Malta fiyatları 2026 - Konaklama dahil paket fiyatları tablosu</caption>
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
                    <tr className="border-b border-slate-100 hover:bg-green-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200"><strong>Gateway Residans (3 Kişi)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1384€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2076€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2040€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3360€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4200€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4480€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">6480€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-green-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200"><strong>Gateway Residans (2 Kişi)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1460€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2196€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2200€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3600€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4500€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4800€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">6960€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-green-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200"><strong>Gateway Residans (1 Kişi)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2140€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3210€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3680€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">5520€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">6900€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">7360€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">10800€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablo Altı Mikro Açıklama */}
            <p className="text-sm text-slate-600 mb-8 text-center">
              <strong>Gateway Malta fiyatları</strong> <strong>2026</strong> yılı için geçerlidir; en düşük fiyat <strong>4 haftalık Gateway Residans (3 kişi)</strong> seçeneğine aittir. Tablodaki tutarlar tahmini paket fiyatıdır; <strong>kurs + konaklama</strong> toplamını yansıtır ve ilgili dönem için geçerlidir.
            </p>

            {/* Fiyat Hesaplama */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Gateway Malta için Tahmini Paket Fiyatını Hesapla (2026)
              </h3>
              <p className="text-base text-slate-700 mb-6">
                Hesaplama, yukarıdaki tablodaki <strong>Gateway Malta paket fiyatlarını</strong> esas alır; tahmini toplam maliyet gösterilir.
              </p>
              <PriceCalculator />
            </div>

            {/* Internal Link */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-base text-slate-700">
                Gateway Malta dışındaki okulların fiyatlarını da incelemek istersen, detaylı karşılaştırma için{' '}
                <Link href="/malta-dil-okulu-fiyatlari" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline">
                  Malta Dil Okulu Fiyatları
                </Link>{' '}
                sayfamıza göz atabilirsin.
              </p>
            </div>

            {/* Dahil Olanlar */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Gateway Malta Her Şey Dahil Paket Fiyatlarına Neler Dahil?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Fiyata Dahil Olanlar</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    Gateway Malta <strong>2026</strong> her şey dahil paket fiyatlarına aşağıdaki hizmetler dahildir:
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Gateway Malta Dil Okulu Fiyatı Hesaplamasında Dikkat Edilenler (2026)</h3>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                <strong>Gateway Malta Dil Okulu</strong> paket fiyatları, eğitim süresi ve konaklama tipine göre belirlenir; fiyatlar <strong>4–24 hafta</strong> arası programlar için geçerlidir.
              </p>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                Paket ücretlerine <strong>kurs</strong>, <strong>konaklama</strong>, <strong>kayıt</strong> ve <strong>eğitim materyali</strong> ücretleri dahildir; ek hizmetler fiyatlara yansıtılmaz.
              </p>
              <ul className="space-y-3 text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span><strong>28 Haziran – 1 Ekim 2026</strong> tarihleri arasında haftalık <strong>60€</strong> yaz sezonu farkı uygulanır.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Tek kişilik oda tercihinde haftalık <strong>125€</strong> fiyat farkı bulunur.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span><strong>Gateway residans</strong> konaklamasında kalan öğrenciler için <strong>sabah kahvaltısı</strong> dâhildir.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Uzun dönem programlarda (<strong>8 hafta ve üzeri</strong>) paket fiyat avantajları uygulanır.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Programlar Bölümü */}
        <section className="bg-slate-50 py-12" id="gateway-malta-programlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Gateway Malta Dil Okulu Programları (Hangisi Sana Uygun?)
            </h2>
            <div className="speakable-gateway-programlar">
            
            {/* H2 Alt Açıklama Paragrafı */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              <strong>Gateway Malta programları</strong> süre, ders yoğunluğu ve hedefe göre ayrılır; her program farklı öğrenci ihtiyaçlarına yöneliktir. Program seçimi, <strong>Gateway Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Bu program türü, <strong>Gateway Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>Gateway Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  Bu program türü, <strong>Gateway Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>Gateway Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-dil-okulu-kampus-programlara-dahil-hizmetler.webp"
                  alt="Gateway Malta dil okulu kampüs ve programlara dahil hizmetler - San Ġwann"
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Gateway Malta Dil Okulu Kampüs İmkânları</h3>
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
        <section className="bg-white py-12" id="gateway-malta-konaklama">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Gateway Malta Konaklama Türleri – Okula Uzaklık ve Konfor Karşılaştırması
            </h2>
            <div className="speakable-gateway-konaklama">
            <p className="text-lg text-slate-700 mb-8">
              Gateway Malta'da sunulan konaklama seçenekleri; okula uzaklık, yaşam tarzı ve konfor beklentisine göre farklılık gösterir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Öğrenci Rezidansı */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b-2 border-green-300">Öğrenci Rezidansı (School Residence)</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Konum</span>
                    <span className="text-sm text-slate-700 leading-relaxed">San Ġwann'da okul binasıyla aynı kampüs içinde veya çok yakın çevrede.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-700 leading-relaxed">0–2 dk (ayrı binada ama kampüs içinde).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Yaşam tarzı</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Öğrenci yoğunluklu, kampüs içi/yanı yaşam; ortak alanlar ve sosyal etkileşim ağırlıklı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Avantaj</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Okula yürüyerek neredeyse anında ulaşılır; günlük ulaşım derdi yoktur.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Kimler için uygun?</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Okula maksimum yakınlığı ve kampüs yaşamını öncelikleyen öğrenciler.</span>
                  </div>
                </div>
              </div>

              {/* Host Family */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b-2 border-green-300">Host Family (Aile Yanı Konaklama)</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Konum</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Yerel ailelerin yaşadığı mahalleler; okul çevresine toplu taşıma ile bağlantılı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-700 leading-relaxed">15–30 dk (yürüyüş veya kısa otobüs).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Yaşam tarzı</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Ev ortamı; günlük İngilizce pratiğiyle birlikte aile düzeni.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Avantaj</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Günlük hayatta dil pratiği ve yerel yaşam akışı sağlar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Kimler için uygun?</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Kültürel deneyim ve ev konforu arayan öğrenciler.</span>
                  </div>
                </div>
              </div>

              {/* Shared & Independent Apartments */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b-2 border-green-300">Shared & Independent Apartments</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Konum</span>
                    <span className="text-sm text-slate-700 leading-relaxed">San Ġwann bölgesinde öğrenci apartmanları ve bağımsız daireler.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-700 leading-relaxed">5–20 dk (yürüyüş ağırlıklı).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Yaşam tarzı</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Self-catering (kendi yemeğini yapma) + paylaşımlı veya bağımsız yaşam.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Avantaj</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Daha özgür yaşam; farklı konaklama bütçesi seçenekleri.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 block mb-1.5">Kimler için uygun?</span>
                    <span className="text-sm text-slate-700 leading-relaxed">Bağımsızlığını korumak isteyen ve sosyal ortamı dengeli kullanmak isteyen öğrenciler.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Gateway Malta Konaklama Fiyatlarını Etkileyen Faktörler (2026)</h3>
              <p className="text-slate-700">
                <strong>2026 yılında Gateway Malta konaklama fiyatları, yaz sezonunda artan talep nedeniyle haftalık bazda yükselebilir.</strong> Okula yakınlık ve oda tipi (tek kişilik, paylaşımlı veya özel banyolu) toplam maliyeti doğrudan etkiler. Uzun dönem konaklamalarda haftalık birim maliyet düşerken, kısa süreli programlarda sezon farkı daha belirgin hale gelir.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler Bölümü */}
        <section className="bg-slate-50 py-12" id="gateway-malta-aktiviteler">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              Gateway Malta Sosyal Aktiviteleri ve Öğrenci Deneyimi (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center">
              Gateway Malta'da ders dışı etkinlikler, yeni arkadaşlıklar kurmak ve İngilizce pratiğini hızlandırmak için önemli bir avantaj sağlar. Aşağıdaki etkinlikler, okulun haftalık sosyal programında en sık karşılaşılan deneyimleri özetler.
            </p>
            
            {/* Aktiviteler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-hos-geldin-etkinligi-orientation.webp"
                  alt="Gateway Malta hoş geldin etkinliği ve oryantasyon"
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
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-sosyal-program-haftalik-etkinlik-akisi.webp"
                  alt="Gateway Malta haftalık sosyal program etkinlikleri"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Gateway Sosyal Programı (Haftalık Etkinlik Akışı)</h3>
                  <p className="text-slate-700 text-sm">Gateway'in haftalık sosyal programı, yeni arkadaşlık kurmanı ve ders dışında İngilizce pratik yapmanı hızlandırır.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-ingilizce-dil-etkinlikleri-atolyeler.webp"
                  alt="Gateway Malta İngilizce dil etkinlikleri ve atölyeler"
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
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-sehir-turlari-kulturel-gezi-programlari.webp"
                  alt="Gateway Malta şehir turları ve kültürel gezi programları"
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
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-tekne-turlari-deniz-aktiviteleri.webp"
                  alt="Gateway Malta tekne turları ve deniz aktiviteleri"
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
                  src="/malta-dil-okullari/Gateway-malta/gateway-malta-mezuniyet-kapanis-etkinligi.webp"
                  alt="Gateway Malta mezuniyet ve kapanış etkinliği"
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
              2026 boyunca Gateway Malta'da sosyal aktiviteler ve etkinlik programı her hafta Pazartesi yayınlanır; bazı aktiviteler ücretsiz, bazıları ücretli olabilir.
            </p>
            
            <p className="text-center text-slate-600">
              2026 boyunca Gateway Malta'da sosyal aktiviteler ve etkinlik programı her hafta Pazartesi yayınlanır; bazı aktiviteler ücretsiz, bazıları ücretli olabilir.
            </p>
          </div>
        </section>

        {/* Öğrenci Deneyimi Bölümü */}
        <section className="bg-white py-12" id="gateway-malta-deneyim" itemScope itemType="https://schema.org/VideoObject">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" itemProp="name">
              Gateway Malta'da Bir Öğrencinin Günü – Gerçek Deneyim (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8" itemProp="description">
              <strong>Gateway Malta</strong>'da 2026 yılı boyunca eğitim alan öğrenciler, sınıf içi <strong>İngilizce derslerini</strong> San Ġwann'daki günlük yaşam ve sosyal pratikle birleştirir. Aşağıdaki videoda, <strong>Gateway Malta</strong>'da eğitim alan bir öğrencinin ders ortamını, okul atmosferini ve Malta'daki tipik öğrenci gününü gerçek haliyle izleyebilirsiniz.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/icljvUay0C4?start=31"
                    title="Gateway Malta Öğrenci Deneyimi (2026)"
                    aria-label="Gateway Malta Öğrenci Deneyimi (2026)"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    itemProp="embedUrl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerçek Öğrenci Deneyimi – Gateway Malta Dil Okulu</h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Bu video, <strong>Gateway Malta Dil Okulu</strong>'nda eğitim alan öğrencilerin tipik bir gününü yansıtmaktadır. Derslerin işleyişi, sınıf içi iletişim ve okulun <strong>uluslararası öğrenci ortamı</strong>; İngilizceyi yalnızca derslerde değil, gün içinde de aktif kullanmanı hedefler.
                  </p>
                  <p>
                    <strong>Gateway Malta</strong>'nın San Ġwann'daki kampüs yapısı sayesinde öğrenciler ders sonrası Malta'yı daha kolay keşfeder; kafeler, sahil yürüyüşleri ve sosyal buluşmalar gibi günlük anlar <strong>İngilizce pratiğini</strong> doğal şekilde artırır.
                  </p>
                  <p>
                    Eğer <strong>Gateway Malta</strong> hakkında daha detaylı bilgi almak istersen; <a href="#gateway-malta-fiyatlar" className="text-green-600 hover:text-green-700 font-semibold underline">2026 fiyatlar</a>, <a href="#gateway-malta-programlar" className="text-green-600 hover:text-green-700 font-semibold underline">programlar</a> ve <a href="#gateway-malta-konaklama" className="text-green-600 hover:text-green-700 font-semibold underline">konaklama seçeneklerini</a> sayfanın devamında inceleyebilir veya temsilciden bilgi alarak sana en uygun planı oluşturabiliriz.
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
                Türk Öğrenciler için Gateway Malta Deneyimi (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Gateway Malta Dil Okulu'nda 2026 yılı boyunca Türk öğrenciler aktif olarak eğitim almaktadır. Okul, sınıflarda milliyet dengesini koruyarak Türk öğrencilerin İngilizce pratiğini maksimum seviyede tutmayı hedefler.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler Ne Beklemeli?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Gateway Malta'da Türk öğrenciler bulunur ancak sınıflar uluslararası dengede oluşturulur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">İngilizce iletişim sınıf içinde ve sosyal hayatta ön plandadır</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Türk öğrenci yoğunluğu kontrollüdür, sınıflar tek milliyete dönmez</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Yeni başlayanlar için adaptasyon süreci kolaydır</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler için Avantajlar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Eğitim öncesi ve süresince Türkçe danışmanlık desteği</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Kayıt, vize ve konaklama süreçlerinde rehberlik</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Sosyal aktiviteler sayesinde hızlı sosyal adaptasyon</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Uzun dönem programlarda daha dengeli ve kalıcı arkadaş çevresi</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 italic">
                Not: Gateway Malta'da sınıf dağılımları, öğrencilerin milliyetlerine göre değil seviyelerine ve program türlerine göre yapılır.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Gateway Malta Dil Okulu – Türkiye Resmi Temsilcisi</h3>
                <p className="text-slate-700 mb-4">
                  Gateway Malta Dil Okulu'nun Türkiye resmi temsilcisi olarak, 2026 yılı boyunca kayıt, fiyatlandırma, konaklama ve vize süreçlerinde öğrencilere birebir destek sağlıyoruz. Tüm bilgiler güncel Gateway Malta programları ve resmi fiyatlar üzerinden paylaşılır.
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
                Gateway Malta Dil Okulu Öğrenci Profili (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Gateway Malta Dil Okulu'nda 2026 yılı boyunca farklı ülkelerden ve yaş gruplarından öğrenciler eğitim almaktadır. Aşağıdaki dağılımlar, okulun uluslararası yapısını ve Türk öğrenciler için ortamı net şekilde gösterir.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Nationality Mix (Ülke Dağılımı)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Türk öğrenci oranı</span>
                      <span className="text-sm font-bold text-orange-600">%7</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-[7%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Brezilya</span>
                      <span className="text-sm font-medium text-slate-600">%26</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-[26%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Fransa</span>
                      <span className="text-sm font-medium text-slate-600">%14</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full w-[14%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Almanya</span>
                      <span className="text-sm font-medium text-slate-600">%9</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full w-[9%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Diğer</span>
                      <span className="text-sm font-medium text-slate-600">%44</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full w-[44%]"></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 italic">
                    Türk öğrenciler bulunur ancak sınıflar uluslararası dengede oluşturulur.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Yaş Dağılımı</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">18-20</span>
                      <span className="text-sm font-medium text-slate-600">%15</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pink-300 h-2 rounded-full w-[15%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">21-25</span>
                      <span className="text-sm font-medium text-slate-600">%17</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-300 h-2 rounded-full w-[17%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">26-30</span>
                      <span className="text-sm font-medium text-slate-600">%10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-300 h-2 rounded-full w-[10%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">31-40</span>
                      <span className="text-sm font-medium text-slate-600">%20</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-300 h-2 rounded-full w-[20%]"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">41+</span>
                      <span className="text-sm font-medium text-slate-600">%38</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-slate-400 h-2 rounded-full w-[38%]"></div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-4">
                    Gateway Malta'da 2026 yılında öğrencilerin büyük bölümü 18–35 yaş aralığındadır; ancak uzun dönem ve kariyer odaklı programlarda daha olgun yaş grupları da yer almaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kayıt Süreci Bölümü */}
        <section className="bg-slate-50 py-12" id="gateway-malta-kayit">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Gateway Malta Dil Okulu Kayıt Süreci (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Gateway Malta kayıt süreci <strong>2026</strong> yılında ağırlıklı olarak <strong>online</strong> yürütülür; adayın program seçimi, planlanan süre ve kontenjan durumuna göre süreç adımları netleşir ve kayıt takvimi buna göre ilerler.
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
                  Gateway Malta Dil Okulu kayıt süreci <strong>2026</strong> yılında <strong>online</strong> yürütülür; adımlar program türü ve eğitim süresine göre değişiklik gösterebilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kayıt Sürecinde ve Eğitim Boyunca Yanındayız</h3>
                <p className="text-slate-700 mb-6">
                  Gateway Malta kayıt sürecinden eğitim bitimine kadar, öğrencilerimize rehberlik ve danışmanlık desteği sunuyoruz.
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
        <section className="bg-white py-12" id="gateway-malta-vize">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Gateway Malta Dil Okulu ve Vize Durumu (2026)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Yeşil Pasaport Sahipleri İçin Gateway Malta</h3>
                <p className="text-slate-700">
                  2026 yılında yeşil pasaport sahibi Türk vatandaşları, Gateway Malta dil eğitimi programlarında 90 güne kadar vize başvurusu yapmadan Malta'da kalabilir. Bu süre, kısa dönem dil eğitimi planlayan öğrenciler için kayıt sürecini hızlandırır ve ek vize evrakı gerektirmez. Eğitim süresi 90 günü aştığında, yeşil pasaport sahipleri için de Malta öğrenci vizesi gerekliliği doğar ve başvuru süreci eğitim süresine göre planlanır.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bordo Pasaport Sahipleri İçin Gateway Malta</h3>
                <p className="text-slate-700">
                  Bordo pasaport sahibi öğrenciler için Gateway Malta dil eğitimi programlarında vize gerekliliği, seçilen eğitim süresine göre belirlenir. Kısa dönem ve uzun dönem programlarda başvuru süreçleri ve istenen belgeler farklılık gösterebilir. Kayıt aşamasında eğitim süresine uygun vize türü netleştirilir ve bordo pasaportlu öğrenciler için vize sürecinde bilgilendirme ve yönlendirme desteği sağlanır.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8">
              Gateway Malta dil eğitimi programlarında vize şartları, pasaport türü ve eğitim süresine göre değişebilir; kayıt planlaması yapılırken güncel kurallar dikkate alınmalıdır. Malta öğrenci vizesi başvuru şartları, güncel evrak listesi ve süreç detaylarıyla ilgili kapsamlı bilgiye{' '}
              <Link href="/malta-ogrenci-vizesi" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Malta öğrenci vizesi rehberimizden
              </Link>{' '}
              ulaşabilirsin.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Gateway Malta Dil Okulu İçin Ücretsiz Vize Danışmanlığı (2026)</h3>
              <p className="text-slate-700 mb-4">
                Gateway Malta Dil Okulu'na kayıt sürecinde vize, pasaport türü ve eğitim süresine göre değişkenlik gösterebilir. Bordo ve yeşil pasaport sahipleri için güncel vize gerekliliklerini, evrak sürecini ve doğru başvuru yolunu ücretsiz olarak değerlendiriyoruz.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Gateway Malta özelinde güncel vize bilgisi</span>
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
                Gateway Malta Dil Okulu İçin Vize Bilgisi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Bölümü */}
        <section className="bg-white py-12" id="uygunluk">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              <strong>Gateway Malta</strong> Kimler İçin Uygun / Kimler İçin Uygun Değil?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>✓</span>
                  <strong>Gateway Malta</strong> Kimler İçin Uygun?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">San Ġwann'da merkezi ama daha sakin bir bölgede eğitim almak isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Okul–konaklama yakınlığı arayanlar (rezidans/konaklama düzeni pratik).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Sınıfta düzenli ilerlemek isteyen, planlı programla çalışabilen öğrenciler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Hem ders hem günlük hayatta İngilizce pratiği için sosyal çevre kurmak isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Uzun dönem plan yapan ve 8+ hafta ile daha verimli ilerlemek isteyenler.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>⚠</span>
                  <strong>Gateway Malta</strong> Kimler İçin Uygun Değil?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">"Sadece eğlence odaklı bir Malta deneyimi" isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Çok kısa sürede "garanti sonuç" bekleyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Aşırı yoğun tempo veya sabit disiplin istemeyen, program düzenine uyum sağlayamayanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Sadece en düşük fiyat odaklı karar verenler (konum + okul yapısı avantajı fiyatla birlikte değerlendirilmelidir).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <section className="bg-slate-50 py-12" id="gateway-malta-faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
                Gateway Malta Dil Okulu Hakkında En Çok Sorulan Sorular (2026)
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Türkiye'den en çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
              </p>
            </div>
            
            <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
              {[
                {
                  question: 'Gateway Malta fiyatları neye göre değişir?',
                  answer: '<strong>Gateway Malta</strong> fiyatları <strong>hafta sayısı</strong> + <strong>program yoğunluğu</strong> + <strong>konaklama tipi</strong> seçimine göre değişir. En büyük farkı konaklama belirler; süre uzadıkça toplam maliyet artar.',
                },
                {
                  question: 'Gateway Malta yaz sezonu farkı ne zaman uygulanır?',
                  answer: '<strong>Gateway Malta</strong>\'da yaz sezonu farkı <strong>28 Haziran – 1 Ekim</strong> tarihleri arasında uygulanır. Bu dönemde kısa süreli programlarda haftalık sezon farkı eklenir.',
                },
                {
                  question: 'Gateway Malta\'da konaklama seçimi bütçeyi nasıl etkiler?',
                  answer: '<strong>Gateway Malta</strong>\'da bütçeyi en çok etkileyen kalem <strong>konaklama tipidir</strong>. Rezidans, aile yanı ve apart seçenekleri toplam maliyeti doğrudan değiştirir.',
                },
                {
                  question: 'Gateway Malta tek kişilik oda farkı ne kadar?',
                  answer: '<strong>Gateway Malta</strong>\'da tek kişilik oda farkı haftalık <strong>+125€</strong>\'dur. Bu fark, konaklama süresi boyunca haftalık olarak eklenir.',
                },
                {
                  question: 'Gateway Malta\'da kaç hafta eğitim almak mantıklı?',
                  answer: '<strong>Gateway Malta</strong>\'da verimli sonuç için ideal süre <strong>8–12 hafta</strong> arasıdır. 4 hafta başlangıç için uygundur; 12+ hafta kalıcı gelişim sağlar.',
                },
                {
                  question: 'Gateway Malta\'da hangi programlar var?',
                  answer: '<strong>Gateway Malta</strong>\'da en çok tercih edilen programlar <strong>Genel İngilizce</strong> ve <strong>Yoğun İngilizce</strong>\'dir. Program seçimi hedefe göre yapılır (konuşma, hız, seviye ilerleme).',
                },
                {
                  question: 'Gateway Malta\'da ders seviyesi nasıl belirleniyor?',
                  answer: '<strong>Gateway Malta</strong>\'da seviye, kayıt sonrası yapılan <strong>seviye tespit sınavı</strong> ile belirlenir. Sonuca göre öğrenci uygun sınıfa yerleştirilir.',
                },
                {
                  question: 'Gateway Malta\'da sosyal aktiviteler ücretli mi?',
                  answer: '<strong>Gateway Malta</strong>\'da sosyal aktivitelerin bir kısmı <strong>ücretsiz</strong>, bir kısmı <strong>ücretlidir</strong>. Haftalık aktivite planına göre gezi ve etkinlik ücretleri değişebilir.',
                },
                {
                  question: 'Gateway Malta kayıt süreci nasıl işler?',
                  answer: '<strong>Gateway Malta</strong> kayıt süreci <strong>program seçimi → tarih → konaklama → ödeme → okul onayı</strong> şeklinde ilerler. Onay sonrası okul, resmi kayıt belgesini paylaşır.',
                },
                {
                  question: 'Gateway Malta\'da çalışmak mümkün mü?',
                  answer: 'Malta\'da dil okulu öğrencileri için çalışma hakkı <strong>vize ve oturum şartlarına</strong> göre değişir. Başvuru öncesi güncel şartlar kontrol edilerek plan yapılmalıdır.',
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
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
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
                      <p itemProp="text" dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
                Bu sayfadaki bilgiler; <strong>Gateway Malta Dil Okulu</strong>'nun resmi kaynakları, <strong>2026 güncel fiyat listeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak hazırlanmış ve düzenli olarak güncellenmektedir.
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
