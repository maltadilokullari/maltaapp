import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Iletisim.css';

export default function Iletisim() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateModified, setDateModified] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormMessage(null);
    
    setTimeout(() => {
      setFormSubmitting(false);
      setFormMessage({ type: 'success', text: 'Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ContactPage',
                '@id': 'https://maltadilokuluingilizce.com/iletisim/#contactpage',
                url: 'https://maltadilokuluingilizce.com/iletisim',
                name: 'İletişim | Malta Dil Okulları',
              },
            ],
          }),
        }}
      />
      <main className="iletisim-main">
        <section className="iletisim-hero">
          <div className="iletisim-container">
            <nav aria-label="Breadcrumb" className="iletisim-breadcrumb">
              <ol className="iletisim-breadcrumb-list">
                <li>
                  <Link to="/malta-dil-okullari">Malta Dil Okulları</Link>
                </li>
                <li>
                  <span>›</span>
                </li>
                <li>
                  <Link to="/iletisim">Malta Dil Okulları İletişim</Link>
                </li>
              </ol>
            </nav>

            <div className="iletisim-hero-content">
              <div className="iletisim-hero-text">
                <h1 className="iletisim-title">İletişim | Malta Dil Okulları</h1>
                <h2 className="iletisim-subtitle">
                  2026 döneminde Malta dil okulu başvuru ve kayıt sürecini doğru yerden başlatın.
                </h2>
                <div className="iletisim-description">
                  <p>
                    Malta dil okullarıyla ilgili iletişime geçmek isteyen birçok öğrenci aynı soruyla geliyor: 'Nereden başlayacağım?'
                    Bu sayfa tam olarak bunun için hazırlandı.
                  </p>
                  <p>
                    Malta dil okulu danışmanlığı kapsamında; hangi okulun size uygun olduğunu, kaç hafta kalmanız gerektiğini 
                    ve başvuru/kayıt sürecinin nasıl ilerleyeceğini netleştiriyoruz.
                  </p>
                </div>
                <div className="iletisim-cta">
                  <a href="tel:+905439632416" className="iletisim-button iletisim-button-primary">
                    Ücretsiz Danışmanlık Al
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,%20Malta%20dil%20okulu%20hakkında%20bilgi%20almak%20istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="iletisim-button iletisim-button-whatsapp"
                  >
                    WhatsApp'tan Yaz
                  </a>
                </div>
                <div className="iletisim-update">
                  <p>
                    Son güncelleme:{' '}
                    <time dateTime={dateModified || new Date().toISOString().split('T')[0]}>
                      {lastUpdated || new Date().toLocaleDateString('tr-TR')}
                    </time>
                  </p>
                </div>
              </div>

              <div className="iletisim-form-wrapper">
                <div className="iletisim-form-card">
                  <h2 className="iletisim-form-title">Malta Dil Okulları Ücretsiz Bilgi Formu</h2>
                  <p className="iletisim-form-subtitle">
                    Başvuru ve kayıt sürecini başlatmak için birkaç bilgi yeterli.
                  </p>
                  <form className="iletisim-form" onSubmit={handleSubmit}>
                    <div className="iletisim-form-group">
                      <label htmlFor="fullName" className="iletisim-form-label">
                        Adınız Soyadınız *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        className="iletisim-form-input"
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div className="iletisim-form-group">
                      <label htmlFor="phone" className="iletisim-form-label">
                        Telefon Numaranız *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="iletisim-form-input"
                        placeholder="05xx xxx xx xx"
                      />
                    </div>
                    <div className="iletisim-form-group">
                      <label htmlFor="email" className="iletisim-form-label">
                        E-posta Adresiniz *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="iletisim-form-input"
                        placeholder="ornek@eposta.com"
                      />
                    </div>
                    <div className="iletisim-form-group">
                      <label htmlFor="duration" className="iletisim-form-label">
                        Süre Seçimi
                      </label>
                      <select id="duration" name="duration" className="iletisim-form-input">
                        <option value="">Seçiniz</option>
                        <option value="2-4-hafta">2-4 Hafta</option>
                        <option value="5-8-hafta">5-8 Hafta</option>
                        <option value="9-12-hafta">9-12 Hafta</option>
                        <option value="13-24-hafta">13-24 Hafta</option>
                        <option value="25-hafta-ve-uzeri">25 Hafta ve Üzeri</option>
                      </select>
                    </div>
                    <div className="iletisim-form-group">
                      <label htmlFor="when" className="iletisim-form-label">
                        Ne Zaman?
                      </label>
                      <select id="when" name="when" className="iletisim-form-input">
                        <option value="">Seçiniz</option>
                        <option value="hemen">Hemen</option>
                        <option value="1-3-ay">1-3 Ay İçinde</option>
                        <option value="3-6-ay">3-6 Ay İçinde</option>
                        <option value="6-ay-ve-uzeri">6 Ay ve Üzeri</option>
                      </select>
                    </div>
                    <div className="iletisim-form-checkboxes">
                      <label className="iletisim-form-checkbox">
                        <input type="checkbox" name="privacyAccepted" required />
                        <span>Gizlilik hükümlerini kabul ediyorum</span>
                      </label>
                      <label className="iletisim-form-checkbox">
                        <input type="checkbox" name="kvkkRead" required />
                        <span>KVKK aydınlatma metnini okudum</span>
                      </label>
                    </div>
                    {formMessage && (
                      <div className={`iletisim-form-message ${formMessage.type}`}>
                        {formMessage.text}
                      </div>
                    )}
                    <button type="submit" disabled={formSubmitting} className="iletisim-form-button">
                      {formSubmitting ? 'Gönderiliyor...' : 'Ön Bilgilendirme Al'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="iletisim-contact-info">
          <div className="iletisim-container">
            <h2 className="iletisim-section-title">Malta Dil Okulları İletişim Bilgileri</h2>
            <div className="iletisim-contact-grid">
              <div className="iletisim-contact-card">
                <h3 className="iletisim-contact-card-title">Malta Dil Okulları Türkiye İletişim</h3>
                <a href="tel:+905439632416" className="iletisim-contact-phone">
                  +90 543 963 24 16
                </a>
                <p className="iletisim-contact-desc">Türkiye'den Malta dil okulu başvuru ve danışmanlık için</p>
              </div>
              <div className="iletisim-contact-card">
                <h3 className="iletisim-contact-card-title">Malta Dil Okulları Malta Ofisi</h3>
                <a href="tel:+35699143066" className="iletisim-contact-phone">
                  +356 99 14 30 66
                </a>
                <p className="iletisim-contact-desc">Malta'da yerel ekibimizle birebir iletişim</p>
              </div>
              <div className="iletisim-contact-card">
                <h3 className="iletisim-contact-card-title">Malta Dil Okulları E-posta</h3>
                <a href="mailto:bilgi@maltadilokuluingilizce.com" className="iletisim-contact-email">
                  bilgi@maltadilokuluingilizce.com
                </a>
                <p className="iletisim-contact-desc">Kayıt, vize ve program detayları için</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
