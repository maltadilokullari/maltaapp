'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const schools = [
  { name: 'ESE Malta', logo: '/malta-dil-okullari-karsilastirma/ese-malta.png', prices: { '1ay': 1840, '3ay': 3840, '6ay': 7200 } },
  { name: 'EC Malta', logo: '/malta-dil-okullari-karsilastirma/ec-malta.png', prices: { '1ay': 1749, '3ay': 4773, '6ay': 9187 } },
  { name: 'IELS Malta', logo: '/malta-dil-okullari-karsilastirma/iels-malta.png', prices: { '1ay': 1402, '3ay': 4009, '6ay': 7919 } },
  { name: 'ACE Malta', logo: '/malta-dil-okullari-karsilastirma/ace-english-malta.png', prices: { '1ay': 1495, '3ay': 3775, '6ay': 7375 } },
  { name: 'AM Language', logo: '/malta-dil-okullari-karsilastirma/am-language-malta.png', prices: { '1ay': 1360, '3ay': 3465, '6ay': 6240 } },
  { name: 'inlingua Malta', logo: '/malta-dil-okullari-karsilastirma/inlingua-malta.png', prices: { '1ay': 1250, '3ay': 3575, '6ay': 7064 } },
  { name: 'Atlas Malta', logo: '/malta-dil-okullari-karsilastirma/atlas-logo.webp', prices: { '1ay': 1700, '3ay': 4620, '6ay': 7920 } },
  { name: 'Clubclass Malta', logo: '/malta-dil-okullari-karsilastirma/Clubclass-malta.png', prices: { '1ay': 1250, '3ay': 3272, '6ay': 6026 } },
  { name: 'Gateway Malta', logo: '/malta-dil-okullari-karsilastirma/gateway-malta.png', prices: { '1ay': 1384, '3ay': 3360, '6ay': 6480 } },
  { name: 'BELS Malta', logo: '/malta-dil-okullari-karsilastirma/belsmalta.png', prices: { '1ay': 1660, '3ay': 4320, '6ay': 8640 } },
];

