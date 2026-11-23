import { icon } from '../lib/icons.mjs';
import { btn, quoteUrl, ctaBand, pageHero, breadcrumbLd, abs, orgRef, formatDate, chapterHead, eyebrow, display } from '../lib/html.mjs';
import { postCard } from '../lib/components.mjs';
import { sortedPosts, categories, postUrl, readingTime } from '../data/posts.mjs';
import { serviceBySlug, serviceUrl } from '../data/services.mjs';

const indexCrumbs = [{ name: 'News', path: '/news/' }];

const index = {
  path: '/news/',
  pageType: 'blog',
  title: 'News e approfondimenti su normativa rifiuti | TIMIA',
  description:
    'Aggiornamenti normativi e guide pratiche su RENTRI, codici EER, End of Waste, amianto e gestione dei rifiuti speciali, a cura del team tecnico TIMIA.',
  jsonld: [
    breadcrumbLd(indexCrumbs),
    {
      '@type': 'Blog',
      name: 'News e approfondimenti TIMIA',
      url: abs('/news/'),
      publisher: orgRef(),
      blogPost: sortedPosts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(postUrl(p)), datePublished: p.date })),
    },
  ],
  body: `
${pageHero({
  crumbs: indexCrumbs,
  kicker: 'News e approfondimenti',
  title: 'Normativa rifiuti, <em>spiegata semplice.</em>',
  lede: 'Aggiornamenti e guide operative su RENTRI, codici EER, End of Waste e amianto, scritti dal nostro team tecnico per chi gestisce i rifiuti in azienda.',
  ghost: 'News',
  compact: true,
})}

<div class="filters" role="group" aria-label="Filtra per argomento">
  <div class="container">
    <button type="button" class="filter is-active" data-filter="all" aria-pressed="true">Tutti <sup>${sortedPosts.length}</sup></button>
    ${Object.entries(categories)
      .map(([k, v]) => `<button type="button" class="filter" data-filter="${k}" aria-pressed="false">${v} <sup>${sortedPosts.filter((p) => p.category === k).length}</sup></button>`)
      .join('')}
  </div>
</div>

<section class="section t-light spot section--flush" data-theme="light" aria-labelledby="articoli-title">
  <div class="container">
    <h2 class="visually-hidden" id="articoli-title">Articoli</h2>
    <p class="visually-hidden" aria-live="polite" id="filter-status"></p>
    <div class="post-grid" data-posts>
      ${sortedPosts.map((p) => postCard(p)).join('')}
    </div>
  </div>
</section>

${ctaBand({
  kicker: 'Consulenza',
  title: 'Hai un dubbio <em>su un adempimento?</em>',
  text: 'Scrivici: un tecnico ti risponde e, se serve, ti propone una verifica della gestione rifiuti in azienda.',
  href: quoteUrl({ tipo: 'consulenza' }),
  label: 'Chiedi una consulenza',
  where: 'blog-final',
  ghost: 'Normativa',
})}
`,
};

function postPage(p) {
  const crumbs = [
    { name: 'News', path: '/news/' },
    { name: p.title, path: postUrl(p) },
  ];
  const svc = serviceBySlug[p.service];
  const others = sortedPosts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const minutes = readingTime(p.body);
  return {
    path: postUrl(p),
    pageType: 'article',
    ogType: 'article',
    title: p.metaTitle,
    description: p.description,
    jsonld: [
      breadcrumbLd(crumbs),
      {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        inLanguage: 'it-IT',
        mainEntityOfPage: abs(postUrl(p)),
        author: orgRef(),
        publisher: orgRef(),
        articleSection: categories[p.category],
      },
    ],
    body: `
${pageHero({
  crumbs,
  kicker: `${categories[p.category]} — ${formatDate(p.date)} — ${minutes} min di lettura`,
  title: p.title,
  lede: p.excerpt,
  ghost: { rentri: 'RENTRI', eer: 'EER', eow: 'EoW', amianto: 'Amianto' }[p.category],
  compact: true,
})}

<article class="section t-light spot article" data-theme="light">
  <div class="container article-grid">
    <aside class="article-side reveal">
      <p class="article-author">A cura del team tecnico TIMIA</p>
      <p class="article-date">Pubblicato il <time datetime="${p.date}">${formatDate(p.date)}</time></p>
      <a class="link-arrow" href="/news/"><span>Tutti gli articoli</span>${icon('arrow')}</a>
    </aside>
    <div>
      <div class="prose article__body">
        ${p.body}
      </div>
      <aside class="disclaimer" aria-label="Nota">
        <p>Contenuto informativo aggiornato al ${formatDate(p.updated || p.date)}. Non sostituisce la consulenza sul caso specifico: la normativa ambientale cambia spesso, verifica sempre le disposizioni vigenti o <a href="${quoteUrl({ tipo: 'consulenza' })}">chiedi a un nostro tecnico</a>.</p>
      </aside>
      <aside class="article-cta" aria-labelledby="acta-title">
        ${eyebrow('Servizio collegato')}
        <h2 id="acta-title" class="article-cta__title">${svc.name}</h2>
        <p>${svc.short}</p>
        <div class="hero-actions">
          ${btn(quoteUrl({ servizio: svc.slug }), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: `article-${p.slug}` })}
          ${btn(serviceUrl(svc), 'Scopri il servizio')}
        </div>
      </aside>
    </div>
  </div>
</article>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="altri-title">
  <div class="container">
    ${chapterHead({ kicker: 'Continua a leggere', title: 'Altri <em>approfondimenti.</em>', id: 'altri-title' })}
    <div class="post-grid">${others.map((o) => postCard(o)).join('')}</div>
  </div>
</section>
`,
  };
}

export default [index, ...sortedPosts.map(postPage)];
