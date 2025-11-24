import { execSync } from "child_process";
import fs from "fs";

const file = "public/imgs/eagle/orol1.png";  // ← uprav podľa cesty
const base = "orol1";
const out = `public/imgs-opt/${base}`;

if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

const SIZES = [320, 640, 1024, 1280, 1600];
const FORMATS = ["webp", "avif"];

console.log(`🧪 Test start for ${file}`);

for (const size of SIZES) {
  for (const format of FORMATS) {
    const output = `${out}/${base}-${size}.${format}`;
    const cmd = `npx sharp -i "${file}" -o "${output}" resize ${size} -f ${format} -q 80`;

    try {
      execSync(cmd);
      console.log(`✔ ${output}`);
    } catch (err) {
      console.error(`❌ Failed: ${cmd}`);
    }
  }
}

console.log("✅ Test DONE");
