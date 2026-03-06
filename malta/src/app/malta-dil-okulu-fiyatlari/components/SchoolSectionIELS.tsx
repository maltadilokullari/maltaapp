import Image from 'next/image';
import Link from 'next/link';

const LOGO_PATH = '/malta-dil-okullari-karsilastirma/iels-malta.png';
const EXTERIOR_IMAGE_PATH = '/malta-dil-okullari-dis/iels-malta-dil-okulu-sliema.webp';

const priceData = [
  {
    accommodation: "Day's Inn Hotel (4 Kişi)",
    weeks4: 1402,
    weeks6: 2053,
    weeks8: 2705,
    weeks12: 4009,
    weeks15: 4979,
    weeks16: 5312,
    weeks24: 7919,
  },
  {
    accommodation: "Day's Inn Hotel (2 Kişi)",
    weeks4: 1523,
    weeks6: 2236,
    weeks8: 2948,
    weeks12: 4373,
    weeks15: 5435,
    weeks16: 5798,
    weeks24: 8648,
  },
  {
    accommodation: "Day's Inn Hotel (1 Kişi)",
    weeks4: 2097,
    weeks6: 3097,
    weeks8: 4050,
    weeks12: 6026,
    weeks15: 7502,
    weeks16: 8002,
    weeks24: 11954,
  },
  {
    accommodation: 'Tigne Suites (2 Kişi)',
    weeks4: 1691,
    weeks6: 2487,
    weeks8: 3230,
    weeks12: 4795,
    weeks15: 5963,
    weeks16: 6361,
    weeks24: 9492,
  },
  {
    accommodation: 'Aile Yanı (2 Kişi)',
    weeks4: 1763,
    weeks6: 2595,
    weeks8: 3374,
    weeks12: 5012,
    weeks15: 6333,
    weeks16: 6650,
    weeks24: 9925,
  },
];

