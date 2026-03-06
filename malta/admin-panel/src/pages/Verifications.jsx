import { useState, useEffect } from 'react'
import api from '../services/api'
import './Verifications.css'

export default function Verifications() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    google_site_verification: '',
    bing_site_verification: '',
    yandex_verification: '',
    facebook_domain_verification: '',
    pinterest_verification: '',
    isActive: true
  })

  useEffect(() => {
    fetchVerification()
  }, [])

  const fetchVerification = async () => {
    try {
      setLoading(true)
      const response = await api.get('/verification/admin')
      if (response.data.success) {
        setFormData({
          google_site_verification: response.data.data.google_site_verification || '',
          bing_site_verification: response.data.data.bing_site_verification || '',
          yandex_verification: response.data.data.yandex_verification || '',
          facebook_domain_verification: response.data.data.facebook_domain_verification || '',
          pinterest_verification: response.data.data.pinterest_verification || '',
          isActive: response.data.data.isActive !== false
        })
      }
    } catch (error) {
      console.error('Verification fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await api.post('/verification', formData)
      alert('Arama motoru doğrulama verileri başarıyla kaydedildi')
    } catch (error) {
      console.error('Verification save error:', error)
      alert('Kaydetme işlemi başarısız oldu')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (!window.confirm('Tüm doğrulama kodlarını temizlemek istediğinize emin misiniz?')) {
      return
    }
    setFormData({
      google_site_verification: '',
      bing_site_verification: '',
      yandex_verification: '',
      facebook_domain_verification: '',
      pinterest_verification: '',
      isActive: true
    })
  }

  if (loading) {
    return <div className="verifications-loading">Yükleniyor...</div>
  }

  return (
    <div className="verifications">
      <div className="verifications-header">
        <h1>Arama Motoru Doğrulamaları</h1>
        <p className="verifications-subtitle">
          Google, Bing, Yandex, Facebook ve Pinterest doğrulama kodlarını buradan yönetebilirsiniz.
          Bu kodlar sitenizin <code>&lt;head&gt;</code> bölümüne otomatik olarak eklenir.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="verifications-form">
        <div className="form-section">
          <h2>Google Search Console</h2>
          <div className="form-group">
            <label htmlFor="google_site_verification">
              Google Site Verification Code
            </label>
            <input
              id="google_site_verification"
              type="text"
              value={formData.google_site_verification}
              onChange={(e) => setFormData({ ...formData, google_site_verification: e.target.value })}
              placeholder="Örn: abc123def456ghi789"
              className="verification-input"
            />
            <small className="form-help">
              Google Search Console'dan aldığınız doğrulama kodunu buraya yapıştırın.
              <br />
              Format: <code>&lt;meta name="google-site-verification" content="KOD" /&gt;</code>
            </small>
          </div>
        </div>

        <div className="form-section">
          <h2>Bing Webmaster Tools</h2>
          <div className="form-group">
            <label htmlFor="bing_site_verification">
              Bing Site Verification Code (msvalidate.01)
            </label>
            <input
              id="bing_site_verification"
              type="text"
              value={formData.bing_site_verification}
              onChange={(e) => setFormData({ ...formData, bing_site_verification: e.target.value })}
              placeholder="Örn: 1234567890ABCDEF1234567890ABCDEF"
              className="verification-input"
            />
            <small className="form-help">
              Bing Webmaster Tools'dan aldığınız doğrulama kodunu buraya yapıştırın.
              <br />
              Format: <code>&lt;meta name="msvalidate.01" content="KOD" /&gt;</code>
            </small>
          </div>
        </div>

        <div className="form-section">
          <h2>Yandex Webmaster</h2>
          <div className="form-group">
            <label htmlFor="yandex_verification">
              Yandex Verification Code
            </label>
            <input
              id="yandex_verification"
              type="text"
              value={formData.yandex_verification}
              onChange={(e) => setFormData({ ...formData, yandex_verification: e.target.value })}
              placeholder="Örn: abc123def456"
              className="verification-input"
            />
            <small className="form-help">
              Yandex Webmaster'dan aldığınız doğrulama kodunu buraya yapıştırın.
              <br />
              Format: <code>&lt;meta name="yandex-verification" content="KOD" /&gt;</code>
            </small>
          </div>
        </div>

        <div className="form-section">
          <h2>Facebook Domain Verification</h2>
          <div className="form-group">
            <label htmlFor="facebook_domain_verification">
              Facebook Domain Verification Code
            </label>
            <input
              id="facebook_domain_verification"
              type="text"
              value={formData.facebook_domain_verification}
              onChange={(e) => setFormData({ ...formData, facebook_domain_verification: e.target.value })}
              placeholder="Örn: abc123def456ghi789"
              className="verification-input"
            />
            <small className="form-help">
              Facebook Business Manager'dan aldığınız doğrulama kodunu buraya yapıştırın.
              <br />
              Format: <code>&lt;meta name="facebook-domain-verification" content="KOD" /&gt;</code>
            </small>
          </div>
        </div>

        <div className="form-section">
          <h2>Pinterest Site Verification</h2>
          <div className="form-group">
            <label htmlFor="pinterest_verification">
              Pinterest Verification Code
            </label>
            <input
              id="pinterest_verification"
              type="text"
              value={formData.pinterest_verification}
              onChange={(e) => setFormData({ ...formData, pinterest_verification: e.target.value })}
              placeholder="Örn: abc123def456ghi789"
              className="verification-input"
            />
            <small className="form-help">
              Pinterest'ten aldığınız doğrulama kodunu buraya yapıştırın.
              <br />
              Format: <code>&lt;meta name="pinterest-site-verification" content="KOD" /&gt;</code>
            </small>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <span>Doğrulama kodlarını aktif et</span>
            </label>
            <small className="form-help">
              Bu seçeneği kapatırsanız, doğrulama kodları sitede görünmez ancak veritabanında saklanır.
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Temizle
          </button>
        </div>
      </form>

      <div className="verifications-info">
        <h3>Bilgilendirme</h3>
        <ul>
          <li>Doğrulama kodlarını arama motorlarının webmaster araçlarından alabilirsiniz.</li>
          <li>Kodlar otomatik olarak sitenizin <code>&lt;head&gt;</code> bölümüne eklenir.</li>
          <li>Boş bırakılan alanlar için meta etiketi oluşturulmaz.</li>
          <li>XSS ve HTML injection koruması otomatik olarak uygulanır.</li>
          <li>Değişiklikler kaydedildikten sonra sitenin yeniden yayınlanması gerekebilir.</li>
        </ul>
      </div>
    </div>
  )
}
