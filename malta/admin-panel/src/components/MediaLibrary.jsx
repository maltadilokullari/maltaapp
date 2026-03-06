import { useState, useEffect } from 'react'
import api from '../services/api'
import './MediaLibrary.css'

export default function MediaLibrary({ onSelect }) {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [altText, setAltText] = useState('')
  const [caption, setCaption] = useState('')

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      setLoading(true)
      const response = await api.get('/media')
      if (response.data.success) {
        setMedia(response.data.data)
      }
    } catch (error) {
      console.error('Media fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setAltText('')
      setCaption('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin')
      return
    }

    if (!altText.trim()) {
      alert('Alt text zorunludur')
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('alt', altText)
      if (caption) {
        formData.append('caption', caption)
      }

      const response = await api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        alert('Medya başarıyla yüklendi')
        setSelectedFile(null)
        setAltText('')
        setCaption('')
        document.getElementById('file-input').value = ''
        fetchMedia()
      }
    } catch (error) {
      console.error('Upload error:', error)
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert('Yükleme işlemi başarısız oldu')
      }
    } finally {
      setUploading(false)
    }
  }

  const handleSelect = (mediaItem) => {
    if (onSelect) {
      onSelect(mediaItem)
    }
  }

  if (loading) {
    return <div className="media-library-loading">Yükleniyor...</div>
  }

  return (
    <div className="media-library">
      {/* Upload Section */}
      <div className="media-upload-section">
        <h3>Yeni Medya Yükle</h3>
        <div className="upload-form">
          <div className="upload-group">
            <label>Dosya Seç:</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
            />
            {selectedFile && (
              <div className="selected-file">
                <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>
          <div className="upload-group">
            <label>
              Alt Text <span className="required">*</span>
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Görsel açıklaması..."
              className="upload-input"
              required
            />
          </div>
          <div className="upload-group">
            <label>Caption (Opsiyonel)</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Görsel başlığı..."
              className="upload-input"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !altText.trim() || uploading}
            className="upload-btn"
          >
            {uploading ? 'Yükleniyor...' : 'Yükle'}
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="media-grid">
        {media.length === 0 ? (
          <div className="empty-media">
            <p>Henüz medya yüklenmemiş.</p>
          </div>
        ) : (
          media.map((item) => (
            <div
              key={item._id}
              className="media-item"
              onClick={() => handleSelect(item)}
            >
              <div className="media-thumbnail">
                <img
                  src={`http://localhost:8080${item.path}`}
                  alt={item.alt}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EGörsel%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="media-info">
                <p className="media-alt">{item.alt}</p>
                {item.caption && (
                  <p className="media-caption">{item.caption}</p>
                )}
                <p className="media-size">{(item.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
