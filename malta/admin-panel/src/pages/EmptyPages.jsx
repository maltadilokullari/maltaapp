import { useState, useEffect } from 'react'
import api from '../services/api'
import './EmptyPages.css'

export default function EmptyPages() {
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [detectionData, setDetectionData] = useState(null)
  const [selectedPages, setSelectedPages] = useState([])

  useEffect(() => {
    detectEmptyPages()
  }, [])

  const detectEmptyPages = async () => {
    try {
      setLoading(true)
      const response = await api.get('/empty-pages/detect')
      if (response.data.success) {
        setDetectionData(response.data.data)
      }
    } catch (error) {
      console.error('Empty pages detection error:', error)
      alert('Boş sayfa tespiti yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPage = (pagePath) => {
    setSelectedPages((prev) => {
      if (prev.includes(pagePath)) {
        return prev.filter((p) => p !== pagePath)
      } else {
        return [...prev, pagePath]
      }
    })
  }

  const handleSelectAll = () => {
    if (!detectionData || !detectionData.emptyPages) return
    
    if (selectedPages.length === detectionData.emptyPages.length) {
      setSelectedPages([])
    } else {
      setSelectedPages(detectionData.emptyPages.map((page) => page.path))
    }
  }

  const handleMarkAs404 = async () => {
    if (selectedPages.length === 0) {
      alert('Lütfen en az bir sayfa seçin')
      return
    }

    if (!window.confirm(`${selectedPages.length} sayfa 404 olarak işaretlenecek. Devam etmek istediğinize emin misiniz?`)) {
      return
    }

    try {
      setProcessing(true)
      const response = await api.post('/empty-pages/mark-404', {
        pagePaths: selectedPages,
      })

      if (response.data.success) {
        alert('Sayfalar başarıyla 404 olarak işaretlendi')
        setSelectedPages([])
        await detectEmptyPages()
      }
    } catch (error) {
      console.error('Mark as 404 error:', error)
      alert('Sayfalar işaretlenirken bir hata oluştu')
    } finally {
      setProcessing(false)
    }
  }

  const handleRemoveFromSitemap = async () => {
    if (!window.confirm('Sitemap cache\'i temizlenecek. Boş sayfalar bir sonraki sitemap oluşturulduğunda çıkarılacak. Devam etmek istediğinize emin misiniz?')) {
      return
    }

    try {
      setProcessing(true)
      const response = await api.post('/empty-pages/remove-from-sitemap')

      if (response.data.success) {
        alert('Sitemap cache temizlendi')
        await detectEmptyPages()
      }
    } catch (error) {
      console.error('Remove from sitemap error:', error)
      alert('Sitemap cache temizlenirken bir hata oluştu')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return <div className="empty-pages-loading">Yükleniyor...</div>
  }

  return (
    <div className="empty-pages">
      <div className="empty-pages-header">
        <h1>Boş Sayfa & 404 Temizleme</h1>
        <p className="empty-pages-subtitle">
          İçeriği olmayan, SEO değeri taşımayan sayfaları tespit edin ve temizleyin.
          <br />
          <strong>Önemli:</strong> İçeriği olan sayfalara ASLA dokunulmaz.
        </p>
        <button onClick={detectEmptyPages} className="refresh-btn" disabled={loading}>
          Tespiti Yenile
        </button>
      </div>

      {detectionData && (
        <>
          {/* Özet */}
          <div className="detection-summary">
            <h2>Tespit Özeti</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <h3>Toplam Sayfa</h3>
                <p className="summary-value">{detectionData.summary?.totalPages || 0}</p>
              </div>
              <div className="summary-card safe">
                <h3>Güvenli Sayfalar</h3>
                <p className="summary-value">{detectionData.summary?.safePagesCount || 0}</p>
              </div>
              <div className="summary-card empty">
                <h3>Boş Sayfalar</h3>
                <p className="summary-value">{detectionData.summary?.emptyPagesCount || 0}</p>
              </div>
            </div>
            <div className="summary-note">
              <p>
                <strong>READ-ONLY:</strong> Bu rapor sadece tespit içindir. Sayfalar değiştirilmez.
              </p>
            </div>
          </div>

          {/* Boş Sayfalar Listesi */}
          {detectionData.emptyPages && detectionData.emptyPages.length > 0 && (
            <div className="empty-pages-list">
              <div className="list-header">
                <h2>Boş Sayfalar ({detectionData.emptyPages.length})</h2>
                <div className="list-actions">
                  <button onClick={handleSelectAll} className="select-all-btn">
                    {selectedPages.length === detectionData.emptyPages.length ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                  </button>
                  <button
                    onClick={handleMarkAs404}
                    disabled={selectedPages.length === 0 || processing}
                    className="mark-404-btn"
                  >
                    {processing ? 'İşleniyor...' : `Seçilenleri 404 Olarak İşaretle (${selectedPages.length})`}
                  </button>
                </div>
              </div>

              <div className="pages-table-container">
                <table className="pages-table">
                  <thead>
                    <tr>
                      <th width="50">
                        <input
                          type="checkbox"
                          checked={selectedPages.length === detectionData.emptyPages.length && detectionData.emptyPages.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Sayfa Yolu</th>
                      <th>Neden Boş?</th>
                      <th>Detaylar</th>
                      <th>SEO Durumu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detectionData.emptyPages.map((page, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedPages.includes(page.path)}
                            onChange={() => handleSelectPage(page.path)}
                          />
                        </td>
                        <td>
                          <code>{page.path}</code>
                        </td>
                        <td>
                          <span className="reason-badge">{page.reason}</span>
                        </td>
                        <td>
                          <div className="details-info">
                            {page.details && (
                              <>
                                {page.details.wordCount !== undefined && (
                                  <span>Kelime: {page.details.wordCount}</span>
                                )}
                                {page.details.hasTitle && <span>✓ Başlık</span>}
                                {page.details.hasDescription && <span>✓ Açıklama</span>}
                                {page.details.hasCanonical && <span>✓ Canonical</span>}
                                {page.details.hasSchema && <span>✓ Schema</span>}
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="seo-status">
                            {page.seoData.isActive ? (
                              <span className="status-active">Aktif</span>
                            ) : (
                              <span className="status-inactive">Pasif</span>
                            )}
                            {page.seoData.hasCanonical && (
                              <span className="status-canonical">Canonical</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Güvenli Sayfalar (Bilgi) */}
          {detectionData.safePages && detectionData.safePages.length > 0 && (
            <div className="safe-pages-info">
              <h2>Güvenli Sayfalar ({detectionData.safePages.length})</h2>
              <p className="info-note">
                Bu sayfalar içerik içerdiği veya manuel oluşturulduğu için güvenlidir.
              </p>
              <div className="safe-pages-list">
                {detectionData.safePages.slice(0, 10).map((page, index) => (
                  <span key={index} className="safe-page-badge">
                    {page.path}
                  </span>
                ))}
                {detectionData.safePages.length > 10 && (
                  <span className="safe-page-badge">
                    +{detectionData.safePages.length - 10} daha...
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Aksiyonlar */}
          <div className="empty-pages-actions">
            <h2>Toplu İşlemler</h2>
            <div className="actions-info">
              <p>
                <strong>Dikkat:</strong> Bu işlemler sadece boş sayfalar için çalışır.
                İçeriği olan sayfalara ASLA dokunulmaz.
              </p>
              <div className="action-buttons">
                <button
                  onClick={handleRemoveFromSitemap}
                  disabled={processing}
                  className="remove-sitemap-btn"
                >
                  {processing ? 'İşleniyor...' : 'Sitemap Cache\'ini Temizle'}
                </button>
              </div>
            </div>
          </div>

          {/* Önemli Notlar */}
          <div className="empty-pages-notes">
            <h2>Önemli Notlar</h2>
            <div className="notes-content">
              <ul>
                <li>
                  <strong>READ-ONLY:</strong> Bu sistem sadece tespit ve işaretleme yapar.
                  Sayfalar silinmez, içerik değiştirilmez.
                </li>
                <li>
                  <strong>Manuel Sayfalar:</strong> Ana sayfa, blog, okul sayfaları gibi
                  manuel oluşturulmuş sayfalara ASLA dokunulmaz.
                </li>
                <li>
                  <strong>404 İşaretleme:</strong> Boş sayfalar robots noindex olarak
                  işaretlenir ve sitemap'ten çıkarılır. Sayfa silinmez.
                </li>
                <li>
                  <strong>301 Yönlendirme:</strong> 301 yönlendirme YAPILMAZ.
                  Sadece SEO ayarları güncellenir.
                </li>
                <li>
                  <strong>Kriterler:</strong> Bir sayfa sadece TÜM kriterler sağlanıyorsa
                  boş sayılır (kelime sayısı &lt; 80, içerik yok, schema yok, vb.).
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
