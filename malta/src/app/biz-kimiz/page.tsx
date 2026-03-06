'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './components/FAQ';

export default function BizKimizPage() {
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

  // Structured Data - @graph yapısı (E-E-A-T odaklı)
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
        '@type': 'AboutPage',
        '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#aboutpage',
        url: 'https://maltadilokuluingilizce.com/biz-kimiz',
        name: 'Biz Kimiz? | Malta Dil Okulu İngilizce',
        description:
          'Malta\'da 8 yıldır yaşayan, dil okullarında eğitim almış ve öğrenci danışmanlığı konusunda deneyimli ekibimiz hakkında bilgi. Malta dil okulu seçimi, konaklama, vize ve öğrenci destek hizmetlerimiz.',
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        about: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        datePublished: datePublished,
        dateModified: dateModified,
        publisher: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        inLanguage: 'tr-TR',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#webpage',
        url: 'https://maltadilokuluingilizce.com/biz-kimiz',
        name: 'Biz Kimiz? | Malta Dil Okulu İngilizce',
        description:
          'Malta dil okulları hakkında güncel bilgiler, karşılaştırmalar ve rehberler sunan ekibimiz hakkında bilgi edinin.',
        isPartOf: {
          '@id': 'https://maltadilokuluingilizce.com/#website',
        },
        breadcrumb: {
          '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#breadcrumb',
        },
        mainEntity: {
          '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#aboutpage',
        },
        datePublished: datePublished,
        dateModified: dateModified,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#breadcrumb',
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
            name: 'Biz Kimiz?',
            item: 'https://maltadilokuluingilizce.com/biz-kimiz',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#faqpage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Danışmanlık hizmetiniz gerçekten ücretsiz mi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Okul seçimi, konaklama planlaması ve vize danışmanlığı için herhangi bir ücret almıyoruz. Süreci en baştan şeffaf şekilde anlatıyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sadece okul kaydı mı yapıyorsunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Malta\'ya varıştan eğitimin bitişine ve Türkiye\'ye dönüşe kadar öğrencilerimizin yanında oluyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Malta\'ya geldikten sonra destek alabiliyor muyum?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Malta\'da yaşayan ekibimizle eğitim süresi boyunca destek sağlıyoruz ve acil durumlarda müdahale ediyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Her öğrenciye aynı okulu mu öneriyorsunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Okul önerilerimizi öğrencinin hedefi, bütçesi ve beklentisine göre kişisel olarak yapıyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Vize sürecinde yalnız mı ilerliyorum?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hayır. Vize sürecindeki tüm adımları birlikte ilerliyor, öğrenciyi yalnız bırakmıyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Transfer ve ilk günlerde destek sağlıyor musunuz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evet. Ücretsiz havalimanı transferi ve ilk gün destek hizmeti sunuyoruz.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sizin farkınız nedir?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Malta\'da 8 yıldır yaşayan bir ekip olarak süreci uzaktan değil, yerinde yönetiyoruz.',
            },
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#service',
        name: 'Malta Dil Okulu Danışmanlık Hizmeti',
        description:
          'Malta dil okulu seçimi, konaklama planlaması, vize danışmanlığı ve öğrenci destek hizmetleri. Ücretsiz danışmanlık ve Malta\'da yerinde destek.',
        provider: {
          '@id': 'https://maltadilokuluingilizce.com/#organization',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Turkey',
        },
        serviceType: 'Educational Consulting',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TRY',
          description: 'Ücretsiz danışmanlık hizmeti',
        },
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
                  <Link href="/biz-kimiz" className="hover:text-slate-900 hover:underline">
                    Biz Kimiz?
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Two Column Hero: Mobile-first (content top, image bottom), Desktop (image left, content right) */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Sol Kolon - Görsel (Mobilde altta, Desktop'ta solda) */}
              <div className="order-2 lg:order-1">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/biz-kimiz-hero.webp"
                    alt="malta dil okulları danışmanlık ekibi"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Sağ Kolon - İçerik (Mobilde üstte, Desktop'ta sağda) */}
              <div className="order-1 lg:order-2">
                <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Biz Kimiz?
                </h1>

                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta'ya gelmeden önce kafanızın karışık olduğunu biliyoruz.
                    <br />
                    Hangi okul? Nerede kalırım? Vize çıkar mı? Yalnız kalır mıyım?
                  </p>

                  <p>
                    Çünkü <strong className="font-semibold text-slate-900">biz de bu soruları sorduk</strong>.
                  </p>

                  <p>
                    Malta'da <strong className="font-semibold text-slate-900">8 yıldır yaşıyoruz</strong>. Öğrenci olduk, dil okullarında eğitim aldık, Erasmus Stajı ve staj programlarında yer aldık. Bu süreci sadece anlatmadık, <strong className="font-semibold text-slate-900">birebir yaşadık</strong>.
                  </p>

                  <p>
                    Bugün okul, vize, konaklama ve transfer sürecinizi uzaktan yönlendiren bir acenta değil; <strong className="font-semibold text-slate-900">Malta'da yaşayan</strong> ve sizin adınıza süreci takip eden <strong className="font-semibold text-slate-900">gerçek bir ekip</strong> olarak yanınızdayız.
                  </p>

                  <p>
                    <strong className="font-semibold text-slate-900">Malta'ya indiğiniz andan Türkiye'ye dönüşünüze kadar</strong> bu süreci <strong className="font-semibold text-slate-900">birlikte yürütüyoruz</strong>.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Malta%20dil%20okulu%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Ücretsiz Danışmanlık Al
                  </a>
                  <Link
                    href="/#hizmetler"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-slate-900 bg-white border-2 border-slate-300 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Hizmetlerimizi İncele
                  </Link>
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
            </div>
          </div>
        </section>

        {/* Biz Ne Yapıyoruz Section */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:py-24">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Biz ne yapıyoruz?
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>
                Malta'ya gelmeden önce <strong className="font-semibold text-slate-900">okulunuzu ve konaklamanızı ücretsiz planlıyoruz</strong>.
                Vize sürecinde evraklardan başvuru adımlarına kadar <strong className="font-semibold text-slate-900">ücretsiz vize danışmanlığı</strong> veriyoruz.
              </p>

              <p>
                Malta'ya geldiğinizde sizi karşılıyor, <strong className="font-semibold text-slate-900">ücretsiz transferinizi</strong> sağlıyoruz.
                Eğitim süreci boyunca (başlangıçtan bitişe kadar) <strong className="font-semibold text-slate-900">Malta'daki ekibimizle yanınızda oluyoruz</strong>; bir sorun çıktığında <strong className="font-semibold text-slate-900">acil destek ekibimiz</strong> devreye giriyor.
              </p>

              <p>
                Malta'da nerede ne yenir, nereler gezilir, hangi aktiviteler var…
                Bunların hepsinde de size rehberlik ediyoruz.
                Çünkü <strong className="font-semibold text-slate-900">Malta'yı 8 yıldır yaşıyoruz</strong> ve <strong className="font-semibold text-slate-900">Malta–Türkiye ekip yapımızla</strong> süreci <strong className="font-semibold text-slate-900">profesyonel şekilde</strong> yürütüyoruz.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Malta%20dil%20okulu%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg hover:shadow-xl"
              >
                Ücretsiz Bilgi Al
              </a>
            </div>
          </div>
        </section>

        {/* Hizmet Bölümleri */}
        
        {/* BÖLÜM 1: Malta Dil Okulları - Sol Görsel, Sağ Metin */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-dil-okullari.webp"
                    alt="malta dil okulları"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta Dil Okullarını Birlikte Seçiyoruz
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta'da çok sayıda dil okulu var ve internetten bakınca hepsi iyi görünüyor.
                    Ama iş pratiğe geldiğinde; <strong className="font-semibold text-slate-900">okulun öğrenci profili, sınıf yapısı, öğretmen kalitesi ve bulunduğu bölge</strong> çok fark yaratıyor.
                  </p>
                  <p>
                    Biz okulları <strong className="font-semibold text-slate-900">katalogdan değil, içeriden tanıyoruz</strong>.
                    Hangi okul kime uygundur, hangisi sadece reklamda iyidir, bunları açık açık anlatıyoruz.
                  </p>
                  <p>
                    Öğrenciyi en pahalıya ya da en ucuz olana yönlendirmiyoruz.
                    <strong className="font-semibold text-slate-900"> Gerçekten ihtiyacına uyan okulu bulmaya</strong> çalışıyoruz.
                    Ve bunu <strong className="font-semibold text-slate-900">ücretsiz</strong> yapıyoruz.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/malta-dil-okullari"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Malta Dil Okulları Hakkında Bilgi Al
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 2: Malta Dil Okulu Fiyatları - Sağ Görsel, Sol Metin */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta Dil Okulu Fiyatlarını Şeffaf Anlatıyoruz
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Öğrencilerin en çok zorlandığı konu fiyatlar.
                    Çünkü çoğu zaman sadece okul ücreti söyleniyor, sonra masraf masraf ekleniyor.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">Biz bu şekilde çalışmıyoruz</strong>.
                  </p>
                  <p>
                    Malta dil okulu fiyatlarını anlatırken; okul ücreti, konaklama, kayıt bedelleri, dönemsel kampanyalar ve <strong className="font-semibold text-slate-900">toplam maliyeti en baştan</strong> konuşuyoruz.
                  </p>
                  <p>
                    Sonradan "bunu da ödeyeceksiniz" denmesini istemiyoruz.
                    <strong className="font-semibold text-slate-900"> Öğrenci, bütçesini net bilerek karar versin</strong> istiyoruz.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/malta-dil-okulu-fiyatlari"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Güncel Malta Dil Okulu Fiyatlarını Gör
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-dil-okulu-fiyatlari.webp"
                    alt="malta dil okulu fiyatları"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 3: Konaklama - Sol Görsel, Sağ Metin */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-ogrenci-konaklama.webp"
                    alt="malta öğrenci konaklama"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta'da Nerede ve Nasıl Kalacağınızı Birlikte Planlıyoruz
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta'da konaklama seçimi, <strong className="font-semibold text-slate-900">eğitimden bile daha önemli olabilir</strong>.
                    Yanlış bölgede kalmak, her gün yolu dert etmek ya da kendini rahat hissetmemek süreci zorlaştırır.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">Bu yüzden konaklama konusunu geçiştirmiyoruz</strong>.
                  </p>
                  <p>
                    Aile yanı, öğrenci evi ve yurt seçeneklerini; alışkanlıklarınıza, beklentinize ve bütçenize göre tek tek anlatıyoruz.
                  </p>
                  <p>
                    Sadece "boş var" diye değil, <strong className="font-semibold text-slate-900">orası sizin için gerçekten uygun mu diye</strong> bakıyoruz.
                    Ve bu planlamayı <strong className="font-semibold text-slate-900">ücretsiz</strong> yapıyoruz.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Malta Konaklama Seçeneklerini İncele
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 4: Vize - Sağ Görsel, Sol Metin */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta Öğrenci Vizesi Sürecinde Yanınızdayız
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Vize süreci çoğu öğrenci için streslidir.
                    "Bir şey eksik mi yaptım?", "Red gelir mi?" soruları hep akıldadır.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">Biz bu süreci öğrencinin omzuna bırakmıyoruz</strong>.
                  </p>
                  <p>
                    Hangi evraklar gerekli, ne zaman başvurulmalı, nelere dikkat edilmeli…
                    <strong className="font-semibold text-slate-900"> Tüm adımları sakin ve net şekilde anlatıyoruz</strong> ve <strong className="font-semibold text-slate-900">süreci birlikte takip ediyoruz</strong>.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">Vize danışmanlığımız ücretsiz</strong>.
                    Çünkü bu sürecin zaten yeterince zor olduğunu biliyoruz.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/malta-ogrenci-vizesi"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Malta Öğrenci Vizesi Hakkında Bilgi Al
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-ogrenci-vizesi.webp"
                    alt="malta öğrenci vizesi"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 5: Work and Study - Sol Görsel, Sağ Metin */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-work-and-study.webp"
                    alt="malta work and study"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta Work and Study Konusunu Olduğu Gibi Anlatıyoruz
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta'da eğitim alırken çalışmak mümkün.
                    Ama <strong className="font-semibold text-slate-900">bu sistem her öğrenci için uygun değil</strong> ve çoğu zaman yanlış anlatılıyor.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">Biz Work and Study konusunu süslemiyoruz</strong>.
                  </p>
                  <p>
                    Kimler çalışabilir, hangi aşamadan sonra çalışılır, ne kadar kazanılır, ne beklenmemeli…
                    <strong className="font-semibold text-slate-900"> Hepsini gerçekçi şekilde</strong> anlatıyoruz.
                  </p>
                  <p>
                    Amacımız öğrenciyi heveslendirmek değil, <strong className="font-semibold text-slate-900">doğru beklentiyle gelmesini sağlamak</strong>.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/malta-work-and-study"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Malta Work and Study Detaylarını Gör
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 6: Transfer - Sağ Görsel, Sol Metin */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta'ya Geldiğinizde Sizi Karşılıyoruz
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Yeni bir ülkeye ilk kez gelmek kolay bir şey değil.
                    Havalimanı, yol, konaklama… Hepsi üst üste gelir.
                  </p>
                  <p>
                    Bu yüzden Malta'ya vardığınızda sizi karşılıyoruz.
                    <strong className="font-semibold text-slate-900"> Ücretsiz havalimanı transferinizi</strong> sağlıyor, <strong className="font-semibold text-slate-900">konaklamanıza ulaştığınızdan emin oluyoruz</strong>.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">İlk günlerde yalnız kalmamanız</strong> bizim için önemli.
                    Çünkü <strong className="font-semibold text-slate-900">o ilk gün, her şeyi belirliyor</strong>.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Transfer ve Karşılama Detaylarını Gör
                  </a>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-havalimani-transfer.webp"
                    alt="malta havalimanı transfer"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 7: Malta'da Yaşam - Sol Görsel, Sağ Metin */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src="/malta-hizmetler/malta-ogrenci-yasami.webp"
                    alt="malta öğrenci yaşamı"
                    width={480}
                    height={360}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Malta'da Sadece Okula Gitmezsiniz
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Malta'da eğitim, sınıfla sınırlı değil.
                    <strong className="font-semibold text-slate-900"> Günlük yaşam, sosyal hayat ve ortam da sürecin bir parçası</strong>.
                  </p>
                  <p>
                    Malta'da nerede ne yenir, hangi bölgeler daha yaşanabilir, boş zamanlarda neler yapılır…
                    Bunları öğrencilerimize anlatıyoruz.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-900">Çünkü Malta'yı 8 yıldır yaşıyoruz</strong> ve <strong className="font-semibold text-slate-900">burayı gerçekten biliyoruz</strong>.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  >
                    Malta'da Öğrenci Yaşamını Keşfet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Malta Dil Okulu Danışmanlığı
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-700 max-w-2xl mx-auto">
                Malta'da hangi okulun size uygun olduğunu netleştirmek istiyorsanız, bunu tek başınıza yapmak zorunda değilsiniz.
                Deneyimimizi kullanarak doğru okulu, doğru bütçeyle ve doğru beklentiyle planlamak için ücretsiz bilgi alabilirsiniz.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+905439632416"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white bg-slate-900 transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg hover:shadow-xl"
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
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white bg-[#25D366] transition-colors duration-200 hover:bg-[#20BA5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] shadow-lg hover:shadow-xl"
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
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>
    </>
  );
}
