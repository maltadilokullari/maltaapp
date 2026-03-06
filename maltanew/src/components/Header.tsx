import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css';

const menuItems = [
  { key: '/malta-dil-okullari', label: 'Malta Dil Okulları' },
  { key: '/malta-dil-okulu-fiyatlari', label: 'Malta Dil Okulu Fiyatları' },
  { key: '/malta-work-and-study', label: 'Malta Work And Study' },
  { key: '/malta-ogrenci-vizesi', label: 'Malta Öğrenci Vizesi' },
  { key: '/malta-yaz-okullari', label: 'Malta Yaz Okulları' },
  { key: '/blog', label: 'Blog' },
  { key: '/biz-kimiz', label: 'Biz Kimiz?' },
  { key: '/iletisim', label: 'İletişim', type: 'contact' as const },
];

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/malta-dil-okullari') {
      return location.pathname === '/malta-dil-okullari' || location.pathname.startsWith('/malta-dil-okullari/');
    }
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="header-nav">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <img src="/logo-header.png" alt="Logo" className="logo-img" />
          </Link>

          <div className="header-menu-desktop">
            {menuItems
              .filter((item) => item.type !== 'contact')
              .map((item) => (
                <Link
                  key={item.key}
                  to={item.key}
                  className={`header-link ${isActive(item.key) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            {menuItems.find((item) => item.type === 'contact') && (
              <Link
                to="/iletisim"
                className={`header-cta ${isActive('/iletisim') ? 'active' : ''}`}
              >
                İletişim
              </Link>
            )}
          </div>

          <button
            className="header-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="header-mobile-menu">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className={`header-mobile-link ${item.type === 'contact' ? 'header-mobile-cta' : ''} ${isActive(item.key) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
