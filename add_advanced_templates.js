const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/templates.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const advancedTemplates = `
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
`;

content = content.replace(/\];\s*$/, advancedTemplates + '\n];\n');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Appended 4 advanced templates successfully.');
