'use client';

import Link from 'next/link';
import Image from 'next/image';

const sections = [
  {
    category: 'Vize Başvuru Bilgileri',
    items: [
      { name: 'Malta Öğrenci Vizesi İçin Gerekli Belgeler (2026)', id: 'gerekli-belgeler' },
      { name: 'Malta Öğrenci Vizesi Türleri', id: 'vize-turleri' },
      { name: 'Malta Öğrenci Vizesi Başvuru Süreci (Adım Adım)', id: 'basvuru-sureci' },
      { name: 'Malta Öğrenci Vizesi Ücretleri 2026', id: 'vize-ucretleri' },
    ],
  },
  {
    category: 'Vize Süreç ve Planlama',
    items: [
      { name: 'Malta Öğrenci Vizesi İçin Bankada Ne Kadar Para Olmalı?', id: 'banka-bakiye' },
      { name: 'Malta Öğrenci Vizesi Kaç Günde Çıkar? (2026)', id: 'sonuclanma-suresi' },
    ],
  },
  {
    category: 'Çalışma İzni ve Red Nedenleri',
    items: [
      { name: 'Malta Öğrenci Vizesi ile Çalışma İzni', id: 'calisma-izni' },
      { name: 'Malta Öğrenci Vizesi Neden Reddedilir?', id: 'reddi-nedenleri' },
    ],
  },
  {
    category: 'Sıkça Sorulan Sorular',
    items: [{ name: 'Malta Öğrenci Vizesi Hakkında Sık Sorulan Sorular', id: 'sss' }],
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
                    return (
                      <li key={item.id}>
                        <Link
                          href={`#${item.id}`}
                          className="flex items-start gap-3 text-sm text-slate-700 transition hover:text-slate-900 hover:underline"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            {itemIndex}
                          </span>
                          <span className="leading-relaxed">{item.name}</span>
                        </Link>
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
              src="/malta-ogrenci-vizesi-basvuru-sureci.webp"
              alt="Malta Öğrenci Vizesi Başvuru Süreci 2026 - Adım adım başvuru rehberi, gerekli belgeler ve vize türleri"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              quality={90}
              itemProp="contentUrl"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-600" itemProp="caption">
            Malta Öğrenci Vizesi Başvuru Süreci 2026 - Adım adım başvuru rehberi, gerekli belgeler ve vize türleri
          </figcaption>
          <meta itemProp="name" content="Malta Öğrenci Vizesi Başvuru Süreci 2026" />
          <meta itemProp="description" content="Malta öğrenci vizesi başvuru süreci 2026: C Tipi ve D Tipi vize başvuru adımları, gerekli belgeler, vize ücretleri ve detaylı rehber" />
        </figure>
      </div>
    </section>
  );
}
