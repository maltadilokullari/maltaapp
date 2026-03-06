import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
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
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitting(false);
      setFormMessage({ type: 'success', text: 'Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const datePublished = '2026-01-01';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://maltadilokuluingilizce.com/#website",
        url: "https://maltadilokuluingilizce.com/",
        name: "Malta Dil Okulu İngilizce",
        description: "Malta dil okulları 2026 karşılaştırması. Hangi okul kime uygun, program temposu, bölgeler, fiyatlar ve vize süreci hakkında net rehber.",
        inLanguage: "tr-TR",
        publisher: {
          "@id": "https://maltadilokuluingilizce.com/#organization",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://maltadilokuluingilizce.com/#organization",
        name: "Malta Dil Okulu İngilizce",
        url: "https://maltadilokuluingilizce.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://maltadilokuluingilizce.com/logo-header.png",
          width: 1200,
          height: 630,
        },
        description: "Malta dil okulları danışmanlık, başvuru ve kayıt hizmetleri. Malta'da 8 yıldır yaşayan ekibimizle ücretsiz danışmanlık, okul seçimi, vize danışmanlığı ve öğrenci destek hizmetleri sunuyoruz.",
        foundingDate: "2016",
        foundingLocation: {
          "@type": "Place",
          addressCountry: "MT",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Turkey",
            identifier: "TR",
          },
          {
            "@type": "Country",
            name: "Malta",
            identifier: "MT",
          },
        ],
        knowsAbout: [
          "Malta Dil Okulları",
          "Malta Öğrenci Vizesi",
          "Malta Konaklama",
          "Malta Work and Study",
          "İngilizce Dil Eğitimi",
          "Malta Öğrenci Yaşamı",
          "Malta Dil Okulu Başvuru",
          "Malta Dil Okulu Kayıt",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+905439632416",
            contactType: "Customer Service",
            areaServed: {
              "@type": "Country",
              identifier: "TR",
            },
            availableLanguage: ["tr", "en"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+35699143066",
            contactType: "Customer Service",
            areaServed: {
              "@type": "Country",
              identifier: "MT",
            },
            availableLanguage: ["tr", "en"],
          },
          {
            "@type": "ContactPoint",
            email: "bilgi@maltadilokuluingilizce.com",
            contactType: "Customer Service",
            areaServed: [
              {
                "@type": "Country",
                identifier: "TR",
              },
              {
                "@type": "Country",
                identifier: "MT",
              },
            ],
            availableLanguage: ["tr", "en"],
          },
        ],
        sameAs: [],
      },
      {
        "@type": "WebPage",
        "@id": "https://maltadilokuluingilizce.com/#webpage",
        url: "https://maltadilokuluingilizce.com/",
        name: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026",
        description: "Malta dil okulları 2026 güncel karşılaştırması. ESE, EC, IELTS, ACE ve diğer okulların program temposu, bölgeler, fiyatlar ve vize süreci.",
        isPartOf: {
          "@id": "https://maltadilokuluingilizce.com/#website",
        },
        breadcrumb: {
          "@id": "https://maltadilokuluingilizce.com/#breadcrumb",
        },
        mainEntity: {
          "@id": "https://maltadilokuluingilizce.com/#home-article",
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".speakable-home-hero", ".speakable-home-summary"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://maltadilokuluingilizce.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Anasayfa",
            item: "https://maltadilokuluingilizce.com/",
          },
        ],
      },
      {
        "@type": "Article",
        "@id": "https://maltadilokuluingilizce.com/#home-article",
        headline: "Malta Dil Okulu Seçimi ve İngilizce Eğitimi (2026)",
        description: "Malta'da dil okulu seçimi için tarafsız karşılaştırma: programlar, süreç, akreditasyonlar ve karar kriterleri (2026).",
        author: {
          "@id": "https://maltadilokuluingilizce.com/#organization",
        },
        publisher: {
          "@id": "https://maltadilokuluingilizce.com/#organization",
        },
        mainEntityOfPage: {
          "@id": "https://maltadilokuluingilizce.com/#webpage",
        },
        datePublished: datePublished,
        dateModified: dateModified,
      },
      {
        "@type": "FAQPage",
        "@id": "https://maltadilokuluingilizce.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Malta dil okulları kimler için uygundur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Malta dil okulları; konuşma pratiğini geliştirmek isteyen, uluslararası sınıflarda İngilizce öğrenmeyi hedefleyen ve sınıf içi etkileşimle ilerlemek isteyen öğrenciler için uygundur. En iyi sonuç, öğrencinin hedefi ile okulun sınıf yapısı ve program temposu uyumlu olduğunda alınır.",
            },
          },
          {
            "@type": "Question",
            name: "Malta'da dil okulu seçerken en kritik konu nedir?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "En kritik konu, okulun popülerliği değil; öğrencinin öğrenme hedefi, program temposu ve sınıf profiliyle uyumudur. Yanlış tempo veya yanlış sınıf yapısı, verimi ciddi şekilde düşürebilir.",
            },
          },
          {
            "@type": "Question",
            name: "Malta dil okulları kaç hafta sürer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Malta'da dil okullarında minimum eğitim süresi genellikle 1 haftadır. Ancak dil gelişimi ve vize süreci açısından 4–12 hafta ve üzeri programlar daha verimli kabul edilir.",
            },
          },
          {
            "@type": "Question",
            name: "Haftalık ders saati mi, program temposu mu daha önemlidir?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Program temposu, haftalık ders saatinden daha belirleyicidir. Aynı saat sayısına sahip iki programdan biri daha yoğun ve disiplinliyken diğeri daha dengeli olabilir. Öğrenci profiline uygun tempo seçimi, ilerlemeyi doğrudan etkiler.",
            },
          },
          {
            "@type": "Question",
            name: "Malta'da 30 yaş üstü öğrenciler için ayrı sınıf var mı?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bazı Malta dil okulları, 30+ veya 40+ yaş grupları için özel sınıflar ve programlar sunar. Bu programlar daha sakin tempo ve benzer yaş profiliyle ilerler.",
            },
          },
          {
            "@type": "Question",
            name: "Malta'daki dil okulları uluslararası tanınıyor mu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet. Malta'daki dil okulları FELTOM, ALTO, EAQUALS gibi uluslararası akreditasyonlara sahiptir. Alınan sertifikalar birçok ülkede eğitim ve kariyer süreçlerinde geçerlidir.",
            },
          },
          {
            "@type": "Question",
            name: "St. Julian's mı Sliema mı eğitim için daha iyi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "St. Julian's daha sosyal ve hareketli bir ortam sunarken, Sliema daha dengeli ve düzenli yaşam sağlar. Bölge seçimi, öğrencinin motivasyonu ve odaklanmasını doğrudan etkileyebilir.",
            },
          },
          {
            "@type": "Question",
            name: "Malta dil okullarında sınıflar kaç kişilik?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sınıflar genellikle 8–12 kişiliktir. Butik okullarda bu sayı daha düşük olabilir. Küçük sınıflar, konuşma pratiği ve birebir ilgi açısından avantaj sağlar.",
            },
          },
          {
            "@type": "Question",
            name: "Malta dil okullarında 'en iyi okul' var mı?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hayır. Malta'da 'en iyi' okuldan ziyade öğrenciye en uygun okul vardır. Doğru okul; öğrencinin hedefi, yaşı, bütçesi ve öğrenme temposuna göre değişir.",
            },
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": "https://maltadilokuluingilizce.com/#howto",
        name: "Malta'da Dil Eğitimi Süreci Nasıl İlerler?",
        description: "Malta'da dil eğitimi yalnızca okul seçimi değildir. Doğru planlama, vize süreci, konaklama ve eğitim boyunca destek gerektirir.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Karar ve Araştırma Aşaması",
            text: "Malta'da dil eğitimi düşünen öğrenciler için ilk adım, hedeflerin ve beklentilerin netleşmesidir. Bu aşamada genel okul ve program yapısı anlaşılır.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Okul ve Program Seçimi",
            text: "Öğrencinin seviyesi, öğrenme temposu ve bütçesine göre Malta'daki uygun dil okulu ve program birlikte belirlenir.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Ön Kayıt ve Kabul Süreci",
            text: "Seçilen okul için kontenjan kontrolü yapılır, ön kayıt süreci başlatılır ve resmi kabul alınır.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Malta Öğrenci Vizesi Süreci",
            text: "Malta öğrenci vizesi için gerekli belgeler hazırlanır, başvuru ve randevu süreci adım adım yönetilir.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Konaklama ve Varış Planlaması",
            text: "Aile yanı, öğrenci yurdu veya apart konaklama seçenekleri planlanır. Malta'ya varış öncesi tüm detaylar netleştirilir.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Malta'ya Varış ve Okula Başlangıç",
            text: "Öğrenci Malta'ya ulaşır, oryantasyon sürecine katılır ve dil eğitimine başlar.",
          },
          {
            "@type": "HowToStep",
            position: 7,
            name: "Eğitim Süresi Boyunca Destek",
            text: "Malta'daki eğitim süresi boyunca öğrencinin ihtiyaç duyabileceği her konuda Türkçe destek ve danışmanlık sağlanır.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="home-main">
        <section 
          className="home-hero"
          style={{ backgroundImage: "url('/hero-malta.jpg')" }}
        >
          <div className="home-hero-container">
            <div className="home-hero-content">
              <div className="home-hero-text">
                <div className="home-hero-text-inner">
                  <h1 className="home-hero-title">
                    Malta Dil Okulu Seçimi ve İngilizce Eğitimi 2026
                  </h1>
                  <p className="home-hero-description speakable-home-hero">
                    Malta dil okulu seçimi, İngilizce eğitimi almak isteyen
                    öğrenciler için en kritik adımdır. Malta'daki okul seçenekleri,
                    program süreleri, güncel fiyatlar ve vize süreci hakkında ön
                    bilgilendirme sunuyoruz.
                  </p>
                  <ul className="home-hero-list">
                    <li>
                      <span className="home-hero-list-dot"></span>
                      <span>
                        8+ yıldır Malta dil okulları konusunda edindiğimiz saha
                        deneyimi
                      </span>
                    </li>
                    <li>
                      <span className="home-hero-list-dot"></span>
                      <span>
                        Okul seçimi ve program karşılaştırmaları için ücretsiz ön
                        bilgilendirme
                      </span>
                    </li>
                    <li>
                      <span className="home-hero-list-dot"></span>
                      <span>
                        Malta öğrenci vizesi süreci için ücretsiz ön destek
                      </span>
                    </li>
                    <li>
                      <span className="home-hero-list-dot"></span>
                      <span>Malta ve Türkiye'de süreçleri takip eden ekip</span>
                    </li>
                  </ul>
                  <div className="home-hero-update">
                    <time dateTime={dateModified || new Date().toISOString().split('T')[0]}>
                      Son güncelleme: {lastUpdated || new Date().toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
              <div className="home-hero-form">
                <div className="home-form-card">
                  <h2 className="home-form-title">Ön Bilgilendirme ve Program Seçimi</h2>
                  <p className="home-form-subtitle">
                    Sana en uygun Malta dil okulu ve program seçeneklerini
                    belirlemek için.
                  </p>
                  <form className="home-form" onSubmit={handleSubmit}>
                    <div className="home-form-group">
                      <label htmlFor="fullName" className="home-form-label">
                        Adınız Soyadınız *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        className="home-form-input"
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div className="home-form-group">
                      <label htmlFor="phone" className="home-form-label">
                        Telefon Numaranız *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="home-form-input"
                        placeholder="05xx xxx xx xx"
                      />
                    </div>
                    <div className="home-form-group">
                      <label htmlFor="email" className="home-form-label">
                        E-posta Adresiniz *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="home-form-input"
                        placeholder="ornek@eposta.com"
                      />
                    </div>
                    <div className="home-form-group">
                      <label htmlFor="duration" className="home-form-label">
                        Süre Seçimi
                      </label>
                      <select id="duration" name="duration" className="home-form-input" defaultValue="">
                        <option value="" disabled>Seçiniz</option>
                        <option value="2-4-hafta">2-4 Hafta</option>
                        <option value="5-8-hafta">5-8 Hafta</option>
                        <option value="9-12-hafta">9-12 Hafta</option>
                        <option value="13-24-hafta">13-24 Hafta</option>
                        <option value="25-hafta-ve-uzeri">25 Hafta ve Üzeri</option>
                      </select>
                    </div>
                    <div className="home-form-group">
                      <label htmlFor="when" className="home-form-label">
                        Ne Zaman?
                      </label>
                      <select id="when" name="when" className="home-form-input" defaultValue="">
                        <option value="" disabled>Seçiniz</option>
                        <option value="hemen">Hemen</option>
                        <option value="1-3-ay">1-3 Ay İçinde</option>
                        <option value="3-6-ay">3-6 Ay İçinde</option>
                        <option value="6-ay-ve-uzeri">6 Ay ve Üzeri</option>
                      </select>
                    </div>
                    <div className="home-form-checkboxes">
                      <label className="home-form-checkbox">
                        <input type="checkbox" name="privacyAccepted" required />
                        <span>Gizlilik hükümlerini kabul ediyorum</span>
                      </label>
                      <label className="home-form-checkbox">
                        <input type="checkbox" name="kvkkRead" required />
                        <span>KVKK aydınlatma metnini okudum</span>
                      </label>
                      <p className="home-form-kvkk-note">
                        Bilgileriniz KVKK kapsamında güvenle işlenir.
                      </p>
                    </div>
                    {formMessage && (
                      <div className={`home-form-message ${formMessage.type}`}>
                        {formMessage.text}
                      </div>
                    )}
                    <button type="submit" disabled={formSubmitting} className="home-form-button">
                      {formSubmitting ? 'Gönderiliyor...' : 'Ön Bilgilendirme Al'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-experience">
          <div className="home-experience-container">
            <h2 className="home-experience-title">
              Malta Dil Okullarında Gerçek Öğrenci Deneyimi ve Sertifikalı Eğitim
            </h2>
            <div className="home-experience-content">
              <div className="home-experience-image">
                <img
                  src="/Malta-dil-okullari.webp"
                  alt="Malta'da İngilizce dil eğitimi alan bir öğrencinin eğitim sürecini tamamlayarak sertifikasını alması"
                  className="home-experience-img"
                />
              </div>
              <div className="home-experience-text">
                <h3 className="home-experience-subtitle">
                  Neden Bizi Tercih Etmelisiniz?
                </h3>
                <p className="home-experience-description">
                  Malta dil okulu seçimi yalnızca okul tercihi değil; eğitim
                  kalitesi, program süresi, konaklama ve vize sürecinin birlikte
                  doğru yönetilmesini gerektirir. Malta'daki dil okullarını yakından
                  tanıyan ekibimizle, öğrencilerin ihtiyaçlarına uygun eğitim
                  planlarını şeffaf ve kontrollü şekilde oluşturuyoruz.
                </p>
                <ul className="home-experience-list">
                  <li>
                    <span className="home-experience-list-dot"></span>
                    <span>Malta dil okulları konusunda doğrudan saha deneyimi</span>
                  </li>
                  <li>
                    <span className="home-experience-list-dot"></span>
                    <span>Ön kayıt veya danışmanlık ücreti olmadan bilgilendirme</span>
                  </li>
                  <li>
                    <span className="home-experience-list-dot"></span>
                    <span>Malta ve Türkiye'de aktif olarak hizmet veren ekip</span>
                  </li>
                  <li>
                    <span className="home-experience-list-dot"></span>
                    <span>Malta öğrenci vizesi için profesyonel danışmanlık desteği</span>
                  </li>
                  <li>
                    <span className="home-experience-list-dot"></span>
                    <span>Eğitim süresi boyunca öğrenciye sürekli destek</span>
                  </li>
                </ul>
                <a
                  href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-experience-button"
                >
                  Danışmandan Bilgi Al
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="home-services">
          <div className="home-services-container">
            <div className="home-services-grid">
              <div className="home-service-card">
                <div className="home-service-icon home-service-icon-blue">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 9.5L12 5l8 4.5v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="home-service-title">En İyi Okullar</h3>
                <p className="home-service-text">
                  Malta dil okulları arasından bölge, bütçe ve eğitim hedefinize
                  göre doğru okulu seçmenize yardımcı olur. Program türleri,
                  ders yoğunluğu ve başlangıç tarihleri gibi kriterleri tek yerde
                  karşılaştırarak karar sürecini sadeleştirir.
                </p>
                <div className="home-service-link-wrapper">
                  <Link to="/malta-dil-okullari" className="home-service-link">
                    Okulları Gör <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="home-service-card">
                <div className="home-service-icon home-service-icon-amber">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M6 8h12l-1.4 12.3A2 2 0 0 1 14.6 22H9.4a2 2 0 0 1-1.99-1.7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="home-service-title">Fiyatlar 2026</h3>
                <p className="home-service-text">
                  Malta dil okulu fiyatları 2026 döneminde okul, program, süre ve
                  sezonlara göre değişir. Güncel fiyat aralıklarını ve paket
                  içeriklerini şeffaf şekilde görerek bütçenize uygun seçenekleri
                  netleştirebilirsiniz.
                </p>
                <div className="home-service-link-wrapper">
                  <Link to="/malta-dil-okulu-fiyatlari" className="home-service-link">
                    Fiyatları İncele <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="home-service-card">
                <div className="home-service-icon home-service-icon-emerald">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 10.5 12 5l8 5.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9.5 22V14.5h5V22" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="home-service-title">Konaklama Seçenekleri</h3>
                <p className="home-service-text">
                  Malta konaklama seçenekleri; yurt, aile yanı ve paylaşımlı ev
                  alternatifleriyle farklı bütçe ve yaşam tarzlarına uyum sağlar.
                  Lokasyon, ulaşım, oda tipi ve giriş-çıkış tarihlerini planlarken
                  en doğru yapıyı seçmenize yardımcı olur.
                </p>
                <div className="home-service-link-wrapper">
                  <Link to="/malta-konaklama" className="home-service-link">
                    Konaklamayı Gör <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="home-service-card">
                <div className="home-service-icon home-service-icon-violet">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M8 9v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="home-service-title">Work & Study</h3>
                <p className="home-service-text">
                  Malta Work & Study seçeneklerinde eğitim planı, kurs süresi ve
                  başvuru koşulları birlikte değerlendirilmelidir. Çalışma ve
                  eğitim hedeflerinize göre program alternatiflerini ve süreç
                  adımlarını daha net görmenizi sağlar.
                </p>
                <div className="home-service-link-wrapper">
                  <Link to="/malta-work-and-study" className="home-service-link">
                    Detayları Gör <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-clarify">
          <div className="home-clarify-container">
            <div className="home-clarify-content">
              <div className="home-clarify-left">
                <h3 className="home-clarify-title">
                  Malta Dil Okulu Seçimini Netleştir
                </h3>
                <p className="home-clarify-description">
                  Malta'da dil okulu ararken en kritik konu; doğru okul, doğru
                  program ve doğru bütçe dengesidir. Biz bu süreci genel
                  bilgilerle değil, Malta'daki okulları sahada tanıyarak
                  netleştiriyoruz.
                </p>
                <div className="home-clarify-image">
                  <img
                    src="/malta-ingilizce-dil-egitimi-ogrenci-sinif-deneyimi.webp"
                    alt="Malta'da İngilizce dil eğitimi alan öğrencilerin sınıf deneyimi"
                    className="home-clarify-img"
                  />
                </div>
              </div>
              <div className="home-clarify-right">
                <h4 className="home-clarify-subtitle">
                  Sen hangisisin?
                </h4>
                <div className="home-clarify-cards">
                  <div className="home-clarify-card">
                    <div className="home-clarify-card-title">
                      İlk kez Malta'ya gideceğim
                    </div>
                    <p className="home-clarify-card-text">
                      Okul seçimi, güvenli başlangıç ve bütçe dengesi
                    </p>
                  </div>
                  <div className="home-clarify-card">
                    <div className="home-clarify-card-title">
                      İngilizcemi hızlı ilerletmek istiyorum
                    </div>
                    <p className="home-clarify-card-text">
                      Yoğun programlar, seviye hedefi ve okul farkları
                    </p>
                  </div>
                  <div className="home-clarify-card">
                    <div className="home-clarify-card-title">
                      Uzun süre / Work & Study düşünüyorum
                    </div>
                    <p className="home-clarify-card-text">
                      Çalışma izni, uzun dönem plan ve vize süreci
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-clarify-cta">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+Malta+Dil+Okulu+seçimi+için+deneyim+odaklı+bir+planlama+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="home-clarify-button"
              >
                Deneyimini Planla
              </a>
            </div>
          </div>
        </section>

        <section className="home-comparison">
          <div className="home-comparison-container">
            <h2 className="home-comparison-title">
              Malta Dil Okulları Karşılaştırması: Hangi Okul Kimin İçin Uygun?
            </h2>
            <div className="home-comparison-intro">
              <p>
                Malta'da dil okulu seçimi; okulun popülerliğinden çok, öğrencinin
                hedefi, öğrenme temposu ve beklentileriyle ilgilidir.
              </p>
              <p>
                Bu bölümde Malta'daki en çok tercih edilen dil okullarını; kimler
                için uygun, kimler için uygun değil başlıklarıyla, sahadaki gerçek
                deneyimlerimize dayanarak karşılaştırıyoruz. Böylece hangi okulun
                size gerçekten uygun olduğunu daha net görebilirsiniz.
              </p>
            </div>
            <div className="home-comparison-grid">
              {/* ESE Malta */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/ese-malta.png"
                    alt="ESE Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">ESE Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  ESE Malta, sosyal ortamı güçlü ve dengeli öğrenme temposu arayan
                  öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle
                  karışık ve pratike dayalıdır; konuşma pratiği doğal şekilde
                  sürecin içine girer.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>İlk kez Malta'da dil okuluna gidecek olanlar</li>
                      <li>Konuşma pratiğini önceliklendiren öğrenciler</li>
                      <li>Sosyal ortamdan öğrenme motivasyonu alanlar</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Çok kısa sürede hızlı seviye atlamak isteyenler</li>
                      <li>Yoğun akademik tempo ve baskı arayanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  ESE Malta, Malta'da istikrarlı ve sosyal bir öğrenme deneyimi
                  arayan öğrenciler için dengeli bir tercih sunar.
                </p>
              </div>

              {/* EC Malta */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/ec-malta.png"
                    alt="EC Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">EC Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  EC Malta, uluslararası bir dil okulu zincirinin Malta'daki
                  temsilcisidir. EC Malta, daha sistemli bir yapı ve dengeli öğrenme
                  temposu arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı
                  genellikle düzenlidir; ders içeriği planlı ilerler ve
                  uluslararası öğrenci profili belirgindir.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>İlk kez Malta'da dil okuluna gidecek olanlar</li>
                      <li>Daha kontrollü ve düzenli bir öğrenme ortamı isteyenler</li>
                      <li>Farklı milliyetlerle öğrenmeyi önemseyen öğrenciler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Çok yoğun ve hızlı ilerleme hedefleyenler</li>
                      <li>Daha serbest ve sosyal ağırlıklı bir ortam arayanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  EC Malta, Malta'da dengeli tempo ve yapı arayan öğrenciler için
                  güvenli bir başlangıç sunar.
                </p>
              </div>

              {/* IELS Malta */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/iels-malta.png"
                    alt="IELS Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">IELS Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  IELS Malta, yoğun ders temposu ve hızlı ilerleme hedefi olan
                  öğrenciler için öne çıkan bir okuldur. Program yapısı daha
                  disiplinlidir; ders temposu yüksektir ve kısa sürede sonuç almak
                  isteyenlere yöneliktir.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Kısa sürede maksimum verim almak isteyenler</li>
                      <li>Yoğun ders temposuna uyum sağlayabilen öğrenciler</li>
                      <li>Hızlı seviye ilerlemesini hedefleyenler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha rahat ve sosyal ağırlıklı bir öğrenme deneyimi arayanlar</li>
                      <li>Düşük tempolu, esnek program isteyenler</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  IELS Malta, Malta'da öğrenme hızını ders süresiyle değil, program
                  temposuyla artırmak isteyen öğrenciler için güçlü bir seçenektir.
                </p>
              </div>

              {/* ACE English */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/ace-english-malta.png"
                    alt="ACE English Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">ACE English Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  ACE English Malta, modern eğitim yaklaşımı ve tempolu ders yapısıyla
                  kısa sürede ilerlemek isteyen öğrenciler için öne çıkan bir okuldur.
                  Programlar disiplinlidir; ders içeriği planlı ve hedef odaklı ilerler.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Kısa sürede ilerleme hedefleyen öğrenciler</li>
                      <li>Tempolu ve yapılandırılmış dersleri tercih edenler</li>
                      <li>Daha modern ve akademik odaklı bir öğrenme ortamı isteyenler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha rahat ve sosyal ağırlıklı bir deneyim arayanlar</li>
                      <li>Düşük tempolu, esnek program beklentisi olanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  ACE English Malta, Malta'da yoğun tempolu ve planlı bir eğitim
                  süreci arayan öğrenciler için net bir seçenek sunar.
                </p>
              </div>

              {/* AM Language */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/am-language-malta.png"
                    alt="AM Language Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">AM Language Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  AM Language Malta Dil Okulu, daha odaklı bir öğrenme ortamı ve
                  dengeli sınıf yapısı arayan öğrenciler için öne çıkan bir okuldur.
                  Program yapısı pratike dayalıdır; sınıflar genellikle daha kontrollü
                  ilerler ve öğrenme süreci yakından takip edilir.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha sakin ve odaklı bir sınıf ortamı arayanlar</li>
                      <li>Konuşma pratiğini düzenli şekilde geliştirmek isteyenler</li>
                      <li>Küçük ölçekli okul yapısını tercih eden öğrenciler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Çok büyük ve kalabalık okul ortamı bekleyenler</li>
                      <li>Yoğun ve hızlı tempolu program arayanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  AM Language Malta Dil Okulu, Malta'da daha butik ve kontrollü bir
                  öğrenme deneyimi arayan öğrenciler için dengeli bir seçenektir.
                </p>
              </div>

              {/* Clubclass */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/Clubclass-malta.png"
                    alt="Clubclass Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">Clubclass Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  Clubclass Malta, daha sakin bir öğrenme ortamı ve dengeli bir tempo
                  arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı genellikle
                  daha düzenlidir; programlar istikrarlı ilerler ve yoğun baskı
                  oluşturmaz.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha sakin ve kontrollü bir sınıf ortamı isteyenler</li>
                      <li>Uzun süreli, istikrarlı ilerlemeyi hedefleyen öğrenciler</li>
                      <li>Beklenti–deneyim dengesini önemseyenler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Çok sosyal ve hareketli bir okul ortamı arayanlar</li>
                      <li>Yoğun ve hızlı ilerleme hedefi olanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  Clubclass Malta, Malta'da daha sade bir yapı içinde istikrarlı öğrenme
                  arayan öğrenciler için dengeli bir seçenektir.
                </p>
              </div>

              {/* Gateway */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/gateway-malta.png"
                    alt="Gateway Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">Gateway Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  Gateway Malta Dil Okulu, daha küçük ölçekli ve sakin bir okul yapısı
                  arayan öğrenciler için öne çıkan bir okuldur. Sınıf ortamı genellikle
                  daha sessizdir; öğrenme süreci bireysel odaklı ve dengeli ilerler.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha sakin ve düşük yoğunluklu bir öğrenme ortamı isteyenler</li>
                      <li>Kalabalık ve çok sosyal okul yapılarından hoşlanmayan öğrenciler</li>
                      <li>Daha bireysel bir sınıf deneyimi arayanlar</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Hareketli ve sosyal ağırlıklı bir okul ortamı arayanlar</li>
                      <li>Yoğun tempolu ve hızlı ilerleme hedefleyenler</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  Gateway Malta Dil Okulu, Malta'da daha sade ve sakin bir öğrenme
                  deneyimi arayan öğrenciler için istikrarlı bir alternatif sunar.
                </p>
              </div>

              {/* Inlingua */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/inlingua-malta.png"
                    alt="inlingua Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">Inlingua Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  inlingua Malta, daha akademik ve yapılandırılmış bir öğrenme yaklaşımı
                  arayan öğrenciler için öne çıkan bir okuldur. Ders içerikleri sistematik
                  ilerler; sınıf ortamı genellikle daha kontrollü ve odaklıdır.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha akademik ve planlı bir öğrenme süreci isteyenler</li>
                      <li>Dil bilgisini yapılandırarak ilerlemeyi tercih eden öğrenciler</li>
                      <li>Daha sakin ve disiplinli sınıf ortamını önemseyenler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Sosyal ağırlıklı ve serbest bir okul deneyimi arayanlar</li>
                      <li>Yoğun ama esnek olmayan programlardan çabuk sıkılanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  inlingua Malta Dil Okulu, Malta'da daha sistemli ve disiplinli bir dil
                  eğitimi arayan öğrenciler için odaklı bir alternatiftir.
                </p>
              </div>

              {/* Atlas */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/atlas-logo.webp"
                    alt="Atlas Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">Atlas Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  Atlas Malta Dil Okulu, daha küçük ölçekli, düzenli ve sakin bir öğrenme
                  ortamı arayan öğrenciler için öne çıkan bir okuldur. Sınıf yapısı
                  genellikle kontrollüdür; öğrenme süreci istikrarlı ilerler ve bireysel
                  takip ön plandadır.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha sakin ve odaklı bir sınıf ortamı isteyenler</li>
                      <li>Küçük ölçekli okul yapısını tercih eden öğrenciler</li>
                      <li>Düzenli ve istikrarlı ilerlemeyi önemseyenler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Çok sosyal ve hareketli okul ortamı arayanlar</li>
                      <li>Yoğun ve hızlı ilerleme beklentisi olanlar</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  Atlas Malta Dil Okulu, Malta'da daha sade ve kontrollü bir yapı içinde
                  istikrarlı öğrenme arayan öğrenciler için dengeli bir alternatiftir.
                </p>
              </div>

              {/* BELS */}
              <div className="home-comparison-card">
                <div className="home-comparison-logo">
                  <img
                    src="/malta-dil-okullari-karsilastirma/belsmalta.png"
                    alt="BELS Malta dil okulu logosu"
                    className="home-comparison-logo-img"
                  />
                </div>
                <h3 className="home-comparison-card-title">BELS Malta Dil Okulu</h3>
                <p className="home-comparison-card-description">
                  BELS Malta Dil Okulu, daha küçük sınıflar ve sakin bir öğrenme ortamı
                  arayan öğrenciler için öne çıkan butik bir dil okuludur. Eğitim yaklaşımı
                  bireysel takibe dayanır; sınıf ortamı genellikle sessiz ve odaklıdır.
                </p>
                <div className="home-comparison-details">
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Daha sakin ve düşük yoğunluklu bir öğrenme ortamı isteyenler</li>
                      <li>Küçük sınıflarda birebir ilgi bekleyen öğrenciler</li>
                      <li>Sosyal ortamdan çok öğrenmeye odaklanmak isteyenler</li>
                    </ul>
                  </div>
                  <div className="home-comparison-detail-group">
                    <div className="home-comparison-detail-title">Kimler için uygun değil?</div>
                    <ul className="home-comparison-detail-list">
                      <li>Büyük ve hareketli okul ortamı arayanlar</li>
                      <li>Yoğun ve hızlı ilerleme hedefleyenler</li>
                    </ul>
                  </div>
                </div>
                <p className="home-comparison-card-note">
                  BELS Malta Dil Okulu, Malta'da daha butik ve bireysel bir dil eğitimi
                  deneyimi arayan öğrenciler için net bir alternatif sunar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-accreditations">
          <div className="home-accreditations-container">
            <div className="home-accreditations-header">
              <h2 className="home-accreditations-title">
                Uluslararası Akreditasyonlara Sahip Malta Dil Okulları
              </h2>
              <p className="home-accreditations-description">
                Malta'daki dil okulları, uluslararası standartlarda eğitim kalitesi ve güvenilirlik sağlayan akreditasyonlara sahiptir.
              </p>
            </div>
            <div className="home-accreditations-grid">
              <div className="home-accreditation-item">
                <img
                  src="/akreditasyonlar/accr_colour_feltom.svg"
                  alt="FELTOM akreditasyonu Malta dil okulu"
                  className="home-accreditation-img"
                />
              </div>
              <div className="home-accreditation-item">
                <img
                  src="/akreditasyonlar/accr_colour_eaquals.svg"
                  alt="EAQUALS akreditasyonu Malta dil okulu"
                  className="home-accreditation-img"
                />
              </div>
              <div className="home-accreditation-item">
                <img
                  src="/akreditasyonlar/accr_colour_elt.svg"
                  alt="ELT akreditasyonu Malta dil okulu"
                  className="home-accreditation-img"
                />
              </div>
              <div className="home-accreditation-item">
                <img
                  src="/akreditasyonlar/accr_colour_ialc.svg"
                  alt="IALC akreditasyonu Malta dil okulu"
                  className="home-accreditation-img"
                />
              </div>
              <div className="home-accreditation-item">
                <img
                  src="/akreditasyonlar/accr_colour_msa.svg"
                  alt="MSA akreditasyonu Malta dil okulu"
                  className="home-accreditation-img"
                />
              </div>
              <div className="home-accreditation-item">
                <img
                  src="/akreditasyonlar/accr_colour_cen-1.svg"
                  alt="CEN akreditasyonu Malta dil okulu"
                  className="home-accreditation-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-cta-container">
            <div className="home-cta-card">
              <div className="home-cta-content">
                <div className="home-cta-text-wrapper">
                  <div className="home-cta-badge">Kararsız kalanlar için</div>
                  <h2 className="home-cta-title">Malta Dil Okulu Seçimini Netleştir</h2>
                  <p className="home-cta-text">
                    Okul türü, öğrenme temposu ve bütçene göre Malta'daki en doğru
                    dil okulunu birlikte netleştirelim. Genel bilgilerle değil,
                    sahadaki gerçek deneyimle.
                  </p>
                </div>
                <div className="home-cta-actions">
                  <a
                    href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-cta-button home-cta-button-primary"
                  >
                    Seçimi Netleştir
                  </a>
                  <div className="home-cta-phone">
                    <div className="home-cta-phone-label">Ya da hemen ara:</div>
                    <a href="tel:+905439632416" className="home-cta-phone-link">
                      +90 543 963 24 16
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-programs">
          <div className="home-programs-container">
            <div className="home-programs-header">
              <h2 className="home-programs-title">
                Malta İngilizce Eğitim Programları (2026)
              </h2>
              <p className="home-programs-description">
                Malta dil okullarında sunulan İngilizce programlarıyla hedefinize göre eğitim alın. Uluslararası akreditasyona sahip kurslarla İngilizcenizi geliştirin.
              </p>
            </div>
            <div className="home-programs-grid">
              {/* Genel İngilizce */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-genel-ingilizce-kursu.webp"
                    alt="Malta genel ingilizce kursu"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Genel İngilizce Kursları</h3>
                  <p className="home-program-text">
                    Temel dil becerilerini dengeli bir şekilde geliştirmek isteyenler için ideal program.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Temel seviye ve pratik</div>
                      <div>Dengeli ilerlemek isteyenler</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* İş İngilizcesi */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-is-ingilizcesi-kursu.webp"
                    alt="Malta iş ingilizcesi kursları"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">İş ve Ticari İngilizce Kursları</h3>
                  <p className="home-program-text">
                    Kariyer hedeflerine yönelik profesyonel İngilizce eğitimi almak isteyenler için.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Kariyer hedefi olanlar</div>
                      <div>Sunum ve iletişim geliştirmek</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yoğun İngilizce */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-yogun-ingilizce-kursu.webp"
                    alt="Malta yoğun ingilizce kursu"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Yoğun İngilizce Kursları</h3>
                  <p className="home-program-text">
                    Hızlı ilerleme hedefleyen ve yüksek tempolu eğitim isteyen öğrenciler için.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Hızlı ilerlemek isteyenler</div>
                      <div>Yüksek tempoya uygunlar</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gençler */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-gencler-icin-ingilizce-kursu.webp"
                    alt="Malta gençler için ingilizce kursları"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Gençler için İngilizce Kursları</h3>
                  <p className="home-program-text">
                    Sosyal öğrenme ve aktiviteli programlar arayan genç öğrenciler için tasarlanmış.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Sosyal öğrenmeyi sevenler</div>
                      <div>Aktiviteli program isteyenler</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 50+ */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-50-yas-uzeri-ingilizce-kursu.webp"
                    alt="Malta 50 yaş üzeri ingilizce kursları"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">50 Yaş ve Üzeri İngilizce Kursları</h3>
                  <p className="home-program-text">
                    Daha sakin tempo ve kültürel deneyim odaklı eğitim arayan yetişkinler için.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Daha sakin tempo isteyenler</div>
                      <div>Kültürel deneyim odaklılar</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Çocuklar */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-cocuklar-icin-ingilizce-kursu.webp"
                    alt="Malta çocuklar için ingilizce kursları"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Çocuklar için İngilizce Kursları</h3>
                  <p className="home-program-text">
                    Güvenli kamp ortamında eğitim almak isteyen 8-15 yaş arası öğrenciler için.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>8–15 yaş öğrenciler</div>
                      <div>Güvenli kamp ortamı</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yaz Okulu */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-yaz-okulu-ingilizce-programi.webp"
                    alt="Malta yaz okulu ingilizce programları"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Yaz Okulu İngilizce Programları</h3>
                  <p className="home-program-text">
                    Yaz döneminde tatil ve eğitimi birleştirmek isteyen öğrenciler için ideal.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Yaz dönemi planlayanlar</div>
                      <div>Tatil + eğitim isteyenler</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Erasmus */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-erasmus-staj-programi.webp"
                    alt="Malta Erasmus staj programları"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Erasmus Staj Programları</h3>
                  <p className="home-program-text">
                    Staj ve dil eğitimini birleştirerek Avrupa deneyimi kazanmak isteyenler için.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Staj + dil isteyenler</div>
                      <div>Avrupa deneyimi hedefleyenler</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work and Study */}
              <div className="home-program-card">
                <div className="home-program-image">
                  <img
                    src="/programlar/malta-work-and-study-programi.webp"
                    alt="Malta work and study programı"
                    className="home-program-img"
                  />
                </div>
                <div className="home-program-content">
                  <h3 className="home-program-title">Work and Study Programı</h3>
                  <p className="home-program-text">
                    Uzun dönem eğitim ve çalışma planı yapmak isteyen öğrenciler için uygun.
                  </p>
                  <div className="home-program-audience">
                    <div className="home-program-audience-label">Kimler için?</div>
                    <div className="home-program-audience-list">
                      <div>Uzun dönem düşünenler</div>
                      <div>Çalışma planı isteyenler</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-process">
          <div className="home-process-container">
            <div className="home-process-header">
              <h2 className="home-process-title">
                Malta'da Dil Eğitimi Süreci Nasıl İlerler? (2026)
              </h2>
              <p className="home-process-description">
                Malta'da dil eğitimi yalnızca okul seçimi değildir. Doğru planlama, vize süreci, konaklama ve eğitim boyunca destek gerektirir. Bu süreci adım adım ve şeffaf şekilde yönetiyoruz.
              </p>
            </div>
            <div className="home-process-steps">
              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-dil-egitimi-karar-arastirma.webp"
                    alt="Malta dil eğitimi karar ve araştırma aşaması"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    1. Karar ve Araştırma Aşaması
                  </h3>
                  <p className="home-process-step-text">
                    Malta'da dil eğitimi düşünen öğrenciler için ilk adım, hedeflerin ve beklentilerin netleşmesidir. Bu aşamada genel okul ve program yapısı anlaşılır.
                  </p>
                </div>
              </div>

              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-dil-okulu-program-secimi.webp"
                    alt="Malta dil okulu program seçimi"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    2. Okul ve Program Seçimi
                  </h3>
                  <p className="home-process-step-text">
                    Öğrencinin seviyesi, öğrenme temposu ve bütçesine göre Malta'daki uygun dil okulu ve program birlikte belirlenir.
                  </p>
                </div>
              </div>

              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-dil-okulu-on-kayit-kabul.webp"
                    alt="Malta dil okulu ön kayıt ve kabul süreci"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    3. Ön Kayıt ve Kabul Süreci
                  </h3>
                  <p className="home-process-step-text">
                    Seçilen okul için kontenjan kontrolü yapılır, ön kayıt süreci başlatılır ve resmi kabul alınır.
                  </p>
                </div>
              </div>

              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-ogrenci-vizesi-sureci.webp"
                    alt="Malta öğrenci vizesi süreci"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    4. Malta Öğrenci Vizesi Süreci
                  </h3>
                  <p className="home-process-step-text">
                    Malta öğrenci vizesi için gerekli belgeler hazırlanır, başvuru ve randevu süreci adım adım yönetilir.{' '}
                    <Link to="/malta-ogrenci-vizesi" className="home-process-step-link">
                      Malta öğrenci vizesi başvuru süreci ve gerekli belgeler
                    </Link>{' '}
                    hakkında detaylı bilgiye sayfamızdan ulaşabilirsin.
                  </p>
                </div>
              </div>

              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-konaklama-ve-varis-planlamasi.webp"
                    alt="Malta konaklama ve varış planlaması"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    5. Konaklama ve Varış Planlaması
                  </h3>
                  <p className="home-process-step-text">
                    Aile yanı, öğrenci yurdu veya apart konaklama seçenekleri planlanır. Malta'ya varış öncesi tüm detaylar netleştirilir.
                  </p>
                </div>
              </div>

              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-varis-okula-baslangic.webp"
                    alt="Malta'ya varış ve okula başlangıç"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    6. Malta'ya Varış ve Okula Başlangıç
                  </h3>
                  <p className="home-process-step-text">
                    Öğrenci Malta'ya ulaşır, oryantasyon sürecine katılır ve dil eğitimine başlar.
                  </p>
                </div>
              </div>

              <div className="home-process-step">
                <div className="home-process-step-image">
                  <img
                    src="/surec/malta-egitim-suresince-destek.webp"
                    alt="Malta eğitim süresi boyunca destek"
                    className="home-process-step-img"
                  />
                </div>
                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">
                    7. Eğitim Süresi Boyunca Destek
                  </h3>
                  <p className="home-process-step-text">
                    Malta'daki eğitim süresi boyunca öğrencinin ihtiyaç duyabileceği her konuda Türkçe destek ve danışmanlık sağlanır.
                  </p>
                </div>
              </div>
            </div>

            <div className="home-process-note">
              <h3 className="home-process-note-title">
                Bu Sürecin Neresindeyiz?
              </h3>
              <p className="home-process-note-text">
                Okul seçiminden vize sürecine, Malta'ya varıştan eğitim süresi boyunca desteğe kadar tüm adımlarda öğrencinin yanındayız. Amacımız satış yapmak değil, süreci net ve güvenli şekilde yönetmektir.
              </p>
            </div>

            <div className="home-process-cta">
              <a
                href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="home-process-button"
              >
                <svg viewBox="0 0 24 24" className="home-process-button-icon" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp'tan Süreci Anlatalım
              </a>
            </div>
          </div>
        </section>

        <section className="home-mistakes">
          <div className="home-mistakes-container">
            <div className="home-mistakes-header">
              <h2 className="home-mistakes-title">
                Malta Dil Okulu Seçerken En Sık Yapılan Yanlış Tercihler (2026)
              </h2>
              <p className="home-mistakes-description">
                Bu hatalar çoğu zaman bilgi eksikliğinden değil, yanlış yönlendirmelerden kaynaklanır.
                Malta'daki dil okullarını sahada tanıdıkça en sık karşılaştığımız noktaları burada paylaşıyoruz.
              </p>
            </div>
            <div className="home-mistakes-content">
              <div className="home-mistakes-image">
                <img
                  src="/surec/malta-dil-okulu-yanlis-tercihler.webp"
                  alt="Malta dil okulu seçerken yapılan yaygın yanlış tercihler hakkında danışmanlık görüşmesi"
                  className="home-mistakes-img"
                />
              </div>
              <div className="home-mistakes-list">
                <div className="home-mistakes-item">
                  <div className="home-mistakes-item-dot"></div>
                  <div>
                    <h3 className="home-mistakes-item-title">
                      Popüler okul herkes için doğru olmayabilir
                    </h3>
                    <p className="home-mistakes-item-text">
                      Yoğun ve sosyal ortamlar bazı öğrenciler için keyifli olsa da, öğrenme hızını düşürebilir.
                    </p>
                  </div>
                </div>
                <div className="home-mistakes-item">
                  <div className="home-mistakes-item-dot"></div>
                  <div>
                    <h3 className="home-mistakes-item-title">
                      Program temposu doğru değerlendirilmez
                    </h3>
                    <p className="home-mistakes-item-text">
                      Yoğun programlar kısa vadede cazip görünür; ancak herkes için sürdürülebilir değildir.
                    </p>
                  </div>
                </div>
                <div className="home-mistakes-item">
                  <div className="home-mistakes-item-dot"></div>
                  <div>
                    <h3 className="home-mistakes-item-title">
                      Yaş ve sınıf profili göz ardı edilir
                    </h3>
                    <p className="home-mistakes-item-text">
                      Sınıf yaş ortalaması ve öğrenci profili, motivasyon ve verim üzerinde doğrudan etkilidir.
                    </p>
                  </div>
                </div>
                <div className="home-mistakes-item">
                  <div className="home-mistakes-item-dot"></div>
                  <div>
                    <h3 className="home-mistakes-item-title">
                      Konum, eğitim kalitesiyle karıştırılır
                    </h3>
                    <p className="home-mistakes-item-text">
                      Merkezi lokasyon yaşamı kolaylaştırır; ancak eğitim kalitesini tek başına belirlemez.
                    </p>
                  </div>
                </div>
                <div className="home-mistakes-item">
                  <div className="home-mistakes-item-dot"></div>
                  <div>
                    <h3 className="home-mistakes-item-title">
                      Konaklama okulun bir parçası sanılır
                    </h3>
                    <p className="home-mistakes-item-text">
                      Konaklama deneyimi çoğu zaman okuldan bağımsızdır ve doğru planlama gerektirir.
                    </p>
                  </div>
                </div>
                <div className="home-mistakes-note">
                  <p className="home-mistakes-note-text">
                    Malta'da doğru dil okulu seçimi, hangi okulu seçeceğinizden çok, hangi okulun sizin için uygun olmadığını bilmekle başlar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hizli-karsilastirma" className="home-table">
          <div className="home-table-container">
            <div className="home-table-header">
              <h2 className="home-table-title">
                Malta'daki Dil Okulları 2026: Kime Uygun, Nerede, Hangi Tempoda?
              </h2>
              <p className="home-table-description speakable-home-summary">
                Bu tablo, Malta'daki dil okullarını popülerliğe göre değil; öğrenci profili, eğitim temposu ve bulunduğu bölgeye göre hızlıca karşılaştırmanız için hazırlanmıştır.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="home-table-desktop">
              <table className="home-table-table">
                <thead>
                  <tr>
                    <th>Okul</th>
                    <th>Kime Uygun</th>
                    <th>Program Temposu</th>
                    <th>Bölge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/ese-malta.png" alt="ESE Malta logo" className="home-table-logo" />
                        <span>ESE Malta</span>
                      </div>
                    </td>
                    <td>Sosyal + dengeli öğrenme isteyenler</td>
                    <td>Dengeli</td>
                    <td>St. Julian's</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/ec-malta.png" alt="EC Malta logo" className="home-table-logo" />
                        <span>EC Malta</span>
                      </div>
                    </td>
                    <td>İlk kez Malta'ya gidenler</td>
                    <td>Dengeli</td>
                    <td>St. Julian's</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/iels-malta.png" alt="IELS Malta logo" className="home-table-logo" />
                        <span>IELS Malta</span>
                      </div>
                    </td>
                    <td>Hızlı ilerlemek isteyenler</td>
                    <td>Yoğun</td>
                    <td>Sliema</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/ace-english-malta.png" alt="ACE Malta logo" className="home-table-logo" />
                        <span>ACE Malta</span>
                      </div>
                    </td>
                    <td>Modern yapı + tempolu eğitim</td>
                    <td>Orta-yoğun</td>
                    <td>St. Julian's</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/am-language-malta.png" alt="AM Language logo" className="home-table-logo" />
                        <span>AM Language</span>
                      </div>
                    </td>
                    <td>Daha odaklı sınıf ortamı arayanlar</td>
                    <td>Dengeli</td>
                    <td>Sliema</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/inlingua-malta.png" alt="inlingua Malta logo" className="home-table-logo" />
                        <span>inlingua Malta</span>
                      </div>
                    </td>
                    <td>Daha sakin + düzenli ilerleme</td>
                    <td>Dengeli</td>
                    <td>Sliema</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/atlas-logo.webp" alt="Atlas Malta logo" className="home-table-logo" />
                        <span>Atlas Malta</span>
                      </div>
                    </td>
                    <td>Butik okul isteyenler</td>
                    <td>Dengeli</td>
                    <td>Pembroke</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/Clubclass-malta.png" alt="Clubclass Malta logo" className="home-table-logo" />
                        <span>Clubclass Malta</span>
                      </div>
                    </td>
                    <td>Uygun bütçe + temel eğitim</td>
                    <td>Dengeli</td>
                    <td>Swieqi</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/gateway-malta.png" alt="Gateway Malta logo" className="home-table-logo" />
                        <span>Gateway Malta</span>
                      </div>
                    </td>
                    <td>Daha ekonomik ve sakin bir ortam arayanlar</td>
                    <td>Dengeli</td>
                    <td>San Gwann</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="home-table-school">
                        <img src="/malta-dil-okullari-karsilastirma/belsmalta.png" alt="BELS Malta logo" className="home-table-logo" />
                        <span>BELS Malta</span>
                      </div>
                    </td>
                    <td>Butik + düşük kalabalık isteyenler</td>
                    <td>Dengeli</td>
                    <td>St. Paul's / Gozo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="home-table-mobile">
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/ese-malta.png" alt="ESE Malta logo" className="home-table-mobile-logo" />
                  <span>ESE Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Sosyal + dengeli öğrenme isteyenler</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>St. Julian's</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/ec-malta.png" alt="EC Malta logo" className="home-table-mobile-logo" />
                  <span>EC Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>İlk kez Malta'ya gidenler</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>St. Julian's</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/iels-malta.png" alt="IELS Malta logo" className="home-table-mobile-logo" />
                  <span>IELS Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Hızlı ilerlemek isteyenler</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Yoğun</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>Sliema</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/ace-english-malta.png" alt="ACE Malta logo" className="home-table-mobile-logo" />
                  <span>ACE Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Modern yapı + tempolu eğitim</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Orta-yoğun</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>St. Julian's</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/am-language-malta.png" alt="AM Language logo" className="home-table-mobile-logo" />
                  <span>AM Language</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Daha odaklı sınıf ortamı arayanlar</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>Sliema</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/inlingua-malta.png" alt="inlingua Malta logo" className="home-table-mobile-logo" />
                  <span>inlingua Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Daha sakin + düzenli ilerleme</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>Sliema</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/atlas-logo.webp" alt="Atlas Malta logo" className="home-table-mobile-logo" />
                  <span>Atlas Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Butik okul isteyenler</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>Pembroke</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/Clubclass-malta.png" alt="Clubclass Malta logo" className="home-table-mobile-logo" />
                  <span>Clubclass Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Uygun bütçe + temel eğitim</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>Swieqi</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/gateway-malta.png" alt="Gateway Malta logo" className="home-table-mobile-logo" />
                  <span>Gateway Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Daha ekonomik ve sakin bir ortam arayanlar</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>San Gwann</div>
                </div>
              </div>
              <div className="home-table-mobile-card">
                <div className="home-table-mobile-header">
                  <img src="/malta-dil-okullari-karsilastirma/belsmalta.png" alt="BELS Malta logo" className="home-table-mobile-logo" />
                  <span>BELS Malta</span>
                </div>
                <div className="home-table-mobile-content">
                  <div><span className="home-table-mobile-label">Kime Uygun: </span>Butik + düşük kalabalık isteyenler</div>
                  <div><span className="home-table-mobile-label">Program Temposu: </span>Dengeli</div>
                  <div><span className="home-table-mobile-label">Bölge: </span>St. Paul's / Gozo</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-faq">
          <div className="home-faq-container">
            <div className="home-faq-header">
              <h2 className="home-faq-title">
                Malta Dil Okulları Hakkında Merak Edilenler
              </h2>
              <p className="home-faq-description">
                Malta dil okulu seçimiyle ilgili en sık sorulan soruları; okul yapısı, program temposu, süre, yaş grupları ve bölge farklarıyla net şekilde yanıtladık.
              </p>
            </div>
            <div className="home-faq-list">
              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta dil okulları kimler için uygundur?
                </summary>
                <div className="home-faq-answer">
                  <strong>Malta dil okulları</strong>; konuşma pratiğini geliştirmek isteyen, uluslararası sınıflarda İngilizce öğrenmeyi hedefleyen ve sınıf içi etkileşimle ilerlemek isteyen öğrenciler için uygundur. En iyi sonuç, öğrencinin hedefi ile okulun <strong>sınıf yapısı</strong> ve <strong>program temposu</strong> uyumlu olduğunda alınır.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta'da dil okulu seçerken en kritik konu nedir?
                </summary>
                <div className="home-faq-answer">
                  En kritik konu, okulun popülerliği değil; öğrencinin <strong>öğrenme hedefi</strong>, <strong>program temposu</strong> ve <strong>sınıf profiliyle</strong> uyumudur. Yanlış tempo veya yanlış sınıf yapısı, verimi ciddi şekilde düşürebilir.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta dil okulları kaç hafta sürer? Minimum süre nedir?
                </summary>
                <div className="home-faq-answer">
                  Malta'da dil okullarında <strong>minimum eğitim süresi</strong> genellikle 1 haftadır. Ancak dil gelişimi ve <strong>vize süreci</strong> açısından 4–12 hafta ve üzeri programlar daha verimli kabul edilir.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Haftalık ders saati mi, program temposu mu daha önemlidir?
                </summary>
                <div className="home-faq-answer">
                  <strong>Program temposu</strong>, haftalık ders saatinden daha belirleyicidir. Aynı saat sayısına sahip iki programdan biri daha yoğun ve disiplinliyken diğeri daha dengeli olabilir. Öğrenci profiline uygun <strong>tempo seçimi</strong>, ilerlemeyi doğrudan etkiler.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta'da 30 yaş üstü öğrenciler için ayrı sınıflar var mı?
                </summary>
                <div className="home-faq-answer">
                  Bazı <strong>Malta dil okulları</strong>, 30+ veya 40+ yaş grupları için özel sınıflar ve programlar sunar. Bu programlar daha sakin tempo ve benzer yaş profiliyle ilerler.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta dil okulları uluslararası geçerliliğe sahip mi?
                </summary>
                <div className="home-faq-answer">
                  Evet. Malta'daki dil okulları <strong>FELTOM</strong>, <strong>ALTO</strong>, <strong>EAQUALS</strong> gibi uluslararası akreditasyonlara sahiptir. Alınan sertifikalar birçok ülkede eğitim ve kariyer süreçlerinde geçerlidir.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  St. Julian's mı, Sliema mı? Bölge seçimi eğitimi etkiler mi?
                </summary>
                <div className="home-faq-answer">
                  Evet, etkiler.
                  <ul className="home-faq-answer-list">
                    <li><strong>St. Julian's</strong>: Daha sosyal ve hareketli bir ortam</li>
                    <li><strong>Sliema</strong>: Daha dengeli ve düzenli yaşam</li>
                  </ul>
                  <p>Bölge seçimi, öğrencinin motivasyonu ve odaklanmasını doğrudan etkileyebilir.</p>
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta dil okullarında sınıflar kaç kişiliktir?
                </summary>
                <div className="home-faq-answer">
                  Sınıflar genellikle <strong>8–12 kişiliktir</strong>. Butik okullarda bu sayı daha düşük olabilir. Küçük sınıflar, konuşma pratiği ve birebir ilgi açısından avantaj sağlar.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta dil okullarında ders düzeni ve materyaller nasıldır?
                </summary>
                <div className="home-faq-answer">
                  Dersler genellikle sabah veya öğleden sonra yapılır. <strong>Uluslararası yayınlar</strong> kullanılır ve dersler konuşma, dinleme, yazma ve okuma becerilerini dengeli şekilde geliştirecek biçimde planlanır.
                </div>
              </details>

              <details className="home-faq-item">
                <summary className="home-faq-question">
                  Malta'da "en iyi dil okulu" diye tek bir okul var mı?
                </summary>
                <div className="home-faq-answer">
                  Hayır. Malta'da "en iyi" okuldan ziyade öğrenciye <strong>en uygun okul</strong> vardır. Doğru okul; öğrencinin hedefi, yaşı, bütçesi ve öğrenme temposuna göre değişir.
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
