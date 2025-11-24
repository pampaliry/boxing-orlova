// scripts/optimize-images.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function fixPath(p) {
  return p.replace(/\\/g, '/');
}

const SOURCE_DIR = 'public/imgs/eagle';
const OUT_DIR = 'public';

const SIZES = [320, 640, 1024];
const FORMAT = 'webp';
const QUALITY = 80;

console.log('🚀 Starting optimization...');

// Load images
const files = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

console.log(`🖼️  Found ${files.length} images`);

for (const file of files) {
  const name = path.parse(file).name;

  const src = fixPath(path.join(SOURCE_DIR, file));
  const outDir = fixPath(path.join(OUT_DIR, name));

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n➡ Processing: ${file}`);

  // -----------------------------------
  // 1) ROOT webp (hlavný súbor)
  // -----------------------------------
  const rootOut = fixPath(path.join(outDir, `${name}.webp`));

  if (!fs.existsSync(rootOut)) {
    const cmdRoot = `npx sharp -i "${src}" -o "${rootOut}" -f ${FORMAT} -q ${QUALITY}`;
    try {
      execSync(cmdRoot, { stdio: 'ignore' });
      console.log(`   ✔ ROOT: ${name}.webp`);
    } catch {
      console.log(`   ❌ ROOT failed: ${name}.webp`);
    }
  } else {
    console.log(`   ↪ ROOT exists, skipping`);
  }

  // -----------------------------------
  // 2) Responsive variácie
  // -----------------------------------
  for (const size of SIZES) {
    const outFile = fixPath(path.join(outDir, `${name}-${size}.${FORMAT}`));

    if (fs.existsSync(outFile)) {
      console.log(`   ↪ exists: ${name}-${size}.${FORMAT}`);
      continue;
    }

    const cmd = `npx sharp -i "${src}" -o "${outFile}" resize ${size} -f ${FORMAT} -q ${QUALITY}`;

    try {
      execSync(cmd, { stdio: 'ignore' });
      console.log(`   ✔ ${name}-${size}.${FORMAT}`);
    } catch (err) {
      console.log(`   ❌ Failed ${name}-${size}.${FORMAT}`);
    }
  }
}

console.log('\n✅ DONE: All images optimized!');
