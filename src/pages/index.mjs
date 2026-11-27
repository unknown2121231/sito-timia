// Elenco delle pagine del sito.
import home from './home.mjs';
import legal from './legal.mjs';

export const pages = [home, ...legal];
export const sitemapPriority = { '/': 1.0 };
