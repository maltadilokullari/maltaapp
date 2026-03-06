'use client';

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import TableOfContents from './components/TableOfContents';
import PriceIndexSection from './components/PriceIndexSection';
import DurationPlanSection from './components/DurationPlanSection';
import PaymentScheduleSection from './components/PaymentScheduleSection';
import PaymentGuideSection from './components/PaymentGuideSection';
import PackagePriceGuideSection from './components/PackagePriceGuideSection';
import FAQSection from './components/FAQSection';
import SchoolSectionESE from './components/SchoolSectionESE';
import SchoolSectionEC from './components/SchoolSectionEC';
import SchoolSectionACEEnglish from './components/SchoolSectionACEEnglish';
import SchoolSectionIELS from './components/SchoolSectionIELS';
import SchoolSectionAMLanguage from './components/SchoolSectionAMLanguage';
import SchoolSectionGateway from './components/SchoolSectionGateway';
import SchoolSectionClubclass from './components/SchoolSectionClubclass';
import SchoolSectionInlingua from './components/SchoolSectionInlingua';
import SchoolSectionAtlas from './components/SchoolSectionAtlas';
import SchoolSectionBELS from './components/SchoolSectionBELS';
import IcerikHazirlama from './components/IcerikHazirlama';

const schools = [
  { name: 'ESE Malta', prices: { '1ay': 1840, '3ay': 3840, '6ay': 7200 } },
  { name: 'EC Malta', prices: { '1ay': 1749, '3ay': 4773, '6ay': 9187 } },
  { name: 'IELS Malta', prices: { '1ay': 1402, '3ay': 4009, '6ay': 7919 } },
  { name: 'ACE Malta', prices: { '1ay': 1495, '3ay': 3775, '6ay': 7375 } },
  { name: 'AM Language', prices: { '1ay': 1360, '3ay': 3465, '6ay': 6240 } },
  { name: 'inlingua Malta', prices: { '1ay': 1250, '3ay': 3575, '6ay': 7064 } },
  { name: 'Atlas Malta', prices: { '1ay': 1700, '3ay': 4620, '6ay': 7920 } },
  { name: 'Clubclass Malta', prices: { '1ay': 1250, '3ay': 3272, '6ay': 6026 } },
  { name: 'Gateway Malta', prices: { '1ay': 1384, '3ay': 3360, '6ay': 6480 } },
  { name: 'BELS Malta', prices: { '1ay': 1660, '3ay': 4320, '6ay': 8640 } },
];

export default function MaltaDilOkuluFiyatlariPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const datePublished = '2026-01-01';
  const dateModified = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Scroll kontrolü
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Structured Data - @graph yapısı (diğer sayfalarla tutarlılık için)
  const allSchoolKeywords = schools.map((s) => `${s.name} fiyat`).join(', ');
  
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
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari',
        name: 'Malta Dil Okulu Fiyatları 2026 | Güncel Fiyat Listesi ve Hesaplama',
        description:
          'Malta dil okulu fiyatları 2026: Haftalık, aylık ve dönemlik eğitim ücretleri. Konaklama fiyatları, yaşam maliyetleri ve toplam bütçe hesaplama.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#featured-image',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '.speakable-fiyat-araligi',
            '.speakable-endeks-giris',
            '.speakable-sure-ozet',
            '.speakable-odeme-ozet',
            '.speakable-ilk-gun-butce',
            '.speakable-ese-fiyat-aciklama',
            '.speakable-ese-bilgiler',
            '.speakable-ese-fiyat-araligi',
            '.speakable-ec-fiyat-aciklama',
            '.speakable-ec-bilgiler',
            '.speakable-ec-fiyat-araligi',
            '.speakable-ace-fiyat-aciklama',
            '.speakable-ace-bilgiler',
            '.speakable-ace-fiyat-araligi',
            '.speakable-iels-fiyat-aciklama',
            '.speakable-iels-bilgiler',
            '.speakable-iels-fiyat-araligi',
            '.speakable-am-fiyat-aciklama',
            '.speakable-am-bilgiler',
            '.speakable-am-fiyat-araligi',
            '.speakable-gateway-fiyat-aciklama',
            '.speakable-gateway-bilgiler',
            '.speakable-gateway-fiyat-araligi',
            '.speakable-clubclass-fiyat-aciklama',
            '.speakable-clubclass-bilgiler',
            '.speakable-clubclass-fiyat-araligi',
            '.speakable-inlingua-fiyat-aciklama',
            '.speakable-inlingua-bilgiler',
            '.speakable-inlingua-fiyat-araligi',
            '.speakable-atlas-fiyat-aciklama',
            '.speakable-atlas-bilgiler',
            '.speakable-atlas-fiyat-araligi',
            '.speakable-bels-fiyat-aciklama',
            '.speakable-bels-bilgiler',
            '.speakable-bels-fiyat-araligi',
          ],
          xpath: [],
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#article',
        headline: 'Malta Dil Okulu Fiyatları 2026 | Güncel Fiyat Listesi ve Hesaplama',
        description:
          'Malta dil okulu fiyatları 2026: Haftalık, aylık ve dönemlik eğitim ücretleri. ESE Malta, EC Malta, IELS Malta ve diğer okulların konaklama fiyatları, yaşam maliyetleri ve toplam bütçe hesaplama.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#featured-image',
          },
        ],
        about: schools.map((school) => ({
          '@type': 'EducationalOrganization',
          name: `${school.name} Dil Okulu`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#breadcrumb',
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
            name: 'Malta Dil Okulu Fiyatları',
            item: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari',
          },
        ],
      },
      {
        '@type': 'Dataset',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#dataset',
        name: 'Malta Dil Okulu Fiyatları 2026',
        description: 'Malta dil okullarının 1 ay, 3 ay ve 6 aylık eğitim süreleri için karşılaştırmalı fiyat verileri',
        keywords: `Malta dil okulu fiyatları, ${allSchoolKeywords}, Malta dil okulu ücretleri, Malta İngilizce eğitim fiyatları`,
        license: 'https://maltadilokuluingilizce.com',
        creator: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        datePublished,
        dateModified,
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari#fiyat-tablolari',
        },
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#table-of-contents',
        name: 'İçindekiler',
        description: 'Malta dil okulu fiyatları sayfası içindekiler: Okul bazlı fiyat incelemeleri, fiyat rehberleri ve SSS',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari#içindekiler',
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari.webp',
        width: 1200,
        height: 675,
        name: 'Malta Dil Okulu Fiyatları 2026',
        description: 'Malta dil okulu fiyatları 2026: Tüm okulların karşılaştırmalı fiyat listesi, paket seçenekleri ve detaylı rehber',
        caption: 'Malta Dil Okulu Fiyatları 2026 - Tüm okulların karşılaştırmalı fiyat listesi ve paket seçenekleri',
        contentUrl: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari.webp',
        encodingFormat: 'image/webp',
        license: 'https://maltadilokuluingilizce.com',
      },
      {
        '@type': 'Dataset',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#fiyat-endeksi-dataset',
        name: 'Malta Dil Okulu Fiyat Endeksi (2026) — Referans Seviye',
        description:
          '2026 yılı için program senaryolarına göre referans maliyet seviyesi (endeks) tablosu. Bu veri, fiyat karşılaştırması için tamamlayıcı bir referans sağlar.',
        keywords:
          'Malta dil okulu fiyat endeksi 2026, referans seviye, fiyat endeksi, program senaryosu, 20 ders, yaz sezonu, düşük sezon, uzun dönem',
        license: 'https://maltadilokuluingilizce.com',
        creator: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        datePublished,
        dateModified,
        hasPart: [
          { '@type': 'CreativeWork', name: 'Düşük sezon + 20 ders + paylaşımlı konaklama', description: 'Endeks: 90 – 95' },
          { '@type': 'CreativeWork', name: 'Standart paket (referans)', description: 'Endeks: 100' },
          { '@type': 'CreativeWork', name: 'Yaz sezonu + 20 ders', description: 'Endeks: 105 – 110' },
          { '@type': 'CreativeWork', name: 'Yaz sezonu + 30 ders (yoğun program)', description: 'Endeks: 110 – 115' },
          { '@type': 'CreativeWork', name: 'Tek kişilik oda + yaz sezonu', description: 'Endeks: 120 – 130' },
          { '@type': 'CreativeWork', name: '24 hafta ve üzeri uzun dönem program', description: 'Endeks: 95 – 98' },
        ],
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'text/html',
          contentUrl: 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari#fiyat-endeksi',
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#kac-ay-planliyorum',
        name: 'Kaç Ay Planlıyorsun? (2026 Ortalama Paket Fiyat Aralıkları)',
        description:
          '2026 yılı için kurs + konaklama dahil genel maliyet seviyesini süre bazında özetleyen ortalama paket aralıkları.',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: 4,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '1 Ay (4 Hafta)',
            description: 'Toplam Paket: 1.350 € – 1.800 €; Kısa dönem, başlangıç seviyesi',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '2 Ay (8 Hafta)',
            description: 'Toplam Paket: 2.200 € – 2.900 €; Aylık ortalama: 1.100 € – 1.450 €',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: '3 Ay (12 Hafta)',
            description: 'Toplam Paket: 3.800 € – 4.900 €; Aylık ortalama: 1.260 € – 1.630 €',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: '6 Ay (24 Hafta)',
            description: 'Toplam Paket: 7.000 € – 9.000 €; Aylık ortalama: 1.160 € – 1.500 €',
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari#odeme-takvimi',
        name: 'Malta Dil Okulu Ödeme Takvimi ve İlk Gün Bütçesi (2026)',
        description:
          '2026 yılı için genel ödeme takvimi ve varış günü/ilk hafta bütçesi özet rehberi. Net fiyat karşılaştırması içermez, yönlendirici plan sağlar.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Kayıt / rezervasyon anı',
            text: 'Kayıt + materyal / depozito (varsa). Paketlere göre dahil olabilir; "dahil / hariç" kontrolü şart.',
          },
          {
            '@type': 'HowToStep',
            name: 'Başlangıçtan 2–6 hafta önce',
            text: 'Kalan kurs + konaklama bakiyesi. Sezon yoğunluğunda (özellikle yaz) kontenjan hızlı dolar; erken netleştirmek avantaj sağlar.',
          },
          {
            '@type': 'HowToStep',
            name: 'Varış günü / ilk hafta',
            text: 'Konaklama depozitosu / ilk hafta giderleri. Depozito iade koşulu konaklama tipine göre değişebilir.',
          },
          {
            '@type': 'HowToStep',
            name: 'Süre uzadıkça',
            text: 'Opsiyonel farklar (tek kişilik oda, ensuite, sezon farkı, transfer). En çok bütçe şaşırtan nokta burasıdır; "başlangıç fiyatı" ile "toplam maliyet" aynı değildir.',
          },
        ],
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          minValue: 150,
          maxValue: 400,
          name: 'İlk Gün / İlk Hafta Bütçesi (2026)',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Malta dil okulu fiyatları 2026\'da ne kadar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları 2026\'da süreye göre değişir: 4 hafta 1.350–1.800 €, 12 hafta 3.800–4.900 €, 24 hafta 7.000–9.000 €. Fiyatlar haftalık ücretlerin toplamıdır. Sezon (yaz) ve konaklama toplamı en çok değiştirir. Net rakam için ders sayısı + oda tipi aynı olmalıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu fiyatları haftalık mı hesaplanır?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları çoğunlukla haftalık belirlenir; 1 ay/12 hafta/24 hafta ücretleri haftalık ücretlerin toplamından oluşur. Süre uzadıkça haftalık ortalama düşebilir. 20 ders ve 30 ders farklı haftalık ücrete sahiptir. Yaz sezonu haftalık fark ekleyebilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu paket fiyatına neler dahildir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları \'paket\' olarak verildiyse genelde kurs + konaklama toplamını ifade eder; ancak içerik okuldan okula değişebilir. Genelde: kurs, konaklama (oda tipi netse). Bazen: kayıt veya materyal. Sıkça ayrıca: sezon farkı, tek kişilik oda/ensuite, transfer.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu fiyatları neden bu kadar değişken?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları aynı sürede bile değişebilir; çünkü toplam maliyet sezon + ders sayısı + konaklama türü birleşimiyle oluşur. Yaz/kış sezonu fiyatı yukarı-aşağı çeker. 20 ders–30 ders farkı toplamı büyütür. Oda tipi ve tek kişilik farkı en büyük oynatıcıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Yaz sezonunda Malta dil okulu fiyatları daha mı pahalı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet, yaz sezonunda Malta dil okulu fiyatları genelde artar; çünkü talep yükselir ve sezon farkı haftalık maliyete eklenebilir. Haziran–Eylül aralığı daha yüksek bütçe gerektirebilir. Konaklama tarafı daha hızlı yükselir. Uzun dönemlerde bazı paketlerde fark daha sınırlı kalabilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu ücretini kime ödüyoruz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları için ödemeler çoğunlukla doğrudan okula yapılır; ön kayıt kartla, kalan tutar okul hesabına havale ile tamamlanabilir. Ödeme dekontu vize için önemlidir. Paket içeriği \'dahil/hariç\' kontrol edilmelidir. Süre uzadıkça toplam tutar büyür, planlama şarttır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu ödemesi tek seferde mi yapılır?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları çoğu başvuruda tek seferde ödenir; çünkü vize dosyasında ödemenin tamamlandığını gösteren dekont istenebilir. Ön kayıt + kalan bakiye şeklinde iki aşama görülebilir. Başlangıca 2–6 hafta kala bakiye kapanır. Sezonda erken ödeme kontenjan avantajı sağlar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu fiyatlarına konaklama depozitosu dahil mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları pakete göre değişir; konaklama depozitosu çoğu zaman paketten ayrı alınır ve çıkışta iade edilebilir. Depozito iade şartı konaklama tipine bağlıdır. Hasar/eksik durumunda kesinti olabilir. Netleşmesi gereken kalemlerden biridir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu fiyatları uzun sürede neden daha avantajlı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okulu fiyatları uzun dönemde daha avantajlı görünebilir; çünkü birçok programda süre uzadıkça haftalık kurs ücreti düşebilir. 12–24 hafta planlarda haftalık ortalama dengelenir. Toplam artar ama aylık ortalama düşebilir. En büyük farkı yine konaklama standardı belirler.',
            },
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#package-price-guide',
        headline: 'Malta Dil Okulu Paket Fiyatı Nedir ve Neleri Kapsar? (2026)',
        description:
          'Malta dil okulu paket fiyatları neyi kapsar? "Her şey dahil" ifadesi ne anlama gelir? Paket fiyat karşılaştırmasında dikkat edilmesi gerekenler.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        datePublished,
        dateModified,
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okulu-fiyatlari/#webpage',
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://maltadilokuluingilizce.com/#ese-malta-additional-info',
        name: 'ESE Malta Dil Okulu',
        description: 'ESE Malta 2026 fiyatlarına dair bilinmesi gerekenler: ek maliyetler, uçak bileti kampanyası, yaz sezonu farkları, kayıt ücretleri',
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Uçak Bileti Kampanyası',
            value: '15 hafta ve üzeri eğitimlerde İstanbul–Malta gidiş–dönüş uçak bileti kampanya kapsamında sunulmaktadır',
          },
          {
            '@type': 'PropertyValue',
            name: 'Uzun Dönem İndirimi',
            value: '8 hafta ve üzeri programlarda uzun dönem indirimli paket fiyatlar geçerlidir',
          },
          {
            '@type': 'PropertyValue',
            name: 'Konaklama Hizmet Bedeli',
            value: 'Haftalık 25€',
          },
          {
            '@type': 'PropertyValue',
            name: 'Yaz Sezonu Farkı',
            value: '28 Haziran – 30 Ağustos arası haftalık 70€',
          },
          {
            '@type': 'PropertyValue',
            name: 'Tek Kişilik Oda Farkı',
            value: 'Haftalık 170€',
          },
          {
            '@type': 'PropertyValue',
            name: 'Kayıt Ücretleri',
            value: 'Toplam 110€ (50€ kayıt, 30€ kitap, 30€ konaklama yerleştirme)',
          },
        ],
      },
      // Her okul için EducationalOrganization + Product + Offer
      ...schools.flatMap((school) => {
        const schoolSlug = school.name.toLowerCase().replace(/\s+/g, '-').replace('language', 'language-studio');
        return [
          {
            '@type': 'EducationalOrganization',
            '@id': `https://maltadilokuluingilizce.com/#${schoolSlug}`,
            name: `${school.name} Dil Okulu`,
            description: `${school.name} dil okulu Malta dil eğitimi fiyatları ve paket bilgileri`,
            url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${schoolSlug}`,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'MT',
            },
          },
          {
            '@type': 'Product',
            '@id': `https://maltadilokuluingilizce.com/#${schoolSlug}-product`,
            name: `${school.name} Dil Okulu Eğitim Paketleri`,
            description: `${school.name} dil okulu için 1 ay, 3 ay ve 6 aylık İngilizce eğitim paketleri`,
            brand: {
              '@type': 'Brand',
              name: school.name,
            },
            category: 'Dil Eğitimi',
            offers: [
              {
                '@type': 'Offer',
                name: `${school.name} - 1 Ay (4 Hafta) Eğitim Paketi`,
                price: school.prices['1ay'],
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: school.prices['1ay'],
                  priceCurrency: 'EUR',
                  unitText: '1 ay (4 hafta)',
                },
                seller: {
                  '@id': `https://maltadilokuluingilizce.com/#${schoolSlug}`,
                },
              },
              {
                '@type': 'Offer',
                name: `${school.name} - 3 Ay (12 Hafta) Eğitim Paketi`,
                price: school.prices['3ay'],
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: school.prices['3ay'],
                  priceCurrency: 'EUR',
                  unitText: '3 ay (12 hafta)',
                },
                seller: {
                  '@id': `https://maltadilokuluingilizce.com/#${schoolSlug}`,
                },
              },
              {
                '@type': 'Offer',
                name: `${school.name} - 6 Ay (24 Hafta) Eğitim Paketi`,
                price: school.prices['6ay'],
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: school.prices['6ay'],
                  priceCurrency: 'EUR',
                  unitText: '6 ay (24 hafta)',
                },
                seller: {
                  '@id': `https://maltadilokuluingilizce.com/#${schoolSlug}`,
                },
              },
            ],
          },
        ];
      }),
    ],
  };




  return (
    <>
      {/* Structured Data - @graph yapısı (tüm schema'lar tek JSON-LD'de) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <main className="pt-20">
        <Hero />
        <TableOfContents />
        <SchoolSectionESE />
        <SchoolSectionEC />
        <SchoolSectionACEEnglish />
        <SchoolSectionIELS />
        <SchoolSectionAMLanguage />
        <SchoolSectionGateway />
        <SchoolSectionClubclass />
        <SchoolSectionInlingua />
        <SchoolSectionAtlas />
        <SchoolSectionBELS />
        <PriceIndexSection />
        <DurationPlanSection />
        <PaymentScheduleSection />
        <PaymentGuideSection />
        <PackagePriceGuideSection />
        <FAQSection />
        <IcerikHazirlama />
      </main>

      {/* Yukarı Çık Butonu */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Sayfanın başına dön"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}
