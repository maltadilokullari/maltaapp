'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactFAQ from './components/ContactFAQ';
import { submitForm } from '@/lib/api';

export default function IletisimPage() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateModified, setDateModified] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  // Structured Data - @graph yapısı (SEO odaklı)
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://maltadilokuluingilizce.com/#website',
        url: 'https://maltadilokuluingilizce.com',
        name: 'Malta Dil Okulu İngilizce',
        description:
          'Malta dil okulları 2026 karşılaştırması, başvuru süreci, fiyatlar ve vize danışmanlığı. Hangi okul kime uygun, program temposu, bölgeler ve öğrenci deneyimleri.',
        inLanguage: ['tr', 'en'],
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://maltadilokuluingilizce.com/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
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
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Malta Dil Okulu Danışmanlık Hizmetleri',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Malta Dil Okulu Başvuru ve Kayıt Danışmanlığı',
                description: 'Malta dil okulu seçimi, başvuru süreci ve kayıt işlemleri için ücretsiz danışmanlık hizmeti.',
                provider: {
                  '@id': 'https://maltadilokuluingilizce.com/#organization',
                },
                areaServed: ['TR', 'MT'],
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Malta Öğrenci Vizesi Danışmanlığı',
                description: 'Malta öğrenci vizesi başvuru süreci, gerekli belgeler ve vize danışmanlığı hizmeti.',
                provider: {
                  '@id': 'https://maltadilokuluingilizce.com/#organization',
                },
                areaServed: ['TR', 'MT'],
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Malta Konaklama Planlama',
                description: 'Malta\'da öğrenci konaklama seçenekleri, aile yanı, öğrenci evi ve yurt planlaması.',
                provider: {
                  '@id': 'https://maltadilokuluingilizce.com/#organization',
                },
                areaServed: ['TR', 'MT'],
              },
            },
          ],
        },
      },
      {
        '@type': 'ContactPage',
        '@id': 'https://maltadilokuluingilizce.com/iletisim/#contactpage',
        url: 'https://maltadilokuluingilizce.com/iletisim',
        name: 'İletişim | Malta Dil Okulları',
        description:
          'Malta dil okulları başvuru, kayıt ve danışmanlık için iletişim sayfası. Türkiye ve Malta ofislerimizden bize ulaşın, ücretsiz danışmanlık alın.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        about: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        datePublished: datePublished,
        dateModified: dateModified,
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        inLanguage: ['tr', 'en'],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2'],
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://maltadilokuluingilizce.com/#localbusiness-turkiye',
        name: 'Malta Dil Okulu İngilizce - Türkiye Ofisi',
        description:
          'Malta dil okulları danışmanlık, başvuru ve kayıt hizmetleri. Türkiye\'den Malta dil okulu başvuru ve danışmanlık için iletişime geçin.',
        url: 'https://maltadilokuluingilizce.com/iletisim',
        telephone: '+905439632416',
        email: 'bilgi@maltadilokuluingilizce.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'TR',
        },
        areaServed: {
          '@type': 'Country',
          identifier: 'TR',
        },
        parentOrganization: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        availableLanguage: ['tr', 'en'],
        priceRange: 'Ücretsiz Danışmanlık',
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://maltadilokuluingilizce.com/#localbusiness-malta',
        name: 'Malta Dil Okulu İngilizce - Malta Ofisi',
        description:
          'Malta dil okulları danışmanlık, başvuru ve kayıt hizmetleri. Malta\'da yerel ekibimizle birebir iletişim ve destek.',
        url: 'https://maltadilokuluingilizce.com/iletisim',
        telephone: '+35699143066',
        email: 'bilgi@maltadilokuluingilizce.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'MT',
        },
        areaServed: {
          '@type': 'Country',
          identifier: 'MT',
        },
        parentOrganization: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        hasMap: 'https://share.google/uN3rk6Xx7xqHkVBch',
        availableLanguage: ['tr', 'en'],
        priceRange: 'Ücretsiz Danışmanlık',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/iletisim/#breadcrumb',
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
            name: 'Malta Dil Okulları İletişim',
            item: 'https://maltadilokuluingilizce.com/iletisim',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/iletisim/#faqpage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Malta dil okulu hakkında nasıl daha detaylı bilgi alabilirim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta dil okullarıyla ilgili süreç bilgisi, okul önerileri, fiyatlar ve program karşılaştırmaları için bizimle form üzerinden iletişime geçebilir veya WhatsApp/telefonla hızlıca yazabilirsiniz. Ücretsiz danışmanlık ekibimiz size birebir geri dönüş sağlar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu hakkında telefonla veya e-postayla iletişim kurabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Türkiye ve Malta ofislerimiz üzerinden hızlı şekilde ulaşabilirsiniz: Türkiye: +90 543 963 24 16, Malta: +356 99 14 30 66, E-posta: bilgi@maltadilokuluingilizce.com. Bu kanallar başvuru, kayıt, vize ve konaklama gibi tüm sorularınız için aktiftir.',
            },
          },
          {
            '@type': 'Question',
            name: 'Başvuru ve kayıt sürecinde hangi konularda destek alabilirim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Formu doldurduktan veya yazdıktan sonra okul başvuru işlemleri, program/okul seçimi, fiyat ve bütçe bilgisi, vize başvurusu ve konaklama planlama süreçlerinde profesyonel yönlendirme alırsınız.',
            },
          },
          {
            '@type': 'Question',
            name: "Malta'da eğitim almak için gerekli belgeler nelerdir?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Genel olarak Malta öğrenci vizesi için kabul mektubu, pasaport, sağlık ve seyahat sigortası, finansal yeterlilik belgeleri, konaklama rezervasyonu ve uçuş bilgileri gereklidir. Bu belgelerle ilgili eksiksiz listeyi danışmanlık sürecinde adım adım iletiriz.",
            },
          },
          {
            '@type': 'Question',
            name: 'Ücretsiz bilgi/danışmanlık ne kadar sürer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Genellikle form veya WhatsApp üzerinden bize ulaştıktan sonra 24–48 saat içinde dönüş sağlıyoruz. Acil durumlarda WhatsApp üzerinden daha hızlı iletişim imkanı vardır.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu fiyatları ve program seçenekleri hakkında bilgi alabilir miyim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Fiyatlar okul türüne, program süresine ve ders yoğunluğuna göre değişir. 2026 yılı için Malta dil okulu fiyatlarını ve uygun programları size özel plan dahilinde danışmanlıkla netleştiriyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta dil okulu ile ilgili gerçek öğrenci değerlendirmeleri ve okul deneyimleri var mı?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Malta dil okulları ile ilgili akreditasyon, sınıf yapısı ve öğrenci deneyimleri hakkında danışmanlık sürecinde detaylı bilgi alabilirsiniz.',
            },
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': 'https://maltadilokuluingilizce.com/iletisim/#service',
        name: 'Malta Dil Okulu Danışmanlık Hizmetleri',
        description:
          'Malta dil okulu başvuru, kayıt, vize danışmanlığı, konaklama planlama ve öğrenci destek hizmetleri. Ücretsiz danışmanlık ile size en uygun okul ve program seçimini yapıyoruz.',
        provider: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
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
        serviceType: 'Educational Consulting',
        category: 'Language School Consulting',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TRY',
          availability: 'https://schema.org/InStock',
          description: 'Ücretsiz danışmanlık hizmeti',
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data - @graph yapısı (SEO odaklı) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
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
                <Link href="/iletisim" className="hover:text-slate-900 hover:underline">
                  Malta Dil Okulları İletişim
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            {/* Sol Kolon - Metin + CTA */}
            <div className="order-2 lg:order-1">
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                İletişim | Malta Dil Okulları
              </h1>
              
              <h2 className="mb-6 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                2026 döneminde Malta dil okulu başvuru ve kayıt sürecini doğru yerden başlatın.
              </h2>

              <div className="space-y-4 text-base leading-relaxed text-slate-700 mb-6">
                <p>
                  Malta dil okullarıyla ilgili iletişime geçmek isteyen birçok öğrenci aynı soruyla geliyor: 'Nereden başlayacağım?'
                  Bu sayfa tam olarak bunun için hazırlandı.
                </p>

                <p>
                  Malta dil okulu danışmanlığı kapsamında; hangi okulun size uygun olduğunu, kaç hafta kalmanız gerektiğini ve başvuru/kayıt sürecinin nasıl ilerleyeceğini netleştiriyoruz.
                  Kısa bir form doldurmanız yeterli — ardından size uygun seçenekleri hızlıca anlatıp 2026 planınızı birlikte başlatıyoruz.
                </p>

                <p>
                  Bu iletişim formu bir "genel mesaj kutusu" değil; Malta dil okulu başvurusu için ilk adım.
                  Ne kadar süre eğitim almak istediğinizi ve ne zaman başlamayı düşündüğünüzü yazın, biz de size en doğru yönlendirmeyi yapalım.
                </p>
              </div>

              {/* Güven Satırı */}
              <div className="mb-8 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  Danışmanlık, okul yönlendirmesi ve süreç bilgilendirmesi ücretsizdir.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+905439632416"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Ücretsiz Danışmanlık Al
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Malta%20dil%20okulu%20hakkında%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white bg-[#25D366] transition-colors duration-200 hover:bg-[#20BA5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp'tan Yaz
                </a>
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

            {/* Sağ Kolon - Form */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="w-full rounded-2xl bg-white p-5 shadow-lg shadow-black/10 ring-1 ring-black/5 sm:p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Malta Dil Okulları Ücretsiz Bilgi Formu
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Başvuru ve kayıt sürecini başlatmak için birkaç bilgi yeterli.
                </p>

            <form
              className="mt-5 space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormSubmitting(true);
                setFormMessage(null);

                const formData = new FormData(e.currentTarget);
                const result = await submitForm({
                  fullName: formData.get('fullName') as string,
                  phone: formData.get('phone') as string,
                  email: formData.get('email') as string,
                  duration: formData.get('duration') as string || undefined,
                  when: formData.get('when') as string || undefined,
                  source: 'contact-page',
                  privacyAccepted: formData.get('privacyAccepted') === 'on',
                  kvkkRead: formData.get('kvkkRead') === 'on',
                });

                setFormSubmitting(false);
                if (result.success) {
                  setFormMessage({ type: 'success', text: 'Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' });
                  (e.target as HTMLFormElement).reset();
                } else {
                  setFormMessage({ type: 'error', text: result.message || 'Form gönderilirken bir hata oluştu.' });
                }
              }}
            >

              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-slate-900"
                >
                  Adınız Soyadınız *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  placeholder="Ad Soyad"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-900"
                >
                  Telefon Numaranız *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  placeholder="05xx xxx xx xx"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-900"
                >
                  E-posta Adresiniz *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  placeholder="ornek@eposta.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="duration"
                  className="text-sm font-medium text-slate-900"
                >
                  Süre Seçimi
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seçiniz
                  </option>
                  <option value="2-4-hafta">2-4 Hafta</option>
                  <option value="5-8-hafta">5-8 Hafta</option>
                  <option value="9-12-hafta">9-12 Hafta</option>
                  <option value="13-24-hafta">13-24 Hafta</option>
                  <option value="25-hafta-ve-uzeri">25 Hafta ve Üzeri</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="when"
                  className="text-sm font-medium text-slate-900"
                >
                  Ne Zaman?
                </label>
                <select
                  id="when"
                  name="when"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seçiniz
                  </option>
                  <option value="hemen">Hemen</option>
                  <option value="1-3-ay">1-3 Ay İçinde</option>
                  <option value="3-6-ay">3-6 Ay İçinde</option>
                  <option value="6-ay-ve-uzeri">6 Ay ve Üzeri</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm text-slate-700">
                    Gizlilik hükümlerini kabul ediyorum
                  </span>
                </label>

                <label className="mt-3 flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="kvkkRead"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm text-slate-700">
                    KVKK aydınlatma metnini okudum
                  </span>
                </label>

                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  Bilgileriniz KVKK kapsamında güvenle işlenir.
                </p>
              </div>

              {formMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  formMessage.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {formMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={formSubmitting}
                className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-lg bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formSubmitting ? 'Gönderiliyor...' : 'Ön Bilgilendirme Al'}
              </button>
            </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Görsel */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/malta-dil-okullari-iletisim.webp"
              alt="Malta dil okulları iletişim"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Hangi Konuda İletişime Geçmek İstiyorsunuz? */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-center">
            Hangi konuda iletişime geçmek istiyorsunuz?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Link
              href="/malta-dil-okullari"
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="mb-3 text-lg font-semibold text-slate-900 group-hover:text-slate-950">
                Malta Dil Okulu Başvuru ve Kayıt İşlemleri
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Malta'da dil eğitimi almak isteyen öğrenciler için okul seçimi, başvuru süreci ve kayıt işlemlerini adım adım anlatıyoruz. 2026 dönemine yönelik başvuru şartları ve süreç detaylarını inceleyebilirsiniz.
              </p>
            </Link>

            <Link
              href="/malta-dil-okulu-fiyatlari"
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="mb-3 text-lg font-semibold text-slate-900 group-hover:text-slate-950">
                Malta Dil Okulu Fiyatları ve Program Seçenekleri
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Malta dil okulu fiyatları; okul türüne, program yoğunluğuna ve eğitim süresine göre değişir. Güncel fiyatlar, program seçenekleri ve toplam maliyet hesaplamasını bu sayfada bulabilirsiniz.
              </p>
            </Link>

            <Link
              href="/malta-ogrenci-vizesi"
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="mb-3 text-lg font-semibold text-slate-900 group-hover:text-slate-950">
                Malta Öğrenci Vizesi ve Gerekli Belgeler
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Malta dil okulu başvurusu için gerekli vize türleri, başvuru süreci ve hazırlanması gereken belgeler hakkında detaylı bilgiye buradan ulaşabilirsiniz.
              </p>
            </Link>
          </div>

          <p className="text-center text-sm leading-relaxed text-slate-600">
            Yukarıdaki konulardan birini seçerek detaylı bilgi alabilir veya Malta dil okulu başvuru ve kayıt süreci için aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      {/* Kimlere Hizmet Veriyoruz? */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-center">
            Kimlere Hizmet Veriyoruz?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
              <svg className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900">Bireysel öğrenciler</h3>
                <p className="text-sm text-slate-600 mt-1">Kişisel hedeflerinize uygun program seçimi</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
              <svg className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900">Aileler</h3>
                <p className="text-sm text-slate-600 mt-1">Aile programları ve grup seçenekleri</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
              <svg className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900">Çocuk & Genç Programları</h3>
                <p className="text-sm text-slate-600 mt-1">Junior / Teen programları için özel danışmanlık</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
              <svg className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900">Üniversite öğrencileri & yeni mezunlar</h3>
                <p className="text-sm text-slate-600 mt-1">Kariyer planlaması ve dil gelişimi</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
              <svg className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900">Kurumsal firmalar & profesyoneller</h3>
                <p className="text-sm text-slate-600 mt-1">Kurumsal eğitim programları</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
              <svg className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900">2026 eğitim planı yapanlar</h3>
                <p className="text-sm text-slate-600 mt-1">Erken planlama ve rezervasyon desteği</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bize Ulaştığınızda Süreç Nasıl İlerliyor? */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-center">
            Bize Ulaştığınızda Süreç Nasıl İlerliyor?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white text-xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Formu Doldurun</h3>
              <p className="text-sm text-slate-600">
                İletişim formunu doldurarak temel bilgilerinizi paylaşın. Ne kadar süre eğitim almak istediğinizi ve ne zaman başlamayı planladığınızı belirtin.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white text-xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Size Uygun Seçenekleri Anlatalım</h3>
              <p className="text-sm text-slate-600">
                Bilgilerinizi değerlendirerek size en uygun okul, program ve konaklama seçeneklerini detaylı şekilde anlatıyoruz.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white text-xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Birlikte Başlatalım</h3>
              <p className="text-sm text-slate-600">
                Kararınızı verdikten sonra başvuru ve kayıt sürecini birlikte yürütüyor, her adımda yanınızda oluyoruz.
              </p>
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-white border border-slate-200">
            <p className="text-sm font-semibold text-slate-900">
              Bilgilendirme ve danışmanlık ücretsizdir.
            </p>
          </div>
        </div>
      </section>

      {/* Malta Dil Okulları İletişim Bilgileri */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-center">
            Malta Dil Okulları İletişim Bilgileri
          </h2>
          
          <p className="mb-8 text-center text-base leading-relaxed text-slate-700">
            Malta dil okulu başvuru ve kayıt süreciyle ilgili bizimle hızlıca iletişime geçebilirsiniz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col text-center p-6 rounded-lg bg-slate-50 border border-slate-200 h-full">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Malta Dil Okulları Türkiye İletişim
              </h3>
              <a
                href="tel:+905439632416"
                className="mb-2 text-xl font-semibold text-slate-900 hover:text-slate-700 transition-colors"
              >
                +90 543 963 24 16
              </a>
              <p className="text-xs text-slate-600 mt-auto">
                Türkiye'den Malta dil okulu başvuru ve danışmanlık için
              </p>
            </div>

            <div className="flex flex-col text-center p-6 rounded-lg bg-slate-50 border border-slate-200 h-full">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Malta Dil Okulları Malta Ofisi
              </h3>
              <a
                href="tel:+35699143066"
                className="mb-2 text-xl font-semibold text-slate-900 hover:text-slate-700 transition-colors"
              >
                +356 99 14 30 66
              </a>
              <p className="text-xs text-slate-600 mt-auto">
                Malta'da yerel ekibimizle birebir iletişim
              </p>
            </div>

            <div className="flex flex-col text-center p-6 rounded-lg bg-slate-50 border border-slate-200 h-full">
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Malta Dil Okulları E-posta
              </h3>
              <a
                href="mailto:bilgi@maltadilokuluingilizce.com"
                className="mb-2 text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors break-all"
              >
                bilgi@maltadilokuluingilizce.com
              </a>
              <p className="text-xs text-slate-600 mt-auto">
                Kayıt, vize ve program detayları için
              </p>
            </div>
          </div>

          <p className="text-center text-sm leading-relaxed text-slate-600">
            Malta dil okullarıyla ilgili başvuru, kayıt ve danışmanlık süreci için Türkiye ve Malta ofislerimizden bize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Sık Sorulan Sorular */}
      <ContactFAQ />

      {/* Ofis & Temsilciliklerimiz */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-center">
            Ofis & Temsilciliklerimiz
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Malta Ofisi</h3>
              <div className="w-full h-[400px] rounded-lg overflow-hidden border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.1234567890123!2d14.5123!3d35.8997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDUzJzU5LjAiTiAxNMKwMzAnNDQuMyJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str&z=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Malta Ofisi"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Türkiye Ofisi</h3>
              <div className="w-full h-[400px] rounded-lg overflow-hidden border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.1234567890123!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str&z=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Türkiye Ofisi"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600 max-w-2xl mx-auto">
            Malta ve Türkiye ofislerimizden hizmet veriyoruz. Malta'da yaşayan ekibimizle yerinde destek sağlıyor, Türkiye'den de danışmanlık hizmeti sunuyoruz.
          </p>
        </div>
      </section>
    </main>
    </>
  );
}
