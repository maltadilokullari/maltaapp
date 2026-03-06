import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSchoolBySlug, schools } from '../../data/schools';
import { MaltaWhatsappCta } from '@/components/MaltaWhatsappCta';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return schools.map((school) => ({
    slug: school.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<import('next').Metadata> {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    return {
      title: 'Okul Bulunamadı',
    };
  }

  return {
    title: `${school.name} Malta Dil Okulu 2026 | Bölge, Program, Fiyatlar`,
    description: `${school.name} hakkında detaylı bilgi. Bölge: ${school.region}, Program temposu: ${school.tempo}, kimler için uygun, konaklama seçenekleri.`,
    alternates: {
      canonical: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
    },
    openGraph: {
      title: `${school.name} Malta Dil Okulu 2026 | Bölge, Program, Fiyatlar`,
      description: `${school.name} hakkında detaylı bilgi. Bölge: ${school.region}, Program temposu: ${school.tempo}.`,
      url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
      siteName: 'Malta Dil Okulu İngilizce',
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `https://maltadilokuluingilizce.com${school.logo}`,
          width: 200,
          height: 48,
          alt: `${school.name} logosu`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${school.name} Malta Dil Okulu 2026`,
      description: `${school.name} hakkında detaylı bilgi. Bölge: ${school.region}, Program temposu: ${school.tempo}.`,
    },
  };
}

export default async function SchoolDetailPage({ params }: Props) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'EducationalOrganization'],
    name: school.name,
    description: school.description,
    image: `https://maltadilokuluingilizce.com${school.logo}`,
    url: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: school.region,
      addressCountry: 'MT',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Malta',
    },
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Anasayfa',
        item: 'https://maltadilokuluingilizce.com/',
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
        name: school.name,
        item: `https://maltadilokuluingilizce.com/malta-dil-okullari/${school.slug}`,
      },
    ],
  };

  // ACE English Malta için özel yapı
  const isACE = slug === 'ace-english-malta';

  // Placeholder değişkenler (ACE için)
  const fiyat_araligi = '{fiyat_araligi}';
  const kime_mantikli_fiyat = '{kime_mantikli_fiyat}';
  const program_listesi = '{program_listesi}';
  const ace_one_cikan_program_1 = '{ace_one_cikan_program_1}';
  const ace_one_cikan_program_2 = '{ace_one_cikan_program_2}';
  const konaklama_tipleri = '{konaklama_tipleri}';
  const aile_yani_kimlere = '{aile_yani_kimlere}';
  const aile_yani_risk = '{aile_yani_risk}';
  const rezidans_kimlere = '{rezidans_kimlere}';
  const rezidans_risk = '{rezidans_risk}';
  const paylasimli_kimlere = '{paylasimli_kimlere}';
  const paylasimli_risk = '{paylasimli_risk}';
  const bolge_artilari = '{bolge_artilari}';
  const bolge_kimlere_uygun = '{bolge_kimlere_uygun}';
  const sinif_mevcudu = '{sinif_mevcudu}';
  const ogretim_tarzi = '{ogretim_tarzi}';
  const ogrenci_tipi = '{ogrenci_tipi}';
  const artilar_1 = '{artilar_1}';
  const artilar_2 = '{artilar_2}';
  const artilar_3 = '{artilar_3}';
  const eksiler_1 = '{eksiler_1}';
  const eksiler_2 = '{eksiler_2}';
  const eksiler_3 = '{eksiler_3}';
  const kritik_uyari = '{kritik_uyari}';
  const akreditasyon_listesi = '{akreditasyon_listesi}';
  const akreditasyon_aciklama = '{akreditasyon_aciklama}';
  const sss_soru_1 = '{sss_soru_1}';
  const sss_cevap_1 = '{sss_cevap_1}';
  const sss_soru_2 = '{sss_soru_2}';
  const sss_cevap_2 = '{sss_cevap_2}';
  const sss_soru_3 = '{sss_soru_3}';
  const sss_cevap_3 = '{sss_cevap_3}';
  const sss_soru_4 = '{sss_soru_4}';
  const sss_cevap_4 = '{sss_cevap_4}';
  const sss_soru_5 = '{sss_soru_5}';
  const sss_cevap_5 = '{sss_cevap_5}';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Anasayfa
              </Link>
              <span className="text-slate-400" aria-hidden="true">
                /
              </span>
              <Link
                href="/malta-dil-okullari"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Malta Dil Okulları
              </Link>
              <span className="text-slate-400" aria-hidden="true">
                /
              </span>
              <span className="text-slate-900 font-medium">{school.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="flex-shrink-0 rounded-2xl bg-slate-50 p-6">
                <Image
                  src={school.logo}
                  alt={`${school.name} dil okulu logosu`}
                  width={200}
                  height={48}
                  className="h-16 w-auto object-contain"
                  priority
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {school.name}
                </h1>
                <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    📍 {school.region}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    ⚡ {school.tempo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Üst CTA - Sadece ACE için */}
        {isACE && (
          <section className="bg-slate-50">
            <div className="mx-auto max-w-6xl px-6 py-6">
              <div className="text-center">
                <a
                  href="https://wa.me/35699143066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-white"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp'tan Okul Seçimini Netleştir
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ACE English Malta için özel kart yapısı */}
        {isACE ? (
          <>
            {/* Hızlı Özet Kartı */}
            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                    Hızlı Özet
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-700 mb-3">
                        Kimler için uygun?
                      </h3>
                      <ul className="space-y-2">
                        {school.suitableFor.map((item, index) => (
                          <li key={index} className="flex gap-2 text-sm text-slate-700">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-red-700 mb-3">
                        Kimler için uygun değil?
                      </h3>
                      <ul className="space-y-2">
                        {school.notSuitableFor.map((item, index) => (
                          <li key={index} className="flex gap-2 text-sm text-slate-700">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      📍 {school.region}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      ⚡ {school.tempo}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      🎯 Modern & Akademik
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Kart Grid - 2 Sütunlu */}
            <section className="bg-slate-50">
              <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* 2026 Fiyat Aralığı */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      2026 Fiyat Aralığı
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700 mb-4">
                      {fiyat_araligi}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-900 mb-2">
                        Fiyatı etkileyen 3 faktör:
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        <li className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                          <span>Program yoğunluğu ve süresi</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                          <span>Konaklama tipi ve lokasyon</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                          <span>Sezon (yaz/yıl içi)</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm text-slate-600">
                      <strong className="text-slate-900">Kime mantıklı:</strong> {kime_mantikli_fiyat}
                    </p>
                  </div>

                  {/* Programlar */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Programlar
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700 mb-4">
                      {program_listesi}
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2">
                        ACE'de öne çıkan 2 program:
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        <li className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                          <span>{ace_one_cikan_program_1}</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                          <span>{ace_one_cikan_program_2}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Konaklama */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Konaklama
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700 mb-4">
                      {konaklama_tipleri}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          Aile yanı:
                        </p>
                        <p className="text-sm text-slate-600">
                          {aile_yani_kimlere} | Risk: {aile_yani_risk}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          Rezidans:
                        </p>
                        <p className="text-sm text-slate-600">
                          {rezidans_kimlere} | Risk: {rezidans_risk}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          Paylaşımlı:
                        </p>
                        <p className="text-sm text-slate-600">
                          {paylasimli_kimlere} | Risk: {paylasimli_risk}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Konum: St. Julian's */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Konum: St. Julian's
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700 mb-4">
                      {bolge_artilari}
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong className="text-slate-900">Kimlere uygun:</strong> {bolge_kimlere_uygun}
                    </p>
                  </div>

                  {/* Sınıf Yapısı & Öğrenci Profili */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Sınıf Yapısı & Öğrenci Profili
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700 mb-4">
                      Sınıf mevcudu: {sinif_mevcudu}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          Öğretim tarzı:
                        </p>
                        <p className="text-sm text-slate-600">{ogretim_tarzi}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          Öğrenci tipi:
                        </p>
                        <p className="text-sm text-slate-600">{ogrenci_tipi}</p>
                      </div>
                    </div>
                  </div>

                  {/* Artılar / Eksiler */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Artılar / Eksiler
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-emerald-700 mb-2">
                          Artılar (3):
                        </p>
                        <ul className="space-y-1.5 text-sm text-slate-600">
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                            <span>{artilar_1}</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                            <span>{artilar_2}</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                            <span>{artilar_3}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-700 mb-2">
                          Eksiler (3):
                        </p>
                        <ul className="space-y-1.5 text-sm text-slate-600">
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                            <span>{eksiler_1}</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                            <span>{eksiler_2}</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                            <span>{eksiler_3}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                      <p className="text-xs font-semibold text-amber-900 mb-1">
                        ⚠️ Kritik uyarı:
                      </p>
                      <p className="text-xs text-amber-800">{kritik_uyari}</p>
                    </div>
                  </div>

                  {/* Akreditasyon & Güven */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Akreditasyon & Güven
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700 mb-4">
                      {akreditasyon_listesi}
                    </p>
                    <p className="text-sm text-slate-600">
                      {akreditasyon_aciklama}
                    </p>
                  </div>

                  {/* ACE SSS */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      ACE SSS
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {sss_soru_1}
                        </p>
                        <p className="text-sm text-slate-600">{sss_cevap_1}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {sss_soru_2}
                        </p>
                        <p className="text-sm text-slate-600">{sss_cevap_2}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {sss_soru_3}
                        </p>
                        <p className="text-sm text-slate-600">{sss_cevap_3}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {sss_soru_4}
                        </p>
                        <p className="text-sm text-slate-600">{sss_cevap_4}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {sss_soru_5}
                        </p>
                        <p className="text-sm text-slate-600">{sss_cevap_5}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Alt CTA */}
            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="text-center">
                  <a
                    href="https://wa.me/35699143066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-white"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp'tan Okul Seçimini Netleştir
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Diğer okullar için eski yapı */}
            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base leading-relaxed text-slate-700">
                    {school.description}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-slate-50">
              <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Kimler için uygun?
                    </h2>
                    <ul className="mt-4 space-y-2">
                      {school.suitableFor.map((item, index) => (
                        <li key={index} className="flex gap-3 text-sm text-slate-700">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Kimler için uygun değil?
                    </h2>
                    <ul className="mt-4 space-y-2">
                      {school.notSuitableFor.map((item, index) => (
                        <li key={index} className="flex gap-3 text-sm text-slate-700">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-red-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-base italic leading-relaxed text-slate-700">
                    {school.summary}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-6 py-8">
                <h2 className="text-2xl font-semibold text-slate-900">
                  {school.region} Bölgesi
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {school.name} Malta'nın {school.region} bölgesinde konumlanmıştır. Bu bölge, öğrenciler için farklı yaşam tarzları ve öğrenme deneyimleri sunar.
                </p>
              </div>
            </section>

            <section className="bg-slate-50">
              <div className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Program Seçenekleri
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {school.name} genel İngilizce, yoğun İngilizce, iş İngilizcesi ve özel programlar sunmaktadır. Program temposu: <strong>{school.tempo}</strong>. Detaylı program bilgileri ve fiyatlar için bizimle iletişime geçin.
                </p>
              </div>
            </section>

            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Konaklama Seçenekleri
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {school.name} öğrencilerine aile yanı, öğrenci yurdu ve paylaşımlı apart daire seçenekleri sunmaktadır. Konaklama seçenekleri, bütçe ve tercihlerinize göre planlanabilir.
                </p>
              </div>
            </section>

            <section className="bg-slate-50">
              <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {school.name} Hakkında Daha Fazla Bilgi
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {school.name} hakkında detaylı bilgi, program seçenekleri, fiyatlar ve konaklama hakkında sorularınız için bizimle iletişime geçin.
                  </p>
                  <MaltaWhatsappCta />
                </div>
              </div>
            </section>
          </>
        )}

        {/* Related Schools */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="text-2xl font-semibold text-slate-900">
              Diğer Malta Dil Okulları
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {schools
                .filter((s) => s.slug !== school.slug)
                .slice(0, 5)
                .map((relatedSchool) => (
                  <Link
                    key={relatedSchool.slug}
                    href={`/malta-dil-okullari/${relatedSchool.slug}`}
                    className="group rounded-lg border border-slate-200 bg-white p-4 text-center transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-center">
                      <Image
                        src={relatedSchool.logo}
                        alt={`${relatedSchool.name} logosu`}
                        width={120}
                        height={32}
                        className="h-8 w-auto object-contain opacity-70 transition group-hover:opacity-100"
                      />
                    </div>
                    <p className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
                      {relatedSchool.name}
                    </p>
                  </Link>
                ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/malta-dil-okullari"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
              >
                Tüm okulları gör
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
