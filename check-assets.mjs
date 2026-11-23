// Fails the build if any image/asset referenced in the site is missing (prevents broken photos on Vercel).
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
const root = "site";
let bad = 0, count = 0;
for (const f of ["index.html", "style.css", "main.js"]) {
  const src = readFileSync(join(root, f), "utf8");
  for (const m of src.matchAll(/assets\/[A-Za-z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg|gif|ico)/g)) {
    const p = m[0]; count++;
    if (/[A-Z ]/.test(p)) { console.error(`BAD NAME (use lowercase, no spaces): ${p}`); bad++; continue; }
    const full = join(root, p);
    if (!existsSync(full) || statSync(full).size < 500) { console.error(`MISSING/EMPTY: ${p} (referenced in ${f})`); bad++; }
  }
}
console.log(`Checked ${count} asset references, ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
