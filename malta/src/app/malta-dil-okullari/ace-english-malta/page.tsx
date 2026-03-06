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
    'Öğrenci Apt. (20 Ders)': {
      '4': '1495€',
      '6': '2155€',
      '12': '3775€',
      '24': '7375€',
    },
    'Öğrenci Apt. (30 Ders)': {
      '4': '1895€',
      '6': '2775€',
      '12': '4455€',
      '24': '8535€',
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
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
            Konaklama & Ders
          </label>
          <select
            id="calc-accommodation"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Seçiniz</option>
            <option>Öğrenci Apt. (20 Ders)</option>
            <option>Öğrenci Apt. (30 Ders)</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-green-600 px-6 py-2 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Hesapla
          </button>
        </div>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-semibold text-green-900">{result}</p>
          <p className="text-sm text-green-700 mt-2">
            Bu tutar, yukarıdaki 2026 her şey dahil paket fiyat tablosu baz alınarak gösterilmektedir.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ACEEnglishMaltaPage() {
  const school = getSchoolBySlug('ace-english-malta');
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
    const baseMessage = 'Merhaba, ACE English Malta hakkında bilgi almak istiyorum.';
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta',
        name: 'ACE English Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'ACE English Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması. AI Overview uyumlu hızlı yanıtlar.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#article',
        headline: 'ACE English Malta Dil Okulu | 2026 Fiyatları ve Karar Rehberi',
        description:
          'ACE English Malta Dil Okulu ve 2026 fiyatları için tarafsız karar rehberi: seçim metodolojisi, programlar, uygunluk ve maliyet okuması.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/ace-english-malta-kampus.webp',
            width: 1200,
            height: 630,
            name: 'ACE English Malta Dil Okulu Kampüs 2026',
            caption: 'ACE English Malta Dil Okulu kampüs görünümü ve öğrenci yaşam alanları',
            description: 'ACE English Malta Dil Okulu 2026: Kampüs, sınıflar, konaklama seçenekleri ve öğrenci deneyimi',
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#breadcrumb',
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
            name: 'ACE English Malta',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta',
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
            name: 'ACE English Malta 20 Ders Programı',
            description: 'ACE English Malta 20 ders programı - Genel İngilizce kursu',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
          },
          {
            '@type': 'Offer',
            name: 'ACE English Malta 30 Ders Programı',
            description: 'ACE English Malta 30 ders programı - Yoğun İngilizce kursu',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'ACE English Malta Kurs Programları',
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'ACE English Malta nerede? St. Julian\'s\'ta hangi bölgede?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta (ACE Malta), Malta\'nın St. Julian\'s bölgesinde konumlanır. St. Julian\'s; kafe, sosyal yaşam ve ulaşım açısından Malta\'nın en merkezi noktalarından biridir. Bu konum, öğrencilerin ders sonrası İngilizce pratiğini günlük hayata daha kolay taşımasına yardımcı olur.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE Malta\'da kaç hafta eğitim almak mantıklı? (4 / 8 / 12 / 24 hafta)',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta\'da eğitim süresi hedefe göre seçilmelidir: 4 hafta kısa bir başlangıç ve adaptasyon için, 8–12 hafta düzenli gelişim için, 24 hafta ise kalıcı ilerleme ve rutin pratik için daha uygundur. Türkiye\'den giden öğrenciler için en verimli aralık genelde 8–12 haftadır. Süre uzadıkça günlük pratik ve sınıf içi ilerleme daha net hissedilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE English Malta\'da 20 ders mi 30 ders mi seçilmeli?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '20 ders programı daha dengeli bir tempo sunar; 30 ders programı ise daha yoğun ve hızlandırılmış ilerleme hedefleyen öğrenciler için uygundur. 30 ders seçeneğinde sınıf içi pratik ve öğretmen teması artar, ancak gün içinde daha fazla enerji ve disiplin gerekir. 2026\'da seçim yaparken hedef (konuşma / sınav / genel gelişim) ve günlük tempo mutlaka dikkate alınmalıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE Malta\'da dersler hangi gün başlıyor? Her pazartesi başlangıç var mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta\'da birçok programda başlangıç genellikle Pazartesi günüdür, ancak resmi başlangıçlar ve dönem yoğunluğu programa göre değişebilir. Kayıt planı yapılırken hedeflenen tarih, konaklama giriş-çıkış günleri ve vize süreci birlikte değerlendirilmelidir. En doğru başlangıç tarihini kayıt öncesinde netleştirmek gerekir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE English Malta konaklama seçenekleri neler? (apartman / aile yanı / otel)',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE Malta\'da konaklama seçenekleri genellikle öğrenci apartmanı, aile yanı ve hotel/residence gibi alternatiflerden oluşur. Apartmanlar daha bağımsız yaşam isteyenler için, aile yanı daha düzenli ve sakin bir rutin arayanlar için, hotel/residence ise konfor ve kolaylık isteyenler için uygundur. Seçim yapılırken bütçe kadar yaşam tarzı da belirleyici olmalıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE Malta\'da konaklamalar okula kaç dakika? Yürüyerek gidilir mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta\'da konaklama-okul mesafesi seçilen konaklama tipine ve bölgeye göre değişir. St. Julian\'s çevresindeki birçok konaklama seçeneğinde okula yürüyerek ulaşım mümkün olabilir; bazı seçeneklerde toplu taşıma gerekebilir. Türkiye\'den giden öğrenciler için plan yaparken günlük ulaşım süresi (dakika) özellikle önemlidir.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE English Malta\'da sınıflar kaç kişilik? Öğrenci profili nasıl?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta\'da sınıf mevcudu dönem yoğunluğuna göre değişebilir. Genel olarak sınıflar uluslararası öğrenci yapısıyla ilerler ve derslerde konuşma/iletişim pratiği ön plandadır. 2026 yılında da öğrenci profili sezonlara göre farklılaşabileceği için, sınıf ortamı ve dönem seçimi kayıt kararında dikkate alınmalıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE Malta\'da kitap/material gibi ek ücretler var mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta\'da bazı programlarda ders materyali/kitap ücretleri pakete dahil olabilir veya okulda ayrıca tahsil edilebilir; bu durum programa göre değişir. 2026 kayıt planı yapılırken toplam maliyet hesabına \'ek ücretler\' kalemi mutlaka dahil edilmelidir. Böylece sürpriz maliyet oluşmadan doğru bütçe yönetimi yapılır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE English Malta için Malta dil okulu vizesi nasıl işliyor?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu vizesi süreci; eğitim süresi, başvuru zamanı ve evrakların eksiksiz hazırlanmasına göre ilerler. ACE English Malta kaydı yapıldıktan sonra okul kabul belgesi ile vize başvurusu planlanır. Türkiye\'den başvuran öğrenciler için en kritik konu, eğitim başlangıç tarihine göre süreci erken başlatmaktır.',
            },
          },
          {
            '@type': 'Question',
            name: 'ACE English Malta öğrenci yorumları nasıl? Sosyal aktiviteler oluyor mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ACE English Malta\'da öğrenci deneyimi; sınıf ortamı, konaklama tercihi ve öğrencinin sosyal katılımına göre değişir. Okullarda sosyal ve kültürel etkinlikler dönemsel olarak planlanabilir; bazı etkinlikler ücretsiz, bazıları ücretli olabilir. Malta\'da İngilizce pratiğini hızlandırmak için ders dışı sosyal katılım önemli bir avantaj sağlar.',
            },
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/ace-english-malta-kampus.webp',
        width: 1200,
        height: 630,
        name: 'ACE English Malta Dil Okulu Kampüs 2026',
        caption: 'ACE English Malta Dil Okulu kampüs görünümü ve öğrenci yaşam alanları',
        description: 'ACE English Malta Dil Okulu 2026: Kampüs, sınıflar, konaklama seçenekleri ve öğrenci deneyimi',
      },
      {
        '@type': 'VideoObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#video',
        name: 'ACE English Malta Öğrenci Deneyimi (2026)',
        description: 'ACE English Malta Dil Okulu\'nda eğitim alan bir öğrencinin gün içindeki temel akışını gösteren video: ders başlangıcı, sınıf içi pratik, öğrencilerin derse katılımı ve genel okul düzeni. ACE Malta\'da derslerde iletişim ve konuşma pratiği ön plandadır.',
        thumbnailUrl: 'https://img.youtube.com/vi/e2qovXW-vm4/maxresdefault.jpg',
        uploadDate: '2026-01-01',
        contentUrl: 'https://www.youtube.com/watch?v=e2qovXW-vm4',
        embedUrl: 'https://www.youtube.com/embed/e2qovXW-vm4',
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#fiyat-tablosu',
        name: 'ACE English Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Dahil)',
        description: 'ACE English Malta Dil Okulu 2026 yılı için konaklama dahil paket fiyatları tablosu',
        about: 'ACE English Malta fiyatları, eğitim süresi ve konaklama tipine göre değişen 2026 paket fiyatları',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/ace-english-malta/#konaklama-listesi',
        name: 'ACE English Malta Konaklama Türleri',
        description: 'ACE English Malta Dil Okulu konaklama seçenekleri: öğrenci apartmanı, aile yanı, residence',
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
      {
        '@type': 'Course',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#course-20`,
        name: 'ACE English Malta 20 Ders Genel İngilizce Kursu',
        description: 'ACE English Malta 20 ders programı - Haftalık 20 ders Genel İngilizce eğitimi',
        provider: {
          '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        },
        courseCode: 'ACE-20',
        educationalLevel: 'Beginner to Advanced',
        teaches: 'English Language',
        inLanguage: 'en',
        coursePrerequisites: 'None',
      },
      {
        '@type': 'Course',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#course-30`,
        name: 'ACE English Malta 30 Ders Yoğun İngilizce Kursu',
        description: 'ACE English Malta 30 ders programı - Haftalık 30 ders Yoğun İngilizce eğitimi',
        provider: {
          '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}/#school`,
        },
        courseCode: 'ACE-30',
        educationalLevel: 'Beginner to Advanced',
        teaches: 'English Language',
        inLanguage: 'en',
        coursePrerequisites: 'None',
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
                  <strong>ACE English Malta Dil Okulu</strong>: <strong>2026</strong> <strong>Fiyatları ve Programlar</strong>
                </h1>
                <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed" itemProp="description">
                  <p>
                    <strong>ACE English Malta Dil Okulu (2026)</strong>, Malta'da İngilizce eğitimi almak isteyen öğrencilerin son yıllarda en çok araştırdığı okullardan biri. Özellikle St. Julian's bölgesindeki merkezi konumu, modern sınıfları ve dinamik okul atmosferiyle "sadece ders değil, gerçek hayatın içinde İngilizce" hedefleyen öğrenciler için güçlü bir tercih olarak öne çıkıyor.
                  </p>
                  <p>
                    ACE Malta'da eğitim; sınıf içindeki derslerin yanında Malta'daki günlük yaşamın içine karışmayı da içerir. Okulun çevresi öğrencilerin ders sonrası vakit geçirebileceği kafe, restoran ve sahil yürüyüş alanlarına yakındır. Bu nedenle ACE English Malta, Malta'da İngilizce öğrenirken aynı zamanda şehir hayatını da deneyimlemek isteyen öğrenciler tarafından sıkça tercih edilir.
                  </p>
                </div>
                <div className="text-sm text-slate-600 mt-6">
                  Son kontrol: <time dateTime={lastUpdated} className="font-semibold">{lastUpdated}</time> • fiyatları ve program bilgileri
                  günceldir.
                </div>
              </div>

              {/* Sağ Kolon - Form Card */}
              <div className="bg-[#F0FDF4] rounded-2xl p-6 md:p-8 shadow-lg border border-green-100">
                {/* Logo */}
                <div className="text-center mb-4">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/ace-english-malta.png"
                    alt="ACE English Malta dil okulu logosu"
                    width={200}
                    height={60}
                    className="mx-auto"
                    unoptimized
                  />
                  <div className="mt-4 border-t border-green-200"></div>
                </div>

                {/* Form Başlık ve Açıklama */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
                  ACE English Malta 2026 Fiyat ve Program Bilgi Formu
                </h2>
                <p className="text-center mb-6 text-slate-700 text-sm">
                  ACE English Malta Dil Okulu'nun 2026 yılına ait güncel fiyatlarını, program türlerini ve toplam maliyet detaylarını öğrenin.
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
                      className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
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
                      className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                      placeholder="5XX XXX XX XX"
                    />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20ACE%20English%20Malta%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block w-full rounded-lg bg-green-600 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    ACE English Malta 2026 Fiyatlarını Göster
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
                    ACE English Malta Bilgileri
                  </h3>
                  <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li>
                      <Link
                        href="#ace-english-malta-fiyatlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          1
                        </span>
                        <span className="leading-relaxed">ACE English Malta Dil Okulu 2026 Güncel Fiyatları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ace-english-malta-programlar"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          2
                        </span>
                        <span className="leading-relaxed">ACE English Malta Dil Okulu Programları</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ace-english-malta-konaklama"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          3
                        </span>
                        <span className="leading-relaxed">ACE English Malta Konaklama Türleri</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ace-english-malta-aktiviteler"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          4
                        </span>
                        <span className="leading-relaxed">ACE English Malta Sosyal Aktiviteleri</span>
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
                        href="#ace-english-malta-deneyim"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          5
                        </span>
                        <span className="leading-relaxed">ACE English Malta'da Bir Öğrencinin Günü</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ace-english-malta-kayit"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          6
                        </span>
                        <span className="leading-relaxed">ACE English Malta Dil Okulu Kayıt Süreci</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#ace-english-malta-vize"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          7
                        </span>
                        <span className="leading-relaxed">ACE English Malta Dil Okulu ve Vize Durumu</span>
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
                        <span className="leading-relaxed">ACE English Malta Kimler İçin Uygun / Uygun Değil?</span>
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
                        href="#ace-english-malta-faq"
                        className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          9
                        </span>
                        <span className="leading-relaxed">ACE English Malta Dil Okulu Hakkında En Çok Sorulan Sorular</span>
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
                  src="/malta-dil-okullari/ace-malta/ace-english-malta-dil-okulu.webp"
                  alt="ACE English Malta Dil Okulu 2026 - Kampüs, sınıf ortamı, programlar ve fiyatlar hakkında detaylı bilgi"
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
                ACE English Malta Dil Okulu 2026 - Kampüs, sınıf ortamı, programlar ve fiyatlar hakkında detaylı bilgi
              </figcaption>
              <meta itemProp="name" content="ACE English Malta Dil Okulu 2026" />
              <meta itemProp="description" content="ACE English Malta Dil Okulu 2026: Güncel fiyatlar, program türleri, konaklama seçenekleri, sosyal aktiviteler ve öğrenci deneyimi hakkında detaylı rehber" />
            </figure>
          </div>
        </section>

        {/* Fiyatlar Bölümü */}
        <section className="bg-white py-12" id="ace-english-malta-fiyatlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ACE English Malta 2026 Güncel Fiyatları (Konaklama Tiplerine Göre)
            </h2>
            
            {/* H2 Alt Açıklama Paragrafı (Snippet Odaklı) */}
            <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed mb-4 speakable-ace-fiyatlar">
              <p>
                <strong>ACE English Malta fiyatları 2026</strong> yılında eğitim süresi ve ders yoğunluğuna göre değişir; <strong>4–24 hafta</strong> arası programlar için <strong>konaklama dahil</strong> tahmini <strong>paket maliyetleri</strong> aşağıdaki tabloda yer alır.
              </p>
              <p>
                Bu sayfa <strong>ACE English Malta paket fiyatlarını</strong> anlatır; tablodaki tutarlar kurs, konaklama ve zorunlu ücretlerin toplamını yansıtır ve <strong>2026 eğitim dönemi</strong> için geçerlidir.
              </p>
              <p>
                <strong>ACE English Malta fiyatları</strong> ders yoğunluğuna göre değişir; en düşük tahmini paket maliyeti <strong>4 haftalık 20 ders</strong> programında, <strong>Öğrenci Apartmanı (2 kişi)</strong> konaklama seçeneğinde <strong>1.495€</strong> olarak görülür.
              </p>
              <p>
                Program süresi uzadıkça toplam maliyet artar; <strong>24 haftalık</strong> programlarda toplam maliyet <strong>7.375€</strong> ile <strong>8.535€</strong> arasında değişir.
              </p>
            </div>

            {/* Hızlı Cevap / Özet Satırı (Snippet Boost) */}
            <p className="text-base md:text-lg font-semibold text-slate-900 mb-8 bg-green-50 border-l-4 border-green-500 pl-4 py-2">
              Kısaca: <strong>2026</strong> yılı için <strong>ACE English Malta fiyatları</strong>, en düşük <strong>1.495€</strong> ile başlar; süre ve ders yoğunluğuna göre değişen tahmini paket maliyetleri aşağıdaki tabloda yer alır.
            </p>
            
            {/* Fiyat Tablosu */}
            <div className="mb-6">
              <div className="overflow-x-auto relative" role="region" aria-label="ACE English Malta fiyat tablosu">
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full pointer-events-none hidden md:block z-10" aria-hidden="true"></div>
                <div className="md:hidden text-xs text-slate-500 mb-2 text-center bg-green-50 border border-green-100 rounded px-2 py-1">
                  ← → Kaydırarak tüm sütunları görebilirsin
                </div>
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm min-w-[800px]" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">ACE English Malta fiyatları 2026 - Konaklama dahil paket fiyatları tablosu</caption>
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
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Öğrenci Apt. (20 Ders)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">1495€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2155€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2655€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3775€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4670€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4975€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">7375€</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 z-10 bg-white md:bg-white border-r border-slate-200">Öğrenci Apt. (30 Ders)</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">1895€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">2775€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">3175€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">4455€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5535€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">5895€</td>
                      <td className="px-4 py-3 text-sm text-center text-slate-700">8535€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablo Altı Mikro Açıklama */}
            <p className="text-sm text-slate-600 mb-8 text-center">
              <strong>ACE English Malta fiyatları</strong> <strong>2026</strong> yılı için geçerlidir; en düşük fiyat <strong>4 haftalık 20 ders programında Öğrenci Apartmanı</strong> seçeneğinde <strong>1.495€</strong> olarak görülür. Tablodaki tutarlar tahmini paket fiyatıdır; okul, konaklama ve zorunlu ücretler dahildir.
            </p>

            {/* Fiyat Hesaplama */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                ACE English Malta için Tahmini Paket Fiyatını Hesapla (2026)
              </h3>
              <p className="text-base text-slate-700 mb-6">
                Hesaplama, yukarıdaki tablodaki <strong>ACE English Malta paket fiyatlarını</strong> esas alır; tahmini toplam maliyet gösterilir.
              </p>
              <PriceCalculator />
            </div>

            {/* Internal Link */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-base text-slate-700">
                ACE English Malta dışındaki okulların fiyatlarını da incelemek istersen, detaylı karşılaştırma için{' '}
                <Link href="/malta-dil-okulu-fiyatlari" className="text-orange-600 font-semibold hover:text-orange-700 hover:underline">
                  Malta Dil Okulu Fiyatları
                </Link>{' '}
                sayfamıza göz atabilirsin.
              </p>
            </div>

            {/* Dahil Olanlar */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ACE English Malta Her Şey Dahil Paket Fiyatlarına Neler Dahil?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">Fiyata Dahil Olanlar</h4>
                  <p className="text-sm text-slate-700 mb-4">
                    ACE English Malta <strong>2026</strong> her şey dahil paket fiyatlarına aşağıdaki hizmetler dahildir:
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ACE English Malta Dil Okulu Fiyatı Hesaplamasında Dikkat Edilenler (2026)</h3>
              <p>
                <strong>ACE English Malta Dil Okulu 2026</strong> paket fiyatları, eğitim süresi ve konaklama tipine göre belirlenir; fiyatlar <strong>4–24 hafta</strong> arası programlar için geçerlidir.
              </p>
              <p>
                Paket ücretlerine <strong>kurs</strong>, <strong>konaklama</strong>, <strong>kayıt</strong> ve <strong>eğitim materyali</strong> ücretleri dahildir; ek hizmetler fiyatlara yansıtılmaz.
              </p>
              <p>
                <strong>ACE English Malta'da</strong> fiyatlar; eğitim süresi, <strong>yaz sezonu</strong> ve konaklama tercihine göre değişiklik gösterebilir.
              </p>
              <p>
                <strong>Yaz sezonu</strong>, <strong>07.06.2026 – 13.09.2026</strong> tarihleri arasındaki dönemdir.
              </p>
              <p>
                <strong>8 hafta ve üzeri</strong> eğitim programlarında kurs ücretleri için <strong>yaz sezon farkı</strong> uygulanmaz.
              </p>
              <p>
                Ancak <strong>yaz sezonu</strong> döneminde, <strong>8 hafta ve üzeri</strong> programlarda konaklama ücretlerine <strong>yaz sezon farkı</strong> eklenir.
              </p>
              <p>
                <strong>24 hafta ve üzeri</strong> kayıtlarda ise konaklama dâhil olmak üzere <strong>yaz sezon farkı</strong> alınmaz.
              </p>
              <p>
                İlk seviye ders kitapları fiyatlara dahildir. Sonraki her seviye için okulda <strong>35 €</strong> kitap ücreti ödenir.
              </p>
              <p>
                Kurs başlangıç tarihi, kayıt yapılan tarihten itibaren <strong>18 ay</strong> içinde olmalıdır.
              </p>
              <p>
                Haftada <strong>30 ders</strong> olan programlar daha yoğun bir eğitim temposu sunar ve fiyat yapısı buna göre değişiklik gösterebilir.
              </p>
            </div>
          </div>
        </section>

        {/* Programlar Bölümü */}
        <section className="bg-slate-50 py-12" id="ace-english-malta-programlar">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ACE English Malta Dil Okulu Programları (Hangisi Sana Uygun?)
            </h2>
            <div className="speakable-ec-programlar">
            
            {/* H2 Alt Açıklama Paragrafı */}
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              <strong>ACE English Malta programları</strong> süre, ders yoğunluğu ve hedefe göre ayrılır; her program farklı öğrenci ihtiyaçlarına yöneliktir. Program seçimi, <strong>ACE English Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Bu program türü, <strong>ACE English Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>ACE English Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                  Bu program türü, <strong>ACE English Malta fiyatları</strong> hesaplanırken paket fiyat yapısına göre değerlendirilir.
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
                  Program seçimi, <strong>ACE English Malta fiyatları</strong> üzerinde program yoğunluğuna göre etkili olabilir.
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
                    src="/malta-dil-okullari/ace-malta/ace-english-malta-kampus-ici-imkanlar.webp"
                    alt="ACE English Malta dil okulu kampüs içi imkanlar ve sınıf ortamı - Programlara dahil olan hizmetler"
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
                    ACE English Malta dil okulu kampüs içi imkanlar ve sınıf ortamı - Programlara dahil olan hizmetler
                  </figcaption>
                  <meta itemProp="name" content="ACE English Malta Dil Okulu Kampüs İçi İmkanlar 2026" />
                  <meta itemProp="description" content="ACE English Malta dil okulu kampüsü, sınıf ortamı ve programlara dahil olan temel hizmetler hakkında görsel bilgi" />
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
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ACE English Malta Dil Okulu Kampüs İmkânları</h3>
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
        <section className="bg-white py-12" id="ace-english-malta-konaklama">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ACE English Malta Konaklama Türleri – Okula Uzaklık ve Konfor Karşılaştırması
            </h2>
            <div className="speakable-ace-konaklama">
            <p className="text-base md:text-lg text-slate-700 mb-6 leading-relaxed">
              ACE English Malta'da sunulan konaklama seçenekleri; okula uzaklık, konfor seviyesi ve yaşam tarzına göre değişir. Aşağıdaki karşılaştırma, 'hangi konaklama bana uygun?' sorusuna hızlı ve net cevap vermek için hazırlanmıştır.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Öğrenci Apartmanı */}
              <article className="rounded-xl border border-slate-200 bg-[#F0FDF4] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">Öğrenci Apartmanı</h3>
                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">St. Julian's, Sliema ve Gzira çevresinde; Malta'nın sosyal yaşamına yakın apartman bölgeleri.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">15–35 dk (yürüyüş + toplu taşıma / konuma göre değişir)</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">Bağımsız yaşam. Genelde paylaşımlı daire düzeni; ortak mutfak, oturma alanı ve oda paylaşımı seçenekleri bulunur. Günlük yaşamını kendi planlayan öğrenciler için uygundur.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">Malta'daki sosyal hayata daha kolay karışma imkânı sunar. Market, kafe, sahil yürüyüş alanları gibi noktalara yakın olabildiği için ders sonrası "şehir hayatı + pratik" dengesi kurmak kolaylaşır.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">Kendi düzenini kurmak isteyen, daha özgür bir yaşam temposu seven, "konum + bütçe" dengesini önemseyen öğrenciler.</div>
                  </div>
                </div>
              </article>
              
              {/* Aile Yanı Konaklama */}
              <article className="rounded-xl border border-slate-200 bg-[#F0FDF4] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">Aile Yanı Konaklama</h3>
                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">Yerel ailelerin yaşadığı mahalleler; okula ulaşım genellikle toplu taşıma ile sağlanır.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">20–45 dk (otobüs ile; trafik ve konuma göre değişebilir)</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">Ev ortamı. Daha düzenli ve sakin bir yaşam temposu sunar. Günlük iletişimde İngilizce pratik yapma fırsatı yüksektir.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">Malta kültürünü daha yakından tanımaya yardımcı olur. Günlük konuşma pratiği ders dışına taşar; özellikle ilk defa yurt dışına giden öğrenciler için uyum sürecini kolaylaştırabilir.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">Daha sakin ortam isteyen, düzenli yaşamı tercih eden, Malta'ya ilk kez giden ve "ev konforu + güvenli rutin" arayan öğrenciler.</div>
                  </div>
                </div>
              </article>
              
              {/* Hotel / Residence */}
              <article className="rounded-xl border border-slate-200 bg-[#F0FDF4] p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-slate-900">Hotel / Residence</h3>
                <div className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Konum</div>
                    <div className="text-slate-600">Genellikle St. Julian's – Sliema hattında; okul çevresine ve sosyal alanlara yakın otel/rezidans seçenekleri.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Okula ortalama uzaklık (dakika)</div>
                    <div className="text-slate-600">5–20 dk (yürüyüş ağırlıklı / kısa ulaşım)</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Yaşam tarzı</div>
                    <div className="text-slate-600">Daha konforlu ve düzenli konaklama. Günlük temizlik/recepsiyon gibi otel hizmetleri bulunan seçenekler olabilir. Daha az paylaşım, daha fazla kişisel alan isteyenler için uygundur.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Avantaj</div>
                    <div className="text-slate-600">Ulaşım kolaylığı sayesinde derse yetişme stresi azalır. Günlük düzen daha sabit olduğu için özellikle yoğun programlarda (haftada 30 ders gibi) tempo yönetimi daha rahat olur.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">Kimler için uygun?</div>
                    <div className="text-slate-600">Konfor ve kolay ulaşımı önceliklendiren, daha düzenli bir yaşam isteyen, kısa süreli gelen veya yoğun ders temposunda "zamandan kazanmak" isteyen öğrenciler.</div>
                  </div>
                </div>
              </article>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ACE English Malta Konaklama Fiyatlarını Etkileyen Faktörler (2026)</h3>
              <p className="text-slate-700">
                <strong>2026 yılında ACE English Malta konaklama fiyatları, yaz sezonunda artan talep nedeniyle haftalık bazda yükselebilir.</strong> Okula yakınlık ve oda tipi (tek kişilik, paylaşımlı veya özel banyolu) toplam maliyeti doğrudan etkiler. Uzun dönem konaklamalarda haftalık birim maliyet düşerken, kısa süreli programlarda sezon farkı daha belirgin hale gelir.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler Bölümü */}
        <section className="bg-slate-50 py-12" id="ace-english-malta-aktiviteler">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              ACE English Malta Sosyal Aktiviteleri ve Öğrenci Deneyimi (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center">
              ACE English Malta'da 2026 boyunca öğrenciler için her hafta sosyal ve kültürel etkinlikler düzenlenir; amaç, İngilizceyi sınıf dışında da pratik etmek ve Malta'yı daha hızlı tanımaktır.
            </p>
            
            {/* Aktiviteler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  image: '/malta-dil-okullari/ace-malta/ace-english-malta-hos-geldin-oryantasyon.webp',
                  alt: 'ACE English Malta hoş geldin etkinliği ve oryantasyon',
                  title: 'Hoş Geldin Etkinliği (Orientation)',
                  description: 'İlk günlerde okul/şehir bilgilendirmesi, seviye belirleme ve sınıf sistemi.',
                },
                {
                  image: '/malta-dil-okullari/ace-malta/ace-english-malta-ogrenci-toplulugu-sosyal-ortam.webp',
                  alt: 'ACE English Malta öğrenci topluluğu ve sosyal ortam',
                  title: 'Öğrenci Topluluğu Deneyimi',
                  description: 'Yeni arkadaşlıklar kurma ve uluslararası ortamda hızlı adaptasyon.',
                },
                {
                  image: '/malta-dil-okullari/ace-malta/ace-english-malta-konusma-kulubu-atolyeler.webp',
                  alt: 'ACE English Malta konuşma kulübü ve atölye çalışmaları',
                  title: 'İngilizce Dil Etkinlikleri ve Atölyeler',
                  description: 'Konuşma kulübü, pratik odaklı mini workshoplar.',
                },
                {
                  image: '/malta-dil-okullari/ace-malta/ace-english-malta-sehir-turlari-kulturel-gezi.webp',
                  alt: 'ACE English Malta şehir turları ve kültürel gezi programları',
                  title: 'Şehir Turları ve Kültürel Gezi Programları',
                  description: 'Valletta, Mdina gibi gezilerle Malta\'yı tanıma ve pratik fırsatı.',
                },
                {
                  image: '/malta-dil-okullari/ace-malta/ace-english-malta-tekne-turu-deniz-aktiviteleri.webp',
                  alt: 'ACE English Malta tekne turları ve deniz aktiviteleri',
                  title: 'Tekne Turları ve Deniz Aktiviteleri',
                  description: 'Sezon döneminde popüler sosyal etkinlikler ve deniz programları.',
                },
                {
                  image: '/malta-dil-okullari/ace-malta/ace-english-malta-sertifika-mezuniyet-etkinligi.webp',
                  alt: 'ACE English Malta sertifika ve mezuniyet etkinliği',
                  title: 'Mezuniyet / Kapanış Etkinliği',
                  description: 'Program sonunda sertifika ve kapanış/mezuniyet buluşması.',
                },
              ].map((activity, index) => (
                <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
                  <figure itemScope itemType="https://schema.org/ImageObject">
                <Image
                      src={activity.image}
                      alt={activity.alt}
                      width={480}
                      height={360}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                      itemProp="contentUrl"
                />
                    <meta itemProp="name" content={activity.title} />
                    <meta itemProp="description" content={activity.description} />
                    <meta itemProp="caption" content={activity.alt} />
                  </figure>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{activity.title}</h3>
                    <p className="text-slate-700 text-sm">{activity.description}</p>
                </div>
                </article>
              ))}
            </div>
            
            <p className="text-center text-slate-600">
              2026 boyunca ACE English Malta'da sosyal aktiviteler ve etkinlik programı her hafta Pazartesi yayınlanır; bazı aktiviteler ücretsiz, bazıları ücretli olabilir.
            </p>
          </div>
        </section>

        {/* Öğrenci Deneyimi Bölümü */}
        <section className="bg-white py-12" id="ace-english-malta-deneyim" itemScope itemType="https://schema.org/VideoObject">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" itemProp="name">
              ACE English Malta'da Bir Öğrencinin Günü – Gerçek Deneyim (2026)
            </h2>
            <div className="text-lg text-slate-700 mb-8 space-y-4" itemProp="description">
              <p>
                ACE English Malta, Malta'da İngilizce eğitimi almak isteyen öğrenciler için özellikle St. Julian's bölgesinde konumlanan, pratik odaklı bir dil okuludur. 2026 döneminde ACE Malta'da eğitim alan öğrenciler; ders temposunu, sınıf içi konuşma pratiğini ve günlük yaşamda İngilizce kullanımını aynı rutinde birleştirir.
            </p>
              <p>
                Aşağıdaki videoda ACE Malta'da bir öğrencinin tipik gününü gerçek haliyle görebilirsin: sınıf ortamı, öğretmen-öğrenci iletişimi, derslerin işlenişi ve okul atmosferi. Eğer "ACE Malta nasıl bir okul?" ya da "dersler nasıl geçiyor?" diye merak ediyorsan, bu video sayfayı okumadan önce hızlı bir fikir verir.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/e2qovXW-vm4"
                    title="ACE English Malta öğrenci deneyimi 2026"
                    aria-label="ACE English Malta öğrenci deneyimi 2026"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    itemProp="embedUrl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerçek Öğrenci Deneyimi – ACE English Malta Dil Okulu</h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Bu video, ACE English Malta Dil Okulu'nda eğitim alan bir öğrencinin gün içindeki temel akışını gösterir: ders başlangıcı, sınıf içi pratik, öğrencilerin derse katılımı ve genel okul düzeni.
                  </p>
                  <p>
                    ACE Malta'da derslerde iletişim ve konuşma pratiği ön plandadır. Sınıfların uluslararası yapısı sayesinde öğrenciler, sadece öğretmenle değil farklı ülkelerden gelen sınıf arkadaşlarıyla da gün boyunca İngilizce iletişim kurar.
                  </p>
                  <p>
                    Videodaki deneyim; öğrencinin seviyesine, seçtiği program yoğunluğuna ve döneme göre farklılık gösterebilir. Ancak ACE English Malta'da eğitim alırken "bir gün nasıl geçiyor?" sorusuna en gerçekçi cevaplardan biridir.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-12 italic">
              Not: Videoda yer alan deneyim öğrencinin kişisel gözlemlerini yansıtabilir; ders içeriği, sınıf yapısı ve aktiviteler dönemsel olarak değişebilir.
            </p>
            
            {/* Türk Öğrenciler için Deneyim */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Türk Öğrenciler için ACE English Malta Deneyimi (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                ACE English Malta'da 2026 boyunca Türk öğrenciler aktif olarak eğitim alır. Okul, sınıflarda uluslararası dengeyi koruyarak öğrencilerin İngilizceyi sadece derslerde değil günlük hayatta da kullanmasını hedefler. St. Julian's bölgesindeki konumu sayesinde öğrenciler, Malta'daki sosyal yaşam ile akademik eğitimi aynı rutinde birleştiren gerçek bir "yurtdışı dil okulu deneyimi" yaşar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler Ne Beklemeli?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">ACE English Malta'da Türk öğrenciler bulunur ancak sınıflar genellikle uluslararası dengede oluşturulur; tek milletten yoğun sınıf yapısı hedeflenmez.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Derslerde konuşma pratiği ve sınıf içi iletişim odaklı ilerlenir; yeni başlayanlar için adaptasyon süreci genelde hızlıdır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Okulun St. Julian's çevresindeki konumu, ders sonrası sosyal ortamlarda pratik yapmayı kolaylaştırır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-700">Program yoğunluğuna göre tempo değişebilir; daha yoğun ders seçeneği isteyenler için farklı ders saatleri tercih edilebilir.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Türk Öğrenciler için Avantajlar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Kayıt öncesinden başlayarak eğitim, konaklama ve vize sürecinde Türkçe danışmanlık desteği ile adım adım planlama yapılabilir.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Okulun merkezi konumu sayesinde ulaşım ve günlük yaşam daha kolay yönetilir; öğrenciler "zaman kaybetmeden" pratik İngilizceye odaklanır.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Uluslararası sınıf ortamı, Türk öğrencilerin farklı ülkelerden öğrencilerle iletişim kurmasını ve konuşma pratiğini artırmasını destekler.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Sosyal programlar ve okul çevresindeki öğrenci hayatı, hızlı arkadaşlık kurma ve Malta'ya uyum sürecini güçlendirir.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">Uzun dönem eğitim alan öğrencilerde günlük pratik daha doğal hale gelir; İngilizce kullanım rutine dönüşür.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 italic">
                Not: ACE English Malta'da sınıf dağılımları öğrencilerin milliyetlerine göre değil; seviyelerine, dönem yoğunluğuna ve program türlerine göre yapılır. 2026 yılı öğrenci profili dönemsel olarak değişiklik gösterebilir.
              </p>
              
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">ACE English Malta Dil Okulu – Türkiye Resmi Temsilcisi</h3>
                <p className="text-slate-700 mb-4">
                  ACE English Malta Dil Okulu'nun Türkiye resmi temsilcisi olarak, 2026 yılı boyunca kayıt, fiyatlandırma, konaklama ve vize süreçlerinde öğrencilere birebir destek sağlıyoruz. Tüm bilgiler güncel ACE English Malta programları ve resmi fiyatlar üzerinden paylaşılır.
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
                ACE English Malta Dil Okulu Öğrenci Profili (2026)
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                ACE English Malta Dil Okulu'nda 2026 yılı boyunca farklı ülkelerden ve yaş gruplarından öğrenciler eğitim almaktadır. Aşağıdaki dağılımlar, okulun uluslararası yapısını ve Türk öğrenciler için ortamı net şekilde gösterir.
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
                    ACE English Malta'da 2026 yılında öğrencilerin büyük bölümü 18–35 yaş aralığındadır; ancak uzun dönem ve kariyer odaklı programlarda daha olgun yaş grupları da yer almaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kayıt Süreci Bölümü */}
        <section className="bg-slate-50 py-12" id="ace-english-malta-kayit">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ACE English Malta Dil Okulu Kayıt Süreci (2026)
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              ACE English Malta kayıt süreci <strong>2026</strong> yılında ağırlıklı olarak <strong>online</strong> yürütülür; adayın program seçimi, planlanan süre ve kontenjan durumuna göre süreç adımları netleşir ve kayıt takvimi buna göre ilerler.
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
                  ACE English Malta Dil Okulu kayıt süreci <strong>2026</strong> yılında <strong>online</strong> yürütülür; adımlar program türü ve eğitim süresine göre değişiklik gösterebilir.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Kayıt Sürecinde ve Eğitim Boyunca Yanındayız</h3>
                <p className="text-slate-700 mb-6">
                  ACE English Malta kayıt sürecinden eğitim bitimine kadar, öğrencilerimize rehberlik ve danışmanlık desteği sunuyoruz.
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
        <section className="bg-white py-12" id="ace-english-malta-vize">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ACE English Malta Dil Okulu ve Vize Durumu (2026)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Yeşil Pasaport Sahipleri İçin ACE English Malta</h3>
                <p className="text-slate-700">
                  2026 yılında yeşil pasaport sahibi Türk vatandaşları, ACE English Malta dil eğitimi programlarında 90 güne kadar vize başvurusu yapmadan Malta'da kalabilir. Bu süre, kısa dönem dil eğitimi planlayan öğrenciler için kayıt sürecini hızlandırır ve ek vize evrakı gerektirmez. Eğitim süresi 90 günü aştığında, yeşil pasaport sahipleri için de Malta öğrenci vizesi gerekliliği doğar ve başvuru süreci eğitim süresine göre planlanır.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bordo Pasaport Sahipleri İçin ACE English Malta</h3>
                <p className="text-slate-700">
                  Bordo pasaport sahibi öğrenciler için ACE English Malta dil eğitimi programlarında vize gerekliliği, seçilen eğitim süresine göre belirlenir. Kısa dönem ve uzun dönem programlarda başvuru süreçleri ve istenen belgeler farklılık gösterebilir. Kayıt aşamasında eğitim süresine uygun vize türü netleştirilir ve bordo pasaportlu öğrenciler için vize sürecinde bilgilendirme ve yönlendirme desteği sağlanır.
                </p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8">
              ACE English Malta dil eğitimi programlarında vize şartları, pasaport türü ve eğitim süresine göre değişebilir; kayıt planlaması yapılırken güncel kurallar dikkate alınmalıdır. Malta öğrenci vizesi başvuru şartları, güncel evrak listesi ve süreç detaylarıyla ilgili kapsamlı bilgiye{' '}
              <Link href="/malta-ogrenci-vizesi" className="font-semibold text-orange-600 hover:text-orange-700 hover:underline">
                Malta öğrenci vizesi rehberimizden
              </Link>{' '}
              ulaşabilirsin.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">ACE English Malta Dil Okulu İçin Ücretsiz Vize Danışmanlığı (2026)</h3>
              <p className="text-slate-700 mb-4">
                ACE English Malta Dil Okulu'na kayıt sürecinde vize, pasaport türü ve eğitim süresine göre değişkenlik gösterebilir. Bordo ve yeşil pasaport sahipleri için güncel vize gerekliliklerini, evrak sürecini ve doğru başvuru yolunu ücretsiz olarak değerlendiriyoruz.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">ACE English Malta özelinde güncel vize bilgisi</span>
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
                ACE English Malta Dil Okulu İçin Vize Bilgisi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Bölümü */}
        <section className="bg-white py-12" id="uygunluk">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              ACE English Malta Kimler için Uygun / Kimler için Uygun Değil?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span>✓</span>
                  ACE English Malta Kimler için Uygun?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Malta'da uluslararası sınıf ortamında konuşma pratiğini artırmak isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">St. Julian's bölgesinde merkezde kalıp ders + günlük yaşamı birlikte yönetmek isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">20 ders / 30 ders gibi seçeneklerle tempo seçip buna göre plan yapabilenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Konaklama tercihine göre (öğrenci apartmanı / aile yanı / hotel-residence) yaşam tarzını seçmek isteyenler.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Ders dışında sosyal hayatın içinde İngilizceyi kullanmaya açık olan; günlük pratikleri öğrenme sürecinin parçası görenler.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>⚠</span>
                  ACE English Malta Kimler için Uygun Değil?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Malta'ya gidip derslere düzenli katılmadan sadece gezmeye odaklanacak olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Her gün garantili mucize gelişim bekleyip pratik yapmaya zaman ayırmayacak olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Konaklama ve bütçe planı yapmadan gidip toplam maliyeti yönetmekte zorlanabilecek olanlar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Sessiz, izole ve çok sakin bir okul deneyimi arayanlar (St. Julian's çevresi sosyal ve hareketlidir).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-500 font-bold mt-1">i</span>
                    <span className="text-slate-700">Sınıf profili dönemsel değişebileceği için esnek olmayan, tek tip sınıf yapısı bekleyenler.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <section className="bg-slate-50 py-12" id="ace-english-malta-faq" itemScope itemType="https://schema.org/FAQPage">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" itemProp="name">
                ACE English Malta Dil Okulu Hakkında En Çok Sorulan Sorular (2026)
              </h2>
              <p className="text-base leading-relaxed text-slate-700">
                Türkiye'den en çok sorulan sorulara kısa ve güncel cevaplar aşağıdadır.
              </p>
            </div>
            
            <div className="space-y-3" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
              {[
                {
                  question: 'ACE English Malta nerede? St. Julian\'s\'ta hangi bölgede?',
                  answer: 'ACE English Malta (ACE Malta), Malta\'nın St. Julian\'s bölgesinde konumlanır. St. Julian\'s; kafe, sosyal yaşam ve ulaşım açısından Malta\'nın en merkezi noktalarından biridir. Bu konum, öğrencilerin ders sonrası İngilizce pratiğini günlük hayata daha kolay taşımasına yardımcı olur.',
                },
                {
                  question: 'ACE Malta\'da kaç hafta eğitim almak mantıklı? (4 / 8 / 12 / 24 hafta)',
                  answer: 'ACE English Malta\'da eğitim süresi hedefe göre seçilmelidir: 4 hafta kısa bir başlangıç ve adaptasyon için, 8–12 hafta düzenli gelişim için, 24 hafta ise kalıcı ilerleme ve rutin pratik için daha uygundur. Türkiye\'den giden öğrenciler için en verimli aralık genelde 8–12 haftadır. Süre uzadıkça günlük pratik ve sınıf içi ilerleme daha net hissedilir.',
                },
                {
                  question: 'ACE English Malta\'da 20 ders mi 30 ders mi seçilmeli?',
                  answer: '20 ders programı daha dengeli bir tempo sunar; 30 ders programı ise daha yoğun ve hızlandırılmış ilerleme hedefleyen öğrenciler için uygundur. 30 ders seçeneğinde sınıf içi pratik ve öğretmen teması artar, ancak gün içinde daha fazla enerji ve disiplin gerekir. 2026\'da seçim yaparken hedef (konuşma / sınav / genel gelişim) ve günlük tempo mutlaka dikkate alınmalıdır.',
                },
                {
                  question: 'ACE Malta\'da dersler hangi gün başlıyor? Her pazartesi başlangıç var mı?',
                  answer: 'ACE English Malta\'da birçok programda başlangıç genellikle Pazartesi günüdür, ancak resmi başlangıçlar ve dönem yoğunluğu programa göre değişebilir. Kayıt planı yapılırken hedeflenen tarih, konaklama giriş-çıkış günleri ve vize süreci birlikte değerlendirilmelidir. En doğru başlangıç tarihini kayıt öncesinde netleştirmek gerekir.',
                },
                {
                  question: 'ACE English Malta konaklama seçenekleri neler? (apartman / aile yanı / otel)',
                  answer: 'ACE Malta\'da konaklama seçenekleri genellikle öğrenci apartmanı, aile yanı ve hotel/residence gibi alternatiflerden oluşur. Apartmanlar daha bağımsız yaşam isteyenler için, aile yanı daha düzenli ve sakin bir rutin arayanlar için, hotel/residence ise konfor ve kolaylık isteyenler için uygundur. Seçim yapılırken bütçe kadar yaşam tarzı da belirleyici olmalıdır.',
                },
                {
                  question: 'ACE Malta\'da konaklamalar okula kaç dakika? Yürüyerek gidilir mi?',
                  answer: 'ACE English Malta\'da konaklama-okul mesafesi seçilen konaklama tipine ve bölgeye göre değişir. St. Julian\'s çevresindeki birçok konaklama seçeneğinde okula yürüyerek ulaşım mümkün olabilir; bazı seçeneklerde toplu taşıma gerekebilir. Türkiye\'den giden öğrenciler için plan yaparken günlük ulaşım süresi (dakika) özellikle önemlidir.',
                },
                {
                  question: 'ACE English Malta\'da sınıflar kaç kişilik? Öğrenci profili nasıl?',
                  answer: 'ACE English Malta\'da sınıf mevcudu dönem yoğunluğuna göre değişebilir. Genel olarak sınıflar uluslararası öğrenci yapısıyla ilerler ve derslerde konuşma/iletişim pratiği ön plandadır. 2026 yılında da öğrenci profili sezonlara göre farklılaşabileceği için, sınıf ortamı ve dönem seçimi kayıt kararında dikkate alınmalıdır.',
                },
                {
                  question: 'ACE Malta\'da kitap/material gibi ek ücretler var mı?',
                  answer: 'ACE English Malta\'da bazı programlarda ders materyali/kitap ücretleri pakete dahil olabilir veya okulda ayrıca tahsil edilebilir; bu durum programa göre değişir. 2026 kayıt planı yapılırken toplam maliyet hesabına \'ek ücretler\' kalemi mutlaka dahil edilmelidir. Böylece sürpriz maliyet oluşmadan doğru bütçe yönetimi yapılır.',
                },
                {
                  question: 'ACE English Malta için Malta dil okulu vizesi nasıl işliyor?',
                  answer: 'Malta dil okulu vizesi süreci; eğitim süresi, başvuru zamanı ve evrakların eksiksiz hazırlanmasına göre ilerler. ACE English Malta kaydı yapıldıktan sonra okul kabul belgesi ile vize başvurusu planlanır. Türkiye\'den başvuran öğrenciler için en kritik konu, eğitim başlangıç tarihine göre süreci erken başlatmaktır.',
                },
                {
                  question: 'ACE English Malta öğrenci yorumları nasıl? Sosyal aktiviteler oluyor mu?',
                  answer: 'ACE English Malta\'da öğrenci deneyimi; sınıf ortamı, konaklama tercihi ve öğrencinin sosyal katılımına göre değişir. Okullarda sosyal ve kültürel etkinlikler dönemsel olarak planlanabilir; bazı etkinlikler ücretsiz, bazıları ücretli olabilir. Malta\'da İngilizce pratiğini hızlandırmak için ders dışı sosyal katılım önemli bir avantaj sağlar.',
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
                Bu sayfadaki bilgiler; <strong>ACE English Malta Dil Okulu</strong>'nun resmi kaynakları, <strong>2026 güncel fiyat listeleri</strong> ve <strong>öğrenci geri bildirimleri</strong> dikkate alınarak hazırlanmış ve düzenli olarak güncellenmektedir.
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
