'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import WorkStudyFAQ from './components/WorkStudyFAQ';
import IcerikHazirlama from './components/IcerikHazirlama';

export default function MaltaWorkAndStudyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  // Tarih - tek kaynak
  const dateModified = new Date().toISOString().split('T')[0];
  const datePublished = '2026-01-01';

  useEffect(() => {
    // Son güncelleme tarihi (Europe/Istanbul timezone)
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);

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
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#webpage',
        url: 'https://maltadilokuluingilizce.com/malta-work-and-study',
        name: 'Malta Work & Study Programı 2026 | Çalışma Şartları, Fiyatlar ve Süreç',
        description:
          'Malta Work & Study 2026: Malta\'da dil eğitimi alırken çalışma şartları, çalışma izni süreci, saatlik ücretler, aylık gelir ve program detayları.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#article',
        },
        primaryImageOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#featured-image',
        },
      },
      {
        '@type': 'Article',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#article',
        headline: 'Malta Work & Study Programı 2026 | Çalışma Şartları, Fiyatlar ve Süreç',
        description:
          'Malta Work & Study 2026: Malta\'da dil eğitimi alırken çalışma şartları, çalışma izni süreci, saatlik ücretler, aylık gelir ve program detayları. Work & Study rehberi.',
        author: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntityOfPage: {
          '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#webpage',
        },
        datePublished,
        dateModified,
        image: [
          {
            '@type': 'ImageObject',
            url: 'https://maltadilokuluingilizce.com/work-and-study/malta-work-and-study-malta-yasam.webp',
            width: 1200,
            height: 630,
            name: 'Malta Work & Study Programı 2026',
            caption: 'Malta Work & Study 2026: Malta\'da dil eğitimi alırken part-time çalışma ve yaşam ortamı',
            description: 'Malta Work & Study 2026 programı: Çalışma şartları, süreç adımları, fiyat aralıkları ve bütçe hesaplama rehberi',
          },
        ],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-work-study-hero'],
          xpath: [],
        },
      },
      {
        '@type': 'HowTo',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#howto-work-study-sureci',
        name: 'Malta Work & Study Programı Süreci',
        description: 'Malta Work & Study programı süreci adım adım rehber',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Okul Kaydı ve Program Başlangıcı',
            text: 'Work & Study süreci, Malta\'daki bir dil okuluna kayıt olunmasıyla başlar. Minimum 15 hafta (105 gün) dil eğitimi şartı vardır.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'İlk 90 Gün Eğitim Dönemi',
            text: 'Programın ilk 90 günü yalnızca eğitim odaklıdır. Bu süre içinde çalışma izni bulunmaz.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Çalışma İzni Başvurusu',
            text: '90 günü tamamladıktan sonra çalışma izni başvurusu yapılabilir. Çalışma izni sonrasında haftada maksimum 20 saat çalışılabilir.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'İş Bulma Süreci',
            text: 'Çalışma izni alındıktan sonra part-time iş bulma süreci başlar. Ortalama saatlik ücret 7–9 € arasındadır.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#breadcrumb',
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
            name: 'Malta Work & Study 2026',
            item: 'https://maltadilokuluingilizce.com/malta-work-and-study',
          },
        ],
      },
      {
        '@type': 'ImageObject',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#featured-image',
        url: 'https://maltadilokuluingilizce.com/work-and-study/malta-work-and-study-malta-yasam.webp',
        width: 1200,
        height: 630,
        caption: 'Malta Work & Study 2026: Malta\'da dil eğitimi alırken part-time çalışma ve yaşam ortamı',
        description: 'Malta Work & Study 2026 programı: Çalışma şartları, süreç adımları, fiyat aralıkları ve bütçe hesaplama rehberi',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/malta-work-and-study/#faqpage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Malta Work & Study ile tam zamanlı çalışabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Malta Work & Study programı kapsamında öğrenciler haftada maksimum 20 saat part-time çalışabilir. Full-time çalışma, öğrenci statüsünde mümkün değildir.',
            },
          },
          {
            '@type': 'Question',
            name: 'İlk 90 gün çalışmak zorunlu mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Hayır. Malta'da Work & Study sürecinin ilk 90 günü yalnızca eğitim odaklıdır. Çalışma izni başvurusu bu sürenin ardından yapılabilir.",
            },
          },
          {
            '@type': 'Question',
            name: "Malta'da öğrenci olarak ayda ne kadar kazanılır?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: '2026 itibarıyla saatlik ücretler genellikle 7–9 € arasındadır. Haftada 20 saat çalışan bir öğrenci, aylık ortalama 550–750 € gelir elde edebilir.',
            },
          },
          {
            '@type': 'Question',
            name: 'İngilizce seviyem düşükse Work & Study yapabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Program İngilizce eğitimi ile başladığı için başlangıç seviyesindeki öğrenciler için de uygundur. İş bulma süreci, temel iletişim seviyesine ulaşıldıktan sonra daha kolay ilerler.',
            },
          },
          {
            '@type': 'Question',
            name: 'İş bulamazsam Work & Study programı iptal olur mu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Work & Study bir çalışma programı değil, eğitim temelli bir sistemdir. İş bulamamak programın iptal edilmesine neden olmaz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta Work & Study 2026 yılında gerçekten mantıklı mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'İngilizce pratiği, bütçe kontrolü ve Avrupa deneyimini birlikte hedefleyen öğrenciler için Malta Work & Study, 2026 itibarıyla dengeli ve erişilebilir bir seçenektir.',
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
        <section id="hero" className="bg-gradient-to-b from-white to-slate-50/50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Sol Kolon - Hero Metni */}
              <div className="lg:col-span-7">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl mb-3">
                  Malta Work & Study Programı 2026
                </h1>
                <h2 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl mb-4">
                  Malta'da Dil Eğitimi Alırken Çalışma Şartları, Fiyatlar ve Süreç
                </h2>
                <div className="mt-4 space-y-4 text-base leading-[1.6] text-slate-700 sm:text-lg sm:leading-relaxed">
                  <p className="speakable-work-study-hero">
                    Malta Work & Study programında en az 15 hafta (105 gün) dil eğitimi şartı vardır. Bu sürenin ilk 90 günü tamamlandıktan sonra yasal çalışma izni alınabilir. Çalışma izni sonrasında haftada maksimum 20 saat çalışabilirsiniz; ortalama saatlik ücret 7–9 € ve aylık ortalama gelir 550–750 €'dur. Bu sayfa Malta Work & Study'in şartları, süreç adımları ve fiyat aralıklarını güncel şekilde sunar.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="/malta-dil-okulu-fiyatlari"
                    aria-label="Malta dil okulu fiyatları ve Work & Study bütçe hesaplama"
                    className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    Malta Work & Study 2026 Fiyat Hesapla
                  </a>
                  <a
                    href="#sartlar"
                    aria-label="Malta Work & Study 2026 çalışma şartları"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    Malta'da Çalışma Şartlarını Öğren
                  </a>
                </div>
                <div className="mt-6">
                  <a
                    href="https://wa.me/35699143066"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Malta Work & Study danışmanlık WhatsApp"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100 focus:outline-none focus:ring-4 focus:ring-green-200"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Malta Work & Study Danışmanlık (WhatsApp)
                  </a>
                </div>
              </div>

              {/* Sağ Kolon - Temel Şartlar */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-8 shadow-md ring-1 ring-slate-100">
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl mb-6">
                    Malta Work & Study 2026 – Temel Şartlar
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                      <span className="text-sm leading-relaxed text-slate-700">
                        Minimum 15 hafta (105 gün) dil eğitimi ile programa katılma (ilk 90 gün çalışma izni yok)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                      <span className="text-sm leading-relaxed text-slate-700">
                        90 günü tamamladıktan sonra çalışma izni
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                      <span className="text-sm leading-relaxed text-slate-700">
                        Haftada maksimum 20 saat çalışma
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                      <span className="text-sm leading-relaxed text-slate-700">
                        Ortalama saatlik ücret: 7–9 €
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                      <span className="text-sm leading-relaxed text-slate-700">
                        Aylık ortalama gelir: 550–750 €
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <a
                      href="#sartlar"
                      aria-label="Malta Work & Study 2026 temel şartlar tablosu"
                      className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200"
                    >
                      2026 Temel Şartlar Tablosu
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* İçindekiler Bölümü - İki Kolonlu */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Sol Kolon - Görsel + Breadcrumb + Tarih */}
              <div>
                <div className="relative w-full overflow-hidden rounded-lg">
                  <Image
                    src="/work-and-study/malta-work-and-study-malta-yasam.webp"
                    alt="Malta Work & Study 2026 programı: Malta'da dil eğitimi alırken part-time çalışma ve yaşam ortamı"
                    width={480}
                    height={360}
                    className="h-auto w-full rounded-lg object-cover"
                    priority
                  />
                </div>
                <div className="mt-4">
                  {/* Breadcrumb */}
                  <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
                    <ol className="flex items-center gap-2 text-sm text-slate-600">
                      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <a href="/malta-dil-okullari" itemProp="item" className="hover:text-slate-900 hover:underline">
                          <span itemProp="name">Malta Dil Okulları</span>
                        </a>
                        <meta itemProp="position" content="1" />
                      </li>
                      <li className="text-slate-400">/</li>
                      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <a href="/malta-work-and-study" itemProp="item" className="hover:text-slate-900 hover:underline">
                          <span itemProp="name" className="text-slate-900">Malta Work & Study 2026</span>
                        </a>
                        <meta itemProp="position" content="2" />
                      </li>
                    </ol>
                  </nav>

                  {/* Son Güncelleme */}
                  {lastUpdated && (
                    <p className="mt-2 text-xs text-slate-500" aria-label="Son güncelleme tarihi">
                      Son güncelleme: {lastUpdated}
                    </p>
                  )}
                </div>
              </div>

              {/* Sağ Kolon - İçindekiler Kartı */}
              <div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-slate-900">İçindekiler</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>
                      <a href="#surec" className="hover:text-slate-900 hover:underline">
                        Malta Work & Study 2026 Süreci
                      </a>
                    </li>
                    <li>
                      <a href="#sartlar" className="hover:text-slate-900 hover:underline">
                        Malta Work & Study 2026 Şartları
                      </a>
                    </li>
                    <li>
                      <a href="#fiyatlar" className="hover:text-slate-900 hover:underline">
                        Malta Work & Study Fiyatları 2026
                      </a>
                    </li>
                    <li>
                      <a href="#calisarak-ingilizce" className="hover:text-slate-900 hover:underline">
                        Malta'da Çalışarak İngilizce Öğrenmek (2026)
                      </a>
                    </li>
                    <li>
                      <a href="#butce-hesaplama" className="hover:text-slate-900 hover:underline">
                        Malta Work & Study Bütçe Hesaplama (2026)
                      </a>
                    </li>
                    <li>
                      <a href="#work-and-study-karsilastirma" className="hover:text-slate-900 hover:underline">
                        Malta Work & Study Ülke Karşılaştırması (2026)
                      </a>
                    </li>
                    <li>
                      <a href="#vize-ve-resmi-kaynaklar" className="hover:text-slate-900 hover:underline">
                        Work & Study Vize Süreci ve Resmî Kaynaklar (2026)
                      </a>
                    </li>
                    <li>
                      <a href="#is-bulma-rehberi" className="hover:text-slate-900 hover:underline">
                        Part-Time İş Bulma Rehberi (2026)
                      </a>
                    </li>
                    <li>
                      <a href="#uygunluk" className="hover:text-slate-900 hover:underline">
                        Kimler İçin Uygun? (2026)
                      </a>
                    </li>
                    <li>
                      <a href="#sss" className="hover:text-slate-900 hover:underline">
                        Sık Sorulan Sorular (2026)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="surec" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study 2026 Süreci Nasıl İlerler?
            </h2>
            <p className="mb-12 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta'da Work & Study programı, eğitimle başlayan ve belirli şartlar tamamlandıktan sonra yasal çalışma izniyle devam eden aşamalı bir süreçtir.
            </p>

            <div className="space-y-16">
              {/* Adım 1 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px]">
                  <Image
                    src="/work-and-study/malta-work-study-programi-nedir-2026.webp"
                    alt="Malta Work & Study 2026 süreci – Malta Work & Study Programı Nedir?"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 sm:text-2xl">
                    Malta Work & Study Programı Nedir?
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    Malta Work & Study programı, Malta'da dil eğitimine kayıt olurken belirli bir süre eğitim tamamlandıktan sonra öğrencilere yasal olarak part-time çalışma imkânı sunan bir sistemdir. Program 2026 itibarıyla eğitim odaklı bir süreç üzerine kuruludur.
                  </p>
                </div>
              </div>

              {/* Adım 2 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px] lg:order-2">
                  <Image
                    src="/work-and-study/malta-work-study-okul-kaydi-program-baslangic.webp"
                    alt="Malta Work & Study 2026 süreci – Okul Kaydı ve Program Başlangıcı"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center lg:order-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 sm:text-2xl">
                    Okul Kaydı ve Program Başlangıcı
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    Work & Study süreci, Malta'daki bir dil okuluna kayıt olunmasıyla başlar. Eğitim süresi, program başlangıç tarihi ve toplam hafta sayısı bu aşamada netleşir.
                  </p>
                </div>
              </div>

              {/* Adım 3 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px]">
                  <Image
                    src="/work-and-study/malta-work-study-ilk-90-gun-egitim.webp"
                    alt="Malta Work & Study 2026 süreci – İlk 90 Gün: Eğitim Süreci"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 sm:text-2xl">
                    İlk 90 Gün: Eğitim Süreci
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    Malta Work & Study programında öğrenciler, ilk 90 gün boyunca yalnızca eğitimlerine odaklanır. Bu dönem, dil gelişimi ve sonraki aşamalar için hazırlık süreci olarak değerlendirilir.
                  </p>
                </div>
              </div>

              {/* Adım 4 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px] lg:order-2">
                  <Image
                    src="/work-and-study/malta-work-study-is-arama-hazirlik.webp"
                    alt="Malta Work & Study 2026 süreci – İş Arama Hazırlığı"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center lg:order-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 sm:text-2xl">
                    İş Arama Hazırlığı
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    Eğitim süreci devam ederken öğrenciler CV hazırlığı yapar ve Malta'daki part-time iş fırsatlarını araştırmaya başlar. Bu aşama, çalışma izni süreci öncesi hazırlık niteliğindedir.
                  </p>
                </div>
              </div>

              {/* Adım 5 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px]">
                  <Image
                    src="/work-and-study/malta-work-study-calisma-izni-sureci.webp"
                    alt="Malta Work & Study 2026 süreci – İşveren ve Çalışma İzni Süreci"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 sm:text-2xl">
                    İşveren ve Çalışma İzni Süreci
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    Bir işverenle anlaşma sağlandıktan sonra çalışma izni süreci başlatılır. Malta Work & Study programında çalışma izni, işveren üzerinden yürütülen resmi bir süreçtir.
                  </p>
                </div>
              </div>

              {/* Adım 6 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px] lg:order-2">
                  <Image
                    src="/work-and-study/malta-work-study-part-time-calisma-20-saat.webp"
                    alt="Malta Work & Study 2026 süreci – Part-Time Çalışma ve Eğitime Devam"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center lg:order-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 sm:text-2xl">
                    Part-Time Çalışma ve Eğitime Devam
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    Çalışma izni alındıktan sonra öğrenciler, haftada maksimum 20 saat olacak şekilde part-time çalışabilirken eğitimlerine de devam eder.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Work+%26+Study+programı+hakkında+bilgi+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malta Work & Study programı hakkında ücretsiz bilgi al"
                className="inline-flex w-full items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:w-auto"
              >
                Work & Study Programı Bana Uygun mu? Ücretsiz Öğren
              </a>
            </div>
          </div>
        </section>

        {/* Şartlar Section */}
        <section id="sartlar" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study 2026 Şartları
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study programına katılmadan önce bilinmesi gereken eğitim süresi, çalışma izni, çalışma saatleri ve temel kurallar aşağıda net şekilde listelenmiştir. Bu tablo, Malta'da Work & Study sürecinin 2026 yılına ait güncel şartlarını özetler.
            </p>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Kriter
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Malta Work & Study 2026 Şartı
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Açıklama
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Minimum eğitim süresi
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      15 hafta (105 gün)
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Work & Study programı, kısa süreli eğitimlerle başlamaz.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Çalışma izni başlangıcı
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      İlk 90 gün tamamlandıktan sonra
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      İlk 90 gün yalnızca eğitim sürecidir.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Haftalık çalışma süresi
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Maksimum 20 saat
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Part-time çalışma sınırı yasal olarak belirlenmiştir.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Çalışma izni süreci
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      İşveren üzerinden
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Çalışma izni, işveren başvurusu ile yürütülür.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Çalışma izni süresi
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Yaklaşık 4–6 hafta
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Süre, başvuru yoğunluğuna göre değişebilir.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Eğitim devam zorunluluğu
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Evet
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Eğitim devam ederken çalışma mümkündür.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Çalışma şekli
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Part-time
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Full-time çalışma öğrenci statüsünde mümkün değildir.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Ortalama saatlik ücret
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      7–9 €
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Sektöre ve deneyime göre değişebilir.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Aylık ortalama gelir
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      550–750 €
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      20 saat/hafta çalışma baz alınmıştır.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Program amacı
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Eğitim + deneyim
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Programın ana odağı eğitimdir.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Minimum eğitim süresi</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">15 hafta (105 gün)</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Work & Study programı, kısa süreli eğitimlerle başlamaz.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Çalışma izni başlangıcı</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">İlk 90 gün tamamlandıktan sonra</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">İlk 90 gün yalnızca eğitim sürecidir.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Haftalık çalışma süresi</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">Maksimum 20 saat</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Part-time çalışma sınırı yasal olarak belirlenmiştir.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Çalışma izni süreci</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">İşveren üzerinden</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Çalışma izni, işveren başvurusu ile yürütülür.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Çalışma izni süresi</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">Yaklaşık 4–6 hafta</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Süre, başvuru yoğunluğuna göre değişebilir.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Eğitim devam zorunluluğu</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">Evet</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Eğitim devam ederken çalışma mümkündür.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Çalışma şekli</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">Part-time</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Full-time çalışma öğrenci statüsünde mümkün değildir.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Ortalama saatlik ücret</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">7–9 €</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Sektöre ve deneyime göre değişebilir.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Aylık ortalama gelir</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">550–750 €</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">20 saat/hafta çalışma baz alınmıştır.</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">Kriter</div>
                <div className="mb-1 text-sm text-slate-700">Program amacı</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Malta Work & Study 2026 Şartı</div>
                <div className="mb-1 text-sm text-slate-700">Eğitim + deneyim</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">Açıklama</div>
                <div className="text-sm text-slate-700">Programın ana odağı eğitimdir.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Fiyatlar Section */}
        <section id="fiyatlar" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study Fiyatları 2026
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study fiyatları 2026 için eğitim süresi, sezon, ders yoğunluğu, konaklama türü ve okulun fiyat politikasına göre değişir. Aşağıdaki tablo, 15 hafta ve üzeri (Work & Study'e uygun sürelerde) eğitim + konaklama için ortalama aralıkları hızlıca görmeniz içindir.
            </p>

            {/* Tablo Card */}
            <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Süre (Work & Study)
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Eğitim Ücreti (Aralık)
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Konaklama (Aylık Aralık)
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Toplam Ortalama Maliyet
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Not
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        15 Hafta (105 gün)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">2.000 – 2.750 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">450 – 850 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">2.500 – 4.800 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Eğitim toplamı + konaklama (aylık aralık) temelli ortalama
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        16 Hafta
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">2.200 – 3.000 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">450 – 850 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">2.650 – 5.100 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Eğitim toplamı + konaklama (aylık aralık) temelli ortalama
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        24 Hafta (6 Ay)
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">3.100 – 3.800 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">450 – 850 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">3.550 – 7.200 €</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Eğitim toplamı + konaklama (aylık aralık) temelli ortalama
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fiyatlar Neden Değişir? */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 sm:text-2xl">
                Malta Work & Study Fiyatları 2026 Neye Göre Değişir?
              </h3>
              <ol className="space-y-6 list-decimal list-inside">
                <li className="text-base leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Eğitim Süresi (Hafta / Ay)</span>
                  <br />
                  Malta dil okulu fiyatları haftalık ücretler üzerinden hesaplanır. Eğitim süresi uzadıkça toplam tutar artar; ancak hafta sayısı yükseldikçe aylık ortalama maliyet genellikle düşer. Bu yüzden 1 aylık ve 6 aylık eğitimlerin aylık maliyeti aynı değildir.
                </li>
                <li className="text-base leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Sezon (Yaz – Kış – Ara Dönem)</span>
                  <br />
                  Yaz aylarında talep arttığı için Malta dil okulu fiyatları yükselir. Kış ve ara sezonlarda ise aynı eğitim, daha dengeli maliyetlerle sunulabilir. Sezon farkı, toplam maliyeti doğrudan etkileyen temel unsurlardan biridir.
                </li>
                <li className="text-base leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Haftalık Ders Yoğunluğu</span>
                  <br />
                  Standart programlar genellikle 20 ders üzerinden fiyatlanır. 25 veya 30 derslik yoğun programlarda haftalık kurs ücreti artar ve bu artış toplam paket fiyatına yansır. Ders sayısı, Malta dil okulu fiyat hesaplamasında doğrudan belirleyicidir.
                </li>
                <li className="text-base leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Konaklama Türü</span>
                  <br />
                  Paylaşımlı apartmanlar, aile yanı konaklama ve rezidans seçenekleri arasında ciddi fiyat farkları bulunur. Özellikle konaklama tercihi, Malta dil eğitimi fiyatlarını en çok değiştiren kalemlerden biridir. Tek kişilik oda seçenekleri toplam maliyeti daha da artırabilir.
                </li>
                <li className="text-base leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Okulun Fiyat Politikası</span>
                  <br />
                  Malta'daki dil okulları benzer eğitim standartlarına sahip olsa da, sınıf mevcudu, sunulan ek hizmetler ve dönemsel kampanyalar fiyatlara yansıyabilir. Bu nedenle aynı süre ve program için okullar arasında fiyat farkı oluşabilir.
                </li>
                <li className="text-base leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Ek Ücretler ve Paket İçeriği</span>
                  <br />
                  Registrasyon, materyal, havaalanı transferi, sigorta gibi ek kalemler paket içeriğine göre farklılaşabilir. Bu ek ücretler toplam maliyeti doğrudan etkiler.
                </li>
              </ol>
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/malta-dil-okulu-fiyatlari"
                aria-label="Malta dil okulu fiyatları 2026"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Tüm Malta Dil Okulu Fiyatlarını Gör (2026)
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Work+%26+Study+2026+i%C3%A7in+net+fiyat+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malta Work & Study 2026 net fiyat WhatsApp"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Work & Study İçin Net Fiyat Al (WhatsApp)
              </a>
            </div>
          </div>
        </section>

        {/* Çalışarak İngilizce Section */}
        <section id="calisarak-ingilizce" className="bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta'da Çalışarak İngilizce Öğrenmek Mümkün mü? (2026)
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study programında İngilizce gelişimi yalnızca sınıf içinde değil, günlük yaşam ve part-time çalışma ortamında gerçekleşir. 2026 itibarıyla bu sürecin nasıl işlediği ve hangi şartlarda gerçekten fayda sağladığı aşağıda net şekilde açıklanmıştır.
            </p>

            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              {/* Sol Kolon */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                  Çalışarak İngilizce Nasıl Gelişir?
                </h3>
                <p className="text-base leading-relaxed text-slate-700">
                  Günlük iş ortamında zorunlu iletişim, sınıf içinde öğrenilen İngilizcenin pratik edilmesini sağlar. Müşteri, ekip arkadaşları ve yöneticilerle kurulan iletişim; konuşma, dinleme ve kelime dağarcığının doğal şekilde gelişmesine katkı sağlar.
                </p>
                <div className="mt-4">
                  <Image
                    src="/work-and-study/malta-calisarak-ingilizce-ogrenme.webp"
                    alt="Malta Work & Study 2026: Çalışarak İngilizce öğrenme süreci ve iş ortamında dil pratiği"
                    width={480}
                    height={360}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Sağ Kolon - Tablo */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                  İngilizce Gelişimini Etkileyen Faktörler
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Haftada 20 saat çalışma</div>
                      <div className="text-sm text-slate-600">Günlük konuşma pratiği</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">İlk 90 gün eğitim</div>
                      <div className="text-sm text-slate-600">Temel dil altyapısı</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">İş türü (kafe / mağaza)</div>
                      <div className="text-sm text-slate-600">Konuşma ağırlıklı gelişim</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Sınıf + iş dengesi</div>
                      <div className="text-sm text-slate-600">Hızlı adaptasyon</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">İngilizce konuşulan ortam</div>
                      <div className="text-sm text-slate-600">Dinleme becerisi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alt Bilgi Kutusu */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-base leading-relaxed text-slate-700">
                Malta'da çalışarak İngilizce öğrenmek mümkündür; ancak bu gelişim aktif katılım, iletişim kurma isteği ve doğru beklenti ile gerçekleşir.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta'da+çalışarak+İngilizce+öğrenmenin+benim+için+uygun+olup+olmadığını+öğrenmek+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malta'da çalışarak İngilizce öğrenme hakkında bilgi"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Malta'da Çalışarak İngilizce Öğrenmek Bana Uygun mu?
              </a>
            </div>
          </div>
        </section>

        {/* Bütçe Hesaplama Section */}
        <section id="butce-hesaplama" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study Bütçe Hesaplama (2026)
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study programında aylık giderler ve part-time çalışma geliri birlikte değerlendirilmelidir. Aşağıdaki tablo, 2026 yılı için ortalama maliyet ve gelir aralıklarını karşılaştırmalı olarak görmenizi sağlar.
            </p>

            {/* Tablo Card */}
            <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                      Kalem
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                      Aylık Ortalama (2026)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">
                      Dil okul ücreti
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">800–1.200 €</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">
                      Konaklama
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">400–900 €</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">
                      Yaşam giderleri
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">300–600 €</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">
                      Part-time gelir (20 saat / 7–9 €)
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      <span className="font-semibold text-green-700">560–720 €</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Not */}
            <div className="mb-8 text-xs text-slate-600">
              <p>
                Bu tablo ortalama değerler üzerinden hazırlanmıştır. Kişisel harcama alışkanlıkları, okul seçimi ve konaklama türüne göre bütçe dengesi değişebilir.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Work+%26+Study+2026+i%C3%A7in+kendi+b%C3%BCt%C3%A7eme+g%C3%B6re+hesaplama+yapmak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malta Work & Study 2026 bütçe hesaplama"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Kendi Bütçeme Göre Net Hesaplama Yap
              </a>
            </div>
          </div>
        </section>

        {/* Work & Study Karşılaştırma Section */}
        <section id="work-and-study-karsilastirma" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study Diğer Ülkelerle Karşılaştırıldığında (2026)
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study programı, İngilizce konuşulan ülkeler arasında maliyet, vize süreci ve erişilebilirlik açısından öne çıkar. Aşağıdaki karşılaştırma, 2026 yılı için popüler Work & Study ülkelerinin temel farklarını net şekilde göstermektedir.
            </p>

            {/* Tablo Wrapper - Mobil Uyumlu */}
            <div className="mb-6 overflow-x-auto">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Ülke
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Haftalık Çalışma Hakkı
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Dil
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Ortalama Yaşam Maliyeti
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Genel Değerlendirme
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        Malta
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        20 saat
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        İngilizce
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Orta
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Dengeli ve erişilebilir
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        İrlanda
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        20 saat
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        İngilizce
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Yüksek
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Yaşam maliyeti yüksek
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        Kanada
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        20 saat
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        İngilizce
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Çok yüksek
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Vize süreci zor
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        Avustralya
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        20 saat
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        İngilizce
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Çok yüksek
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Uzak ve pahalı
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Not */}
            <div className="mb-8 text-sm text-slate-600">
              <p>
                Malta, 2026 itibarıyla bütçe–erişilebilirlik–İngilizce pratik dengesi açısından Work & Study için öne çıkan ülkelerden biridir.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+hangi+ülke+benim+için+daha+mantıklı+öğrenmek+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hangi ülke benim için daha mantıklı öğren"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Hangi Ülke Benim İçin Daha Mantıklı? Ücretsiz Öğren
              </a>
            </div>
          </div>
        </section>

        {/* Vize ve Resmî Kaynaklar Section */}
        <section id="vize-ve-resmi-kaynaklar" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study Vize Süreci ve Resmî Kaynaklar (2026)
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study programı, öğrenci vizesi ve çalışma izni süreçleri Malta'daki resmî kurumlar tarafından düzenlenir. Aşağıdaki bilgiler, 2026 yılı için geçerli olan güncel uygulamalar ve resmî kaynaklar esas alınarak hazırlanmıştır.
            </p>

            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                Malta Work & Study Vize Süreci Nasıl İlerler?
              </h3>
              <p className="text-base leading-relaxed text-slate-700">
                Malta'da Work & Study programına katılım, öğrenci vizesi ile gerçekleşir. İlk 90 gün yalnızca eğitim odaklıdır. Bu sürenin ardından, yasal çalışma izni süreci başlatılabilir. Tüm adımlar Malta göç ve istihdam kurumlarının belirlediği kurallara tabidir.
              </p>
            </div>

            {/* Resmî Kaynaklar Bilgi Kutusu */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-lg font-semibold text-slate-900">
                Resmî Kaynaklar
              </h4>
              <ul className="space-y-3 text-base text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>
                    <a
                      href="https://identita.gov.mt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-blue-700 hover:underline"
                    >
                      Identity Malta
                    </a>
                    {' '}– Göç ve oturum işlemleri
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>
                    <a
                      href="https://jobsplus.gov.mt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-blue-700 hover:underline"
                    >
                      Jobsplus Malta
                    </a>
                    {' '}– Çalışma izni ve istihdam
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>
                    <a
                      href="https://mfhea.mt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-900 hover:text-blue-700 hover:underline"
                    >
                      MFHEA
                    </a>
                    {' '}– Akredite dil okulları
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="/malta-ogrenci-vizesi"
                aria-label="Malta öğrenci vizesi ve Work & Study süreci 2026"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Malta Öğrenci Vizesi ve Work & Study Süreci (2026)
              </a>
            </div>
          </div>
        </section>

        {/* İş Bulma Rehberi Section */}
        <section id="is-bulma-rehberi" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study Part-Time İş Bulma Rehberi (2026)
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta'da öğrenci olarak part-time iş bulmak, hem gelir elde etmek hem de İngilizce pratiği yapmak için önemli bir adımdır. Aşağıda 2026 yılı için güncel iş bulma yöntemleri ve kaynaklar özetlenmiştir.
            </p>

            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                Malta'da Öğrenciler Nasıl İş Bulur?
              </h3>
              <ul className="space-y-3 text-base text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>Europass CV ile başvuru</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>Online iş ilanları</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>Yerinde başvuru</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">•</span>
                  <span>En yaygın sektörler: kafe, restoran, mağaza, turizm</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                Malta'da İş Bulabileceğiniz Platformlar
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Platform
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                        Açıklama
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        <a
                          href="https://jobsplus.gov.mt/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-900 hover:text-blue-700 hover:underline"
                        >
                          Jobsplus Malta
                        </a>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Resmî iş ve istihdam kurumu
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        Just Landed Malta Jobs
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Yabancılar için iş ilanları
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        Konnekt
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Çok sektörlü ilanlar
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        Manpower Malta
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        Genel iş ilanları
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alt Bilgi Metni */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-base leading-relaxed text-slate-700">
                Malta'da part-time iş bulmak genellikle zor değildir. Esnek olmak ve temel İngilizce iletişim kurabilmek süreci hızlandırır.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Work+%26+Study+i%C5%9F+bulma+s%C3%BCreci+hakk%C4%B1nda+bilgi+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malta Work & Study iş bulma süreci hakkında bilgi"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Malta Work & Study İş Bulma Süreci Hakkında Bilgi Al
              </a>
            </div>
          </div>
        </section>

        {/* Uygunluk Section */}
        <section id="uygunluk" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 sm:text-3xl">
              Malta Work & Study Programı Kimler İçin Uygun? (2026)
            </h2>
            <p className="mb-12 text-base leading-relaxed text-slate-700 sm:text-lg">
              Malta Work & Study programı her öğrenci profili için uygun değildir. Aşağıda programın kimler için mantıklı bir seçenek olduğu, kimler için riskli olabileceği net şekilde karşılaştırmalı olarak gösterilmektedir.
            </p>

            {/* İki Kolonlu Kart Yapısı */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 mb-8">
              {/* Sol Kart - Uygun Olanlar */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-900">
                    Bu Program Kimler İçin Uygun?
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      İlk 3 ay çalışmadan yaşayacak bütçesi olanlar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Part-time çalışma beklentisi olanlar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Eğitim ve dil gelişimini öncelik görenler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      İngilizce seviyesini iş ortamında geliştirmek isteyenler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Esnek çalışma saatlerine uyum sağlayabilenler
                    </span>
                  </li>
                </ul>
              </div>

              {/* Sağ Kart - Uygun Olmayanlar */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900">
                    Kimler İçin Uygun Değil?
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Tüm masraflarını çalışarak karşılamayı planlayanlar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      İlk ayda çalışmayı zorunlu görenler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Full-time çalışma beklentisi olanlar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Eğitimi ikinci planda düşünenler
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600" />
                    <span className="text-sm leading-relaxed text-slate-700">
                      Kısa sürede yüksek gelir hedefleyenler
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Alt Bilgi Kutusu */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-base leading-relaxed text-slate-700">
                Malta Work & Study programı bir çalışma programı değil; eğitim temelli ve sınırlı çalışma izni sunan bir süreçtir. Bu nedenle beklentilerin doğru belirlenmesi büyük önem taşır.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Work+%26+Study+programının+benim+için+uygun+olup+olmadığını+öğrenmek+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Malta Work & Study programı uygunluk değerlendirmesi"
                className="inline-flex w-full items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:w-auto"
              >
                Work & Study Programı Bana Uygun mu? Ücretsiz Öğren
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü */}
        <WorkStudyFAQ />

        {/* Bu İçerik Nasıl Hazırlandı? */}
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
