'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { submitForm } from '@/lib/api';

export default function Home() {
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

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://maltadilokuluingilizce.com/#website",
        url: "https://maltadilokuluingilizce.com/",
        name: "Malta Dil Okulu İngilizce",
        description:
          "Malta dil okulları 2026 karşılaştırması. Hangi okul kime uygun, program temposu, bölgeler, fiyatlar ve vize süreci hakkında net rehber.",
        inLanguage: "tr-TR",
        publisher: {
          "@id": "https://maltadilokuluingilizce.com/#organization",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://maltadilokuluingilizce.com/#organization",
        name: "Malta Dil Okulu İngilizce",
        url: "https://maltadilokuluingilizce.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://maltadilokuluingilizce.com/logo-header.png",
          width: 1200,
          height: 630,
        },
        description:
          "Malta dil okulları danışmanlık, başvuru ve kayıt hizmetleri. Malta'da 8 yıldır yaşayan ekibimizle ücretsiz danışmanlık, okul seçimi, vize danışmanlığı ve öğrenci destek hizmetleri sunuyoruz.",
        foundingDate: "2016",
        foundingLocation: {
          "@type": "Place",
          addressCountry: "MT",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Turkey",
            identifier: "TR",
          },
          {
            "@type": "Country",
            name: "Malta",
            identifier: "MT",
          },
        ],
        knowsAbout: [
          "Malta Dil Okulları",
          "Malta Öğrenci Vizesi",
          "Malta Konaklama",
          "Malta Work and Study",
          "İngilizce Dil Eğitimi",
          "Malta Öğrenci Yaşamı",
          "Malta Dil Okulu Başvuru",
          "Malta Dil Okulu Kayıt",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+905439632416",
            contactType: "Customer Service",
            areaServed: {
              "@type": "Country",
              identifier: "TR",
            },
            availableLanguage: ["tr", "en"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+35699143066",
            contactType: "Customer Service",
            areaServed: {
              "@type": "Country",
              identifier: "MT",
            },
            availableLanguage: ["tr", "en"],
          },
          {
            "@type": "ContactPoint",
            email: "bilgi@maltadilokuluingilizce.com",
            contactType: "Customer Service",
            areaServed: [
              {
                "@type": "Country",
                identifier: "TR",
              },
              {
                "@type": "Country",
                identifier: "MT",
              },
            ],
            availableLanguage: ["tr", "en"],
          },
        ],
        sameAs: [],
      },
      {
        "@type": "WebPage",
        "@id": "https://maltadilokuluingilizce.com/#webpage",
        url: "https://maltadilokuluingilizce.com/",
        name: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026",
        description: "Malta dil okulları 2026 güncel karşılaştırması. ESE, EC, IELTS, ACE ve diğer okulların program temposu, bölgeler, fiyatlar ve vize süreci.",
        isPartOf: {
          "@id": "https://maltadilokuluingilizce.com/#website",
        },
        breadcrumb: {
          "@id": "https://maltadilokuluingilizce.com/#breadcrumb",
        },
        mainEntity: {
          "@id": "https://maltadilokuluingilizce.com/#home-article",
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".speakable-home-hero", ".speakable-home-summary"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://maltadilokuluingilizce.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Anasayfa",
            item: "https://maltadilokuluingilizce.com/",
          },
        ],
      },
      {
        "@type": "Article",
        "@id": "https://maltadilokuluingilizce.com/#home-article",
        headline: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi (2026)",
        description: "Malta'da dil okulu seçimi için tarafsız karşılaştırma: programlar, süreç, akreditasyonlar ve karar kriterleri (2026).",
        author: {
          "@id": "https://maltadilokuluingilizce.com/#organization",
        },
        publisher: {
          "@id": "https://maltadilokuluingilizce.com/#organization",
        },
        mainEntityOfPage: {
          "@id": "https://maltadilokuluingilizce.com/#webpage",
        },
        datePublished: datePublished,
        dateModified: dateModified,
      },
      {
        "@type": "FAQPage",
        "@id": "https://maltadilokuluingilizce.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Malta dil okulları kimler için uygundur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Malta dil okulları; konuşma pratiğini geliştirmek isteyen, uluslararası sınıflarda İngilizce öğrenmeyi hedefleyen ve sınıf içi etkileşimle ilerlemek isteyen öğrenciler için uygundur. En iyi sonuç, öğrencinin hedefi ile okulun sınıf yapısı ve program temposu uyumlu olduğunda alınır.",
            },
          },
          {
            "@type": "Question",
            name: "Malta'da dil okulu seçerken en kritik konu nedir?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "En kritik konu, okulun popülerliği değil; öğrencinin öğrenme hedefi, program temposu ve sınıf profiliyle uyumudur. Yanlış tempo veya yanlış sınıf yapısı, verimi ciddi şekilde düşürebilir.",
            },
          },
          {
            "@type": "Question",
            name: "Malta dil okulları kaç hafta sürer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Malta'da dil okullarında minimum eğitim süresi genellikle 1 haftadır. Ancak dil gelişimi ve vize süreci açısından 4–12 hafta ve üzeri programlar daha verimli kabul edilir.",
            },
          },
          {
            "@type": "Question",
            name: "Haftalık ders saati mi, program temposu mu daha önemlidir?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Program temposu, haftalık ders saatinden daha belirleyicidir. Aynı saat sayısına sahip iki programdan biri daha yoğun ve disiplinliyken diğeri daha dengeli olabilir. Öğrenci profiline uygun tempo seçimi, ilerlemeyi doğrudan etkiler.",
            },
          },
          {
            "@type": "Question",
            name: "Malta'da 30 yaş üstü öğrenciler için ayrı sınıf var mı?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bazı Malta dil okulları, 30+ veya 40+ yaş grupları için özel sınıflar ve programlar sunar. Bu programlar daha sakin tempo ve benzer yaş profiliyle ilerler.",
            },
          },
          {
            "@type": "Question",
            name: "Malta'daki dil okulları uluslararası tanınıyor mu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet. Malta'daki dil okulları FELTOM, ALTO, EAQUALS gibi uluslararası akreditasyonlara sahiptir. Alınan sertifikalar birçok ülkede eğitim ve kariyer süreçlerinde geçerlidir.",
            },
          },
          {
            "@type": "Question",
            name: "St. Julian's mı Sliema mı eğitim için daha iyi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "St. Julian's daha sosyal ve hareketli bir ortam sunarken, Sliema daha dengeli ve düzenli yaşam sağlar. Bölge seçimi, öğrencinin motivasyonu ve odaklanmasını doğrudan etkileyebilir.",
            },
          },
          {
            "@type": "Question",
            name: "Malta dil okullarında sınıflar kaç kişilik?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sınıflar genellikle 8–12 kişiliktir. Butik okullarda bu sayı daha düşük olabilir. Küçük sınıflar, konuşma pratiği ve birebir ilgi açısından avantaj sağlar.",
            },
          },
          {
            "@type": "Question",
            name: "Malta dil okullarında 'en iyi okul' var mı?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hayır. Malta'da 'en iyi' okuldan ziyade öğrenciye en uygun okul vardır. Doğru okul; öğrencinin hedefi, yaşı, bütçesi ve öğrenme temposuna göre değişir.",
            },
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": "https://maltadilokuluingilizce.com/#howto",
        name: "Malta'da Dil Eğitimi Süreci Nasıl İlerler?",
        description:
          "Malta'da dil eğitimi yalnızca okul seçimi değildir. Doğru planlama, vize süreci, konaklama ve eğitim boyunca destek gerektirir.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Karar ve Araştırma Aşaması",
            text: "Malta'da dil eğitimi düşünen öğrenciler için ilk adım, hedeflerin ve beklentilerin netleşmesidir. Bu aşamada genel okul ve program yapısı anlaşılır.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Okul ve Program Seçimi",
            text: "Öğrencinin seviyesi, öğrenme temposu ve bütçesine göre Malta'daki uygun dil okulu ve program birlikte belirlenir.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Ön Kayıt ve Kabul Süreci",
            text: "Seçilen okul için kontenjan kontrolü yapılır, ön kayıt süreci başlatılır ve resmi kabul alınır.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Malta Öğrenci Vizesi Süreci",
            text: "Malta öğrenci vizesi için gerekli belgeler hazırlanır, başvuru ve randevu süreci adım adım yönetilir.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Konaklama ve Varış Planlaması",
            text: "Aile yanı, öğrenci yurdu veya apart konaklama seçenekleri planlanır. Malta'ya varış öncesi tüm detaylar netleştirilir.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Malta'ya Varış ve Okula Başlangıç",
            text: "Öğrenci Malta'ya ulaşır, oryantasyon sürecine katılır ve dil eğitimine başlar.",
          },
          {
            "@type": "HowToStep",
            position: 7,
            name: "Eğitim Süresi Boyunca Destek",
            text: "Malta'daki eğitim süresi boyunca öğrencinin ihtiyaç duyabileceği her konuda Türkçe destek ve danışmanlık sağlanır.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="pt-20">
      <section
        className="relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-malta.jpg')" }}
      >

        <div className="relative mx-auto flex max-w-7xl items-center px-4 py-12 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div className="max-w-[560px] rounded-2xl bg-black/40 p-6 text-white backdrop-blur-sm sm:p-8">
                <h1 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight text-white lg:text-4xl xl:text-5xl mb-5">
                  Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026
                </h1>

                <p className="mt-5 text-pretty text-base leading-[1.6] text-white/90 sm:text-lg sm:leading-relaxed speakable-home-hero">
                  Malta dil okulu seçimi, İngilizce eğitimi almak isteyen
                  öğrenciler için en kritik adımdır. Malta'daki okul seçenekleri,
                  program süreleri, güncel fiyatlar ve vize süreci hakkında ön
                  bilgilendirme sunuyoruz.
                </p>

                <ul className="mt-7 space-y-3 text-sm text-white/90 sm:text-base">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/80" />
                    <span>
                      8+ yıldır Malta dil okulları konusunda edindiğimiz saha
                      deneyimi
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/80" />
                    <span>
                      Okul seçimi ve program karşılaştırmaları için ücretsiz ön
                      bilgilendirme
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/80" />
                    <span>
                      Malta öğrenci vizesi süreci için ücretsiz ön destek
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/80" />
                    <span>Malta ve Türkiye'de süreçleri takip eden ekip</span>
                  </li>
                </ul>

                {/* Son Güncelleme Tarihi */}
                <div className="mt-6 text-xs text-white/70 sm:text-sm">
                  <time dateTime={dateModified || new Date().toISOString().split('T')[0]}>
                    Son güncelleme: {lastUpdated || new Date().toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:mt-0" style={{ marginTop: '60px !important' }}>
              <div className="w-full max-w-[420px] rounded-2xl bg-white p-5 shadow-lg shadow-black/10 ring-1 ring-black/5 sm:p-6">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  Ön Bilgilendirme ve Program Seçimi
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Sana en uygun Malta dil okulu ve program seçeneklerini
                  belirlemek için.
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
                      source: 'hero',
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
                      Süre Seçimi (select)
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
                      Ne Zaman? (select)
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

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-balance text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Malta Dil Okullarında Gerçek Öğrenci Deneyimi ve Sertifikalı Eğitim
          </h2>

          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Image
                src="/Malta-dil-okullari.webp"
                alt="Malta’da İngilizce dil eğitimi alan bir öğrencinin eğitim sürecini tamamlayarak sertifikasını alması"
                width={1200}
                height={720}
                className="h-[360px] w-full rounded-2xl object-cover shadow-sm"
                priority={false}
              />
            </div>

            <div className="lg:col-span-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                Neden Bizi Tercih Etmelisiniz?
              </h3>

              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Malta dil okulu seçimi yalnızca okul tercihi değil; eğitim
                kalitesi, program süresi, konaklama ve vize sürecinin birlikte
                doğru yönetilmesini gerektirir. Malta’daki dil okullarını yakından
                tanıyan ekibimizle, öğrencilerin ihtiyaçlarına uygun eğitim
                planlarını şeffaf ve kontrollü şekilde oluşturuyoruz.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-700 sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-900/70" />
                  <span>Malta dil okulları konusunda doğrudan saha deneyimi</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-900/70" />
                  <span>Ön kayıt veya danışmanlık ücreti olmadan bilgilendirme</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-900/70" />
                  <span>Malta ve Türkiye’de aktif olarak hizmet veren ekip</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-900/70" />
                  <span>Malta öğrenci vizesi için profesyonel danışmanlık desteği</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-900/70" />
                  <span>Eğitim süresi boyunca öğrenciye sürekli destek</span>
                </li>
              </ul>

              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Danışmandan Bilgi Al
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="h-full rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-slate-900 ring-1 ring-blue-100">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 9.5L12 5l8 4.5v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21V12h6v9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-4 text-lg font-semibold text-slate-900">
                En İyi Okullar
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Malta dil okulları arasından bölge, bütçe ve eğitim hedefinize
                göre doğru okulu seçmenize yardımcı olur. Program türleri,
                ders yoğunluğu ve başlangıç tarihleri gibi kriterleri tek yerde
                karşılaştırarak karar sürecini sadeleştirir.
              </p>

              <div className="mt-6">
                <Link
                  href="/malta-dil-okullari"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline underline-offset-4"
                >
                  Okulları Gör <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="h-full rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-slate-900 ring-1 ring-amber-100">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 8h12l-1.4 12.3A2 2 0 0 1 14.6 22H9.4a2 2 0 0 1-1.99-1.7L6 8Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12h4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="mt-4 text-lg font-semibold text-slate-900">
                Fiyatlar 2026
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Malta dil okulu fiyatları 2026 döneminde okul, program, süre ve
                sezonlara göre değişir. Güncel fiyat aralıklarını ve paket
                içeriklerini şeffaf şekilde görerek bütçenize uygun seçenekleri
                netleştirebilirsiniz.
              </p>

              <div className="mt-6">
                <Link
                  href="/malta-dil-okulu-fiyatlari"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline underline-offset-4"
                >
                  Fiyatları İncele <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="h-full rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-slate-900 ring-1 ring-emerald-100">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10.5 12 5l8 5.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 22V14.5h5V22"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-4 text-lg font-semibold text-slate-900">
                Konaklama Seçenekleri
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Malta konaklama seçenekleri; yurt, aile yanı ve paylaşımlı ev
                alternatifleriyle farklı bütçe ve yaşam tarzlarına uyum sağlar.
                Lokasyon, ulaşım, oda tipi ve giriş-çıkış tarihlerini planlarken
                en doğru yapıyı seçmenize yardımcı olur.
              </p>

              <div className="mt-6">
                <Link
                  href="/malta-konaklama"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline underline-offset-4"
                >
                  Konaklamayı Gör <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="h-full rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-slate-900 ring-1 ring-violet-100">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 9v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-4 text-lg font-semibold text-slate-900">
                Work &amp; Study
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Malta Work &amp; Study seçeneklerinde eğitim planı, kurs süresi ve
                başvuru koşulları birlikte değerlendirilmelidir. Çalışma ve
                eğitim hedeflerinize göre program alternatiflerini ve süreç
                adımlarını daha net görmenizi sağlar.
              </p>

              <div className="mt-6">
                <Link
                  href="/malta-work-and-study"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline underline-offset-4"
                >
                  Detayları Gör <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Malta Dil Okulu Seçimini Netleştir
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Malta’da dil okulu ararken en kritik konu; doğru okul, doğru
                program ve doğru bütçe dengesidir. Biz bu süreci genel
                bilgilerle değil, Malta’daki okulları sahada tanıyarak
                netleştiriyoruz.
              </p>
              <div className="mt-6">
                <Image
                  src="/malta-ingilizce-dil-egitimi-ogrenci-sinif-deneyimi.webp"
                  alt="Malta'da İngilizce dil eğitimi alan öğrencilerin sınıf deneyimi"
                  width={600}
                  height={400}
                  className="w-full rounded-2xl object-cover shadow-sm"
                  priority={false}
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <h4 className="text-lg font-semibold text-slate-900">
                Sen hangisisin?
              </h4>

              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:bg-slate-50">
                  <div className="text-base font-semibold text-slate-900">
                    İlk kez Malta’ya gideceğim
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Okul seçimi, güvenli başlangıç ve bütçe dengesi
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:bg-slate-50">
                  <div className="text-base font-semibold text-slate-900">
                    İngilizcemi hızlı ilerletmek istiyorum
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Yoğun programlar, seviye hedefi ve okul farkları
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:bg-slate-50">
                  <div className="text-base font-semibold text-slate-900">
                    Uzun süre / Work &amp; Study düşünüyorum
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Çalışma izni, uzun dönem plan ve vize süreci
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Dil+Okulu+seçimi+için+deneyim+odaklı+bir+planlama+istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-neutral-800"
            >
              Deneyimini Planla
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-balance text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Malta Dil Okulları Karşılaştırması: Hangi Okul Kimin İçin Uygun?
          </h2>
          <div className="mt-4 space-y-3 text-center text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              Malta’da dil okulu seçimi; okulun popülerliğinden çok, öğrencinin
              hedefi, öğrenme temposu ve beklentileriyle ilgilidir.
            </p>
            <p>
              Bu bölümde Malta’daki en çok tercih edilen dil okullarını; kimler
              için uygun, kimler için uygun değil başlıklarıyla, sahadaki gerçek
              deneyimlerimize dayanarak karşılaştırıyoruz. Böylece hangi okulun
              size gerçekten uygun olduğunu daha net görebilirsiniz.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/ese-malta.png"
                  alt="ESE Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                ESE Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                ESE Malta, sosyal ortamı güçlü ve dengeli öğrenme temposu arayan
                öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle
                karışık ve pratike dayalıdır; konuşma pratiği doğal şekilde
                sürecin içine girer.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      İlk kez Malta'da dil okuluna gidecek olanlar
                    </li>
                    <li className="list-disc">
                      Konuşma pratiğini önceliklendiren öğrenciler
                    </li>
                    <li className="list-disc">
                      Sosyal ortamdan öğrenme motivasyonu alanlar
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Çok kısa sürede hızlı seviye atlamak isteyenler
                    </li>
                    <li className="list-disc">
                      Yoğun akademik tempo ve baskı arayanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                ESE Malta, Malta'da istikrarlı ve sosyal bir öğrenme deneyimi
                arayan öğrenciler için dengeli bir tercih sunar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/ec-malta.png"
                  alt="EC Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                EC Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                EC Malta, uluslararası bir dil okulu zincirinin Malta'daki
                temsilcisidir. EC Malta, daha sistemli bir yapı ve dengeli öğrenme
                temposu arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı
                genellikle düzenlidir; ders içeriği planlı ilerler ve
                uluslararası öğrenci profili belirgindir.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      İlk kez Malta'da dil okuluna gidecek olanlar
                    </li>
                    <li className="list-disc">
                      Daha kontrollü ve düzenli bir öğrenme ortamı isteyenler
                    </li>
                    <li className="list-disc">
                      Farklı milliyetlerle öğrenmeyi önemseyen öğrenciler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Çok yoğun ve hızlı ilerleme hedefleyenler
                    </li>
                    <li className="list-disc">
                      Daha serbest ve sosyal ağırlıklı bir ortam arayanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                EC Malta, Malta'da dengeli tempo ve yapı arayan öğrenciler için
                güvenli bir başlangıç sunar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/iels-malta.png"
                  alt="IELS Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                IELS Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                IELS Malta, yoğun ders temposu ve hızlı ilerleme hedefi olan
                öğrenciler için öne çıkan bir okuldur. Program yapısı daha
                disiplinlidir; ders temposu yüksektir ve kısa sürede sonuç almak
                isteyenlere yöneliktir.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Kısa sürede maksimum verim almak isteyenler
                    </li>
                    <li className="list-disc">
                      Yoğun ders temposuna uyum sağlayabilen öğrenciler
                    </li>
                    <li className="list-disc">
                      Hızlı seviye ilerlemesini hedefleyenler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha rahat ve sosyal ağırlıklı bir öğrenme deneyimi arayanlar
                    </li>
                    <li className="list-disc">
                      Düşük tempolu, esnek program isteyenler
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                IELS Malta, Malta'da öğrenme hızını ders süresiyle değil, program
                temposuyla artırmak isteyen öğrenciler için güçlü bir seçenektir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/ace-english-malta.png"
                  alt="ACE English Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                ACE English Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                ACE English Malta, modern eğitim yaklaşımı ve tempolu ders yapısıyla
                kısa sürede ilerlemek isteyen öğrenciler için öne çıkan bir okuldur.
                Programlar disiplinlidir; ders içeriği planlı ve hedef odaklı ilerler.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Kısa sürede ilerleme hedefleyen öğrenciler
                    </li>
                    <li className="list-disc">
                      Tempolu ve yapılandırılmış dersleri tercih edenler
                    </li>
                    <li className="list-disc">
                      Daha modern ve akademik odaklı bir öğrenme ortamı isteyenler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha rahat ve sosyal ağırlıklı bir deneyim arayanlar
                    </li>
                    <li className="list-disc">
                      Düşük tempolu, esnek program beklentisi olanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                ACE English Malta, Malta'da yoğun tempolu ve planlı bir eğitim
                süreci arayan öğrenciler için net bir seçenek sunar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/am-language-malta.png"
                  alt="AM Language Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                AM Language Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                AM Language Malta Dil Okulu, daha odaklı bir öğrenme ortamı ve
                dengeli sınıf yapısı arayan öğrenciler için öne çıkan bir okuldur.
                Program yapısı pratike dayalıdır; sınıflar genellikle daha kontrollü
                ilerler ve öğrenme süreci yakından takip edilir.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha sakin ve odaklı bir sınıf ortamı arayanlar
                    </li>
                    <li className="list-disc">
                      Konuşma pratiğini düzenli şekilde geliştirmek isteyenler
                    </li>
                    <li className="list-disc">
                      Küçük ölçekli okul yapısını tercih eden öğrenciler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Çok büyük ve kalabalık okul ortamı bekleyenler
                    </li>
                    <li className="list-disc">
                      Yoğun ve hızlı tempolu program arayanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                AM Language Malta Dil Okulu, Malta'da daha butik ve kontrollü bir
                öğrenme deneyimi arayan öğrenciler için dengeli bir seçenektir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/Clubclass-malta.png"
                  alt="Clubclass Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Clubclass Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Clubclass Malta, daha sakin bir öğrenme ortamı ve dengeli bir tempo
                arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle
                daha düzenlidir; programlar istikrarlı ilerler ve yoğun baskı
                oluşturmaz.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha sakin ve kontrollü bir sınıf ortamı isteyenler
                    </li>
                    <li className="list-disc">
                      Uzun süreli, istikrarlı ilerlemeyi hedefleyen öğrenciler
                    </li>
                    <li className="list-disc">
                      Beklenti–deneyim dengesini önemseyenler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Çok sosyal ve hareketli bir okul ortamı arayanlar
                    </li>
                    <li className="list-disc">
                      Yoğun ve hızlı ilerleme hedefi olanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                Clubclass Malta, Malta'da daha sade bir yapı içinde istikrarlı öğrenme
                arayan öğrenciler için dengeli bir seçenektir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/gateway-malta.png"
                  alt="Gateway Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Gateway Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Gateway Malta Dil Okulu, daha küçük ölçekli ve sakin bir okul yapısı
                arayan öğrenciler için öne çıkan bir okuldur. Sınıf ortamı genellikle
                daha sessizdir; öğrenme süreci bireysel odaklı ve dengeli ilerler.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha sakin ve düşük yoğunluklu bir öğrenme ortamı isteyenler
                    </li>
                    <li className="list-disc">
                      Kalabalık ve çok sosyal okul yapılarından hoşlanmayan öğrenciler
                    </li>
                    <li className="list-disc">
                      Daha bireysel bir sınıf deneyimi arayanlar
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Hareketli ve sosyal ağırlıklı bir okul ortamı arayanlar
                    </li>
                    <li className="list-disc">
                      Yoğun tempolu ve hızlı ilerleme hedefleyenler
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                Gateway Malta Dil Okulu, Malta'da daha sade ve sakin bir öğrenme
                deneyimi arayan öğrenciler için istikrarlı bir alternatif sunar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/inlingua-malta.png"
                  alt="inlingua Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Inlingua Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                inlingua Malta, daha akademik ve yapılandırılmış bir öğrenme yaklaşımı
                arayan öğrenciler için öne çıkan bir okuldur. Ders içerikleri sistematik
                ilerler; sınıf ortamı genellikle daha kontrollü ve odaklıdır.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha akademik ve planlı bir öğrenme süreci isteyenler
                    </li>
                    <li className="list-disc">
                      Dil bilgisini yapılandırarak ilerlemeyi tercih eden öğrenciler
                    </li>
                    <li className="list-disc">
                      Daha sakin ve disiplinli sınıf ortamını önemseyenler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Sosyal ağırlıklı ve serbest bir okul deneyimi arayanlar
                    </li>
                    <li className="list-disc">
                      Yoğun ama esnek olmayan programlardan çabuk sıkılanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                inlingua Malta Dil Okulu, Malta'da daha sistemli ve disiplinli bir dil
                eğitimi arayan öğrenciler için odaklı bir alternatiftir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/atlas-logo.webp"
                  alt="Atlas Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Atlas Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Atlas Malta Dil Okulu, daha küçük ölçekli, düzenli ve sakin bir öğrenme
                ortamı arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı
                genellikle kontrollüdür; öğrenme süreci istikrarlı ilerler ve bireysel
                takip ön plandadır.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha sakin ve odaklı bir sınıf ortamı isteyenler
                    </li>
                    <li className="list-disc">
                      Küçük ölçekli okul yapısını tercih eden öğrenciler
                    </li>
                    <li className="list-disc">
                      Düzenli ve istikrarlı ilerlemeyi önemseyenler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Çok sosyal ve hareketli okul ortamı arayanlar
                    </li>
                    <li className="list-disc">
                      Yoğun ve hızlı ilerleme beklentisi olanlar
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                Atlas Malta Dil Okulu, Malta'da daha sade ve kontrollü bir yapı içinde
                istikrarlı öğrenme arayan öğrenciler için dengeli bir alternatiftir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex items-center justify-center rounded-md bg-slate-50 p-4">
                <Image
                  src="/malta-dil-okullari-karsilastirma/belsmalta.png"
                  alt="BELS Malta dil okulu logosu"
                  width={200}
                  height={48}
                  className="h-12 object-contain"
                  priority={false}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                BELS Malta Dil Okulu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                BELS Malta Dil Okulu, daha küçük sınıflar ve sakin bir öğrenme ortamı
                arayan öğrenciler için öne çıkan butik bir dil okuludur. Eğitim yaklaşımı
                bireysel takibe dayanır; sınıf ortamı genellikle sessiz ve odaklıdır.
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Daha sakin ve düşük yoğunluklu bir öğrenme ortamı isteyenler
                    </li>
                    <li className="list-disc">
                      Küçük sınıflarda birebir ilgi bekleyen öğrenciler
                    </li>
                    <li className="list-disc">
                      Sosyal ortamdan çok öğrenmeye odaklanmak isteyenler
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Kimler için uygun değil?
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-5 text-sm text-slate-600">
                    <li className="list-disc">
                      Büyük ve hareketli okul ortamı arayanlar
                    </li>
                    <li className="list-disc">
                      Yoğun ve hızlı ilerleme hedefleyenler
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                BELS Malta Dil Okulu, Malta'da daha butik ve bireysel bir dil eğitimi
                deneyimi arayan öğrenciler için net bir alternatif sunar.
              </p>
            </div>
          </div>
          {/* Sonraki adım: diğer okulların (varsa) eklenmesi ve filtre/karşılaştırma tablosu */}
        </div>
      </section>

      {/* Akreditasyonlar */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Uluslararası Akreditasyonlara Sahip Malta Dil Okulları
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Malta'daki dil okulları, uluslararası standartlarda eğitim kalitesi ve güvenilirlik sağlayan akreditasyonlara sahiptir.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            <div className="flex items-center justify-center">
              <img
                src="/akreditasyonlar/accr_colour_feltom.svg"
                alt="FELTOM akreditasyonu Malta dil okulu"
                className="h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/akreditasyonlar/accr_colour_eaquals.svg"
                alt="EAQUALS akreditasyonu Malta dil okulu"
                className="h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/akreditasyonlar/accr_colour_elt.svg"
                alt="ELT akreditasyonu Malta dil okulu"
                className="h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/akreditasyonlar/accr_colour_ialc.svg"
                alt="IALC akreditasyonu Malta dil okulu"
                className="h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/akreditasyonlar/accr_colour_msa.svg"
                alt="MSA akreditasyonu Malta dil okulu"
                className="h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/akreditasyonlar/accr_colour_cen-1.svg"
                alt="CEN akreditasyonu Malta dil okulu"
                className="h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700">
                  Kararsız kalanlar için
                </div>

                <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Malta Dil Okulu Seçimini Netleştir
                </h2>

                <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600">
                  Okul türü, öğrenme temposu ve bütçene göre Malta’daki en doğru
                  dil okulunu birlikte netleştirelim. Genel bilgilerle değil,
                  sahadaki gerçek deneyimle.
                </p>
              </div>

              <div className="flex w-full flex-col items-center md:w-auto md:items-end">
                <a
                  href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-zinc-900 md:w-auto"
                >
                  Seçimi Netleştir
                </a>

                <div className="mt-3 text-center md:text-right">
                  <div className="text-sm font-medium text-slate-600">
                    Ya da hemen ara:
                  </div>
                  <a
                    href="tel:+905439632416"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-slate-600 hover:text-black"
                  >
                    +90 543 963 24 16
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Malta İngilizce Eğitim Programları (2026) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Malta İngilizce Eğitim Programları (2026)
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-slate-600">
              Malta dil okullarında sunulan İngilizce programlarıyla hedefinize göre eğitim alın. Uluslararası akreditasyona sahip kurslarla İngilizcenizi geliştirin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Genel İngilizce Kursları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-genel-ingilizce-kursu.webp"
                  alt="Malta genel ingilizce kursu"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Genel İngilizce Kursları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Temel dil becerilerini dengeli bir şekilde geliştirmek isteyenler için ideal program.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Temel seviye ve pratik</div>
                    <div className="text-sm text-slate-700">Dengeli ilerlemek isteyenler</div>
                  </div>
                </div>
              </div>
            </div>

            {/* İş ve Ticari İngilizce Kursları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-is-ingilizcesi-kursu.webp"
                  alt="Malta iş ingilizcesi kursları"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  İş ve Ticari İngilizce Kursları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Kariyer hedeflerine yönelik profesyonel İngilizce eğitimi almak isteyenler için.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Kariyer hedefi olanlar</div>
                    <div className="text-sm text-slate-700">Sunum ve iletişim geliştirmek</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yoğun İngilizce Kursları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-yogun-ingilizce-kursu.webp"
                  alt="Malta yoğun ingilizce kursu"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Yoğun İngilizce Kursları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Hızlı ilerleme hedefleyen ve yüksek tempolu eğitim isteyen öğrenciler için.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Hızlı ilerlemek isteyenler</div>
                    <div className="text-sm text-slate-700">Yüksek tempoya uygunlar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gençler için İngilizce Kursları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-gencler-icin-ingilizce-kursu.webp"
                  alt="Malta gençler için ingilizce kursları"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Gençler için İngilizce Kursları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Sosyal öğrenme ve aktiviteli programlar arayan genç öğrenciler için tasarlanmış.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Sosyal öğrenmeyi sevenler</div>
                    <div className="text-sm text-slate-700">Aktiviteli program isteyenler</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 50 Yaş ve Üzeri İngilizce Kursları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-50-yas-uzeri-ingilizce-kursu.webp"
                  alt="Malta 50 yaş üzeri ingilizce kursları"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  50 Yaş ve Üzeri İngilizce Kursları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Daha sakin tempo ve kültürel deneyim odaklı eğitim arayan yetişkinler için.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Daha sakin tempo isteyenler</div>
                    <div className="text-sm text-slate-700">Kültürel deneyim odaklılar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Çocuklar için İngilizce Kursları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-cocuklar-icin-ingilizce-kursu.webp"
                  alt="Malta çocuklar için ingilizce kursları"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Çocuklar için İngilizce Kursları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Güvenli kamp ortamında eğitim almak isteyen 8-15 yaş arası öğrenciler için.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">8–15 yaş öğrenciler</div>
                    <div className="text-sm text-slate-700">Güvenli kamp ortamı</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yaz Okulu İngilizce Programları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-yaz-okulu-ingilizce-programi.webp"
                  alt="Malta yaz okulu ingilizce programları"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Yaz Okulu İngilizce Programları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Yaz döneminde tatil ve eğitimi birleştirmek isteyen öğrenciler için ideal.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Yaz dönemi planlayanlar</div>
                    <div className="text-sm text-slate-700">Tatil + eğitim isteyenler</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Erasmus Staj Programları */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-erasmus-staj-programi.webp"
                  alt="Malta Erasmus staj programları"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Erasmus Staj Programları
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Staj ve dil eğitimini birleştirerek Avrupa deneyimi kazanmak isteyenler için.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Staj + dil isteyenler</div>
                    <div className="text-sm text-slate-700">Avrupa deneyimi hedefleyenler</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work and Study Programı */}
            <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/programlar/malta-work-and-study-programi.webp"
                  alt="Malta work and study programı"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Work and Study Programı
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Uzun dönem eğitim ve çalışma planı yapmak isteyen öğrenciler için uygun.
                </p>
                <div className="mt-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Kimler için?
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="text-sm text-slate-700">Uzun dönem düşünenler</div>
                    <div className="text-sm text-slate-700">Çalışma planı isteyenler</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Malta'da Dil Eğitimi Süreci Nasıl İlerler? */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Malta'da Dil Eğitimi Süreci Nasıl İlerler? (2026)
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-slate-600">
              Malta'da dil eğitimi yalnızca okul seçimi değildir. Doğru planlama, vize süreci, konaklama ve eğitim boyunca destek gerektirir. Bu süreci adım adım ve şeffaf şekilde yönetiyoruz.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. Karar ve Araştırma Aşaması */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-dil-egitimi-karar-arastirma.webp"
                  alt="Malta dil eğitimi karar ve araştırma aşaması"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  1. Karar ve Araştırma Aşaması
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Malta'da dil eğitimi düşünen öğrenciler için ilk adım, hedeflerin ve beklentilerin netleşmesidir. Bu aşamada genel okul ve program yapısı anlaşılır.
                </p>
              </div>
            </div>

            {/* 2. Okul ve Program Seçimi */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-dil-okulu-program-secimi.webp"
                  alt="Malta dil okulu program seçimi"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  2. Okul ve Program Seçimi
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Öğrencinin seviyesi, öğrenme temposu ve bütçesine göre Malta'daki uygun dil okulu ve program birlikte belirlenir.
                </p>
              </div>
            </div>

            {/* 3. Ön Kayıt ve Kabul Süreci */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-dil-okulu-on-kayit-kabul.webp"
                  alt="Malta dil okulu ön kayıt ve kabul süreci"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  3. Ön Kayıt ve Kabul Süreci
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Seçilen okul için kontenjan kontrolü yapılır, ön kayıt süreci başlatılır ve resmi kabul alınır.
                </p>
              </div>
            </div>

            {/* 4. Malta Öğrenci Vizesi Süreci */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-ogrenci-vizesi-sureci.webp"
                  alt="Malta öğrenci vizesi süreci"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  4. Malta Öğrenci Vizesi Süreci
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Malta öğrenci vizesi için gerekli belgeler hazırlanır, başvuru ve randevu süreci adım adım yönetilir.{' '}
                  <Link href="/malta-ogrenci-vizesi" className="font-semibold text-slate-900 hover:underline">
                    Malta öğrenci vizesi başvuru süreci ve gerekli belgeler
                  </Link>{' '}
                  hakkında detaylı bilgiye sayfamızdan ulaşabilirsin.
                </p>
              </div>
            </div>

            {/* 5. Konaklama ve Varış Planlaması */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-konaklama-ve-varis-planlamasi.webp"
                  alt="Malta konaklama ve varış planlaması"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  5. Konaklama ve Varış Planlaması
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Aile yanı, öğrenci yurdu veya apart konaklama seçenekleri planlanır. Malta'ya varış öncesi tüm detaylar netleştirilir.
                </p>
              </div>
            </div>

            {/* 6. Malta'ya Varış ve Okula Başlangıç */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-varis-okula-baslangic.webp"
                  alt="Malta'ya varış ve okula başlangıç"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  6. Malta'ya Varış ve Okula Başlangıç
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Öğrenci Malta'ya ulaşır, oryantasyon sürecine katılır ve dil eğitimine başlar.
                </p>
              </div>
            </div>

            {/* 7. Eğitim Süresi Boyunca Destek */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-[320px]">
                <Image
                  src="/surec/malta-egitim-suresince-destek.webp"
                  alt="Malta eğitim süresi boyunca destek"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  7. Eğitim Süresi Boyunca Destek
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  Malta'daki eğitim süresi boyunca öğrencinin ihtiyaç duyabileceği her konuda Türkçe destek ve danışmanlık sağlanır.
                </p>
              </div>
            </div>
          </div>

          {/* Biz Neredeyiz? Vurgusu */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-semibold text-slate-900">
              Bu Sürecin Neresindeyiz?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Okul seçiminden vize sürecine, Malta'ya varıştan eğitim süresi boyunca desteğe kadar tüm adımlarda öğrencinin yanındayız. Amacımız satış yapmak değil, süreci net ve güvenli şekilde yönetmektir.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:brightness-110 active:brightness-95"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp'tan Süreci Anlatalım
            </a>
          </div>
        </div>
      </section>

      {/* Malta Dil Okulu Seçerken En Sık Yapılan Yanlış Tercihler */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Malta Dil Okulu Seçerken En Sık Yapılan Yanlış Tercihler (2026)
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-slate-600">
              Bu hatalar çoğu zaman bilgi eksikliğinden değil, yanlış yönlendirmelerden kaynaklanır.
              Malta'daki dil okullarını sahada tanıdıkça en sık karşılaştığımız noktaları burada paylaşıyoruz.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Sol: Görsel */}
            <div className="lg:col-span-5">
              <div className="relative h-[320px] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/surec/malta-dil-okulu-yanlis-tercihler.webp"
                  alt="Malta dil okulu seçerken yapılan yaygın yanlış tercihler hakkında danışmanlık görüşmesi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover opacity-95"
                />
              </div>
            </div>

            {/* Sağ: İçerik */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {/* Madde 1 */}
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                      <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Popüler okul herkes için doğru olmayabilir
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">
                      Yoğun ve sosyal ortamlar bazı öğrenciler için keyifli olsa da, öğrenme hızını düşürebilir.
                    </p>
                  </div>
                </div>

                {/* Madde 2 */}
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                      <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Program temposu doğru değerlendirilmez
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">
                      Yoğun programlar kısa vadede cazip görünür; ancak herkes için sürdürülebilir değildir.
                    </p>
                  </div>
                </div>

                {/* Madde 3 */}
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                      <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Yaş ve sınıf profili göz ardı edilir
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">
                      Sınıf yaş ortalaması ve öğrenci profili, motivasyon ve verim üzerinde doğrudan etkilidir.
                    </p>
                  </div>
                </div>

                {/* Madde 4 */}
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                      <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Konum, eğitim kalitesiyle karıştırılır
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">
                      Merkezi lokasyon yaşamı kolaylaştırır; ancak eğitim kalitesini tek başına belirlemez.
                    </p>
                  </div>
                </div>

                {/* Madde 5 */}
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200">
                      <div className="h-2 w-2 rounded-full bg-slate-400"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Konaklama okulun bir parçası sanılır
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-slate-600">
                      Konaklama deneyimi çoğu zaman okuldan bağımsızdır ve doğru planlama gerektirir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kapanış Cümlesi */}
              <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-base leading-relaxed text-slate-700">
                  Malta'da doğru dil okulu seçimi, hangi okulu seçeceğinizden çok, hangi okulun sizin için uygun olmadığını bilmekle başlar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Malta'daki Dil Okulları 2026: Kime Uygun, Nerede, Hangi Tempoda? */}
      <section id="hizli-karsilastirma" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Malta'daki Dil Okulları 2026: Kime Uygun, Nerede, Hangi Tempoda?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-slate-600 speakable-home-summary">
              Bu tablo, Malta'daki dil okullarını popülerliğe göre değil; öğrenci profili, eğitim temposu ve bulunduğu bölgeye göre hızlıca karşılaştırmanız için hazırlanmıştır.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                    Okul
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                    Kime Uygun
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                    Program Temposu
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-900">
                    Bölge
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/ese-malta.png"
                          alt="ESE Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">ESE Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Sosyal + dengeli öğrenme isteyenler
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">St. Julian's</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/ec-malta.png"
                          alt="EC Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">EC Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    İlk kez Malta'ya gidenler
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">St. Julian's</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/iels-malta.png"
                          alt="IELS Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">IELS Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Hızlı ilerlemek isteyenler
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Yoğun</td>
                  <td className="px-4 py-4 text-sm text-slate-700">Sliema</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/ace-english-malta.png"
                          alt="ACE Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">ACE Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Modern yapı + tempolu eğitim
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Orta-yoğun</td>
                  <td className="px-4 py-4 text-sm text-slate-700">St. Julian's</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/am-language-malta.png"
                          alt="AM Language logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">AM Language</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Daha odaklı sınıf ortamı arayanlar
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">Sliema</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/inlingua-malta.png"
                          alt="inlingua Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">inlingua Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Daha sakin + düzenli ilerleme
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">Sliema</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/atlas-logo.webp"
                          alt="Atlas Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">Atlas Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Butik okul isteyenler
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">Pembroke</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/Clubclass-malta.png"
                          alt="Clubclass Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">Clubclass Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Uygun bütçe + temel eğitim
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">Swieqi</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/gateway-malta.png"
                          alt="Gateway Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">Gateway Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Daha ekonomik ve sakin bir ortam arayanlar
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">San Gwann</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-auto flex-shrink-0">
                        <Image
                          src="/malta-dil-okullari-karsilastirma/belsmalta.png"
                          alt="BELS Malta logo"
                          width={32}
                          height={32}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">BELS Malta</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    Butik + düşük kalabalık isteyenler
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">Dengeli</td>
                  <td className="px-4 py-4 text-sm text-slate-700">St. Paul's / Gozo</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/ese-malta.png"
                    alt="ESE Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">ESE Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Sosyal + dengeli öğrenme isteyenler</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">St. Julian's</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/ec-malta.png"
                    alt="EC Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">EC Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">İlk kez Malta'ya gidenler</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">St. Julian's</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/iels-malta.png"
                    alt="IELTS Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">IELS Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Hızlı ilerlemek isteyenler</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Yoğun</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">Sliema</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/ace-english-malta.png"
                    alt="ACE Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">ACE Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Modern yapı + tempolu eğitim</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Orta-yoğun</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">St. Julian's</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/am-language-malta.png"
                    alt="AM Language logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">AM Language</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Daha odaklı sınıf ortamı arayanlar</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">Sliema</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/inlingua-malta.png"
                    alt="inlingua Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">inlingua Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Daha sakin + düzenli ilerleme</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">Sliema</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/atlas-logo.webp"
                    alt="Atlas Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">Atlas Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Butik okul isteyenler</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">Pembroke</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/Clubclass-malta.png"
                    alt="Clubclass Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">Clubclass Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Uygun bütçe + temel eğitim</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">Swieqi</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/gateway-malta.png"
                    alt="Gateway Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">Gateway Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Daha ekonomik ve sakin bir ortam arayanlar</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">San Gwann</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative h-8 w-auto flex-shrink-0">
                  <Image
                    src="/malta-dil-okullari-karsilastirma/belsmalta.png"
                    alt="BELS Malta logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">BELS Malta</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Kime Uygun: </span>
                  <span className="text-slate-700">Butik + düşük kalabalık isteyenler</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Program Temposu: </span>
                  <span className="text-slate-700">Dengeli</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Bölge: </span>
                  <span className="text-slate-700">St. Paul's / Gozo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Malta Dil Okulları Hakkında En Çok Merak Edilenler */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Malta Dil Okulları Hakkında Merak Edilenler
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Malta dil okulu seçimiyle ilgili en sık sorulan soruları; okul yapısı, program temposu, süre, yaş grupları ve bölge farklarıyla net şekilde yanıtladık.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta dil okulları kimler için uygundur?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                <strong>Malta dil okulları</strong>; konuşma pratiğini geliştirmek isteyen, uluslararası sınıflarda İngilizce öğrenmeyi hedefleyen ve sınıf içi etkileşimle ilerlemek isteyen öğrenciler için uygundur. En iyi sonuç, öğrencinin hedefi ile okulun <strong>sınıf yapısı</strong> ve <strong>program temposu</strong> uyumlu olduğunda alınır.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta'da dil okulu seçerken en kritik konu nedir?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                En kritik konu, okulun popülerliği değil; öğrencinin <strong>öğrenme hedefi</strong>, <strong>program temposu</strong> ve <strong>sınıf profiliyle</strong> uyumudur. Yanlış tempo veya yanlış sınıf yapısı, verimi ciddi şekilde düşürebilir.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta dil okulları kaç hafta sürer? Minimum süre nedir?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Malta'da dil okullarında <strong>minimum eğitim süresi</strong> genellikle 1 haftadır. Ancak dil gelişimi ve <strong>vize süreci</strong> açısından 4–12 hafta ve üzeri programlar daha verimli kabul edilir.
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Haftalık ders saati mi, program temposu mu daha önemlidir?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                <strong>Program temposu</strong>, haftalık ders saatinden daha belirleyicidir. Aynı saat sayısına sahip iki programdan biri daha yoğun ve disiplinliyken diğeri daha dengeli olabilir. Öğrenci profiline uygun <strong>tempo seçimi</strong>, ilerlemeyi doğrudan etkiler.
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta'da 30 yaş üstü öğrenciler için ayrı sınıflar var mı?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Bazı <strong>Malta dil okulları</strong>, 30+ veya 40+ yaş grupları için özel sınıflar ve programlar sunar. Bu programlar daha sakin tempo ve benzer yaş profiliyle ilerler.
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta dil okulları uluslararası geçerliliğe sahip mi?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Evet. Malta'daki dil okulları <strong>FELTOM</strong>, <strong>ALTO</strong>, <strong>EAQUALS</strong> gibi uluslararası akreditasyonlara sahiptir. Alınan sertifikalar birçok ülkede eğitim ve kariyer süreçlerinde geçerlidir.
              </div>
            </details>

            {/* FAQ 7 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                St. Julian's mı, Sliema mı? Bölge seçimi eğitimi etkiler mi?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Evet, etkiler.
                <ul className="mt-3 ml-4 list-disc space-y-2 text-slate-700">
                  <li><strong>St. Julian's</strong>: Daha sosyal ve hareketli bir ortam</li>
                  <li><strong>Sliema</strong>: Daha dengeli ve düzenli yaşam</li>
                </ul>
                <p className="mt-3">Bölge seçimi, öğrencinin motivasyonu ve odaklanmasını doğrudan etkileyebilir.</p>
              </div>
            </details>

            {/* FAQ 8 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta dil okullarında sınıflar kaç kişiliktir?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Sınıflar genellikle <strong>8–12 kişiliktir</strong>. Butik okullarda bu sayı daha düşük olabilir. Küçük sınıflar, konuşma pratiği ve birebir ilgi açısından avantaj sağlar.
              </div>
            </details>

            {/* FAQ 9 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta dil okullarında ders düzeni ve materyaller nasıldır?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Dersler genellikle sabah veya öğleden sonra yapılır. <strong>Uluslararası yayınlar</strong> kullanılır ve dersler konuşma, dinleme, yazma ve okuma becerilerini dengeli şekilde geliştirecek biçimde planlanır.
              </div>
            </details>

            {/* FAQ 10 */}
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                Malta'da "en iyi dil okulu" diye tek bir okul var mı?
              </summary>
              <div className="mt-4 text-base leading-relaxed text-slate-700">
                Hayır. Malta'da "en iyi" okuldan ziyade öğrenciye <strong>en uygun okul</strong> vardır. Doğru okul; öğrencinin hedefi, yaşı, bütçesi ve öğrenme temposuna göre değişir.
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
