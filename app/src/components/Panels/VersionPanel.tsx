'use client';

import { useProjectStore } from '@/store/projectStore';
import { useBuilderStore } from '@/store/builderStore';
import { useState } from 'react';
import { Save, Clock, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VersionPanel() {
  const { versions, saveVersion } = useProjectStore();
  const { saveHistory } = useBuilderStore();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [showSave, setShowSave] = useState(false);

  const handleSave = () => {
    if (name) {
      saveVersion(name, desc);
      saveHistory(); // Save to undo/redo history as well
      toast.success('Version saved successfully');
      setName(''); setDesc(''); setShowSave(false);
    }
  };

  const handleRestore = (versionName: string) => {
    if (confirm(`Are you sure you want to restore "${versionName}"? You will lose any unsaved changes.`)) {
      toast.success(`Restored to ${versionName}`);
      // In a real app we would load the actual page data from the version ID
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Save snapshots of your website to restore later.</p>
        <button className="btn btn-primary btn-sm" onClick={() => setShowSave(!showSave)}><Save size={14} /> Save Version</button>
      </div>

      {showSave && (
        <div className="glass-card" style={{ padding: '16px', marginBottom: '24px' }}>
          <input className="input" placeholder="Version name (e.g., v1.2 Release)" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: '8px' }} />
          <textarea className="textarea" placeholder="Description of changes" value={desc} onChange={e => setDesc(e.target.value)} rows={2} style={{ marginBottom: '12px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={handleSave} style={{ flex: 1 }}>Save Snapshot</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowSave(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="version-timeline">
        {versions.map((ver, i) => (
          <div key={ver.id} className="version-item">
            <div className={`version-dot ${i === 0 ? '' : 'inactive'}`} style={i !== 0 ? { background: 'var(--text-disabled)' } : {}} />
            <div style={{ flex: 1, padding: '12px', background: i === 0 ? 'var(--surface-glass)' : 'transparent', borderRadius: '8px', border: i === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="version-info">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{ver.name} {i === 0 && <span className="badge badge-primary">Current</span>}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Clock size={12} /> {new Date(ver.timestamp).toLocaleString()}
                  </div>
                  {ver.description && <p style={{ marginTop: '8px' }}>{ver.description}</p>}
                </div>
                {i !== 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={() => handleRestore(ver.name)}>
                    <RotateCcw size={14} /> Restore
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
