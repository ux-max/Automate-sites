'use client';

import { useProjectStore } from '@/store/projectStore';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AnalyticsPanel() {
  const { analyticsData } = useProjectStore();
  const totalViews = analyticsData.reduce((s, d) => s + d.pageViews, 0);
  const totalVisitors = analyticsData.reduce((s, d) => s + d.visitors, 0);
  const avgBounce = Math.round(analyticsData.reduce((s, d) => s + d.bounceRate, 0) / analyticsData.length);
  const maxViews = Math.max(...analyticsData.map(d => d.pageViews));

  return (
    <div>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total Page Views</div>
          <div className="metric-value">{totalViews.toLocaleString()}</div>
          <div className="metric-change positive"><TrendingUp size={12} style={{ verticalAlign: '-2px' }} /> +12.5% from last week</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Unique Visitors</div>
          <div className="metric-value">{totalVisitors.toLocaleString()}</div>
          <div className="metric-change positive"><TrendingUp size={12} style={{ verticalAlign: '-2px' }} /> +8.3%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Bounce Rate</div>
          <div className="metric-value">{avgBounce}%</div>
          <div className="metric-change negative"><TrendingDown size={12} style={{ verticalAlign: '-2px' }} /> -3.2%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Session</div>
          <div className="metric-value">2m 34s</div>
          <div className="metric-change positive"><TrendingUp size={12} style={{ verticalAlign: '-2px' }} /> +5.1%</div>
        </div>
      </div>

      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Page Views (Last 7 Days)</h4>
          <div className="badge badge-primary">Daily</div>
        </div>
        <div className="chart-bars">
          {analyticsData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="chart-bar" style={{ height: `${(d.pageViews / maxViews) * 100}%`, minHeight: '20px' }} title={`${d.pageViews} views`} />
              <div className="chart-bar-label">{d.date.split('-')[2]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Top Pages</h4>
        {[{ page: '/', views: 1248 }, { page: '/about', views: 543 }, { page: '/blog', views: 321 }].map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '13px' }}>{p.page}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{p.views} views</span>
          </div>
        ))}
      </div>
    </div>
  );
}
