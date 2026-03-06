'use client';

import Link from 'next/link';
import Image from 'next/image';

const yazOkullari = [
  { id: 'ese-malta-yaz-okulu', name: 'ESE Malta Yaz Okulu – Junior & Teen Programları' },
  { id: 'ec-malta-yaz-okulu', name: 'EC Malta Yaz Okulu – Young Learners Programları' },
  { id: 'bels-malta-yaz-okulu', name: 'BELS Malta Yaz Okulu – Junior Camp Programı' },
  { id: 'iels-malta-yaz-okulu', name: 'IELS Malta Yaz Okulu – Young Learners (13–17) Programları' },
  { id: 'gateway-malta-yaz-okulu', name: 'Gateway Malta Yaz Okulu – Junior Teens English Programme' },
  { id: 'ace-english-malta-yaz-okulu', name: 'ACE English Malta Yaz Okulu – Junior Summer Programme' },
  { id: 'am-language-studio-malta-yaz-okulu', name: 'AM Language Studio Malta Yaz Okulu – Kids & Teen Programları' },
  { id: 'inlingua-malta-yaz-okulu', name: 'Inlingua Malta Yaz Okulu – Junior & Aile Programları' },
  { id: 'clubclass-malta-yaz-okulu', name: 'Clubclass Malta Yaz Okulu – Junior / Teen Programları' },
];

const sections = [
  {
    category: 'Yaz Okulu Bilgileri',
    items: [
      { name: 'Malta Yaz Okulları Nedir? Kimler İçin Uygundur?', id: 'yaz-okulu-nedir' },
      { name: 'Malta Yaz Okulları Paketine Neler Dahil?', id: 'pakete-dahil' },
      { name: 'Malta Yaz Okulları 2026 – Program Sunan Okullar', id: 'program-sunan-okullar' },
    ],
  },
  {
    category: 'Program Detayları',
    items: [
      { name: 'Malta Yaz Okullarında Günlük Program Nasıldır?', id: 'gunluk-program' },
      { name: 'Malta Yaz Okullarında Aktiviteler ve Geziler', id: 'aktiviteler-geziler' },
      { name: 'Malta Yaz Okullarında Konaklama Seçenekleri', id: 'konaklama-secenekleri' },
    ],
  },
  {
    category: 'Başvuru ve Sorular',
    items: [
      { name: 'Malta Yaz Okullarına Başvuru ve Vize Süreci', id: 'basvuru-vize' },
      { name: 'Malta Yaz Okulları Hakkında Sık Sorulan Sorular', id: 'sss' },
    ],
  },
];

export default function TableOfContents() {
  let itemIndex = 0;

  return (
    <section id="içindekiler" className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <nav aria-label="İçindekiler" itemScope itemType="https://schema.org/SiteNavigationElement">
          <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">İçindekiler</h2>
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {section.category}
                </h3>
                <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {section.items.map((item) => {
                    itemIndex++;
                    const isProgramSunanOkullar = item.id === 'program-sunan-okullar';
                    return (
                      <li key={item.id} className={isProgramSunanOkullar ? 'sm:col-span-2' : ''}>
                        <Link
                          href={`#${item.id}`}
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            {itemIndex}
                          </span>
                          <span className="leading-relaxed">{item.name}</span>
                        </Link>
                        {/* Program Sunan Okullar altında okulları listele */}
                        {isProgramSunanOkullar && (
                          <ol className="mt-3 ml-9 space-y-2 border-l-2 border-slate-200 pl-4">
                            {yazOkullari.map((okul, okulIndex) => {
                              const okulNumber = okulIndex + 1;
                              return (
                                <li key={okul.id}>
                                  <Link
                                    href={`#${okul.id}`}
                                    className="flex items-start gap-2 text-xs text-slate-600 transition hover:text-slate-900 hover:underline"
                                  >
                                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-xs font-medium text-slate-500">
                                      {okulNumber}
                                    </span>
                                    <span className="leading-relaxed">{okul.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ol>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </nav>

        {/* Öne Çıkarılan Görsel */}
        <figure className="mt-8" itemScope itemType="https://schema.org/ImageObject">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
            <Image
              src="/malta-yaz-okullari/malta-yaz-okullari.webp"
              alt="Malta yaz okulları 2026 programları, fiyatlar ve okul karşılaştırması - Junior ve teen İngilizce yaz kampı programları"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              quality={90}
              itemProp="contentUrl"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-600" itemProp="caption">
            Malta yaz okulları 2026 programları, fiyatlar ve okul karşılaştırması - Junior ve teen İngilizce yaz kampı programları
          </figcaption>
          <meta itemProp="name" content="Malta Yaz Okulları 2026 Programları ve Fiyatlar" />
          <meta itemProp="description" content="Malta yaz okulları 2026: Junior ve teen İngilizce yaz kampı programları, okul incelemeleri, fiyat aralıkları, konaklama seçenekleri ve başvuru süreci" />
        </figure>
      </div>
    </section>
  );
}
