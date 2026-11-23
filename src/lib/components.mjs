// Componenti riutilizzabili nello stile "a capitoli".
import { icon, bigIcon } from './icons.mjs';
import { esc, photo, formatDate, pad2 } from './html.mjs';
import { serviceUrl } from '../data/services.mjs';
import { sectorUrl } from '../data/sectors.mjs';
import { categories, postUrl, readingTime } from '../data/posts.mjs';
import { initials } from '../data/team.mjs';

// Righe dei servizi: numero, nome, descrizione, etichetta che cambia al passaggio, freccia.
export function serviceRows(list, { headingLevel = 3, long = false } = {}) {
  const h = `h${headingLevel}`;
  return `<ul class="services">${list
    .map(
      (s, i) => `<li class="reveal" style="--d:${i * 60}ms">
      <a class="service" href="${serviceUrl(s)}">
        <span class="num">${s.num || pad2(i + 1)}</span>
        <${h}>${s.name}</${h}>
        <p>${long ? s.lead : s.short}</p>
        <span class="tag" aria-hidden="true"><span class="t-def">${s.tag || ''}</span><span class="t-hov">Scopri <b>→</b></span></span>
        <span class="go" aria-hidden="true">${icon('arrow')}</span>
      </a>
    </li>`
    )
    .join('')}</ul>`;
}

// Vetrina orizzontale (settori) con frecce e contatore 01 / 04.
export function sectorTrack(list, { id = 'sectors' } = {}) {
  return `<div class="works-track" id="${id}Track" tabindex="0" aria-label="Settori serviti, scorrimento orizzontale">
    ${list
      .map(
        (s, i) => `<article class="work">
        <a href="${sectorUrl(s)}" class="work-link">
          <div class="work-img">
            ${photo({ desc: s.photo, ratio: '4 / 5' })}
            <span class="idx">${pad2(i + 1)} / ${pad2(list.length)}</span>
          </div>
          <div class="work-meta">
            <div><small>${s.navDesc}</small><h3>${s.name}</h3></div>
            ${icon('arrow')}
          </div>
        </a>
      </article>`
      )
      .join('')}
  </div>`;
}

export function trackControls(id = 'sectors', total = 4) {
  return `<div class="works-controls">
    <button class="round-btn" type="button" id="${id}Prev" aria-label="Precedente">${icon('arrow')}</button>
    <span class="works-count" id="${id}Count" aria-live="polite">01 / ${pad2(total)}</span>
    <button class="round-btn" type="button" id="${id}Next" aria-label="Successivo">${icon('arrow')}</button>
  </div>`;
}

// Timeline del ciclo dei rifiuti (home, chi siamo, servizi).
export const cycleSteps = [
  { t: 'Consulenza e sopralluogo', d: 'Analizziamo il rifiuto, il processo che lo genera e i vincoli di tempo e di sito.', out: 'Piano di gestione' },
  { t: 'Campionamento e analisi', d: 'Classificazione, codice EER, caratteristiche di pericolo e verifica di ammissibilità.', out: 'Rapporti di prova' },
  { t: 'Gestione documentale', d: 'Formulari, registro cronologico, RENTRI, omologhe con gli impianti di destino.', out: 'Pratica in regola' },
  { t: 'Trasporto', d: 'Vettori autorizzati, anche in regime ADR, con ritiri pianificati sui tuoi tempi.', out: 'Ritiro pianificato' },
  { t: 'Smaltimento o recupero', d: 'Conferimento a impianti autorizzati, privilegiando il recupero di materia.', out: 'Documentazione di chiusura' },
];

export function method(steps = cycleSteps) {
  return `<ol class="method">${steps
    .map(
      (s, i) => `<li class="reveal" style="--d:${i * 80}ms">
      <b>${pad2(i + 1)}</b>
      <h3>${s.t}</h3>
      <p>${s.d}</p>
      ${s.out ? `<small>${s.out}</small>` : ''}
    </li>`
    )
    .join('')}</ol>`;
}

// Passi compatti [titolo, testo] (pagine servizio).
export const steps = (items) => method(items.map(([t, d]) => ({ t, d })));

