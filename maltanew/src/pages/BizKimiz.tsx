import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/BizKimiz.css';

export default function BizKimiz() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateModified, setDateModified] = useState('');

  useEffect(() => {
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
    const isoDate = istanbulDate.toISOString().split('T')[0];
    setDateModified(isoDate);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'AboutPage',
                '@id': 'https://maltadilokuluingilizce.com/biz-kimiz/#aboutpage',
                url: 'https://maltadilokuluingilizce.com/biz-kimiz',
                name: 'Biz Kimiz? | Malta Dil Okulu İngilizce',
                description: 'Malta\'da 8 yıldır yaşayan, dil okullarında eğitim almış ve öğrenci danışmanlığı konusunda deneyimli ekibimiz hakkında bilgi.',
              },
            ],
          }),
        }}
      />
      <main className="bizkimiz-main">
        <section className="bizkimiz-hero">
          <div className="bizkimiz-container">
            <nav aria-label="Breadcrumb" className="bizkimiz-breadcrumb">
              <ol className="bizkimiz-breadcrumb-list">
                <li>
                  <Link to="/malta-dil-okullari">Malta Dil Okulları</Link>
                </li>
                <li>
                  <span>›</span>
                </li>
                <li>
                  <Link to="/biz-kimiz">Biz Kimiz?</Link>
                </li>
              </ol>
            </nav>

            <div className="bizkimiz-hero-content">
              <div className="bizkimiz-hero-image">
                <img
                  src="/malta-hizmetler/biz-kimiz-hero.webp"
                  alt="malta dil okulları danışmanlık ekibi"
                  className="bizkimiz-image"
                />
              </div>
              <div className="bizkimiz-hero-text">
                <h1 className="bizkimiz-title">Biz Kimiz?</h1>
                <div className="bizkimiz-description">
                  <p>
                    Malta'ya gelmeden önce kafanızın karışık olduğunu biliyoruz.
                    <br />
                    Hangi okul? Nerede kalırım? Vize çıkar mı? Yalnız kalır mıyım?
                  </p>
                  <p>
                    Çünkü <strong>biz de bu soruları sorduk</strong>.
                  </p>
                  <p>
                    Malta'da <strong>8 yıldır yaşıyoruz</strong>. Öğrenci olduk, dil okullarında eğitim aldık, 
                    Erasmus Stajı ve staj programlarında yer aldık. Bu süreci sadece anlatmadık, <strong>birebir yaşadık</strong>.
                  </p>
                  <p>
                    Bugün okul, vize, konaklama ve transfer sürecinizi uzaktan yönlendiren bir acenta değil; 
                    <strong>Malta'da yaşayan</strong> ve sizin adınıza süreci takip eden <strong>gerçek bir ekip</strong> olarak yanınızdayız.
                  </p>
                  <p>
                    <strong>Malta'ya indiğiniz andan Türkiye'ye dönüşünüze kadar</strong> bu süreci <strong>birlikte yürütüyoruz</strong>.
                  </p>
                </div>
                <div className="bizkimiz-cta">
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Malta%20dil%20okulu%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bizkimiz-button bizkimiz-button-primary"
                  >
                    Ücretsiz Danışmanlık Al
                  </a>
                  <Link to="/#hizmetler" className="bizkimiz-button bizkimiz-button-secondary">
                    Hizmetlerimizi İncele
                  </Link>
                </div>
                <div className="bizkimiz-update">
                  <p>
                    Son güncelleme:{' '}
                    <time dateTime={dateModified || new Date().toISOString().split('T')[0]}>
                      {lastUpdated || new Date().toLocaleDateString('tr-TR')}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bizkimiz-what">
          <div className="bizkimiz-container">
            <h2 className="bizkimiz-section-title">Biz ne yapıyoruz?</h2>
            <div className="bizkimiz-what-content">
              <p>
                Malta'ya gelmeden önce <strong>okulunuzu ve konaklamanızı ücretsiz planlıyoruz</strong>.
                Vize sürecinde evraklardan başvuru adımlarına kadar <strong>ücretsiz vize danışmanlığı</strong> veriyoruz.
              </p>
              <p>
                Malta'ya geldiğinizde sizi karşılıyor, <strong>ücretsiz transferinizi</strong> sağlıyoruz.
                Eğitim süreci boyunca (başlangıçtan bitişe kadar) <strong>Malta'daki ekibimizle yanınızda oluyoruz</strong>; 
                bir sorun çıktığında <strong>acil destek ekibimiz</strong> devreye giriyor.
              </p>
              <p>
                Malta'da nerede ne yenir, nereler gezilir, hangi aktiviteler var…
                Bunların hepsinde de size rehberlik ediyoruz.
                Çünkü <strong>Malta'yı 8 yıldır yaşıyoruz</strong> ve <strong>Malta–Türkiye ekip yapımızla</strong> 
                süreci <strong>profesyonel şekilde</strong> yürütüyoruz.
              </p>
            </div>
            <div className="bizkimiz-what-cta">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Malta%20dil%20okulu%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="bizkimiz-button bizkimiz-button-primary"
              >
                Ücretsiz Bilgi Al
              </a>
            </div>
          </div>
        </section>

        <section className="bizkimiz-services">
          <div className="bizkimiz-service-item">
            <div className="bizkimiz-container">
              <div className="bizkimiz-service-content">
                <div className="bizkimiz-service-image">
                  <img
                    src="/malta-hizmetler/malta-dil-okullari.webp"
                    alt="malta dil okulları"
                    className="bizkimiz-image"
                  />
                </div>
                <div className="bizkimiz-service-text">
                  <h2 className="bizkimiz-service-title">Malta Dil Okullarını Birlikte Seçiyoruz</h2>
                  <div className="bizkimiz-service-description">
                    <p>
                      Malta'da çok sayıda dil okulu var ve internetten bakınca hepsi iyi görünüyor.
                      Ama iş pratiğe geldiğinde; <strong>okulun öğrenci profili, sınıf yapısı, öğretmen kalitesi ve bulunduğu bölge</strong> çok fark yaratıyor.
                    </p>
                    <p>
                      Biz okulları <strong>katalogdan değil, içeriden tanıyoruz</strong>.
                      Hangi okul kime uygundur, hangisi sadece reklamda iyidir, bunları açık açık anlatıyoruz.
                    </p>
                    <p>
                      Öğrenciyi en pahalıya ya da en ucuz olana yönlendirmiyoruz.
                      <strong> Gerçekten ihtiyacına uyan okulu bulmaya</strong> çalışıyoruz.
                      Ve bunu <strong>ücretsiz</strong> yapıyoruz.
                    </p>
                  </div>
                  <div className="bizkimiz-service-link">
                    <Link to="/malta-dil-okullari" className="bizkimiz-button bizkimiz-button-primary">
                      Malta Dil Okulları Hakkında Bilgi Al
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bizkimiz-service-item bizkimiz-service-item-alt">
            <div className="bizkimiz-container">
              <div className="bizkimiz-service-content bizkimiz-service-content-reverse">
                <div className="bizkimiz-service-image">
                  <img
                    src="/malta-hizmetler/malta-dil-okulu-fiyatlari.webp"
                    alt="malta dil okulu fiyatları"
                    className="bizkimiz-image"
                  />
                </div>
                <div className="bizkimiz-service-text">
                  <h2 className="bizkimiz-service-title">Malta Dil Okulu Fiyatlarını Şeffaf Anlatıyoruz</h2>
                  <div className="bizkimiz-service-description">
                    <p>
                      Öğrencilerin en çok zorlandığı konu fiyatlar.
                      Çünkü çoğu zaman sadece okul ücreti söyleniyor, sonra masraf masraf ekleniyor.
                    </p>
                    <p>
                      <strong>Biz bu şekilde çalışmıyoruz</strong>.
                    </p>
                    <p>
                      Malta dil okulu fiyatlarını anlatırken; okul ücreti, konaklama, kayıt bedelleri, dönemsel kampanyalar ve 
                      <strong>toplam maliyeti en baştan</strong> konuşuyoruz.
                    </p>
                    <p>
                      Sonradan "bunu da ödeyeceksiniz" denmesini istemiyoruz.
                      <strong> Öğrenci, bütçesini net bilerek karar versin</strong> istiyoruz.
                    </p>
                  </div>
                  <div className="bizkimiz-service-link">
                    <Link to="/malta-dil-okulu-fiyatlari" className="bizkimiz-button bizkimiz-button-primary">
                      Güncel Malta Dil Okulu Fiyatlarını Gör
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