export default function Hero() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Son güncelleme tarihi - İstanbul saatine göre
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ];
    const now = new Date();
    const istanbulDate = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    const day = istanbulDate.getDate();
    const month = months[istanbulDate.getMonth()];
    const year = istanbulDate.getFullYear();
    setLastUpdated(`${day} ${month} ${year}`);
  }, []);

  const dateModified = new Date().toISOString().split('T')[0];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Sol Kolon - Metin */}
          <div>
            <header className="mb-6">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
                Malta Dil Okulu Fiyatları 2026
              </h1>
            </header>

            <div className="mb-6 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              <p>
                Malta dil okulu fiyatları, <strong>2026 yılı itibarıyla okuldan okula, eğitim süresine ve tercih edilen programa göre değişiklik göstermektedir</strong>. Bu sayfada <strong>EC Malta, ESE Malta, IELS Malta, ACE Malta, AM Language, inlingua Malta, Atlas Malta, Clubclass Malta, Gateway Malta ve BELS Malta</strong> için 2026 yılı güncel ve gerçek Malta dil okulu fiyatları, okul okul karşılaştırmalı olarak yer almaktadır.
              </p>

              <p>
                Bu sayfada yer alan tüm rakamlar, <strong>dil okullarının eğitim ücretleri temel alınarak hesaplanan; kayıt, materyal ve paket kapsamındaki tüm zorunlu bedeller dâhil edilerek sunulan her şey dahil Malta dil okulu fiyatlarıdır</strong>. Amaç, Malta'daki dil okulları arasındaki fiyat farklarını gizlemeden, aynı hesaplama mantığıyla net biçimde karşılaştırmanı sağlamaktır.
              </p>

              <p>
                Bu içerik, <strong>Malta dil okulu fiyatlarını okul okul karşılaştırmak ve 1 ay, 3 ay, 6 ay gibi farklı sürelerde hangi okulun yaklaşık ne kadar bütçe gerektirdiğini açık ve gerçek rakamlarla görmek isteyenler</strong> için hazırlanmıştır.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Son güncelleme: <time dateTime={dateModified} className="font-semibold">{lastUpdated || new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </p>

              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-slate-600">
                  <li>
                    <Link href="/malta-dil-okullari" className="hover:text-slate-900 hover:underline">
                      Malta Dil Okulları
                    </Link>
                  </li>
                  <li className="text-slate-400" aria-hidden="true">
                    ›
                  </li>
                  <li>
                    <Link href="/malta-dil-okulu-fiyatlari" className="hover:text-slate-900 hover:underline">
                      Malta Dil Okulu Fiyatları
                    </Link>
                  </li>
                </ol>
              </nav>

              <div>
                <a
                  href="https://wa.me/35699143066?text=Merhaba,%20Malta%20dil%20okulu%20fiyatlar%C4%B1%20ve%20kampanyalar%C4%B1%20hakk%C4%B1nda%20an%C4%B1nda%20fiyat%20alabilir%20miyim?"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Malta dil okulu fiyatları ve kampanyaları hakkında WhatsApp ile anında fiyat al"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  Malta Dil Okulu Fiyatını Netleştir
                </a>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Tablo */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
                  Malta Dil Okulu Fiyatları 2026 – Haftalık ve Aylık
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-700 speakable-fiyat-araligi">
                  Malta dil okulu fiyatları 2026 yılı için, haftalık ve aylık eğitim süreleri baz alınarak okul okul karşılaştırmalı şekilde aşağıdaki tabloda yer almaktadır. <strong>2026 yılında Malta dil okulu fiyatları, her şey dahil paket toplamı olarak 1 ay için 1.250€–1.840€, 3 ay için 3.272€–4.773€, 6 ay için ise 6.026€–9.187€ aralığında değişmektedir.</strong>
                </p>
              </div>

              <div className="overflow-x-auto lg:max-h-[600px] lg:overflow-y-auto">
                <table id="fiyat-tablolari" className="w-full" itemScope itemType="https://schema.org/Table">
                  <caption className="sr-only">
                    Malta Dil Okulu Fiyatları 2026 - 1 Ay, 3 Ay ve 6 Aylık Eğitim Paket Fiyatları Karşılaştırma Tablosu
                  </caption>
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                        Okul
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                        1 Ay (4 Hafta)
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                        3 Ay (12 Hafta)
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                        6 Ay (24 Hafta)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {schools.map((school) => (
                      <tr key={school.name} className="transition-colors hover:bg-slate-50/50" itemScope itemType="https://schema.org/Offer">
                        <td className="px-4 py-3" itemProp="name">
                          <div className="flex items-center gap-2">
                            <Image
                              src={school.logo}
                              alt={`${school.name} logo`}
                              width={24}
                              height={24}
                              className="h-5 w-5 flex-shrink-0 object-contain"
                            />
                            <span className="text-sm font-semibold text-slate-900">{school.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                          <span itemProp="price" content={school.prices['1ay']} className="font-semibold text-slate-900">{school.prices['1ay'].toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="1 ay" />
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                          <span itemProp="price" content={school.prices['3ay']}>{school.prices['3ay'].toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="3 ay" />
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-slate-700" itemScope itemType="https://schema.org/UnitPriceSpecification">
                          <span itemProp="price" content={school.prices['6ay']}>{school.prices['6ay'].toLocaleString('tr-TR')}€</span>
                          <meta itemProp="priceCurrency" content="EUR" />
                          <meta itemProp="unitText" content="6 ay" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 pt-4">
                <p className="text-xs leading-relaxed text-slate-600">
                  Yukarıdaki tabloda yer alan Malta dil okulu fiyatları, 2026 yılı için 1 ay, 3 ay ve 6 aylık eğitim süreleri baz alınarak hesaplanmış her şey dahil paket ücretlerini göstermektedir. Tüm okullar aynı hesaplama kriterleriyle listelenmiştir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
