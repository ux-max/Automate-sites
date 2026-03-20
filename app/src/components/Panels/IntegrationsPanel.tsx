'use client';

import { useProjectStore } from '@/store/projectStore';
import toast from 'react-hot-toast';

export default function IntegrationsPanel() {
  const { integrations, toggleIntegration } = useProjectStore();

  const handleToggle = (id: string, name: string, connected: boolean) => {
    toggleIntegration(id);
    if (!connected) {
      toast.success(`Connected to ${name}`);
    } else {
      toast.success(`Disconnected from ${name}`);
    }
  };

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Connect your website with third-party tools and services.
      </p>

      <div className="integration-grid">
        {integrations.map(integration => (
          <div key={integration.id} className="integration-card" style={{ borderColor: integration.connected ? 'var(--primary-500)' : 'var(--border-subtle)' }}>
            <div className="integration-icon" style={{ background: integration.connected ? 'rgba(59, 130, 246, 0.1)' : 'var(--surface-glass)' }}>
              {integration.icon}
            </div>
            <h4>{integration.name}</h4>
            <p style={{ height: '36px' }}>{integration.description}</p>
            <div style={{ marginTop: 'auto', paddingTop: '16px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: integration.connected ? 'var(--success-400)' : 'var(--text-tertiary)' }}>
                {integration.connected ? 'Connected' : 'Not Connected'}
              </span>
              <div 
                className={`toggle ${integration.connected ? 'active' : ''}`}
                onClick={() => handleToggle(integration.id, integration.name, integration.connected)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
