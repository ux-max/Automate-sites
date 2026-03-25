const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/templates.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace standard template previews with high-quality unsplash images
content = content.replace(/\/templates\/saas_preview\.png/g, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80');
content = content.replace(/\/templates\/portfolio_preview\.png/g, 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&q=80');
content = content.replace(/\/templates\/blog_preview\.png/g, 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80');
content = content.replace(/\/templates\/ecommerce_preview\.png/g, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80');
content = content.replace(/\/templates\/restaurant_preview\.png/g, 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80');
content = content.replace(/\/templates\/business_preview\.png/g, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80');
content = content.replace(/\/templates\/agency_preview\.png/g, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replaced local image paths with Unsplash URLs.');
