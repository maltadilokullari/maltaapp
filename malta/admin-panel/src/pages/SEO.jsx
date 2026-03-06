import { useState, useEffect } from 'react'
import api from '../services/api'
import './SEO.css'

export default function SEO() {
  const [seos, setSeos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    page: '',
    title: '',
    description: '',
    keywords: '',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    robotsIndex: true,
    robotsFollow: true,
    isActive: true
  })

  useEffect(() => {
    fetchSEO()
  }, [])

  const fetchSEO = async () => {
    try {
      setLoading(true)
      const response = await api.get('/seo')
      if (response.data.success) {
        setSeos(response.data.data)
      }
    } catch (error) {
      console.error('SEO fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (seo) => {
    setEditing(seo._id)
    setFormData({
      page: seo.page,
      title: seo.title,
      description: seo.description,
      keywords: Array.isArray(seo.keywords) ? seo.keywords.join(', ') : '',
      canonical: seo.canonical || '',
      ogTitle: seo.ogTitle || '',
      ogDescription: seo.ogDescription || '',
      ogImage: seo.ogImage || '',
      ogUrl: seo.ogUrl || '',
      twitterTitle: seo.twitterTitle || '',
      twitterDescription: seo.twitterDescription || '',
      twitterImage: seo.twitterImage || '',
      robotsIndex: seo.robots?.index !== false,
      robotsFollow: seo.robots?.follow !== false,
      isActive: seo.isActive !== false
    })
  }

  const handleCancel = () => {
    setEditing(null)
    setFormData({
      page: '',
      title: '',
      description: '',
      keywords: '',
      canonical: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      robotsIndex: true,
      robotsFollow: true,
      isActive: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const keywordsArray = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k)

      const seoData = {
        ...formData,
        keywords: keywordsArray,
        robots: {
          index: formData.robotsIndex,
          follow: formData.robotsFollow,
          maxImagePreview: 'large',
          maxSnippet: -1,
          maxVideoPreview: -1
        }
      }

      await api.post(`/seo/${formData.page}`, seoData)
      await fetchSEO()
      handleCancel()
      alert('SEO verisi başarıyla kaydedildi')
    } catch (error) {
      console.error('SEO save error:', error)
      alert('Kaydetme işlemi başarısız oldu')
    }
  }

  const handleDelete = async (page) => {
    if (!window.confirm('Bu SEO verisini silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      await api.delete(`/seo/${page}`)
      await fetchSEO()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Silme işlemi başarısız oldu')
    }
  }

  if (loading) {
    return <div className="seo-loading">Yükleniyor...</div>
  }

  return (
    <div className="seo">
      <div className="seo-header">
        <h1>SEO Yönetimi</h1>
        <button
          onClick={() => {
            setEditing('new')
            setFormData({
              page: '',
              title: '',
              description: '',
              keywords: '',
              canonical: '',
              ogTitle: '',
              ogDescription: '',
              ogImage: '',
              ogUrl: '',
              twitterTitle: '',
              twitterDescription: '',
              twitterImage: '',
              robotsIndex: true,
              robotsFollow: true,
              isActive: true
            })
          }}
          className="add-btn"
        >
          Yeni SEO Ekle
        </button>
      </div>

      {(editing === 'new' || editing) && (
        <div className="seo-form-container">
          <form onSubmit={handleSubmit} className="seo-form">
            <h2>{editing === 'new' ? 'Yeni SEO Ekle' : 'SEO Düzenle'}</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Sayfa (örn: /, /iletisim, /malta-dil-okullari)</label>
                <input
                  type="text"
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  required
                  disabled={editing !== 'new'}
                  placeholder="/"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Başlık (Title) *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Açıklama (Description) *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Anahtar Kelimeler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="malta, dil okulu, ingilizce"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Canonical URL</label>
                <input
                  type="url"
                  value={formData.canonical}
                  onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                />
              </div>
            </div>

            <h3>Open Graph</h3>
            <div className="form-row">
              <div className="form-group">
                <label>OG Başlık</label>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>OG Açıklama</label>
                <textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  rows="2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>OG Görsel URL</label>
                <input
                  type="url"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>OG URL</label>
                <input
                  type="url"
                  value={formData.ogUrl}
                  onChange={(e) => setFormData({ ...formData, ogUrl: e.target.value })}
                />
              </div>
            </div>

            <h3>Twitter Card</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Twitter Başlık</label>
                <input
                  type="text"
                  value={formData.twitterTitle}
                  onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Twitter Açıklama</label>
                <textarea
                  value={formData.twitterDescription}
                  onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
                  rows="2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Twitter Görsel URL</label>
                <input
                  type="url"
                  value={formData.twitterImage}
                  onChange={(e) => setFormData({ ...formData, twitterImage: e.target.value })}
                />
              </div>
            </div>

            <h3>Robots</h3>
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.robotsIndex}
                    onChange={(e) => setFormData({ ...formData, robotsIndex: e.target.checked })}
                  />
                  Index
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.robotsFollow}
                    onChange={(e) => setFormData({ ...formData, robotsFollow: e.target.checked })}
                  />
                  Follow
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Aktif
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Kaydet</button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="seo-list">
        {seos.length === 0 ? (
          <div className="empty-state">Henüz SEO verisi bulunmamaktadır.</div>
        ) : (
          seos.map((seo) => (
            <div key={seo._id} className="seo-item">
              <div className="seo-item-header">
                <h3>{seo.page}</h3>
                <div className="seo-item-actions">
                  <button onClick={() => handleEdit(seo)} className="edit-btn">
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(seo.page)} className="delete-btn">
                    Sil
                  </button>
                </div>
              </div>
              <div className="seo-item-content">
                <p><strong>Başlık:</strong> {seo.title}</p>
                <p><strong>Açıklama:</strong> {seo.description}</p>
                <p><strong>Durum:</strong> {seo.isActive ? 'Aktif' : 'Pasif'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
