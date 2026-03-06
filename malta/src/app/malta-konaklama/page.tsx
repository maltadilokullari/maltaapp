'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { schools } from '../data/schools';
import TableOfContents from './components/TableOfContents';
import FAQSection from './components/FAQSection';
import IcerikHazirlama from './components/IcerikHazirlama';

export default function MaltaKonaklamaPage() {
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

  // Konaklama türleri verisi
  const konaklamaTurleri = [
    {
      tur: 'Aile Yanı (Homestay)',
      odak: 'Malta Kültürü',
      aciklama: 'Yerel ailelerle yaşam, günlük hayatta İngilizce pratiği ve yemek opsiyonları',
    },
    {
      tur: 'Öğrenci Rezidansı / Residence',
      odak: 'Sosyal Yaşam',
      aciklama: 'Okula yakın konum, ortak alanlar ve uluslararası öğrenci ortamı',
    },
    {
      tur: 'Paylaşımlı Apart / Student Apartment',
      odak: 'Bağımsız Yaşam',
      aciklama: 'Mutfaklı daire, diğer öğrencilerle paylaşımlı yaşam',
    },
    {
      tur: 'Stüdyo Daire (Studio Apartment)',
      odak: 'Konfor & Mahremiyet',
      aciklama: 'Tek kişilik özel alan, tam bağımsız konaklama',
    },
    {
      tur: 'Oteller (3★–5★)',
      odak: 'Konfor & Hizmet',
      aciklama: 'Kısa dönemler için günlük temizlik ve otel hizmetleri',
    },
    {
      tur: 'Hosteller',
      odak: 'Bütçe & Sosyal Ortam',
      aciklama: 'Ekonomik fiyatlar, özellikle yaz döneminde dinamik yaşam',
    },
    {
      tur: 'Öğretmenle Yaşam (Stay with a Teacher)',
      odak: 'Yoğun Dil Pratiği',
      aciklama: 'İngilizceye tam maruz kalma, bire bir günlük iletişim',
    },
    {
      tur: 'Özel Kiralık Daire (Private Rentals)',
      odak: 'Uzun Dönem Yaşam',
      aciklama: 'Malta\'da uzun süreli kalacaklar için tam bağımsız çözüm',
    },
  ];

  // Structured Data - @graph yapısı
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-konaklama',
        name: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)',
        description:
          'Malta konaklama seçenekleri 2026: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları, imkanlar ve seçim rehberi.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#breadcrumb',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#featured-image',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Anasayfa',
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
            name: 'Malta Konaklama',
            item: 'https://maltadilokuluingilizce.com/malta-konaklama',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#article',
        headline: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)',
        description:
          'Malta konaklama seçenekleri 2026: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları, imkanlar ve seçim rehberi.',
        author: {
          '@type': 'Organization',
          name: 'Malta Dil Okulu İngilizce',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Malta Dil Okulu İngilizce',
          logo: {
            '@type': 'ImageObject',
            url: 'https://maltadilokuluingilizce.com/logo-header.png',
          },
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#featured-image',
            url: 'https://maltadilokuluingilizce.com/malta-hizmetler/malta-ogrenci-konaklama.webp',
            width: 1200,
            height: 630,
            caption: 'Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar 2026',
            description: 'Malta konaklama seçenekleri: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları ve seçim rehberi.',
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#school-list',
        name: 'Malta Dil Okulları Konaklama Seçenekleri 2026',
        description: "Malta'daki dil okulları, öğrenciler için farklı konaklama türleri ve fiyatlar sunar. Her okulun sunduğu aile yanı, rezidans, paylaşımlı apart ve diğer konaklama türlerini keşfedin.",
        itemListElement: schools.map((school, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Organization',
            '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
            name: school.name,
            url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: school.region,
              addressCountry: 'MT',
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq',
        name: 'Malta Dil Okulları Konaklama: Sıkça Sorulan Sorular',
        description: 'Malta dil okulları konaklama fiyatları, konaklama türleri, seçim rehberi ve sık sorulan sorular. Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hostel konaklama seçenekleri hakkında detaylı bilgiler.',
        mainEntity: [
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-1',
            name: 'Malta dil okulları konaklama fiyatları 2026 yılında ne kadar?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-1',
              text: 'Malta dil okulları konaklama fiyatları 2026 yılında konaklama türüne göre değişmekle birlikte genellikle haftalık ortalama 150 – 350 Euro aralığındadır. Fiyatlar sezon, konum ve kalış süresine göre farklılık gösterebilir.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-2',
            name: 'Malta\'da dil okulu öğrencileri için hangi konaklama seçenekleri vardır?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-2',
              text: 'Malta\'da dil okulu öğrencileri için aile yanı, öğrenci rezidansı, paylaşımlı apart, stüdyo daire, hostel ve otel gibi farklı konaklama seçenekleri sunulmaktadır.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-3',
            name: 'Malta dil okulları için en çok tercih edilen konaklama hangisidir?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-3',
              text: 'Malta dil okullarında en çok tercih edilen konaklama türleri aile yanı ve öğrenci rezidansıdır. Aile yanı dil pratiği, rezidanslar ise sosyal ortam avantajı sunar.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-4',
            name: 'Malta\'da aile yanı konaklama mı rezidans mı daha avantajlı?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-4',
              text: 'Aile yanı konaklama dil pratiği ve kültürel deneyim açısından avantajlıyken, öğrenci rezidansı sosyal yaşam ve bağımsızlık açısından öne çıkar. Tercih öğrencinin beklentisine göre değişir.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-5',
            name: 'Malta dil okulları konaklamaları okula yakın mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-5',
              text: 'Malta dil okulları konaklamaları genellikle okula yürüme mesafesinde veya toplu taşıma ile kolay ulaşılabilir bölgelerde planlanmaktadır.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-6',
            name: 'Malta\'da konaklama fiyatları okula göre değişir mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-6',
              text: 'Evet, Malta\'da konaklama fiyatları dil okuluna, okulun bulunduğu bölgeye ve anlaşmalı konaklama türlerine göre değişiklik gösterebilir.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-7',
            name: 'Malta dil okulu konaklamalarında yemek dahil mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-7',
              text: 'Aile yanı konaklamalarda genellikle kahvaltı veya yarım pansiyon seçenekleri bulunur. Rezidans, apart ve stüdyo dairelerde yemek çoğunlukla dahil değildir.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-8',
            name: 'Malta\'da konaklama süresi eğitim süresiyle aynı olmak zorunda mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-8',
              text: 'Hayır, Malta dil okulları konaklamalarında konaklama süresi eğitim süresinden daha kısa veya daha uzun olacak şekilde ayarlanabilir.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-9',
            name: 'Malta\'ya gitmeden önce konaklama ayarlamak zorunlu mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-9',
              text: 'Malta\'ya dil eğitimi için giden öğrenciler için konaklamanın önceden ayarlanması önerilir, özellikle yoğun sezonlarda bu büyük avantaj sağlar.',
            },
          },
          {
            '@type': 'Question',
            '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-10',
            name: 'Malta dil okulları konaklama değişikliği yapılabilir mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              '@id': 'https://maltadilokuluingilizce.com/malta-konaklama/#faq-answer-10',
              text: 'Evet, konaklamadan memnun kalınmaması durumunda çoğu dil okulu, müsaitlik durumuna göre konaklama değişikliği yapılmasına yardımcı olur.',
            },
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

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Sol Kısım */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)
              </h1>
              <div className="text-base sm:text-lg text-slate-700 leading-[1.6] sm:leading-relaxed space-y-4">
                <p>
                  <strong>Malta Konaklama: Öğrenciler İçin Seçenekler ve Fiyatlar (2026)</strong> kapsamında Malta'da eğitim alan öğrenciler için sunulan konaklama türleri <strong>aile yanı (homestay)</strong>, <strong>öğrenci rezidansı (residence)</strong>, <strong>paylaşımlı apart daireler</strong>, <strong>stüdyo daireler</strong>, <strong>hosteller</strong> ve <strong>özel kiralık dairelerden</strong> oluşmaktadır. Bu sayfada 2026 yılı güncel Malta öğrenci konaklama fiyatlarını, her konaklama türünün sunduğu imkanları ve fiyat farklarının <strong>sezon, konum ve konaklama süresine göre</strong> nasıl değiştiğini net şekilde bulabilirsiniz.
                </p>
              </div>

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mt-6" itemScope itemType="https://schema.org/BreadcrumbList">
                <ol className="flex items-center gap-2 text-sm flex-wrap">
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" className="text-slate-600 hover:text-slate-900 hover:underline transition-colors" itemProp="item">
                      <span itemProp="name">Anasayfa</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <li className="text-slate-400" aria-hidden="true">›</li>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/malta-dil-okullari" className="text-slate-600 hover:text-slate-900 hover:underline transition-colors" itemProp="item">
                      <span itemProp="name">Malta Dil Okulları</span>
                    </Link>
                    <meta itemProp="position" content="2" />
                  </li>
                  <li className="text-slate-400" aria-hidden="true">›</li>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/malta-konaklama" className="text-slate-600 hover:text-slate-900 hover:underline transition-colors" itemProp="item">
                      <span className="text-slate-900 font-medium" itemProp="name">Malta Konaklama</span>
                    </Link>
                    <meta itemProp="position" content="3" />
                  </li>
                </ol>
              </nav>

              {/* Tarih */}
              <div className="text-sm text-slate-600 mt-4">
                Son kontrol: <time dateTime={dateModified} className="font-semibold">
                  {lastUpdated}
                </time> • bilgiler günceldir.
              </div>
            </div>

            {/* Sağ Kısım - Konaklama Türleri Bilgi Kutusu */}
            <div>
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 md:p-8 shadow-xl border border-blue-200/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Malta Dil Okulları Konaklama Türleri
                  </h2>
                </div>
                <div className="space-y-3">
                  {konaklamaTurleri.map((item, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-bold text-slate-900 text-sm leading-tight">{item.tur}</h3>
                          <span className="flex-shrink-0 px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-semibold">
                            {item.odak}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.aciklama}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <TableOfContents />

      {/* Main Content */}
      <main className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          {/* Aile Yanı Konaklama Bölümü */}
          <section 
            id="aile-yani-konaklama" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Sol Kısım - Metin */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                  itemProp="headline"
                >
                  Aile Yanı Konaklama (Malta Dil Okulları)
                </h2>
                
                <div className="space-y-4" itemProp="articleBody">
                  <p className="text-base text-slate-700 leading-relaxed">
                    Aile yanı konaklama, <strong>Malta dil okullarında eğitim alan öğrenciler için en çok tercih edilen konaklama seçeneklerinden biridir</strong>. Öğrenciler, Maltalı ailelerin evlerinde konaklayarak <strong>Malta kültürünü yakından tanıma</strong> ve <strong>günlük hayatta sürekli İngilizce pratiği yapma imkânı</strong> bulur. Malta dil okulları tarafından organize edilen aile yanı konaklamalar genellikle <strong>okula ulaşımı kolay bölgelerde</strong> yer alır ve <strong>güvenli bir yaşam ortamı</strong> sunar.
                  </p>

                  <p className="text-base text-slate-700 leading-relaxed">
                    Malta dil okulları aile yanı konaklama seçeneklerinde <strong>tek kişilik veya paylaşımlı odalar</strong>, ayrıca <strong>kahvaltı ya da yarım pansiyon</strong> gibi yemek alternatifleri bulunabilir. <strong>2026 Malta aile yanı konaklama fiyatları</strong>; yaz–kış sezonuna, oda tipine ve konaklama süresine göre değişiklik göstermektedir. Özellikle <strong>dil pratiğini ön planda tutan öğrenciler</strong> için aile yanı, Malta'da dil eğitimi sürecini daha verimli ve hızlı hale getiren bir konaklama modelidir.
                  </p>
                </div>
              </div>

              {/* Sağ Kısım - Resim */}
              <div>
                <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src="/malta-konaklama/malta-aile-yani-konaklama.webp"
                    alt="Malta aile yanı konaklama - Maltalı ailelerle yaşam, günlük İngilizce pratiği ve kültürel deneyim. Malta dil okulları öğrencileri için aile yanı konaklama seçenekleri."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    itemProp="image"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm leading-relaxed">
                    Malta aile yanı konaklama: Maltalı ailelerin evlerinde konaklayan öğrenciler, günlük hayatta sürekli İngilizce pratiği yapma ve Malta kültürünü yakından tanıma imkânı bulur. Malta dil okulları tarafından organize edilen aile yanı konaklamalar, okula ulaşımı kolay bölgelerde yer alır ve güvenli bir yaşam ortamı sunar.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Öğrenci Rezidansı Konaklama Bölümü */}
          <section 
            id="ogrenci-rezidansi-konaklama" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Sol Kısım - Metin */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                  itemProp="headline"
                >
                  Öğrenci Rezidansı Konaklama (Malta Dil Okulları)
                </h2>
                
                <div className="space-y-4" itemProp="articleBody">
                  <p className="text-base text-slate-700 leading-relaxed">
                    Öğrenci rezidansı konaklama, <strong>Malta dil okullarında eğitim alan öğrenciler için sosyal yaşamı ön planda tutan modern bir konaklama seçeneğidir</strong>. Malta dil okullarına ait ya da okullarla anlaşmalı rezidanslar genellikle <strong>okullara yürüme mesafesinde veya kolay ulaşım sağlanan bölgelerde</strong> konumlanır. Bu konaklama türü, <strong>farklı ülkelerden gelen öğrencilerle birlikte yaşama imkânı</strong> sunarak <strong>uluslararası bir ortamda İngilizce pratiğini</strong> destekler.
                  </p>

                  <p className="text-base text-slate-700 leading-relaxed">
                    Malta dil okulları öğrenci rezidansı konaklamalarında <strong>tek kişilik veya paylaşımlı odalar</strong>, <strong>ortak mutfak, çalışma alanları</strong> ve bazı rezidanslarda <strong>spor salonu veya sosyal alanlar</strong> bulunabilir. <strong>2026 Malta öğrenci rezidansı konaklama fiyatları</strong>; rezidansın konumu, oda tipi ve kalış süresine göre değişiklik göstermektedir. <strong>Sosyal bir ortamda kalmak ve okul hayatını daha aktif yaşamak isteyen öğrenciler</strong> için rezidans konaklama, Malta dil okulları sürecini daha keyifli hale getiren güçlü bir alternatiftir.
                  </p>
                </div>
              </div>

              {/* Sağ Kısım - Resim */}
              <div>
                <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src="/malta-konaklama/malta-ogrenci-rezidansi-konaklama.webp"
                    alt="Malta öğrenci rezidansı konaklama - Sosyal yaşam odaklı modern konaklama, uluslararası öğrenci ortamı ve okula yakın konum. Malta dil okulları öğrencileri için rezidans seçenekleri."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    itemProp="image"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm leading-relaxed">
                    Malta öğrenci rezidansı konaklama: Malta dil okullarına ait veya anlaşmalı rezidanslar, okullara yürüme mesafesinde konumlanır. Farklı ülkelerden gelen öğrencilerle birlikte yaşama imkânı sunarak uluslararası bir ortamda İngilizce pratiğini destekler. Ortak mutfak, çalışma alanları ve sosyal alanlar ile modern bir konaklama deneyimi.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Paylaşımlı Apart Konaklama Bölümü */}
          <section 
            id="paylasimli-apart-konaklama" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Sol Kısım - Metin */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                  itemProp="headline"
                >
                  Paylaşımlı Apart Konaklama (Malta Dil Okulları)
                </h2>
                
                <div className="space-y-4" itemProp="articleBody">
                  <p className="text-base text-slate-700 leading-relaxed">
                    Paylaşımlı apart konaklama, <strong>Malta dil okullarında eğitim alan öğrenciler için daha bağımsız bir yaşam alanı sunan konaklama seçeneklerinden biridir</strong>. Bu konaklama türünde öğrenciler, genellikle <strong>Malta dil okullarına yakın bölgelerde</strong> bulunan apart dairelerde, <strong>diğer uluslararası öğrencilerle birlikte</strong> konaklar. <strong>Günlük yaşamı kendi düzenine göre şekillendirmek isteyen öğrenciler</strong> için paylaşımlı apartlar ideal bir alternatiftir.
                  </p>

                  <p className="text-base text-slate-700 leading-relaxed">
                    Malta dil okulları paylaşımlı apart konaklamalarında <strong>ortak mutfak, banyo ve yaşam alanları</strong> bulunur; odalar ise <strong>tek kişilik veya paylaşımlı</strong> olarak sunulabilir. <strong>2026 Malta paylaşımlı apart konaklama fiyatları</strong>, dairenin konumu, oda tipi ve kalış süresine göre değişiklik göstermektedir. <strong>Hem sosyal bir ortamda kalmak hem de bağımsız yaşam deneyimi kazanmak isteyen öğrenciler</strong> için paylaşımlı apart konaklama, Malta dil okulları sürecinde sıkça tercih edilen bir seçenektir.
                  </p>
                </div>
              </div>

              {/* Sağ Kısım - Resim */}
              <div>
                <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src="/malta-konaklama/malta-paylasimli-apart-konaklama.webp"
                    alt="Malta paylaşımlı apart konaklama - Bağımsız yaşam alanı, ortak mutfak ve yaşam alanları. Malta dil okulları öğrencileri için paylaşımlı apart daire seçenekleri."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    itemProp="image"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm leading-relaxed">
                    Malta paylaşımlı apart konaklama: Malta dil okullarına yakın bölgelerde bulunan apart dairelerde, diğer uluslararası öğrencilerle birlikte konaklama. Ortak mutfak, banyo ve yaşam alanları ile bağımsız yaşam deneyimi. Günlük yaşamı kendi düzenine göre şekillendirmek isteyen öğrenciler için ideal bir alternatif.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Stüdyo Daire Konaklama Bölümü */}
          <section 
            id="studyo-daire-konaklama" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Sol Kısım - Metin */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                  itemProp="headline"
                >
                  Stüdyo Daire Konaklama (Malta Dil Okulları)
                </h2>
                
                <div className="space-y-4" itemProp="articleBody">
                  <p className="text-base text-slate-700 leading-relaxed">
                    Stüdyo daire konaklama, <strong>Malta dil okullarında eğitim alan öğrenciler için daha fazla konfor ve mahremiyet sunan bir konaklama seçeneğidir</strong>. <strong>Tek kişilik yaşam alanı</strong> sunan stüdyo daireler, <strong>Malta dil okullarına yakın bölgelerde veya toplu ulaşımla kolay erişilebilen lokasyonlarda</strong> yer alır. <strong>Kendi yaşam alanına sahip olmak isteyen öğrenciler</strong> için stüdyo daireler, daha sakin ve düzenli bir konaklama deneyimi sağlar.
                  </p>

                  <p className="text-base text-slate-700 leading-relaxed">
                    Malta dil okulları stüdyo daire konaklamalarında <strong>özel mutfak, banyo ve yaşam alanı tamamen öğrenciye aittir</strong>. <strong>2026 Malta stüdyo daire konaklama fiyatları</strong>; dairenin bulunduğu bölge, sezon ve kalış süresine göre değişiklik göstermektedir. <strong>Bağımsız yaşamı ve kişisel alanı ön planda tutan öğrenciler</strong> için stüdyo daire konaklama, Malta dil okulları sürecinde konfor odaklı bir tercih olarak öne çıkar.
                  </p>
                </div>
              </div>

              {/* Sağ Kısım - Resim */}
              <div>
                <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src="/malta-konaklama/malta-studyodaire-konaklama.webp"
                    alt="Malta stüdyo daire konaklama - Konfor ve mahremiyet odaklı tek kişilik yaşam alanı, özel mutfak ve banyo. Malta dil okulları öğrencileri için stüdyo daire seçenekleri."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    itemProp="image"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm leading-relaxed">
                    Malta stüdyo daire konaklama: Tek kişilik yaşam alanı sunan stüdyo daireler, Malta dil okullarına yakın bölgelerde veya toplu ulaşımla kolay erişilebilen lokasyonlarda yer alır. Özel mutfak, banyo ve yaşam alanı tamamen öğrenciye aittir. Bağımsız yaşamı ve kişisel alanı ön planda tutan öğrenciler için konfor odaklı bir tercih.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Hostel Konaklama Bölümü */}
          <section 
            id="hostel-konaklama" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Sol Kısım - Metin */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                  itemProp="headline"
                >
                  Hostel Konaklama (Malta Dil Okulları)
                </h2>
                
                <div className="space-y-4" itemProp="articleBody">
                  <p className="text-base text-slate-700 leading-relaxed">
                    Hostel konaklama, <strong>Malta dil okullarında eğitim alan öğrenciler için daha ekonomik ve sosyal bir konaklama seçeneğidir</strong>. Özellikle <strong>kısa süreli dil eğitimine katılan veya bütçesini daha kontrollü kullanmak isteyen öğrenciler</strong> tarafından tercih edilir. <strong>Malta'daki hosteller genellikle merkezi bölgelerde</strong> yer alır ve <strong>dil okullarına toplu taşıma ile kolay ulaşım imkânı</strong> sunar.
                  </p>

                  <p className="text-base text-slate-700 leading-relaxed">
                    Malta dil okulları hostel konaklamalarında <strong>odalar çoğunlukla paylaşımlı</strong> olarak sunulur; bazı hostellerde <strong>özel oda seçenekleri</strong> de bulunabilir. <strong>2026 Malta hostel konaklama fiyatları</strong>, odanın paylaşımlı veya özel olmasına, sezon yoğunluğuna ve kalış süresine göre değişiklik göstermektedir. <strong>Sosyal ortamı, farklı ülkelerden öğrencilerle iletişim kurma fırsatını ve ekonomik konaklamayı bir arada isteyen öğrenciler</strong> için hostel konaklama, Malta dil okulları sürecinde pratik bir alternatiftir.
                  </p>
                </div>
              </div>

              {/* Sağ Kısım - Resim */}
              <div>
                <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src="/malta-konaklama/malta-hostel-konaklama.webp"
                    alt="Malta hostel konaklama - Ekonomik ve sosyal konaklama seçeneği, paylaşımlı ve özel oda seçenekleri. Malta dil okulları öğrencileri için hostel konaklama seçenekleri."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    itemProp="image"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm leading-relaxed">
                    Malta hostel konaklama: Malta dil okullarında eğitim alan öğrenciler için ekonomik ve sosyal bir konaklama seçeneği. Merkezi bölgelerde yer alan hosteller, dil okullarına toplu taşıma ile kolay ulaşım imkânı sunar. Paylaşımlı veya özel oda seçenekleri ile kısa süreli dil eğitimine katılan öğrenciler için pratik bir alternatif.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Otel Konaklama Bölümü */}
          <section 
            id="otel-konaklama" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Sol Kısım - Metin */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" 
                  itemProp="headline"
                >
                  Otel Konaklama (Malta Dil Okulları)
                </h2>
                
                <div className="space-y-4" itemProp="articleBody">
                  <p className="text-base text-slate-700 leading-relaxed">
                    Otel konaklama, <strong>Malta dil okullarında eğitim alan öğrenciler için daha kısa süreli, konfor odaklı bir konaklama alternatifi sunar</strong>. Özellikle <strong>Malta'ya ilk kez gelen, eğitime başlamadan önce geçici bir konaklama arayan veya daha yüksek konfor beklentisi olan öğrenciler</strong> tarafından tercih edilir. <strong>Malta'daki oteller genellikle dil okullarına yakın merkezi bölgelerde veya toplu ulaşım açısından avantajlı lokasyonlarda</strong> yer alır.
                  </p>

                  <p className="text-base text-slate-700 leading-relaxed">
                    Malta dil okulları otel konaklama seçenekleri <strong>3, 4 ve 5 yıldızlı otellerden</strong> oluşur; odalar genellikle <strong>özel banyolu</strong> olup bazı otellerde <strong>kahvaltı dahil konaklama</strong> sunulmaktadır. <strong>2026 Malta otel konaklama fiyatları</strong>, otelin yıldız sayısına, konumuna, sezon yoğunluğuna ve kalış süresine göre değişiklik göstermektedir. <strong>Kısa dönemli konaklama, yüksek konfor ve hizmet önceliği olan öğrenciler</strong> için otel konaklama, Malta dil okulları sürecinde pratik bir çözüm olarak öne çıkar.
                  </p>
                </div>
              </div>

              {/* Sağ Kısım - Resim */}
              <div>
                <figure className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
                  <Image
                    src="/malta-konaklama/malta-otel-konaklama.webp"
                    alt="Malta otel konaklama - Kısa süreli konfor odaklı konaklama, 3-5 yıldızlı oteller ve özel banyolu odalar. Malta dil okulları öğrencileri için otel konaklama seçenekleri."
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    itemProp="image"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm leading-relaxed">
                    Malta otel konaklama: Malta dil okullarında eğitim alan öğrenciler için kısa süreli, konfor odaklı bir konaklama alternatifi. 3, 4 ve 5 yıldızlı oteller, özel banyolu odalar ve bazı otellerde kahvaltı dahil konaklama. Dil okullarına yakın merkezi bölgelerde veya toplu ulaşım açısından avantajlı lokasyonlarda yer alır.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Malta Dil Okulları Konaklama Seçenekleri Bölümü */}
          <section 
            id="malta-dil-okullari-konaklama-secenekleri" 
            className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm mb-8"
            itemScope 
            itemType="https://schema.org/ItemList"
          >
            <div className="mb-8">
              <h2 
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-4" 
                itemProp="name"
              >
                Malta Dil Okulları Konaklama Seçenekleri 2026
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Malta'daki dil okulları, öğrenciler için farklı konaklama türleri ve fiyatlar sunar. Aşağıdaki listeden ilgilendiğiniz okulu seçerek, o okula ait konaklama seçeneklerini ve 2026 güncel fiyatlarını inceleyebilirsiniz.
              </p>
            </div>

            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              {schools.map((school, index) => (
                <article
                  key={school.slug}
                  className="group relative bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                  itemScope
                  itemType="https://schema.org/Organization"
                  itemProp="itemListElement"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Okul Logosu */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={school.logo}
                        alt={`${school.name} logo`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>

                    {/* Okul Adı */}
                    <h3 
                      className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors"
                      itemProp="name"
                    >
                      {school.name}
                    </h3>

                    {/* Bölge Bilgisi */}
                    <p className="text-sm text-slate-500" itemProp="address">
                      {school.region}
                    </p>

                    {/* Konaklama Seçeneklerini Görüntüle Butonu */}
                    <Link
                      href={`/malta-dil-okullari/${school.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md text-center"
                      itemProp="url"
                    >
                      Konaklama Seçeneklerini Görüntüle
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSection />
        </div>
      </main>

      {/* İçerik Nasıl Hazırlandı */}
      <IcerikHazirlama />
    </>
  );
}
