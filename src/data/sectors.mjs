// Settori serviti. I codici EER sono esempi indicativi: la classificazione
// corretta dipende sempre dal processo che genera il rifiuto.
import { ph } from '../lib/html.mjs';

export const sectors = [
  {
    slug: 'industria',
    icon: 'industria',
    name: 'Industria e manifattura',
    navDesc: 'Rifiuti di processo, imballaggi, oli',
    short: 'Rifiuti di processo, imballaggi contaminati, oli esausti: ritiri programmati e adempimenti in regola, anche su più stabilimenti.',
    title: 'Gestione rifiuti per l’industria manifatturiera | TIMIA',
    description:
      'Gestione dei rifiuti speciali per l’industria: classificazione, ritiri programmati, adempimenti RENTRI e recupero degli scarti di produzione. In tutta Italia.',
    h1: 'Gestione dei rifiuti per l’industria e le aziende manifatturiere',
    lead:
      'Rifiuti di processo, imballaggi contaminati, oli esausti, scarti di lavorazione. Organizziamo ritiri programmati e adempimenti e cerchiamo soluzioni per recuperare gli scarti di produzione.',
    audience: ['Responsabili HSE e ambiente', 'Direttori di stabilimento', 'Uffici acquisti', 'Responsabili di produzione e manutenzione'],
    needs: [
      ['Continuità', 'Ritiri programmati che seguono i ritmi della produzione, senza depositi saturi.'],
      ['Conformità', 'Classificazione corretta, registri e formulari in ordine, adempimenti RENTRI.'],
      ['Costi sotto controllo', 'Conferimenti ottimizzati e ricerca di destinazioni di recupero per gli scarti.'],
      ['Un referente unico', 'Un solo interlocutore per rifiuti diversi, anche su più stabilimenti.'],
    ],
    waste: [
      ['12 01 01', 'Limatura e trucioli di materiali ferrosi'],
      ['08 01 11*', 'Pitture e vernici di scarto, contenenti solventi organici o altre sostanze pericolose'],
      ['13 02 05*', 'Scarti di olio minerale per motori, ingranaggi e lubrificazione, non clorurati'],
      ['15 01 10*', 'Imballaggi contenenti residui di sostanze pericolose o contaminati da tali sostanze'],
      ['15 02 02*', 'Assorbenti, materiali filtranti, stracci e indumenti protettivi contaminati da sostanze pericolose'],
      ['15 01 06', 'Imballaggi in materiali misti'],
    ],
    services: ['smaltimento-rifiuti-industriali', 'analisi-rifiuti', 'consulenza-ambientale', 'prodotti-end-of-waste'],
    note: 'Per <strong>cementifici e laterifici</strong>, oltre alla gestione dei rifiuti, forniamo <a href="/servizi/prodotti-end-of-waste/">prodotti End of Waste personalizzati</a> sulle specifiche del processo.',
    photo: 'Area di deposito temporaneo in uno stabilimento, con contenitori etichettati',
  },
  {
    slug: 'edilizia-demolizioni',
    icon: 'edilizia',
    name: 'Edilizia e demolizioni',
    navDesc: 'C&D, amianto, terre e rocce da scavo',
    short: 'Macerie, rifiuti misti, terre da scavo e amianto: ritiri coordinati con i tempi del cantiere e documenti in regola.',
    title: 'Rifiuti da costruzione e demolizione e amianto | TIMIA',
    description:
      'Rifiuti da costruzione e demolizione, amianto e terre e rocce da scavo: gestione per imprese edili e di demolizione, con documenti in regola.',
    h1: 'Rifiuti da costruzione e demolizione: gestione per imprese edili',
    lead:
      'Macerie, rifiuti misti, terre da scavo, amianto. Coordiniamo ritiri e documentazione con i tempi del cantiere, per non fermare i lavori e chiudere la pratica in regola.',
    audience: ['Imprese edili e di demolizione', 'Direttori lavori e coordinatori della sicurezza', 'Uffici tecnici', 'Studi di ingegneria e architettura'],
    needs: [
      ['Tempi di cantiere', 'Ritiri pianificati sulle fasi di lavoro, per non bloccare le attività.'],
      ['Rifiuti eterogenei', 'Separazione e classificazione dei rifiuti misti per ridurre i costi di conferimento.'],
      ['Amianto e rifiuti pericolosi', 'Gestione conforme dei materiali contenenti amianto e degli altri rifiuti pericolosi.'],
      ['Terre e rocce da scavo', 'Classificazione e gestione come rifiuto o, quando ne ricorrono le condizioni, come sottoprodotto.'],
    ],
    waste: [
      ['17 01 07', 'Miscugli o scorie di cemento, mattoni, mattonelle e ceramiche, diverse da quelle di cui alla voce 17 01 06'],
      ['17 09 04', 'Rifiuti misti dell’attività di costruzione e demolizione, diversi da quelli di cui alle voci 17 09 01, 17 09 02 e 17 09 03'],
      ['17 05 04', 'Terra e rocce, diverse da quelle di cui alla voce 17 05 03'],
      ['17 05 03*', 'Terra e rocce, contenenti sostanze pericolose'],
      ['17 06 05*', 'Materiali da costruzione contenenti amianto'],
      ['17 04 05', 'Ferro e acciaio'],
    ],
    services: ['smaltimento-rifiuti-industriali', 'smaltimento-amianto', 'bonifica-siti-contaminati', 'analisi-rifiuti'],
    photo: 'Cantiere di demolizione con escavatore e cassoni per la raccolta separata dei rifiuti',
  },
  {
    slug: 'pubblica-amministrazione',
    icon: 'pa',
    name: 'Pubblica amministrazione',
    navDesc: 'Enti locali, edifici e aree pubbliche',
    short: 'Amianto su edifici pubblici, aree da bonificare, rifiuti abbandonati: interventi documentati per uffici tecnici ed enti.',
    title: 'Servizi ambientali per la pubblica amministrazione | TIMIA',
    description:
      'Per enti pubblici: rifiuti da bonifica amianto su edifici pubblici, siti contaminati, rimozione di rifiuti abbandonati e consulenza ambientale.',
    h1: 'Servizi ambientali per la pubblica amministrazione',
    lead:
      'Edifici pubblici con amianto, aree da bonificare, rifiuti abbandonati da rimuovere. Supportiamo uffici tecnici ed enti con interventi documentati e conformi, dalla valutazione alla chiusura.',
    audience: ['Uffici tecnici comunali e provinciali', 'RUP e responsabili dei lavori pubblici', 'Enti gestori di edifici pubblici', 'Consorzi e società partecipate'],
    needs: [
      ['Documentazione completa', 'Certificazioni, iscrizioni e autorizzazioni disponibili per le verifiche di gara e di qualifica.'],
      ['Sicurezza degli utenti', 'Interventi su scuole ed edifici pubblici pianificati per ridurre al minimo i disagi.'],
      ['Rifiuti abbandonati', 'Caratterizzazione, rimozione e smaltimento di rifiuti abbandonati su aree pubbliche.'],
      ['Trasparenza', 'Preventivi dettagliati e rendicontazione chiara di quantità e destinazioni.'],
    ],
    waste: [
      ['17 06 05*', 'Materiali da costruzione contenenti amianto'],
      ['20 03 07', 'Rifiuti ingombranti'],
      ['20 01 21*', 'Tubi fluorescenti ed altri rifiuti contenenti mercurio'],
      ['16 02 14', 'Apparecchiature fuori uso, diverse da quelle di cui alle voci da 16 02 09 a 16 02 13'],
      ['17 09 04', 'Rifiuti misti dell’attività di costruzione e demolizione, diversi da quelli di cui alle voci 17 09 01, 17 09 02 e 17 09 03'],
      ['20 03 03', 'Residui della pulizia stradale'],
    ],
    services: ['smaltimento-amianto', 'bonifica-siti-contaminati', 'smaltimento-rifiuti-industriali', 'consulenza-ambientale'],
    note: `Procedure di affidamento: ${ph('indicare eventuali iscrizioni a MEPA, piattaforme di e-procurement ed elenchi fornitori')}`,
    photo: 'Intervento sulla copertura di un edificio pubblico, con area di cantiere delimitata',
  },
  {
    slug: 'energia-biogas',
    icon: 'energia',
    name: 'Energia e biogas',
    navDesc: 'Impianti di biogas e cogenerazione',
    short: 'Rifiuti di processo e di manutenzione, prodotti End of Waste per l’alimentazione e il processo degli impianti.',
    title: 'Rifiuti e prodotti End of Waste per energia e biogas | TIMIA',
    description:
      'Per impianti di biogas e del settore energia: gestione dei rifiuti di manutenzione e di processo e fornitura di prodotti End of Waste personalizzati.',
    h1: 'Rifiuti e prodotti End of Waste per il settore energia e biogas',
    lead:
      'Impianti di biogas, cogenerazione, produzione di energia. Gestiamo i rifiuti di processo e di manutenzione e forniamo prodotti End of Waste costruiti sulle specifiche del tuo impianto.',
    audience: ['Gestori di impianti di biogas e biometano', 'Responsabili di impianti di cogenerazione', 'Responsabili tecnici e di manutenzione', 'Uffici acquisti'],
    needs: [
      ['Continuità d’impianto', 'Ritiri puntuali dei rifiuti di manutenzione, senza interferire con l’esercizio.'],
      ['Materiali in ingresso', 'Prodotti End of Waste con caratteristiche costanti e documentate.'],
      ['Autorizzazioni', 'Verifica della compatibilità di rifiuti e materiali con l’autorizzazione dell’impianto.'],
      ['Digestato e residui', 'Supporto nella gestione dei residui di processo quando sono classificati come rifiuti.'],
    ],
    waste: [
      ['19 06 06', 'Digestato prodotto dal trattamento anaerobico di rifiuti di origine animale o vegetale'],
      ['13 02 05*', 'Scarti di olio minerale per motori, ingranaggi e lubrificazione, non clorurati'],
      ['16 01 07*', 'Filtri dell’olio'],
      ['15 02 02*', 'Assorbenti, materiali filtranti, stracci e indumenti protettivi contaminati da sostanze pericolose'],
      ['15 01 10*', 'Imballaggi contenenti residui di sostanze pericolose o contaminati da tali sostanze'],
      ['16 06 01*', 'Batterie al piombo'],
    ],
    services: ['prodotti-end-of-waste', 'smaltimento-rifiuti-industriali', 'consulenza-ambientale', 'analisi-rifiuti'],
    photo: 'Impianto di biogas con digestori, ripreso dall’esterno',
  },
];

export const sectorBySlug = Object.fromEntries(sectors.map((s) => [s.slug, s]));
export const sectorUrl = (s) => `/settori/${s.slug}/`;
