import Image from 'next/image';
import Link from 'next/link';

export default function VizeSonuclanmaSuresi() {
  return (
    <section id="sonuclanma-suresi" className="bg-gradient-to-br from-blue-50 via-indigo-50/30 to-slate-50 border-b border-slate-200 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
            Malta Öğrenci Vizesi Kaç Günde Çıkar? (2026)
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            Malta öğrenci vizesi başvurularında sonuçlanma süresi, vize türüne ve başvuru dönemine göre değişiklik gösterebilir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Sol Kolon - Görsel */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] max-w-[480px] mx-auto lg:mx-0 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image
                src="/malta-ogrenci-vizesi-kac-gunde-cikar.webp"
                alt="Malta öğrenci vizesi sonuçlanma süresi"
                fill
                className="object-cover object-center"
                priority={false}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 480px"
                quality={90}
              />
            </div>
          </div>

          {/* Sağ Kolon - İçerik */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Hızlı Özet - İki Kart */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Kart 1 - C Tipi */}
              <div className="rounded-xl border-2 border-blue-200 bg-blue-50/50 p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    C Tipi Öğrenci Vizesi (90 Güne Kadar)
                  </h3>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>Ortalama sonuç süresi:</strong> 15–20 iş günü (yaklaşık 3–4 hafta)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>Yoğun dönemlerde:</strong> 30–40 iş gününe kadar uzayabilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>En erken başvuru:</strong> seyahatten en fazla 3 ay önce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>Tavsiye edilen başvuru zamanı:</strong> seyahatten en az 8 hafta önce</span>
                  </li>
                </ul>
              </div>

              {/* Kart 2 - D Tipi */}
              <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-6 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    D Tipi Öğrenci Vizesi (105 Günden Uzun)
                  </h3>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>Ortalama sonuç süresi:</strong> yaklaşık 9 hafta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>Yoğun dönemlerde:</strong> 3 aya kadar uzayabilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>En erken başvuru:</strong> seyahatten en fazla 6 ay önce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span><strong>Tavsiye edilen başvuru zamanı:</strong> eğitimden en az 12 hafta önce</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tek Bakışta Süre Tablosu - Full Width */}
        <div className="mt-12 w-full">
          <h3 className="mb-6 text-center text-xl font-bold text-slate-900 sm:text-2xl">
            Eğitim Süresine Göre Malta Öğrenci Vizesi Sonuçlanma Süreleri
          </h3>
          <div className="rounded-xl bg-slate-50/80 p-4 md:p-6">
            <div className="overflow-x-auto">
                <table className="w-full" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only" itemProp="description">
                    Malta öğrenci vizesi sonuçlanma süreleri - Vize türüne ve başvuru dönemine göre
                  </caption>
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
                        Vize Türü
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
                        Ortalama Süre
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
                        Yoğun Dönemde
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
                        En Erken Başvuru
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900">
                        Ne Zaman Başvurmalı?
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="transition-colors hover:bg-slate-50/80">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">C Tipi (90 güne kadar)</td>
                      <td className="px-4 py-4 text-sm text-slate-700">15–20 iş günü</td>
                      <td className="px-4 py-4 text-sm text-slate-700">30–40 iş günü</td>
                      <td className="px-4 py-4 text-sm text-slate-700">En fazla 3 ay önce</td>
                      <td className="px-4 py-4 text-sm text-slate-700">En az 2 ay önce (yoğun dönemde 8 hafta+)</td>
                    </tr>
                    <tr className="transition-colors hover:bg-slate-50/80">
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">D Tipi (105 günden uzun)</td>
                      <td className="px-4 py-4 text-sm text-slate-700">9 hafta</td>
                      <td className="px-4 py-4 text-sm text-slate-700">3 aya kadar</td>
                      <td className="px-4 py-4 text-sm text-slate-700">En fazla 6 ay önce</td>
                      <td className="px-4 py-4 text-sm text-slate-700">En az 3 ay önce (12 hafta+)</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* Alt Listeler - İki Kolonlu */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Süreyi Etkileyen Faktörler */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Süreyi Etkileyen Faktörler
                  </h3>
                </div>
                <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Eksik veya hatalı evrak sunulması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Yaz sezonu ve resmi tatil dönemleri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Randevu tarihinin geç alınması</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Ek belge talep edilmesi</span>
                  </li>
                </ul>
              </div>

              {/* Süreci Daha Sağlıklı Planlamak İçin */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Süreci Daha Sağlıklı Planlamak İçin
                  </h3>
                </div>
                <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Belgeleri eksiksiz ve güncel hazırlamak</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Okul kabul ve ödeme belgelerini dosyaya eklemek</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Sponsor evraklarını doğru şekilde düzenlemek (varsa)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>Yoğun dönemlerde başvuruyu erkenden başlatmak</span>
                  </li>
                </ul>
              </div>
        </div>

        {/* Opsiyonel Buton */}
        <div className="mt-8 flex justify-center">
              <Link
                href="https://wa.me/35699143066"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-md transition-all hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Süreyi Planlamak İçin Bilgi Al
              </Link>
        </div>
      </div>
    </section>
  );
}
