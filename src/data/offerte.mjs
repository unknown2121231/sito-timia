// ─────────────────────────────────────────────────────────────────────────────
//  OFFERTE — le formule proposte al cliente dopo che ha scelto rifiuti e quantità
// ─────────────────────────────────────────────────────────────────────────────
//
//  Come viene calcolato il prezzo di ogni offerta (IVA esclusa):
//
//    smaltimento = somma di (prezzo del rifiuto × quantità)            ← da rifiuti.mjs
//    totale      = costoFisso + smaltimento × (1 + maggiorazione / 100)
//    se il totale è sotto  ordineMinimo , si mostra  ordineMinimo
//
//  Se anche un solo rifiuto scelto ha  prezzo: null , le offerte mostrano
//  "Prezzo su richiesta" e il cliente può comunque inviare la richiesta.
//
//  I valori qui sotto sono DI ESEMPIO: sostituirli con quelli reali.
// ─────────────────────────────────────────────────────────────────────────────

export const offerte = [
  {
    id: 'essenziale',
    nome: 'Essenziale',
    sottotitolo: 'Il prezzo più basso, con ritiro programmato',
    tempi: 'Ritiro entro 10 giorni lavorativi',
    costoFisso: 80, // € trasporto e gestione pratica
    maggiorazione: 0, // % sul costo di smaltimento
    ordineMinimo: 150, // €
    incluso: ['Trasporto con mezzi autorizzati', 'Formulario (FIR) compilato da noi', 'Smaltimento o recupero in impianto autorizzato'],
  },
  {
    id: 'smart',
    nome: 'Smart',
    sottotitolo: 'Il giusto equilibrio tra prezzo e rapidità',
    tempi: 'Ritiro entro 5 giorni lavorativi',
    costoFisso: 120,
    maggiorazione: 8,
    ordineMinimo: 200,
    consigliata: true,
    incluso: [
      'Tutto quello di Essenziale',
      'Contenitori o big bag forniti da noi',
      'Supporto per il registro di carico e scarico',
      'Referente dedicato',
    ],
  },
  {
    id: 'express',
    nome: 'Express',
    sottotitolo: 'Per quando hai fretta di liberare spazio',
    tempi: 'Ritiro entro 48 ore lavorative',
    costoFisso: 220,
    maggiorazione: 15,
    ordineMinimo: 300,
    incluso: ['Tutto quello di Smart', 'Ritiro prioritario', 'Fascia oraria concordata', 'Quarta copia del FIR inviata via email'],
  },
];
