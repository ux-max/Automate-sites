const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/sections.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// The file exports `export const sectionLibrary: SectionLibraryItem[] = [`
// We can use a regex or string manipulation.
// But we have TypeScript. Best way is to just replace via advanced string split.

// Let's count how many times "category:" appears.
const categoryCount = (content.match(/category:/g) || []).length;
const iconCount = (content.match(/previewIcon:/g) || []).length;

console.log('Categories found:', categoryCount);
console.log('previewIcons found:', iconCount);