// Righe numerate con titolo e testo (problemi, esigenze, valori).
export function rows(items, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<ol class="rows">${items
    .map(
      ([t, d], i) => `<li class="reveal" style="--d:${i * 60}ms">
      <b>${pad2(i + 1)}</b>
      <${h}>${t}</${h}>
      <p>${d}</p>
    </li>`
    )
    .join('')}</ol>`;
}

export const problemGrid = (items) => rows(items);

export function normList(items) {
  return `<ul class="info info--norms">${items.map(([ref, d]) => `<li class="reveal"><span>${ref}</span><span>${d}</span></li>`).join('')}</ul>`;
}

export function eerTable(list, caption) {
  return `<div class="table-wrap reveal"><table class="eer-table">
    <caption>${caption}</caption>
    <thead><tr><th scope="col">Codice EER</th><th scope="col">Descrizione</th></tr></thead>
    <tbody>${list
      .map(
        ([c, d]) =>
          `<tr><td><span class="eer${c.includes('*') ? ' eer--haz' : ''}">${c}</span>${c.includes('*') ? '<span class="visually-hidden"> (pericoloso)</span>' : ''}</td><td>${d}</td></tr>`
      )
      .join('')}</tbody>
  </table></div>`;
}

// Riepilogo per l'apertura delle pagine interne.
export function summaryBox(list, title = 'In sintesi') {
  return `<div class="summary">
    <p class="summary__title">${title}</p>
    <ul class="info">${list.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join('')}</ul>
  </div>`;
}

export function personCard(p, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  const media = p.photo
    ? photo({ src: p.photo, alt: `${p.name}, ${p.role}`, ratio: '4 / 5' })
    : `<div class="person__ph" role="img" aria-label="Segnaposto: foto reale di ${esc(p.name)} da inserire">
        <span class="mono" aria-hidden="true">${initials(p.name)}</span>
        <span class="person__tag">Foto reale da inserire</span>
      </div>`;
  return `<article class="person reveal">
    ${media}
    <${h} class="person__name">${p.name}</${h}>
    <p class="person__role">${p.role}</p>
    ${p.email ? `<a class="person__mail" href="mailto:${p.email}">${p.email}</a>` : ''}
  </article>`;
}

// Articoli come righe (home) e come schede (pagina News).
export function postRows(list, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<ul class="post-rows">${list
    .map(
      (p, i) => `<li class="reveal" style="--d:${i * 60}ms">
      <a class="post-row" href="${postUrl(p)}">
        <time datetime="${p.date}">${formatDate(p.date)}</time>
        <span class="post-row__cat">${categories[p.category]}</span>
        <${h}>${p.title}</${h}>
        <span class="go" aria-hidden="true">${icon('arrow')}</span>
      </a>
    </li>`
    )
    .join('')}</ul>`;
}

export function postCard(p, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return `<article class="post-card reveal" data-cat="${p.category}">
    <a href="${postUrl(p)}">
      <p class="post-card__meta"><span>${categories[p.category]}</span><time datetime="${p.date}">${formatDate(p.date)}</time></p>
      <${h}>${p.title}</${h}>
      <p class="post-card__text">${p.excerpt}</p>
      <span class="link-arrow" aria-hidden="true"><span>Leggi · ${readingTime(p.body)} min</span>${icon('arrow')}</span>
    </a>
  </article>`;
}

// Schede dei settori (pagina indice).
export function sectorCards(list) {
  return `<div class="sector-cards">${list
    .map(
      (s, i) => `<a class="sector-card reveal" style="--d:${i * 70}ms" href="${sectorUrl(s)}">
      <span class="sector-card__icon">${bigIcon(s.icon)}</span>
      <b>${pad2(i + 1)}</b>
      <h2>${s.name}</h2>
      <p>${s.short}</p>
      <span class="link-arrow" aria-hidden="true"><span>Vai al settore</span>${icon('arrow')}</span>
    </a>`
    )
    .join('')}</div>`;
}

export function stats(items) {
  return `<ul class="stats">${items
    .map(([v, l, count]) => `<li class="reveal"><strong${count ? ` data-count="${count}" data-suffix="${v.replace(/^\d+/, '')}"` : ''}>${v}</strong><span>${l}</span></li>`)
    .join('')}</ul>`;
}
