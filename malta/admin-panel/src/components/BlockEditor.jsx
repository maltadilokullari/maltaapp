import { useState, useCallback } from 'react'
import './BlockEditor.css'

const ALLOWED_BLOCKS = {
  PARAGRAPH: 'paragraph',
  HEADING: 'heading',
  IMAGE: 'image',
  LIST: 'list',
  QUOTE: 'quote',
}

export default function BlockEditor({ blocks = [], onChange, onImageSelect }) {
  const [localBlocks, setLocalBlocks] = useState(blocks || [])

  const handleBlocksChange = useCallback((newBlocks) => {
    setLocalBlocks(newBlocks)
    if (onChange) {
      onChange(newBlocks)
    }
  }, [onChange])

  const addBlock = (type) => {
    const newBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      data: getDefaultBlockData(type),
    }
    handleBlocksChange([...localBlocks, newBlock])
  }

  const getDefaultBlockData = (type) => {
    switch (type) {
      case ALLOWED_BLOCKS.PARAGRAPH:
        return { text: '' }
      case ALLOWED_BLOCKS.HEADING:
        return { level: 2, text: '' }
      case ALLOWED_BLOCKS.IMAGE:
        return { url: '', alt: '', caption: '', width: null, height: null }
      case ALLOWED_BLOCKS.LIST:
        return { style: 'unordered', items: [''] }
      case ALLOWED_BLOCKS.QUOTE:
        return { text: '', author: '' }
      default:
        return {}
    }
  }

  const updateBlock = (blockId, data) => {
    const updated = localBlocks.map((block) =>
      block.id === blockId ? { ...block, data: { ...block.data, ...data } } : block
    )
    handleBlocksChange(updated)
  }

  const deleteBlock = (blockId) => {
    if (localBlocks.length <= 1) {
      alert('En az bir blok olmalıdır')
      return
    }
    const updated = localBlocks.filter((block) => block.id !== blockId)
    handleBlocksChange(updated)
  }

  const moveBlock = (blockId, direction) => {
    const index = localBlocks.findIndex((b) => b.id === blockId)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= localBlocks.length) return

    const updated = [...localBlocks]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    handleBlocksChange(updated)
  }

  const addListItem = (blockId) => {
    const block = localBlocks.find((b) => b.id === blockId)
    if (!block || block.type !== ALLOWED_BLOCKS.LIST) return

    const updated = localBlocks.map((b) =>
      b.id === blockId
        ? { ...b, data: { ...b.data, items: [...b.data.items, ''] } }
        : b
    )
    handleBlocksChange(updated)
  }

  const updateListItem = (blockId, itemIndex, value) => {
    const block = localBlocks.find((b) => b.id === blockId)
    if (!block || block.type !== ALLOWED_BLOCKS.LIST) return

    const updated = localBlocks.map((b) =>
      b.id === blockId
        ? {
            ...b,
            data: {
              ...b.data,
              items: b.data.items.map((item, idx) => (idx === itemIndex ? value : item)),
            },
          }
        : b
    )
    handleBlocksChange(updated)
  }

  const deleteListItem = (blockId, itemIndex) => {
    const block = localBlocks.find((b) => b.id === blockId)
    if (!block || block.type !== ALLOWED_BLOCKS.LIST) return

    if (block.data.items.length <= 1) {
      alert('En az bir liste öğesi olmalıdır')
      return
    }

    const updated = localBlocks.map((b) =>
      b.id === blockId
        ? {
            ...b,
            data: {
              ...b.data,
              items: b.data.items.filter((_, idx) => idx !== itemIndex),
            },
          }
        : b
    )
    handleBlocksChange(updated)
  }

  const handleImageSelect = (blockId) => {
    if (onImageSelect) {
      onImageSelect((image) => {
        updateBlock(blockId, {
          url: image.path,
          alt: image.alt,
          width: image.width,
          height: image.height,
        })
      })
    }
  }

  return (
    <div className="block-editor">
      {/* Toolbar */}
      <div className="block-editor-toolbar">
        <h3>Blok Ekle</h3>
        <div className="toolbar-buttons">
          <button
            type="button"
            onClick={() => addBlock(ALLOWED_BLOCKS.PARAGRAPH)}
            className="toolbar-btn"
          >
            📝 Paragraf
          </button>
          <button
            type="button"
            onClick={() => addBlock(ALLOWED_BLOCKS.HEADING)}
            className="toolbar-btn"
          >
            📌 Başlık (H2/H3)
          </button>
          <button
            type="button"
            onClick={() => addBlock(ALLOWED_BLOCKS.IMAGE)}
            className="toolbar-btn"
          >
            🖼️ Görsel
          </button>
          <button
            type="button"
            onClick={() => addBlock(ALLOWED_BLOCKS.LIST)}
            className="toolbar-btn"
          >
            📋 Liste
          </button>
          <button
            type="button"
            onClick={() => addBlock(ALLOWED_BLOCKS.QUOTE)}
            className="toolbar-btn"
          >
            💬 Alıntı
          </button>
        </div>
      </div>

      {/* Blocks */}
      <div className="block-editor-blocks">
        {localBlocks.length === 0 ? (
          <div className="empty-blocks">
            <p>Henüz blok eklenmedi. Yukarıdaki butonlardan birini kullanarak başlayın.</p>
          </div>
        ) : (
          localBlocks.map((block, index) => (
            <BlockItem
              key={block.id}
              block={block}
              index={index}
              totalBlocks={localBlocks.length}
              onUpdate={(data) => updateBlock(block.id, data)}
              onDelete={() => deleteBlock(block.id)}
              onMove={(direction) => moveBlock(block.id, direction)}
              onImageSelect={() => handleImageSelect(block.id)}
              onAddListItem={() => addListItem(block.id)}
              onUpdateListItem={(itemIndex, value) => updateListItem(block.id, itemIndex, value)}
              onDeleteListItem={(itemIndex) => deleteListItem(block.id, itemIndex)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function BlockItem({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onMove,
  onImageSelect,
  onAddListItem,
  onUpdateListItem,
  onDeleteListItem,
}) {
  const renderBlock = () => {
    switch (block.type) {
      case ALLOWED_BLOCKS.PARAGRAPH:
        return (
          <div className="block-item paragraph">
            <textarea
              value={block.data?.text || ''}
              onChange={(e) => onUpdate({ text: e.target.value })}
              placeholder="Paragraf metnini yazın..."
              rows={4}
              className="block-input"
            />
          </div>
        )

      case ALLOWED_BLOCKS.HEADING:
        return (
          <div className="block-item heading">
            <div className="heading-controls">
              <select
                value={block.data?.level || 2}
                onChange={(e) => onUpdate({ level: parseInt(e.target.value) })}
                className="heading-level-select"
              >
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
              <input
                type="text"
                value={block.data?.text || ''}
                onChange={(e) => onUpdate({ text: e.target.value })}
                placeholder="Başlık metnini yazın..."
                className="block-input heading-input"
              />
            </div>
          </div>
        )

      case ALLOWED_BLOCKS.IMAGE:
        return (
          <div className="block-item image">
            {block.data?.url ? (
              <div className="image-preview">
                <img src={`http://localhost:8080${block.data.url}`} alt={block.data.alt || ''} />
                <div className="image-info">
                  <input
                    type="text"
                    value={block.data?.alt || ''}
                    onChange={(e) => onUpdate({ alt: e.target.value })}
                    placeholder="Alt text (zorunlu)"
                    className="block-input"
                    required
                  />
                  <input
                    type="text"
                    value={block.data?.caption || ''}
                    onChange={(e) => onUpdate({ caption: e.target.value })}
                    placeholder="Görsel açıklaması (opsiyonel)"
                    className="block-input"
                  />
                </div>
              </div>
            ) : (
              <div className="image-placeholder">
                <button type="button" onClick={onImageSelect} className="select-image-btn">
                  🖼️ Görsel Seç
                </button>
              </div>
            )}
          </div>
        )

      case ALLOWED_BLOCKS.LIST:
        return (
          <div className="block-item list">
            <div className="list-controls">
              <select
                value={block.data?.style || 'unordered'}
                onChange={(e) => onUpdate({ style: e.target.value })}
                className="list-style-select"
              >
                <option value="unordered">Madde İşareti</option>
                <option value="ordered">Numaralı</option>
              </select>
              <button type="button" onClick={onAddListItem} className="add-list-item-btn">
                + Öğe Ekle
              </button>
            </div>
            <div className="list-items">
              {block.data?.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="list-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onUpdateListItem(itemIndex, e.target.value)}
                    placeholder={`Liste öğesi ${itemIndex + 1}`}
                    className="block-input"
                  />
                  <button
                    type="button"
                    onClick={() => onDeleteListItem(itemIndex)}
                    className="delete-list-item-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case ALLOWED_BLOCKS.QUOTE:
        return (
          <div className="block-item quote">
            <textarea
              value={block.data?.text || ''}
              onChange={(e) => onUpdate({ text: e.target.value })}
              placeholder="Alıntı metnini yazın..."
              rows={3}
              className="block-input"
            />
            <input
              type="text"
              value={block.data?.author || ''}
              onChange={(e) => onUpdate({ author: e.target.value })}
              placeholder="Yazar (opsiyonel)"
              className="block-input"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="block-wrapper">
      <div className="block-header">
        <span className="block-type">{block.type}</span>
        <div className="block-actions">
          <button
            type="button"
            onClick={() => onMove('up')}
            disabled={index === 0}
            className="block-action-btn"
            title="Yukarı taşı"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove('down')}
            disabled={index === totalBlocks - 1}
            className="block-action-btn"
            title="Aşağı taşı"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="block-action-btn delete"
            title="Sil"
          >
            ✕
          </button>
        </div>
      </div>
      {renderBlock()}
    </div>
  )
}
