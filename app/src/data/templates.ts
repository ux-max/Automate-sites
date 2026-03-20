import { Page, PageSection, CanvasElement } from '@/store/builderStore';
import { v4 as uuidv4 } from 'uuid';

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  pages: Page[];
}

function el(type: CanvasElement['type'], content: string, styles: CanvasElement['styles'] = {}, props?: Record<string, unknown>): CanvasElement {
  return { id: uuidv4(), type, content, styles, props };
}

function sec(name: string, elements: CanvasElement[], styles?: PageSection['styles']): PageSection {
  return { id: uuidv4(), name, elements, styles: styles || { padding: '64px 32px', minHeight: '200px', backgroundColor: 'var(--theme-background)' } };
}

function page(name: string, path: string, sections: PageSection[]): Page {
  return { id: uuidv4(), name, path, sections, seo: { title: name, description: `${name} page` } };
}

export const templates: Template[] = [
  {
    id: 'landing-saas',
    name: 'SaaS Landing Page',
    category: 'Business',
    description: 'Modern SaaS product landing page with hero, features, pricing, and CTA.',
    preview: '/templates/saas_preview.png',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }, {
            children: [
              el('heading', 'Build Better Products, Faster', { fontSize: '48px', fontWeight: '800', color: 'var(--theme-heading)', marginBottom: '16px', lineHeight: '1.1' }),
              el('text', 'The all-in-one platform that helps teams ship products 10x faster. Start building today.', { fontSize: '18px', color: 'var(--theme-text-secondary)', marginBottom: '32px', lineHeight: '1.7' }),
              el('image', '/templates/saas_preview.png', { width: '100%', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', marginBottom: '32px' }),
              el('button', 'Get Started Free →', { backgroundColor: 'var(--theme-primary)', color: '#ffffff', padding: '14px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '600' }),
            ]
          }),
        ], { padding: '100px 32px 80px', backgroundColor: 'var(--theme-surface)' } as unknown as PageSection['styles']),
        sec('Features', [
          el('heading', 'Everything You Need', { fontSize: '36px', fontWeight: '700', textAlign: 'center', color: 'var(--theme-heading)', marginBottom: '48px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }, {
            children: [
              el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }, {
                children: [
                  el('text', '⚡', { fontSize: '32px', marginBottom: '20px' }),
                  el('heading', 'Lightning Fast', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                  el('text', 'Built for speed with optimized performance across all devices.', { fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
              el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }, {
                children: [
                  el('text', '🎨', { fontSize: '32px', marginBottom: '20px' }),
                  el('heading', 'Beautiful Design', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                  el('text', 'Stunning templates and components designed by professionals.', { fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
              el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }, {
                children: [
                  el('text', '🔒', { fontSize: '32px', marginBottom: '20px' }),
                  el('heading', 'Secure & Reliable', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                  el('text', 'Enterprise-grade security with 99.9% uptime guarantee.', { fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
            ]
          }),
        ], { padding: '100px 32px', backgroundColor: '#f8fafc' }),
        sec('Pricing', [
          el('heading', 'Simple, Transparent Pricing', { fontSize: '36px', fontWeight: '700', textAlign: 'center', color: 'var(--theme-heading)', marginBottom: '16px' }),
          el('text', 'Choose the plan that fits your team size.', { fontSize: '16px', textAlign: 'center', color: 'var(--theme-text-secondary)', marginBottom: '56px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1000px', margin: '0 auto' }, {
            children: [
              el('container', '', { padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0' }, {
                children: [
                  el('text', 'Basic', { fontSize: '14px', fontWeight: '700', color: 'var(--theme-primary)', textTransform: 'uppercase', marginBottom: '8px' }),
                  el('heading', '$0', { fontSize: '40px', fontWeight: '800', marginBottom: '8px' }),
                  el('text', 'Free forever', { fontSize: '14px', color: '#64748b', marginBottom: '24px' }),
                  el('container', '', { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }, {
                    children: [
                      el('text', '✓ 1 project', { fontSize: '14px' }),
                      el('text', '✓ Basic components', { fontSize: '14px' }),
                      el('text', '✓ Community support', { fontSize: '14px' }),
                    ]
                  }),
                  el('button', 'Get Started', { width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: '600', borderRadius: '10px' }),
                ]
              }),
              el('container', '', { padding: '40px', backgroundColor: '#0f172a', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', transform: 'scale(1.05)', zIndex: '10' }, {
                children: [
                  el('text', 'Pro', { fontSize: '14px', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '8px' }),
                  el('heading', '$29', { fontSize: '40px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }),
                  el('text', 'Best for growing teams', { fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }),
                  el('container', '', { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }, {
                    children: [
                      el('text', '✓ Unlimited projects', { fontSize: '14px', color: '#e2e8f0' }),
                      el('text', '✓ Pro components', { fontSize: '14px', color: '#e2e8f0' }),
                      el('text', '✓ Priority support', { fontSize: '14px', color: '#e2e8f0' }),
                      el('text', '✓ Team collaboration', { fontSize: '14px', color: '#e2e8f0' }),
                    ]
                  }),
                  el('button', 'Try Pro Free', { width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: '#ffffff', fontWeight: '600', borderRadius: '10px' }),
                ]
              }),
              el('container', '', { padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0' }, {
                children: [
                  el('text', 'Enterprise', { fontSize: '14px', fontWeight: '700', color: 'var(--theme-primary)', textTransform: 'uppercase', marginBottom: '8px' }),
                  el('heading', '$99', { fontSize: '40px', fontWeight: '800', marginBottom: '8px' }),
                  el('text', 'Custom solutions', { fontSize: '14px', color: '#64748b', marginBottom: '24px' }),
                  el('container', '', { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }, {
                    children: [
                      el('text', '✓ Custom domains', { fontSize: '14px' }),
                      el('text', '✓ Advanced security', { fontSize: '14px' }),
                      el('text', '✓ 24/7 support', { fontSize: '14px' }),
                    ]
                  }),
                  el('button', 'Contact Sales', { width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: '600', borderRadius: '10px' }),
                ]
              }),
            ]
          })
        ], { padding: '100px 32px', backgroundColor: '#ffffff' }),
        sec('FAQ', [
          el('heading', 'Frequently Asked Questions', { fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '48px' }),
          el('container', '', { maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }, {
            children: [
              el('container', '', { padding: '24px', backgroundColor: '#f8fafc', borderRadius: '12px' }, {
                children: [
                  el('heading', 'How secure is the platform?', { fontSize: '18px', fontWeight: '700', marginBottom: '12px' }),
                  el('text', 'We use industry-standard encryption and security protocols to ensure your data is always safe.', { fontSize: '15px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { padding: '24px', backgroundColor: '#f8fafc', borderRadius: '12px' }, {
                children: [
                  el('heading', 'Can I cancel my subscription anytime?', { fontSize: '18px', fontWeight: '700', marginBottom: '12px' }),
                  el('text', 'Yes, you can cancel or downgrade your plan at any time through your account settings.', { fontSize: '15px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
            ]
          })
        ], { padding: '80px 32px', backgroundColor: '#ffffff' }),
        sec('Footer', [
          el('divider', '', { borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', marginBottom: '40px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', maxWidth: '1100px', margin: '0 auto' }, {
            children: [
              el('container', '', {}, {
                children: [
                  el('heading', 'Automate', { fontSize: '20px', fontWeight: '800', marginBottom: '16px' }),
                  el('text', 'Building the future of web design, one pixel at a time.', { fontSize: '14px', color: '#64748b' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('heading', 'Product', { fontSize: '16px', fontWeight: '700', marginBottom: '16px' }),
                  el('text', 'Features\\nTemplates\\nIntegrations\\nChangelog', { fontSize: '14px', color: '#64748b', lineHeight: '2' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('heading', 'Resources', { fontSize: '16px', fontWeight: '700', marginBottom: '16px' }),
                  el('text', 'Documentation\\nGuides\\nSupport\\nCommunity', { fontSize: '14px', color: '#64748b', lineHeight: '2' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('heading', 'Company', { fontSize: '16px', fontWeight: '700', marginBottom: '16px' }),
                  el('text', 'About\\nCareers\\nLegal\\nContact', { fontSize: '14px', color: '#64748b', lineHeight: '2' }),
                ]
              }),
            ]
          })
        ], { padding: '64px 32px', backgroundColor: '#ffffff' }),
      ]),
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    category: 'Creative',
    description: 'Clean portfolio showcase for designers, developers, and creatives.',
    preview: '/templates/portfolio_preview.png',
    pages: [
      page('Portfolio', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('text', 'Hello, I\'m', { fontSize: '18px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }),
              el('heading', 'Sarah Johnson', { fontSize: '56px', fontWeight: '800', color: 'var(--theme-heading)', marginBottom: '16px' }),
              el('image', '/templates/portfolio_preview.png', { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '24px' }),
              el('text', 'Digital Designer & Creative Director crafting memorable brand experiences.', { fontSize: '18px', color: 'var(--theme-text-secondary)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }),
              el('button', 'View My Work ↓', { backgroundColor: '#0f172a', color: '#ffffff', padding: '14px 28px', borderRadius: '999px', fontSize: '15px' }),
            ]
          }),
        ], { padding: '120px 32px 80px', backgroundColor: '#fafafa' }),
        sec('Work', [
          el('heading', 'Selected Work', { fontSize: '32px', fontWeight: '700', textAlign: 'center', color: 'var(--theme-heading)', marginBottom: '48px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }, {
            children: [
              el('container', '', {}, {
                children: [
                  el('image', '/templates/portfolio_preview.png', { width: '100%', height: '300px', borderRadius: '12px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Brand Identity — Acme Co.', { fontSize: '20px', fontWeight: '700', marginBottom: '8px' }),
                  el('text', 'Complete brand overhaul including logo, guidelines, and collateral.', { color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('image', '/templates/portfolio_preview.png', { width: '100%', height: '300px', borderRadius: '12px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Web Design — TechStart', { fontSize: '20px', fontWeight: '700', marginBottom: '8px' }),
                  el('text', 'Responsive website design for an AI startup.', { color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
            ]
          }),
        ], { padding: '80px 32px', backgroundColor: '#ffffff' }),
        sec('About', [
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '64px', alignItems: 'center' }, {
            children: [
              el('container', '', {}, {
                children: [
                   el('heading', 'About Me', { fontSize: '32px', fontWeight: '800', marginBottom: '24px' }),
                   el('text', 'With over 8 years of experience in digital design, I focus on creating user-centric experiences that drive results. My approach combines strategic thinking with pixel-perfect execution.\\n\\nI believe that great design is not just about how it looks, but how it works for the end user.', { fontSize: '18px', lineHeight: '1.8', color: 'var(--theme-text-secondary)', marginBottom: '32px' }),
                   el('button', 'Get in Touch', { backgroundColor: '#0f172a', color: '#ffffff', padding: '12px 28px', borderRadius: '8px' }),
                ]
              }),
              el('image', '/templates/portfolio_preview.png', { width: '100%', height: '500px', borderRadius: '24px', objectFit: 'cover' }),
            ]
          })
        ], { padding: '100px 32px', backgroundColor: '#f8fafc' }),
        sec('Skills', [
           el('heading', 'Technical Skills', { fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '48px' }),
           el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }, {
             children: [
               el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', textAlign: 'center', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0' }, {
                 children: [
                    el('text', '🎨', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'UI Design', { fontSize: '18px', fontWeight: '700' }),
                 ]
               }),
               el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', textAlign: 'center', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0' }, {
                 children: [
                    el('text', '🔧', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'Prototyping', { fontSize: '18px', fontWeight: '700' }),
                 ]
               }),
               el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', textAlign: 'center', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0' }, {
                 children: [
                    el('text', '📱', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'Mobile First', { fontSize: '18px', fontWeight: '700' }),
                 ]
               }),
               el('container', '', { padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', textAlign: 'center', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0' }, {
                 children: [
                    el('text', '⚡', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'Interactive', { fontSize: '18px', fontWeight: '700' }),
                 ]
               }),
             ]
           })
        ], { padding: '80px 32px', backgroundColor: '#ffffff' }),
        sec('Footer', [
          el('container', '', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, {
            children: [
              el('text', '© 2026 Sarah Johnson. Built with Automate.', { color: '#64748b' }),
              el('container', '', { display: 'flex', gap: '24px' }, {
                 children: [
                    el('text', 'Twitter', { fontWeight: '600' }),
                    el('text', 'LinkedIn', { fontWeight: '600' }),
                    el('text', 'Dribbble', { fontWeight: '600' }),
                 ]
              })
            ]
          })
        ], { padding: '48px 32px', backgroundColor: '#ffffff' })
      ]),
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    category: 'Content',
    description: 'Clean and readable blog layout perfect for writers and content creators.',
    preview: '/templates/blog_preview.png',
    pages: [
      page('Blog Home', '/', [
        sec('Header', [
          el('heading', 'The Daily Journal', { fontSize: '44px', fontWeight: '800', textAlign: 'center', color: 'var(--theme-heading)', marginBottom: '8px', fontFamily: 'Georgia, serif' }),
          el('text', 'Thoughts, stories, and ideas about design, technology, and life.', { fontSize: '16px', textAlign: 'center', color: 'var(--theme-text-secondary)', marginBottom: '32px' }),
          el('divider', '', { borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', maxWidth: '100px', margin: '0 auto' }),
        ], { padding: '80px 32px 40px', backgroundColor: '#ffffff' }),
        sec('Featured', [
          el('container', '', { maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '48px', alignItems: 'center' }, {
            children: [
              el('image', '/templates/blog_preview.png', { width: '400px', height: '280px', borderRadius: '16px', objectFit: 'cover' }),
              el('container', '', {}, {
                children: [
                  el('text', 'Featured Post', { fontSize: '13px', fontWeight: '700', color: 'var(--theme-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }),
                  el('heading', 'The Future of Web Design in 2026', { fontSize: '36px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }),
                  el('text', 'Exploring emerging trends in web design and how AI is reshaping the creative process. Learn how to stay ahead in the ever-evolving digital landscape...', { fontSize: '16px', color: 'var(--theme-text-secondary)', marginBottom: '24px', lineHeight: '1.7' }),
                  el('container', '', { display: 'flex', alignItems: 'center', gap: '12px' }, {
                    children: [
                       el('image', '/templates/blog_preview.png', { width: '40px', height: '40px', borderRadius: '50%' }),
                       el('text', 'By Alex Rivera • 5 min read', { fontSize: '14px', color: '#64748b' }),
                    ]
                  }),
                ]
              })
            ]
          })
        ], { padding: '60px 32px 100px', backgroundColor: '#ffffff' }),
        sec('Latest Posts', [
          el('heading', 'Recent Stories', { fontSize: '28px', fontWeight: '700', marginBottom: '40px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }, {
            children: [
              el('container', '', {}, {
                children: [
                   el('image', '/templates/blog_preview.png', { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover' }),
                   el('text', 'Design', { fontSize: '12px', fontWeight: '700', color: 'var(--theme-primary)', marginBottom: '8px' }),
                   el('heading', 'Mastering Minimalist UI', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'Less is more when it comes to modern interface design...', { fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '16px' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                   el('image', '/templates/blog_preview.png', { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover' }),
                   el('text', 'Tech', { fontSize: '12px', fontWeight: '700', color: 'var(--theme-primary)', marginBottom: '8px' }),
                   el('heading', 'The Rise of No-Code', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'How visual builders are democratizing web development...', { fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '16px' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                   el('image', '/templates/blog_preview.png', { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover' }),
                   el('text', 'Creativity', { fontSize: '12px', fontWeight: '700', color: 'var(--theme-primary)', marginBottom: '8px' }),
                   el('heading', 'Finding Your Style', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'Developing a unique visual language for your personal brand...', { fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '16px' }),
                ]
              }),
            ]
          })
        ], { padding: '80px 32px', backgroundColor: '#fcfcfc' }),
        sec('Newsletter', [
          el('container', '', { backgroundColor: '#0f172a', borderRadius: '24px', padding: '64px', textAlign: 'center', color: '#ffffff' }, {
            children: [
               el('heading', 'Get the latest stories in your inbox', { fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#ffffff' }),
               el('text', 'Join over 10,000+ creators and stay updated with weekly insights.', { fontSize: '18px', color: '#94a3b8', marginBottom: '32px' }),
               el('container', '', { display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto' }, {
                 children: [
                    el('container', 'Enter your email', { flex: '1', backgroundColor: '#ffffff', color: '#64748b', padding: '12px 20px', borderRadius: '8px', textAlign: 'left' }),
                    el('button', 'Subscribe', { backgroundColor: 'var(--theme-primary)', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontWeight: '600' }),
                 ]
               }),
            ]
          })
        ], { padding: '100px 32px' }),
        sec('Footer', [
          el('container', '', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, {
            children: [
              el('heading', 'The Daily Journal', { fontSize: '20px', fontWeight: '800' }),
              el('text', '© 2026 Crafted with Passion.', { fontSize: '14px', color: '#64748b' }),
              el('container', '', { display: 'flex', gap: '24px' }, {
                 children: [
                    el('text', 'About', { fontWeight: '600' }),
                    el('text', 'Privacy', { fontWeight: '600' }),
                    el('text', 'Twitter', { fontWeight: '600' }),
                 ]
              })
            ]
          })
        ], { padding: '64px 32px', backgroundColor: '#ffffff' })
      ]),
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Luxury',
    category: 'Shop',
    description: 'Premium e-commerce store with product grids and elegant brand showcase.',
    preview: '/templates/ecommerce_preview.png',
    pages: [
      page('Shop', '/', [
        sec('Hero', [
          el('image', '/templates/ecommerce_preview.png', { position: 'absolute', inset: '0', zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.1' }),
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('heading', 'New Season Essentials', { fontSize: '44px', fontWeight: '300', color: 'var(--theme-heading)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '4px' }),
              el('text', 'Discover the curated collection of premium essentials for the modern lifestyle.', { fontSize: '16px', color: 'var(--theme-text-secondary)', marginBottom: '32px' }),
              el('button', 'Shop Collection', { backgroundColor: 'var(--theme-heading)', color: '#ffffff', padding: '12px 40px', borderRadius: '4px', fontSize: '14px' }),
            ]
          })
        ], { padding: '120px 32px 80px', backgroundColor: '#fdfdfd', position: 'relative', overflow: 'hidden' }),
        sec('Grid', [
          el('heading', 'Our Favorites', { fontSize: '24px', fontWeight: '600', textAlign: 'center', color: 'var(--theme-heading)', marginBottom: '40px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }, {
            children: [
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', '/templates/ecommerce_preview.png', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Essential Tee', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$45.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', '/templates/ecommerce_preview.png', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Wool Blazer', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$220.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', '/templates/ecommerce_preview.png', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Leather Tote', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$180.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', '/templates/ecommerce_preview.png', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Silk Scarf', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$65.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
            ]
          })
        ], { padding: '80px 32px', backgroundColor: '#ffffff' }),
        sec('Featured Collections', [
          el('heading', 'Curated Collections', { fontSize: '28px', fontWeight: '300', textAlign: 'center', marginBottom: '48px', textTransform: 'uppercase', letterSpacing: '2px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }, {
            children: [
              el('container', '', { position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden' }, {
                children: [
                   el('image', '/templates/ecommerce_preview.png', { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }),
                   el('container', '', { position: 'absolute', inset: '0', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }, {
                     children: [
                        el('heading', 'The Linen Series', { fontSize: '24px', color: '#ffffff', fontWeight: '400', marginBottom: '16px' }),
                        el('button', 'Explore Store', { backgroundColor: '#ffffff', color: '#000000', padding: '12px 24px', borderRadius: '4px', fontSize: '13px' }),
                     ]
                   })
                ]
              }),
              el('container', '', { position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden' }, {
                children: [
                   el('image', '/templates/ecommerce_preview.png', { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }),
                   el('container', '', { position: 'absolute', inset: '0', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }, {
                     children: [
                        el('heading', 'Modern Minimal', { fontSize: '24px', color: '#ffffff', fontWeight: '400', marginBottom: '16px' }),
                        el('button', 'View Collection', { backgroundColor: '#ffffff', color: '#000000', padding: '12px 24px', borderRadius: '4px', fontSize: '13px' }),
                     ]
                   })
                ]
              }),
            ]
          })
        ], { padding: '80px 32px' }),
        sec('Trust Badges', [
           el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', textAlign: 'center' }, {
             children: [
               el('container', '', {}, {
                 children: [
                    el('text', '🌍', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'Free Global Shipping', { fontSize: '16px', fontWeight: '600', marginBottom: '8px' }),
                    el('text', 'On orders over $200', { fontSize: '14px', color: '#64748b' }),
                 ]
               }),
               el('container', '', {}, {
                 children: [
                    el('text', '🛡️', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'Secure Payment', { fontSize: '16px', fontWeight: '600', marginBottom: '8px' }),
                    el('text', 'Trusted by over 50k customers', { fontSize: '14px', color: '#64748b' }),
                 ]
               }),
               el('container', '', {}, {
                 children: [
                    el('text', '✨', { fontSize: '32px', marginBottom: '16px' }),
                    el('heading', 'Sustainable Origin', { fontSize: '16px', fontWeight: '600', marginBottom: '8px' }),
                    el('text', 'Ethically sourced materials', { fontSize: '14px', color: '#64748b' }),
                 ]
               }),
             ]
           })
        ], { padding: '64px 32px', backgroundColor: '#f9f9f9' }),
        sec('Footer', [
          el('container', '', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, {
            children: [
              el('heading', 'ACME STORE', { fontSize: '18px', fontWeight: '800', letterSpacing: '2px' }),
              el('container', '', { display: 'flex', gap: '32px' }, {
                 children: [
                    el('text', 'Shop', { fontSize: '13px', fontWeight: '600' }),
                    el('text', 'Sustainability', { fontSize: '13px', fontWeight: '600' }),
                    el('text', 'Shipping', { fontSize: '13px', fontWeight: '600' }),
                    el('text', 'Contact', { fontSize: '13px', fontWeight: '600' }),
                 ]
              }),
              el('text', '© 2026', { fontSize: '13px', color: '#64748b' }),
            ]
          })
        ], { padding: '64px 32px', backgroundColor: '#ffffff' })
      ]),
    ],
  },
  {
    id: 'restaurant',
    name: 'Fine Dine',
    category: 'Food',
    description: 'Sophisticated restaurant website with menu showcase and reservation focus.',
    preview: '/templates/restaurant_preview.png',
    pages: [
      page('Menu', '/', [
        sec('Hero', [
          el('image', '/templates/restaurant_preview.png', { position: 'absolute', inset: '0', zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.4' }),
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('text', 'Est. 1994', { fontSize: '12px', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '16px' }),
              el('heading', 'Exquisite Culinary Experience', { fontSize: '56px', fontWeight: '700', color: '#ffffff', marginBottom: '24px', fontFamily: 'serif' }),
              el('button', 'Book a Table', { backgroundColor: 'transparent', color: '#d4af37', padding: '12px 32px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#d4af37' }),
            ]
          })
        ], { padding: '150px 32px', backgroundColor: '#111111', position: 'relative', overflow: 'hidden' }),
        sec('Showcase', [
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '64px', alignItems: 'center' }, {
            children: [
              el('image', '/templates/restaurant_preview.png', { width: '100%', height: '450px', borderRadius: '24px', objectFit: 'cover' }),
              el('container', '', {}, {
                children: [
                  el('text', 'Our Story', { fontSize: '14px', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }),
                  el('heading', 'A Tradition of Excellence', { fontSize: '32px', fontWeight: '700', marginBottom: '24px', fontFamily: 'serif' }),
                  el('text', 'Since 1994, we have been serving the finest culinary creations. Our passion for quality ingredients and exceptional service has made us a cornerstone of fine dining in the city.', { fontSize: '18px', color: 'var(--theme-text-secondary)', lineHeight: '1.8', marginBottom: '32px' }),
                  el('button', 'Learn More', { backgroundColor: 'transparent', color: '#000000', padding: '12px 32px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#000000' }),
                ]
              })
            ]
          })
        ], { padding: '100px 32px', backgroundColor: '#ffffff' }),
        sec('Menu Categories', [
           el('heading', 'Our Seasonal Menu', { fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '56px', fontFamily: 'serif' }),
           el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }, {
             children: [
               el('container', '', {}, {
                 children: [
                    el('heading', 'Appetizers', { fontSize: '20px', fontWeight: '700', color: '#d4af37', marginBottom: '24px', borderWidth: '0 0 1px 0', borderStyle: 'solid', borderColor: '#f1f1f1', paddingBottom: '12px' }),
                    el('container', '', { marginBottom: '20px' }, {
                      children: [
                        el('heading', 'Truffle Arancini - $18', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                        el('text', 'Wild mushrooms, parmesan, truffle aioli', { fontSize: '14px', color: '#64748b' }),
                      ]
                    }),
                    el('container', '', { marginBottom: '20px' }, {
                      children: [
                        el('heading', 'Seared Scallops - $24', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                        el('text', 'Pea purée, crispy pancetta, lemon oil', { fontSize: '14px', color: '#64748b' }),
                      ]
                    }),
                 ]
               }),
               el('container', '', {}, {
                 children: [
                    el('heading', 'Mains', { fontSize: '20px', fontWeight: '700', color: '#d4af37', marginBottom: '24px', borderWidth: '0 0 1px 0', borderStyle: 'solid', borderColor: '#f1f1f1', paddingBottom: '12px' }),
                    el('container', '', { marginBottom: '20px' }, {
                      children: [
                        el('heading', 'Wagyu Ribeye - $65', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                        el('text', 'Grass-fed ribeye, bone marrow butter', { fontSize: '14px', color: '#64748b' }),
                      ]
                    }),
                    el('container', '', { marginBottom: '20px' }, {
                      children: [
                        el('heading', 'Lobster Risotto - $48', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                        el('text', 'Saffron, heirloom tomatoes, fresh herbs', { fontSize: '14px', color: '#64748b' }),
                      ]
                    }),
                 ]
               }),
               el('container', '', {}, {
                 children: [
                    el('heading', 'Desserts', { fontSize: '20px', fontWeight: '700', color: '#d4af37', marginBottom: '24px', borderWidth: '0 0 1px 0', borderStyle: 'solid', borderColor: '#f1f1f1', paddingBottom: '12px' }),
                    el('container', '', { marginBottom: '20px' }, {
                      children: [
                        el('heading', 'Dark Chocolate Soufflé - $16', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                        el('text', 'Raspberry coulis, vanilla bean cream', { fontSize: '14px', color: '#64748b' }),
                      ]
                    }),
                    el('container', '', { marginBottom: '20px' }, {
                      children: [
                        el('heading', 'Lemon Tarte - $14', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                        el('text', 'Shortcrust, citrus curd, meringue', { fontSize: '14px', color: '#64748b' }),
                      ]
                    }),
                 ]
               }),
             ]
           })
        ], { padding: '100px 32px', backgroundColor: '#fcfcfc' }),
        sec('Location', [
           el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px' }, {
             children: [
               el('container', '', {}, {
                 children: [
                    el('heading', 'Visit Us', { fontSize: '28px', fontWeight: '700', marginBottom: '24px', fontFamily: 'serif' }),
                    el('text', '123 Fine Dine Street\\nCulinary District, NY 10001', { fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }),
                    el('heading', 'Hours', { fontSize: '20px', fontWeight: '700', marginBottom: '16px' }),
                    el('text', 'Tue - Thu: 5:00 PM - 10:00 PM\\nFri - Sat: 5:00 PM - 11:00 PM\\nSun: 4:00 PM - 9:00 PM', { fontSize: '15px', color: '#64748b', lineHeight: '1.8' }),
                 ]
               }),
               el('image', '/templates/restaurant_preview.png', { width: '100%', height: '350px', borderRadius: '12px', objectFit: 'cover' }),
             ]
           })
        ], { padding: '80px 32px', backgroundColor: '#ffffff' }),
        sec('Footer', [
          el('container', '', { textAlign: 'center' }, {
            children: [
               el('heading', 'Fine Dine', { fontSize: '24px', fontWeight: '700', color: '#d4af37', marginBottom: '16px', fontFamily: 'serif' }),
               el('text', '© 2026 Experience Excellence.', { fontSize: '14px', color: '#64748b', marginBottom: '24px' }),
               el('container', '', { display: 'flex', justifyContent: 'center', gap: '24px' }, {
                 children: [
                    el('text', 'Instagram', { fontSize: '14px', fontWeight: '600' }),
                    el('text', 'Facebook', { fontSize: '14px', fontWeight: '600' }),
                    el('text', 'Reservations', { fontSize: '14px', fontWeight: '600' }),
                 ]
               })
            ]
          })
        ], { padding: '64px 32px', backgroundColor: '#111111', color: '#ffffff' })
      ])
    ]
  },
  {
    id: 'business',
    name: 'Business Pro',
    category: 'Business',
    description: 'Professional business website with about, services, and contact sections.',
    preview: '/templates/business_preview.png',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('heading', 'Growing Your Business Together', { fontSize: '48px', fontWeight: '800', color: 'var(--theme-heading)', marginBottom: '16px', lineHeight: '1.15' }),
              el('text', 'We provide strategic consulting and digital solutions to help businesses reach their full potential.', { fontSize: '17px', color: 'var(--theme-text-secondary)', maxWidth: '580px', margin: '0 auto 32px', lineHeight: '1.7' }),
              el('image', '/templates/business_preview.png', { width: '100%', borderRadius: '12px', marginBottom: '32px' }),
              el('button', 'Contact Us', { backgroundColor: '#1e40af', color: '#ffffff', padding: '14px 32px', borderRadius: '8px' }),
            ]
          }),
        ], { padding: '100px 32px 80px', backgroundColor: '#f9fafb' }),
        sec('Services', [
          el('heading', 'Our Services', { fontSize: '32px', fontWeight: '700', textAlign: 'center', color: 'var(--theme-heading)', marginBottom: '48px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }, {
            children: [
              el('container', '', { padding: '32px', backgroundColor: 'white', borderRadius: '12px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }, {
                children: [
                  el('text', '📋', { fontSize: '24px', marginBottom: '16px' }),
                  el('heading', 'Strategy', { fontSize: '18px', fontWeight: '700', marginBottom: '12px' }),
                  el('text', 'Data-driven strategies tailored to your unique business goals.', { fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
              el('container', '', { padding: '32px', backgroundColor: 'white', borderRadius: '12px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }, {
                children: [
                   el('text', '💻', { fontSize: '24px', marginBottom: '16px' }),
                   el('heading', 'Digital', { fontSize: '18px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'Web, mobile, and cloud solutions built for scale.', { fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
              el('container', '', { padding: '32px', backgroundColor: 'white', borderRadius: '12px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }, {
                children: [
                   el('text', '📈', { fontSize: '24px', marginBottom: '16px' }),
                   el('heading', 'Growth', { fontSize: '18px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'Marketing and analytics to accelerate your growth.', { fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
            ]
          }),
        ], { padding: '100px 32px', backgroundColor: '#ffffff' }),
        sec('Testimonials', [
           el('heading', 'What Our Clients Say', { fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '48px' }),
           el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }, {
             children: [
               el('container', '', { padding: '40px', backgroundColor: '#f8fafc', borderRadius: '20px' }, {
                 children: [
                    el('text', '"The strategic insights provided by Business Pro transformed our digital presence and doubled our lead flow in six months."', { fontSize: '18px', marginBottom: '24px', fontStyle: 'italic' }),
                    el('heading', 'James Wilson', { fontSize: '16px', fontWeight: '700' }),
                    el('text', 'CEO at TechLogix', { fontSize: '14px', color: '#64748b' }),
                 ]
               }),
               el('container', '', { padding: '40px', backgroundColor: '#f8fafc', borderRadius: '20px' }, {
                 children: [
                    el('text', '"Professionalism and scalability. They built our entire cloud infrastructure from the ground up without a single hitch."', { fontSize: '18px', marginBottom: '24px', fontStyle: 'italic' }),
                    el('heading', 'Sarah Chen', { fontSize: '16px', fontWeight: '700' }),
                    el('text', 'CTO at DataFlow', { fontSize: '14px', color: '#64748b' }),
                 ]
               }),
             ]
           })
        ], { padding: '100px 32px', backgroundColor: '#ffffff' }),
        sec('Footer', [
          el('container', '', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, {
            children: [
               el('heading', 'Business Pro', { fontSize: '20px', fontWeight: '800', color: '#1e40af' }),
               el('text', '© 2026 Strategy for Success.', { fontSize: '14px', color: '#64748b' }),
               el('container', '', { display: 'flex', gap: '24px' }, {
                 children: [
                    el('text', 'Privacy', { fontWeight: '600' }),
                    el('text', 'Terms', { fontWeight: '600' }),
                    el('text', 'Contact', { fontWeight: '600' }),
                 ]
              })
            ]
          })
        ], { padding: '64px 32px', borderTop: '1px solid #e2e8f0' })
      ]),
    ],
  },
  {
    id: 'agency',
    name: 'Creative Agency',
    category: 'Creative',
    description: 'Bold and creative agency landing page with dark theme and dynamic layout.',
    preview: '/templates/agency_preview.png',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('text', 'Creative Agency', { fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', fontWeight: '600' }),
              el('heading', 'We Create Digital Experiences', { fontSize: '52px', fontWeight: '800', color: '#ffffff', marginBottom: '24px', lineHeight: '1.1' }),
              el('image', '/templates/agency_preview.png', { width: '100%', borderRadius: '16px', marginBottom: '32px', opacity: '0.8' }),
              el('text', 'Award-winning design studio specializing in branding, web design, and interactive experiences.', { fontSize: '17px', color: '#94a3b8', maxWidth: '550px', margin: '0 auto 40px', lineHeight: '1.7' }),
              el('button', 'See Our Work →', { backgroundColor: '#ffffff', color: '#0f172a', padding: '14px 32px', borderRadius: '999px' }),
            ]
          }),
        ], { padding: '120px 32px 100px', backgroundColor: '#0f172a' }),
        sec('Stats', [
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }, {
            children: [
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('heading', '150+', { fontSize: '32px', fontWeight: '800', color: '#ffffff' }),
                  el('text', 'Projects Completed', { fontSize: '14px', color: '#94a3b8' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('heading', '50+', { fontSize: '32px', fontWeight: '800', color: '#ffffff' }),
                  el('text', 'Happy Clients', { fontSize: '14px', color: '#94a3b8' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('heading', '12', { fontSize: '32px', fontWeight: '800', color: '#ffffff' }),
                  el('text', 'Awards Won', { fontSize: '14px', color: '#94a3b8' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('heading', '8+', { fontSize: '32px', fontWeight: '800', color: '#ffffff' }),
                  el('text', 'Years Experience', { fontSize: '14px', color: '#94a3b8' }),
                ]
              }),
            ]
          }),
        ], { padding: '64px 32px', backgroundColor: '#1e293b' }),
        sec('Team', [
           el('heading', 'Meet the Visionaries', { fontSize: '32px', fontWeight: '700', textAlign: 'center', color: '#ffffff', marginBottom: '48px' }),
           el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }, {
             children: [
               el('container', '', { textAlign: 'center' }, {
                 children: [
                    el('image', '/templates/portfolio_preview.png', { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }),
                    el('heading', 'Marcus Kane', { fontSize: '18px', fontWeight: '700', color: '#ffffff' }),
                    el('text', 'Creative Director', { fontSize: '14px', color: '#94a3b8' }),
                 ]
               }),
               el('container', '', { textAlign: 'center' }, {
                 children: [
                    el('image', '/templates/portfolio_preview.png', { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }),
                    el('heading', 'Elena Vance', { fontSize: '18px', fontWeight: '700', color: '#ffffff' }),
                    el('text', 'Lead Designer', { fontSize: '14px', color: '#94a3b8' }),
                 ]
               }),
               el('container', '', { textAlign: 'center' }, {
                 children: [
                    el('image', '/templates/portfolio_preview.png', { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }),
                    el('heading', 'Simon Black', { fontSize: '18px', fontWeight: '700', color: '#ffffff' }),
                    el('text', 'Brand Strategist', { fontSize: '14px', color: '#94a3b8' }),
                 ]
               }),
             ]
           })
        ], { padding: '100px 32px', backgroundColor: '#0f172a' }),
        sec('Footer', [
          el('container', '', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, {
            children: [
               el('heading', 'AGENCY.', { fontSize: '20px', fontWeight: '900', color: '#ffffff', letterSpacing: '4px' }),
               el('text', '© 2026 Disrupting the Digital.', { fontSize: '13px', color: '#94a3b8' }),
               el('button', 'Work With Us', { backgroundColor: '#ffffff', color: '#0f172a', padding: '10px 24px', borderRadius: '4px', fontWeight: '700' }),
            ]
          })
        ], { padding: '64px 32px', backgroundColor: '#0f172a' })
      ]),
    ],
  }
];
