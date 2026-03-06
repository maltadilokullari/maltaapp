import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import './Content.css'

export default function Content() {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('page') // 'page' or 'post'
  const [status, setStatus] = useState('') // '' or 'draft' or 'published'
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    fetchContents()
  }, [type, status, page])

  const fetchContents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ type, page })
      if (status) params.append('status', status)
      
      const response = await api.get(`/content?${params.toString()}`)
      if (response.data.success) {
        setContents(response.data.data)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error('Content fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bu içeriği silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      await api.delete(`/content/${id}`)
      fetchContents()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Silme işlemi başarısız oldu')
    }
  }

  const handlePublish = async (id) => {
    try {
      await api.post(`/content/${id}/publish`)
      alert('İçerik başarıyla yayınlandı')
      fetchContents()
    } catch (error) {
      console.error('Publish error:', error)
      if (error.response?.data?.errors) {
        alert(`Yayınlama hatası:\n${error.response.data.errors.join('\n')}`)
      } else {
        alert('Yayınlama işlemi başarısız oldu')
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleString('tr-TR')
  }

  if (loading) {
    return <div className="content-loading">Yükleniyor...</div>
  }

  return (
    <div className="content">
      <div className="content-header">
        <h1>İçerik Yönetimi</h1>
        <div className="content-actions">
          <button
            onClick={() => (window.location.href = `/content/new?type=${type}`)}
            className="add-content-btn"
          >
            + Yeni {type === 'page' ? 'Sayfa' : 'Yazı'} Ekle
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="content-filters">
        <div className="filter-group">
          <label>İçerik Türü:</label>
          <select value={type} onChange={(e) => { setType(e.target.value); setPage(1) }} className="filter-select">
            <option value="page">Sayfalar</option>
            <option value="post">Yazılar</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Durum:</label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="filter-select">
            <option value="">Tümü</option>
            <option value="draft">Taslak</option>
            <option value="published">Yayınlanmış</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      {contents.length === 0 ? (
        <div className="empty-content">
          <p>Henüz içerik eklenmemiş.</p>
          <button
            onClick={() => (window.location.href = `/content/new?type=${type}`)}
            className="add-first-content-btn"
          >
            İlk {type === 'page' ? 'Sayfayı' : 'Yazıyı'} Ekle
          </button>
        </div>
      ) : (
        <>
          <div className="content-table-container">
            <table className="content-table">
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Slug</th>
                  <th>Durum</th>
                  <th>İstatistikler</th>
                  <th>Güncelleme</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((content) => (
                  <tr key={content._id}>
                    <td>
                      <strong>{content.title}</strong>
                    </td>
                    <td>
                      <code>{content.slug}</code>
                    </td>
                    <td>
                      <span className={`status-badge status-${content.status}`}>
                        {content.status === 'published' ? 'Yayınlanmış' : 'Taslak'}
                      </span>
                    </td>
                    <td>
                      <div className="content-stats">
                        {content.stats && (
                          <>
                            <span>{content.stats.wordCount || 0} kelime</span>
                            <span>{content.stats.imageCount || 0} görsel</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td>{formatDate(content.updatedAt)}</td>
                    <td>
                      <div className="content-actions-cell">
                        <button
                          onClick={() => (window.location.href = `/content/edit/${content._id}`)}
                          className="action-btn edit"
                        >
                          Düzenle
                        </button>
                        {content.status === 'draft' && (
                          <button
                            onClick={() => handlePublish(content._id)}
                            className="action-btn publish"
                          >
                            Yayınla
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(content._id)}
                          className="action-btn delete"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="content-pagination">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="pagination-btn"
              >
                Önceki
              </button>
              <span className="pagination-info">
                Sayfa {pagination.page} / {pagination.pages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="pagination-btn"
              >
                Sonraki
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
