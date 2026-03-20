'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layers, Paintbrush, Smartphone, Zap, Layout, Globe,
  Shield, Bot, Code2, BarChart3, Users, ArrowRight,
  MousePointerClick, Palette, FileCode
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const features = [
  { icon: <MousePointerClick size={24} />, title: 'Drag & Drop Builder', desc: 'Intuitive visual editor — just drag, drop, and design. No coding needed.', color: '#3b82f6' },
  { icon: <Layout size={24} />, title: 'Smart Layouts', desc: 'Flexbox & grid-based layouts that automatically stack and align beautifully.', color: '#8b5cf6' },
  { icon: <Palette size={24} />, title: 'Theme Engine', desc: 'Switch themes instantly. JSON-based configuration inspired by Shopify.', color: '#ec4899' },
  { icon: <Layers size={24} />, title: 'Template Library', desc: 'Start with professionally designed templates. Customize everything.', color: '#f97316' },
  { icon: <Paintbrush size={24} />, title: 'Design System', desc: 'Colors, typography, spacing, shadows, borders — full styling control.', color: '#06b6d4' },
  { icon: <Smartphone size={24} />, title: 'Responsive Design', desc: 'Desktop, tablet, mobile — your site looks perfect on every device.', color: '#22c55e' },
  { icon: <Globe size={24} />, title: 'Instant Publishing', desc: 'Publish with one click. Custom domains and subdomain hosting included.', color: '#3b82f6' },
  { icon: <Shield size={24} />, title: 'SEO Optimized', desc: 'Meta tags, Open Graph, sitemaps — built-in SEO best practices.', color: '#eab308' },
  { icon: <BarChart3 size={24} />, title: 'Analytics', desc: 'Track page views, visitors, and bounce rates with built-in analytics.', color: '#14b8a6' },
  { icon: <Users size={24} />, title: 'Team Collaboration', desc: 'Invite team members, assign roles, and work together in real-time.', color: '#a855f7' },
  { icon: <Bot size={24} />, title: 'AI Builder', desc: 'Generate entire websites from a text prompt. AI-powered design magic.', color: '#f43f5e' },
  { icon: <FileCode size={24} />, title: 'Export Code', desc: 'Export clean HTML/CSS. Full code access, always.', color: '#64748b' },
];

export default function LandingPage() {
  return (
    <div className="landing-container gradient-mesh">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="logo">
          <div className="logo-icon">
            <Zap size={18} color="white" />
          </div>
          Automate
        </div>
        <ul className="landing-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li>
            <Link href="/dashboard" className="btn btn-primary btn-sm">
              Start Building <ArrowRight size={14} />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <motion.div
          initial="hidden"
          animate="visible"
          className="hero-badge"
          variants={fadeInUp}
          custom={0}
        >
          <Zap size={14} /> Now with AI-Powered Builder
        </motion.div>

        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={1}
        >
          Build Stunning Websites Without Writing Code
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
        >
          The all-in-one no-code platform to design, build, and publish beautiful 
          responsive websites in minutes. Drag & drop, AI-powered, and ready to launch.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={3}
        >
          <Link href="/builder" className="btn btn-primary btn-lg">
            Start Building Free <ArrowRight size={16} />
          </Link>
          <a href="#features" className="btn btn-secondary btn-lg">
            See Features
          </a>
        </motion.div>

        <motion.div
  className="hero-preview"
  initial={{ opacity: 0, y: 60, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
>
          <div style={{
            width: '100%',
            height: '500px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Builder preview mockup */}
            <div style={{
              display: 'flex',
              width: '90%',
              height: '85%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            }}>
              {/* Sidebar */}
              <div style={{
                width: '200px',
                background: '#12121a',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
                  <span style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600 }}>Automate</span>
                </div>
                {['Elements', 'Pages', 'Themes', 'Media', 'SEO'].map((item, i) => (
                  <div key={item} style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: i === 0 ? '#60a5fa' : '#64748b',
                    background: i === 0 ? 'rgba(59,130,246,0.1)' : 'transparent',
                  }}>{item}</div>
                ))}
              </div>
              {/* Canvas */}
              <div style={{
                flex: 1,
                background: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '24px',
              }}>
                <div style={{ width: '60%', height: '12px', borderRadius: '6px', background: '#e2e8f0' }} />
                <div style={{ width: '80%', height: '32px', borderRadius: '8px', background: '#e2e8f0' }} />
                <div style={{ width: '40%', height: '10px', borderRadius: '6px', background: '#e2e8f0', marginBottom: '16px' }} />
                <div style={{ display: 'flex', gap: '16px', width: '80%' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ flex: 1, height: '100px', borderRadius: '8px', background: '#e2e8f0' }} />
                  ))}
                </div>
                <div style={{ width: '30%', height: '36px', borderRadius: '8px', background: '#3b82f6', marginTop: '16px' }} />
              </div>
              {/* Properties */}
              <div style={{
                width: '180px',
                background: '#12121a',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                padding: '16px',
              }}>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Properties</div>
                {['Width', 'Height', 'Color', 'Font', 'Padding'].map(prop => (
                  <div key={prop} style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '10px', color: '#475569', marginBottom: '4px' }}>{prop}</div>
                    <div style={{ height: '24px', borderRadius: '4px', background: '#1a1a25', border: '1px solid rgba(255,255,255,0.06)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="features-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need to Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            18 powerful modules that cover every aspect of website creation
          </motion.p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeInUp}
            >
              <div className="icon-wrapper" style={{ background: `${feature.color}15` }}>
                <span style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Build Your Website?</h2>
          <p>Start creating your dream website in minutes. No credit card required.</p>
          <Link href="/builder" className="btn btn-primary btn-lg" style={{ position: 'relative' }}>
            Open the Builder <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Automate Website Builder. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ fontSize: '14px', color: '#64748b' }}>Privacy</a>
          <a href="#" style={{ fontSize: '14px', color: '#64748b' }}>Terms</a>
          <a href="#" style={{ fontSize: '14px', color: '#64748b' }}>Support</a>
        </div>
      </footer>
    </div>
  );
}
