'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSchoolBySlug } from '../../data/schools';

// Price Calculator Component
function PriceCalculator() {
  const [duration, setDuration] = useState('');
  const [courseType, setCourseType] = useState('');
  const [result, setResult] = useState('');

  const durationMap: Record<string, string> = {
    '4 Hafta': '4',
    '6 Hafta': '6',
    '8 Hafta': '8',
    '12 Hafta': '12',
    '16 Hafta': '16',
    '24 Hafta': '24',
  };

  const priceData: Record<string, Record<string, string>> = {
    'Genel İngilizce (GE20)': {
      '4': '€1.680',
      '6': '€2.520',
      '8': '€3.360',
      '12': '€5.040',
      '16': '€6.720',
      '24': '€10.080',
    },
    'Genel İngilizce Plus (GE26)': {
      '4': '€1.880',
      '6': '€2.820',
      '8': '€3.760',
      '12': '€5.640',
      '16': '€7.520',
      '24': '€11.280',
    },
    'Yoğun İngilizce (GE26INT)': {
      '4': '€2.700',
      '6': '€4.050',
      '8': '€5.400',
      '12': '€8.100',
      '16': '€10.800',
      '24': '€16.200',
    },
    'IELTS / Cambridge Hazırlık (FCE20/CAE20)': {
      '4': '€1.780',
      '6': '€2.670',
      '8': '€3.560',
      '12': '€5.340',
      '16': '€7.200',
      '24': '€10.800',
    },
  };

  const handleCalculate = () => {
    const weeks = durationMap[duration];
    if (!weeks || !courseType) {
      setResult('Lütfen kurs türü ve süre seçiniz.');
      return;
    }

    const price = priceData[courseType]?.[weeks];
    if (!price) {
      setResult('Seçiminiz için fiyat bulunamadı, lütfen tabloyu kontrol edin.');
      return;
    }

    setResult(`Tahmini Kurs Fiyatı: ${price}`);
  };

  return (
    <div className="border-4 border-emerald-500 rounded-2xl p-6 bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="calc-course-type" className="block text-sm font-medium text-slate-700 mb-2">
            Kurs Türü
          </label>
          <select
            id="calc-course-type"
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            className="w-full rounded-lg border-2 border-emerald-400 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="">Seçiniz</option>
            <option>Genel İngilizce (GE20)</option>
            <option>Genel İngilizce Plus (GE26)</option>
            <option>Yoğun İngilizce (GE26INT)</option>
            <option>IELTS / Cambridge Hazırlık (FCE20/CAE20)</option>
          </select>
        </div>
        <div>
          <label htmlFor="calc-duration" className="block text-sm font-medium text-slate-700 mb-2">
            Süre
          </label>
          <select
            id="calc-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-lg border-2 border-emerald-400 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="">Seçiniz</option>
            <option>4 Hafta</option>
            <option>6 Hafta</option>
            <option>8 Hafta</option>
            <option>12 Hafta</option>
            <option>16 Hafta</option>
            <option>24 Hafta</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-2 text-white font-semibold hover:from-emerald-700 hover:to-teal-600 transition-colors shadow-md"
          >
            Hesapla
          </button>
        </div>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
          <p className="font-semibold text-emerald-900">{result}</p>
          <p className="text-sm text-emerald-700 mt-2">
            Bu tutar, yukarıdaki 2026 kurs fiyat tablosu baz alınarak gösterilmektedir. Konaklama ve ek ücretler dahil değildir.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AtlasMaltaPage() {
  const school = getSchoolBySlug('atlas-malta');
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
    const baseMessage = 'Merhaba, Atlas Malta hakkında bilgi almak istiyorum.';
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta',
        name: 'Atlas Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'Atlas Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması. AI Overview uyumlu hızlı yanıtlar.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#article',
        headline: 'Atlas Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'Atlas Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/atlas-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
            width: 1200,
            height: 630,
            name: 'Atlas Malta Dil Okulu kampüs ve sınıf ortamı',
            caption: 'Atlas Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Pembroke bölgesinde İngilizce eğitimi',
            description: 'Atlas Malta Dil Okulu 2026: Pembroke bölgesinde kampüs, sınıf ortamı, programlar ve güncel fiyatlar hakkında detaylı bilgi',
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#breadcrumb',
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
            name: 'Atlas Malta',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta',
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Atlas Malta Dil Okulu 2026 fiyatları neye göre değişir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Atlas Malta 2026 paket fiyatı; eğitim süresi (4–24 hafta), program yoğunluğu (Yoğun İngilizce için haftalık +60 €), konaklama türü (öğrenci apartmanı / aile yanı / paylaşımlı daire) ve oda tipine göre değişir. Kurs ve ilk kitaplar dahildir; sonraki seviye için 40 € kitap ücreti alınır. Yaz sezonu farkı toplam maliyeti artırabilir.",
            },
          },
          {
            '@type': 'Question',
            name: '2026 yüksek sezon farkı ne zaman uygulanır?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yaz sezonu 14/06/2026 – 06/09/2026 arasındadır. Bu tarihlerde kurs için haftalık +50 € ve konaklama için haftalık +50 € sezon farkı eklenir. 12 hafta ve üzeri kayıtlarda yaz sezon farkı alınmaz.',
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta'da konaklama seçimi bütçeyi nasıl etkiler?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Konaklama bütçeyi doğrudan etkiler: okula yakınlık, konaklama türü ve oda tipi toplam maliyeti belirler. Öğrenci apartmanı, aile yanı ve paylaşımlı daire seçenekleri farklı fiyat seviyeleri sunar; tek kişilik ve özel banyolu oda ek ücret getirir. Tüm konaklamalarda 100 € depozito alınır ve çıkışta iade edilir.',
            },
          },
          {
            '@type': 'Question',
            name: "Özel banyo ve tek kişilik oda 2026'da ne kadar fark yaratır?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "2026'da tek kişilik oda için haftalık +170 €, özel banyolu tek kişilik oda için haftalık +270 € ek ücret uygulanır. Bu farklar konaklama türüne eklenir ve toplam paket fiyatını doğrudan yükseltir.",
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta'da kaç hafta eğitim almak mantıklı? (1 ay / 3 ay / 6 ay)",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hedefe göre: 4–8 hafta hızlanma ve pratik başlangıcı, 12–16 hafta seviye atlama ve akıcılık, 24 hafta+ uzun dönem ritim ve daha düşük haftalık maliyet sağlar. 2026 planında kritik olan, sezon aralığına denk gelip gelmediğin ve konaklama tipinin bütçeyi nasıl çektiğidir.',
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta'da programlar neler ve hangisi kime uygun?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Atlas Malta’da Genel İngilizce, İş İngilizcesi, Akademik Yıl Programı ve Mini Grup İngilizce seçenekleri bulunur. Genel İngilizce temel becerileri geliştirir, İş İngilizcesi profesyonel iletişimi güçlendirir, Akademik Yıl uzun dönem planlayanlara uygundur, Mini Grup ise küçük sınıf ortamında daha yoğun takip sağlar.',
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta'da ders seviyesi nasıl belirleniyor?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Seviye, başlangıçtaki placement/oryantasyon sürecinde belirlenir. Sınıf dağılımları öğrencilerin seviyelerine ve program türlerine göre yapılır; milliyete göre ayrım yapılmaz. Bu yapı, sınıf içi dengeyi ve öğrenme hızını korur.",
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta'da sosyal aktiviteler ücretli mi, ücretsiz mi?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "2026 boyunca Atlas Malta'da sosyal/kültürel aktiviteler vardır; bazıları ücretsiz, bazıları ücretli olabilir (ulaşım, giriş bileti, tur bedeli gibi). Etkinlik programı her hafta Pazartesi yayınlanır.",
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta kayıt süreci 2026'da nasıl işler?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "2026'da kayıt akışı pratikte şudur: program ve süre seçimi → online ön kayıt → uygunluk ve fiyat onayı → resmi kayıt ve ödeme → konaklama ve seyahat hazırlığı. Program ve başlangıç tarihine göre adımlar değişebilir ama temel mantık önce uygunluk, sonra resmi kayıttır.",
            },
          },
          {
            '@type': 'Question',
            name: "Atlas Malta'da çalışmak mümkün mü?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Atlas Malta’da eğitim alırken çalışma konusu okuldan çok Malta’nın güncel kuralları ve öğrencinin vize statüsüne bağlıdır. Bu nedenle 2026 koşullarını, eğitim süresi ve vize türüne göre kayıt aşamasında netleştirmek gerekir.",
            },
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/atlas-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp',
        width: 1200,
        height: 630,
        name: 'Atlas Malta Dil Okulu kampüs ve sınıf ortamı',
        caption: 'Atlas Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Pembroke bölgesinde İngilizce eğitimi',
        description: 'Atlas Malta Dil Okulu 2026: Kampüs, sınıflar, konaklama seçenekleri ve öğrenci deneyimi',
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#fiyat-tablosu',
        name: 'Atlas Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)',
        description: 'Atlas Malta Dil Okulu 2026 yılı için konaklama dahil paket fiyatları tablosu',
        about: 'Atlas Malta fiyatları, eğitim süresi ve konaklama tipine göre değişen 2026 paket fiyatları',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/atlas-malta/#konaklama-listesi',
        name: 'Atlas Malta Konaklama Türleri',
        description: 'Atlas Malta Dil Okulu konaklama seçenekleri: öğrenci apartmanı, aile yanı, paylaşımlı daireler',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Atlas Öğrenci Apartmanı (Student Apartments)',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Atlas Aile Yanı Konaklama (Host Family / Homestay)',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Atlas Paylaşımlı Daireler (Shared Apartments / Student Houses)',
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
                  <strong>Atlas Malta Dil Okulu</strong>: <strong>2026</strong> <strong>Fiyatları ve Programlar</strong>
                </h1>
                <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed" itemProp="description">
                  <p>
                    <strong>Atlas Malta Dil Okulu (2026)</strong>, Malta'da <strong>İngilizce eğitimi</strong> almak isteyen öğrenciler için <strong>modern kampüsü</strong>, <strong>merkezi konumu</strong> ve <strong>güçlü sosyal ortamıyla</strong> öne çıkan okullardan biridir. <strong>Atlas Malta</strong>'da <strong>Genel İngilizce</strong>, <strong>Yoğun İngilizce</strong> ve <strong>IELTS hazırlık</strong> gibi programlar bulunur; dersler <strong>uluslararası sınıflarda</strong> ilerlediği için öğrenciler gün içinde doğal şekilde pratik yapma şansı yakalar.
                  </p>
                  <p>
                    Bu sayfada <strong>Atlas Malta 2026 güncel fiyatlarını</strong>, <strong>kurs seçeneklerini</strong> ve <strong>konaklama tipine göre</strong> toplam maliyetin nasıl değiştiğini net şekilde görebilirsin. Böylece kayıt aşamasına gelmeden önce bütçeni doğru planlar, sürpriz masraf yaşamadan <strong>Atlas Malta</strong>'nın sana uygun olup olmadığını kolayca anlayabilirsin.
                  </p>
                </div>
                <div className="text-sm text-slate-600 mt-6">
                  Son kontrol: <time dateTime={lastUpdated} className="font-semibold">{lastUpdated}</time> • fiyatları ve program bilgileri
                  günceldir.
                </div>
              </div>

              {/* Sağ Kolon - Form Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-emerald-500">
                {/* Logo */}
                <div className="text-center mb-4">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/atlas-logo.webp"
                    alt="Atlas Malta dil okulu logosu"
                    width={200}
                    height={60}
                    className="mx-auto"
                    unoptimized
                  />
                  <div className="mt-4 border-t-2 border-emerald-500"></div>
                </div>

                {/* Form Başlık ve Açıklama */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
                  Atlas Malta 2026 Fiyat ve Program Bilgi Formu
                </h2>
                <p className="text-center mb-6 text-slate-700 text-sm">
                  Atlas Malta Dil Okulu'nun 2026 yılına ait güncel fiyatlarını, program türlerini ve toplam maliyet detaylarını öğrenin.
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
                      className="w-full rounded-lg border-2 border-emerald-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
                      className="w-full rounded-lg border-2 border-emerald-400 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Atlas%20Malta%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md"
                  >
                    Atlas Malta 2026 Fiyatlarını Göster
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
                    Atlas Malta Bilgileri
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#atlas-malta-fiyatlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          1
                        </span>
                        <span className="leading-relaxed">Atlas Malta Dil Okulu 2026 Güncel Fiyatları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#atlas-malta-programlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          2
                        </span>
                        <span className="leading-relaxed">Atlas Malta Dil Okulu Programları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#atlas-malta-konaklama"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          3
                        </span>
                        <span className="leading-relaxed">Atlas Malta Konaklama Türleri</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#atlas-malta-aktiviteler"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          4
                        </span>
                        <span className="leading-relaxed">Atlas Malta Sosyal Aktiviteleri</span>
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
                        href="#atlas-malta-deneyim"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          5
                        </span>
                        <span className="leading-relaxed">Atlas Malta'da Bir Öğrencinin Günü</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#atlas-malta-kayit"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          6
                        </span>
                        <span className="leading-relaxed">Atlas Malta Dil Okulu Kayıt Süreci</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#atlas-malta-vize"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          7
                        </span>
                        <span className="leading-relaxed">Atlas Malta Dil Okulu ve Vize Durumu</span>
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
                        <span className="leading-relaxed">Atlas Malta Kimler İçin Uygun / Uygun Değil?</span>
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
                        href="#atlas-malta-faq"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          9
                        </span>
                        <span className="leading-relaxed">Atlas Malta Dil Okulu Hakkında En Çok Sorulan Sorular</span>
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
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-dil-okulu-kampus-sinif-ortami-programlar-fiyatlar.webp"
                  alt="Atlas Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Pembroke bölgesinde İngilizce eğitimi"
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
                Atlas Malta Dil Okulu kampüs, sınıf ortamı, programlar ve fiyatlar - Pembroke bölgesinde İngilizce eğitimi
              </figcaption>
              <meta itemProp="name" content="Atlas Malta Dil Okulu kampüs ve sınıf ortamı" />
              <meta itemProp="description" content="Atlas Malta Dil Okulu 2026: Pembroke bölgesinde kampüs, sınıf ortamı, programlar ve güncel fiyatlar hakkında detaylı bilgi" />
            </figure>
          </div>
        </section>

        {/* Fiyatlar Bölümü */}
        <section className="bg-white py-12" id="atlas-malta-fiyatlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Atlas Malta Dil Okulu 2026 Güncel Fiyatları
            </h2>
            
            {/* H2 Alt Açıklama Paragrafı (Snippet Odaklı) */}
            <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-4 speakable-ec-fiyatlar">
              <p>
                <strong>Atlas Malta fiyatları</strong> <strong>2026</strong> yılında <strong>kurs türü</strong> ve <strong>eğitim süresine</strong> göre değişir; <strong>4–24 hafta</strong> arası programlar için kurs fiyatları tabloda yer alır.
              </p>
              <p>
                Bu sayfa <strong>Atlas Malta kurs fiyatlarını</strong> anlatır; tablodaki tutarlar seçilen kurs türü ve hafta sayısına göre belirlenir ve <strong>2026</strong> eğitim dönemi için geçerlidir.
              </p>
              <p>
                <strong>Atlas Malta fiyatları</strong> kurs türüne göre değişir; en düşük fiyat <strong>4 haftalık Genel İngilizce (GE20)</strong> programında <strong>1.680 €</strong> olarak görülür.
              </p>
              <p>
                Fiyatlar eğitim süresi uzadıkça artar; <strong>24 haftalık</strong> programlarda toplam maliyet kurs türüne göre <strong>10.080 €</strong> ile <strong>16.200 €</strong> arasında değişir.
              </p>
            </div>

            {/* Hızlı Cevap / Özet Satırı (Snippet Boost) */}
            <p className="text-base md:text-lg font-semibold text-slate-900 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 pl-4 py-2">
              Kısaca: <strong>2026</strong> yılı için <strong>Atlas Malta fiyatları</strong>, en düşük <strong>1.680 €</strong> ile başlar; kurs türü ve süreye göre değişen fiyatlar aşağıdaki tabloda yer alır.
            </p>
            
            {/* Fiyat Tablosu */}
            <div className="mb-6">
              <div className="overflow-x-auto relative" role="region" aria-label="Atlas Malta fiyat tablosu">
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full pointer-events-none hidden md:block z-10" aria-hidden="true"></div>
                <div className="md:hidden text-xs text-slate-500 mb-2 text-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded px-2 py-1">
                  ← → Kaydırarak tüm sütunları görebilirsin
                </div>
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm min-w-[1000px]" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">Atlas Malta fiyatları 2026 - Kurs türüne göre fiyat tablosu</caption>
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b border-slate-200 sticky left-0 z-20 bg-slate-50 md:bg-slate-50">Kurs Türü</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">4 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">6 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">8 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">12 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">16 Hafta</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 border-b border-slate-200">24 Hafta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-emerald-50/30">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Genel İngilizce (GE20)</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€1.680</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€2.520</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€3.360</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€5.040</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€6.720</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€10.080</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-emerald-50/30">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Genel İngilizce Plus (GE26)</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€1.880</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€2.820</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€3.760</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€5.640</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€7.520</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€11.280</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-emerald-50/30">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Yoğun İngilizce (GE26INT)</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€2.700</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€4.050</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€5.400</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€8.100</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€10.800</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€16.200</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-emerald-50/30">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">IELTS / Cambridge Hazırlık (FCE20/CAE20)</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€1.780</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€2.670</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€3.560</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€5.340</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€7.200</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-slate-700">€10.800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablo Altı Mikro Açıklama */}
            <p className="text-sm text-slate-600 mb-8 text-center">
              <strong>Atlas Malta fiyatları</strong> <strong>2026</strong> yılı için geçerlidir; en düşük fiyat <strong>4 haftalık Genel İngilizce (GE20)</strong> programına aittir. Tablodaki tutarlar kurs fiyatlarıdır; konaklama ve ek ücretler dahil değildir.
            </p>

            {/* Fiyat Hesaplama */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Atlas Malta için Tahmini Paket Fiyatını Hesapla (2026)
              </h3>
              <p className="text-base text-slate-700 mb-6">
                Hesaplama, yukarıdaki tablodaki <strong>Atlas Malta paket fiyatlarını</strong> esas alır; tahmini toplam maliyet gösterilir.
              </p>
              <PriceCalculator />
            </div>

            {/* Internal Link */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-base text-slate-700">
                Atlas Malta dışındaki okulların fiyatlarını da incelemek istersen, detaylı karşılaştırma için{' '}
                <Link href="/malta-dil-okulu-fiyatlari" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline">
                  Malta Dil Okulu Fiyatları
                </Link>{' '}
                sayfamıza göz atabilirsin.
              </p>
            </div>

            {/* Dahil Olanlar */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Atlas Malta Her Şey Dahil Paket Fiyatlarına Neler Dahil?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Fiyata Dahil Olanlar</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    Atlas Malta <strong>2026</strong> her şey dahil paket fiyatlarına aşağıdaki hizmetler dahildir:
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Atlas Malta Dil Okulu Fiyatı Hesaplamasında Dikkat Edilenler (2026)</h3>
              <p>
                <strong>Atlas Malta Dil Okulu</strong> <strong>2026</strong> paket fiyatları, eğitim süresi ve konaklama tipine göre belirlenir; fiyatlar <strong>4–24 hafta</strong> arası programlar için geçerlidir.
              </p>
              <p>
                Paket ücretlerine <strong>kurs</strong> ve <strong>ilk kurs kitapları</strong> dahildir; sonraki her seviye için <strong>40 €</strong> ek kitap ücreti okulda ödenir.
              </p>
              <p>
                <strong>Yoğun İngilizce</strong> seçeneğinde haftalık <strong>+60 €</strong> fark uygulanır.
              </p>
              <p>
                Konaklama tercihlerine göre haftalık ek farklar uygulanır: <strong>tek kişilik oda +170 €</strong>, <strong>özel banyolu tek kişilik oda +270 €</strong>.
              </p>
              <p>
                Yaz sezonu <strong>14/06/2026 – 06/09/2026</strong> tarihleri arasındadır; bu tarihler arasında kalan haftalar için <strong>kurs +50 €</strong> ve <strong>konaklama +50 €</strong> olmak üzere yaz sezon farkı eklenir.
              </p>
              <p>
                <strong>12 hafta ve üzeri</strong> kayıtlarda yaz sezon farkı alınmaz.
              </p>
              <p>
                Tüm konaklamalarda <strong>100 €</strong> depozito alınır; konaklamadan ayrılırken iade edilir.
              </p>
              <p>
                Dönüş transferi okul üzerinden ayarlanırsa <strong>40 €</strong>'dur.
              </p>
            </div>
          </div>
        </section>

        {/* Programlar Bölümü */}
        <section className="bg-slate-50 py-12" id="atlas-malta-programlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Atlas Malta Dil Okulu Programları (Hangisi Sana Uygun?)
            </h2>
            <div className="speakable-ec-programlar">
            
            {/* H2 Alt Açıklama Paragrafı */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              <strong>Atlas Malta programları</strong> süre, ders yoğunluğu ve hedefe göre ayrılır; her program farklı öğrenci ihtiyaçlarına yöneliktir. Program seçimi, <strong>Atlas Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Bu program türü, <strong>Atlas Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>Atlas Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  Bu program türü, <strong>Atlas Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>Atlas Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-dil-okulu-programlara-dahil-temel-hizmetler.webp"
                  alt="Atlas Malta dil okulu kampüs ve programlara dahil temel hizmetler - Pembroke"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg mb-4"
                  style={{ minHeight: '400px', maxHeight: '600px' }}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  itemScope
                  itemType="https://schema.org/ImageObject"
                />
                <meta itemProp="name" content="Atlas Malta dil okulu kampüs ve programlara dahil temel hizmetler" />
                <meta itemProp="description" content="Atlas Malta Dil Okulu 2026: Pembroke bölgesinde kampüs ve programlara dahil temel hizmetler hakkında detaylı bilgi" />
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Atlas Malta Dil Okulu Kampüs İmkânları</h3>
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
        <section className="bg-white py-12" id="atlas-malta-konaklama">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Atlas Malta Konaklama Türleri – Okula Uzaklık ve Konfor Karşılaştırması
            </h2>
            <div className="speakable-ec-konaklama">
            <p className="text-lg text-slate-700 mb-8">
              Atlas Malta'da sunulan konaklama seçenekleri; okula uzaklık, yaşam tarzı ve konfor beklentisine göre farklılık gösterir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Atlas Öğrenci Apartmanı */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-emerald-300 pb-2">Atlas Öğrenci Apartmanı (Student Apartments)</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                    <span className="text-sm text-slate-600">Atlas'ın öğrenci apartmanları Swieqi / Pembroke bölgelerinde yer alır; okula yürüme mesafesinde konforlu konaklama sunar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-600">15–20 dk yürüyüş mesafesinde.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                    <span className="text-sm text-slate-600">Tam donanımlı paylaşımlı apart ortamı; modern mutfak, oturma alanı ve öğrencilerle sosyalleşme imkânı sunar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                    <span className="text-sm text-slate-600">Uluslararası öğrencilerle birlikte yaşama, bağımsız yaşam tarzı ve ders sonrası sosyal çevre imkânı sağlar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                    <span className="text-sm text-slate-600">Özgür yaşam isteyen, konforlu ortak alanlarla birlikte uluslararası öğrenci ortamında kalmak isteyenler.</span>
                  </div>
                </div>
              </div>
              
              {/* Atlas Aile Yanı Konaklama */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-emerald-300 pb-2">Atlas Aile Yanı Konaklama (Host Family / Homestay)</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                    <span className="text-sm text-slate-600">Atlas tarafından seçilmiş Malta aileleri yanında konaklama; genellikle Swieqi ve St. Julian's çevresi.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-600">Konaklama bölgesine göre değişir; çoğu aile okula toplu taşıma / yürüyüş mesafesindedir.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                    <span className="text-sm text-slate-600">Ev ortamı; aile ile birlikte günlük yaşam ve kültüre doğrudan katılım sağlar.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                    <span className="text-sm text-slate-600">Yerel yaşam tarzını deneyimleme ve İngilizceyi doğal ortamda pratik etme olanağı verir.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                    <span className="text-sm text-slate-600">Daha düzenli ortam isteyen, İngilizceyi günlük yaşamda pratik etmek isteyen öğrenciler.</span>
                  </div>
                </div>
              </div>
              
              {/* Atlas Paylaşımlı Daireler */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-emerald-300 pb-2">Atlas Paylaşımlı Daireler (Shared Apartments / Student Houses)</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Konum</span>
                    <span className="text-sm text-slate-600">St. Julian's, Swieqi ve çevresindeki paylaşımlı daireler; okula yürüyüş veya kısa toplu taşıma ile ulaşım.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Okula ortalama uzaklık (dakika)</span>
                    <span className="text-sm text-slate-600">Yaklaşık 15–25 dk (konuma göre).</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Yaşam tarzı</span>
                    <span className="text-sm text-slate-600">Birden fazla öğrenci ile paylaşılan daire; tamamen mobilyalı ve modern ekipmanlı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Avantaj</span>
                    <span className="text-sm text-slate-600">Bütçe dostu, sosyal bir yaşam imkânı; okul ve çevrede sosyalleşme kolaylığı.</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 block mb-1">Kimler için uygun?</span>
                    <span className="text-sm text-slate-600">Bütçe / sosyallik dengesi arayan, ev ortamını paylaşmayı tercih eden öğrenciler.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Atlas Malta Konaklama Fiyatlarını Etkileyen Faktörler (2026)</h3>
              <p className="text-slate-700">
                <strong>2026 yılında Atlas Malta konaklama fiyatları, yaz sezonunda artan talep nedeniyle haftalık bazda yükselebilir.</strong> Okula yakınlık ve oda tipi (tek kişilik, paylaşımlı veya özel banyolu) toplam maliyeti doğrudan etkiler. Uzun dönem konaklamalarda haftalık birim maliyet düşerken, kısa süreli programlarda sezon farkı daha belirgin hale gelir.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler Bölümü */}
        <section className="bg-slate-50 py-12" id="atlas-malta-aktiviteler">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              Atlas Malta Sosyal Aktiviteleri ve Öğrenci Deneyimi (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center">
              Atlas Malta'da ders dışı etkinlikler, yeni arkadaşlıklar kurmak ve İngilizce pratiğini hızlandırmak için güçlü bir avantaj sağlar. Aşağıdaki etkinlikler, okulun haftalık sosyal programında en sık karşılaşılan deneyimleri özetler.
            </p>
            
            {/* Aktiviteler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-hos-geldin-etkinligi-orientation.webp"
                  alt="Atlas Malta hoş geldin etkinliği ve oryantasyon"
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
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-sosyal-program-haftalik-etkinlik-akisi.webp"
                  alt="Atlas Malta haftalık sosyal program etkinlikleri"
                  width={480}
                  height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Atlas Sosyal Programı (Haftalık Etkinlik Akışı)</h3>
                  <p className="text-slate-700 text-sm">Atlas Malta'nın haftalık sosyal programı, yeni arkadaşlık kurmanı ve ders dışında İngilizce pratik yapmanı hızlandırır.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-ingilizce-dil-etkinlikleri-atolyeler.webp"
                  alt="Atlas Malta İngilizce dil etkinlikleri ve atölye çalışmaları"
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
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-sehir-turlari-kulturel-gezi-programlari.webp"
                  alt="Atlas Malta şehir turları ve kültürel gezi programları"
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
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-tekne-turlari-deniz-aktiviteleri.webp"
                  alt="Atlas Malta tekne turları ve deniz aktiviteleri"
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
                  src="/malta-dil-okullari/atlas-malta/atlas-malta-mezuniyet-kapanis-etkinligi.webp"
                  alt="Atlas Malta mezuniyet ve kapanış etkinliği"
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
              2026 boyunca Atlas Malta'da sosyal aktiviteler ve etkinlik programı her hafta Pazartesi yayınlanır; bazı aktiviteler ücretsiz, bazıları ücretli olabilir.
            </p>
          </div>
        </section>

        {/* Öğrenci Deneyimi Bölümü */}
        <section className="bg-white py-12" id="atlas-malta-deneyim" itemScope itemType="https://schema.org/VideoObject">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" itemProp="name">
              Atlas Malta'da Bir Öğrencinin Günü – Gerçek Deneyim (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8" itemProp="description">
              Atlas Malta'da 2026 yılı boyunca eğitim alan öğrenciler, sınıf içi İngilizce derslerini sosyal aktiviteler ve günlük yaşam pratiğiyle birleştirir. Aşağıdaki videoda, Atlas Malta'da eğitim alan bir öğrencinin ders ortamını, okul atmosferini ve Malta'daki günlük öğrenci deneyimini gerçek haliyle izleyebilirsiniz.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" itemScope itemType="https://schema.org/VideoObject">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/CMbUvQdH2OI"
                    title="Atlas Malta Öğrenci Deneyimi (2026)"
                    aria-label="Atlas Malta Öğrenci Deneyimi (2026)"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    itemProp="embedUrl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerçek Öğrenci Deneyimi – Atlas Malta Dil Okulu</h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Bu video, Atlas Malta Dil Okulu'nda eğitim alan bir öğrencinin tipik bir gününü yansıtmaktadır. Ders içeriği, sınıf ortamı ve okulun sosyal yapısı, öğrencilerin İngilizceyi yalnızca derslerde değil günlük yaşamda da aktif olarak kullanmasını hedefler.
                  </p>
                  <p>
                    Atlas Malta'da öğrenciler, farklı milletlerden katılımcılarla uluslararası bir ortamda eğitim alır. 2026 yılı boyunca okulda düzenlenen sosyal ve kültürel aktiviteler, öğrencilerin hem Malta'yı tanımasına hem de İngilizce pratiğini hızlandırmasına katkı sağlar.
                  </p>
                  <p>
                    Bu deneyim, Atlas Malta Dil Okulu'nun yalnızca akademik değil, aynı zamanda sosyal gelişimi de önemseyen eğitim yaklaşımını göstermektedir.
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
                Türk Öğrenciler için Atlas Malta Deneyimi (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Atlas Malta Dil Okulu'nda 2026 yılı boyunca Türk öğrenciler aktif olarak eğitim almaktadır. Okul, sınıflarda milliyet dengesini koruyarak Türk öğrencilerin İngilizce pratiğini maksimum seviyede tutmayı hedefler.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler Ne Beklemeli?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Atlas Malta'da Türk öğrenciler bulunur ancak sınıflar uluslararası dengede oluşturulur</span>
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
                Not: Atlas Malta'da sınıf dağılımları, öğrencilerin milliyetlerine göre değil seviyelerine ve program türlerine göre yapılır.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Atlas Malta Dil Okulu – Türkiye Resmi Temsilcisi</h3>
                <p className="text-slate-700 mb-4">
                  Atlas Malta Dil Okulu'nun Türkiye resmi temsilcisi olarak, 2026 yılı boyunca kayıt, fiyatlandırma, konaklama ve vize süreçlerinde öğrencilere birebir destek sağlıyoruz. Tüm bilgiler güncel Atlas Malta programları ve resmi fiyatlar üzerinden paylaşılır.
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
                Atlas Malta Dil Okulu Öğrenci Profili (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Atlas Malta Dil Okulu'nda 2026 yılı boyunca farklı ülkelerden ve yaş gruplarından öğrenciler eğitim almaktadır. Aşağıdaki dağılımlar, okulun uluslararası yapısını ve Türk öğrenciler için ortamı net şekilde gösterir.
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
                    Atlas Malta'da 2026 yılında öğrencilerin büyük bölümü 18–35 yaş aralığındadır; ancak uzun dönem ve kariyer odaklı programlarda daha olgun yaş grupları da yer almaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kayıt Süreci Bölümü */}
        <section className="bg-slate-50 py-12" id="atlas-malta-kayit">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Atlas Malta Dil Okulu Kayıt Süreci (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              Atlas Malta kayıt süreci <strong>2026</strong> yılında ağırlıklı olarak <strong>online</strong> yürütülür; adayın program seçimi, planlanan süre ve kontenjan durumuna göre süreç adımları netleşir ve kayıt takvimi buna göre ilerler.
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
                  Atlas Malta Dil Okulu kayıt süreci <strong>2026</strong> yılında <strong>online</strong> yürütülür; adımlar program türü ve eğitim süresine göre değişiklik gösterebilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kayıt Sürecinde ve Eğitim Boyunca Yanındayız</h3>
                <p className="text-slate-700 mb-6">
                  Atlas Malta kayıt sürecinden eğitim bitimine kadar, öğrencilerimize rehberlik ve danışmanlık desteği sunuyoruz.
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
        <section className="bg-white py-12" id="atlas-malta-vize">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Atlas Malta Dil Okulu ve Vize Durumu (2026)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Yeşil Pasaport Sahipleri İçin Atlas Malta</h3>
                <p className="text-slate-700">
                  2026 yılında yeşil pasaport sahibi Türk vatandaşları, Atlas Malta dil eğitimi programlarında 90 güne kadar vize başvurusu yapmadan Malta'da kalabilir. Bu süre, kısa dönem dil eğitimi planlayan öğrenciler için kayıt sürecini hızlandırır ve ek vize evrakı gerektirmez. Eğitim süresi 90 günü aştığında, yeşil pasaport sahipleri için de Malta öğrenci vizesi gerekliliği doğar ve başvuru süreci eğitim süresine göre planlanır.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bordo Pasaport Sahipleri İçin Atlas Malta</h3>
                <p className="text-slate-700">
                  Bordo pasaport sahibi öğrenciler için Atlas Malta dil eğitimi programlarında vize gerekliliği, seçilen eğitim süresine göre belirlenir. Kısa dönem ve uzun dönem programlarda başvuru süreçleri ve istenen belgeler farklılık gösterebilir. Kayıt aşamasında eğitim süresine uygun vize türü netleştirilir ve bordo pasaportlu öğrenciler için vize sürecinde bilgilendirme ve yönlendirme desteği sağlanır.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8">
              Atlas Malta dil eğitimi programlarında vize şartları, pasaport türü ve eğitim süresine göre değişebilir; kayıt planlaması yapılırken güncel kurallar dikkate alınmalıdır. Malta öğrenci vizesi başvuru şartları, güncel evrak listesi ve süreç detaylarıyla ilgili kapsamlı bilgiye{' '}
              <Link href="/malta-ogrenci-vizesi" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Malta öğrenci vizesi rehberimizden
              </Link>{' '}
              ulaşabilirsin.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Atlas Malta Dil Okulu İçin Ücretsiz Vize Danışmanlığı (2026)</h3>
              <p className="text-slate-700 mb-4">
                Atlas Malta Dil Okulu'na kayıt sürecinde vize, pasaport türü ve eğitim süresine göre değişkenlik gösterebilir. Bordo ve yeşil pasaport sahipleri için güncel vize gerekliliklerini, evrak sürecini ve doğru başvuru yolunu ücretsiz olarak değerlendiriyoruz.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Atlas Malta özelinde güncel vize bilgisi</span>
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
                Atlas Malta Dil Okulu İçin Vize Bilgisi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Bölümü */}
        <section className="bg-white py-12" id="uygunluk">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              <strong>Atlas Malta</strong> Kimler İçin Uygun / Kimler İçin Uygun Değil?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>✓</span>
                  <strong>Atlas Malta</strong> Kimler İçin Uygun?
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
                  <strong>Atlas Malta</strong> Kimler İçin Uygun Değil?
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
        <section className="bg-slate-50 py-12" id="atlas-malta-faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
                Atlas Malta Dil Okulu Hakkında En Çok Sorulan Sorular (2026)
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta Dil Okulu 2026 fiyatları neye göre değişir?</span>
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
                      Atlas Malta 2026 paket fiyatı; eğitim süresi (4–24 hafta), program yoğunluğu (Yoğun İngilizce için haftalık +60 €), konaklama türü (öğrenci apartmanı / aile yanı / paylaşımlı daire) ve oda tipine göre değişir. Kurs ve ilk kitaplar dahildir; sonraki seviye için 40 € kitap ücreti alınır. Yaz sezonu farkı toplam maliyeti artırabilir.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">2026 yüksek sezon farkı ne zaman uygulanır?</span>
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
                      Yaz sezonu 14/06/2026 – 06/09/2026 arasındadır. Bu tarihlerde kurs için haftalık +50 € ve konaklama için haftalık +50 € sezon farkı eklenir. 12 hafta ve üzeri kayıtlarda yaz sezon farkı alınmaz.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta'da konaklama seçimi bütçeyi nasıl etkiler?</span>
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
                      Konaklama bütçeyi doğrudan etkiler: okula yakınlık, konaklama türü ve oda tipi toplam maliyeti belirler. Öğrenci apartmanı, aile yanı ve paylaşımlı daire seçenekleri farklı fiyat seviyeleri sunar; tek kişilik ve özel banyolu oda ek ücret getirir. Tüm konaklamalarda 100 € depozito alınır ve çıkışta iade edilir.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Özel banyo ve tek kişilik oda 2026'da ne kadar fark yaratır?</span>
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
                      2026'da tek kişilik oda için haftalık +170 €, özel banyolu tek kişilik oda için haftalık +270 € ek ücret uygulanır. Bu farklar konaklama türüne eklenir ve toplam paket fiyatını doğrudan yükseltir.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta'da kaç hafta eğitim almak mantıklı? (1 ay / 3 ay / 6 ay)</span>
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
                      Hedefe göre: 4–8 hafta hızlanma ve pratik başlangıcı, 12–16 hafta seviye atlama ve akıcılık, 24 hafta+ uzun dönem ritim ve daha düşük haftalık maliyet sağlar. 2026 planında kritik olan, sezon aralığına denk gelip gelmediğin ve konaklama tipinin bütçeyi nasıl çektiğidir.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta'da programlar neler ve hangisi kime uygun?</span>
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
                      Atlas Malta’da Genel İngilizce, İş İngilizcesi, Akademik Yıl Programı ve Mini Grup İngilizce seçenekleri bulunur. Genel İngilizce temel becerileri geliştirir, İş İngilizcesi profesyonel iletişimi güçlendirir, Akademik Yıl uzun dönem planlayanlara uygundur, Mini Grup ise küçük sınıf ortamında daha yoğun takip sağlar.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta'da ders seviyesi nasıl belirleniyor?</span>
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
                      Seviye, başlangıçtaki placement/oryantasyon sürecinde belirlenir. Sınıf dağılımları öğrencilerin seviyelerine ve program türlerine göre yapılır; milliyete göre ayrım yapılmaz. Bu yapı, sınıf içi dengeyi ve öğrenme hızını korur.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta'da sosyal aktiviteler ücretli mi, ücretsiz mi?</span>
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
                      2026 boyunca Atlas Malta'da sosyal/kültürel aktiviteler vardır; bazıları ücretsiz, bazıları ücretli olabilir (ulaşım, giriş bileti, tur bedeli gibi). Etkinlik programı her hafta Pazartesi yayınlanır.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta kayıt süreci 2026'da nasıl işler?</span>
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
                      2026'da kayıt akışı pratikte şudur: program ve süre seçimi → online ön kayıt → uygunluk ve fiyat onayı → resmi kayıt ve ödeme → konaklama ve seyahat hazırlığı. Program ve başlangıç tarihine göre adımlar değişebilir ama temel mantık önce uygunluk, sonra resmi kayıttır.
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
                  <span className="font-semibold text-slate-900 pr-4" itemProp="name">Atlas Malta'da çalışmak mümkün mü?</span>
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
                      Atlas Malta’da eğitim alırken çalışma konusu okuldan çok Malta’nın güncel kuralları ve öğrencinin vize statüsüne bağlıdır. Bu nedenle 2026 koşullarını, eğitim süresi ve vize türüne göre kayıt aşamasında netleştirmek gerekir.
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
                Bu sayfadaki bilgiler; <strong>Atlas Malta Dil Okulu</strong>'nun resmi kaynakları, <strong>2026 güncel fiyat listeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak hazırlanmış ve düzenli olarak güncellenmektedir.
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
