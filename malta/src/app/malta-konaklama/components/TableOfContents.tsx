import Link from 'next/link';
import Image from 'next/image';

const sections = [
  {
    category: 'Konaklama Türleri',
    items: [
      { name: 'Aile Yanı Konaklama (Malta Dil Okulları)', id: 'aile-yani-konaklama' },
      { name: 'Öğrenci Rezidansı Konaklama (Malta Dil Okulları)', id: 'ogrenci-rezidansi-konaklama' },
      { name: 'Paylaşımlı Apart Konaklama (Malta Dil Okulları)', id: 'paylasimli-apart-konaklama' },
      { name: 'Stüdyo Daire Konaklama (Malta Dil Okulları)', id: 'studyo-daire-konaklama' },
      { name: 'Hostel Konaklama (Malta Dil Okulları)', id: 'hostel-konaklama' },
      { name: 'Otel Konaklama (Malta Dil Okulları)', id: 'otel-konaklama' },
    ],
  },
  {
    category: 'Okul Bazlı Konaklama Seçenekleri',
    items: [
      { name: 'Malta Dil Okulları Konaklama Seçenekleri 2026', id: 'malta-dil-okullari-konaklama-secenekleri' },
    ],
  },
  {
    category: 'Sıkça Sorulan Sorular',
    items: [{ name: 'Malta Dil Okulları Konaklama: Sıkça Sorulan Sorular', id: 'sss' }],
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
              src="/malta-konaklama/malta-konaklama-dil-okullari.webp"
              alt="Malta Konaklama Dil Okulları 2026 - Öğrenciler için konaklama türleri, fiyatlar ve seçenekler. Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hostel konaklama seçenekleri."
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
              quality={90}
              itemProp="contentUrl"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-slate-600" itemProp="caption">
            Malta Konaklama Dil Okulları 2026 - Öğrenciler için konaklama türleri, fiyatlar ve seçenekler. Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hostel konaklama seçenekleri.
          </figcaption>
          <meta itemProp="name" content="Malta Konaklama Dil Okulları 2026" />
          <meta itemProp="description" content="Malta konaklama dil okulları 2026: Aile yanı, rezidans, paylaşımlı apart, stüdyo daire, otel ve hosteller. Malta öğrenci konaklama fiyatları, seçim rehberi ve okul bazlı konaklama seçenekleri." />
        </figure>
      </div>
    </section>
  );
}
