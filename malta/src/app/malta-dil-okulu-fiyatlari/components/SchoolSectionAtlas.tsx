import Image from 'next/image';
import Link from 'next/link';

const LOGO_PATH = '/malta-dil-okullari-karsilastirma/atlas-logo.webp';
const EXTERIOR_IMAGE_PATH = '/malta-dil-okullari-dis/atlas-language-school-malta-pembroke.webp';

const priceData = [
  {
    accommodation: 'Superior Apart',
    month1: 1700,
    month2: 3400,
    month3: 4620,
    month6: 7920,
  },
];

// Fiyat aralığı hesaplama fonksiyonu
function calculatePriceRange(data: typeof priceData) {
  const allPrices: Array<{ price: number; monthKey: string; monthLabel: string }> = [];
  const monthKeys = ['month1', 'month2', 'month3', 'month6'] as const;
  const monthLabels = ['1 Ay (4 Hafta)', '2 Ay (8 Hafta)', '3 Ay (12 Hafta)', '6 Ay (24 Hafta)'];
  
  data.forEach((row) => {
    monthKeys.forEach((key, index) => {
      const price = row[key];
      if (price !== null && price !== undefined && typeof price === 'number') {
        allPrices.push({ price, monthKey: key, monthLabel: monthLabels[index] });
      }
    });
  });

  if (allPrices.length === 0) return null;

  const minPrice = Math.min(...allPrices.map((p) => p.price));
  const maxPrice = Math.max(...allPrices.map((p) => p.price));

  const minEntry = allPrices.find((p) => p.price === minPrice);
  const maxEntry = allPrices.find((p) => p.price === maxPrice);

  return {
    minPrice,
    maxPrice,
    minLabel: minEntry?.monthLabel || '1 Ay (4 Hafta)',
    maxLabel: maxEntry?.monthLabel || '6 Ay (24 Hafta)',
  };
}

