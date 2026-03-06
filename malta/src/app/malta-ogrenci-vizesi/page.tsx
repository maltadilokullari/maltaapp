'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TableOfContents from './components/TableOfContents';
import VizeBasvuruSureci from './components/VizeBasvuruSureci';
import VizeCTASection from './components/VizeCTASection';
import VizeUcretleri from './components/VizeUcretleri';
import BankaBakiyeGereksinimi from './components/BankaBakiyeGereksinimi';
import VizeSonuclanmaSuresi from './components/VizeSonuclanmaSuresi';
import CalismaIzniBilgi from './components/CalismaIzniBilgi';
import WorkStudyCTA from './components/WorkStudyCTA';
import VizeReddiNedenleri from './components/VizeReddiNedenleri';
import VizeFAQ from './components/VizeFAQ';
import IcerikHazirlama from './components/IcerikHazirlama';

export default function MaltaVizesiPage() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateModified, setDateModified] = useState('');

  useEffect(() => {
    // Son güncelleme tarihi - İstanbul saatine göre
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ];
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);
    
    // ISO format için
    const isoDate = istanbulDate.toISOString().split('T')[0];
    setDateModified(isoDate);
  }, []);

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
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi',
        name: 'Malta Öğrenci Vizesi 2026 | Başvuru Süreci, Gerekli Belgeler ve Rehber',
        description:
          'Malta öğrenci vizesi 2026: Başvuru süreci, gerekli belgeler, vize ücretleri, başvuru adımları ve sıkça sorulan sorular.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#article',
        headline: 'Malta Öğrenci Vizesi 2026 | Başvuru Süreci, Gerekli Belgeler ve Rehber',
        description:
          'Malta öğrenci vizesi 2026: Başvuru süreci, gerekli belgeler, vize ücretleri, başvuru adımları ve sıkça sorulan sorular. Malta dil okulu için vize rehberi.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            url: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi-basvuru-sureci.webp',
            width: 1200,
            height: 630,
            name: 'Malta Öğrenci Vizesi Başvuru Süreci 2026',
            caption: 'Malta Öğrenci Vizesi Başvuru Süreci 2026 - Adım adım başvuru rehberi, gerekli belgeler ve vize türleri',
            description: 'Malta öğrenci vizesi başvuru süreci 2026: C Tipi ve D Tipi vize başvuru adımları, gerekli belgeler, vize ücretleri ve detaylı rehber',
          },
        ],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '.speakable-vize-tanim',
            '.speakable-vize-pasaport',
            '.speakable-vize-kurumlar',
            '.speakable-vize-belgeler',
            '.speakable-banka-bakiye',
          ],
          xpath: [],
        },
      },
      {
        '@type': 'HowTo',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#howto-basvuru-sureci',
        name: 'Malta Öğrenci Vizesi Başvuru Süreci',
        description: 'C Tipi ve D Tipi Malta öğrenci vizesi başvuru süreci adım adım rehber',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Belgelerin hazırlanması',
            text: 'C tipi Malta öğrenci vizesi için başvuru dosyası eksiksiz ve birbiriyle tutarlı şekilde hazırlanmalıdır.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'VFS Global randevusunun alınması',
            text: '90 güne kadar olan Malta öğrenci vizesi başvuruları VFS Global üzerinden yapılır.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Başvuru formunun doldurulması',
            text: 'Vize başvuru formu eksiksiz ve doğru bilgilerle doldurulmalıdır.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Belgelerin teslimi ve biyometri işlemleri',
            text: 'Randevu gününde başvuru merkezi ziyaret edilerek işlemler tamamlanır.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Başvurunun değerlendirilmesi',
            text: 'Başvuru dosyası Malta makamları tarafından incelenir.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Vize sonucunun açıklanması ve pasaport teslimi',
            text: 'Başvurunun değerlendirilmesi tamamlandıktan sonra vize sonucu açıklanır.',
          },
        ],
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#gerekli-belgeler-tablosu',
        about: 'Malta öğrenci vizesi için gerekli belgeler ve zorunluluk durumları 2026',
        name: 'Malta Öğrenci Vizesi İçin Gerekli Belgeler (2026)',
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#gerekli-belgeler-liste',
        name: 'Malta Öğrenci Vizesi İçin Gerekli Belgeler (2026)',
        description: 'Malta öğrenci vizesi başvurusu için gerekli belgeler ve zorunluluk durumları',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Pasaport (en az 6 ay geçerli)',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Dil Okulu Kabul Mektubu',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Konaklama Belgesi',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Son 3 Aylık Banka Dökümü',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Seyahat Sağlık Sigortası',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Vize Başvuru Formu',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Biyometrik Fotoğraf',
            description: 'Zorunlu',
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Uçuş Rezervasyonu',
            description: 'Gerekli',
          },
          {
            '@type': 'ListItem',
            position: 9,
            name: 'Adli Sicil Kaydı',
            description: 'Gerekli',
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#vize-turleri-liste',
        name: 'Malta Öğrenci Vizesi Türleri',
        description: 'Eğitim süresine göre C Tipi (90 güne kadar) ve D Tipi (105 günden uzun) öğrenci vizesi seçenekleri',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'C Tipi Malta Öğrenci Vizesi (90 Güne Kadar)',
            description: '90 güne kadar eğitim programları için VFS Global üzerinden başvuru yapılır. Ortalama sonuç süresi 2–4 hafta.',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'D Tipi Malta Öğrenci Vizesi (105 Günden Uzun)',
            description: '105 günden fazla eğitim programları için Identity Malta üzerinden başvuru yapılır. Ortalama sonuç süresi 4–8 hafta.',
          },
        ],
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#banka-bakiye-tablosu',
        about: 'Malta öğrenci vizesi için banka bakiyesi gereksinimi - Eğitim süresine ve konaklama ödeme durumuna göre hesaplama tablosu',
        name: 'Malta Öğrenci Vizesi İçin Banka Bakiyesi Gereksinimi',
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi-basvuru-sureci.webp',
        width: 1200,
        height: 630,
        name: 'Malta Öğrenci Vizesi Başvuru Süreci 2026',
        caption: 'Malta Öğrenci Vizesi Başvuru Süreci 2026 - Adım adım başvuru rehberi, gerekli belgeler ve vize türleri',
        description: 'Malta öğrenci vizesi başvuru süreci 2026: C Tipi ve D Tipi vize başvuru adımları, gerekli belgeler, vize ücretleri ve detaylı rehber',
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#vize-ucretleri-gorsel',
        url: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi.webp',
        caption: 'Malta öğrenci vizesi ücretleri 2026: C Tipi (90 güne kadar) ve D Tipi (105 günden uzun) vize başvuru ücretleri, VFS Global servis bedelleri ve ulusal vize harcı',
        description: 'Malta öğrenci vizesi ücretleri 2026 yılı için C Tipi öğrenci vizesi 90 € vize harç bedeli ve 30 € VFS servis ücreti, D Tipi öğrenci vizesi 150 € ulusal vize harcı ve 150 € VFS servis bedeli',
      },
      {
        '@type': 'HowTo',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#howto-basvuru-sureci',
        name: 'Malta Öğrenci Vizesi Başvuru Süreci',
        description: 'C Tipi ve D Tipi Malta öğrenci vizesi başvuru süreci adım adım rehber',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Belgelerin hazırlanması',
            text: 'C tipi Malta öğrenci vizesi için başvuru dosyası eksiksiz ve birbiriyle tutarlı şekilde hazırlanmalıdır.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'VFS Global randevusunun alınması',
            text: '90 güne kadar olan Malta öğrenci vizesi başvuruları VFS Global üzerinden yapılır.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Başvuru formunun doldurulması',
            text: 'Vize başvuru formu eksiksiz ve doğru bilgilerle doldurulmalıdır.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Belgelerin teslimi ve biyometri işlemleri',
            text: 'Randevu gününde başvuru merkezi ziyaret edilerek işlemler tamamlanır.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Başvurunun değerlendirilmesi',
            text: 'Başvuru dosyası Malta makamları tarafından incelenir.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Vize sonucunun açıklanması ve pasaport teslimi',
            text: 'Başvurunun değerlendirilmesi tamamlandıktan sonra vize sonucu açıklanır.',
          },
        ],
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#sonuclanma-suresi-tablosu',
        about: 'Malta öğrenci vizesi sonuçlanma süreleri - Vize türüne ve başvuru dönemine göre',
        name: 'Eğitim Süresine Göre Malta Öğrenci Vizesi Sonuçlanma Süreleri',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesi C tipi mi D tipi mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Eğitim süresine göre vize türü değişir. 90 güne kadar eğitimler genelde C tipi (kısa süreli), 105 günden uzun eğitimler D tipi (uzun süreli) başvuru kapsamındadır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesi için bankada ne kadar para olmalı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gösterilmesi gereken tutar eğitim süresi ve konaklama durumuna göre hesaplanır. Bu sayfadaki "Bankada Ne Kadar Para Olmalı?" bölümünde hesaplama mantığı ve örnek tablo yer alır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Konaklama ödemesi yaptıysam hesaplama değişir mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Konaklama ödenmiş/ödenmemiş durumuna göre günlük hesaplama yaklaşımı değişebilir. Başvuru dosyasında konaklama ödemesi belgesi varsa hesaplamada dikkate alınmalıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sponsorla Malta öğrenci vizesine başvurabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet, sponsorla başvuru yapılabilir. Sponsorun masrafları karşıladığını gösteren resmi taahhüt belgesi ve sponsorun mali belgeleri dosyaya eklenmelidir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Banka dökümü kaç aylık olmalı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Başvurularda genellikle son 3 aya ait banka dökümü istenir. Dökümün banka tarafından kaşeli/imzalı olması ve bilgilerin dosyayla tutarlı olması önemlidir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesi kaç günde çıkar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sonuçlanma süresi vize türüne ve başvuru yoğunluğuna göre değişir. Bu sayfadaki "Kaç Günde Çıkar?" bölümünde C tipi ve D tipi için ortalama süreler ve planlama tablosu yer alır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesine ne zaman başvurmalıyım?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En sağlıklı yaklaşım, eğitim başlangıcından önce yeterli zaman bırakarak başvuruyu erkenden başlatmaktır. Yoğun dönemlerde randevu ve değerlendirme süreleri uzayabileceği için erken planlama önemlidir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesi için gerekli evraklar nelerdir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pasaport, okul kabul belgesi, konaklama, banka dökümü, seyahat sağlık sigortası, başvuru formu ve biyometrik fotoğraf en temel evraklardandır. Evrak listesi bu sayfada tablo olarak sunulmuştur.',
            },
          },
          {
            '@type': 'Question',
            name: 'VFS Global randevu linki nedir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'C tipi (90 güne kadar) başvurularda randevu VFS Global üzerinden alınır. Randevu adresi bu sayfada ilgili adımda verilmiştir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesi neden reddedilir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ret kararları çoğunlukla eksik evrak, mali yetersizlik veya belgeler arası tutarsızlıktan kaynaklanır. Bu sayfadaki "Neden Reddedilir?" bölümünde en sık yapılan hatalar maddeler halinde açıklanır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Taahhütname hatası vizeyi etkiler mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Taahhütnamedeki içerik hataları veya tarih uyuşmazlığı, vizenin beklenenden kısa verilmesine veya ret riskinin artmasına neden olabilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta öğrenci vizesi ile çalışabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Çalışma hakkı vize türüne göre değişir. Bu sayfada özet bilgi yer alır; Work & Study sürecinin şartları ve detayları için Malta Work & Study sayfasını inceleyin.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi/#breadcrumb',
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
            name: 'Malta Öğrenci Vizesi',
            item: 'https://maltadilokuluingilizce.com/malta-ogrenci-vizesi',
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Structured Data - @graph yapısı */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Sol Kolon - SEO + Snippet Odaklı */}
              <div>
                <header className="mb-6">
                  <h1 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl xl:text-5xl">
                    Malta Öğrenci Vizesi 2026
                  </h1>
                  <p className="mb-6 text-sm font-medium text-slate-600">
                    Malta dil okullarına kayıtlı öğrenciler için güncel vize başvuru bilgileri
                  </p>
                </header>

                <nav aria-label="Breadcrumb" className="mb-6">
                  <ol className="flex items-center gap-2 text-sm text-slate-600">
                    <li>
                      <Link href="/malta-dil-okullari" className="hover:text-slate-900 hover:underline">
                        Malta Dil Okulları
                      </Link>
                    </li>
                    <li>
                      <span className="text-slate-400">›</span>
                    </li>
                    <li>
                      <Link href="/malta-ogrenci-vizesi" className="hover:text-slate-900 hover:underline">
                        Malta Öğrenci Vizesi
                      </Link>
                    </li>
                  </ol>
                </nav>

                <div className="space-y-4 text-base leading-[1.6] text-slate-700 sm:leading-relaxed">
                  <p className="speakable-vize-tanim">
                    <strong>Malta öğrenci vizesi</strong>, Malta'da dil okulu eğitimi almak isteyen öğrencilerin başvurması gereken resmî izin belgesidir. Bu vize, Malta'da eğitim almak için gerekli yasal düzenlemeleri kapsar ve başvuru süreci, eğitim süresi ve pasaport türüne göre farklılık gösterir.
                  </p>

                  <p className="speakable-vize-pasaport">
                    <strong>Yeşil pasaport</strong> sahipleri, Malta'da 90 güne kadar eğitim almak için vize başvurusu yapmazlar; ancak 90 günü aşan eğitim programları için vize başvurusu zorunludur. <strong>Bordo pasaport</strong> sahipleri ise Malta'da eğitim almak için süre fark etmeksizin vize başvurusu yapmalıdır.
                  </p>

                  <p className="speakable-vize-kurumlar">
                    Malta öğrenci vizesi başvuruları, eğitim süresine göre iki farklı kurum üzerinden yapılır: <strong>90 günü aşmayan kısa süreli eğitim programları</strong> için başvurular <strong>VFS Global</strong> üzerinden, <strong>105 günden fazla uzun süreli eğitim programları</strong> için başvurular ise <strong>Identity Malta</strong> üzerinden gerçekleştirilir.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    Son güncelleme:{' '}
                    <time dateTime={dateModified || new Date().toISOString().split('T')[0]} className="font-medium text-slate-900">
                      {lastUpdated || new Date().toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </p>
                </div>
              </div>

              {/* Sağ Kolon - Gerekli Belgeler Tablosu */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-6">
                    <h2 id="gerekli-belgeler" className="mb-3 text-xl font-semibold text-slate-900 sm:text-2xl" itemProp="name">
                      Malta Öğrenci Vizesi İçin Gerekli Belgeler (2026)
                    </h2>
                    <p className="mb-6 text-sm leading-relaxed text-slate-700 speakable-vize-belgeler">
                      Aşağıdaki belge listesi, <strong>Malta'daki dil okullarına kayıtlı öğrenciler</strong> için geçerlidir.
                    </p>

                    <div className="overflow-x-auto">
                      <table 
                        id="gerekli-belgeler-tablosu" 
                        className="w-full" 
                        itemScope 
                        itemType="https://schema.org/Table"
                      >
                        <caption className="sr-only" itemProp="description">
                          Malta öğrenci vizesi için gerekli belgeler ve zorunluluk durumları 2026
                        </caption>
                        <thead className="bg-slate-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                              Belge
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                              Zorunluluk Durumu
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Pasaport (en az 6 ay geçerli)</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Dil Okulu Kabul Mektubu</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Konaklama Belgesi</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Son 3 Aylık Banka Dökümü</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Seyahat Sağlık Sigortası</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Vize Başvuru Formu</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Biyometrik Fotoğraf</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Zorunlu</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Uçuş Rezervasyonu</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Gerekli</td>
                          </tr>
                          <tr className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/ListItem">
                            <td className="px-4 py-3 text-sm text-slate-700" itemProp="name">Adli Sicil Kaydı</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900" itemProp="description">Gerekli</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* İçindekiler */}
        <TableOfContents />

        {/* Vize Türü Seçimi ve Başvuru Süreci */}
        <VizeBasvuruSureci />

        {/* Vize CTA Section */}
        <VizeCTASection />

        {/* Vize Ücretleri */}
        <VizeUcretleri />

        {/* Banka Bakiye Gereksinimi */}
        <BankaBakiyeGereksinimi />

        {/* Vize Sonuçlanma Süresi */}
        <VizeSonuclanmaSuresi />

        {/* Çalışma İzni Bilgisi */}
        <CalismaIzniBilgi />

        {/* Work & Study CTA */}
        <WorkStudyCTA />

        {/* Vize Reddi Nedenleri */}
        <VizeReddiNedenleri />

        {/* FAQ Bölümü */}
        <VizeFAQ />

        {/* Bu İçerik Nasıl Hazırlandı? */}
        <IcerikHazirlama />
      </main>
    </>
  );
}
