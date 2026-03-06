import Link from 'next/link';
import Image from 'next/image';

const sections = [
  {
    category: 'Okul Bazlı Fiyat İncelemeleri',
    items: [
      { name: 'ESE Malta Dil Okulu 2026 Güncel Fiyatları', id: 'ese-malta' },
      { name: 'EC Malta Dil Okulu 2026 Güncel Fiyatları', id: 'ec-malta' },
      { name: 'ACE English Malta Dil Okulu 2026 Güncel Fiyatları', id: 'ace-english-malta' },
      { name: 'IELS Malta Dil Okulu 2026 Güncel Fiyatları', id: 'iels-malta' },
      { name: 'AM Language Malta Dil Okulu 2026 Güncel Fiyatları', id: 'am-language-malta' },
      { name: 'Gateway Malta Dil Okulu 2026 Güncel Fiyatları', id: 'gateway-malta' },
      { name: 'Clubclass Malta Dil Okulu 2026 Güncel Fiyatları', id: 'clubclass-malta' },
      { name: 'inlingua Malta Dil Okulu 2026 Güncel Fiyatları', id: 'inlingua-malta' },
      { name: 'Atlas Malta Dil Okulu 2026 Güncel Fiyatları', id: 'atlas-malta' },
      { name: 'BELS Malta Dil Okulu 2026 Güncel Fiyatları', id: 'bels-malta' },
    ],
  },
  {
    category: 'Fiyat Rehberleri ve Karşılaştırma',
    items: [
      { name: 'Malta Dil Okulu Fiyat Endeksi (2026) — Referans Seviye', id: 'fiyat-endeksi' },
      { name: 'Kaç Ay Planlıyorsun? (2026 Ortalama Paket Fiyat Aralıkları)', id: 'sure-planlama' },
      { name: 'Malta Dil Okulu Ödeme Takvimi ve İlk Gün Bütçesi (2026)', id: 'odeme-takvimi' },
      { name: 'Malta Dil Okulu Gerçek Ödeme, İade ve Gizli Masraflar Rehberi (2026)', id: 'odeme-rehberi' },
      { name: 'Malta Dil Okulu Paket Fiyatı Nedir ve Neleri Kapsar? (2026)', id: 'paket-fiyat-rehberi' },
    ],
  },
  {
    category: 'Sıkça Sorulan Sorular',
    items: [{ name: 'Malta Dil Okulu Fiyatları Hakkında Sıkça Sorulan Sorular (2026)', id: 'sss' }],
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
              src="/malta-dil-okulu-fiyatlari.webp"
              alt="Malta Dil Okulu Fiyatları 2026 - Tüm okulların karşılaştırmalı fiyat listesi ve paket seçenekleri"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              quality={90}
              itemProp="contentUrl"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-600" itemProp="caption">
            Malta Dil Okulu Fiyatları 2026 - Tüm okulların karşılaştırmalı fiyat listesi ve paket seçenekleri
          </figcaption>
          <meta itemProp="name" content="Malta Dil Okulu Fiyatları 2026" />
          <meta itemProp="description" content="Malta dil okulu fiyatları 2026: Tüm okulların karşılaştırmalı fiyat listesi, paket seçenekleri ve detaylı rehber" />
        </figure>
      </div>
    </section>
  );
}
