import { Link } from 'react-router-dom';
import '../css/Footer.css';

const menuItems = [
  { label: 'Malta Dil Okulları', href: '/malta-dil-okullari' },
  { label: 'Malta Dil Okulu Fiyatları', href: '/malta-dil-okulu-fiyatlari' },
  { label: 'Malta Work And Study', href: '/malta-work-and-study' },
  { label: 'Malta Öğrenci Vizesi', href: '/malta-ogrenci-vizesi' },
  { label: 'Malta Yaz Okulları', href: '/malta-yaz-okullari' },
  { label: 'Blog', href: '/blog' },
  { label: 'Biz Kimiz?', href: '/biz-kimiz' },
  { label: 'İletişim', href: '/iletisim' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <section className="footer-section">
            <Link to="/" className="footer-logo">
              <img src="/logo-header.png" alt="Malta Dil Okulu İngilizce Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-description">
              Malta dil okulu seçimi, program karşılaştırmaları ve vize süreci hakkında ücretsiz bilgilendirme ve danışmanlık hizmeti.
            </p>
            <address className="footer-address">
              <p className="footer-address-label">Adres:</p>
              <p className="footer-address-text">
                Malta ve Türkiye'de hizmet veren ekip
              </p>
            </address>
          </section>

          <nav className="footer-section" aria-label="Footer navigation">
            <h3 className="footer-title">Hızlı Erişim</h3>
            <ul className="footer-links">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-section">
            <h3 className="footer-title">İletişim</h3>
            <address className="footer-contact">
              <div>
                <a href="tel:+905439632416" className="footer-contact-link">
                  +90 543 963 24 16
                </a>
              </div>
              <div>
                <a href="tel:+35699143066" className="footer-contact-link">
                  +356 99 14 30 66
                </a>
              </div>
              <div>
                <a
                  href="https://api.whatsapp.com/send?phone=35699143066&text=Merhaba,+bilgi+almak+istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-whatsapp"
                >
                  <svg viewBox="0 0 24 24" className="whatsapp-icon" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
              <div>
                <a href="mailto:bilgi@maltadilokuluingilizce.com" className="footer-contact-link">
                  bilgi@maltadilokuluingilizce.com
                </a>
              </div>
            </address>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Malta Dil Okulu İngilizce. Tüm hakları saklıdır.
          </p>
          <nav className="footer-legal" aria-label="Legal links">
            <Link to="/gizlilik-politikasi" className="footer-legal-link">
              Gizlilik Politikası
            </Link>
            <Link to="/kvkk" className="footer-legal-link">
              KVKK
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
