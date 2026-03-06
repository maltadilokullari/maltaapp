import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  if (!user) {
    return null
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Malta Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link
            to="/forms"
            className={location.pathname === '/forms' ? 'active' : ''}
          >
            Form Kayıtları
          </Link>
          <Link
            to="/content"
            className={location.pathname.startsWith('/content') ? 'active' : ''}
          >
            İçerik Yönetimi (CMS)
          </Link>
          <Link
            to="/seo"
            className={location.pathname === '/seo' ? 'active' : ''}
          >
            SEO Yönetimi
          </Link>
          <Link
            to="/verifications"
            className={location.pathname === '/verifications' ? 'active' : ''}
          >
            Arama Motoru Doğrulamaları
          </Link>
          <Link
            to="/sitemap"
            className={location.pathname === '/sitemap' ? 'active' : ''}
          >
            Google Index & Crawl
          </Link>
          <Link
            to="/schema-audit"
            className={location.pathname === '/schema-audit' ? 'active' : ''}
          >
            Rich Results Kontrolü
          </Link>
          <Link
            to="/empty-pages"
            className={location.pathname === '/empty-pages' ? 'active' : ''}
          >
            Boş Sayfa Temizleme
          </Link>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <span>{user.username}</span>
          </div>
          <button onClick={logout} className="logout-btn">
            Çıkış Yap
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
