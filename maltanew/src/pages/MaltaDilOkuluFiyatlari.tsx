import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/MaltaDilOkuluFiyatlari.css';

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

export default function MaltaDilOkuluFiyatlari() {
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
    <main className="malta-fiyat-main">
      <section className="malta-fiyat-hero">
        <div className="malta-fiyat-hero-container">
          <div className="malta-fiyat-hero-grid">
            {/* Sol Kolon - Metin */}
            <div className="malta-fiyat-hero-text">
              <header className="malta-fiyat-hero-header">
                <h1 className="malta-fiyat-hero-title">
                  Malta Dil Okulu Fiyatları 2026
                </h1>
              </header>

              <div className="malta-fiyat-hero-description-wrapper">
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

              <div className="malta-fiyat-hero-meta">
                <p className="malta-fiyat-hero-update">
                  Son güncelleme: <time dateTime={dateModified} className="malta-fiyat-hero-update-time">{lastUpdated || new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </p>

                <nav aria-label="Breadcrumb">
                  <ol className="malta-fiyat-hero-breadcrumb">
                    <li>
                      <Link to="/malta-dil-okullari" className="malta-fiyat-hero-breadcrumb-link">
                        Malta Dil Okulları
                      </Link>
                    </li>
                    <li className="malta-fiyat-hero-breadcrumb-separator" aria-hidden="true">
                      ›
                    </li>
                    <li>
                      <Link to="/malta-dil-okulu-fiyatlari" className="malta-fiyat-hero-breadcrumb-link">
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
                    className="malta-fiyat-hero-cta-button"
                  >
                    Malta Dil Okulu Fiyatını Netleştir
                  </a>
                </div>
              </div>
            </div>

            {/* Sağ Kolon - Tablo */}
            <div className="malta-fiyat-hero-table-wrapper">
              <div className="malta-fiyat-hero-table-card">
                <div className="malta-fiyat-hero-table-header">
                  <h2 className="malta-fiyat-hero-table-title">
                    Malta Dil Okulu Fiyatları 2026 – Haftalık ve Aylık
                  </h2>
                  <p className="malta-fiyat-hero-table-description speakable-fiyat-araligi">
                    Malta dil okulu fiyatları 2026 yılı için, haftalık ve aylık eğitim süreleri baz alınarak okul okul karşılaştırmalı şekilde aşağıdaki tabloda yer almaktadır. <strong>2026 yılında Malta dil okulu fiyatları, her şey dahil paket toplamı olarak 1 ay için 1.250€–1.840€, 3 ay için 3.272€–4.773€, 6 ay için ise 6.026€–9.187€ aralığında değişmektedir.</strong>
                  </p>
                </div>

                <div className="malta-fiyat-hero-table-scroll">
                  <table id="fiyat-tablolari" className="malta-fiyat-hero-table" itemScope itemType="https://schema.org/Table">
                    <caption className="malta-fiyat-hero-table-caption">
                      Malta Dil Okulu Fiyatları 2026 - 1 Ay, 3 Ay ve 6 Aylık Eğitim Paket Fiyatları Karşılaştırma Tablosu
                    </caption>
                    <thead className="malta-fiyat-hero-table-thead">
                      <tr>
                        <th scope="col" className="malta-fiyat-hero-table-th malta-fiyat-hero-table-th-school">
                          Okul
                        </th>
                        <th scope="col" className="malta-fiyat-hero-table-th">
                          <span className="malta-fiyat-hero-table-th-full">1 Ay (4 Hafta)</span>
                          <span className="malta-fiyat-hero-table-th-mobile">1 Ay</span>
                        </th>
                        <th scope="col" className="malta-fiyat-hero-table-th">
                          <span className="malta-fiyat-hero-table-th-full">3 Ay (12 Hafta)</span>
                          <span className="malta-fiyat-hero-table-th-mobile">3 Ay</span>
                        </th>
                        <th scope="col" className="malta-fiyat-hero-table-th">
                          <span className="malta-fiyat-hero-table-th-full">6 Ay (24 Hafta)</span>
                          <span className="malta-fiyat-hero-table-th-mobile">6 Ay</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="malta-fiyat-hero-table-tbody">
                      {schools.map((school) => (
                        <tr key={school.name} className="malta-fiyat-hero-table-row" itemScope itemType="https://schema.org/Offer">
                          <td className="malta-fiyat-hero-table-td malta-fiyat-hero-table-td-school" itemProp="name">
                            <div className="malta-fiyat-hero-table-school-info">
                              <img
                                src={school.logo}
                                alt={`${school.name} logo`}
                                className="malta-fiyat-hero-table-school-logo"
                              />
                              <span className="malta-fiyat-hero-table-school-name">{school.name}</span>
                            </div>
                          </td>
                          <td className="malta-fiyat-hero-table-td malta-fiyat-hero-table-td-price" itemScope itemType="https://schema.org/UnitPriceSpecification">
                            <span itemProp="price" content={school.prices['1ay']} className="malta-fiyat-hero-table-price-value">{school.prices['1ay'].toLocaleString('tr-TR')}€</span>
                            <meta itemProp="priceCurrency" content="EUR" />
                            <meta itemProp="unitText" content="1 ay" />
                          </td>
                          <td className="malta-fiyat-hero-table-td malta-fiyat-hero-table-td-price" itemScope itemType="https://schema.org/UnitPriceSpecification">
                            <span itemProp="price" content={school.prices['3ay']} className="malta-fiyat-hero-table-price-value">{school.prices['3ay'].toLocaleString('tr-TR')}€</span>
                            <meta itemProp="priceCurrency" content="EUR" />
                            <meta itemProp="unitText" content="3 ay" />
                          </td>
                          <td className="malta-fiyat-hero-table-td malta-fiyat-hero-table-td-price" itemScope itemType="https://schema.org/UnitPriceSpecification">
                            <span itemProp="price" content={school.prices['6ay']} className="malta-fiyat-hero-table-price-value">{school.prices['6ay'].toLocaleString('tr-TR')}€</span>
                            <meta itemProp="priceCurrency" content="EUR" />
                            <meta itemProp="unitText" content="6 ay" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="malta-fiyat-hero-table-footer">
                  <p className="malta-fiyat-hero-table-footer-text">
                    Yukarıdaki tabloda yer alan Malta dil okulu fiyatları, 2026 yılı için 1 ay, 3 ay ve 6 aylık eğitim süreleri baz alınarak hesaplanmış her şey dahil paket ücretlerini göstermektedir. Tüm okullar aynı hesaplama kriterleriyle listelenmiştir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
