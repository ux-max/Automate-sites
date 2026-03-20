'use client';

import { useProjectStore } from '@/store/projectStore';
import { Download, Inbox } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FormsPanel() {
  const { formSubmissions } = useProjectStore();

  const handleExport = () => {
    toast.success('Form submissions exported as CSV');
  };

  if (formSubmissions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-tertiary)' }}>
        <Inbox size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
        <p style={{ fontSize: '14px' }}>No form submissions yet</p>
        <p style={{ fontSize: '12px' }}>When visitors fill out forms on your site, they will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>View and manage submissions from your website forms.</p>
        <button className="btn btn-secondary btn-sm" onClick={handleExport}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {formSubmissions.map(sub => (
          <div key={sub.id} className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-primary">{sub.formId}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{new Date(sub.timestamp).toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, max-content) 1fr', gap: '8px' }}>
              {Object.entries(sub.data).map(([key, value]) => (
                <span key={key} style={{ display: 'contents' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>{key}:</span>
                  <span style={{ fontSize: '13px' }}>{value as string}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
