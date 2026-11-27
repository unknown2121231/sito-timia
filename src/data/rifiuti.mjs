// ─────────────────────────────────────────────────────────────────────────────
//  CATALOGO RIFIUTI — qui si inseriscono i PREZZI
// ─────────────────────────────────────────────────────────────────────────────
//
//  Ogni rifiuto ha:
//    id       identificativo (solo lettere minuscole e trattini, non cambiarlo dopo la pubblicazione)
//    nome     come appare sul sito
//    eer      codice EER indicativo (l'asterisco * indica un rifiuto pericoloso)
//    unita    'kg' | 't' | 'm3' | 'm2' | 'pz'
//    prezzo   € per unità, IVA esclusa. Usa  null  per mostrare "prezzo su richiesta".
//    minimo   quantità minima proposta (facoltativo, default 1)
//    passi    valori rapidi mostrati come scorciatoie per la quantità (facoltativo)
//    esempi   breve descrizione per aiutare il cliente a riconoscere il rifiuto
//
//  ATTENZIONE: i prezzi qui sotto sono DI ESEMPIO, servono solo a far vedere come funziona
//  il calcolo. Sostituirli con gli importi reali e poi impostare  prezziDiEsempio: false
//  in src/config.mjs per togliere l'avviso dal sito.
// ─────────────────────────────────────────────────────────────────────────────

export const categorie = [
  { id: 'imballaggi', nome: 'Imballaggi', icona: 'box' },
  { id: 'edilizia', nome: 'Edilizia e demolizioni', icona: 'brick' },
  { id: 'metalli', nome: 'Metalli', icona: 'metal' },
  { id: 'raee', nome: 'RAEE e batterie', icona: 'plug' },
  { id: 'liquidi', nome: 'Oli e liquidi', icona: 'drop' },
  { id: 'altro', nome: 'Altri rifiuti', icona: 'more' },
];

