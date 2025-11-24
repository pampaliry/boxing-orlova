// scripts/optimize-single.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function fixPath(p) {
  return p.replace(/\\/g, '/');
}

const SOURCE_DIR = 'public/imgs/eagle';
const OUT_DIR = 'public';

const FORMAT = 'webp';
const QUALITY = 80;

console.log('🚀 Starting single-file optimization...');

// Load images
const files = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

console.log(`🖼️ Found ${files.length} images`);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const file of files) {
  console.log(`\n➡ Processing: ${file}`);

  const name = path.parse(file).name;

  const src = fixPath(path.join(SOURCE_DIR, file));
  const out = fixPath(path.join(OUT_DIR, `${name}.webp`));

  if (fs.existsSync(out)) {
    console.log(`   ↪ Already exists, skipping`);
    continue;
  }

  const cmd = `npx sharp -i "${src}" -o "${out}" -f ${FORMAT} -q ${QUALITY}`;

  try {
    execSync(cmd, { stdio: 'ignore' });
    console.log(`   ✔ Optimized: ${name}.webp`);
  } catch (err) {
    console.log(`   ❌ Failed to optimize ${name}.webp`);
  }
}

console.log('\n✅ DONE: All single-file .webp versions created!');
