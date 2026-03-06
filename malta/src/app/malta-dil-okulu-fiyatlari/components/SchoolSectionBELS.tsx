import Image from 'next/image';
import Link from 'next/link';

const LOGO_PATH = '/malta-dil-okullari-karsilastirma/belsmalta.png';
const EXTERIOR_IMAGE_PATH = '/malta-dil-okullari-dis/bels-malta-dil-okulu-st-pauls-bay.webp';

const priceData = [
  {
    accommodation: 'Comfort Residence Basic',
    weeks4: null,
    weeks6: null,
    weeks8: 2600,
    weeks12: 3600,
    weeks16: 4800,
    weeks24: 7200,
  },
  {
    accommodation: 'Comfort Residence Plus',
    weeks4: 1660,
    weeks6: 2490,
    weeks8: 3280,
    weeks12: 4320,
    weeks16: 5360,
    weeks24: 8640,
  },
  {
    accommodation: 'Superior Residence',
    weeks4: 1940,
    weeks6: 2390,
    weeks8: 3440,
    weeks12: 5040,
    weeks16: 6720,
    weeks24: 10080,
  },
  {
    accommodation: 'Superior Residence Plus',
    weeks4: 2220,
    weeks6: 3330,
    weeks8: 4000,
    weeks12: 5700,
    weeks16: 7600,
    weeks24: 11400,
  },
  {
    accommodation: 'Aile Yanı (2 Kişi)',
    weeks4: 2020,
    weeks6: 3030,
    weeks8: 3840,
    weeks12: 5460,
    weeks16: 7280,
    weeks24: 10920,
  },
];

