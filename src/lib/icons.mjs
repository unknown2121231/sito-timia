// Icone lineari SVG inline. Due set coerenti:
// - UI (griglia 24, tratto 1.6)
// - servizi / settori (griglia 48, tratto 2)

const ui = {
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l8-8"/>',
  recycle: '<path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.2L6 12"/><path d="M9.5 8.5L12 4a1.5 1.5 0 0 1 2.6 0L17 8.5"/><path d="M17 19h2.5a1.5 1.5 0 0 0 1.3-2.2L18 12"/><path d="M14 19H8M4 13l2-1 1 2M15 6.5l2 2 2-1M15 21l-1-2 1-2"/>',
  box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9M7.8 5.3l8.4 4.5"/>',
  brick: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 5v4.7M12 9.7v4.6M6 9.7v4.6M18 9.7v4.6M9 14.3V19M15 14.3V19"/>',
  metal: '<path d="M4 17l3-9h10l3 9z"/><path d="M2.5 20h19M8.5 8l1-3h5l1 3"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
  drop: '<path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
  more: '<circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/><rect x="3" y="5" width="18" height="14" rx="3"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h4"/>',
  hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L2.8 15a1.5 1.5 0 0 1 2.4-1.8L8 16"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pec: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/><path d="M15 17.5l1.5 1.5 3-3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  upload: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  badge: '<circle cx="12" cy="9" r="5.5"/><path d="M9 14l-1 7 4-2 4 2-1-7"/><path d="M10 9l1.5 1.5L14 8"/>',
  scale: '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.5 6a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14.2A6 6 0 0 1 21 20"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
  euro: '<path d="M17.5 6.5a7 7 0 1 0 0 11"/><path d="M4 10h9M4 14h9"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  facebook: '<path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v4h2v7h4v-7h2.5l.5-4h-3V8a1 1 0 0 1 1-1h2z"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  cookie: '<path d="M20.5 12.5A8.5 8.5 0 1 1 11.5 3.5a3 3 0 0 0 4 3.5 3 3 0 0 0 5 5.5z"/><path d="M8.5 9.5v.01M9 15v.01M14 14.5v.01M12 11.5v.01"/>',
};

const big = {
  rifiuti: '<path d="M4 15h23v17H4z"/><path d="M10 15v17M15.5 15v17M21 15v17"/><path d="M27 20h8.5l6.5 7.5V32H27"/><path d="M3 32h40"/><circle cx="11" cy="36" r="3.5"/><circle cx="35" cy="36" r="3.5"/>',
  analisi: '<path d="M18 5h12"/><path d="M21 5v13L10.5 37.5A3 3 0 0 0 13.2 42h21.6a3 3 0 0 0 2.7-4.5L27 18V5"/><path d="M14.5 30h19"/><circle cx="21" cy="36" r="1.6"/><circle cx="27.5" cy="34" r="1"/>',
  amianto: '<path d="M6 12q3.5-5 7 0t7 0t7 0t7 0t7 0"/><path d="M6 21q3.5-5 7 0t7 0t7 0t7 0t7 0"/><path d="M6 12v9M41 12v9"/><path d="M24 26l9.5 16h-19z"/><path d="M24 31.5v4.5M24 39.2v.3"/>',
  consulenza: '<path d="M16 9h-4a2 2 0 0 0-2 2v29a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-4"/><rect x="16" y="6" width="16" height="6" rx="1.5"/><path d="M16.5 25l5 5 10-10.5"/><path d="M16.5 36h15"/>',
  bonifica: '<rect x="5" y="7" width="38" height="34" rx="2"/><path d="M5 18.5h38M5 29.5h38M17.5 7v34M30.5 7v34" stroke-opacity=".35"/><path d="M13.5 31c-2-6 3-12.5 10.5-12.5s12.5 3.5 11.5 9.5-6.5 8.5-11.5 7.5-8.5 1-10.5-4.5z"/><circle cx="21" cy="26" r="1.8"/><circle cx="28" cy="29" r="1.8"/><circle cx="37" cy="13" r="1.8"/>',
  eow: '<path d="M24 16.5l7.5 4.2v8.6L24 33.5l-7.5-4.2v-8.6z"/><path d="M16.5 20.7l7.5 4.3 7.5-4.3M24 25v8.5"/><path d="M40.5 20A17 17 0 0 0 10.2 13.3"/><path d="M7.5 28a17 17 0 0 0 30.3 6.7"/><path d="M10 7.5v6h6"/><path d="M38 40.5v-6h-6"/>',
  industria: '<path d="M5 41V23l10 6v-6l10 6v-6l10 6V8h7v33z"/><path d="M11 35h4M20 35h4M29 35h4M35 14h7"/>',
  edilizia: '<path d="M14 42V9M8 42h14M5 9h37M10 9l4-5 4 5"/><path d="M5 9v5h5V9"/><path d="M14 14l4 4-4 4 4 4-4 4" stroke-opacity=".5"/><path d="M36 9v13"/><path d="M32.5 22h7v6h-7z"/>',
  pa: '<path d="M6 17L24 7l18 10z"/><path d="M10.5 21v14M18.5 21v14M29.5 21v14M37.5 21v14"/><path d="M7 39h34M4 43h40"/>',
  energia: '<path d="M6 40V30a10.5 10.5 0 0 1 21 0v10"/><path d="M29 40v-7a7.5 7.5 0 0 1 15 0v7"/><path d="M3 40h43"/><path d="M16.5 19.5V11h9"/><path d="M29.5 11c0-3.2 2.8-4.3 2.8-7.8 2.3 1.8 3.9 4.3 3.9 6.9a3.4 3.4 0 0 1-6.7.9z"/>',
};

export function icon(name, cls = 'icon') {
  const body = ui[name];
  if (!body) throw new Error(`Icona UI sconosciuta: ${name}`);
  return `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

export function bigIcon(name, cls = 'icon-lg') {
  const body = big[name];
  if (!body) throw new Error(`Icona grande sconosciuta: ${name}`);
  return `<svg class="${cls}" viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