export default function SchoolSectionAtlas() {
  const priceRange = calculatePriceRange(priceData);
  return (
    <section aria-label="Atlas Malta fiyatları 2026" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <article
          id="atlas-malta"
          itemScope
          itemType="https://schema.org/EducationalOrganization"
          className="border border-slate-200 rounded-2xl bg-white shadow-sm p-5 md:p-6"
        >
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={LOGO_PATH}
                alt="Atlas Malta logo"
                width={32}
                height={32}
                className="h-8 w-8 flex-shrink-0 object-contain"
                priority={false}
                loading="lazy"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900" itemProp="name">
                Atlas Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Tiplerine Göre)
              </h2>
            </div>
            {priceRange && (
              <p className="mb-4 text-base font-medium leading-relaxed text-slate-900 speakable-atlas-fiyat-araligi">
                2026 yılında <strong>Atlas Malta</strong> paket fiyatları {priceRange.minLabel} için <strong>{priceRange.minPrice.toLocaleString('tr-TR')}€</strong>'dan başlayıp, {priceRange.maxLabel} için <strong>{priceRange.maxPrice.toLocaleString('tr-TR')}€</strong>'a kadar çıkabilir.
              </p>
            )}
            <div className="space-y-2 text-base leading-relaxed text-slate-700">
              <p>
                Atlas Malta dil okulu fiyatları, seçilen konaklama türü ve eğitim süresine göre değişiklik gösterir. Aşağıdaki tabloda Atlas Malta'nın 2026 yılı için sunduğu 4–24 hafta arası güncel toplam paket fiyatları, konaklama tipine göre net şekilde yer almaktadır. <Link href="/malta-dil-okullari/atlas-malta" className="font-semibold text-slate-900 hover:underline">Atlas Malta'nın eğitim programları, sınıf yapısı ve okul özellikleri</Link> hakkında detaylı bilgilere okul sayfasından ulaşabilirsin.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <div className="aspect-[4/3] relative">
                <Image
                  src={EXTERIOR_IMAGE_PATH}
                  alt="Atlas Malta dil okulu dış görünüm - Pembroke bölgesi"
                  fill
                  className="object-cover object-center"
                  priority={false}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Atlas Malta'da Fiyatı En Çok Etkileyen Faktörler (2026)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Konaklama tipi</span>
                    <p className="text-sm text-slate-600">
                      Atlas Malta'da fiyatlar ağırlıklı olarak apart konaklama üzerinden belirlenir.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Eğitim süresi</span>
                    <p className="text-sm text-slate-600">
                      Uzun dönem programlarda aylık ortalama maliyet düşer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Okul yapısı</span>
                    <p className="text-sm text-slate-600">
                      Butik okul olması nedeniyle kontenjanlar sınırlıdır.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-base leading-relaxed text-slate-700 speakable-atlas-fiyat-aciklama">
              Atlas Malta dil okulu fiyatları 2026, ağırlıklı olarak apart konaklama ve eğitim süresine göre belirlenir. Aşağıdaki tabloda Atlas Malta için <strong>toplam paket fiyatlarını</strong> süre bazında görebilirsin.
            </p>
          </div>

          <div className="mb-6 hidden md:block overflow-x-auto">
            <table className="w-full" itemScope itemType="https://schema.org/Table">
              <caption className="sr-only">
                Atlas Malta 2026 toplam paket fiyatları (süre bazında).
              </caption>
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Konaklama Tipi</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">1 Ay (4 Hafta)</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">2 Ay (8 Hafta)</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">3 Ay (12 Hafta)</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">6 Ay (24 Hafta)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {priceData.map((row, index) => (
                  <tr key={index} className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/Offer">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900" itemProp="name">{row.accommodation}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.month1.toString()} className="font-semibold text-slate-900">{row.month1.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="1 ay (4 hafta)" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.month2.toString()} className="font-semibold text-slate-900">{row.month2.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="2 ay (8 hafta)" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.month3.toString()} className="font-semibold text-slate-900">{row.month3.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="3 ay (12 hafta)" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.month6.toString()} className="font-semibold text-slate-900">{row.month6.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="6 ay (24 hafta)" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-6 md:hidden space-y-4">
            {[
              { label: '1 Ay (4 Hafta)', key: 'month1' },
              { label: '2 Ay (8 Hafta)', key: 'month2' },
              { label: '3 Ay (12 Hafta)', key: 'month3' },
              { label: '6 Ay (24 Hafta)', key: 'month6' },
            ].map((period) => {
              type PeriodKey = 'month1' | 'month2' | 'month3' | 'month6';
              const periodKey = period.key as PeriodKey;
              return (
                <div key={period.key} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="text-base font-semibold text-slate-900">{period.label}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {priceData.map((row, index) => (
                      <div key={index} className="px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">{row.accommodation}</span>
                        <span className="text-sm font-semibold text-slate-900">{row[periodKey].toLocaleString('tr-TR')}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-600">
            Yukarıdaki fiyatlar, Atlas Malta için 2026 yılı toplam paket ücretlerini göstermektedir.
          </p>

          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 speakable-atlas-bilgiler">
            <h3 className="mb-4 text-lg font-semibold text-slate-900" id="atlas-malta-bilgiler">
              Atlas Malta 2026 Fiyatlarına Dair Bilinmesi Gerekenler
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Fiyatlar toplam paket ücretidir; eğitim ve temel giderler üzerinden hesaplanır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Uzun dönem (<strong>6 ay</strong>) programlar, aylık bazda daha avantajlıdır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Kontenjan sınırlı olduğu için erken dönem kayıtlar fiyat avantajı sağlar.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Atlas Malta, büyük zincir okullara kıyasla daha sakin ve butik bir yapı sunar.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/malta-dil-okullari/atlas-malta"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200"
              aria-label="Atlas Malta dil okulu detay sayfası"
            >
              Atlas Malta İncele
            </Link>
            <a
              href="https://wa.me/35699143066?text=Merhaba,%20Atlas%20Malta%20dil%20okulu%20fiyatları%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atlas Malta dil okulu fiyatları hakkında WhatsApp ile bilgi al"
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Atlas Malta Dil Okulu Fiyatını Netleştir
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
