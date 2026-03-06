import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import BlockEditor from '../components/BlockEditor'
import MediaLibrary from '../components/MediaLibrary'
import './ContentEdit.css'

export default function ContentEdit() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isNew = !id
  const contentType = searchParams.get('type') || 'page'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [onImageSelectCallback, setOnImageSelectCallback] = useState(null)

  const [formData, setFormData] = useState({
    type: contentType,
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    blocks: [],
  })

  useEffect(() => {
    if (!isNew) {
      fetchContent()
    } else {
      // Add initial paragraph block for new content
      setFormData(prev => ({
        ...prev,
        blocks: [{
          id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'paragraph',
          data: { text: '' },
        }],
      }))
    }
  }, [id])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/content/${id}`)
      if (response.data.success) {
        setFormData(response.data.data)
      }
    } catch (error) {
      console.error('Content fetch error:', error)
      alert('İçerik yüklenirken bir hata oluştu')
      navigate('/content')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSlugChange = (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleBlocksChange = (blocks) => {
    setFormData(prev => ({ ...prev, blocks }))
  }

  const handleImageSelect = (callback) => {
    setOnImageSelectCallback(() => callback)
    setShowMediaLibrary(true)
  }

  const handleMediaSelect = (media) => {
    if (onImageSelectCallback) {
      onImageSelectCallback(media)
      setOnImageSelectCallback(null)
      setShowMediaLibrary(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Başlık zorunludur')
      return
    }

    if (!formData.slug.trim()) {
      alert('Slug zorunludur')
      return
    }

    if (!formData.blocks || formData.blocks.length === 0) {
      alert('En az bir içerik bloğu eklemelisiniz')
      return
    }

    try {
      setSaving(true)
      
      if (isNew) {
        const response = await api.post('/content', formData)
        if (response.data.success) {
          alert('İçerik başarıyla oluşturuldu')
          navigate(`/content/edit/${response.data.data._id}`)
        }
      } else {
        const response = await api.put(`/content/${id}`, formData)
        if (response.data.success) {
          alert('İçerik başarıyla güncellendi')
        }
      }
    } catch (error) {
      console.error('Save error:', error)
      if (error.response?.data?.errors) {
        alert(`Kaydetme hatası:\n${error.response.data.errors.join('\n')}`)
      } else {
        alert('Kaydetme işlemi başarısız oldu')
      }
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.slug.trim() || !formData.blocks || formData.blocks.length === 0) {
      alert('Yayınlamadan önce tüm zorunlu alanları doldurun')
      return
    }

    try {
      setSaving(true)
      
      // Save first
      if (isNew) {
        const createResponse = await api.post('/content', formData)
        if (createResponse.data.success) {
          const newId = createResponse.data.data._id
          await api.post(`/content/${newId}/publish`)
          alert('İçerik başarıyla yayınlandı')
          navigate(`/content/edit/${newId}`)
        }
      } else {
        await api.put(`/content/${id}`, formData)
        await api.post(`/content/${id}/publish`)
        alert('İçerik başarıyla yayınlandı')
        fetchContent()
      }
    } catch (error) {
      console.error('Publish error:', error)
      if (error.response?.data?.errors) {
        alert(`Yayınlama hatası:\n${error.response.data.errors.join('\n')}`)
      } else {
        alert('Yayınlama işlemi başarısız oldu')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="content-edit-loading">Yükleniyor...</div>
  }

  return (
    <div className="content-edit">
      <div className="content-edit-header">
        <h1>{isNew ? 'Yeni İçerik' : 'İçerik Düzenle'}</h1>
        <div className="content-edit-actions">
          <button
            onClick={() => navigate('/content')}
            className="cancel-btn"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="save-btn"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="publish-btn"
          >
            {saving ? 'Yayınlanıyor...' : 'Yayınla'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="content-edit-form">
        {/* Basic Info */}
        <div className="form-section">
          <h2>Temel Bilgiler</h2>
          
          <div className="form-group">
            <label>
              İçerik Türü <span className="required">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              disabled={!isNew}
              className="form-input"
            >
              <option value="page">Sayfa</option>
              <option value="post">Yazı</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Başlık (H1) <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="İçerik başlığını girin..."
              className="form-input"
              required
              maxLength={100}
            />
            <small>Maksimum 100 karakter</small>
          </div>

          <div className="form-group">
            <label>
              Slug <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={handleSlugChange}
              placeholder="url-yolu"
              className="form-input"
              required
              pattern="[a-z0-9-]+"
            />
            <small>Sadece küçük harf, rakam ve tire (-) kullanılabilir</small>
          </div>

          <div className="form-group">
            <label>Özet / Açıklama</label>
            <textarea
              value={formData.excerpt || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="İçerik özeti (SEO için kullanılır)..."
              rows={3}
              className="form-input"
              maxLength={300}
            />
            <small>Maksimum 300 karakter</small>
          </div>

          <div className="form-group">
            <label>Durum</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="form-input"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayınlanmış</option>
            </select>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="form-section">
          <h2>İçerik Blokları</h2>
          <BlockEditor
            blocks={formData.blocks}
            onChange={handleBlocksChange}
            onImageSelect={handleImageSelect}
          />
        </div>

        {/* Protected Fields (Read-Only) */}
        {!isNew && formData.canonical && (
          <div className="form-section protected">
            <h2>Kilitli Alanlar (READ-ONLY)</h2>
            <div className="protected-fields">
              <div className="protected-field">
                <label>Canonical URL</label>
                <input
                  type="text"
                  value={formData.canonical || ''}
                  disabled
                  className="form-input disabled"
                />
              </div>
              <div className="protected-field">
                <label>Schema Türü</label>
                <input
                  type="text"
                  value={formData.schemaType || 'WebPage'}
                  disabled
                  className="form-input disabled"
                />
              </div>
              <div className="protected-field">
                <label>Sitemap Durumu</label>
                <input
                  type="text"
                  value={formData.sitemapStatus || 'active'}
                  disabled
                  className="form-input disabled"
                />
              </div>
              <div className="protected-field">
                <label>Index Durumu</label>
                <input
                  type="text"
                  value={formData.indexStatus || 'index'}
                  disabled
                  className="form-input disabled"
                />
              </div>
            </div>
            <p className="protected-note">
              Bu alanlar SEO ve schema yapısını korumak için kilitlidir.
            </p>
          </div>
        )}
      </form>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="media-library-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Medya Kütüphanesi</h2>
              <button
                onClick={() => {
                  setShowMediaLibrary(false)
                  setOnImageSelectCallback(null)
                }}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <MediaLibrary onSelect={handleMediaSelect} />
          </div>
        </div>
      )}
    </div>
  )
}
