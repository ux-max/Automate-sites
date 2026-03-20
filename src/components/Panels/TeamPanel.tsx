'use client';

import { useProjectStore } from '@/store/projectStore';
import { useState } from 'react';
import { Plus, Trash2, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TeamPanel() {
  const { teamMembers, addTeamMember, removeTeamMember } = useProjectStore();
  const [showInvite, setShowInvite] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'editor' | 'viewer'>('editor');

  const handleInvite = () => {
    if (name && email) {
      addTeamMember({ name, email, role });
      toast.success(`${name} invited as ${role}`);
      setName(''); setEmail(''); setShowInvite(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}</p>
        <button className="btn btn-primary btn-sm" onClick={() => setShowInvite(!showInvite)}><Plus size={14} /> Invite</button>
      </div>

      {showInvite && (
        <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
          <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: '8px' }} />
          <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: '8px' }} />
          <select className="input" value={role} onChange={e => setRole(e.target.value as 'editor' | 'viewer')} style={{ marginBottom: '12px' }}>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={handleInvite} style={{ flex: 1 }}><Mail size={14} /> Send Invite</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowInvite(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-member">
            <div className="team-member-info">
              <div className="team-avatar">{member.name[0]}</div>
              <div className="team-member-details">
                <h4>{member.name}</h4>
                <p>{member.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge ${member.role === 'admin' ? 'badge-accent' : 'badge-primary'}`}>{member.role}</span>
              {member.role !== 'admin' && (
                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => removeTeamMember(member.id)}><Trash2 size={12} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