// Fiyat aralığı hesaplama fonksiyonu
function calculatePriceRange(data: typeof priceData) {
  const allPrices: Array<{ price: number; weekKey: string; weekLabel: string }> = [];
  const weekKeys = ['weeks4', 'weeks6', 'weeks8', 'weeks12', 'weeks15', 'weeks16', 'weeks24'] as const;
  const weekLabels = ['4 Hafta', '6 Hafta', '8 Hafta', '12 Hafta', '15 Hafta', '16 Hafta', '24 Hafta'];
  
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

export default function SchoolSectionIELS() {
  const priceRange = calculatePriceRange(priceData);
  return (
    <section aria-label="IELS Malta fiyatları 2026" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:py-10">
        <article
          id="iels-malta"
          itemScope
          itemType="https://schema.org/EducationalOrganization"
          className="border border-slate-200 rounded-2xl bg-white shadow-sm p-5 md:p-6"
        >
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={LOGO_PATH}
                alt="IELS Malta logo"
                width={32}
                height={32}
                className="h-8 w-8 flex-shrink-0 object-contain"
                priority={false}
                loading="lazy"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900" itemProp="name">
                IELS Malta Dil Okulu 2026 Güncel Fiyatları (Konaklama Tiplerine Göre)
              </h2>
            </div>
            {priceRange && (
              <p className="mb-4 text-base font-medium leading-relaxed text-slate-900 speakable-iels-fiyat-araligi">
                2026 yılında <strong>IELS Malta</strong> paket fiyatları {priceRange.minLabel} için <strong>{priceRange.minPrice.toLocaleString('tr-TR')}€</strong>'dan başlayıp, {priceRange.maxLabel} için <strong>{priceRange.maxPrice.toLocaleString('tr-TR')}€</strong>'a kadar çıkabilir.
              </p>
            )}
            <div className="space-y-2 text-base leading-relaxed text-slate-700">
              <p>
                IELS Malta dil okulu fiyatları, seçilen konaklama türü ve eğitim süresine göre değişiklik gösterir. Aşağıdaki tabloda IELS Malta'nın 2026 yılı için sunduğu 4–24 hafta arası güncel paket fiyatları, konaklama tiplerine göre açık şekilde yer almaktadır. <Link href="/malta-dil-okullari/iels-malta" className="font-semibold text-slate-900 hover:underline">IELS Malta'nın eğitim programları, sınıf yapısı ve okul özellikleri</Link> hakkında detaylı bilgilere okul sayfasından ulaşabilirsin.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <div className="aspect-[4/3] relative">
                <Image
                  src={EXTERIOR_IMAGE_PATH}
                  alt="IELS Malta dil okulu dış görünüm - Sliema bölgesi"
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
                IELS Malta'da Fiyatı En Çok Etkileyen Faktörler (2026)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Konaklama tipi</span>
                    <p className="text-sm text-slate-600">
                      Day's Inn Hotel, Tigne Suites veya aile yanı seçenekleri toplam maliyeti doğrudan etkiler.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Eğitim süresi</span>
                    <p className="text-sm text-slate-600">
                      8 hafta ve üzerindeki programlarda uzun dönem paket fiyatları devreye girer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                  <div>
                    <span className="text-sm font-semibold text-slate-900">Sezon farkı</span>
                    <p className="text-sm text-slate-600">
                      Yaz döneminde haftalık yüksek sezon farkı uygulanabilir.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-base leading-relaxed text-slate-700 speakable-iels-fiyat-aciklama">
              IELS Malta dil okulu fiyatları 2026, konaklama tipi ve eğitim süresine bağlı olarak değişir. Aşağıdaki tabloda IELS Malta için 4–24 hafta aralığında sunulan <strong>her şey dahil paket fiyatlarını</strong> konaklama seçeneklerine göre inceleyebilirsin.
            </p>
          </div>

          <div className="mb-6 hidden md:block overflow-x-auto">
            <table className="w-full" itemScope itemType="https://schema.org/Table">
              <caption className="sr-only">
                IELS Malta 2026 her şey dahil paket fiyatları (konaklama tipine göre).
              </caption>
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Konaklama Tipi</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">4 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">6 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">8 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">12 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">15 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">16 Hafta</th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">24 Hafta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {priceData.map((row, index) => (
                  <tr key={index} className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/Offer">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900" itemProp="name">{row.accommodation}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks4.toString()} className="font-semibold text-slate-900">{row.weeks4.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="4 hafta" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks6.toString()} className="font-semibold text-slate-900">{row.weeks6.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="6 hafta" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks8.toString()} className="font-semibold text-slate-900">{row.weeks8.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="8 hafta" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks12.toString()} className="font-semibold text-slate-900">{row.weeks12.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="12 hafta" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks15.toString()} className="font-semibold text-slate-900">{row.weeks15.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="15 hafta" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks16.toString()} className="font-semibold text-slate-900">{row.weeks16.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="16 hafta" />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                      <span itemProp="price" content={row.weeks24.toString()} className="font-semibold text-slate-900">{row.weeks24.toLocaleString('tr-TR')}€</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <meta itemProp="unitText" content="24 hafta" />
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
              { label: '15 Hafta', key: 'weeks15' },
              { label: '16 Hafta', key: 'weeks16' },
              { label: '24 Hafta', key: 'weeks24' },
            ].map((week) => {
              type WeekKey = 'weeks4' | 'weeks6' | 'weeks8' | 'weeks12' | 'weeks15' | 'weeks16' | 'weeks24';
              const weekKey = week.key as WeekKey;
              return (
                <div key={week.key} className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h3 className="text-base font-semibold text-slate-900">{week.label}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {priceData.map((row, index) => (
                      <div key={index} className="px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">{row.accommodation}</span>
                        <span className="text-sm font-semibold text-slate-900">{row[weekKey].toLocaleString('tr-TR')}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mb-6 text-sm leading-relaxed text-slate-600">
            Yukarıdaki fiyatlar, IELS Malta için 2026 yılı her şey dahil paket ücretlerini göstermektedir.
          </p>

          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 speakable-iels-bilgiler">
            <h3 className="mb-4 text-lg font-semibold text-slate-900" id="iels-malta-bilgiler">
              IELS Malta 2026 Fiyatlarına Dair Bilinmesi Gerekenler
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>1 Haziran – 31 Ağustos 2026</strong> tarihleri arasında haftalık <strong>91€</strong> yaz sezonu farkı uygulanır.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Tigne Suites konaklamalarda <strong>24 hafta</strong> ve üzeri kayıtlarda yaz sezonu farkı alınmaz.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Day's Inn Hotel studio (mutfaklı oda) için haftalık <strong>42€</strong>, tek kişilik kullanımda ek <strong>7€</strong> fark bulunur.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Haftalık kahvaltı <strong>56€</strong>, akşam yemeği <strong>161€</strong> olarak sunulur.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  2026 yılına özel kampanyalarda, Genel İngilizce 20 ders yerine 30 ders seçeneği ek ücret olmadan sunulabilir (dönemsel).
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/malta-dil-okullari/iels-malta"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200"
              aria-label="IELS Malta dil okulu detay sayfası"
            >
              IELS Malta İncele
            </Link>
            <a
              href="https://wa.me/35699143066?text=Merhaba,%20IELS%20Malta%20dil%20okulu%20fiyatları%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IELS Malta dil okulu fiyatları hakkında WhatsApp ile bilgi al"
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              IELS Malta Dil Okulu Fiyatını Netleştir
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
