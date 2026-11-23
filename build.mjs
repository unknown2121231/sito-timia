// Build del sito TIMIA: genera HTML statico in /dist.
// Uso: node build.mjs   (nessuna dipendenza esterna, Node >= 18)
import { mkdirSync, writeFileSync, cpSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/config.mjs';
import { layout } from './src/lib/layout.mjs';
import { makePdf } from './src/lib/pdf.mjs';
import { pages, sitemapPriority } from './src/pages/index.mjs';
import { documents } from './src/pages/certificazioni.mjs';

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
  'form.js': hash(join(SRC, 'assets/js/form.js')),
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
write(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /contatti/grazie/\n\nSitemap: ${site.url}/sitemap.xml\n`);

// Documenti della pagina certificazioni: se il PDF reale esiste in src/documenti/ viene copiato,
// altrimenti si genera un segnaposto con lo stesso nome.
let placeholders = 0;
for (const d of documents) {
  const real = join(SRC, d.file);
  if (existsSync(real)) {
    cpSync(real, join(DIST, d.file));
    continue;
  }
  placeholders++;
  const pdf = makePdf([
    { text: 'TIMIA S.r.l.', size: 18, bold: true, gap: 34 },
    { text: `${d.title} - ${d.subtitle}`, size: 14, bold: true, gap: 30 },
    { text: 'DOCUMENTO SEGNAPOSTO', size: 12, bold: true },
    { text: 'Sostituire questo file con il documento ufficiale in formato PDF,' },
    { text: `mantenendo lo stesso nome file (${d.file.split('/').pop()}).` },
  ]);
  write(join(DIST, d.file), pdf);
}

// Gestore PHP del form e configurazione Apache: servono solo su un hosting PHP tradizionale.
// Su Netlify il form è gestito da Netlify Forms, quindi il PHP non viene pubblicato.
const php = join(ROOT, 'form-handler', 'invia-richiesta.php');
if (!process.env.NETLIFY && site.formEndpoint.endsWith('.php') && existsSync(php)) cpSync(php, join(DIST, 'invia-richiesta.php'));
const host = new URL(site.url).host;
write(
  join(DIST, '.htaccess'),
  `# TIMIA — configurazione Apache (generata da build.mjs)
Options -Indexes
DirectoryIndex index.html index.php
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Reindirizzamento a HTTPS e al dominio principale (${host}).
  # Attivare togliendo il "#" solo dopo aver verificato che il certificato SSL sia attivo.
  # RewriteCond %{HTTPS} off [OR]
  # RewriteCond %{HTTP_HOST} !^${host.replace(/\./g, '\\.')}$ [NC]
  # RewriteRule ^ https://${host}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 week"
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
`
);

// Promemoria dei segnaposto ancora presenti nelle pagine.
const todo = pages.reduce((n, p) => n + (layout(p, { versions }).match(/DA INSERIRE|DA VERIFICARE/g) || []).length, 0);
console.log(`✔ Build completata: ${pages.length} pagine → dist/`);
if (placeholders) console.log(`  • ${placeholders} PDF segnaposto (mettere i PDF reali in src/documenti/)`);
if (todo) console.log(`  • ${todo} segnaposto [DA INSERIRE]/[DA VERIFICARE] ancora nel testo delle pagine`);
