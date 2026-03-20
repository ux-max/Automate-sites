'use client';

import { useProjectStore } from '@/store/projectStore';
import { useState } from 'react';
import { Plus, Database, ChevronRight } from 'lucide-react';

export default function CMSPanel() {
  const { collections, addCollection, addCollectionItem } = useProjectStore();
  const [selectedCol, setSelectedCol] = useState<string | null>(null);
  const col = collections.find(c => c.id === selectedCol);

  if (col) {
    return (
      <div>
        <button className="btn btn-ghost btn-sm" onClick={() => setSelectedCol(null)} style={{ marginBottom: '16px' }}>
          ← Back to Collections
        </button>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{col.name}</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>/{col.slug} · {col.fields.length} fields · {col.items.length} items</p>

        <div className="sidebar-section-title" style={{ marginBottom: '8px' }}>Fields</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
          {col.fields.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px' }}>{f.name}</span>
              <span className="badge badge-primary">{f.type}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-section-title" style={{ marginBottom: '8px' }}>Items ({col.items.length})</div>
        {col.items.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>No items yet.</p>
        ) : col.items.map((item, i) => (
          <div key={i} className="glass-card" style={{ padding: '12px 14px', marginBottom: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{String(item.title || item[col.fields[0]?.name] || `Item ${i + 1}`)}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              {col.fields.slice(1, 3).map(f => `${f.name}: ${String(item[f.name] || '—').substring(0, 30)}`).join(' · ')}
            </div>
          </div>
        ))}
        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '8px' }} onClick={() => {
          const newItem: Record<string, unknown> = {};
          col.fields.forEach(f => { newItem[f.name] = f.type === 'date' ? new Date().toISOString().split('T')[0] : `New ${f.name}`; });
          addCollectionItem(col.id, newItem);
        }}>
          <Plus size={14} /> Add Item
        </button>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Manage your dynamic content collections — blog posts, portfolios, products, and more.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {collections.map(c => (
          <div key={c.id} className="glass-card" style={{ padding: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setSelectedCol(c.id)}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Database size={16} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{c.name}</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{c.fields.length} fields · {c.items.length} items</span>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
