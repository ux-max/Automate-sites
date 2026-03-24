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
  const children = props?.children as CanvasElement[] | undefined;
  const cleanProps = { ...props };
  if (cleanProps.children) delete cleanProps.children;
  return { id: uuidv4(), type, content, styles, props: cleanProps, children };
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
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }, {
            children: [
              el('heading', 'Build Better Products, Faster', { fontSize: '48px', fontWeight: '800', color: 'var(--theme-heading)', marginBottom: '16px', lineHeight: '1.1' }),
              el('text', 'The all-in-one platform that helps teams ship products 10x faster. Start building today.', { fontSize: '18px', color: 'var(--theme-text-secondary)', marginBottom: '32px', lineHeight: '1.7' }),
              el('image', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', { width: '100%', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', marginBottom: '32px' }),
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
    preview: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80',
    pages: [
      page('Portfolio', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('text', 'Hello, I\'m', { fontSize: '18px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }),
              el('heading', 'Sarah Johnson', { fontSize: '56px', fontWeight: '800', color: 'var(--theme-heading)', marginBottom: '16px' }),
              el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '24px' }),
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
                  el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '100%', height: '300px', borderRadius: '12px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Brand Identity — Acme Co.', { fontSize: '20px', fontWeight: '700', marginBottom: '8px' }),
                  el('text', 'Complete brand overhaul including logo, guidelines, and collateral.', { color: 'var(--theme-text-secondary)', lineHeight: '1.6' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '100%', height: '300px', borderRadius: '12px', marginBottom: '16px', objectFit: 'cover' }),
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
              el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '100%', height: '500px', borderRadius: '24px', objectFit: 'cover' }),
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
    preview: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
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
              el('image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', { width: '400px', height: '280px', borderRadius: '16px', objectFit: 'cover' }),
              el('container', '', {}, {
                children: [
                  el('text', 'Featured Post', { fontSize: '13px', fontWeight: '700', color: 'var(--theme-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }),
                  el('heading', 'The Future of Web Design in 2026', { fontSize: '36px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }),
                  el('text', 'Exploring emerging trends in web design and how AI is reshaping the creative process. Learn how to stay ahead in the ever-evolving digital landscape...', { fontSize: '16px', color: 'var(--theme-text-secondary)', marginBottom: '24px', lineHeight: '1.7' }),
                  el('container', '', { display: 'flex', alignItems: 'center', gap: '12px' }, {
                    children: [
                       el('image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', { width: '40px', height: '40px', borderRadius: '50%' }),
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
                   el('image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover' }),
                   el('text', 'Design', { fontSize: '12px', fontWeight: '700', color: 'var(--theme-primary)', marginBottom: '8px' }),
                   el('heading', 'Mastering Minimalist UI', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'Less is more when it comes to modern interface design...', { fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '16px' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                   el('image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover' }),
                   el('text', 'Tech', { fontSize: '12px', fontWeight: '700', color: 'var(--theme-primary)', marginBottom: '8px' }),
                   el('heading', 'The Rise of No-Code', { fontSize: '20px', fontWeight: '700', marginBottom: '12px' }),
                   el('text', 'How visual builders are democratizing web development...', { fontSize: '14px', color: 'var(--theme-text-secondary)', marginBottom: '16px' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                   el('image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover' }),
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
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    pages: [
      page('Shop', '/', [
        sec('Hero', [
          el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { position: 'absolute', inset: '0', zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.1' }),
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
                  el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Essential Tee', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$45.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Wool Blazer', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$220.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
                  el('heading', 'Leather Tote', { fontSize: '16px', fontWeight: '600', marginBottom: '4px' }),
                  el('text', '$180.00', { fontSize: '14px', color: 'var(--theme-text-secondary)' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { width: '100%', minHeight: '200px', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover' }),
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
                   el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }),
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
                   el('image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }),
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
    preview: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    pages: [
      page('Menu', '/', [
        sec('Hero', [
          el('image', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', { position: 'absolute', inset: '0', zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.4' }),
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
              el('image', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', { width: '100%', height: '450px', borderRadius: '24px', objectFit: 'cover' }),
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
               el('image', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', { width: '100%', height: '350px', borderRadius: '12px', objectFit: 'cover' }),
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
    preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('heading', 'Growing Your Business Together', { fontSize: '48px', fontWeight: '800', color: 'var(--theme-heading)', marginBottom: '16px', lineHeight: '1.15' }),
              el('text', 'We provide strategic consulting and digital solutions to help businesses reach their full potential.', { fontSize: '17px', color: 'var(--theme-text-secondary)', maxWidth: '580px', margin: '0 auto 32px', lineHeight: '1.7' }),
              el('image', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', { width: '100%', borderRadius: '12px', marginBottom: '32px' }),
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
    preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, {
            children: [
              el('text', 'Creative Agency', { fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', fontWeight: '600' }),
              el('heading', 'We Create Digital Experiences', { fontSize: '52px', fontWeight: '800', color: '#ffffff', marginBottom: '24px', lineHeight: '1.1' }),
              el('image', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', { width: '100%', borderRadius: '16px', marginBottom: '32px', opacity: '0.8' }),
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
                    el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }),
                    el('heading', 'Marcus Kane', { fontSize: '18px', fontWeight: '700', color: '#ffffff' }),
                    el('text', 'Creative Director', { fontSize: '14px', color: '#94a3b8' }),
                 ]
               }),
               el('container', '', { textAlign: 'center' }, {
                 children: [
                    el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }),
                    el('heading', 'Elena Vance', { fontSize: '18px', fontWeight: '700', color: '#ffffff' }),
                    el('text', 'Lead Designer', { fontSize: '14px', color: '#94a3b8' }),
                 ]
               }),
               el('container', '', { textAlign: 'center' }, {
                 children: [
                    el('image', 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80', { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }),
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

  ,
  {
    id: 'startup',
    name: 'Tech Startup',
    category: 'Business',
    description: 'High-impact launch page for software and tech startups.',
    preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }, {
            children: [
              el('text', '🚀 NEW FEATURE LAUNCH', { fontSize: '12px', fontWeight: '700', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '20px', letterSpacing: '1px', marginBottom: '24px' }),
              el('heading', 'The modern platform for agile engineering teams', { fontSize: '56px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-1px' }),
              el('text', 'Ship features faster, manage sprints effortlessly, and bring your entire engineering workflow into one powerful workspace.', { fontSize: '20px', color: '#64748b', marginBottom: '40px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 40px' }),
              el('container', '', { display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }, {
                children: [
                  el('button', 'Start for free', { backgroundColor: '#0f172a', color: '#ffffff', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)' }),
                  el('button', 'Book a demo', { backgroundColor: '#ffffff', color: '#0f172a', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '600', border: '1px solid #e2e8f0' }),
                ]
              }),
              el('image', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', { width: '100%', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }),
            ]
          }),
        ], { padding: '120px 32px 100px', backgroundColor: '#f8fafc' }),
        sec('Logos', [
          el('text', 'TRUSTED BY INNOVATIVE TEAMS WORLDWIDE', { fontSize: '12px', fontWeight: '600', color: '#94a3b8', textAlign: 'center', letterSpacing: '2px', marginBottom: '32px' }),
          el('container', '', { display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap', opacity: '0.6' }, {
            children: [
              el('heading', 'ACME Corp', { fontSize: '24px', fontWeight: '800', color: '#0f172a' }),
              el('heading', 'GlobalTech', { fontSize: '24px', fontWeight: '800', color: '#0f172a' }),
              el('heading', 'Nexus', { fontSize: '24px', fontWeight: '800', color: '#0f172a' }),
              el('heading', 'Velocity', { fontSize: '24px', fontWeight: '800', color: '#0f172a' }),
            ]
          })
        ], { padding: '64px 32px', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9' }),
        sec('Features', [
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '64px', alignItems: 'center' }, {
            children: [
              el('container', '', {}, {
                children: [
                  el('text', 'STREAMLINED WORKFLOW', { fontSize: '14px', fontWeight: '700', color: '#3b82f6', marginBottom: '16px', letterSpacing: '1px' }),
                  el('heading', 'Everything you need to ship software faster', { fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', lineHeight: '1.2' }),
                  el('text', 'Our platform combines project management, documentation, and communication in one seamless interface designed specifically for software development workflows.', { fontSize: '18px', color: '#64748b', marginBottom: '32px', lineHeight: '1.7' }),
                  el('container', '', { display: 'flex', flexDirection: 'column', gap: '16px' }, {
                    children: [
                      el('text', '✓ Built-in Git integrations', { fontSize: '16px', fontWeight: '500', color: '#0f172a' }),
                      el('text', '✓ Automated sprint planning', { fontSize: '16px', fontWeight: '500', color: '#0f172a' }),
                      el('text', '✓ Real-time collaboration', { fontSize: '16px', fontWeight: '500', color: '#0f172a' }),
                    ]
                  })
                ]
              }),
              el('image', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', { width: '100%', height: '400px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }),
            ]
          })
        ], { padding: '120px 32px', backgroundColor: '#ffffff' }),
        sec('CTA', [
          el('container', '', { backgroundColor: '#0f172a', borderRadius: '24px', padding: '80px 40px', textAlign: 'center' }, {
            children: [
              el('heading', 'Ready to transform your engineering workflow?', { fontSize: '40px', fontWeight: '800', color: '#ffffff', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }),
              el('text', 'Join thousands of developers building the future on our platform.', { fontSize: '18px', color: '#94a3b8', marginBottom: '40px' }),
              el('button', 'Get Started for Free', { backgroundColor: '#3b82f6', color: '#ffffff', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: '600' }),
            ]
          })
        ], { padding: '64px 32px 120px', backgroundColor: '#ffffff' })
      ])
    ]
  },
  {
    id: 'resume',
    name: 'Personal Resume',
    category: 'Creative',
    description: 'Sleek personal CV and portfolio template for professionals.',
    preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    pages: [
      page('Resume', '/', [
        sec('Header', [
          el('container', '', { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '48px', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }, {
            children: [
              el('image', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80', { width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }),
              el('container', '', {}, {
                children: [
                  el('heading', 'Dr. Elena Rodriguez', { fontSize: '48px', fontWeight: '800', color: '#111827', marginBottom: '8px' }),
                  el('text', 'Senior Machine Learning Engineer', { fontSize: '20px', color: '#4f46e5', fontWeight: '600', marginBottom: '16px' }),
                  el('text', 'Passionate about building scalable AI systems and deploying robust models to production. With 8+ years of experience bridging the gap between research and high-impact engineering.', { fontSize: '16px', color: '#4b5563', lineHeight: '1.7', marginBottom: '24px' }),
                  el('container', '', { display: 'flex', gap: '16px' }, {
                    children: [
                      el('button', 'Download CV', { backgroundColor: '#111827', color: '#ffffff', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }),
                      el('button', 'Contact Me', { backgroundColor: 'transparent', color: '#111827', border: '1px solid #d1d5db', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }),
                    ]
                  })
                ]
              })
            ]
          })
        ], { padding: '100px 32px', backgroundColor: '#f9fafb' }),
        sec('Experience', [
           el('heading', 'Work Experience', { fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '48px', maxWidth: '900px', margin: '0 auto 48px', borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }),
           el('container', '', { display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '900px', margin: '0 auto' }, {
             children: [
               el('container', '', { display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px' }, {
                 children: [
                   el('container', '', {}, {
                     children: [
                       el('text', '2022 — Present', { fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '4px' }),
                       el('text', 'San Francisco, CA', { fontSize: '14px', color: '#9ca3af' }),
                     ]
                   }),
                   el('container', '', {}, {
                     children: [
                       el('heading', 'TechGiant AI', { fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '4px' }),
                       el('text', 'Lead ML Engineer', { fontSize: '16px', fontWeight: '500', color: '#4f46e5', marginBottom: '16px' }),
                       el('text', 'Architected and deployed large-scale recommendation systems serving 50M+ daily active users. Led a team of 4 engineers to reduce model latency by 45%.', { fontSize: '16px', color: '#4b5563', lineHeight: '1.6' }),
                     ]
                   })
                 ]
               }),
               el('container', '', { display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px' }, {
                 children: [
                   el('container', '', {}, {
                     children: [
                       el('text', '2019 — 2022', { fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '4px' }),
                       el('text', 'Boston, MA', { fontSize: '14px', color: '#9ca3af' }),
                     ]
                   }),
                   el('container', '', {}, {
                     children: [
                       el('heading', 'DataScale Inc', { fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '4px' }),
                       el('text', 'Data Scientist', { fontSize: '16px', fontWeight: '500', color: '#4f46e5', marginBottom: '16px' }),
                       el('text', 'Developed predictive models for customer churn resulting in a 12% increase in retention. Built automated data pipelines using Apache Airflow and PySpark.', { fontSize: '16px', color: '#4b5563', lineHeight: '1.6' }),
                     ]
                   })
                 ]
               }),
             ]
           })
        ], { padding: '80px 32px', backgroundColor: '#ffffff' }),
        sec('Skills', [
          el('heading', 'Skills & Tech Stack', { fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '48px', maxWidth: '900px', margin: '0 auto 48px', borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto' }, {
            children: [
              el('container', '', {}, {
                children: [
                  el('heading', 'Languages', { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#111827' }),
                  el('text', 'Python, TypeScript, SQL, Go, C++', { fontSize: '15px', color: '#4b5563', lineHeight: '2' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('heading', 'Frameworks', { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#111827' }),
                  el('text', 'PyTorch, TensorFlow, React, FastAPI', { fontSize: '15px', color: '#4b5563', lineHeight: '2' }),
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('heading', 'Infrastructure', { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#111827' }),
                  el('text', 'AWS, Kubernetes, Docker, Terraform', { fontSize: '15px', color: '#4b5563', lineHeight: '2' }),
                ]
              }),
            ]
          })
        ], { padding: '80px 32px 100px', backgroundColor: '#ffffff' })
      ])
    ]
  },
  {
    id: 'event',
    name: 'Tech Conference',
    category: 'Content',
    description: 'Dynamic event landing page for conferences and meetups.',
    preview: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    pages: [
      page('Event', '/', [
        sec('Hero', [
          el('image', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80', { position: 'absolute', inset: '0', zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.3' }),
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }, {
            children: [
              el('text', 'OCTOBER 15-17, 2026 • SAN FRANCISCO', { fontSize: '14px', fontWeight: '700', color: '#fb923c', letterSpacing: '3px', marginBottom: '24px' }),
              el('heading', 'The Future of Web Development', { fontSize: '64px', fontWeight: '900', color: '#ffffff', marginBottom: '32px', lineHeight: '1.1', textTransform: 'uppercase' }),
              el('text', 'Join 5,000+ developers, designers, and creators for three days of hands-on workshops, inspiring keynotes, and networking.', { fontSize: '20px', color: '#e2e8f0', marginBottom: '48px', lineHeight: '1.6' }),
              el('button', 'Get Tickets Now', { backgroundColor: '#fb923c', color: '#ffffff', padding: '18px 40px', borderRadius: '4px', fontSize: '18px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }),
            ]
          })
        ], { padding: '150px 32px', backgroundColor: '#0f172a', position: 'relative', overflow: 'hidden' }),
        sec('Speakers', [
          el('heading', 'Featured Speakers', { fontSize: '36px', fontWeight: '800', textAlign: 'center', color: '#0f172a', marginBottom: '64px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }, {
            children: [
              el('container', '', { textAlign: 'center' }, {
                children: [
                   el('image', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80', { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }),
                   el('heading', 'Maya Patel', { fontSize: '20px', fontWeight: '700', marginBottom: '4px' }),
                   el('text', 'Vercel', { fontSize: '14px', color: '#fb923c', fontWeight: '600' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                   el('image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }),
                   el('heading', 'Marcus Webb', { fontSize: '20px', fontWeight: '700', marginBottom: '4px' }),
                   el('text', 'Stripe', { fontSize: '14px', color: '#fb923c', fontWeight: '600' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                   el('image', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80', { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }),
                   el('heading', 'Sarah Jenkins', { fontSize: '20px', fontWeight: '700', marginBottom: '4px' }),
                   el('text', 'Figma', { fontSize: '14px', color: '#fb923c', fontWeight: '600' }),
                ]
              }),
              el('container', '', { textAlign: 'center' }, {
                children: [
                   el('image', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }),
                   el('heading', 'David Kim', { fontSize: '20px', fontWeight: '700', marginBottom: '4px' }),
                   el('text', 'Supabase', { fontSize: '14px', color: '#fb923c', fontWeight: '600' }),
                ]
              }),
            ]
          })
        ], { padding: '100px 32px', backgroundColor: '#ffffff' })
      ])
    ]
  }


  ,
  {
    id: 'web3-crypto',
    name: 'Web3 & Crypto',
    category: 'Technology',
    description: 'Dark-mode, high-tech landing page for blockchain and Web3 projects.',
    preview: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec674?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: '2' }, {
            children: [
              el('text', 'DECENTRALIZED FINANCE', { fontSize: '13px', fontWeight: '800', color: '#a855f7', letterSpacing: '4px', marginBottom: '24px', padding: '6px 16px', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '30px', backgroundColor: 'rgba(168, 85, 247, 0.1)' }),
              el('heading', 'The Future of Money is Unstoppable.', { fontSize: '72px', fontWeight: '900', color: '#ffffff', marginBottom: '32px', lineHeight: '1.05', letterSpacing: '-2px', textShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }),
              el('text', 'Trade, stake, and earn yields with the most secure layer-2 protocol. Zero gas fees, instant finality, completely permissionless.', { fontSize: '22px', color: '#94a3b8', marginBottom: '48px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 48px' }),
              el('container', '', { display: 'flex', gap: '20px', justifyContent: 'center' }, {
                children: [
                  el('button', 'Launch App', { backgroundColor: 'linear-gradient(135deg, #a855f7, #ec4899)', color: '#ffffff', padding: '18px 40px', borderRadius: '12px', fontSize: '18px', fontWeight: '700', boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.6)', border: 'none' }),
                  el('button', 'Read Whitepaper', { backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', padding: '18px 40px', borderRadius: '12px', fontSize: '18px', fontWeight: '600', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }),
                ]
              })
            ]
          }),
          el('container', '', { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: '1', pointerEvents: 'none', borderRadius: '50%' }, {}),
        ], { padding: '180px 32px', backgroundColor: '#09090b', position: 'relative', overflow: 'hidden' }),
        sec('Stats Grid', [
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }, {
            children: [
              el('container', '', { padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }, { children: [el('heading', '$4.2B', { fontSize: '40px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }), el('text', 'Total Value Locked', { fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' })] }),
              el('container', '', { padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }, { children: [el('heading', '2M+', { fontSize: '40px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }), el('text', 'Active Users', { fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' })] }),
              el('container', '', { padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }, { children: [el('heading', '<0.01s', { fontSize: '40px', fontWeight: '800', color: '#a855f7', marginBottom: '8px' }), el('text', 'Transaction Time', { fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' })] }),
              el('container', '', { padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }, { children: [el('heading', '100%', { fontSize: '40px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }), el('text', 'Open Source', { fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' })] }),
            ]
          })
        ], { padding: '80px 32px', backgroundColor: '#09090b', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }),
        sec('Features App', [
          el('container', '', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }, {
            children: [
              el('image', 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1000&q=80', { width: '100%', borderRadius: '24px', boxShadow: '0 0 50px rgba(168, 85, 247, 0.2)' }),
              el('container', '', {}, {
                children: [
                  el('text', 'ENTER THE METAVERSE', { fontSize: '14px', fontWeight: '700', color: '#ec4899', letterSpacing: '2px', marginBottom: '16px' }),
                  el('heading', 'Swap tokens with zero slippage.', { fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '24px', lineHeight: '1.2' }),
                  el('text', 'Our advanced routing algorithm aggregates liquidity across 15+ DEXs to ensure you always get the absolute best price, protecting you from MEV bots and wild volatility.', { fontSize: '18px', color: '#94a3b8', lineHeight: '1.8', marginBottom: '40px' }),
                  el('container', '', { display: 'flex', flexDirection: 'column', gap: '20px' }, {
                    children: [
                      el('container', '', { display: 'flex', alignItems: 'flex-start', gap: '16px' }, { children: [ el('text', '✦', { fontSize: '24px', color: '#a855f7' }), el('container', '', {}, { children: [ el('heading', 'Non-Custodial', { fontSize: '20px', color: '#ffffff', marginBottom: '8px', fontWeight: '700' }), el('text', 'You hold the keys. We never have access to your funds.', { fontSize: '16px', color: '#94a3b8' })] }) ] }),
                      el('container', '', { display: 'flex', alignItems: 'flex-start', gap: '16px' }, { children: [ el('text', '✦', { fontSize: '24px', color: '#a855f7' }), el('container', '', {}, { children: [ el('heading', 'Institutional Grade Security', { fontSize: '20px', color: '#ffffff', marginBottom: '8px', fontWeight: '700' }), el('text', 'Audited by top tier security firms including CertiK and Trail of Bits.', { fontSize: '16px', color: '#94a3b8' })] }) ] })
                    ]
                  })
                ]
              })
            ]
          })
        ], { padding: '140px 32px', backgroundColor: '#09090b' })
      ])
    ]
  },
  {
    id: 'real-estate-luxury',
    name: 'Luxury Real Estate',
    category: 'Business',
    description: 'Elegant properties portfolio with massive imagery and refined typography.',
    preview: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('image', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80', { position: 'absolute', inset: '0', zIndex: '-1', width: '100%', height: '100%', objectFit: 'cover' }),
          el('container', '', { position: 'absolute', inset: '0', zIndex: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)', pointerEvents: 'none' }, {}),
          el('container', '', { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: '1', paddingBottom: '60px' }, {
            children: [
              el('text', 'EXCLUSIVE LISTINGS', { fontSize: '14px', fontWeight: '600', color: '#e2e8f0', letterSpacing: '4px', marginBottom: '16px' }),
              el('heading', 'Discover Exceptional Homes.', { fontSize: '72px', fontWeight: '400', color: '#ffffff', marginBottom: '24px', lineHeight: '1.1', fontFamily: '"Playfair Display", serif' }),
              el('container', '', { display: 'flex', gap: '24px', alignItems: 'center' }, {
                children: [
                   el('button', 'View Properties', { backgroundColor: '#ffffff', color: '#0f172a', padding: '16px 40px', fontSize: '16px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }),
                   el('button', 'Contact Agent', { backgroundColor: 'transparent', color: '#ffffff', padding: '16px 40px', fontSize: '16px', fontWeight: '500', border: '1px solid #ffffff', textTransform: 'uppercase', letterSpacing: '1px' })
                ]
              })
            ]
          })
        ], { height: '90vh', padding: '0 32px', position: 'relative', overflow: 'hidden' }),
        sec('Welcome', [
          el('container', '', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }, {
            children: [
              el('container', '', {}, {
                children: [
                  el('heading', 'Redefining Luxury Living in the Modern Age.', { fontSize: '48px', fontWeight: '400', color: '#0f172a', marginBottom: '32px', fontFamily: '"Playfair Display", serif', lineHeight: '1.2' }),
                  el('text', 'We specialize in curating the finest properties globally. From modern architectural masterpieces in Los Angeles to historic estates in the French Riviera, our portfolio represents the pinnacle of luxury real estate.', { fontSize: '18px', color: '#64748b', lineHeight: '1.8', marginBottom: '32px' }),
                  el('text', 'John Doe, Founder', { fontSize: '16px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2px' })
                ]
              }),
              el('container', '', { position: 'relative' }, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', { width: '80%', display: 'block', marginLeft: 'auto' }),
                  el('image', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', { width: '50%', position: 'absolute', bottom: '-40px', left: '0', border: '16px solid #ffffff' })
                ]
              })
            ]
          })
        ], { padding: '160px 32px', backgroundColor: '#ffffff' }),
        sec('Featured Grid', [
          el('heading', 'Featured Properties', { fontSize: '40px', fontWeight: '400', color: '#0f172a', textAlign: 'center', marginBottom: '64px', fontFamily: '"Playfair Display", serif' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1200px', margin: '0 auto' }, {
            children: [
              el('container', '', {}, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', { width: '100%', height: '400px', objectFit: 'cover', marginBottom: '24px' }),
                  el('heading', 'Beverly Hills Estate', { fontSize: '24px', color: '#0f172a', marginBottom: '8px', fontWeight: '500' }),
                  el('text', '$12,500,000 • 5 Beds • 7 Baths', { fontSize: '16px', color: '#64748b' })
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', { width: '100%', height: '400px', objectFit: 'cover', marginBottom: '24px' }),
                  el('heading', 'Miami Penthouse', { fontSize: '24px', color: '#0f172a', marginBottom: '8px', fontWeight: '500' }),
                  el('text', '$8,200,000 • 4 Beds • 4 Baths', { fontSize: '16px', color: '#64748b' })
                ]
              }),
              el('container', '', {}, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', { width: '100%', height: '400px', objectFit: 'cover', marginBottom: '24px' }),
                  el('heading', 'Hamptons Villa', { fontSize: '24px', color: '#0f172a', marginBottom: '8px', fontWeight: '500' }),
                  el('text', '$15,900,000 • 7 Beds • 9 Baths', { fontSize: '16px', color: '#64748b' })
                ]
              }),
            ]
          }),
          el('container', '', { textAlign: 'center', marginTop: '64px' }, {
            children: [
               el('button', 'View All Listings', { backgroundColor: '#0f172a', color: '#ffffff', padding: '16px 40px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' })
            ]
          })
        ], { padding: '100px 32px 160px', backgroundColor: '#f8fafc' })
      ])
    ]
  },
  {
    id: 'fitness-app',
    name: 'Fitness & Health App',
    category: 'Product',
    description: 'Vibrant, high-energy layout to promote mobile apps and subscriptions.',
    preview: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Hero', [
          el('container', '', { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }, {
            children: [
              el('container', '', {}, {
                children: [
                   el('text', 'NEW PROGRAM RELEASED', { fontSize: '14px', fontWeight: '800', color: '#facc15', backgroundColor: '#000000', padding: '8px 16px', borderRadius: '4px', letterSpacing: '2px', marginBottom: '24px', display: 'inline-block' }),
                   el('heading', 'A Stronger You Starts Today.', { fontSize: '72px', fontWeight: '900', color: '#111827', textTransform: 'uppercase', lineHeight: '1', marginBottom: '24px' }),
                   el('text', 'Custom workout plans, nutritionist-approved meals, and a community of thousands pushing each other to greatness. Download now and get 30 days free.', { fontSize: '20px', color: '#4b5563', lineHeight: '1.6', marginBottom: '40px' }),
                   el('container', '', { display: 'flex', gap: '16px' }, {
                     children: [
                       el('button', 'Download for iOS', { backgroundColor: '#111827', color: '#ffffff', padding: '16px 32px', borderRadius: '99px', fontSize: '16px', fontWeight: '700' }),
                       el('button', 'Get it on Android', { backgroundColor: '#f3f4f6', color: '#111827', padding: '16px 32px', borderRadius: '99px', fontSize: '16px', fontWeight: '700' }),
                     ]
                   })
                ]
              }),
              el('container', '', { position: 'relative' }, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', { width: '100%', height: '600px', objectFit: 'cover', borderRadius: '32px', transform: 'rotate(2deg)' }),
                  el('container', '', { position: 'absolute', bottom: '40px', left: '-40px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }, {
                    children: [
                      el('heading', '250+ workouts', { fontSize: '24px', fontWeight: '800', color: '#111827' }),
                      el('text', 'Updated weekly', { fontSize: '16px', color: '#6b7280' })
                    ]
                  })
                ]
              })
            ]
          })
        ], { padding: '120px 32px', backgroundColor: '#fef08a', overflow: 'hidden' }),
        sec('Testimonials', [
          el('heading', 'Real Results from Real People', { fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', color: '#111827', marginBottom: '64px' }),
          el('container', '', { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1200px', margin: '0 auto' }, {
            children: [
              el('container', '', { padding: '40px', backgroundColor: '#f9fafb', borderRadius: '24px' }, {
                children: [
                  el('text', '"This app completely changed my approach to fitness. The 15-minute HIIT sessions fit perfectly into my busy schedule!"', { fontSize: '20px', color: '#111827', fontWeight: '600', lineHeight: '1.6', marginBottom: '32px', fontStyle: 'italic' }),
                  el('container', '', { display: 'flex', alignItems: 'center', gap: '16px' }, {
                    children: [
                       el('image', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }),
                       el('container', '', {}, { children: [ el('heading', 'Jessica M.', { fontSize: '18px', fontWeight: '700' }), el('text', 'Lost 15 lbs in 3 months', { color: '#6b7280' }) ] })
                    ]
                  })
                ]
              }),
              el('container', '', { padding: '40px', backgroundColor: '#f9fafb', borderRadius: '24px' }, {
                children: [
                  el('text', '"The meal prep guides are idiot-proof. Im saving money on groceries and hitting my protein goals every single day."', { fontSize: '20px', color: '#111827', fontWeight: '600', lineHeight: '1.6', marginBottom: '32px', fontStyle: 'italic' }),
                  el('container', '', { display: 'flex', alignItems: 'center', gap: '16px' }, {
                    children: [
                       el('image', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }),
                       el('container', '', {}, { children: [ el('heading', 'David K.', { fontSize: '18px', fontWeight: '700' }), el('text', 'Gained 8 lbs muscle', { color: '#6b7280' }) ] })
                    ]
                  })
                ]
              }),
              el('container', '', { padding: '40px', backgroundColor: '#f9fafb', borderRadius: '24px' }, {
                children: [
                  el('text', '"Finally a yoga and mobility program that actually makes sense for weightlifters. My flexibility is through the roof."', { fontSize: '20px', color: '#111827', fontWeight: '600', lineHeight: '1.6', marginBottom: '32px', fontStyle: 'italic' }),
                  el('container', '', { display: 'flex', alignItems: 'center', gap: '16px' }, {
                    children: [
                       el('image', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }),
                       el('container', '', {}, { children: [ el('heading', 'Sarah J.', { fontSize: '18px', fontWeight: '700' }), el('text', 'Improved deadlift 40lbs', { color: '#6b7280' }) ] })
                    ]
                  })
                ]
              })
            ]
          })
        ], { padding: '120px 32px', backgroundColor: '#ffffff' }),
      ])
    ]
  },
  {
    id: 'creative-pro',
    name: 'Creative Agency Pro',
    category: 'Creative',
    description: 'Avant-garde, ultra-modern layout pushing the boundaries of web design.',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    pages: [
      page('Home', '/', [
        sec('Avant Hero', [
          el('container', '', { maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }, {
            children: [
              el('heading', 'We design digital experiences that refuse to be ignored.', { fontSize: '8vw', fontWeight: '600', color: '#e5e5e5', lineHeight: '0.9', letterSpacing: '-2px', textTransform: 'lowercase' }),
              el('container', '', { display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-end', justifyContent: 'space-between' }, {
                children: [
                  el('image', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80', { width: '60%', height: '500px', objectFit: 'cover', borderRadius: '8px', filter: 'grayscale(100%)', transition: 'filter 0.5s' }),
                  el('container', '', { width: '30%', paddingBottom: '40px' }, {
                    children: [
                      el('text', 'Based in Berlin & Tokyo. Award-winning independent design studio focusing on brutalist aesthetics and fluid interaction.', { fontSize: '18px', color: '#a3a3a3', lineHeight: '1.5', marginBottom: '32px' }),
                      el('button', 'Selected Works (26)', { backgroundColor: 'transparent', color: '#ffffff', padding: '16px 0', border: 'none', borderBottom: '2px solid #ffffff', fontSize: '20px', fontWeight: '500', display: 'block', width: '100%', textAlign: 'left' })
                    ]
                  })
                ]
              })
            ]
          })
        ], { padding: '80px 32px 140px', backgroundColor: '#171717' })
      ])
    ]
  }

];
