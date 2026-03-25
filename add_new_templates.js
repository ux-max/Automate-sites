const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/templates.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const newTemplates = `
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
`;

content = content.replace(/\];\s*$/, newTemplates + '\n];\n');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Appended 3 new templates successfully.');
