import { useState, useEffect } from 'react'
import api from '../services/api'
import './Forms.css'

export default function Forms() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    fetchForms()
  }, [page])

  const fetchForms = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/forms?page=${page}&limit=20`)
      if (response.data.success) {
        setForms(response.data.data)
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error('Forms fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      await api.delete(`/forms/${id}`)
      fetchForms()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Silme işlemi başarısız oldu')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('tr-TR')
  }

  if (loading) {
    return <div className="forms-loading">Yükleniyor...</div>
  }

  return (
    <div className="forms">
      <h1>Form Kayıtları</h1>

      {forms.length === 0 ? (
        <div className="empty-state">Henüz form kaydı bulunmamaktadır.</div>
      ) : (
        <>
          <div className="forms-table-container">
            <table className="forms-table">
              <thead>
                <tr>
                  <th>Ad Soyad</th>
                  <th>E-posta</th>
                  <th>Telefon</th>
                  <th>Süre</th>
                  <th>Ne Zaman</th>
                  <th>Kaynak</th>
                  <th>Tarih</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form._id}>
                    <td>{form.fullName}</td>
                    <td>{form.email}</td>
                    <td>{form.phone}</td>
                    <td>{form.duration || '-'}</td>
                    <td>{form.when || '-'}</td>
                    <td>
                      <span className={`source-badge source-${form.source}`}>
                        {form.source}
                      </span>
                    </td>
                    <td>{formatDate(form.createdAt)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(form._id)}
                        className="delete-btn"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="pagination-btn"
              >
                Önceki
              </button>
              <span>
                Sayfa {pagination.page} / {pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
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
