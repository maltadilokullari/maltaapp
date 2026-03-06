import { useState, useEffect } from 'react'
import api from '../services/api'
import './SchemaAudit.css'

export default function SchemaAudit() {
  const [loading, setLoading] = useState(true)
  const [auditData, setAuditData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAudit()
  }, [])

  const fetchAudit = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/schema-audit/audit')
      if (response.data.success) {
        setAuditData(response.data.data)
      }
    } catch (error) {
      console.error('Audit fetch error:', error)
      setError('Audit verileri yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#dc3545'
      case 'high':
        return '#fd7e14'
      case 'medium':
        return '#ffc107'
      case 'low':
        return '#0dcaf0'
      default:
        return '#6c757d'
    }
  }

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critical':
        return 'Kritik'
      case 'high':
        return 'Yüksek'
      case 'medium':
        return 'Orta'
      case 'low':
        return 'Düşük'
      default:
        return 'Bilinmiyor'
    }
  }

  if (loading) {
    return <div className="schema-audit-loading">Yükleniyor...</div>
  }

  if (error) {
    return (
      <div className="schema-audit-error">
        <p>{error}</p>
        <button onClick={fetchAudit} className="retry-btn">
          Tekrar Dene
        </button>
      </div>
    )
  }

  return (
    <div className="schema-audit">
      <div className="schema-audit-header">
        <h1>Google Rich Results Kontrolü</h1>
        <p className="schema-audit-subtitle">
          Schema, FAQ ve medya okunabilirliği teknik kontrol raporu.
          <br />
          <strong>Not:</strong> Bu rapor sadece teknik kontrol içindir. İçerik değiştirilmez.
        </p>
        <button onClick={fetchAudit} className="refresh-btn">
          Raporu Yenile
        </button>
      </div>

      {auditData && (
        <>
          {/* Özet */}
          <div className="audit-summary">
            <h2>Kontrol Özeti</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <h3>Toplam Sorun</h3>
                <p className="summary-value">{auditData.summary?.totalIssues || 0}</p>
              </div>
              <div className="summary-card">
                <h3>Uyarılar</h3>
                <p className="summary-value">{auditData.summary?.totalWarnings || 0}</p>
              </div>
              <div className="summary-card critical">
                <h3>Kritik</h3>
                <p className="summary-value">{auditData.summary?.criticalIssues || 0}</p>
              </div>
              <div className="summary-card high">
                <h3>Yüksek</h3>
                <p className="summary-value">{auditData.summary?.highIssues || 0}</p>
              </div>
            </div>
            <p className="summary-note">
              Son kontrol: {new Date(auditData.timestamp).toLocaleString('tr-TR')}
            </p>
          </div>

          {/* Schema Read-Only Kontrolü */}
          <div className="audit-section">
            <h2>1. Schema Read-Only Kontrolü</h2>
            <div className="status-badge needs-check">
              {auditData.schemaReadOnly?.status === 'needs_manual_check' ? 'Manuel Kontrol Gerekli' : 'Tamamlandı'}
            </div>
            <p className="section-description">
              {auditData.schemaReadOnly?.message}
            </p>
            <div className="recommendation-box">
              <strong>Öneri:</strong> {auditData.schemaReadOnly?.recommendation}
            </div>
          </div>

          {/* FAQ Teknik Okunurluk */}
          <div className="audit-section">
            <h2>2. FAQ Teknik Okunurluk Kontrolü</h2>
            <div className="status-badge needs-check">
              {auditData.faqReadability?.status === 'needs_manual_check' ? 'Manuel Kontrol Gerekli' : 'Tamamlandı'}
            </div>
            <p className="section-description">
              {auditData.faqReadability?.message}
            </p>
            <div className="recommendation-box">
              <strong>Öneri:</strong> {auditData.faqReadability?.recommendation}
            </div>
          </div>

          {/* Görsel & Video Okuma */}
          <div className="audit-section">
            <h2>3. Görsel & Video Okuma Kontrolü</h2>
            <div className="status-badge needs-check">
              {auditData.mediaReadability?.status === 'needs_manual_check' ? 'Manuel Kontrol Gerekli' : 'Tamamlandı'}
            </div>
            <p className="section-description">
              {auditData.mediaReadability?.message}
            </p>
            <div className="recommendation-box">
              <strong>Öneri:</strong> {auditData.mediaReadability?.recommendation}
            </div>
          </div>

          {/* Öneriler */}
          <div className="audit-recommendations">
            <h2>Öneriler ve Aksiyonlar</h2>
            <div className="recommendations-list">
              {auditData.recommendations?.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <div className="recommendation-header">
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: getSeverityColor(rec.priority) }}
                    >
                      {getSeverityLabel(rec.priority)} Öncelik
                    </span>
                    <h3>{rec.title}</h3>
                  </div>
                  <p className="recommendation-description">{rec.description}</p>
                  <p className="recommendation-action">
                    <strong>Aksiyon:</strong> {rec.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Önemli Notlar */}
          <div className="audit-notes">
            <h2>Önemli Notlar</h2>
            <div className="notes-content">
              <ul>
                <li>
                  <strong>İçerik Değiştirilmez:</strong> Bu kontrol sistemi sadece teknik raporlama yapar.
                  Mevcut içerikler, cümleler ve anlam bütünlüğü korunur.
                </li>
                <li>
                  <strong>Schema Read-Only:</strong> JSON-LD içindeki metin alanları mümkünse DOM'dan
                  otomatik okunmalıdır. Manuel girilmiş schema text'ler kontrol edilmelidir.
                </li>
                <li>
                  <strong>FAQ Bütünlüğü:</strong> FAQ cevaplarının HTML node bütünlüğü korunmalı,
                  tag eşleşmeleri kontrol edilmelidir.
                </li>
                <li>
                  <strong>Medya Erişilebilirlik:</strong> Görsel ve video elementlerinin DOM sırası
                  ve erişilebilirlik bilgileri (alt text, poster, boyutlar) kontrol edilmelidir.
                </li>
                <li>
                  <strong>Google Rich Results:</strong> Bu kontroller Google'ın FAQ, Image ve Video
                  rich results okumasında yanlış veya eksik anlaşılmayı önlemek içindir.
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
