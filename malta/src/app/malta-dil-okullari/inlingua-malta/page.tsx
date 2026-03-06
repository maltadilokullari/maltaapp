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
    '1 Ay': '4',
    '6 Hafta': '6',
    '8 Hafta': '8',
    '3 Ay': '12',
    '16 Hafta': '16',
    '6 Ay': '24',
  };

  const priceData: Record<string, Record<string, string>> = {
    "St. Julian's Paylaşımlı Apart (Self-Catering)": {
      '4': '1340€',
      '6': '1720€',
      '8': '2640€',
      '12': '3744€',
      '16': '4160€',
      '24': '7488€',
    },
    'Sliema Paylaşımlı Apart (Self-Catering)': {
      '4': '1420€',
      '6': '1800€',
      '8': '2800€',
      '12': '4140€',
      '16': '4320€',
      '24': '8280€',
    },
    'Aile Yanı – Tek Kişilik (Half Board)': {
      '4': '2020€',
      '6': '3030€',
      '8': '4040€',
      '12': '6060€',
      '16': '8080€',
      '24': '12120€',
    },
    'Aile Yanı – Paylaşımlı Oda (Half Board)': {
      '4': '1628€',
      '6': '2442€',
      '8': '3256€',
      '12': '4884€',
      '16': '6512€',
      '24': '9768€',
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
            <option>8 Hafta</option>
            <option>3 Ay</option>
            <option>16 Hafta</option>
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
            <option>St. Julian's Paylaşımlı Apart (Self-Catering)</option>
            <option>Sliema Paylaşımlı Apart (Self-Catering)</option>
            <option>Aile Yanı – Tek Kişilik (Half Board)</option>
            <option>Aile Yanı – Paylaşımlı Oda (Half Board)</option>
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
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-2 text-white font-semibold hover:from-blue-700 hover:to-indigo-600 transition-colors shadow-md"
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

const faqItems = [
  {
    question: 'Inlingua Malta güvenilir mi?',
    answer: 'Evet. <strong>Inlingua Malta</strong>, Malta\'da uzun süredir faaliyet gösteren köklü bir dil okuludur ve düzenli kayıt alan <strong>uluslararası bir öğrenci yapısına</strong> sahiptir.',
  },
  {
    question: 'Inlingua Malta hangi bölgede? Okul nerede?',
    answer: '<strong>Inlingua Malta</strong>, <strong>Sliema bölgesindedir</strong>. Sliema; ulaşımı kolay, deniz kenarı yürüyüş yolu olan ve öğrenci yaşamının en yoğun olduğu bölgelerden biridir.',
  },
  {
    question: 'Inlingua Malta fiyatları ne kadar?',
    answer: '<strong>Inlingua Malta</strong>\'da fiyatlar <strong>hafta sayısına</strong>, <strong>kurs yoğunluğuna</strong> ve <strong>konaklama tipine</strong> göre değişir. En net fiyat, seçilen "kurs + konaklama" paketine göre hesaplanır.',
  },
  {
    question: 'Inlingua Malta\'da konaklama nasıl? Apart mı aile yanı mı?',
    answer: '<strong>Inlingua Malta</strong>\'da en çok tercih edilen konaklamalar <strong>öğrenci apartmanı</strong> ve <strong>aile yanıdır</strong>. Apart konaklama daha özgür ve genelde daha ekonomiktir; aile yanı ise daha düzenli ve pratik odaklıdır.',
  },
  {
    question: 'Inlingua Malta öğrenci apartları okula yakın mı?',
    answer: 'Evet. <strong>Inlingua Malta</strong>\'da öğrenci apartları genelde okula yakın konumlanır; özellikle <strong>Sliema apartları yürüyüş mesafesindedir</strong>.',
  },
  {
    question: 'Inlingua Malta\'da yaş sınırı var mı?',
    answer: '<strong>Inlingua Malta</strong>\'da minimum yaş programlara göre değişir; yetişkin programları genelde <strong>16+ kabul eder</strong>. 18 yaş altı öğrenciler için aile onayı ve uygun konaklama şartı gerekebilir.',
  },
  {
    question: 'Inlingua Malta\'da sınıflar kalabalık mı?',
    answer: '<strong>Inlingua Malta</strong>\'da sınıf mevcudu dönem yoğunluğuna göre değişir ancak sınıflar genelde <strong>uluslararası karışık yapıdadır</strong> ve <strong>seviye bazlı ilerler</strong>.',
  },
  {
    question: 'Inlingua Malta\'da hangi seviyeden başlanır?',
    answer: '<strong>Inlingua Malta</strong>\'da herkes seviyesine göre başlar. Kayıt sonrası/ilk gün yapılan <strong>seviye tespit</strong> ile <strong>A1\'den C1\'e kadar</strong> uygun sınıfa yerleştirme yapılır.',
  },
  {
    question: 'Inlingua Malta sertifika veriyor mu?',
    answer: 'Evet. <strong>Inlingua Malta</strong>, program sonunda öğrencinin seviyesini ve katılımını gösteren <strong>kurs bitirme sertifikası</strong> verir.',
  },
  {
    question: 'Inlingua Malta vizesi kaç günde çıkar?',
    answer: 'Malta öğrenci vizesi (C tipi) başvuru yoğunluğuna göre değişir; Türkiye\'den yapılan başvurularda süreç genelde <strong>2–6 hafta aralığında</strong> sonuçlanır. <strong>Erken başvuru en kritik konudur</strong>.',
  },
];

export default function InlinguaMaltaPage() {
  const school = getSchoolBySlug('inlingua-malta');
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
    const baseMessage = 'Merhaba, Inlingua Malta hakkında bilgi almak istiyorum.';
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta',
        name: 'Inlingua Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'Inlingua Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması. AI Overview uyumlu hızlı yanıtlar.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#article',
        headline: 'Inlingua Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'Inlingua Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/Inlingua-malta/inlingua-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
            width: 1200,
            height: 630,
            name: 'Inlingua Malta Dil Okulu kampüs ve sınıf ortamı',
            caption: 'Inlingua Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Sliema bölgesinde İngilizce eğitimi',
            description: 'Inlingua Malta Dil Okulu 2026: Sliema bölgesinde kampüs, sınıf ortamı, programlar ve güncel fiyatlar hakkında detaylı bilgi',
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#breadcrumb',
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
            name: 'Inlingua Malta',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta',
          },
        ],
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        name: school.name,
        description: school.description,
        image: `https://maltadilokuluingilizce.com${school.logo}`,
        url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: school.region,
          addressCountry: 'MT',
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
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#faq',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer.replace(/<[^>]*>/g, ''), // Remove HTML tags for schema
          },
        })),
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/Inlingua-malta/inlingua-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
        width: 1200,
        height: 630,
        name: 'Inlingua Malta Dil Okulu kampüs ve sınıf ortamı',
        caption: 'Inlingua Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Sliema bölgesinde İngilizce eğitimi',
        description: 'Inlingua Malta Dil Okulu 2026: Sliema bölgesinde kampüs, sınıf ortamı, programlar ve güncel fiyatlar hakkında detaylı bilgi',
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#fiyat-tablosu',
        name: 'Inlingua Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)',
        description: 'Inlingua Malta Dil Okulu 2026 yılı için konaklama dahil paket fiyatları tablosu',
        about: 'Inlingua Malta fiyatları, eğitim süresi ve konaklama tipine göre değişen 2026 paket fiyatları',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#konaklama-listesi',
        name: 'Inlingua Malta Konaklama Türleri',
        description: 'Inlingua Malta Dil Okulu konaklama seçenekleri: St. Julian\'s Paylaşımlı Apart, Sliema Paylaşımlı Apart, Aile Yanı',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: "St. Julian's Paylaşımlı Apart (Self-Catering)",
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Sliema Paylaşımlı Apart (Self-Catering)',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Aile Yanı – Tek Kişilik (Half Board)',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Aile Yanı – Paylaşımlı Oda (Half Board)',
          },
        ],
      },
      {
        '@type': 'VideoObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/inlingua-malta/#video',
        name: 'Inlingua Malta Öğrenci Deneyimi (2026)',
        description: 'Inlingua Malta Dil Okulu\'nda eğitim alan öğrencilerin tipik bir gününü yansıtan video. Derslerin işleyişi, sınıf içi iletişim ve okulun uluslararası öğrenci ortamı.',
        thumbnailUrl: 'https://img.youtube.com/vi/6RkNyY34Q6o/maxresdefault.jpg',
        uploadDate: '2026-01-01',
        contentUrl: 'https://www.youtube.com/watch?v=6RkNyY34Q6o',
        embedUrl: 'https://www.youtube.com/embed/6RkNyY34Q6o',
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
                  <strong>Inlingua Malta Dil Okulu</strong>: <strong>2026</strong> <strong>Fiyatları ve Programlar</strong>
                </h1>
                <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed" itemProp="description">
                  <p>
                    <strong>Inlingua Malta Dil Okulu</strong>, Malta'da İngilizce eğitimi almak isteyen öğrenciler için{' '}
                    <strong>2026</strong> yılında farklı program ve fiyat seçenekleri sunuyor. Bu sayfada Inlingua Malta'nın
                    güncel fiyat aralıklarını, hangi programların bulunduğunu ve bu programların kimler için daha uygun
                    olduğunu açık ve sade bir şekilde bulabilirsin.
                  </p>
                  <p>
                    Kurs süresi uzadıkça fiyatların nasıl değiştiğini, yaz ve kış sezonu arasındaki farkları ve Inlingua
                    Malta'da toplam bütçenin hangi kalemlerden oluştuğunu, öğrencilerden gelen gerçek sorular üzerinden
                    anlatıyoruz. Böylece kayıt aşamasına gelmeden önce sürpriz yaşamadan karar verebilirsin.
                  </p>
                </div>
                <div className="text-sm text-slate-600 mt-6">
                  Son kontrol: <time dateTime={lastUpdated} className="font-semibold">{lastUpdated}</time> • fiyatları ve program bilgileri
                  günceldir.
                </div>
              </div>

              {/* Sağ Kolon - Form Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-blue-500">
                {/* Logo */}
                <div className="text-center mb-4">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/inlingua-malta.png"
                    alt="Inlingua Malta dil okulu logosu"
                    width={200}
                    height={60}
                    className="mx-auto"
                    unoptimized
                  />
                  <div className="mt-4 border-t-2 border-blue-500"></div>
                </div>

                {/* Form Başlık ve Açıklama */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
                  Inlingua Malta 2026 Fiyat ve Program Bilgi Formu
                </h2>
                <p className="text-center mb-6 text-slate-700 text-sm">
                  Inlingua Malta Dil Okulu'nun 2026 yılına ait güncel fiyatlarını, program türlerini ve toplam maliyet detaylarını öğrenin.
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
                      className="w-full rounded-lg border-2 border-blue-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
                      className="w-full rounded-lg border-2 border-blue-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Inlingua%20Malta%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  >
                    Inlingua Malta 2026 Fiyatlarını Göster
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
                    Inlingua Malta Bilgileri
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#inlingua-malta-fiyatlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          1
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Dil Okulu 2026 Güncel Fiyatları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#inlingua-malta-programlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          2
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Dil Okulu Programları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#inlingua-malta-konaklama"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          3
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Konaklama Türleri</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#inlingua-malta-aktiviteler"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          4
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Sosyal Aktiviteleri</span>
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
                        href="#inlingua-malta-deneyim"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          5
                        </span>
                        <span className="leading-relaxed">Inlingua Malta'da Bir Öğrencinin Günü</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#inlingua-malta-kayit"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          6
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Dil Okulu Kayıt Süreci</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#inlingua-malta-vize"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          7
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Dil Okulu ve Vize Durumu</span>
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
                        <span className="leading-relaxed">Inlingua Malta Kimler İçin Uygun / Uygun Değil?</span>
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
                        href="#inlingua-malta-faq"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          9
                        </span>
                        <span className="leading-relaxed">Inlingua Malta Dil Okulu Hakkında En Çok Sorulan Sorular</span>
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
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp"
                  alt="Inlingua Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Sliema bölgesinde İngilizce eğitimi"
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
                Inlingua Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Sliema bölgesinde İngilizce eğitimi
              </figcaption>
              <meta itemProp="name" content="Inlingua Malta Dil Okulu kampüs ve sınıf ortamı" />
              <meta itemProp="description" content="Inlingua Malta Dil Okulu 2026: Sliema bölgesinde kampüs, sınıf ortamı, programlar ve güncel fiyatlar hakkında detaylı bilgi" />
            </figure>
          </div>
        </section>

        {/* Fiyatlar Bölümü */}
        <section className="bg-white py-12" id="inlingua-malta-fiyatlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Inlingua Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)
            </h2>
            
            {/* H2 Alt Açıklama Paragrafı (Snippet Odaklı) */}
            <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-4 speakable-ec-fiyatlar">
              <p>
                <strong>Inlingua Malta fiyatları</strong> <strong>2026</strong> yılında eğitim süresi ve konaklama tipine göre değişir; <strong>4–24 hafta</strong> arası programlar için konaklama dahil tahmini paket maliyeti tabloda yer alır.
              </p>
              <p>
                Bu sayfa <strong>Inlingua Malta paket fiyatlarını</strong> anlatır; tablodaki tutarlar kurs, konaklama ve zorunlu ücretlerin toplamını yansıtır ve <strong>2026</strong> eğitim dönemi için geçerlidir.
              </p>
              <p>
                <strong>Inlingua Malta fiyatları</strong> konaklama tipine göre değişir; en düşük tahmini paket maliyeti <strong>4 haftalık St. Julian's Paylaşımlı Apart (Self-Catering)</strong> seçeneğinde <strong>1.340 €</strong> olarak görülür.
              </p>
              <p>
                Fiyatlar eğitim süresi uzadıkça artar; <strong>24 haftalık</strong> programlarda toplam maliyet <strong>7.488 €</strong> ile <strong>12.120 €</strong> arasında değişir.
              </p>
            </div>

            {/* Hızlı Cevap / Özet Satırı (Snippet Boost) */}
            <p className="text-base md:text-lg font-semibold text-slate-900 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 pl-4 py-2">
              Kısaca: <strong>2026</strong> yılı için <strong>Inlingua Malta fiyatları</strong>, en düşük <strong>1.340 €</strong> ile başlar; süre ve konaklama tipine göre değişen tahmini paket maliyetleri aşağıdaki tabloda yer alır.
            </p>
            
            {/* Fiyat Tablosu */}
            <div className="mb-6">
              <div className="overflow-x-auto relative" role="region" aria-label="inlingua Malta fiyat tablosu">
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full pointer-events-none hidden md:block z-10" aria-hidden="true"></div>
                <div className="md:hidden text-xs text-slate-500 mb-2 text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded px-2 py-1">
                  ← → Kaydırarak tüm sütunları görebilirsin
                </div>
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm min-w-[800px]" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">Inlingua Malta fiyatları 2026 - Konaklama dahil paket fiyatları tablosu</caption>
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b border-slate-200 sticky left-0 z-20 bg-slate-50 md:bg-slate-50" scope="col">Konaklama Tipi</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200" scope="col">4 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200" scope="col">6 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200" scope="col">8 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200" scope="col">12 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200" scope="col">16 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200" scope="col">24 Hafta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-blue-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200" scope="row"><strong>St. Julian's Paylaşımlı Apart (Self-Catering)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1340€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1720€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2640€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3744€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4160€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">7488€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-blue-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200" scope="row"><strong>Sliema Paylaşımlı Apart (Self-Catering)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1420€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1800€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2800€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4140€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4320€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">8280€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-blue-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200" scope="row"><strong>Aile Yanı – Tek Kişilik (Half Board)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2020€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3030€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4040€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">6060€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">8080€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">12120€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-blue-50/30">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200" scope="row"><strong>Aile Yanı – Paylaşımlı Oda (Half Board)</strong></td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">1628€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">2442€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">3256€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">4884€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">6512€</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">9768€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablo Altı Mikro Açıklama */}
            <p className="text-sm text-slate-600 mb-8 text-center">
              <strong>Inlingua Malta fiyatları</strong> <strong>2026</strong> yılı için geçerlidir; en düşük fiyat <strong>4 haftalık St. Julian's Paylaşımlı Apart (Self-Catering)</strong> seçeneğine aittir. Tablodaki tutarlar tahmini paket fiyatıdır; okul, konaklama ve zorunlu ücretler dahildir.
            </p>

            {/* Fiyat Hesaplama */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Inlingua Malta için Tahmini Paket Fiyatını Hesapla (2026)
              </h3>
              <p className="text-base text-slate-700 mb-6">
                Hesaplama, yukarıdaki tablodaki <strong>Inlingua Malta paket fiyatlarını</strong> esas alır; tahmini toplam maliyet gösterilir.
              </p>
              <PriceCalculator />
            </div>

            {/* Internal Link */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-base text-slate-700">
                Inlingua Malta dışındaki okulların fiyatlarını da incelemek istersen, detaylı karşılaştırma için{' '}
                <Link href="/malta-dil-okulu-fiyatlari" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline">
                  Malta Dil Okulu Fiyatları
                </Link>{' '}
                sayfamıza göz atabilirsin.
              </p>
            </div>

            {/* Dahil Olanlar */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Inlingua Malta Her Şey Dahil Paket Fiyatlarına Neler Dahil?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Fiyata Dahil Olanlar</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    Inlingua Malta <strong>2026</strong> her şey dahil paket fiyatlarına aşağıdaki hizmetler dahildir:
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Inlingua Malta Dil Okulu Fiyatı Hesaplamasında Dikkat Edilenler (2026)</h3>
              <p>
                <strong>28 Haziran – 28 Ekim 2026</strong> tarihleri arasında, <strong>6 aydan kısa</strong> süreli programlarda haftalık yüksek sezon fiyat farkı uygulanır.
              </p>
              <p>
                <strong>6 ay ve üzeri</strong> dil eğitimi alan öğrencilerden yüksek sezon ücreti alınmaz.
              </p>
              <p>
                Konaklama tercihlerine göre haftalık ek farklar uygulanır; <strong>tek kişilik oda</strong> ve <strong>özel banyolu oda</strong> seçeneklerinde haftalık fiyat artışı olur.
              </p>
              <p>
                <strong>Yaz sezonunda</strong> haftalık fiyatlar artabilir; <strong>uzun dönem programlarda</strong> ise haftalık birim maliyet düşer.
              </p>
            </div>
          </div>
        </section>

        {/* Programlar Bölümü */}
        <section className="bg-slate-50 py-12" id="inlingua-malta-programlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              inlingua Malta Dil Okulu Programları (Hangisi Sana Uygun?)
            </h2>
            <div className="speakable-ec-programlar">
            
            {/* H2 Alt Açıklama Paragrafı */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              <strong>inlingua Malta programları</strong> süre, ders yoğunluğu ve hedefe göre ayrılır; her program farklı öğrenci ihtiyaçlarına yöneliktir. Program seçimi, <strong>inlingua Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Bu program türü, <strong>inlingua Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>inlingua Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  Bu program türü, <strong>inlingua Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>inlingua Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm" itemScope itemType="https://schema.org/ImageObject">
                <Image
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-programlara-dahil-temel-hizmetler.webp"
                  alt="Inlingua Malta dil okulu kampüs ve programlara dahil temel hizmetler - Sliema"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                  style={{ minHeight: '400px', maxHeight: '600px' }}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  itemProp="contentUrl"
                />
                <meta itemProp="name" content="Inlingua Malta programlara dahil temel hizmetler" />
                <meta itemProp="description" content="Inlingua Malta Dil Okulu kampüs ve programlara dahil temel hizmetler - Sliema bölgesinde İngilizce eğitimi" />
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">inlingua Malta Dil Okulu Kampüs İmkânları</h3>
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
        <section className="bg-white py-12" id="inlingua-malta-konaklama">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Inlingua Malta Konaklama Türleri – Okula Uzaklık ve Konfor Karşılaştırması
            </h2>
            <div className="speakable-ec-konaklama">
            <p className="text-lg text-slate-700 mb-8">
              Inlingua Malta'da sunulan konaklama seçenekleri; okula uzaklık, yaşam tarzı ve konfor beklentisine göre farklılık gösterir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Sliema Öğrenci Apartmanı */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-blue-300 pb-2">Sliema Öğrenci Apartmanı</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                    <span className="text-sm text-slate-600">Sliema bölgesinde, paylaşımlı öğrenci apartmanı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-600">5 dk (yürüyüş)</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                    <span className="text-sm text-slate-600">Bağımsız yaşam; paylaşımlı daire düzeni. Ortak mutfak ve ortak alan kullanımı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                    <span className="text-sm text-slate-600">Okula çok yakın olduğu için gün içinde ciddi zaman kazandırır; Sliema çevresindeki sosyal alanlara erişim rahattır.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                    <span className="text-sm text-slate-600">Okula yakın kalmak isteyen, özgür yaşam tarzını seven ve "konum + pratiklik" dengesini önemseyen öğrenciler.</span>
                  </div>
                </div>
              </div>
              
              {/* St. Julian's Öğrenci Apartmanı */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-blue-300 pb-2">St. Julian's Öğrenci Apartmanı</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                    <span className="text-sm text-slate-600">St. Julian's çevresinde, paylaşımlı öğrenci apartmanı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-600">15 dk (otobüs) / 30 dk (yürüyüş)</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                    <span className="text-sm text-slate-600">Paylaşımlı apart yaşamı; ortak mutfak ve yaşam alanları. Günlük tempo daha esnek.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                    <span className="text-sm text-slate-600">St. Julian's'ın sosyal yaşamına yakın konumda kalma avantajı sunar; okul sonrası etkinliklere ve şehir hayatına erişim kolaydır.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                    <span className="text-sm text-slate-600">Sosyal ortamı seven, apart düzeninde kalmak isteyen ve şehir hayatına yakın olmayı tercih eden öğrenciler.</span>
                  </div>
                </div>
              </div>
              
              {/* Aile Yanı Konaklama */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-blue-300 pb-2">Aile Yanı Konaklama</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                    <span className="text-sm text-slate-600">Yerel ailelerin yaşadığı mahalleler; okula toplu taşıma ile ulaşım.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-600">0–30 dk (konuma göre değişir)</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                    <span className="text-sm text-slate-600">Ev ortamı; günlük iletişim, daha düzenli rutin. Yerel kültürle iç içe yaşam.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                    <span className="text-sm text-slate-600">Günlük konuşma pratiğini artırır; özellikle ilk kez Malta'ya giden öğrenciler için daha güvenli ve düzenli bir adaptasyon sağlar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                    <span className="text-sm text-slate-600">İlk kez yurtdışına çıkacak, daha sakin tempo isteyen ve kültürel deneyim arayan öğrenciler.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Inlingua Malta Konaklama Fiyatlarını Etkileyen Faktörler (2026)</h3>
              <p className="text-slate-700">
                <strong>2026 yılında Inlingua Malta konaklama fiyatları, yaz sezonunda artan talep nedeniyle haftalık bazda yükselebilir.</strong> Okula yakınlık ve oda tipi (tek kişilik, paylaşımlı veya özel banyolu) toplam maliyeti doğrudan etkiler. Uzun dönem konaklamalarda haftalık birim maliyet düşerken, kısa süreli programlarda sezon farkı daha belirgin hale gelir.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler Bölümü */}
        <section className="bg-slate-50 py-12" id="inlingua-malta-aktiviteler">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              Inlingua Malta Sosyal Aktiviteleri ve Öğrenci Deneyimi (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center">
              Inlingua Malta'da ders dışı etkinlikler, yeni arkadaşlıklar kurmak ve İngilizce pratiğini hızlandırmak için önemli bir avantaj sağlar. Aşağıdaki etkinlikler, okulun haftalık sosyal programında en sık karşılaşılan deneyimleri özetler.
            </p>
            
            {/* Aktiviteler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-hos-geldin-etkinligi-orientation.webp"
                  alt="Inlingua Malta hoş geldin etkinliği ve oryantasyon"
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
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-sosyal-program-haftalik-etkinlik-akisi.webp"
                  alt="Inlingua Malta haftalık sosyal program etkinlikleri"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Inlingua Sosyal Programı (Haftalık Etkinlik Akışı)</h3>
                  <p className="text-slate-700 text-sm">Inlingua'nın haftalık sosyal programı, yeni arkadaşlık kurmanı ve ders dışında İngilizce pratik yapmanı hızlandırır.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-ingilizce-dil-etkinlikleri-atolyeler.webp"
                  alt="Inlingua Malta İngilizce dil etkinlikleri ve atölyeler"
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
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-sehir-turlari-kulturel-gezi-programlari.webp"
                  alt="Inlingua Malta şehir turları ve kültürel gezi programları"
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
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-tekne-turlari-deniz-aktiviteleri.webp"
                  alt="Inlingua Malta tekne turları ve deniz aktiviteleri"
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
                  src="/malta-dil-okullari/Inlingua-malta/inlingua-malta-mezuniyet-kapanis-etkinligi.webp"
                  alt="Inlingua Malta mezuniyet ve kapanış etkinliği"
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
              2026 boyunca Inlingua Malta'da sosyal aktiviteler ve etkinlik programı her hafta Pazartesi yayınlanır; bazı aktiviteler ücretsiz, bazıları ücretli olabilir.
            </p>
          </div>
        </section>

        {/* Öğrenci Deneyimi Bölümü */}
        <section className="bg-white py-12" id="inlingua-malta-deneyim" itemScope itemType="https://schema.org/VideoObject">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" itemProp="name">
              Inlingua Malta'da Bir Öğrencinin Günü – Gerçek Deneyim (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8" itemProp="description">
              <strong>Inlingua Malta</strong>'da 2026 yılı boyunca eğitim alan öğrenciler, sınıf içi <strong>İngilizce derslerini</strong> Sliema'daki günlük yaşam ve sosyal pratikle birleştirir. Aşağıdaki videoda, <strong>Inlingua Malta</strong>'da eğitim alan bir öğrencinin ders ortamını, okul atmosferini ve Malta'daki tipik öğrenci gününü gerçek haliyle izleyebilirsiniz.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" itemScope itemType="https://schema.org/VideoObject">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/6RkNyY34Q6o"
                    title="Inlingua Malta Öğrenci Deneyimi (2026)"
                    aria-label="Inlingua Malta Öğrenci Deneyimi (2026)"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    itemProp="embedUrl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerçek Öğrenci Deneyimi – Inlingua Malta Dil Okulu</h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Bu video, <strong>Inlingua Malta Dil Okulu</strong>'nda eğitim alan öğrencilerin tipik bir gününü yansıtmaktadır. Derslerin işleyişi, sınıf içi iletişim ve okulun <strong>uluslararası öğrenci ortamı</strong>; İngilizceyi yalnızca derslerde değil, gün içinde de aktif kullanmanı hedefler.
                  </p>
                  <p>
                    <strong>Inlingua Malta</strong>'nın Sliema'daki kampüs yapısı sayesinde öğrenciler ders sonrası Malta'yı daha kolay keşfeder; kafeler, sahil yürüyüşleri ve sosyal buluşmalar gibi günlük anlar <strong>İngilizce pratiğini</strong> doğal şekilde artırır.
                  </p>
                  <p>
                    Eğer <strong>Inlingua Malta</strong> hakkında daha detaylı bilgi almak istersen; <a href="#inlingua-malta-fiyatlar" className="text-blue-600 hover:text-blue-700 font-semibold underline">2026 fiyatlar</a>, <a href="#inlingua-malta-programlar" className="text-blue-600 hover:text-blue-700 font-semibold underline">programlar</a> ve <a href="#inlingua-malta-konaklama" className="text-blue-600 hover:text-blue-700 font-semibold underline">konaklama seçeneklerini</a> sayfanın devamında inceleyebilir veya temsilciden bilgi alarak sana en uygun planı oluşturabiliriz.
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
                Türk Öğrenciler için inlingua Malta Deneyimi (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                inlingua Malta Dil Okulu'nda 2026 yılı boyunca Türk öğrenciler aktif olarak eğitim almaktadır. Okul, sınıflarda milliyet dengesini koruyarak Türk öğrencilerin İngilizce pratiğini maksimum seviyede tutmayı hedefler.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler Ne Beklemeli?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">inlingua Malta'da Türk öğrenciler bulunur ancak sınıflar uluslararası dengede oluşturulur</span>
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
                Not: inlingua Malta'da sınıf dağılımları, öğrencilerin milliyetlerine göre değil seviyelerine ve program türlerine göre yapılır.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">inlingua Malta Dil Okulu – Türkiye Resmi Temsilcisi</h3>
                <p className="text-slate-700 mb-4">
                  inlingua Malta Dil Okulu'nun Türkiye resmi temsilcisi olarak, 2026 yılı boyunca kayıt, fiyatlandırma, konaklama ve vize süreçlerinde öğrencilere birebir destek sağlıyoruz. Tüm bilgiler güncel inlingua Malta programları ve resmi fiyatlar üzerinden paylaşılır.
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
                inlingua Malta Dil Okulu Öğrenci Profili (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                inlingua Malta Dil Okulu'nda 2026 yılı boyunca farklı ülkelerden ve yaş gruplarından öğrenciler eğitim almaktadır. Aşağıdaki dağılımlar, okulun uluslararası yapısını ve Türk öğrenciler için ortamı net şekilde gösterir.
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
                    inlingua Malta'da 2026 yılında öğrencilerin büyük bölümü 18–35 yaş aralığındadır; ancak uzun dönem ve kariyer odaklı programlarda daha olgun yaş grupları da yer almaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kayıt Süreci Bölümü */}
        <section className="bg-slate-50 py-12" id="inlingua-malta-kayit">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              inlingua Malta Dil Okulu Kayıt Süreci (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              inlingua Malta kayıt süreci <strong>2026</strong> yılında ağırlıklı olarak <strong>online</strong> yürütülür; adayın program seçimi, planlanan süre ve kontenjan durumuna göre süreç adımları netleşir ve kayıt takvimi buna göre ilerler.
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
                  inlingua Malta Dil Okulu kayıt süreci <strong>2026</strong> yılında <strong>online</strong> yürütülür; adımlar program türü ve eğitim süresine göre değişiklik gösterebilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kayıt Sürecinde ve Eğitim Boyunca Yanındayız</h3>
                <p className="text-slate-700 mb-6">
                  inlingua Malta kayıt sürecinden eğitim bitimine kadar, öğrencilerimize rehberlik ve danışmanlık desteği sunuyoruz.
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
        <section className="bg-white py-12" id="inlingua-malta-vize">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              inlingua Malta Dil Okulu ve Vize Durumu (2026)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Yeşil Pasaport Sahipleri İçin inlingua Malta</h3>
                <p className="text-slate-700">
                  2026 yılında yeşil pasaport sahibi Türk vatandaşları, inlingua Malta dil eğitimi programlarında 90 güne kadar vize başvurusu yapmadan Malta'da kalabilir. Bu süre, kısa dönem dil eğitimi planlayan öğrenciler için kayıt sürecini hızlandırır ve ek vize evrakı gerektirmez. Eğitim süresi 90 günü aştığında, yeşil pasaport sahipleri için de Malta öğrenci vizesi gerekliliği doğar ve başvuru süreci eğitim süresine göre planlanır.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bordo Pasaport Sahipleri İçin inlingua Malta</h3>
                <p className="text-slate-700">
                  Bordo pasaport sahibi öğrenciler için inlingua Malta dil eğitimi programlarında vize gerekliliği, seçilen eğitim süresine göre belirlenir. Kısa dönem ve uzun dönem programlarda başvuru süreçleri ve istenen belgeler farklılık gösterebilir. Kayıt aşamasında eğitim süresine uygun vize türü netleştirilir ve bordo pasaportlu öğrenciler için vize sürecinde bilgilendirme ve yönlendirme desteği sağlanır.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8">
              inlingua Malta dil eğitimi programlarında vize şartları, pasaport türü ve eğitim süresine göre değişebilir; kayıt planlaması yapılırken güncel kurallar dikkate alınmalıdır. Malta öğrenci vizesi başvuru şartları, güncel evrak listesi ve süreç detaylarıyla ilgili kapsamlı bilgiye{' '}
              <Link href="/malta-ogrenci-vizesi" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Malta öğrenci vizesi rehberimizden
              </Link>{' '}
              ulaşabilirsin.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">inlingua Malta Dil Okulu İçin Ücretsiz Vize Danışmanlığı (2026)</h3>
              <p className="text-slate-700 mb-4">
                inlingua Malta Dil Okulu'na kayıt sürecinde vize, pasaport türü ve eğitim süresine göre değişkenlik gösterebilir. Bordo ve yeşil pasaport sahipleri için güncel vize gerekliliklerini, evrak sürecini ve doğru başvuru yolunu ücretsiz olarak değerlendiriyoruz.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">inlingua Malta özelinde güncel vize bilgisi</span>
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
                inlingua Malta Dil Okulu İçin Vize Bilgisi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Bölümü */}
        <section className="bg-white py-12" id="uygunluk">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              <strong>inlingua Malta</strong> Kimler İçin Uygun / Kimler İçin Uygun Değil?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>✓</span>
                  <strong>inlingua Malta</strong> Kimler İçin Uygun?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Hedefini netleştirip programa bağlı kalabilenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Yoğun ders temposunu yönetebilenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Toplam maliyeti gerçekçi biçimde planlayanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">İngilizce pratik odaklı sosyal ortam isteyenler.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>⚠</span>
                  <strong>inlingua Malta</strong> Kimler İçin Uygun Değil?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Kısa sürede garanti sonuç beklentisi olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Yoğun programa zaman ayıramayanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Sadece en düşük fiyat odaklı karar verenler.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <section className="bg-slate-50 py-12" id="inlingua-malta-faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
                Inlingua Malta Dil Okulu Hakkında En Çok Sorulan Sorular (2026)
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                En çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
              </p>
            </div>
            
            <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setAcikIndex(acikIndex === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
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
                Bu sayfadaki bilgiler; <strong>inlingua Malta Dil Okulu</strong>'nun resmi kaynakları, <strong>2026 güncel fiyat listeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak hazırlanmış ve düzenli olarak güncellenmektedir.
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
