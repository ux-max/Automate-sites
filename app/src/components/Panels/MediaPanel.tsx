'use client';

import { useProjectStore } from '@/store/projectStore';
import { Upload, Trash2, Image, Grid, List } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function MediaPanel() {
  const { mediaAssets, addMediaAsset, removeMediaAsset } = useProjectStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        addMediaAsset({
          name: file.name,
          url: ev.target?.result as string,
          type: file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'file',
          size: file.size,
        });
        toast.success(`${file.name} uploaded`);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => fileInputRef.current?.click()}>
          <Upload size={14} /> Upload Files
        </button>
        <button className={`btn ${viewMode === 'grid' ? 'btn-secondary' : 'btn-ghost'} btn-icon`} onClick={() => setViewMode('grid')}><Grid size={14} /></button>
        <button className={`btn ${viewMode === 'list' ? 'btn-secondary' : 'btn-ghost'} btn-icon`} onClick={() => setViewMode('list')}><List size={14} /></button>
        <input ref={fileInputRef} type="file" hidden multiple accept="image/*,video/*" onChange={handleUpload} />
      </div>

      {mediaAssets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-tertiary)' }}>
          <Image size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
          <p style={{ fontSize: '14px' }}>No media assets yet</p>
          <p style={{ fontSize: '12px' }}>Upload images and files to use in your website</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {mediaAssets.map(asset => (
            <div key={asset.id} className="glass-card" style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: '100%', height: '100px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {asset.type === 'image' ? <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '24px' }}>📄</span>}
              </div>
              <div style={{ padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{asset.name}</span>
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeMediaAsset(asset.id)}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {mediaAssets.map(asset => (
            <div key={asset.id} className="glass-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {asset.type === 'image' ? <img src={asset.url} alt="" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} /> : <span>📄</span>}
                <div>
                  <div style={{ fontSize: '13px' }}>{asset.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{(asset.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeMediaAsset(asset.id)}><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