// Fiyat aralığı hesaplama fonksiyonu
function calculatePriceRange(data: typeof priceData) {
  const allPrices: Array<{ price: number; weekKey: string; weekLabel: string }> = [];
  const weekKeys = ['weeks4', 'weeks6', 'weeks8', 'weeks12', 'weeks16', 'weeks24'] as const;
  const weekLabels = ['4 Hafta', '6 Hafta', '8 Hafta', '12 Hafta', '16 Hafta', '24 Hafta'];
  
  data.forEach((row) => {
    weekKeys.forEach((key, index) => {
      const price = row[key];
      if (price !== null && price !== undefined && typeof price === 'number') {
        allPrices.push({ price, weekKey: key, weekLabel: weekLabels[index] });
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
    minLabel: minEntry?.weekLabel || '4 Hafta',
    maxLabel: maxEntry?.weekLabel || '24 Hafta',
  };
}

export default function SchoolSectionBELS() {
  const priceRange = calculatePriceRange(priceData);
  return (
    <section aria-label="BELS Malta fiyatları 2026" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <article
          id="bels-malta"
          itemScope
          itemType="https://schema.org/EducationalOrganization"
          className="border border-slate-200 rounded-2xl bg-white shadow-sm p-5 md:p-6"
        >
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={LOGO_PATH}
                alt="BELS Malta logo"
                width={32}
                height={32}
                className="h-8 w-8 flex-shrink-0 object-contain"
                priority={false}
                loading="lazy"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900" itemProp="name">
                BELS Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Tiplerine Göre)
              </h2>
            </div>
            {priceRange && (
              <p className="mb-4 text-base font-medium leading-relaxed text-slate-900 speakable-bels-fiyat-araligi">
                2026 yılında <strong>BELS Malta</strong> paket fiyatları {priceRange.minLabel} için <strong>{priceRange.minPrice.toLocaleString('tr-TR')}€</strong>'dan başlayıp, {priceRange.maxLabel} için <strong>{priceRange.maxPrice.toLocaleString('tr-TR')}€</strong>'a kadar çıkabilir.
              </p>
            )}
            <div className="space-y-2 text-base leading-relaxed text-slate-700">
              <p>
                BELS Malta dil okulu fiyatları, seçilen konaklama türü ve eğitim süresine göre değişiklik gösterir. Aşağıdaki tabloda BELS Malta'nın 2026 yılı için sunduğu 4–24 hafta arası güncel toplam paket fiyatları, konaklama tiplerine göre açık şekilde yer almaktadır. <Link href="/malta-dil-okullari/bels-malta" className="font-semibold text-slate-900 hover:underline">BELS Malta'nın eğitim programları, sınıf yapısı ve okul özellikleri</Link> hakkında detaylı bilgilere okul sayfasından ulaşabilirsin.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <div className="aspect-[4/3] relative">
                <Image
                  src={EXTERIOR_IMAGE_PATH}
                  alt="BELS Malta dil okulu dış görünüm - St. Paul's Bay bölgesi"
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
                BELS Malta'da Fiyatı En Çok Etkileyen Faktörler (2026)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Konaklama tipi</span>
                    <p className="text-sm text-slate-600">
                      Residence veya aile yanı seçimi toplam maliyeti doğrudan etkiler.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Eğitim süresi</span>
                    <p className="text-sm text-slate-600">
                      Uzun dönem programlarda haftalık ortalama maliyet düşer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Lokasyon</span>
                    <p className="text-sm text-slate-600">
                      St. Paul's Bay ve Gozo seçenekleri fiyat yapısını etkileyebilir.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-base leading-relaxed text-slate-700 speakable-bels-fiyat-aciklama">
              BELS Malta dil okulu fiyatları 2026, konaklama tipi ve eğitim süresine göre belirlenir. Aşağıdaki tabloda BELS Malta için <strong>toplam paket fiyatlarını</strong> konaklama seçeneklerine göre inceleyebilirsin.
            </p>
          </div>

          <div className="mb-6 hidden md:block overflow-x-auto">
            <table className="w-full" itemScope itemType="https://schema.org/Table">
              <caption className="sr-only">
                BELS Malta 2026 toplam paket fiyatları (konaklama tipine göre).
              </caption>
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Konaklama Tipi</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">4 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">6 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">8 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">12 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">16 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">24 Hafta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {priceData.map((row, index) => (
                  <tr key={index} className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/Offer">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900" itemProp="name">{row.accommodation}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      {row.weeks4 ? (
                        <>
                          <span itemProp="price" content={row.weeks4.toString()} className="font-semibold text-slate-900">{row.weeks4.toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="4 hafta" />
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      {row.weeks6 ? (
                        <>
                          <span itemProp="price" content={row.weeks6.toString()} className="font-semibold text-slate-900">{row.weeks6.toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="6 hafta" />
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      {row.weeks8 ? (
                        <>
                          <span itemProp="price" content={row.weeks8.toString()} className="font-semibold text-slate-900">{row.weeks8.toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="8 hafta" />
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      {row.weeks12 ? (
                        <>
                          <span itemProp="price" content={row.weeks12.toString()} className="font-semibold text-slate-900">{row.weeks12.toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="12 hafta" />
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      {row.weeks16 ? (
                        <>
                          <span itemProp="price" content={row.weeks16.toString()} className="font-semibold text-slate-900">{row.weeks16.toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="16 hafta" />
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      {row.weeks24 ? (
                        <>
                          <span itemProp="price" content={row.weeks24.toString()} className="font-semibold text-slate-900">{row.weeks24.toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="24 hafta" />
                        </>
                      ) : (
                        '–'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-6 md:hidden space-y-4">
            {[
              { label: '4 Hafta', key: 'weeks4' },
              { label: '6 Hafta', key: 'weeks6' },
              { label: '8 Hafta', key: 'weeks8' },
              { label: '12 Hafta', key: 'weeks12' },
              { label: '16 Hafta', key: 'weeks16' },
              { label: '24 Hafta', key: 'weeks24' },
            ].map((week) => {
              type WeekKey = 'weeks4' | 'weeks6' | 'weeks8' | 'weeks12' | 'weeks16' | 'weeks24';
              const weekKey = week.key as WeekKey;
              const hasData = priceData.some((row) => row[weekKey] !== null);
              if (!hasData) return null;

              return (
                <div key={week.key} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="text-base font-semibold text-slate-900">{week.label}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {priceData.map((row, index) => {
                      const price = row[weekKey];
                      if (price === null) return null;

                      return (
                        <div key={index} className="px-4 py-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">{row.accommodation}</span>
                          <span className="text-sm font-semibold text-slate-900">{price.toLocaleString('tr-TR')}€</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-600">
            Yukarıdaki fiyatlar, BELS Malta için 2026 yılı toplam paket ücretlerini göstermektedir.
          </p>

          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 speakable-bels-bilgiler">
            <h3 className="mb-4 text-lg font-semibold text-slate-900" id="bels-malta-bilgiler">
              BELS Malta 2026 Fiyatlarına Dair Bilinmesi Gerekenler
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  BELS Malta'da butik ve düşük kontenjanlı sınıf yapısı bulunur.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Uzun dönem programlar (<strong>16–24 hafta</strong>) toplam maliyet açısından daha avantajlıdır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Aile yanı ve residence konaklamalar okul tarafından organize edilir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Gozo lokasyonunda eğitim almak isteyenler için fiyat yapısı farklılık gösterebilir.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/malta-dil-okullari/bels-malta"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200"
              aria-label="BELS Malta dil okulu detay sayfası"
            >
              BELS Malta İncele
            </Link>
            <a
              href="https://wa.me/35699143066?text=Merhaba,%20BELS%20Malta%20dil%20okulu%20fiyatları%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BELS Malta dil okulu fiyatları hakkında WhatsApp ile bilgi al"
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              BELS Malta Dil Okulu Fiyatını Netleştir
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
