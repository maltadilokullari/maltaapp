import { useState, useEffect } from 'react'
import api from '../services/api'
import './Sitemap.css'

export default function Sitemap() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState(null)
  const [robotsSettings, setRobotsSettings] = useState({
    enabled: true,
    sitemapEnabled: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [statsResponse, robotsResponse] = await Promise.all([
        api.get('/sitemap/stats'),
        api.get('/sitemap/robots/settings'),
      ])

      if (statsResponse.data.success) {
        setStats(statsResponse.data.data)
      }

      if (robotsResponse.data.success) {
        setRobotsSettings(robotsResponse.data.data)
      }
    } catch (error) {
      console.error('Sitemap fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRobotsUpdate = async () => {
    try {
      setSaving(true)
      await api.put('/sitemap/robots/settings', robotsSettings)
      alert('Robots.txt ayarları başarıyla güncellendi')
    } catch (error) {
      console.error('Robots update error:', error)
      alert('Güncelleme başarısız oldu')
    } finally {
      setSaving(false)
    }
  }

  const handleClearCache = async () => {
    if (!window.confirm('Sitemap cache\'ini temizlemek istediğinize emin misiniz?')) {
      return
    }

    try {
      await api.post('/sitemap/cache/clear')
      alert('Cache başarıyla temizlendi')
      await fetchData()
    } catch (error) {
      console.error('Cache clear error:', error)
      alert('Cache temizleme başarısız oldu')
    }
  }

  if (loading) {
    return <div className="sitemap-loading">Yükleniyor...</div>
  }

  return (
    <div className="sitemap">
      <div className="sitemap-header">
        <h1>Google Index & Crawl Yönetimi</h1>
        <p className="sitemap-subtitle">
          Sitemap ve robots.txt ayarlarını buradan yönetebilirsiniz.
        </p>
      </div>

      {/* İstatistikler */}
      {stats && (
        <div className="sitemap-stats">
          <h2>Sitemap İstatistikleri</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Statik Sayfalar</h3>
              <p className="stat-value">{stats.pages}</p>
              <p className="stat-label">sitemap-pages.xml</p>
            </div>
            <div className="stat-card">
              <h3>Blog Yazıları</h3>
              <p className="stat-value">{stats.posts}</p>
              <p className="stat-label">sitemap-posts.xml</p>
            </div>
            <div className="stat-card">
              <h3>Hizmet Sayfaları</h3>
              <p className="stat-value">{stats.services}</p>
              <p className="stat-label">sitemap-services.xml</p>
            </div>
            <div className="stat-card stat-card-total">
              <h3>Toplam URL</h3>
              <p className="stat-value">{stats.total}</p>
              <p className="stat-label">Google'a gönderilecek</p>
            </div>
          </div>
          <div className="cache-info">
            <p>
              <strong>Cache Durumu:</strong>{' '}
              <span className={stats.cacheStatus === 'active' ? 'cache-active' : 'cache-expired'}>
                {stats.cacheStatus === 'active' ? 'Aktif' : 'Süresi Dolmuş'}
              </span>
            </p>
            {stats.cacheTime && (
              <p>
                <strong>Son Güncelleme:</strong>{' '}
                {new Date(stats.cacheTime).toLocaleString('tr-TR')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Robots.txt Ayarları */}
      <div className="sitemap-settings">
        <h2>Robots.txt Ayarları</h2>
        <div className="settings-form">
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={robotsSettings.enabled}
                onChange={(e) =>
                  setRobotsSettings({ ...robotsSettings, enabled: e.target.checked })
                }
              />
              <span>Robots.txt aktif</span>
            </label>
            <small className="form-help">
              Bu seçeneği kapatırsanız, /robots.txt boş döner.
            </small>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={robotsSettings.sitemapEnabled}
                onChange={(e) =>
                  setRobotsSettings({ ...robotsSettings, sitemapEnabled: e.target.checked })
                }
              />
              <span>Robots.txt'de sitemap referansı göster</span>
            </label>
            <small className="form-help">
              Robots.txt dosyasında Sitemap: https://maltadilokuluingilizce.com/sitemap.xml satırını ekler.
            </small>
          </div>

          <div className="form-actions">
            <button
              onClick={handleRobotsUpdate}
              disabled={saving}
              className="save-btn"
            >
              {saving ? 'Kaydediliyor...' : 'Robots.txt Ayarlarını Kaydet'}
            </button>
          </div>
        </div>

        <div className="robots-preview">
          <h3>Robots.txt Önizleme</h3>
          <pre className="robots-content">
{robotsSettings.enabled
  ? `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /panel
Disallow: /preview
Disallow: /*?*
Disallow: /*&*
${robotsSettings.sitemapEnabled ? '\nSitemap: https://maltadilokuluingilizce.com/sitemap.xml\n' : ''}`
  : '(Robots.txt devre dışı)'}
          </pre>
        </div>
      </div>

      {/* Sitemap Bilgileri */}
      <div className="sitemap-info">
        <h2>Sitemap Yapısı</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>sitemap-pages.xml</h3>
            <p>Statik ve kurumsal sayfalar:</p>
            <ul>
              <li>Ana sayfa (/)</li>
              <li>İletişim (/iletisim)</li>
              <li>Biz Kimiz (/biz-kimiz)</li>
              <li>Malta Dil Okulları (/malta-dil-okullari)</li>
              <li>Fiyatlar, Konaklama, Vize sayfaları</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>sitemap-posts.xml</h3>
            <p>Blog yazıları:</p>
            <ul>
              <li>Tüm blog postları (/blog/[slug])</li>
              <li>Yayın tarihine göre lastmod</li>
              <li>noindex sayfalar hariç</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>sitemap-services.xml</h3>
            <p>Hizmet ve kurs sayfaları:</p>
            <ul>
              <li>Okul listesi sayfası</li>
              <li>Okul detay sayfaları (/malta-dil-okullari/[slug])</li>
              <li>Özel okul sayfaları</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cache Yönetimi */}
      <div className="sitemap-actions">
        <h2>Cache Yönetimi</h2>
        <div className="actions-info">
          <p>
            Sitemap'ler 12 saatlik cache ile servis edilir. İçerik güncellendiğinde cache'i temizleyin.
          </p>
          <button onClick={handleClearCache} className="clear-cache-btn">
            Sitemap Cache'ini Temizle
          </button>
        </div>
      </div>

      {/* Google Entegrasyonu */}
      <div className="sitemap-google">
        <h2>Google Search Console Entegrasyonu</h2>
        <div className="google-info">
          <p>
            <strong>Sitemap URL'leri:</strong>
          </p>
          <ul>
            <li>
              <code>https://maltadilokuluingilizce.com/sitemap.xml</code>
            </li>
            <li>
              <code>https://maltadilokuluingilizce.com/sitemap-pages.xml</code>
            </li>
            <li>
              <code>https://maltadilokuluingilizce.com/sitemap-posts.xml</code>
            </li>
            <li>
              <code>https://maltadilokuluingilizce.com/sitemap-services.xml</code>
            </li>
          </ul>
          <p className="google-note">
            Bu URL'leri Google Search Console → Sitemaps bölümünden ekleyebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}
