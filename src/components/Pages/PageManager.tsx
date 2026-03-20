'use client';

import { useBuilderStore } from '@/store/builderStore';
import { Plus, Copy, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';

export default function PageManager() {
  const { pages, activePageId, setActivePage, addPage, deletePage, duplicatePage } = useBuilderStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPath, setNewPath] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      addPage(newName.trim(), newPath.trim() || `/${newName.toLowerCase().replace(/\s+/g, '-')}`);
      setNewName('');
      setNewPath('');
      setShowAdd(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span className="sidebar-section-title" style={{ margin: 0 }}>Pages</span>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} /> Add
        </button>
      </div>

      {showAdd && (
        <div className="glass-card" style={{ padding: '12px', marginBottom: '12px' }}>
          <input className="input input-sm" placeholder="Page name" value={newName} onChange={e => setNewName(e.target.value)} style={{ marginBottom: '8px' }} />
          <input className="input input-sm" placeholder="URL path (e.g: /about)" value={newPath} onChange={e => setNewPath(e.target.value)} style={{ marginBottom: '8px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd} style={{ flex: 1 }}>Add Page</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="page-list">
        {pages.map(page => (
          <div key={page.id} className={`page-item ${activePageId === page.id ? 'active' : ''}`} onClick={() => setActivePage(page.id)}>
            <div>
              <div className="page-name"><FileText size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />{page.name}</div>
              <div className="page-path">{page.path}</div>
            </div>
            <div className="page-item-actions">
              <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); duplicatePage(page.id); }} title="Duplicate">
                <Copy size={12} />
              </button>
              {pages.length > 1 && (
                <button className="btn btn-ghost btn-icon btn-sm" onClick={e => { e.stopPropagation(); deletePage(page.id); }} title="Delete">
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