export const rifiuti = [
  // Imballaggi
  { id: 'carta-cartone', categoria: 'imballaggi', nome: 'Carta e cartone', eer: '15 01 01', unita: 'kg', prezzo: 0.06, minimo: 100, passi: [100, 500, 1000, 5000], esempi: 'Scatole, cartoni, imballaggi in carta' },
  { id: 'plastica', categoria: 'imballaggi', nome: 'Imballaggi in plastica', eer: '15 01 02', unita: 'kg', prezzo: 0.12, minimo: 100, passi: [100, 500, 1000, 5000], esempi: 'Film estensibile, cassette, flaconi vuoti' },
  { id: 'legno-pallet', categoria: 'imballaggi', nome: 'Legno e pallet', eer: '15 01 03', unita: 'kg', prezzo: 0.08, minimo: 200, passi: [200, 500, 1000, 3000], esempi: 'Pallet rotti, casse, bobine in legno' },
  { id: 'imballaggi-misti', categoria: 'imballaggi', nome: 'Imballaggi misti', eer: '15 01 06', unita: 'kg', prezzo: 0.15, minimo: 100, passi: [100, 500, 1000, 3000], esempi: 'Imballaggi di materiali diversi non separabili' },
  { id: 'imballaggi-contaminati', categoria: 'imballaggi', nome: 'Imballaggi contaminati', eer: '15 01 10*', unita: 'kg', prezzo: 0.9, minimo: 50, passi: [50, 100, 300, 1000], esempi: 'Fusti, latte e taniche sporchi di vernici, oli o sostanze pericolose' },
  { id: 'vetro', categoria: 'imballaggi', nome: 'Imballaggi in vetro', eer: '15 01 07', unita: 'kg', prezzo: 0.07, minimo: 100, passi: [100, 500, 1000], esempi: 'Bottiglie, vasetti, contenitori in vetro' },

  // Edilizia
  { id: 'inerti', categoria: 'edilizia', nome: 'Macerie e inerti', eer: '17 09 04', unita: 't', prezzo: 18, minimo: 1, passi: [1, 5, 10, 30], esempi: 'Calcinacci, mattoni, cemento, piastrelle' },
  { id: 'terre-rocce', categoria: 'edilizia', nome: 'Terre e rocce da scavo', eer: '17 05 04', unita: 't', prezzo: 14, minimo: 5, passi: [5, 10, 30, 100], esempi: 'Terra e sassi provenienti da scavi' },
  { id: 'cartongesso', categoria: 'edilizia', nome: 'Cartongesso', eer: '17 08 02', unita: 't', prezzo: 120, minimo: 1, passi: [1, 2, 5, 10], esempi: 'Lastre e sfridi in gesso rivestito' },
  { id: 'guaina', categoria: 'edilizia', nome: 'Guaina bituminosa', eer: '17 03 02', unita: 't', prezzo: 160, minimo: 1, passi: [1, 2, 5], esempi: 'Guaine e membrane impermeabilizzanti' },
  { id: 'eternit', categoria: 'edilizia', nome: 'Amianto compatto (eternit)', eer: '17 06 05*', unita: 'm2', prezzo: null, minimo: 10, passi: [20, 50, 100, 300], esempi: 'Lastre di copertura, canne fumarie, serbatoi in cemento-amianto' },
  { id: 'legno-cantiere', categoria: 'edilizia', nome: 'Legno da cantiere', eer: '17 02 01', unita: 't', prezzo: 90, minimo: 1, passi: [1, 3, 5], esempi: 'Casseri, travi, serramenti in legno senza vetro' },

  // Metalli
  { id: 'ferro', categoria: 'metalli', nome: 'Ferro e acciaio', eer: '17 04 05', unita: 'kg', prezzo: 0, minimo: 300, passi: [300, 1000, 5000], esempi: 'Rottami ferrosi, profilati, scaffalature' },
  { id: 'cavi-rame', categoria: 'metalli', nome: 'Cavi elettrici', eer: '17 04 11', unita: 'kg', prezzo: null, minimo: 50, passi: [50, 200, 500], esempi: 'Cavi in rame o alluminio con guaina' },

  // RAEE
  { id: 'raee', categoria: 'raee', nome: 'Apparecchiature elettroniche', eer: '16 02 14', unita: 'kg', prezzo: 0.35, minimo: 50, passi: [50, 200, 500, 1000], esempi: 'PC, stampanti, quadri elettrici, piccoli elettrodomestici' },
  { id: 'neon', categoria: 'raee', nome: 'Neon e lampade', eer: '20 01 21*', unita: 'kg', prezzo: 1.2, minimo: 10, passi: [10, 50, 100], esempi: 'Tubi fluorescenti, lampade a scarica' },
  { id: 'batterie-piombo', categoria: 'raee', nome: 'Batterie al piombo', eer: '16 06 01*', unita: 'kg', prezzo: 0, minimo: 50, passi: [50, 200, 500], esempi: 'Batterie di auto, muletti, gruppi di continuità' },
  { id: 'toner', categoria: 'raee', nome: 'Toner e cartucce', eer: '08 03 18', unita: 'pz', prezzo: 1.5, minimo: 10, passi: [10, 30, 100], esempi: 'Toner e cartucce esauste di stampanti' },

  // Oli e liquidi
  { id: 'olio-minerale', categoria: 'liquidi', nome: 'Oli minerali esausti', eer: '13 02 05*', unita: 'kg', prezzo: 0.25, minimo: 100, passi: [100, 300, 1000], esempi: 'Oli motore, oli idraulici, oli per ingranaggi' },
  { id: 'emulsioni', categoria: 'liquidi', nome: 'Emulsioni oleose', eer: '12 01 09*', unita: 'kg', prezzo: 0.35, minimo: 200, passi: [200, 500, 1000], esempi: 'Lubrorefrigeranti esausti da lavorazioni meccaniche' },
  { id: 'vernici', categoria: 'liquidi', nome: 'Vernici e solventi', eer: '08 01 11*', unita: 'kg', prezzo: 1.1, minimo: 50, passi: [50, 100, 300], esempi: 'Residui di vernici, inchiostri, diluenti' },
  { id: 'acque-lavaggio', categoria: 'liquidi', nome: 'Acque di lavaggio', eer: '16 10 02', unita: 'kg', prezzo: 0.12, minimo: 500, passi: [500, 1000, 5000], esempi: 'Acque reflue non pericolose da lavaggi industriali' },

  // Altro
  { id: 'pneumatici', categoria: 'altro', nome: 'Pneumatici fuori uso', eer: '16 01 03', unita: 'pz', prezzo: 3, minimo: 10, passi: [10, 50, 100], esempi: 'Pneumatici di auto e furgoni senza cerchio' },
  { id: 'ingombranti', categoria: 'altro', nome: 'Ingombranti e misti', eer: '20 03 07', unita: 'm3', prezzo: 45, minimo: 1, passi: [1, 5, 10, 20], esempi: 'Arredi, materassi, materiali misti da sgombero' },
  { id: 'fanghi', categoria: 'altro', nome: 'Fanghi industriali', eer: '19 08 14', unita: 't', prezzo: null, minimo: 1, passi: [1, 5, 10], esempi: 'Fanghi da depurazione o trattamento acque' },
  { id: 'filtri', categoria: 'altro', nome: 'Filtri olio e stracci sporchi', eer: '15 02 02*', unita: 'kg', prezzo: 1.3, minimo: 20, passi: [20, 50, 200], esempi: 'Filtri dell’olio, stracci e assorbenti contaminati' },
];

export const unitaLabel = {
  kg: { breve: 'kg', lungo: 'chilogrammi' },
  t: { breve: 't', lungo: 'tonnellate' },
  m3: { breve: 'm³', lungo: 'metri cubi' },
  m2: { breve: 'm²', lungo: 'metri quadrati' },
  pz: { breve: 'pz', lungo: 'pezzi' },
};

// Rifiuti mostrati come scorciatoie nella ricerca in cima alla home.
export const popolari = ['inerti', 'carta-cartone', 'legno-pallet', 'raee', 'olio-minerale', 'eternit'];
