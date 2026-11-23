// Team. Per inserire una foto: aggiungere `photo: '/assets/img/team/nome-cognome.jpg'`
// (formato verticale 4:5, almeno 800×1000 px). Email diretta facoltativa.

export const teamAreas = [
  {
    id: 'sviluppo',
    name: 'Sviluppo aziendale',
    desc: 'Relazioni con clienti e partner, nuovi progetti, sviluppo dei servizi.',
  },
  {
    id: 'tecnico',
    name: 'Area tecnico-commerciale',
    desc: 'Sopralluoghi, valutazioni tecniche, classificazione dei rifiuti e offerte.',
  },
  {
    id: 'amministrazione',
    name: 'Amministrazione',
    desc: 'Contratti, fatturazione e documentazione amministrativa.',
  },
  {
    id: 'logistica',
    name: 'Logistica',
    desc: 'Pianificazione di ritiri e trasporti, coordinamento di vettori e impianti.',
  },
];

export const team = [
  { name: 'Ilaria Cornacchini', role: 'Responsabile sviluppo aziendale', area: 'sviluppo' },
  { name: 'Veronica Cornacchini', role: 'Responsabile sviluppo aziendale', area: 'sviluppo' },
  { name: 'Gianni Proietti', role: 'Responsabile tecnico-commerciale', area: 'tecnico' },
  { name: 'Michela Fiacchi', role: 'Responsabile amministrazione', area: 'amministrazione' },
  { name: 'Massimo Benedetti', role: 'Responsabile logistica', area: 'logistica' },
  { name: 'Gabriele Cittadini', role: 'Responsabile logistica', area: 'logistica' },
];

export const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
