// Build del sito TIMIA: genera HTML statico in /dist.
// Uso: node build.mjs   (nessuna dipendenza esterna, Node >= 18)
import { mkdirSync, writeFileSync, cpSync, rmSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/config.mjs';
import { layout } from './src/lib/layout.mjs';
import { pages, sitemapPriority } from './src/pages/index.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const write = (file, content) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};
const hash = (file) => createHash('md5').update(readFileSync(file)).digest('hex').slice(0, 8);

rmSync(DIST, { recursive: true, force: true });
cpSync(join(SRC, 'assets'), join(DIST, 'assets'), { recursive: true });

// Versioni per il cache busting degli asset.
const versions = {
  'main.css': hash(join(SRC, 'assets/css/main.css')),
  'main.js': hash(join(SRC, 'assets/js/main.js')),
  'configuratore.js': hash(join(SRC, 'assets/js/configuratore.js')),
};

// Pagine HTML
const seen = new Set();
for (const page of pages) {
  if (seen.has(page.path)) throw new Error(`Percorso duplicato: ${page.path}`);
  seen.add(page.path);
  const html = layout(page, { versions });
  const out = page.path.endsWith('.html') ? join(DIST, page.path) : join(DIST, page.path, 'index.html');
  write(out, html);
}

// Sitemap e robots
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !p.noindex)
  .map(
    (p) =>
      `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${(sitemapPriority[p.path] ?? 0.6).toFixed(1)}</priority></url>`
  )
  .join('\n');
write(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /grazie/\n\nSitemap: ${site.url}/sitemap.xml\n`);

// Promemoria dei segnaposto ancora presenti nelle pagine.
const todo = pages.reduce((n, p) => n + (layout(p, { versions }).match(/DA INSERIRE|DA VERIFICARE/g) || []).length, 0);
console.log(`✔ Build completata: ${pages.length} pagine → dist/`);
if (todo) console.log(`  • ${todo} segnaposto [DA INSERIRE]/[DA VERIFICARE] ancora nel testo delle pagine`);
