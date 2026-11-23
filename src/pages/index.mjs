// Elenco di tutte le pagine generate. Aggiungere qui eventuali nuove pagine.
import home from './home.mjs';
import chiSiamo from './chi-siamo.mjs';
import servizi from './servizi.mjs';
import settori from './settori.mjs';
import certificazioni from './certificazioni.mjs';
import team from './team.mjs';
import news from './news.mjs';
import contatti from './contatti.mjs';
import umbria from './umbria.mjs';
import legal from './legal.mjs';

export const pages = [home, chiSiamo, ...servizi, ...settori, certificazioni, team, ...news, ...contatti, umbria, ...legal];

// Priorità per la sitemap (le pagine non elencate usano 0.6).
export const sitemapPriority = {
  '/': 1.0,
  '/contatti/': 0.9,
  '/servizi/': 0.9,
  '/smaltimento-rifiuti-umbria/': 0.8,
  '/settori/': 0.7,
  '/chi-siamo/': 0.7,
  '/certificazioni-autorizzazioni/': 0.7,
  '/news/': 0.7,
};
