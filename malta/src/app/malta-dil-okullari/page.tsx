'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { schools, getAllRegions, getAllTempos, type Region, type Tempo } from '../data/schools';
import TableOfContents from './components/TableOfContents';
import DilOkullariFAQ from './components/DilOkullariFAQ';
import IcerikHazirlama from './components/IcerikHazirlama';

export default function MaltaDilOkullariPage() {
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

  const [selectedRegion, setSelectedRegion] = useState<Region | 'Tümü'>('Tümü');
  const [selectedTempo, setSelectedTempo] = useState<Tempo | 'Tümü'>('Tümü');
  const [selectedProfile, setSelectedProfile] = useState<string>('Tümü');

  const regions = ['Tümü', ...getAllRegions()] as const;
  const tempos = ['Tümü', ...getAllTempos()] as const;
  
  const studentProfiles = [
    'Tümü',
    "İlk kez Malta'ya gidenler",
    'Hızlı ilerlemek isteyenler',
    'Modern yapı + tempolu eğitim',
    'Daha odaklı sınıf ortamı arayanlar',
    'Uygun bütçe + temel eğitim',
    'Daha ekonomik ve sakin bir ortam arayanlar',
    'Daha sakin + düzenli ilerleme',
    'Butik okul isteyenler',
    'Butik + düşük kalabalık isteyenler',
    'Sosyal + dengeli öğrenme isteyenler',
  ];

  // Placeholder veriler (sonra gerçek verilerle değiştirilecek)
  const fiyat_araligi_placeholder = '210-260';
  const maltaStart_notlar_placeholder =
    'Okulda bir yıl eğitim alan temsilcimizin gözlemleri: Sınıf aktiviteleri ve akıllı tahta sistemi öğrenmeyi destekliyor. Sosyal aktiviteler kapsamlı. Yoğun sezonda kalabalık sınıflarda öğrenme verimi düşebiliyor. Geçici öğretmenler bazen yetersiz kalabiliyor. Modern öğretim yöntemleri çeşitli öğrenme teknikleri sunuyor. Sınıfa geç katılmak zor olabiliyor. Türk öğrenci oranı dengeli, yoğunluk yaratmıyor.';

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const regionMatch = selectedRegion === 'Tümü' || school.region === selectedRegion;
      const tempoMatch = selectedTempo === 'Tümü' || school.tempo === selectedTempo;
      
      // Öğrenci profili filtresi
      let profileMatch = true;
      if (selectedProfile !== 'Tümü') {
        profileMatch = school.suitableForSummary === selectedProfile;
      }
      
      return regionMatch && tempoMatch && profileMatch;
    });
  }, [selectedRegion, selectedTempo, selectedProfile]);

  // Görsel dosya adları mapping
  const schoolImageMap: Record<string, string> = {
    'ese-malta': 'ese-malta-dil-okulu-st-julians.webp',
    'ec-malta': 'ec-malta-dil-okulu-st-julians.webp',
    'iels-malta': 'iels-malta-dil-okulu-sliema.webp',
    'ace-english-malta': 'ace-english-malta-dil-okulu-st-julians.webp',
    'am-language-malta': 'am-language-studio-malta-sliema.webp',
    'clubclass-malta': 'clubclass-malta-dil-okulu-swieqi.webp',
    'gateway-malta': 'gateway-school-of-english-malta-san-gwann.webp',
    'inlingua-malta': 'inlingua-malta-dil-okulu-sliema.webp',
    'atlas-malta': 'atlas-language-school-malta-pembroke.webp',
    'bels-malta': 'bels-malta-dil-okulu-st-pauls-bay.webp',
  };

  // JSON-LD @graph yapısı
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
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://maltadilokuluingilizce.com/malta-dil-okullari?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari',
        name: 'Malta Dil Okulları 2026 | Karşılaştırma ve Seçim Rehberi',
        description:
          "Malta'daki en iyi dil okulları karşılaştırması. ESE, EC, IELTS, ACE ve diğer okulların detaylı incelemesi. Hangi okul kime uygun? Öğrenci profili, bölge ve program temposuna göre okul seçimi.",
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#breadcrumb',
        },
        about: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#schools',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-hero-summary', '.speakable-review-intro'],
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#article',
        headline: 'Malta Dil Okulu Nasıl Seçilir? (2026)',
        description:
          'Malta dil okulu seçimi: öğrenci profili, bölge ve program temposuna göre doğru okul seçimi.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            url: 'https://maltadilokuluingilizce.com/malta-dil-okullari-ingilizce.webp',
            width: 1200,
            height: 630,
            name: 'Malta Dil Okulları İngilizce Eğitimi Karşılaştırma Rehberi 2026',
            caption: 'Malta Dil Okulları İngilizce Eğitimi Karşılaştırma Rehberi 2026',
            description: 'Malta dil okulları karşılaştırma rehberi 2026: Okul incelemeleri, eğitim modelleri, bölge ve program temposu karşılaştırması, öğrenci profili uygunluk analizi',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#breadcrumb',
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
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#schools',
        name: "Malta'daki Dil Okulları 2026: Kime Uygun, Nerede, Hangi Tempoda?",
        description:
          "Malta'daki dil okullarını popülerliğe göre değil; öğrenci profili, eğitim temposu ve bölgeye göre hızlıca karşılaştırmanız için hazırlanmış tablo.",
        itemListOrder: 'https://schema.org/ItemListUnordered',
        numberOfItems: schools.length,
        itemListElement: schools.map((school, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}#school`,
          },
        })),
      },
      // EducationalOrganization items for each school
      ...schools.map((school) => ({
        '@type': 'EducationalOrganization',
        '@id': `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}#school`,
        name: `${school.name} Dil Okulu`,
        url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
        image: `https://maltadilokuluingilizce.com/malta-dil-okullari-dis/${schoolImageMap[school.slug] || school.logo.split('/').pop()}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: school.region,
          addressCountry: 'MT',
        },
        keywords: [
          `${school.name} Malta dil okulu`,
          `${school.region} dil okulu`,
          `${school.tempo} program Malta`,
          school.suitableForSummary,
          `Malta ${school.region} İngilizce eğitimi`,
          `${school.name} ${school.region}`,
        ].join(', '),
        description: school.summary,
      })),
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-dil-okullari-ingilizce.webp',
        width: 1200,
        height: 630,
        caption: 'Malta Dil Okulları İngilizce Eğitimi Karşılaştırma Rehberi 2026',
        description: 'Malta dil okulları karşılaştırma rehberi 2026: Okul incelemeleri, eğitim modelleri, bölge ve program temposu karşılaştırması, öğrenci profili uygunluk analizi',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-dil-okullari/#faqpage',
        mainEntity: [
          {
            '@type': 'Question',
            name: "Malta'da dil okulu seçerken okul mu bölge mi daha belirleyicidir?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Malta'da dil okulu deneyimini belirleyen en önemli faktörlerden biri okulun bulunduğu bölgedir. Sosyal ortam, ulaşım ve günlük yaşam temposu; öğrencinin motivasyonunu ve pratik yapma sıklığını doğrudan etkiler. Bu nedenle okul seçimi, bölge tercihinden bağımsız düşünülmemelidir.",
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulları başlangıç seviyesi öğrenciler için uygun mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Evet. Malta'daki dil okullarının büyük bölümü, başlangıç seviyesinden ileri seviyeye kadar farklı sınıflar sunar. Özellikle sosyal ortamı güçlü ve dengeli tempoya sahip okullar, başlangıç seviyesi öğrenciler için daha rahat bir adaptasyon sağlar.",
            },
          },
          {
            '@type': 'Question',
            name: "Malta'da kısa süreli dil eğitimi gerçekten işe yarar mı?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Kısa süreli dil eğitiminin verimi, program temposu ve öğrencinin hedefiyle doğrudan ilişkilidir. Yoğun programlar kısa sürede ilerleme sağlayabilirken, dengeli programlar dilin kalıcı şekilde gelişmesine katkı sağlar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okullarında milliyet dağılımı neden önemlidir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sınıf içindeki milliyet dağılımı, öğrencinin İngilizce pratik yapma oranını etkiler. Daha dengeli bir uluslararası dağılım, öğrencilerin ana dillerine daha az başvurmasını ve İngilizceyi aktif kullanmasını sağlar.',
            },
          },
          {
            '@type': 'Question',
            name: "Malta'da büyük zincir okullar mı yoksa küçük okullar mı daha verimlidir?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Büyük zincir okullar daha geniş program ve aktivite seçenekleri sunarken, küçük okullar daha bireysel ilgi ve sakin sınıf ortamı sağlayabilir. Verimlilik, okulun büyüklüğünden çok öğrencinin beklentisine uygunluğuna bağlıdır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okullarında sınıf değişikliği veya seviye yükseltme nasıl yapılır?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Çoğu Malta dil okulunda düzenli seviye değerlendirme testleri uygulanır. Öğrenciler, ilerleme durumlarına göre sınıf değiştirebilir veya daha uygun bir seviyeye yönlendirilebilir.",
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okullarında eğitim kalitesini nasıl karşılaştırabilirim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Eğitim kalitesini karşılaştırırken akreditasyonlar, sınıf mevcudu, öğretmen deneyimi ve program yapısı dikkate alınmalıdır. Okul ismi tek başına kalite göstergesi değildir; eğitim modeli belirleyici faktördür.',
            },
          },
          {
            '@type': 'Question',
            name: "Malta'da dil eğitimi alırken sosyal hayat eğitimi etkiler mi?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Sosyal hayatın aktif olduğu bölgelerde öğrenciler, sınıf dışında daha fazla İngilizce pratik yapma fırsatı bulur. Ancak aşırı sosyal ortam, disiplinli çalışmayı zorlaştırabilir. Bu denge öğrenci profiline göre değerlendirilmelidir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulları uzun dönem eğitim için uygun mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Malta'daki birçok dil okulu, uzun dönem öğrenciler için özel programlar ve fiyat avantajları sunar. Uzun dönem eğitim, dilin kalıcı gelişimi açısından genellikle daha verimli sonuçlar sağlar.",
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
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-50/50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Sol Kolon - Hero Metni + CTA */}
              <div className="lg:col-span-6">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl xl:text-5xl mb-6">
                  Malta Dil Okulları 2026: Okullar ve Farkları
                </h1>
                <div className="mt-6 space-y-4 text-base leading-[1.6] text-slate-700 sm:text-lg sm:leading-relaxed speakable-hero-summary">
                  <p>
                    Malta dil okulları; eğitim modeli, sınıf yapısı ve öğrenci profili açısından birbirinden belirgin şekilde ayrılır.
                  </p>
                  <p>
                    Bu sayfa, Malta'daki dil okullarını listelemekten ziyade, hangi okulun hangi öğrenci profiline uygun olduğunu netleştirmek için hazırlandı.
                  </p>
                  <p>
                    İçerik, Malta'da yaşamış ve okulları yerinde incelemiş Türkiye ve Malta ekiplerinin saha deneyimine dayanır.
                  </p>
                  <p className="font-medium text-slate-900">
                    2026'da farkı yaratan şey okul adı değil, öğrencinin hedefine uygun doğru okul seçimidir.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="https://wa.me/35699143066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    Okul Seçimini Netleştir
                  </a>
                  <p className="mt-3 text-xs text-slate-500">
                    Son güncelleme:{' '}
                    <time dateTime={dateModified || new Date().toISOString().split('T')[0]}>
                      {lastUpdated || new Date().toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </p>
                </div>
              </div>

              {/* Sağ Kolon - Sınıflandırılmış Okul Listesi */}
              <div id="hangi-okul-kime-uygun" className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-8 shadow-md ring-1 ring-slate-100">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                      Kimler Hangi Okulları Tercih Ediyor?
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Malta'daki dil okulları, genellikle öğrencilerin hedeflerine ve beklentilerine göre farklı gruplarda tercih edilir.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <span className="text-xs font-semibold text-blue-700">1</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">İlk kez Malta'ya gidenler</p>
                          <p className="mt-1 text-sm text-slate-600">EC Malta, ESE Malta</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <span className="text-xs font-semibold text-emerald-700">2</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Hızlı ilerlemek isteyenler</p>
                          <p className="mt-1 text-sm text-slate-600">IELTS Malta, ACE Malta</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                          <span className="text-xs font-semibold text-amber-700">3</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Daha sakin ve düzenli bir ortam arayanlar</p>
                          <p className="mt-1 text-sm text-slate-600">AM Language, inlingua Malta</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                          <span className="text-xs font-semibold text-purple-700">4</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Butik okul isteyenler</p>
                          <p className="mt-1 text-sm text-slate-600">BELS Malta, Atlas Malta</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <span className="text-xs font-semibold text-slate-700">5</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">Daha ekonomik seçenek arayanlar</p>
                          <p className="mt-1 text-sm text-slate-600">Clubclass Malta, Gateway Malta</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 rounded-lg bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                    Aynı okul birden fazla öğrenci profiline hitap edebilir. Bu sınıflandırma, genel eğilimleri göstermek amacıyla hazırlanmıştır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* İçindekiler (TOC) */}
        <TableOfContents />

        {/* Eğitim Modelleri */}
        <section id="egitim-modelleri" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta'daki Dil Okullarının Eğitim Modelleri
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              <p>
                Malta'daki dil okulları; sosyal iletişimi ön planda tutan, akademik yoğunluk sunan, butik sınıf yapısına sahip ve uzun dönemli öğrenmeye odaklanan farklı eğitim modelleriyle çalışır.
              </p>
              <p>
                Eğitim modeli; sınıf mevcudu, haftalık ders temposu ve öğrenci profiline göre şekillenir.
              </p>
              <p>
                Aşağıdaki okul incelemeleri, bu eğitim modellerinin hangi öğrenci hedefleri için daha uygun olduğunu okul bazında açıklar.
              </p>
            </div>
          </div>
        </section>

        {/* Okul İncelemeleri */}
        <section id="okul-incelemeleri" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 sm:text-3xl">
              Malta Dil Okulları İncelemeleri (2026)
            </h2>
            <div className="mb-12 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg speakable-review-intro">
              <p>
                Malta'daki dil okulları; eğitim modeli, sınıf yapısı, öğrenci profili ve öğrenme temposu açısından birbirinden belirgin şekilde ayrılır.
              </p>
              <p>
                Bu bölümde yer alan okullar, popülerlik ya da "en iyi okul" iddiasına göre değil; hangi okulun hangi öğrenci profiline daha uygun olduğu temel alınarak incelenmiştir.
              </p>
              <p>
                İncelemeler, Malta'da yaşamış ve okulları yerinde gözlemlemiş Türkiye ve Malta ekiplerinin saha deneyimine dayanır. Amaç; öğrencinin hedefi, bütçesi ve beklentisine göre doğru okul seçimini netleştirmektir.
              </p>
            </div>

            {/* Filtreleme Bölümü */}
            <nav aria-label="Okul filtreleme">
              {/* Bölgeye Göre */}
              <section id="bolgeye-gore" className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
                  Bölgeye Göre Malta Dil Okulları (St. Julian's, Sliema, Gozo)
                </h2>
                <div className="mb-6 space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta'daki dil okulları, bulundukları bölgeye göre sosyal yaşam, sınıf dışı pratik imkânı ve günlük tempo açısından farklı deneyimler sunar.
                  </p>
                  <p>
                    St. Julian's daha hareketli ve sosyal bir ortam sağlarken, Sliema daha dengeli ve düzenli bir yaşam temposu sunar.
                  </p>
                  <p>
                    Gozo ise sakinlik, düşük kalabalık ve odaklı öğrenme arayan öğrenciler için tercih edilir.
                  </p>
                </div>
              </section>

              {/* Program Temposuna Göre */}
              <section id="program-temposu" className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
                  Program Temposuna Göre Okul Karşılaştırması
                </h2>
                <div className="mb-6 space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta dil okullarında program temposu, haftalık ders yoğunluğu ve sınıf yapısına göre değişir.
                  </p>
                  <p>
                    Yoğun programlar, kısa sürede ilerlemek isteyen öğrenciler için uygundur; dengeli programlar ise sosyal yaşam ile öğrenmeyi birlikte yürütmek isteyenlere hitap eder.
                  </p>
                  <p>
                    Daha sakin tempolu programlar, uzun dönemli ve stressiz bir öğrenme süreci arayan öğrenciler tarafından tercih edilir.
                  </p>
                </div>
              </section>

              <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Malta Dil Okullarını Karşılaştır (2026)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <p>
                    Bu filtre alanı, sayfadaki okul incelemelerini öğrenci profili, bölge ve program temposu açısından hızlı karşılaştırmak için sunulmuştur.
                  </p>
                  <p>
                    Filtreleme bir sıralama/değerlendirme anlamı taşımaz; tüm okullar listede kalır.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Öğrenci Profili Filtresi */}
                <div>
                  <label htmlFor="profile-filter" className="block mb-2 text-sm font-medium text-slate-700">
                    Öğrenci Profili
                  </label>
                  <select
                    id="profile-filter"
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  >
                    {studentProfiles.map((profile) => (
                      <option key={profile} value={profile}>
                        {profile}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Bölge Filtresi */}
                <div>
                  <label htmlFor="region-filter" className="block mb-2 text-sm font-medium text-slate-700">
                    Bölge
                  </label>
                  <select
                    id="region-filter"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value as Region | 'Tümü')}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Tempo Filtresi */}
                <div>
                  <label htmlFor="tempo-filter" className="block mb-2 text-sm font-medium text-slate-700">
                    Program Temposu
                  </label>
                  <select
                    id="tempo-filter"
                    value={selectedTempo}
                    onChange={(e) => setSelectedTempo(e.target.value as Tempo | 'Tümü')}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  >
                    {tempos.map((tempo) => (
                      <option key={tempo} value={tempo}>
                        {tempo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Seçim Rehberi Microcopy */}
              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs leading-relaxed text-blue-800">
                  <strong className="font-semibold">Seçim Rehberi:</strong> Öğrenci profili, bölge ve program temposu seçimlerinizi birleştirerek size en uygun okulları hızlıca bulabilirsiniz. Filtreler birbirinden bağımsız çalışır ve kombinasyon halinde kullanılabilir.
                </p>
              </div>
              
              {/* Filtre Temizle Butonu ve Sonuç Sayısı */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{filteredSchools.length}</span> okul bulundu
                </p>
                {(selectedRegion !== 'Tümü' || selectedTempo !== 'Tümü' || selectedProfile !== 'Tümü') && (
                  <button
                    onClick={() => {
                      setSelectedRegion('Tümü');
                      setSelectedTempo('Tümü');
                      setSelectedProfile('Tümü');
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Filtreleri Temizle
                  </button>
                )}
              </div>
              </div>
            </nav>

            {/* Dinamik Özet Paragraf */}
            {(selectedRegion !== 'Tümü' || selectedTempo !== 'Tümü' || selectedProfile !== 'Tümü') && filteredSchools.length > 0 && (
              <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm leading-relaxed text-slate-700">
                  <strong className="font-semibold text-slate-900">Seçimin:</strong>{' '}
                  {selectedProfile !== 'Tümü' && <span>{selectedProfile}</span>}
                  {selectedProfile !== 'Tümü' && (selectedRegion !== 'Tümü' || selectedTempo !== 'Tümü') && ' + '}
                  {selectedRegion !== 'Tümü' && <span>{selectedRegion}</span>}
                  {selectedRegion !== 'Tümü' && selectedTempo !== 'Tümü' && ' + '}
                  {selectedTempo !== 'Tümü' && <span>{selectedTempo}</span>}
                  . Bu kombinasyonda öne çıkan okullar:{' '}
                  <strong className="font-semibold text-slate-900">
                    {filteredSchools.map((school) => school.name).join(', ')}
                  </strong>
                  . Diğer okullar listede kalır.
                </p>
              </div>
            )}

            <div className="space-y-12">
              {filteredSchools.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-slate-600 mb-4">
                    Seçtiğiniz kriterlere uygun okul bulunamadı.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRegion('Tümü');
                      setSelectedTempo('Tümü');
                      setSelectedProfile('Tümü');
                    }}
                    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                filteredSchools.map((school) => {
                const isESE = school.slug === 'ese-malta';
                const isEC = school.slug === 'ec-malta';
                const isIELS = school.slug === 'iels-malta';
                const isACE = school.slug === 'ace-english-malta';
                const isAM = school.slug === 'am-language-malta';
                const isClubclass = school.slug === 'clubclass-malta';
                const isGateway = school.slug === 'gateway-malta';
                const isInlingua = school.slug === 'inlingua-malta';
                const isAtlas = school.slug === 'atlas-malta';
                const isBELS = school.slug === 'bels-malta';
                return (
                  <article
                    id={school.slug}
                    key={school.slug}
                    className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                      {/* Sol Kolon - Ana İçerik */}
                      <div className="lg:col-span-8">
                        {/* Logo ve Başlık */}
                        <div className="mb-6 flex items-center gap-4">
                          <div className="flex-shrink-0 rounded-lg bg-slate-50 p-3">
                            <Image
                              src={school.logo}
                              alt={`${school.name} logosu`}
                              width={120}
                              height={32}
                              className="h-8 w-auto object-contain"
                              priority={false}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl mb-3">
                              {isESE || isEC || isIELS || isACE || isAM || isClubclass || isGateway || isInlingua || isAtlas || isBELS
                                ? isAM
                                  ? 'AM Language Malta Dil Okulu | Sliema (2026)'
                                  : isBELS
                                    ? 'BELS Malta Dil Okulu | St. Paul\'s Bay / Gozo (2026)'
                                    : `${school.name} Dil Okulu | ${school.region} (2026)`
                                : `${school.name} Dil Okulu | ${school.region}`}
                            </h3>
                            {/* Okul Etiketleri */}
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                📍 {school.region}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                ⚡ {school.tempo}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                👤 {school.suitableForSummary}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* ESE Malta, EC Malta, IELS Malta, ACE English Malta, AM Language Malta, Clubclass Malta, Gateway Malta, inlingua Malta, Atlas Malta ve BELS Malta için özel yapı */}
                        {isESE ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  ESE Malta, Malta'da en uzun süredir faaliyet gösteren ve en fazla
                                  resmi akreditasyona sahip dil okullarından biridir. St. Julian's'ta
                                  yer alan okul, sosyal ortamı ve dengeli eğitim yapısıyla ilk kez
                                  Malta'ya giden öğrenciler için güvenli bir başlangıç sunar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>İlk kez Malta'ya gidenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>
                                        Sosyal ortamda İngilizce pratiği yapmak isteyenler
                                      </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Dengeli tempo arayanlar</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok sakin veya izole ortam isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Tamamen akademik, yoğun disiplinli yapı arayanlar</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    St. Julian's – sosyal ve hareketli
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 10–12 öğrenci (konuşma pratiği ağırlıklı)
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi, IELTS
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – €210–€260 (uzun dönemlerde daha avantajlı)
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, rezidans, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Güçlü akreditasyon yapısı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sosyal ve merkezi konum</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Yoğun sezonda kalabalık</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Yaz döneminde maliyet artışı</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_ialc.svg"
                                      alt="IALC üyesi dil okulu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  ESE Malta, Malta'da en fazla resmi akreditasyona sahip dil
                                  okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isEC ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  EC Malta, uluslararası EC Language Centres zincirinin Malta'daki
                                  temsilcisidir. St. Julian's merkezinde yer alan okul; modern
                                  sınıfları, kurumsal eğitim yapısı ve geniş program seçenekleriyle
                                  akademik ilerlemeyi hedefleyen öğrenciler için öne çıkar. Özellikle
                                  IELTS, Cambridge ve 30+ programlarıyla, sistemli ve kontrollü bir
                                  öğrenme ortamı sunar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Akademik ve sistemli ilerleme isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>IELTS veya Cambridge hedefi olanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Kurumsal okul yapısını tercih edenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>30+ programına katılmak isteyen yetişkin öğrenciler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Daha rahat ve sosyal ağırlıklı okul arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Bütçe hassasiyeti çok yüksek olanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok küçük butik okul isteyenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    St. Julian's – merkezi ve ulaşımı kolay
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 10–12 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, IELTS, Cambridge, 30+
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta–üst seviye – €250–€300
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, rezidans, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Uluslararası marka gücü</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Akademik ve planlı eğitim sistemi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Geniş program ve seviye seçenekleri</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Yaz sezonunda sınıflar kalabalıklaşabilir</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Fiyatlar Malta ortalamasının üzerindedir</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_cen-1.svg"
                                      alt="British Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  EC Malta, uluslararası eğitim standartlarına uygun olarak denetlenen
                                  ve akredite edilmiş bir dil okuludur.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isIELS ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  IELS Malta, Sliema'da yer alan ve Malta'daki en köklü dil
                                  okullarından biridir. Denize yakın merkezi konumu, akademik
                                  disiplini ve düzenli eğitim yapısıyla özellikle uzun dönem eğitim
                                  planlayan ve istikrarlı ilerleme hedefleyen öğrenciler için öne
                                  çıkar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Uzun dönem eğitim planlayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Akademik ve düzenli ilerleme isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>
                                        Daha sakin ve düzenli bir bölgede eğitim almak isteyenler
                                      </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>
                                        Avrupa ağırlıklı uluslararası öğrenci profili arayanlar
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok yoğun sosyal aktivite beklentisi olanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Hızlı ve kısa süreli kurs arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Eğlence odaklı okul ortamı isteyenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    Sliema – merkezi, denize yakın ve daha sakin
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 10–12 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi, IELTS
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – €230–€290
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, rezidans, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Köklü okul yapısı ve akademik disiplin</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sliema merkez konumu ve denize yakınlık</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Uzun dönem kayıt avantajları</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Sosyal aktivite çeşitliliği sınırlı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Daha sakin tempo isteyenler için uygun</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  IELS Malta, Malta'da resmi olarak akredite edilmiş ve uzun yıllardır
                                  faaliyet gösteren köklü dil okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isACE ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  ACE English Malta, St. Julian's merkezinde yer alan, modern ve
                                  teknoloji destekli eğitim yapısıyla öne çıkan bir dil okuludur.
                                  Akıllı tahta sistemleri, iletişim odaklı ders yapısı ve sosyal
                                  öğrenme ortamı sayesinde, özellikle konuşma pratiğini hızla
                                  geliştirmek isteyen öğrenciler için uygun bir yapı sunar. Sosyal
                                  ve dinamik bir okul ortamı arayanlar için Malta'daki güçlü
                                  seçeneklerden biridir.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Konuşma pratiğini hızla geliştirmek isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Sosyal ve enerjik okul ortamı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Teknoloji destekli sınıf yapısını tercih edenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Dengeli–orta yoğun tempoda ilerlemek isteyenler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok akademik ve disiplinli yapı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Sakin ve izole okul ortamı isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Uzun dönem, ağır akademik program hedefleyenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    St. Julian's – sosyal, merkezi ve hareketli
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 10–12 öğrenci (konuşma pratiği ağırlıklı)
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi, IELTS
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – €210–€260
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, rezidans, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Teknoloji destekli modern sınıflar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sosyal ve iletişim odaklı eğitim modeli</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Merkezi St. Julian's konumu</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Yoğun sezonda sınıflar kalabalıklaşabilir</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Akademik odaklı öğrencilere çok hitap etmeyebilir</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  ACE English Malta, Malta'da resmi olarak akredite edilmiş ve modern
                                  eğitim standartlarına uygun bir dil okuludur.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isAM ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  AM Language Malta, Sliema'da yer alan ve daha sakin, düzenli bir
                                  öğrenme ortamı sunan dil okullarından biridir. Merkezi konumu,
                                  dengeli sınıf yapısı ve kontrollü eğitim temposu sayesinde
                                  özellikle istikrarlı ilerleme ve bütçe dengesini önemseyen
                                  öğrenciler için uygun bir seçenektir.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Daha sakin ve düzenli okul ortamı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Bütçe–performans dengesini önemseyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Uzun dönem planlı eğitim düşünenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>
                                        Sosyal yoğunluğu çok yüksek olmayan okulları tercih edenler
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok sosyal ve hareketli okul ortamı isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Hızlı tempolu, yoğun akademik program arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Büyük kampüs veya zincir okul beklentisi olanlar</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    Sliema – merkezi ve görece sakin
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 10–12 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – uygun fiyatlı seçeneklerden biri
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, rezidans, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sakin ve düzenli öğrenme ortamı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Bütçe–performans dengesi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Merkezi Sliema konumu</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Sosyal aktivite çeşitliliği sınırlı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>
                                        Çok hareketli okul ortamı arayanlara hitap etmeyebilir
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  AM Language Malta, Malta'da resmi olarak akredite edilmiş ve
                                  denetlenen dil okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isClubclass ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  Clubclass Malta, Swieqi bölgesinde yer alan ve Malta'daki en bütçe
                                  dostu dil okullarından biri olarak öne çıkan köklü bir kurumdur.
                                  Okul kampüsü içinde bulunan konaklama seçenekleri ve uzun dönem
                                  paket avantajları sayesinde, özellikle ekonomik ve pratik bir dil
                                  eğitimi planlayan öğrenciler için uygun bir yapı sunar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Bütçe odaklı dil eğitimi arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Uzun dönem (12–24 hafta ve üzeri) plan yapanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Kampüs içinde konaklama isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Daha samimi ve pratik okul ortamını tercih edenler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Modern ve yüksek teknoloji altyapısı bekleyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok akademik ve yoğun disiplinli yapı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Merkezi, hareketli şehir atmosferi isteyenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    Swieqi – St. Julian's ve Sliema'ya yakın, daha sakin
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 10–14 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi, Uzun Dönem
                                    Programlar
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Düşük–orta seviye – €180–€230
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Kampüs içi konaklama, aile yanı, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Malta'daki en ekonomik dil okullarından biri</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Kampüs içi konaklama imkânı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Uzun dönem paket avantajları</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Okul altyapısı modern okullara göre daha sade</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>
                                        Akademik beklentisi yüksek öğrenciler için sınırlı olabilir
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  Clubclass Malta, Malta'da resmi olarak akredite edilmiş ve
                                  denetlenen dil okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isGateway ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  Gateway Malta, San Gwann bölgesinde yer alan ve aile tarafından
                                  işletilen butik bir dil okuludur. Küçük sınıfları, birebir ilgiye
                                  dayalı öğretim yaklaşımı ve uygun fiyatlı uzun dönem programlarıyla,
                                  özellikle sakin, samimi ve destekleyici bir öğrenme ortamı arayan
                                  öğrenciler için öne çıkar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Butik ve aile ortamında eğitim almak isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Küçük sınıflarda birebir ilgi bekleyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Uzun dönem, düşük bütçeli eğitim planlayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Daha sakin ve düzenli bir çevre tercih edenler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Büyük kampüs veya zincir okul arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok sosyal ve hareketli okul ortamı isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Yoğun akademik ve sınav odaklı program arayanlar</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    San Gwann – merkezi bölgelere yakın, sakin
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 8–12 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi, Uzun Dönem
                                    Programlar
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Düşük–orta seviye – €180–€240
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, paylaşımlı daire (okula yürüme mesafesinde)
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Aile işletmesi butik okul yapısı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Küçük sınıflar ve birebir ilgi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Uygun fiyatlı uzun dönem seçenekler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Modern kampüs ve geniş sosyal alanlar sınırlı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Akademik sınav odaklı program seçenekleri az</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  Gateway Malta, Malta'da resmi olarak akredite edilmiş ve denetlenen
                                  butik dil okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isInlingua ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  inlingua Malta, dünya çapında uygulanan{' '}
                                  <strong>inlingua metodolojisi</strong> ile daha sistemli ve
                                  yapılandırılmış bir dil eğitimi sunan köklü bir dil okuludur.
                                  Sliema'daki merkezi konumu, düzenli sınıf yapısı ve akademik odaklı
                                  programlarıyla özellikle disiplinli ilerleme ve ölçülebilir gelişim
                                  hedefleyen öğrenciler için öne çıkar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Sistemli ve metodoloji temelli eğitim isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Akademik disiplin ve düzenli ilerleme arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Dil seviyesini ölçülebilir şekilde geliştirmek isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Daha sakin ve kontrollü sınıf ortamını tercih edenler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok sosyal ve rahat okul ortamı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Eğlence ve aktivite ağırlıklı program bekleyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Esnek ve serbest ders yapısını tercih edenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    Sliema – merkezi, düzenli ve sakin
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 8–12 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – Malta ortalamasına yakın
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, rezidans, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Uluslararası inlingua metodolojisi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sistemli ve akademik ders yapısı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sliema merkez konumu</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Sosyal aktivite çeşitliliği sınırlı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>
                                        Daha rahat ve esnek öğrenme isteyenlere hitap etmeyebilir
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  inlingua Malta, Malta'da resmi olarak akredite edilmiş ve
                                  uluslararası metodolojiye sahip dil okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isAtlas ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  Atlas Malta, Pembroke bölgesinde yer alan, küçük ölçekli ve butik
                                  yapısıyla öne çıkan bir dil okuludur. Sakin çevresi, düşük sınıf
                                  mevcudu ve birebir ilgiye dayalı öğretim anlayışı sayesinde
                                  özellikle kişisel ilgi ve düzenli ilerleme arayan öğrenciler için
                                  uygun bir ortam sunar.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Küçük sınıflarda birebir ilgi isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Daha sakin ve huzurlu bir bölgede eğitim almak isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Akademik baskısı düşük, kontrollü ilerleme arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Kısa ve orta vadeli eğitim planlayanlar</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok sosyal ve hareketli okul ortamı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Büyük kampüs veya zincir okul isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Yoğun sınav ve akademik program hedefleyenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    Pembroke – St. Julian'sa yakın, sakin ve düzenli
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 6–10 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – Malta ortalamasına yakın
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, paylaşımlı daire
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Küçük sınıflar ve birebir ilgi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sakin ve huzurlu okul çevresi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Butik okul atmosferi</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Program çeşitliliği sınırlı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Sosyal aktivite olanakları az</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  Atlas Malta, Malta'da resmi olarak akredite edilmiş butik dil
                                  okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : isBELS ? (
                          <>
                            {/* Üst Giriş Cümlesi */}
                            <div className="mb-6">
                              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <p className="text-sm leading-relaxed text-slate-700">
                                  BELS Malta, St. Paul's Bay ve Gozo'da kampüsleri bulunan, butik
                                  yapısı ve düşük öğrenci yoğunluğuyla öne çıkan bir dil okuludur.
                                  Sakin ortamı, küçük sınıfları ve bireysel ilgiye dayalı öğretim
                                  yaklaşımı sayesinde özellikle kalabalıktan uzak, odaklı bir dil
                                  eğitimi arayan öğrenciler için uygun bir seçenektir.
                                </p>
                              </div>
                            </div>

                            {/* Karar Kutusu */}
                            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                              {/* Kimler için uygun / uygun değil */}
                              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-emerald-700">
                                    Kimler için uygun:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Kalabalık okullardan kaçınanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Küçük sınıflarda birebir ilgi isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Daha sakin ve huzurlu bir çevrede eğitim almak isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                                      <span>Gozo'da eğitim deneyimi yaşamak isteyenler</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="mb-3 text-sm font-semibold text-red-700">
                                    Kimler için uygun değil:
                                  </h4>
                                  <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Çok sosyal ve hareketli okul ortamı arayanlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Büyük kampüs ve zincir okul isteyenler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                                      <span>Yoğun şehir hayatını tercih edenler</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Hızlı Gerçekler */}
                              <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Hızlı gerçekler:
                                </h4>
                                <ul className="space-y-1.5 text-sm text-slate-700">
                                  <li>
                                    <strong className="font-semibold text-slate-900">Konum:</strong>{' '}
                                    St. Paul's Bay (Malta) / Gozo (daha sakin alternatif)
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Sınıf Yapısı:
                                    </strong>{' '}
                                    Ortalama 6–10 öğrenci
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Programlar:
                                    </strong>{' '}
                                    Genel İngilizce, Yoğun İngilizce, İş İngilizcesi
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Bütçe (2026):
                                    </strong>{' '}
                                    Orta seviye – butik okullara uygun fiyat
                                  </li>
                                  <li>
                                    <strong className="font-semibold text-slate-900">
                                      Konaklama:
                                    </strong>{' '}
                                    Aile yanı, paylaşımlı daire, Gozo konaklama seçenekleri
                                  </li>
                                </ul>
                              </div>

                              {/* Öne Çıkanlar / Dikkat Edilmesi Gerekenler */}
                              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-emerald-900">
                                    Öne çıkanlar:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-emerald-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Düşük öğrenci sayısı ve birebir ilgi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Gozo'da eğitim imkânı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-600" />
                                      <span>Sakin ve odaklanmaya uygun öğrenme ortamı</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                  <h4 className="mb-3 text-xs font-semibold text-amber-900">
                                    Dikkat edilmesi gerekenler:
                                  </h4>
                                  <ul className="space-y-1.5 text-xs text-amber-800">
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Sosyal aktivite ve gece hayatı sınırlı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-600" />
                                      <span>Şehir merkezine uzaklık bazı öğrenciler için dezavantaj olabilir</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {/* Akreditasyonlar */}
                              <div className="mb-6">
                                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                                  Uluslararası Akreditasyonlar
                                </h4>
                                <div className="mb-3 flex flex-wrap items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_feltom.svg"
                                      alt="FELTOM akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_eaquals.svg"
                                      alt="EAQUALS akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                  <div className="flex h-12 w-12 items-center justify-center">
                                    <Image
                                      src="/Akreditasyonlar/accr_colour_elt.svg"
                                      alt="ELT Council akreditasyonu"
                                      width={48}
                                      height={48}
                                      className="h-12 w-12 object-contain"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  BELS Malta, Malta'da resmi olarak akredite edilmiş ve butik eğitim
                                  yaklaşımıyla tanınan dil okullarından biridir.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Diğer okullar için eski yapı - Açıklama */}
                            <p className="mb-6 text-base leading-relaxed text-slate-700">
                              {school.description}
                            </p>

                            {/* Key Information Bar - Sadece ESE, EC, IELS, ACE, AM, Clubclass, Gateway, inlingua, Atlas ve BELS olmayan okullar için */}
                            {!isESE && !isEC && !isIELS && !isACE && !isAM && !isClubclass && !isGateway && !isInlingua && !isAtlas && !isBELS && (
                              <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-4">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
                                  <svg
                                    className="h-4 w-4 text-pink-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-600">Konum</p>
                                  <p className="text-sm font-semibold text-slate-900">
                                    {school.region}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                  <svg
                                    className="h-4 w-4 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-600">Programlar</p>
                                  <p className="text-sm font-semibold text-slate-900">
                                    Genel, Yoğun, İş
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                                  <svg
                                    className="h-4 w-4 text-purple-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-600">Sınıf Mevcudu</p>
                                  <p className="text-sm font-semibold text-slate-900">
                                    Ortalama 10-12
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                                  <svg
                                    className="h-4 w-4 text-emerald-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-slate-600">
                                    Haftalık Fiyat (2026)
                                  </p>
                                  <p className="text-sm font-semibold text-slate-900">
                                    €{fiyat_araligi_placeholder}
                                  </p>
                                </div>
                              </div>
                              </div>
                            )}

                            {/* Fırsatlar/Kampanyalar - Sadece ESE, EC, IELS, ACE, AM, Clubclass, Gateway, inlingua, Atlas ve BELS olmayan okullar için */}
                            {!isESE && !isEC && !isIELS && !isACE && !isAM && !isClubclass && !isGateway && !isInlingua && !isAtlas && !isBELS && (
                              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                              <h4 className="mb-3 text-sm font-semibold text-emerald-900">
                                {school.name} Fırsatları, Kampanyalar ve MaltaStart Avantajları
                              </h4>
                              <ul className="space-y-2 text-sm text-emerald-800">
                                <li className="flex items-start gap-2">
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>
                                    Yeşil pasaport sahipleri için %10 indirim (MaltaStart kayıtlarında
                                    geçerli)
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>
                                    Uzun dönem kayıtlarda sezon farkı ücreti yok (24+ hafta programlarda
                                    fiyat sabit)
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>
                                    Grup kayıtlarında ek %5 indirim (2 kişi ve üzeri)
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>
                                    MaltaStart tarafından ücretsiz seviye belirleme testi ve danışmanlık
                                    hizmeti
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <svg
                                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>
                                    Kampanyalar 31 Aralık 2026'ya kadar geçerli, tümü MaltaStart
                                    üzerinden
                                  </span>
                                </li>
                              </ul>
                              </div>
                            )}
                          </>
                        )}

                        {/* Akreditasyonlar - Sadece ESE, EC, IELS, ACE, AM, Clubclass, Gateway, inlingua, Atlas ve BELS olmayan okullar için */}
                        {!isESE && !isEC && !isIELS && !isACE && !isAM && !isClubclass && !isGateway && !isInlingua && !isAtlas && !isBELS && (
                          <div className="mb-6">
                            <h4 className="mb-3 text-sm font-semibold text-slate-900">
                              Akreditasyonlar
                            </h4>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-4">
                                <span className="text-xs font-semibold text-slate-700">FELTOM</span>
                              </div>
                              <div className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-4">
                                <span className="text-xs font-semibold text-slate-700">EAQUALS</span>
                              </div>
                              <div className="flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-4">
                                <span className="text-xs font-semibold text-slate-700">
                                  ELT Council
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Öne Çıkan Özellikler - Sadece ESE, EC, IELS, ACE, AM, Clubclass, Gateway, inlingua, Atlas ve BELS olmayan okullar için */}
                        {!isESE && !isEC && !isIELS && !isACE && !isAM && !isClubclass && !isGateway && !isInlingua && !isAtlas && !isBELS && (
                          <div className="mb-6">
                            <h4 className="mb-3 text-sm font-semibold text-slate-900">
                              Öne Çıkan Özellikler
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-700">
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                                <span>
                                  Bay Street merkez, plaj ve sosyal alanlara kısa yürüme mesafesi
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                                <span>
                                  Akıllı tahta destekli modern sınıflar ve nitelikli öğretmenler
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                                <span>
                                  Haftalık sosyal aktivitelerle aktif İngilizce pratiği
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                                <span>
                                  Konaklama seçenekleri: Aile yanı, Rezidans, Paylaşımlı apart
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                                <span>
                                  Akredite, güvenilir ve uluslararası standartlarda eğitim
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}

                        {/* Eksik Yönler - Sadece ESE, EC, IELS, ACE, AM, Clubclass, Gateway, inlingua, Atlas ve BELS olmayan okullar için */}
                        {!isESE && !isEC && !isIELS && !isACE && !isAM && !isClubclass && !isGateway && !isInlingua && !isAtlas && !isBELS && (
                          <div>
                            <h4 className="mb-3 text-sm font-semibold text-slate-900">
                              Eksik Yönler
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-700">
                              <li className="flex items-start gap-2">
                                <svg
                                  className="mt-1 h-4 w-4 flex-shrink-0 text-amber-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>
                                  Yoğun sezonda sınıflar kalabalıklaşabilir, birebir etkileşim
                                  azalabilir
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <svg
                                  className="mt-1 h-4 w-4 flex-shrink-0 text-amber-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>
                                  Yaz döneminde fiyatlar artabilir; uzun dönem kayıtlar daha avantajlı
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Sağ Kolon - ESE, EC, IELS, ACE, AM ve Clubclass için görsel + temsilci notu, diğerleri için eski yapı */}
                      <div className="lg:col-span-4">
                        {isESE ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/ese-malta-dil-okulu-st-julians.webp"
                                alt="ESE Malta Dil Okulu St. Julian's binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                ESE Malta, adada en uzun süredir faaliyet gösteren ve en fazla resmi
                                akreditasyona sahip dil okullarından biridir. Okul yönetiminde Türk
                                bir müdürün bulunması, özellikle Türkiye'den gelen öğrenciler için
                                iletişim ve adaptasyon sürecini ciddi şekilde kolaylaştırır. ESE'nin
                                en güçlü tarafı, akademik yapıyı bozmadan sosyal ortamı dengede
                                tutabilmesidir. Yoğun sezonlarda kalabalık hissi oluşabilse de,
                                deneyimli yönetim sayesinde süreç genellikle kontrollü ilerler. Bu
                                değerlendirme, saha gözlemleri ve öğrenci geri bildirimlerine
                                dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  ESE Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/ese-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  ESE Malta Dil Okulu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isACE ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/ace-english-malta-dil-okulu-st-julians.webp"
                                alt="ACE English Malta Dil Okulu St. Julian's binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                ACE English Malta, özellikle konuşma pratiği ve sosyal öğrenme
                                ortamı açısından güçlü bir okuldur. Akıllı tahta destekli sınıflar
                                ve iletişim odaklı ders yapısı, öğrencilerin aktif katılımını
                                artırır. Yoğun sezonda sınıflar kalabalıklaşabilse de, modern
                                öğretim teknikleri sayesinde ders verimliliği korunur. Bu
                                değerlendirme, saha gözlemleri ve öğrenci geri bildirimlerine
                                dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  ACE English Malta Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/ace-english-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  ACE English Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isIELS ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/iels-malta-dil-okulu-sliema.webp"
                                alt="IELS Malta Dil Okulu Sliema binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                IELS Malta, özellikle uzun dönem eğitim düşünen öğrenciler için
                                istikrarlı ve disiplinli bir öğrenme ortamı sunar. Sliema'daki konumu
                                sayesinde daha sakin ve düzenli bir yaşam temposu vardır. Sosyal
                                aktivite açısından bazı okullara göre daha sınırlı olsa da, eğitim
                                kalitesi, öğretmen kadrosu ve sınıf disipliniyle bu farkı dengeler.
                                Bu değerlendirme, saha gözlemleri ve öğrenci geri bildirimlerine
                                dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  IELS Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/iels-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  IELS Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isAM ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/am-language-studio-malta-sliema.webp"
                                alt="AM Language Malta Dil Okulu Sliema binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                AM Language Malta, özellikle sakin bir öğrenme ortamı ve bütçe
                                dengesini önemseyen öğrenciler için uygun bir okuldur. Sınıf yapısı
                                ve eğitim temposu kontrollüdür. Sosyal aktivite seçenekleri sınırlı
                                olsa da, düzenli ilerleme ve istikrarlı eğitim arayanlar için
                                güvenilir bir tercih sunar. Bu değerlendirme, saha gözlemleri ve
                                öğrenci geri bildirimlerine dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  AM Language Malta Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/am-language-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  AM Language Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isClubclass ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/clubclass-malta-dil-okulu-swieqi.webp"
                                alt="Clubclass Malta Dil Okulu Swieqi binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                Clubclass Malta, özellikle uzun dönem ve bütçe dostu eğitim arayan
                                öğrenciler için öne çıkan bir okuldur. Kampüs içinde konaklama
                                imkânı sayesinde öğrenciler okul ve sosyal alanlara kolay erişim
                                sağlar. Modern altyapı beklentisi olanlar için sınırlı kalabilir;
                                ancak fiyat–performans açısından Malta'daki en avantajlı
                                seçeneklerden biridir. Bu değerlendirme, saha gözlemleri ve öğrenci
                                geri bildirimlerine dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  Clubclass Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/clubclass-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  Clubclass Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isGateway ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/gateway-school-of-english-malta-san-gwann.webp"
                                alt="Gateway Malta Dil Okulu San Gwann binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                Gateway Malta, özellikle birebir ilgi ve samimi bir öğrenme ortamı
                                arayan öğrenciler için güçlü bir alternatiftir. Öğretmenler
                                öğrencilerle yakından ilgilenir ve okul yönetimi oldukça
                                ulaşılabilirdir. Modern kampüs beklentisi olanlar için sınırlı
                                kalabilir; ancak sakin ortamı, uygun maliyeti ve destekleyici
                                yaklaşımıyla uzun dönem öğrenciler için güvenilir bir seçenektir. Bu
                                değerlendirme, saha gözlemleri ve öğrenci geri bildirimlerine
                                dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  Gateway Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/gateway-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  Gateway Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isInlingua ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/inlingua-malta-dil-okulu-sliema.webp"
                                alt="inlingua Malta Dil Okulu Sliema binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                inlingua Malta, özellikle metodolojiye dayalı ve disiplinli eğitim
                                arayan öğrenciler için güçlü bir seçenektir. Ders yapısı belirli bir
                                sistem üzerine kurulu olduğu için, ilerleme takibi nettir. Sosyal
                                aktivite beklentisi yüksek öğrenciler için sınırlı kalabilir; ancak
                                akademik düzen ve istikrarlı gelişim arayanlar için güvenilir bir
                                tercihtir. Bu değerlendirme, saha gözlemleri ve öğrenci geri
                                bildirimlerine dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  inlingua Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/inlingua-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  inlingua Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isAtlas ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/atlas-language-school-malta-pembroke.webp"
                                alt="Atlas Malta Dil Okulu Pembroke binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                Atlas Malta, özellikle küçük sınıflar ve birebir ilgi arayan
                                öğrenciler için uygun bir okuldur. Sakin Pembroke bölgesi, derslere
                                odaklanmayı kolaylaştırır. Program çeşitliliği sınırlı olsa da,
                                kontrollü tempo ve bireysel ilgi sayesinde verimli bir öğrenme ortamı
                                sunar. Bu değerlendirme, saha gözlemleri ve öğrenci geri
                                bildirimlerine dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  Atlas Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/atlas-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  Atlas Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isBELS ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/bels-malta-dil-okulu-st-pauls-bay.webp"
                                alt="BELS Malta Dil Okulu binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                BELS Malta, özellikle sakin ortamda, düşük kalabalıkla eğitim almak
                                isteyen öğrenciler için güçlü bir alternatiftir. Gozo kampüsü,
                                Malta'daki en huzurlu eğitim deneyimlerinden birini sunar. Sosyal
                                hareketlilik beklentisi olan öğrenciler için sınırlı kalabilir;
                                ancak odaklı öğrenme ve bireysel ilgi arayanlar için oldukça verimli
                                bir okul yapısı vardır. Bu değerlendirme, saha gözlemleri ve öğrenci
                                geri bildirimlerine dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  BELS Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/bels-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  BELS Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : isEC ? (
                          <div className="space-y-6">
                            {/* Okul Binası Görseli */}
                            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                              <Image
                                src="/malta-dil-okullari-dis/ec-malta-dil-okulu-st-julians.webp"
                                alt="EC Malta Dil Okulu St. Julian's binası"
                                width={400}
                                height={300}
                                className="w-full h-auto object-cover"
                                priority={false}
                              />
                            </div>

                            {/* Malta Dil Okulu Temsilcisi Notu */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                              <h4 className="mb-4 text-base font-semibold text-slate-900">
                                Malta Dil Okulu Temsilcisi Notu
                              </h4>
                              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                                EC Malta, Malta'da faaliyet gösteren en kurumsal ve sistemli dil
                                okullarından biridir. Eğitim planlaması, seviye geçişleri ve akademik
                                takibi güçlüdür. IELTS ve Cambridge gibi sınav hedefi olan öğrenciler
                                için uygun bir yapı sunar. Sosyal aktiviteler mevcut olsa da, okulun
                                ana odağı akademik ilerlemedir. Bu değerlendirme, saha gözlemleri ve
                                öğrenci geri bildirimlerine dayanmaktadır.
                              </p>
                              <div className="flex flex-col gap-3">
                                <a
                                  href="https://wa.me/35699143066"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0052A3] focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                    aria-hidden="true"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                  EC Malta Dil Okulu Temsilcisinden Bilgi Al
                                </a>
                                <Link
                                  href="/malta-dil-okullari/ec-malta"
                                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                                >
                                  EC Malta Dil Okulunu İncele
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                            <h4 className="mb-4 text-base font-semibold text-slate-900">
                              MaltaStart Temsilcisinden Notlar
                            </h4>
                            <p className="mb-4 text-sm leading-relaxed text-slate-700">
                              {maltaStart_notlar_placeholder}
                            </p>
                            <p className="text-xs font-medium text-slate-500">
                              MaltaStart Gözlem Ekibi, 2025
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
              )}
            </div>
          </div>
        </section>

        {/* Bu Sayfada İncelenen Malta Dil Okulları */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 sm:text-3xl">
              Bu Sayfada İncelenen Malta Dil Okulları (2026)
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              <p>
                Bu sayfada yer alan Malta dil okulları, resmi akreditasyonlara sahip, Türk öğrenciler tarafından en sık tercih edilen ve eğitim yapıları birbirinden farklı olan kurumlardan seçilmiştir.
              </p>
              <p>
                İncelemeler; okul ziyareti, sınıf yapısı, öğrenci profili, program temposu ve konaklama seçenekleri gibi kriterler dikkate alınarak hazırlanmıştır. Okullar, popülerlik ya da "en iyi okul" iddiasına göre değil, hangi okulun hangi öğrenci profiline daha uygun olduğu temel alınarak değerlendirilmiştir.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <DilOkullariFAQ />

        {/* Bu İçerik Nasıl Hazırlandı? */}
        <IcerikHazirlama />
      </main>
    </>
  );
}
