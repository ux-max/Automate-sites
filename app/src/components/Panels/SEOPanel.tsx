'use client';

import { useBuilderStore } from '@/store/builderStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SEOPanel() {
  const { pages, activePageId, updatePageSeo } = useBuilderStore();
  const page = pages.find(p => p.id === activePageId);
  const seo = page?.seo || {};

  const update = (key: string, value: string) => {
    updatePageSeo(activePageId, { ...seo, [key]: value });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Configure SEO settings for <strong>{page?.name || 'this page'}</strong>
        </p>
      </div>

      <div className="property-group">
        <div className="property-group-title">Basic SEO</div>
        <div style={{ marginBottom: '12px' }}>
          <label className="label">Meta Title</label>
          <input className="input" value={seo.title || ''} onChange={e => update('title', e.target.value)} placeholder="Page Title" />
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>{(seo.title || '').length}/60 characters</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label className="label">Meta Description</label>
          <textarea className="textarea" value={seo.description || ''} onChange={e => update('description', e.target.value)} placeholder="Page description for search engines" rows={3} />
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>{(seo.description || '').length}/160 characters</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label className="label">Keywords</label>
          <input className="input" value={seo.keywords || ''} onChange={e => update('keywords', e.target.value)} placeholder="keyword1, keyword2, keyword3" />
        </div>
      </div>

      <div className="property-group">
        <div className="property-group-title">Open Graph</div>
        <div style={{ marginBottom: '12px' }}>
          <label className="label">OG Title</label>
          <input className="input" value={seo.ogTitle || ''} onChange={e => update('ogTitle', e.target.value)} placeholder="Open Graph title" />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label className="label">OG Description</label>
          <textarea className="textarea" value={seo.ogDescription || ''} onChange={e => update('ogDescription', e.target.value)} placeholder="Description for social sharing" rows={2} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label className="label">OG Image URL</label>
          <input className="input" value={seo.ogImage || ''} onChange={e => update('ogImage', e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div className="property-group">
        <div className="property-group-title">Advanced</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px' }}>No-Index (hide from search)</span>
          <div className={`toggle ${seo.noIndex ? 'active' : ''}`} onClick={() => update('noIndex', (!seo.noIndex).toString())} />
        </div>
      </div>

      <div className="property-group">
        <div className="property-group-title">Preview</div>
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '16px', color: '#1a0dab', fontWeight: '500', marginBottom: '4px' }}>{seo.title || 'Page Title'}</div>
          <div style={{ fontSize: '12px', color: '#006621', marginBottom: '4px' }}>https://yoursite.com{page?.path || '/'}</div>
          <div style={{ fontSize: '13px', color: '#545454', lineHeight: '1.4' }}>{seo.description || 'Add a meta description to see search engine preview.'}</div>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={() => toast.success('SEO settings saved!')}>
        Save SEO Settings
      </button>
    </div>
  );
}
