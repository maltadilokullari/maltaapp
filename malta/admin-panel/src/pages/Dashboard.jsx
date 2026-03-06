import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/forms/statistics')
      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error) {
      console.error('Stats fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="dashboard-loading">Yükleniyor...</div>
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Toplam Form</h3>
          <p className="stat-value">{stats?.total || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Bugün</h3>
          <p className="stat-value">{stats?.today || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Bu Ay</h3>
          <p className="stat-value">{stats?.thisMonth || 0}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Hızlı İşlemler</h2>
        <div className="action-buttons">
          <Link to="/forms" className="action-button">
            Form Kayıtlarını Görüntüle
          </Link>
          <Link to="/seo" className="action-button">
            SEO Ayarlarını Yönet
          </Link>
        </div>
      </div>
    </div>
  )
}
