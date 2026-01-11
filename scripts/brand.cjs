// scripts/brand.js
// Run with: node scripts/brand.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BRAND_NAME = 'Sam & Feb';
const BRAND_SLUG = 'sam-and-feb';
const WEDDING_DATE = 'January 25, 2026';

// safe extensions to scan
const exts = ['.html','.htm','.js','.jsx','.ts','.tsx','.json','.md','.mdx','.css','.scss','.svg','.yml','.yaml','.txt'];

// skip common large directories
const skipDirs = ['node_modules','.git','.next','dist','build','public/static','vendor'];

function walk(dir, fileList=[]) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!skipDirs.includes(item)) walk(full, fileList);
    } else {
      if (exts.includes(path.extname(item).toLowerCase())) fileList.push(full);
    }
  }
  return fileList;
}

function replaceInFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  // common repo name replace (case-sensitive)
  content = content.split('Sakeenah').join(BRAND_NAME);
  // case-insensitive replace for variations like "sakeenah" -> "Sam & Feb"
  content = content.replace(/sakeenah/gi, BRAND_NAME);

  // replace some obvious placeholder dates (this is conservative)
  // e.g. replace "Jan 25, 2026", "January 25, 2026", "25 Jan 2026", or "2026" near a heading - but to be safe we only replace explicit full matches
  content = content.replace(/January\s+\d{1,2},\s*2026/gi, WEDDING_DATE);
  content = content.replace(/Jan(?:uary)?\s+\d{1,2},\s*2026/gi, WEDDING_DATE);
  content = content.replace(/\b25[\/\-\s]*01[\/\-\s]*2026\b/g, WEDDING_DATE); // 25/01/2026 variants

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
    return true;
  }
  return false;
}

function updatePackageJson() {
  const pjPath = path.join(ROOT, 'package.json');
  if (!fs.existsSync(pjPath)) return false;
  const pj = JSON.parse(fs.readFileSync(pjPath, 'utf8'));
  // preserve original name in a field
  pj._original_name = pj.name || pj._original_name || pj._original_name || 'sakeenah';
  pj.name = BRAND_SLUG;
  pj.description = pj.description ? pj.description.replace(/Sakeenah/gi, `${BRAND_NAME}`) : `${BRAND_NAME} Wedding Site - ${WEDDING_DATE}`;
  if (!pj.homepage) pj.homepage = `https://${BRAND_SLUG}.example.com/`;
  fs.writeFileSync(pjPath, JSON.stringify(pj, null, 2), 'utf8');
  console.log('Updated package.json');
  return true;
}

// run
console.log('Scanning project and applying brand replacements...');
const files = walk(ROOT);
let count=0;
for (const f of files) {
  try {
    if (replaceInFile(f)) count++;
  } catch(e) {
    console.warn('skip', f, e.message);
  }
}
if (updatePackageJson()) count++;

console.log(`Brand replacements applied in ${count} file(s).`);
console.log('NOTE: Please review changes and run the app to verify visuals and hero content. If hero text requires manual tuning, edit the relevant component (likely in src/, pages/, or public/index.html).');
