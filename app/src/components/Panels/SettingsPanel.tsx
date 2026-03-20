'use client';

import { useProjectStore } from '@/store/projectStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPanel() {
  const { projectName, projectUrl, isPublished, setProjectName } = useProjectStore();
  const [name, setName] = useState(projectName);
  const [domain, setDomain] = useState(`${projectUrl}.automate.app`);

  const handleSave = () => {
    setProjectName(name);
    toast.success('Project settings saved');
  };

  return (
    <div>
      <div className="property-group">
        <div className="property-group-title">General Settings</div>
        <div style={{ marginBottom: '16px' }}>
          <label className="label">Project Name</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label className="label">Favicon</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--surface-glass)', border: '1px dashed var(--border-default)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>⚡</div>
            <button className="btn btn-secondary btn-sm">Upload Image</button>
          </div>
        </div>
      </div>

      <div className="property-group">
        <div className="property-group-title">Domain & Publishing</div>
        <div style={{ marginBottom: '16px' }}>
          <label className="label">Free Subdomain</label>
          <div style={{ display: 'flex' }}>
            <input className="input" value={domain} onChange={e => setDomain(e.target.value)} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
            Your site is currently {isPublished ? <span style={{ color: 'var(--success-400)' }}>published</span> : <span style={{ color: 'var(--warning-400)' }}>unpublished</span>}.
          </span>
        </div>
        
        <div className="glass-card" style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Custom Domain</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Connect your own domain (e.g., yoursite.com)
          </p>
          <button className="btn btn-primary btn-sm">Connect Domain</button>
        </div>
      </div>

      <div className="property-group">
        <div className="property-group-title">Danger Zone</div>
        <div className="glass-card" style={{ padding: '16px', borderColor: 'var(--danger-400)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--danger-400)', marginBottom: '4px' }}>Delete Project</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Once you delete a project, there is no going back.
          </p>
          <button className="btn btn-danger btn-sm">Delete Project</button>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
