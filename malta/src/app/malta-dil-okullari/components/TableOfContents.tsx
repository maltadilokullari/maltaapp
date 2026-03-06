'use client';

import Link from 'next/link';
import Image from 'next/image';
import { schools } from '../../data/schools';

const sections = [
  {
    category: 'Okul Seçimi ve Karşılaştırma',
    items: [
      { name: 'Hangi Malta Dil Okulu Kime Uygun?', id: 'hangi-okul-kime-uygun' },
      { name: "Malta'daki Dil Okullarının Eğitim Modelleri", id: 'egitim-modelleri' },
      { name: 'Malta Dil Okulları İncelemeleri (2026)', id: 'okul-incelemeleri' },
    ],
  },
  {
    category: 'Filtreleme ve Karşılaştırma',
    items: [
      { name: 'Bölgeye Göre Malta Dil Okulları (St. Julian\'s, Sliema, Gozo)', id: 'bolgeye-gore' },
      { name: 'Program Temposuna Göre Okul Karşılaştırması', id: 'program-temposu' },
    ],
  },
  {
    category: 'Sıkça Sorulan Sorular',
    items: [{ name: 'Malta Dil Okulları Hakkında En Çok Sorulan Sorular', id: 'sss' }],
  },
];

// Okul başlıklarını oluştur
const getSchoolTitle = (school: typeof schools[0]) => {
  if (school.slug === 'am-language-malta') {
    return `AM Language Malta Dil Okulu | ${school.region} (2026)`;
  }
  if (school.slug === 'bels-malta') {
    return `BELS Malta Dil Okulu | St. Paul's / Gozo (2026)`;
  }
  return `${school.name} Dil Okulu | ${school.region} (2026)`;
};

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
                    const isOkulIncelemeleri = item.id === 'okul-incelemeleri';
                    return (
                      <li key={item.id} className={isOkulIncelemeleri ? 'sm:col-span-2' : ''}>
                        <Link
                          href={`#${item.id}`}
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            {itemIndex}
                          </span>
                          <span className="leading-relaxed">{item.name}</span>
                        </Link>
                        {/* Okul İncelemeleri altında okulları listele */}
                        {isOkulIncelemeleri && (
                          <ol className="mt-3 ml-9 space-y-2 border-l-2 border-slate-200 pl-4">
                            {schools.map((school, schoolIndex) => {
                              const schoolNumber = schoolIndex + 1;
                              return (
                                <li key={school.slug}>
                                  <Link
                                    href={`#${school.slug}`}
                                    className="flex items-start gap-2 text-xs text-slate-600 transition hover:text-slate-900 hover:underline"
                                  >
                                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-xs font-medium text-slate-500">
                                      {schoolNumber}
                                    </span>
                                    <span className="leading-relaxed">{getSchoolTitle(school)}</span>
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
              src="/malta-dil-okullari-2026.webp"
              alt="Malta dil okulları İngilizce eğitimi karşılaştırma ve seçim rehberi 2026 - Okul incelemeleri, bölge ve program karşılaştırması"
              width={1200}
              height={630}
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              quality={90}
              itemProp="contentUrl"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-600" itemProp="caption">
            Malta dil okulları İngilizce eğitimi karşılaştırma ve seçim rehberi 2026 - Okul incelemeleri, bölge ve program karşılaştırması
          </figcaption>
          <meta itemProp="name" content="Malta Dil Okulları İngilizce Eğitimi Karşılaştırma Rehberi 2026" />
          <meta itemProp="description" content="Malta dil okulları karşılaştırma rehberi 2026: Okul incelemeleri, eğitim modelleri, bölge ve program temposu karşılaştırması, öğrenci profili uygunluk analizi" />
        </figure>
      </div>
    </section>
  );
}
