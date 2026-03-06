'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TableOfContents from './components/TableOfContents';
import IcerikHazirlama from './components/IcerikHazirlama';

interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export default function MaltaYazOkuluPage() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Son güncelleme tarihi (tr-TR locale, Türkçe ay isimleri)
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);

    // Scroll butonu görünürlüğü
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqData: FAQItem[] = [
    {
      question: 'Malta yaz okulları kaç yaş için uygundur?',
      answer: 'Malta yaz okulları genellikle **8–17 yaş** arası çocuklar ve gençler için planlanır. Programlar çoğunlukla **Junior** ve **Teen** gruplarına ayrılır ve yaşa göre ders/aktivite düzeni değişebilir.',
    },
    {
      question: 'Malta yaz okulu programları kaç hafta sürer?',
      answer: 'Program süreleri okul ve döneme göre değişmekle birlikte genellikle **1–8 hafta** aralığında seçenekler bulunur. Aileler çoğunlukla 2–4 haftalık paketleri tercih eder.',
    },
    {
      question: 'Malta yaz okulu fiyatlarına neler dahil olur?',
      answer: 'Paketlerin çoğunda **İngilizce dersleri**, program tipine göre **konaklama**, **yemek planı**, **aktiviteler/geziler** ve bazı paketlerde **havaalanı transferi** yer alabilir. Dahil olan hizmetler okul ve pakete göre değişir.',
    },
    {
      question: 'Malta yaz okullarında haftada kaç saat İngilizce dersi olur?',
      answer: 'Çoğu Malta yaz okulu programında haftalık ders yükü genellikle **15–20 saat İngilizce dersi** olacak şekilde planlanır. Ders saatleri okulun programına göre değişebilir.',
    },
    {
      question: 'Aktiviteler ve geziler zorunlu mu?',
      answer: 'Birçok programda aktiviteler ve geziler yaz okulunun temel parçasıdır ve öğrenciler genellikle gözetmenler eşliğinde katılır. Aktivite içeriği okul ve yaş grubuna göre farklılık gösterebilir.',
    },
    {
      question: 'Malta yaz okulunda hangi konaklama seçenekleri var?',
      answer: 'En yaygın seçenekler **aile yanı**, **residence/yurt** ve bazı programlarda **resort otel** konaklamasıdır. Konaklama türü, öğrencinin yaşına ve seçilen pakete göre belirlenir.',
    },
    {
      question: 'Yeşil pasaport ile Malta yaz okuluna vize gerekir mi?',
      answer: '**Yeşil pasaport** sahipleri için Malta\'da **90 güne kadar vize muafiyeti** bulunabilir; bu nedenle 90 günü aşmayan programlarda çoğunlukla vize başvurusu gerekmeyebilir. (Süre ve koşullar seyahat planına göre değişebilir.)',
    },
    {
      question: 'Bordo pasaport ile Malta yaz okuluna vize gerekir mi?',
      answer: 'Evet. **Bordo pasaport** ile Malta yaz okuluna katılımda genellikle vize gereklidir. Başvuru dosyası, okul kabul belgesi ve konaklama evrakları hazırlanır.',
    },
    {
      question: 'Vize başvurusu için destek sağlıyor musunuz?',
      answer: 'Evet. **Bordo pasaportlu öğrenciler** için başvuru ve evrak hazırlığı sürecinde **ücretsiz danışmanlık ve destek** sağlıyoruz.',
    },
    {
      question: 'Malta yaz okulu için ne zaman başvurmak gerekir?',
      answer: 'Popüler programlarda kontenjanlar hızlı dolabildiği için özellikle yaz dönemi için erken başvuru önerilir. Vize gereken durumlarda süreç planlaması için başvuruyu daha erken yapmak avantaj sağlar.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari',
        name: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
        description:
          'Malta yaz okulları 2026: Çocuk ve gençler için İngilizce yaz kampı programları, konaklama seçenekleri, aktiviteler ve başvuru süreci. Junior ve Teen programları.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#featured-image',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-yaz-hero'],
          xpath: [],
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#article',
        headline: 'Malta Yaz Okulları 2026 | Programlar & Fiyatlar',
        description:
          'Malta yaz okulları 2026: Çocuk ve gençler için İngilizce yaz kampı programları, konaklama seçenekleri, aktiviteler ve başvuru süreci. Junior ve Teen programları.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/malta-yaz-okullari.webp',
            width: 1200,
            height: 630,
            name: 'Malta Yaz Okulları 2026',
            caption: 'Malta Yaz Okulları 2026: Çocuk ve gençler için İngilizce yaz kampı programları',
            description: 'Malta yaz okulları 2026: Junior ve Teen programları, konaklama seçenekleri, aktiviteler ve başvuru süreci',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#breadcrumb',
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
            name: 'Malta Yaz Okulları',
            item: 'https://maltadilokuluingilizce.com/malta-yaz-okullari',
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#featured-image',
        url: 'https://maltadilokuluingilizce.com/malta-yaz-okullari/malta-yaz-okullari.webp',
        width: 1200,
        height: 630,
        caption: 'Malta Yaz Okulları 2026: Çocuk ve gençler için İngilizce yaz kampı programları',
        description: 'Malta yaz okulları 2026: Junior ve Teen programları, konaklama seçenekleri, aktiviteler ve başvuru süreci',
      },
      {
        '@type': 'Table',
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#yaz-okullari-tablosu',
        about: 'Malta yaz okulları 2026 - Program sunan okullar ve yaş aralıkları',
        name: 'Malta Yaz Okulları 2026 – Çocuk ve Genç Programları',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-yaz-okullari/#faqpage',
        mainEntity: faqData.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer.replace(/\*\*(.*?)\*\*/g, '$1'), // Markdown bold'u temizle
          },
        })),
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
        <section id="hero" className="bg-gradient-to-b from-white to-slate-50/50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Sol Kolon */}
              <div>
                <header className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
                    Malta Yaz Okulları 2026 | Programlar & Fiyatlar
                  </h1>
                </header>
                
                <div className="mb-6">
                  <p className="text-base leading-[1.6] text-slate-700 sm:text-lg sm:leading-relaxed speakable-yaz-hero">
                    <strong>Malta Yaz Okulları</strong>, <strong>2026</strong> yaz döneminde çocuklar ve gençler için <strong>İngilizce eğitimini</strong>; konaklama ve aktivitelerle birleştiren <strong>yaz kampı programlarıdır</strong>. Bu sayfada <strong>2026 program seçeneklerini</strong>, örnek <strong>fiyat aralıklarını</strong>, <strong>yaş gruplarına göre</strong> doğru <strong>okul seçimini</strong> ve <strong>başvuru adımlarını</strong> tek yerde bulabilir; <strong>okul karşılaştırmasını</strong> hızlıca yapabilirsiniz.
                  </p>
                </div>

                {/* Son Güncelleme + Breadcrumb */}
                {lastUpdated && (() => {
                  const now = new Date();
                  const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
                  const year = istanbulDate.getFullYear();
                  const month = String(istanbulDate.getMonth() + 1).padStart(2, '0');
                  const day = String(istanbulDate.getDate()).padStart(2, '0');
                  const dateTime = `${year}-${month}-${day}`;
                  return (
                    <div className="mt-4 text-xs text-slate-600">
                      <span>Son güncelleme: <time dateTime={dateTime}>{lastUpdated}</time></span>
                      <span className="mx-2 text-slate-400">|</span>
                      <nav aria-label="Breadcrumb" className="inline">
                        <ol className="inline-flex items-center gap-2">
                          <li>
                            <a href="/malta-dil-okullari" className="hover:text-slate-900 hover:underline">
                              <strong>Malta Dil Okulları</strong>
                            </a>
                          </li>
                          <li className="text-slate-400">&gt;</li>
                          <li>
                            <a href="/malta-yaz-okullari" className="hover:text-slate-900 hover:underline">
                              <strong>Malta Yaz Okulları</strong>
                            </a>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  );
                })()}

                {/* CTA Butonu */}
                <div className="mt-8">
                  <a
                    href="https://wa.me/35699143066"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Malta Yaz Okulları hakkında bilgi al"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:w-auto sm:whitespace-nowrap"
                  >
                    Malta Yaz Okulları Hakkında Bilgi Al
                  </a>
                </div>

                {/* SEO Görsel */}
                <div className="mt-6">
                  <Image
                    src="/malta-yaz-okullari/malta-yaz-okullari.webp"
                    alt="Malta yaz okulları çocuk ve genç İngilizce yaz programları"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Sağ Kolon - Tablo Kart */}
              <div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                  <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                    Malta Yaz Okulları 2026 – Çocuk ve Genç Programları
                  </h2>

                  {/* Karşılaştırma Tablosu */}
                  <div className="mt-6">
                    {/* Desktop Tablo */}
                    <div className="hidden md:block overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                              Okul
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                              Program
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                              Yaş Aralığı
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">ESE Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Junior & Teen</td>
                            <td className="px-4 py-3 text-sm text-slate-700">10–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">EC Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Young Learners</td>
                            <td className="px-4 py-3 text-sm text-slate-700">11–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">BELS Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Junior Summer</td>
                            <td className="px-4 py-3 text-sm text-slate-700">10–16</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">IELS Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Junior & Teen</td>
                            <td className="px-4 py-3 text-sm text-slate-700">13–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">Gateway School of English</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Young Learners</td>
                            <td className="px-4 py-3 text-sm text-slate-700">11–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">ACE English Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Teen Summer</td>
                            <td className="px-4 py-3 text-sm text-slate-700">12–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">AM Language Studio</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Junior</td>
                            <td className="px-4 py-3 text-sm text-slate-700">8–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">Inlingua Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Young Learners</td>
                            <td className="px-4 py-3 text-sm text-slate-700">8–17</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">Clubclass Malta</td>
                            <td className="px-4 py-3 text-sm text-slate-700">Junior & Teen</td>
                            <td className="px-4 py-3 text-sm text-slate-700">10–17</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Mobil Kart Liste */}
                    <div className="md:hidden space-y-3">
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">ESE Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Junior & Teen</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">10–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">EC Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Young Learners</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">11–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">BELS Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Junior Summer</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">10–16</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">IELS Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Junior & Teen</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">13–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">Gateway School of English</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Young Learners</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">11–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">ACE English Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Teen Summer</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">12–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">AM Language Studio</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Junior</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">8–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">Inlingua Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Young Learners</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">8–17</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Okul</span>
                          <span className="text-sm font-semibold text-slate-900">Clubclass Malta</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Program</span>
                          <span className="text-sm text-slate-700">Junior & Teen</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-semibold text-slate-500 uppercase">Yaş Aralığı</span>
                          <span className="text-sm text-slate-700">10–17</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Mikro Metin */}
                  <p className="mt-6 text-sm leading-relaxed text-slate-600">
                    <strong>Malta yaz okulları programları</strong>, öğrencinin yaşına ve program içeriğine göre farklılık gösterir. Yukarıdaki karşılaştırma, <strong>2026</strong> yaz döneminde çocuklar ve gençler için sunulan <strong>Malta yaz okulu seçeneklerini</strong> hızlıca görmenizi sağlar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOC Section */}
        {/* İçindekiler (TOC) */}
        <TableOfContents />

        {/* Tanım Bloğu */}
        <section id="yaz-okulu-nedir" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 sm:text-3xl">
              Malta Yaz Okulları Nedir? Kimler İçin Uygundur?
            </h2>
            
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg mb-4">
              <strong>Malta yaz okulları</strong>, yaz döneminde <strong>çocuklar ve gençler için İngilizce eğitimini</strong>; <strong>konaklama, aktiviteler ve sosyal programlarla</strong> birleştiren <strong>kısa süreli eğitim programlarıdır</strong>. Genellikle <strong>8–17 yaş arası öğrenciler</strong> için düzenlenen bu programlar, <strong>junior ve teen</strong> gruplara ayrılır. <strong>Çocuklar için Malta yaz okulu programları</strong>, <strong>güvenli kampüs yapısı</strong>, <strong>24 saat gözetim</strong> ve <strong>uluslararası öğrenci ortamı</strong> sayesinde hem <strong>dil gelişimi</strong> hem de <strong>sosyal beceriler</strong> açısından aileler tarafından sıkça tercih edilir.
            </p>

            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta yaz okulu programları çoğunlukla <strong>8–10 (Junior)</strong>, <strong>11–13 (Junior Plus)</strong> ve <strong>14–17 (Teen)</strong> yaş gruplarına göre planlanır.
            </p>
          </div>
        </section>

        {/* Pakete Dahil Olanlar */}
        <section id="pakete-dahil" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Yaz Okulları Paketine Neler Dahil?
            </h2>
            
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta yaz okulları paketleri; İngilizce dersleri, konaklama ve aktiviteler gibi temel hizmetleri tek programda birleştirir.
            </p>

            {/* Kartlar Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {/* Kart 1: İngilizce Dersleri */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">İngilizce Dersleri</h3>
                <p className="text-sm leading-relaxed text-slate-600">Haftalık ders planı ve seviye yerleştirme</p>
              </div>

              {/* Kart 2: Konaklama */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">Konaklama</h3>
                <p className="text-sm leading-relaxed text-slate-600">Resort / residence / aile yanı seçenekleri</p>
              </div>

              {/* Kart 3: Yemek Planı */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                  <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">Yemek Planı</h3>
                <p className="text-sm leading-relaxed text-slate-600">Program tipine göre tam/yarım pansiyon</p>
              </div>

              {/* Kart 4: Aktiviteler */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">Aktiviteler</h3>
                <p className="text-sm leading-relaxed text-slate-600">Sosyal etkinlikler, geziler ve spor</p>
              </div>

              {/* Kart 5: Transfer */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">Transfer</h3>
                <p className="text-sm leading-relaxed text-slate-600">Havalimanı karşılama (pakete göre)</p>
              </div>

              {/* Kart 6: Gözetim */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-rose-50">
                  <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">Gözetim</h3>
                <p className="text-sm leading-relaxed text-slate-600">Junior programlarda 24/7 destek (pakete göre)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Sunan Okullar */}
        <section id="program-sunan-okullar" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Yaz Okulları 2026 – Program Sunan Okullar
            </h2>
            
            <p className="mb-12 text-base leading-relaxed text-slate-700 sm:text-lg speakable-yaz-schools-summary">
              Malta yaz okulları 2026 programları, çocuklar ve gençler için İngilizce eğitimini yaş gruplarına göre planlayan ve konaklama ile aktiviteleri bir arada sunan okullardan oluşur. Aşağıda, Malta'da junior ve teen yaz okulu programları sunan önde gelen okulları ve temel program özelliklerini inceleyebilirsiniz.
            </p>

            {/* ESE Malta Okul Bloğu */}
            <article id="ese-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">
                ESE Malta Yaz Okulu – Junior & Teen Programları
              </h3>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Sol: Görsel */}
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image
                      src="/malta-yaz-okullari/ese-malta-yaz-okulu.webp"
                      alt="ESE Malta yaz okulu junior ve teen İngilizce programları"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">530 € – 1.170 €</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Salini Resort otel (4 kişilik) / aile yanı / konaklamasız (pakete göre)</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>

                {/* Sağ: Metin ve Etiketler */}
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700">
                    <strong>ESE Malta yaz okulu</strong>, 2026 yaz döneminde 10–17 yaş arası öğrenciler için düzenlenen <strong>junior ve teen İngilizce programları</strong> sunar. Malta'nın en çok tercih edilen <strong>yaz okullarından</strong> biri olan <strong>ESE Malta</strong>, <strong>İngilizce derslerini</strong> <strong>sosyal aktiviteler</strong> ve <strong>gezilerle</strong> birleştirerek öğrencilerin dili günlük hayatta aktif şekilde kullanmasını hedefler.
                  </p>

                  {/* Renkli Bilgi Etiketleri */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {/* Etiket 1: Yaş Aralığı */}
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
                        Yaş Aralığı
                      </div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900">
                        10–17 yaş arası junior ve teen öğrenciler
                      </div>
                    </div>

                    {/* Etiket 2: Program Türü */}
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                        Program Türü
                      </div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900">
                        ESE Malta yaz okulu junior ve teen İngilizce yaz programları
                      </div>
                    </div>

                    {/* Etiket 3: Konaklama */}
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">
                        Konaklama
                      </div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">
                        Resort otel veya aile yanı konaklama seçenekleri
                      </div>
                    </div>

                    {/* Etiket 4: Öne Çıkan */}
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">
                        Öne Çıkan
                      </div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900">
                        Aktiviteli programlar ve uluslararası öğrenci ortamı
                      </div>
                    </div>
                  </div>

                  {/* CTA Butonu */}
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+ESE+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="ESE Malta yaz okulu hakkında WhatsApp ile bilgi al"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/>
                    </svg>
                    ESE Malta Yaz Okulu Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* EC Malta Okul Bloğu */}
            <article id="ec-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">
                EC Malta Yaz Okulu – Young Learners Programları
              </h3>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image
                      src="/malta-yaz-okullari/ec-malta-yaz-okulu.webp"
                      alt="EC Malta yaz okulu young learners İngilizce yaz programları"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">900 € – 1.080 €</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Homestay veya Campus Hub / otel konaklama (pakete göre)</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>

                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700">
                    <strong>EC Malta yaz okulu</strong>, 2026 yaz döneminde <strong>12–18</strong> yaş grubu için tasarlanan <strong>Young Learners</strong> programlarıyla öne çıkar. Program; İngilizce derslerini kampüs/rezidans düzeni ve günlük aktivitelerle birleştirerek öğrencilerin dili gün boyu kullanmasını hedefler. Konaklamada modern <strong>residence</strong> seçenekleri ve düzenli refah/denetim yapısı, ailelerin en çok aradığı kriterleri karşılar.
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900">Genellikle <strong>12–18</strong> (programa göre değişebilir)</div>
                    </div>

                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Young Learners</strong> İngilizce yaz okulu</div>
                    </div>

                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Residence/kampüs konaklama (pakete göre)</div>
                    </div>

                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Kampüs düzeni</strong> + ders/aktivite dengesi</div>
                    </div>
                  </div>

                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+EC+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="EC Malta yaz okulu hakkında WhatsApp ile bilgi al"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/>
                    </svg>
                    EC Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* BELS Malta Okul Bloğu */}
            <article id="bels-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">BELS Malta Yaz Okulu – Junior Camp Programı</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/bels-malta-yaz-okulu.webp" alt="BELS Malta yaz okulu junior camp İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">540 € – 1.095 €</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Junior Camp residence (max 4 kişi) veya Day Programme (pakete göre)</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>BELS Malta yaz okulu</strong>, yaz döneminde <strong>10–16</strong> yaş için hazırlanan <strong>Junior Camp</strong> programıyla bilinir. Junior kamp paketleri; dersleri aktivitelerle birleştirirken, konaklamada otel/residence düzeni ve <strong>24/7 gözetim</strong> odağıyla aileler için güvenli bir yapı sunar. Residence veya host family gibi seçeneklerle, öğrencinin yaşına ve bağımsızlığına göre planlama yapılabilir.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900"><strong>10–16</strong> junior öğrenciler</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Junior Camp</strong> İngilizce yaz okulu</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Residence/otel + full board (pakete göre)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>24/7 gözetim</strong> ve kamp düzeni</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+BELS+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="BELS Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    BELS Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* IELS Malta Okul Bloğu */}
            <article id="iels-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">IELS Malta Yaz Okulu – Young Learners (13–17) Programları</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/iels-malta-yaz-okulu.webp" alt="IELS Malta yaz okulu young learners İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">451 € – 1.415 €</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Homestay / residence (pakete göre) + Day Programme seçeneği</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>IELS Malta yaz okulu</strong>, <strong>13–17</strong> yaş grubuna yönelik <strong>Young Learners</strong> programlarında iletişim (speaking) odaklı ders planıyla öne çıkar. Derslerde proje, rol-play ve tartışma gibi etkinliklerle öğrencilerin İngilizceyi aktif kullanması hedeflenir; bu da yaz okulu deneyimini daha verimli hâle getirir. Ayrıca okul, varıştan dönüşe kadar genç öğrenciler için refah/destek süreçlerini planlı yürütmesiyle tercih edilir.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900"><strong>13–17</strong> young learners</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Young Learners</strong> (iletişim odaklı)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Residence/host family (pakete göre)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Konuşma odaklı</strong> ders + welfare desteği</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+IELS+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="IELS Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    IELS Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* Gateway Malta Okul Bloğu */}
            <article id="gateway-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">Gateway Malta Yaz Okulu – Junior Teens English Programme</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/gateway-malta-yaz-okulu.webp" alt="Gateway Malta yaz okulu junior teens İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">155 € – 450 €</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Tuition only / aktiviteli paket (konaklama opsiyonel-teklif ile)</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>Gateway Malta yaz okulu</strong>, yıl boyu ve yaz döneminde <strong>11–17</strong> yaş aralığına yönelik <strong>Junior Teens English Programme</strong> sunar. Hem grup hem bireysel katılıma uygun yapı; İngilizce derslerini konaklama ve aktivitelerle birleştirerek öğrencilerin Malta'da pratik yapmasını destekler. Konaklamada residence ve host family seçenekleriyle, aileler ihtiyaçlarına göre esnek seçim yapabilir.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900"><strong>11–17</strong> junior & teens</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Junior Teens English Programme</strong></div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Residence + host family seçenekleri</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Bireysel veya grup</strong> katılım esnekliği</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Gateway+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Gateway Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    Gateway Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* ACE English Malta Okul Bloğu */}
            <article id="ace-english-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">ACE English Malta Yaz Okulu – Junior Summer Programme</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/ace-english-malta-yaz-okulu.webp" alt="ACE English Malta yaz okulu junior summer programme İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">1.100 € – 1.200 €</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Öğrenci yurdu (pakete göre) / bazı paketlerde konaklamasız seçenek</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>ACE English Malta yaz okulu</strong>, yaz döneminde genç öğrencilerin İngilizceye güven kazanmasını hedefleyen <strong>Junior Summer Programme</strong> ile öne çıkar. Program, sınıf içi dersleri spor, kültürel ziyaretler ve eğlenceli aktivitelerden oluşan kapsamlı bir boş zaman planıyla destekler. Bu yaklaşım, öğrencinin yalnızca derslerde değil günün tamamında İngilizce kullanmasına yardımcı olur.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900">Program paketine göre (genelde <strong>12–17</strong>)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Junior Summer Programme</strong></div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Paketlere göre residence/host family</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Aktivite yoğun</strong> yaz programı</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+ACE+English+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="ACE English Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    ACE English Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* AM Language Studio Malta Okul Bloğu */}
            <article id="am-language-studio-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">AM Language Studio Malta Yaz Okulu – Kids & Teen Programları</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/am-language-studio-malta-yaz-okulu.webp" alt="AM Language Studio Malta yaz okulu kids ve teen İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">Başlangıç: 418 €+ / hafta (pakete göre)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Paket ve döneme göre residence/host family seçenekleri</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>AM Language Studio Malta yaz okulu</strong>, özellikle küçük yaş grupları için tasarlanan <strong>Kids Camp</strong> yaklaşımıyla dikkat çeker. Program; Malta'da güvenli bir ortamda İngilizceye erken yaşta başlamak isteyen öğrenciler için dersleri yaşa uygun içeriklerle planlar ve öğrenmeyi eğlenceli hâle getirir. Kids programları <strong>8–12</strong> yaş odağında güçlüyken, daha büyük yaş grupları için teen seçenekleri paketlere göre şekillenebilir.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900"><strong>8–12</strong> (Kids); teen seçenekleri pakete göre</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Kids Camp</strong> + teen seçenekleri</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Paketlere göre aile yanı/residence</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Erken yaş</strong> odaklı yaz programı</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+AM+Language+Studio+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="AM Language Studio Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    AM Language Studio Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* Inlingua Malta Okul Bloğu */}
            <article id="inlingua-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">Inlingua Malta Yaz Okulu – Junior & Aile Programları</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/inlingua-malta-yaz-okulu.webp" alt="Inlingua Malta yaz okulu junior İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">Başlangıç: 343 €+ / hafta (teklif ile)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Host family / otel / apart seçenekleri (pakete göre)</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>Inlingua Malta yaz okulu</strong>, özellikle aile ile seyahat edenler için yapılandırılmış <strong>Junior</strong> programlarıyla öne çıkar. Okulun junior kursları çocuklar için küçük yaşlardan başlayabilir ve ebeveynin aynı zamanda yetişkin programına katılabildiği "parent & child" yapısı aileler için pratik bir çözümdür. Bu model, Malta'da tatil planını bozmadan çocuğun İngilizce ders düzenine girmesini sağlar.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900">Junior kurslar (küçük yaşlardan başlayabilir)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Junior Course</strong> + parent & child</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Aile planına göre (pakete göre)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Aile ile birlikte</strong> aynı program düzeni</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Inlingua+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Inlingua Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    Inlingua Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>

            {/* Clubclass Malta Okul Bloğu */}
            <article id="clubclass-malta-yaz-okulu" className="mb-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg transition-shadow hover:shadow-xl lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">Clubclass Malta Yaz Okulu – Junior / Teen Programları</h3>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                    <Image src="/malta-yaz-okullari/clubclass-malta-yaz-okulu.webp" alt="Clubclass Malta yaz okulu junior ve teen İngilizce yaz programları" width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  
                  {/* Fiyat & Konaklama Mikro Bilgi */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">💶</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Ortalama Haftalık Ücret</div>
                          <div className="text-sm font-medium text-slate-900">675 € – 875 € / hafta (pakete göre)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Konaklama</div>
                          <div className="text-sm font-medium text-slate-900">Residence veya aile yanı / family programme seçenekleri</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed">Fiyatlar program türüne, tarih aralığına ve konaklama seçeneğine göre değişiklik gösterebilir.</p>
                  </div>
                </div>
                <div>
                  <p className="mb-8 text-base leading-relaxed text-slate-700"><strong>Clubclass Malta yaz okulu</strong>, junior yaş grupları için aile ile birlikte planlanabilen kurs seçenekleriyle bilinir. Çocukların İngilizce ders alırken aile tatilinin de devam edebileceği "family programme" yaklaşımı, özellikle Malta'yı birlikte deneyimlemek isteyen ebeveynler için avantaj sağlar. Ayrıca yaz kampı konseptli paketler, yaş ve dönem planlamasına göre <strong>12–17</strong> gibi teen aralıklarında da sunulabilir.</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Yaş Aralığı</div>
                      <div className="text-sm font-medium leading-relaxed text-blue-900">Junior kurslar + teen paketleri (döneme göre)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Program Türü</div>
                      <div className="text-sm font-medium leading-relaxed text-emerald-900"><strong>Family / Junior</strong> + teen yaz paketi</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-amber-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"><svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-700">Konaklama</div>
                      <div className="text-sm font-medium leading-relaxed text-amber-900">Residence/tesis içi konaklama (pakete göre)</div>
                    </div>
                    <div className="group relative flex h-full min-h-[140px] flex-col items-center justify-start overflow-hidden rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-md">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-purple-700">Öne Çıkan</div>
                      <div className="text-sm font-medium leading-relaxed text-purple-900"><strong>Okul + konaklama</strong> aynı kampüs konsepti (pakete göre)</div>
                    </div>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Clubclass+Malta+yaz+okulu+hakkında+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Clubclass Malta yaz okulu hakkında WhatsApp ile bilgi al">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.21 0C5.495-.001.001 5.491.001 12.203c0 2.142.582 4.152 1.595 5.945L.002 24l6.305-1.652a11.882 11.882 0 005.903 1.57h.005c6.715 0 12.209-5.492 12.209-12.203 0-3.189-1.238-6.189-3.486-8.444"/></svg>
                    Clubclass Malta Yaz Okulu Hakkında Bilgi Al
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Günlük Program Bilgilendirme Bloğu */}
        <section id="gunluk-program" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8 sm:text-3xl">
              Malta Yaz Okullarında Günlük Program Nasıldır?
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Sol: Görsel */}
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/malta-yaz-okullari/malta-yaz-okulu-gunluk-program.webp"
                  alt="Malta yaz okulları günlük program İngilizce ders ve aktiviteler"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Sağ: Açıklama Metni */}
              <div className="flex items-center">
                <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                  Malta yaz okulu programları, çocuklar ve gençler için günün tamamını kapsayan planlı bir yaz kampı düzeni sunar. Gün genellikle <strong>08:30'da kahvaltı</strong> ile başlar ve öğrenciler <strong>09:30 itibarıyla sabah aktivitelerine</strong> katılarak güne enerjik bir başlangıç yapar. <strong>13:00'te öğle yemeği</strong> ile günün ilk bölümü tamamlanırken, <strong>14:00'teki dinlenme saati</strong> öğrencilerin derslere hazırlanmasına yardımcı olur. Öğleden sonra <strong>15:00'te başlayan İngilizce dersleri</strong>, dil becerilerinin sistemli şekilde geliştirilmesine odaklanır. Akşam saatlerinde <strong>19:00'da akşam yemeği</strong>, sonrasında ise <strong>bowling gibi sosyal ve eğlenceli aktiviteler</strong> yer alır ve günlük program <strong>23:00 yatış saati</strong> ile tamamlanır. Bu yapı, Malta yaz okullarını hem akademik hem de sosyal açıdan güvenli, düzenli ve verimli bir yaz deneyimi hâline getirir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aktiviteler ve Geziler Bilgilendirme Bloğu */}
        <section id="aktiviteler-geziler" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8 sm:text-3xl">
              Malta Yaz Okullarında Aktiviteler ve Geziler
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Sol: Görsel */}
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/malta-yaz-okullari/malta-yaz-okulu-aktiviteler-geziler.webp"
                  alt="Malta yaz okulları aktiviteler ve kültürel geziler"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Sağ: Açıklama Metni */}
              <div className="flex items-center">
                <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                  Malta yaz okulları aktiviteler ve geziler açısından oldukça zengin bir programa sahiptir ve öğrencilerin İngilizceyi sınıf dışında da aktif şekilde kullanmasını hedefler. Yaz okulu süresince düzenlenen <strong>spor aktiviteleri</strong>, <strong>sosyal etkinlikler</strong> ve <strong>grup çalışmaları</strong>, öğrencilerin farklı ülkelerden gelen akranlarıyla iletişim kurmasını destekler. Programlara genellikle <strong>Valletta</strong>, <strong>Mdina</strong>, <strong>Comino</strong> gibi Malta'nın öne çıkan noktalarına yapılan <strong>kültürel ve eğlenceli geziler</strong> de dahil edilir. Bu aktiviteler, Malta yaz okulu deneyimini yalnızca dil eğitimiyle sınırlı kalmayan, aynı zamanda <strong>sosyal gelişimi ve kültürel farkındalığı artıran</strong> kapsamlı bir yaz programına dönüştürür.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Konaklama Seçenekleri Bilgilendirme Bloğu */}
        <section id="konaklama-secenekleri" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8 sm:text-3xl">
              Malta Yaz Okullarında Konaklama Seçenekleri
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Sol: Görsel */}
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/malta-yaz-okullari/malta-yaz-okulu-konaklama-secenekleri.webp"
                  alt="Malta yaz okulları konaklama seçenekleri aile yanı residence yurt"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Sağ: Açıklama Metni */}
              <div className="flex items-center">
                <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                  Malta yaz okullarında konaklama seçenekleri, öğrencinin yaşına ve program türüne göre güvenlik ve konfor öncelikli olarak planlanır. Yaz okulu programlarında en sık tercih edilen seçenekler arasında <strong>aile yanı konaklama</strong>, <strong>öğrenci residence/yurt</strong> ve bazı programlarda sunulan <strong>resort otel konaklamaları</strong> yer alır. Aile yanı konaklama, öğrencilerin günlük hayatta İngilizce pratik yapmasını desteklerken; residence ve yurt konaklamaları, yaşı daha büyük öğrenciler için sosyal etkileşimi ve bağımsızlık hissini artırır. Tüm konaklama türleri, Malta yaz okulları tarafından denetlenen ve gözetmen desteği sunan yapılarla planlanır; böylece çocuklar ve gençler için güvenli bir yaz okulu deneyimi sağlanır.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Başvuru ve Vize Süreci Bilgilendirme Bloğu */}
        <section id="basvuru-vize" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8 sm:text-3xl">
              Malta Yaz Okullarına Başvuru ve Vize Süreci
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Sol: Görsel */}
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/malta-yaz-okullari/malta-yaz-okulu-basvuru-vize.webp"
                  alt="Malta yaz okulları başvuru ve vize süreci"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Sağ: Açıklama Metni */}
              <div className="flex items-center">
                <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                  Malta yaz okullarına başvuru süreci, program ve tarih seçiminin ardından kayıt ve belge aşamalarıyla ilerler ve öğrencinin pasaport türüne göre vize gereklilikleri değişiklik gösterir. <strong>Yeşil pasaport sahibi öğrenciler için Malta'da 90 güne kadar vize muafiyeti bulunması</strong>, yaz okulu planlamasını hızlı ve kolay hâle getirirken; <strong>bordo pasaportlu öğrenciler için Malta vizesi gereklidir</strong>. Bordo pasaportla başvuran öğrenciler adına okul kabul belgesi, konaklama evrakları ve başvuru dosyası hazırlanır; bu süreçte <strong>vize başvurusu ve evrak hazırlığı konusunda ücretsiz danışmanlık ve destek</strong> sağlanır. Tüm başvuru ve vize aşamaları, Malta yaz okulu programına zamanında ve sorunsuz katılım sağlanacak şekilde planlanır.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <section id="sss" className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8 sm:text-3xl">
              Malta Yaz Okulları Hakkında Sık Sorulan Sorular
            </h2>

            <div className="space-y-4">
              {faqData.map((faq, index) => {
                const isOpen = openFAQ === index;
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-base font-semibold text-slate-900 pr-4 sm:text-lg">
                        {faq.question}
                      </h3>
                      <svg
                        className={`h-5 w-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${index}`}
                        className="px-6 pb-4 text-base leading-relaxed text-slate-700"
                        dangerouslySetInnerHTML={{
                          __html: faq.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bu İçerik Nasıl Hazırlandı? */}
        <IcerikHazirlama />
      </main>

      {/* Yukarı Çık Butonu */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Sayfanın başına dön"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}
