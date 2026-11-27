// Server statico di anteprima per /dist (solo sviluppo locale).
// Simula anche l'endpoint del form, così il flusso di invio è provabile senza PHP.
// Uso: node serve.mjs   →   http://localhost:4173
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.pdf': 'application/pdf', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, clean);
  if (!file.startsWith(ROOT)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  // Simulazione dell'invio del form (su Netlify lo gestisce Netlify Forms, in PHP /invia-richiesta.php)
  if (req.method === 'POST') {
    let size = 0;
    req.on('data', (c) => { size += c.length; });
    req.on('end', () => {
      console.log(`[form] richiesta ricevuta (${(size / 1024).toFixed(1)} KB) — simulazione invio OK`);
      setTimeout(() => {
        if ((req.headers.accept || '').includes('application/json')) {
          // Come Netlify Forms: risposta HTML con stato 200.
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<!doctype html><title>OK</title>');
        } else {
          res.writeHead(303, { Location: '/grazie/' });
          res.end();
        }
      }, 700);
    });
    return;
  }

  const file = await resolveFile(req.url);
  if (!file) {
    const nf = await readFile(join(ROOT, '404.html')).catch(() => Buffer.from('404'));
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(nf);
  }
  if (!req.url.split('?')[0].endsWith('/') && !extname(req.url.split('?')[0])) {
    res.writeHead(301, { Location: req.url.replace(/(\?|$)/, '/$1') });
    return res.end();
  }
  const body = await readFile(file);
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(body);
}).listen(PORT, () => console.log(`Anteprima TIMIA: http://localhost:${PORT}`));
