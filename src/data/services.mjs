// Contenuti dei 6 servizi. Ogni pagina servizio segue la struttura:
// problema del cliente → cosa facciamo → come funziona → normativa → FAQ → CTA.
import { ph, verify } from '../lib/html.mjs';

export const services = [
  {
    slug: 'smaltimento-rifiuti-industriali',
    tag: 'Pericolosi e non',
    num: '01',
    icon: 'rifiuti',
    name: 'Gestione, recupero e smaltimento rifiuti',
    navDesc: 'Urbani e industriali, pericolosi e non pericolosi',
    short:
      'Rifiuti urbani e speciali, pericolosi e non pericolosi: ritiro, trasporto e conferimento a impianti autorizzati, privilegiando il recupero.',
    title: 'Smaltimento rifiuti industriali e speciali in Italia | TIMIA',
    description:
      'Gestione, recupero e smaltimento di rifiuti industriali e urbani, pericolosi e non pericolosi, in tutta Italia. Un solo referente, preventivo gratuito.',
    h1: 'Gestione, recupero e smaltimento di rifiuti industriali e urbani',
    lead:
      'Dalla verifica del codice EER al conferimento in impianto autorizzato: gestiamo l’intero percorso dei tuoi rifiuti, pericolosi e non pericolosi. Privilegiamo il recupero quando è tecnicamente ed economicamente possibile e ti restituiamo la documentazione completa.',
    summary: [
      ['Per chi', 'Industria, edilizia, enti pubblici, impianti'],
      ['Rifiuti', 'Urbani e speciali, pericolosi e non pericolosi'],
      ['Modalità', 'Ritiri una tantum o programmati'],
      ['Area', 'Tutto il territorio nazionale'],
    ],
    problems: [
      ['Troppi fornitori da coordinare', 'Trasportatore, impianto, laboratorio, consulente: ogni passaggio è un contratto, una verifica di autorizzazioni e un possibile punto debole.'],
      ['Responsabilità fino al destino finale', 'La normativa attribuisce al produttore la responsabilità della corretta gestione del rifiuto lungo tutta la filiera. Un errore di terzi può ricadere su di te.'],
      ['Costi che crescono', 'Conferimenti non ottimizzati, viaggi con carichi parziali, rifiuti mandati a smaltimento quando potrebbero essere recuperati.'],
      ['Depositi pieni, reparti fermi', 'Quando il ritiro tarda, il deposito temporaneo si satura e rallenta produzione e cantieri.'],
    ],
    whatIntro: 'Un unico interlocutore organizza l’intero servizio, con vettori e impianti autorizzati della nostra rete di partner.',
    what: [
      'Verifica della classificazione e del codice EER, con analisi quando necessarie',
      'Scelta dell’impianto autorizzato per quel codice e per l’operazione di recupero (R) o smaltimento (D) più adatta',
      'Organizzazione del trasporto con vettori iscritti all’Albo Nazionale Gestori Ambientali, anche in regime ADR per i rifiuti che lo richiedono',
      'Indicazioni su contenitori, etichettatura e deposito temporaneo',
      'Predisposizione del formulario di identificazione (FIR) e supporto per registro cronologico e RENTRI',
      'Ritiri una tantum, programmati o su chiamata',
      'Restituzione della documentazione di avvenuto recupero o smaltimento',
    ],
    photo: 'Automezzo con cassone scarrabile in fase di carico presso uno stabilimento cliente',
    how: [
      ['Richiesta', 'Ci indichi tipologia, quantità, luogo di ritiro e, se li hai, codice EER, analisi e foto.'],
      ['Verifica tecnica', 'Controlliamo classificazione e documenti. Se servono analisi, le organizziamo noi.'],
      ['Offerta', 'Ricevi un preventivo gratuito e dettagliato, con destino del rifiuto e tempi di ritiro.'],
      ['Ritiro e trasporto', 'Pianifichiamo il ritiro, predisponiamo il FIR e coordiniamo il vettore.'],
      ['Chiusura documentale', 'Ti restituiamo la documentazione che attesta il corretto recupero o smaltimento.'],
    ],
    norms: [
      ['D.Lgs. 152/2006, Parte IV', 'Norme in materia di gestione dei rifiuti (Testo Unico Ambientale).'],
      ['D.Lgs. 116/2020', 'Recepimento delle direttive europee su rifiuti e imballaggi del pacchetto economia circolare.'],
      ['Decisione 2000/532/CE e s.m.i.', 'Elenco europeo dei rifiuti (codici EER), aggiornato dalla Decisione 2014/955/UE.'],
      ['D.M. 4 aprile 2023, n. 59', 'Regolamento del Registro elettronico nazionale per la tracciabilità dei rifiuti (RENTRI).'],
      ['Accordo ADR', 'Trasporto su strada delle merci pericolose, applicabile a molti rifiuti pericolosi.'],
      ['D.Lgs. 36/2003 e s.m.i.', 'Discariche di rifiuti e criteri di ammissibilità, come modificato dal D.Lgs. 121/2020.'],
    ],
    faq: [
      {
        q: 'Gestite anche quantitativi ridotti o ritiri occasionali?',
        a: '<p>Valutiamo ogni richiesta, dai ritiri una tantum ai contratti programmati. Nel preventivo ti proponiamo la soluzione più conveniente per i volumi effettivi.</p>',
      },
      {
        q: 'Chi è responsabile del rifiuto dopo il ritiro?',
        a: '<p>Per il D.Lgs. 152/2006 il produttore risponde della corretta gestione del rifiuto lungo tutta la filiera. Nei casi previsti dall’art. 188, la responsabilità è esclusa con il conferimento a soggetti autorizzati e con la ricezione della documentazione di avvenuto recupero o smaltimento, come la copia del formulario controfirmata. Per questo verifichiamo le autorizzazioni di vettori e impianti e ti restituiamo sempre la documentazione.</p>',
      },
      {
        q: 'Quali informazioni servono per un preventivo?',
        a: '<p>Tipologia e descrizione del rifiuto, codice EER se noto, quantità stimata, stato fisico, luogo e frequenza del ritiro. Analisi esistenti, schede di sicurezza e foto accelerano la valutazione: puoi allegarle direttamente nel <a href="/contatti/#richiesta">form di richiesta</a>.</p>',
      },
      {
        q: 'Operate anche fuori dall’Umbria?',
        a: '<p>Sì. Dalla sede di Foligno coordiniamo servizi su tutto il territorio nazionale, grazie a una rete di vettori e impianti partner.</p>',
      },
      {
        q: 'Preferite il recupero o lo smaltimento?',
        a: '<p>Seguiamo la gerarchia dei rifiuti prevista dall’art. 179 del D.Lgs. 152/2006: prima il riciclaggio, poi le altre forme di recupero, infine lo smaltimento. La scelta dipende dalle caratteristiche del rifiuto e dalla sostenibilità economica, e te la spieghiamo nel preventivo.</p>',
      },
    ],
    related: ['analisi-rifiuti', 'consulenza-ambientale', 'prodotti-end-of-waste'],
  },

  {
    slug: 'analisi-rifiuti',
    tag: 'Codici EER',
    num: '02',
    icon: 'analisi',
    name: 'Analisi e caratterizzazione dei rifiuti',
    navDesc: 'Classificazione, codici EER, analisi merceologiche',
    short:
      'Campionamento e analisi chimiche per attribuire il codice EER, verificare le caratteristiche di pericolo e l’ammissibilità in impianto. Analisi merceologiche per il recupero.',
    title: 'Analisi rifiuti: caratterizzazione e codice EER | TIMIA',
    description:
      'Analisi chimiche di caratterizzazione e classificazione dei rifiuti: codice EER, caratteristiche di pericolo, test di cessione e analisi merceologiche.',
    h1: 'Analisi chimiche di caratterizzazione e classificazione dei rifiuti',
    lead:
      'Una classificazione corretta è la base di tutto: codice EER, caratteristiche di pericolo, scelta dell’impianto, costi. Organizziamo campionamento e analisi e ti consegniamo un risultato chiaro, da usare subito per gestire il rifiuto.',
    summary: [
      ['Per chi', 'Produttori di rifiuti speciali, uffici tecnici, HSE'],
      ['Analisi', 'Classificazione, test di cessione, merceologiche'],
      ['Risultato', 'Rapporti di prova interpretati e destini possibili'],
      ['Area', 'Tutto il territorio nazionale'],
    ],
    problems: [
      ['Codice EER incerto', 'Le voci “a specchio” richiedono di dimostrare se il rifiuto è pericoloso o no. Senza analisi adeguate la classificazione non regge a un controllo.'],
      ['Analisi non adatte allo scopo', 'Un’analisi di classificazione non sempre basta per l’ammissibilità in discarica o per il recupero: servono parametri e test specifici.'],
      ['Carichi respinti in impianto', 'Un rifiuto non conforme a quanto dichiarato significa respingimento, costi di ritorno e ritardi.'],
      ['Analisi non aggiornate', 'Se cambiano processo, materie prime o fornitori, cambiano anche le caratteristiche del rifiuto. Le analisi vanno rinnovate.'],
    ],
    whatIntro: `Dal piano di campionamento all’interpretazione dei risultati, seguiamo ogni fase con laboratori partner qualificati ${verify('accreditamento ACCREDIA UNI CEI EN ISO/IEC 17025 dei laboratori')}.`,
    what: [
      'Raccolta delle informazioni sul processo che genera il rifiuto e sulle materie prime (schede di sicurezza)',
      'Piano di campionamento e prelievo di campioni rappresentativi secondo la norma UNI 10802',
      'Analisi di classificazione: attribuzione del codice EER e verifica delle caratteristiche di pericolo da HP1 a HP15',
      'Test di cessione per l’ammissibilità in discarica o per il recupero in procedura semplificata',
      'Analisi merceologiche per i rifiuti destinati a recupero, con composizione per frazioni',
      'Rapporti di prova con interpretazione dei risultati e indicazione dei destini possibili',
    ],
    photo: 'Tecnico con DPI durante il campionamento di un rifiuto in cumulo',
    how: [
      ['Analisi del processo', 'Capiamo da dove nasce il rifiuto e quali sostanze possono essere presenti.'],
      ['Piano di campionamento', 'Definiamo punti, modalità e numero di campioni per un risultato rappresentativo.'],
      ['Prelievo', 'Il campionamento è eseguito da personale qualificato e documentato con verbale.'],
      ['Analisi di laboratorio', 'Parametri scelti in base allo scopo: classificazione, discarica o recupero.'],
      ['Classificazione e destino', 'Ricevi i risultati interpretati e le opzioni di gestione, con i relativi costi.'],
    ],
    norms: [
      ['D.Lgs. 152/2006, art. 184 e Allegato D alla Parte IV', 'Classificazione dei rifiuti ed elenco dei rifiuti.'],
      ['Decisione 2014/955/UE', 'Elenco europeo dei rifiuti (EER) in vigore.'],
      ['Reg. (UE) 1357/2014 e Reg. (UE) 2017/997', 'Caratteristiche di pericolo HP1–HP15, incluso HP14 “ecotossico”.'],
      ['Linee guida SNPA sulla classificazione dei rifiuti', 'Delibera SNPA n. 105/2021, approvate con Decreto direttoriale n. 47 del 9 agosto 2021.'],
      ['UNI 10802', 'Campionamento manuale, preparazione del campione e analisi degli eluati.'],
      ['D.Lgs. 36/2003 e s.m.i.', 'Criteri di ammissibilità dei rifiuti in discarica.'],
      ['D.M. 5 febbraio 1998', 'Recupero di rifiuti non pericolosi in procedura semplificata e relativo test di cessione.'],
    ],
    faq: [
      {
        q: 'Che cos’è una voce “a specchio”?',
        a: '<p>È una coppia di codici EER riferiti allo stesso tipo di rifiuto: uno pericoloso (con asterisco) e uno non pericoloso. Per scegliere quello corretto bisogna verificare, con informazioni sul processo e analisi, se il rifiuto contiene sostanze pericolose che gli conferiscono caratteristiche di pericolo.</p>',
      },
      {
        q: 'Che differenza c’è tra analisi di classificazione e test di cessione?',
        a: '<p>L’analisi di classificazione serve ad attribuire il codice EER e a stabilire se il rifiuto è pericoloso. Il test di cessione misura quanto il rifiuto rilascia a contatto con l’acqua ed è richiesto per l’ammissibilità in discarica o per alcune forme di recupero.</p>',
      },
      {
        q: 'Ogni quanto vanno ripetute le analisi?',
        a: '<p>Quando cambiano il processo produttivo, le materie prime o le caratteristiche del rifiuto, e comunque con la periodicità richiesta dalla normativa e dall’impianto di destino. Molti impianti chiedono un aggiornamento almeno annuale.</p>',
      },
      {
        q: 'Quanto tempo serve per avere i risultati?',
        a: '<p>Dipende dal numero e dal tipo di parametri da determinare. Ti indichiamo i tempi stimati già nel preventivo, così puoi pianificare il ritiro.</p>',
      },
      {
        q: 'Cos’è un’analisi merceologica?',
        a: '<p>È la determinazione della composizione del rifiuto per frazioni, ad esempio plastica, carta, metalli, inerti e frazione estranea. Serve a valutare se e come un rifiuto può essere avviato a recupero.</p>',
      },
    ],
    related: ['smaltimento-rifiuti-industriali', 'consulenza-ambientale', 'bonifica-siti-contaminati'],
  },

  {
    slug: 'smaltimento-amianto',
    tag: 'Compatto e friabile',
    num: '03',
    icon: 'amianto',
    name: 'Rifiuti da bonifica amianto',
    navDesc: 'Matrice compatta e friabile',
    short:
      'Rifiuti contenenti amianto in matrice compatta e friabile: rimozione affidata ad aziende qualificate, trasporto e conferimento in impianti autorizzati.',
    title: 'Smaltimento amianto compatto e friabile | TIMIA',
    description:
      'Rifiuti da bonifica amianto in matrice compatta e friabile: coordinamento con aziende qualificate, trasporto e conferimento autorizzato. Preventivo gratuito.',
    h1: 'Smaltimento amianto: rifiuti da bonifica in matrice compatta e friabile',
    lead:
      'Coperture in cemento-amianto, canne fumarie, serbatoi, coibentazioni. Coordiniamo l’intervento con aziende di bonifica qualificate e gestiamo i rifiuti fino al conferimento finale, con tutta la documentazione.',
    summary: [
      ['Per chi', 'Aziende, proprietari di immobili, imprese, enti'],
      ['Materiali', 'Matrice compatta e friabile'],
      ['Rimozione', 'Imprese iscritte all’Albo in categoria 10'],
      ['Area', 'Tutto il territorio nazionale'],
    ],
    problems: [
      ['Procedure specifiche', 'Piano di lavoro, comunicazioni all’organo di vigilanza, imprese abilitate: ogni passaggio ha regole precise.'],
      ['Rischio per la salute', 'Le fibre di amianto sono cancerogene. Un intervento improvvisato espone persone e azienda a rischi seri.'],
      ['Troppi soggetti da coordinare', 'Laboratorio, impresa di bonifica, trasportatore, impianto: tempi e responsabilità si sommano.'],
      ['Costi poco chiari', 'Senza sopralluogo e valutazione tecnica i preventivi non sono confrontabili.'],
    ],
    whatIntro: 'Siamo il tuo unico referente: coordiniamo le aziende di bonifica qualificate e gestiamo i rifiuti fino al destino finale.',
    what: [
      'Sopralluogo e valutazione del materiale, con campionamento e analisi di laboratorio quando necessari',
      'Individuazione dell’impresa di bonifica qualificata, iscritta all’Albo Nazionale Gestori Ambientali in categoria 10A o 10B',
      'Coordinamento dei tempi tra bonifica, trasporto e impianto di destino',
      'Gestione dei rifiuti: confezionamento, etichettatura e trasporto con vettori autorizzati',
      'Conferimento in impianti autorizzati a ricevere rifiuti contenenti amianto',
      'Documentazione completa: formulari e attestazioni di avvenuto smaltimento',
    ],
    photo: 'Operatori con DPI durante la rimozione di una copertura in cemento-amianto',
    matrix: [
      {
        name: 'Matrice compatta',
        def: 'Le fibre sono legate in una matrice solida, come nel cemento-amianto.',
        examples: ['Lastre di copertura ondulate', 'Canne fumarie e tubazioni', 'Serbatoi e cassoni per l’acqua', 'Pavimenti in vinil-amianto'],
        eer: ['17 06 05*', 'materiali da costruzione contenenti amianto'],
        cat: 'Imprese iscritte all’Albo in categoria 10A',
      },
      {
        name: 'Matrice friabile',
        def: 'Il materiale può essere sbriciolato o ridotto in polvere con la semplice pressione manuale.',
        examples: ['Coibentazioni di tubazioni e caldaie', 'Rivestimenti a spruzzo (floccati)', 'Cartoni e tessili contenenti amianto'],
        eer: ['17 06 01*', 'materiali isolanti contenenti amianto'],
        cat: 'Imprese iscritte all’Albo in categoria 10B',
      },
    ],
    how: [
      ['Sopralluogo', 'Valutiamo materiale, quantità, accessibilità e stato di conservazione.'],
      ['Analisi', 'Se la presenza di amianto non è certa, si preleva un campione per l’analisi di laboratorio.'],
      ['Piano di lavoro', 'L’impresa esecutrice redige il piano di lavoro e lo presenta all’organo di vigilanza competente prima dell’inizio dei lavori.'],
      ['Rimozione e trasporto', 'Il materiale viene rimosso, confezionato ed etichettato secondo le norme, poi trasportato all’impianto.'],
      ['Chiusura', 'Ricevi la documentazione di avvenuto smaltimento, da conservare agli atti.'],
    ],
    norms: [
      ['Legge 27 marzo 1992, n. 257', 'Norme relative alla cessazione dell’impiego dell’amianto.'],
      ['D.M. 6 settembre 1994', 'Metodologie tecniche per valutazione del rischio, controllo, manutenzione e bonifica dei materiali contenenti amianto.'],
      ['D.Lgs. 81/2008, Titolo IX, Capo III', 'Protezione dei lavoratori dall’esposizione all’amianto; art. 256 sul piano di lavoro.'],
      ['D.M. 29 luglio 2004, n. 248', 'Disciplina delle attività di recupero dei prodotti e beni di amianto e contenenti amianto.'],
      ['D.M. 3 giugno 2014, n. 120', 'Regolamento dell’Albo Nazionale Gestori Ambientali, che disciplina anche le categorie 10A e 10B.'],
      ['D.Lgs. 36/2003 e s.m.i.', 'Discariche di rifiuti, incluse le condizioni per i rifiuti contenenti amianto.'],
    ],
    faq: [
      {
        q: 'L’amianto va sempre rimosso?',
        a: '<p>Non necessariamente. La normativa prevede la valutazione dello stato di conservazione del materiale e, in base al rischio, interventi di rimozione, incapsulamento o confinamento. Diverse Regioni adottano metodi specifici per valutare il degrado delle coperture.</p>',
      },
      {
        q: 'Qual è la differenza tra matrice compatta e friabile?',
        a: '<p>Il materiale friabile può essere sbriciolato o ridotto in polvere con la semplice pressione delle mani e rilascia fibre più facilmente. Per questo la sua bonifica richiede procedure più severe e imprese iscritte in categoria 10B.</p>',
      },
      {
        q: 'Chi presenta il piano di lavoro?',
        a: '<p>L’impresa che esegue la bonifica, iscritta all’Albo in categoria 10. Lo invia all’organo di vigilanza competente per territorio prima dell’inizio dei lavori, come previsto dall’art. 256 del D.Lgs. 81/2008.</p>',
      },
      {
        q: 'Seguite anche interventi di piccola entità?',
        a: '<p>Inviaci alcune foto e le misure indicative del manufatto, ad esempio una tettoia o una canna fumaria: ti indichiamo come procedere e quali soggetti devono intervenire.</p>',
      },
      {
        q: 'Quali documenti ricevo alla fine?',
        a: '<p>Le copie dei formulari di identificazione dei rifiuti e la documentazione di avvenuto conferimento all’impianto autorizzato. Ti consigliamo di conservarle insieme al piano di lavoro.</p>',
      },
    ],
    related: ['analisi-rifiuti', 'bonifica-siti-contaminati', 'smaltimento-rifiuti-industriali'],
  },

  {
    slug: 'consulenza-ambientale',
    tag: 'RENTRI e adempimenti',
    num: '04',
    icon: 'consulenza',
    name: 'Consulenza ambientale',
    navDesc: 'Rifiuti speciali, adempimenti, recupero scarti',
    short:
      'Supporto tecnico e normativo su classificazione, adempimenti, deposito temporaneo e RENTRI. Ricerca di soluzioni di recupero e riciclo per gli scarti industriali.',
    title: 'Consulenza ambientale sui rifiuti speciali | TIMIA',
    description:
      'Consulenza sui rifiuti speciali pericolosi e non pericolosi: classificazione, RENTRI, registri e FIR, deposito temporaneo, recupero degli scarti industriali.',
    h1: 'Consulenza ambientale sui rifiuti speciali, pericolosi e non pericolosi',
    lead:
      'Norme che cambiano, adempimenti digitali, responsabilità del produttore. Ti aiutiamo a gestire i rifiuti speciali in modo conforme e con costi sotto controllo, e studiamo con te come trasformare gli scarti in risorse.',
    summary: [
      ['Per chi', 'Responsabili HSE e ambiente, direzioni tecniche'],
      ['Ambiti', 'Adempimenti, classificazione, recupero scarti'],
      ['Formula', 'Interventi puntuali o affiancamento continuativo'],
      ['Area', 'Tutto il territorio nazionale'],
    ],
    problems: [
      ['Adempimenti in evoluzione', 'RENTRI, nuovi modelli di registro e formulario, scadenze del MUD: restare aggiornati richiede tempo e competenze.'],
      ['Rischio sanzioni', 'Errori su registri, formulari, deposito temporaneo o classificazione espongono a sanzioni amministrative e, nei casi più gravi, penali.'],
      ['Scarti che costano', 'Materiali che potrebbero diventare sottoprodotti o essere recuperati finiscono in smaltimento, con costi evitabili.'],
      ['Nessuno dedicato in azienda', 'Spesso la gestione dei rifiuti è una delle tante attività di chi si occupa di sicurezza o produzione.'],
    ],
    whatIntro: 'Un team con competenze tecniche e normative, che parla la lingua dei reparti e quella degli enti di controllo.',
    what: [
      'Audit della gestione rifiuti: deposito temporaneo, etichettatura, registri, formulari, MUD',
      'Supporto alla classificazione e all’attribuzione dei codici EER',
      'Assistenza per iscrizione e adempimenti RENTRI, registro cronologico di carico e scarico e FIR',
      'Valutazione dei requisiti per qualificare uno scarto come sottoprodotto (art. 184-bis)',
      'Ricerca e sviluppo di soluzioni di recupero e riciclo degli scarti industriali, con prove presso impianti partner',
      'Formazione del personale che gestisce i rifiuti',
      'Supporto tecnico-normativo nei rapporti con gli enti di controllo',
    ],
    photo: 'Consulente TIMIA con il responsabile HSE del cliente durante un audit in reparto',
    rnd: {
      title: 'Ricerca e sviluppo: dallo scarto alla risorsa',
      text: 'Per alcuni scarti industriali non esiste ancora una filiera di recupero consolidata. Studiamo le caratteristiche del materiale, individuiamo le possibili destinazioni e verifichiamo con impianti partner la fattibilità tecnica ed economica. L’obiettivo è ridurre i volumi a smaltimento e i relativi costi.',
      steps: ['Caratterizzazione dello scarto', 'Studio delle filiere di recupero', 'Prove con impianti partner', 'Percorso normativo: sottoprodotto, End of Waste o recupero', 'Avvio a regime'],
    },
    how: [
      ['Primo colloquio', 'Ascoltiamo esigenze, criticità e scadenze.'],
      ['Sopralluogo e audit', 'Verifichiamo in azienda documenti, aree di deposito e procedure.'],
      ['Report', 'Ricevi un documento con le criticità rilevate e le priorità di intervento.'],
      ['Piano d’azione', 'Definiamo insieme interventi, responsabilità e tempi.'],
      ['Affiancamento', 'Su richiesta ti seguiamo nel tempo, con verifiche periodiche e aggiornamenti normativi.'],
    ],
    norms: [
      ['D.Lgs. 152/2006, Parte IV', 'In particolare artt. 183 (definizioni), 184 (classificazione), 184-bis (sottoprodotti), 184-ter (End of Waste), 185-bis (deposito temporaneo), 188 (responsabilità), 190 (registro), 193 (trasporto e FIR).'],
      ['D.M. 4 aprile 2023, n. 59', 'Regolamento RENTRI: registro elettronico nazionale, nuovi modelli di registro e formulario.'],
      ['Legge 25 gennaio 1994, n. 70', 'Modello Unico di Dichiarazione ambientale (MUD).'],
      ['D.Lgs. 116/2020', 'Modifiche alla Parte IV del D.Lgs. 152/2006 in attuazione delle direttive (UE) 2018/851 e 2018/852.'],
      ['Reg. (UE) 1357/2014', 'Caratteristiche di pericolo dei rifiuti.'],
    ],
    faq: [
      {
        q: 'Cosa verificate durante un audit?',
        a: '<p>Aree di deposito temporaneo e contenitori, etichettatura, classificazione e codici EER, registro cronologico, formulari, MUD, autorizzazioni di trasportatori e impianti, contratti. Alla fine ricevi un report con le priorità di intervento.</p>',
      },
      {
        q: 'Potete aiutarci con il RENTRI?',
        a: '<p>Sì. Verifichiamo se e come la tua azienda è obbligata, supportiamo l’iscrizione e l’impostazione di registro e formulari secondo i nuovi modelli. Approfondisci nel nostro <a href="/news/rentri-registro-elettronico-rifiuti/">articolo sul RENTRI</a>.</p>',
      },
      {
        q: 'Quando uno scarto può essere considerato sottoprodotto?',
        a: '<p>Quando rispetta tutte le condizioni dell’art. 184-bis del D.Lgs. 152/2006: nasce da un processo di produzione che non ha lo scopo di produrlo, il suo utilizzo successivo è certo, può essere usato direttamente senza trattamenti diversi dalla normale pratica industriale e il suo impiego è legale, senza impatti negativi su ambiente e salute.</p>',
      },
      {
        q: 'Offrite consulenze continuative?',
        a: '<p>Possiamo intervenire su una singola esigenza o affiancarti in modo continuativo. Definiamo insieme la formula più adatta alla tua organizzazione.</p>',
      },
    ],
    related: ['analisi-rifiuti', 'smaltimento-rifiuti-industriali', 'prodotti-end-of-waste'],
  },

  {
    slug: 'bonifica-siti-contaminati',
    tag: 'Titolo V D.Lgs. 152/06',
    num: '05',
    icon: 'bonifica',
    name: 'Bonifica siti contaminati',
    navDesc: 'Caratterizzazione, mappatura, piano di bonifica',
    short:
      'Caratterizzazione della contaminazione, mappatura delle aree, redazione del piano di bonifica e gestione dei rifiuti prodotti dall’intervento.',
    title: 'Bonifica siti contaminati e aree dismesse | TIMIA',
    description:
      'Siti contaminati e aree dismesse: caratterizzazione della contaminazione, mappatura delle aree, piano di bonifica e gestione dei rifiuti prodotti.',
    h1: 'Bonifica di siti contaminati e aree dismesse',
    lead:
      'Aree industriali dismesse, sversamenti, serbatoi interrati. Individuiamo e delimitiamo la contaminazione, redigiamo il piano di bonifica e gestiamo i rifiuti prodotti, lungo il percorso previsto dal Titolo V del D.Lgs. 152/2006.',
    summary: [
      ['Per chi', 'Proprietari di aree, aziende, enti, studi tecnici'],
      ['Attività', 'Caratterizzazione, mappatura, piano di bonifica'],
      ['Rifiuti', 'Terre, materiali di scavo, rifiuti di bonifica'],
      ['Area', 'Tutto il territorio nazionale'],
    ],
    problems: [
      ['Iter lungo e con più enti', 'Comune, Regione, Provincia, ARPA: ogni fase richiede documenti, approvazioni e tempi.'],
      ['Estensione e costi incerti', 'Senza una caratterizzazione accurata è impossibile stimare i volumi da trattare e il budget.'],
      ['Aree bloccate', 'Un sito contaminato non si vende, non si riqualifica e non si riconverte finché il procedimento non è chiuso.'],
      ['Grandi volumi di rifiuti', 'Terre, materiali di scavo e demolizione vanno classificati e avviati a destinazioni autorizzate.'],
    ],
    whatIntro: 'Seguiamo il procedimento dall’indagine preliminare alla gestione dei rifiuti di bonifica.',
    what: [
      'Indagine preliminare e ricostruzione della storia del sito',
      'Piano di caratterizzazione: sondaggi, campionamento di suolo, sottosuolo e acque sotterranee',
      'Mappatura delle aree contaminate e modello concettuale del sito',
      'Confronto con le concentrazioni soglia di contaminazione (CSC) e, se necessaria, analisi di rischio sito-specifica',
      'Redazione del progetto operativo di bonifica o di messa in sicurezza',
      'Gestione dei rifiuti di bonifica e delle terre e rocce da scavo: classificazione, trasporto, conferimento',
    ],
    photo: 'Sondaggio geognostico in un’area industriale dismessa',
    how: [
      ['Indagine preliminare', 'Raccolta di dati storici, sopralluogo e prime verifiche.'],
      ['Piano di caratterizzazione', 'Definiamo le indagini da presentare agli enti competenti.'],
      ['Indagini e mappatura', 'Campionamenti e analisi, delimitazione delle aree, modello concettuale del sito.'],
      ['Analisi di rischio e progetto', 'Se si superano le CSC, si valuta il rischio sito-specifico e si redige il progetto di bonifica.'],
      ['Bonifica e rifiuti', 'Gestiamo i rifiuti prodotti fino al destino finale, con la documentazione utile alla certificazione.'],
    ],
    norms: [
      ['D.Lgs. 152/2006, Parte IV, Titolo V', 'Bonifica di siti contaminati (artt. 239–253) e relativi allegati tecnici.'],
      ['D.P.R. 13 giugno 2017, n. 120', 'Disciplina semplificata della gestione delle terre e rocce da scavo.'],
      ['D.M. 12 febbraio 2015, n. 31', 'Criteri semplificati per caratterizzazione, messa in sicurezza e bonifica dei punti vendita carburanti.'],
      ['D.M. 1 marzo 2019, n. 46', 'Bonifica e messa in sicurezza delle aree destinate alla produzione agricola e all’allevamento.'],
      ['D.Lgs. 36/2003 e s.m.i.', 'Criteri di ammissibilità in discarica dei rifiuti di bonifica.'],
    ],
    faq: [
      {
        q: 'Cosa sono le CSC e le CSR?',
        a: '<p>Le CSC (concentrazioni soglia di contaminazione) sono i valori oltre i quali un sito è potenzialmente contaminato e va caratterizzato. Le CSR (concentrazioni soglia di rischio) si calcolano con l’analisi di rischio sito-specifica: se sono superate, il sito è contaminato e va bonificato.</p>',
      },
      {
        q: 'Chi deve attivare la procedura di bonifica?',
        a: '<p>Il responsabile dell’inquinamento, secondo l’art. 242 del D.Lgs. 152/2006. Anche il proprietario non responsabile può attivare volontariamente gli interventi, come previsto dall’art. 245. In entrambi i casi l’evento va comunicato agli enti competenti.</p>',
      },
      {
        q: 'Cosa si intende per messa in sicurezza?',
        a: '<p>Sono interventi che isolano o contengono la contaminazione: messa in sicurezza d’emergenza (MISE), operativa (MISO) per i siti in attività e permanente (MISP) quando la rimozione non è praticabile.</p>',
      },
      {
        q: 'Quanto dura un procedimento di bonifica?',
        a: '<p>Dipende dall’estensione della contaminazione, dalle tecniche scelte e dai tempi degli enti. Una caratterizzazione accurata fin dall’inizio è il modo migliore per evitare fasi aggiuntive.</p>',
      },
    ],
    related: ['analisi-rifiuti', 'smaltimento-amianto', 'smaltimento-rifiuti-industriali'],
  },

  {
    slug: 'prodotti-end-of-waste',
    tag: 'Economia circolare',
    num: '06',
    icon: 'eow',
    name: 'Prodotti End of Waste',
    navDesc: 'Per laterizi, cementifici e impianti di biogas',
    short:
      'Commercio di prodotti End of Waste personalizzati sulle specifiche di processo di laterifici, cementifici e impianti di biogas.',
    title: 'Prodotti End of Waste per laterizi, cementifici e biogas | TIMIA',
    description:
      'Prodotti End of Waste personalizzati per laterifici, cementifici e impianti di biogas: materiali conformi all’art. 184-ter, documentati e costanti.',
    h1: 'Prodotti End of Waste per laterizi, cementifici e impianti di biogas',
    lead:
      'Materiali che hanno cessato la qualifica di rifiuto e possono sostituire materie prime vergini nel tuo processo. Selezioniamo e forniamo prodotti End of Waste con caratteristiche definite sulle tue specifiche tecniche.',
    summary: [
      ['Per chi', 'Laterifici, cementifici, impianti di biogas'],
      ['Prodotti', 'End of Waste personalizzati'],
      ['Documenti', 'Dichiarazioni di conformità, schede tecniche'],
      ['Area', 'Tutto il territorio nazionale'],
    ],
    problems: [
      ['Materie prime care e incerte', 'Prezzi e disponibilità delle materie prime vergini incidono direttamente sui costi di produzione.'],
      ['Obiettivi di economia circolare', 'Clienti, bandi e rendicontazioni di sostenibilità chiedono di ridurre l’uso di risorse vergini.'],
      ['Qualità costante', 'Un materiale alternativo è utile solo se le sue caratteristiche restano stabili nel tempo.'],
      ['Dubbi sullo status giuridico', 'Serve la certezza che il materiale abbia davvero cessato la qualifica di rifiuto, con documenti che lo dimostrino.'],
    ],
    whatIntro: 'Partiamo dalle specifiche del tuo impianto e cerchiamo, nella nostra rete, il materiale più adatto.',
    what: [
      'Analisi delle specifiche tecniche del tuo processo',
      'Selezione di prodotti End of Waste da impianti autorizzati',
      'Personalizzazione delle caratteristiche concordate: composizione, granulometria, umidità',
      'Campionature e supporto alle prove in impianto',
      'Documentazione: dichiarazioni di conformità, schede tecniche, rapporti di prova',
      'Forniture programmate con logistica organizzata',
    ],
    photo: 'Cumuli di materiale End of Waste pronto per la spedizione, con cartello di identificazione del lotto',
    segments: [
      ['Laterizi', 'Materiali per la formulazione degli impasti, definiti sulle caratteristiche delle argille e del ciclo di cottura.', 'industria'],
      ['Cementifici', 'Materiali per la miscela cruda e per il processo, conformi ai requisiti di qualità dell’impianto.', 'industria'],
      ['Impianti di biogas', 'Prodotti compatibili con la dieta del digestore e con l’autorizzazione dell’impianto.', 'energia'],
    ],
    how: [
      ['Specifiche', 'Raccogliamo requisiti tecnici, quantitativi e vincoli autorizzativi del tuo impianto.'],
      ['Proposta e campionatura', 'Ti proponiamo i prodotti adatti e forniamo campioni con i relativi rapporti di prova.'],
      ['Prove in impianto', 'Verifichiamo insieme il comportamento del materiale nel processo.'],
      ['Accordo di fornitura', 'Definiamo caratteristiche, tolleranze, quantità, frequenza e documenti di ogni lotto.'],
      ['Forniture e controllo', 'Consegne programmate e controllo costante della conformità.'],
    ],
    norms: [
      ['D.Lgs. 152/2006, art. 184-ter', 'Cessazione della qualifica di rifiuto (End of Waste).'],
      ['Direttiva 2008/98/CE, art. 6', 'Criteri europei per la cessazione della qualifica di rifiuto, come modificata dalla Direttiva (UE) 2018/851.'],
      ['Regolamenti e decreti End of Waste', 'Criteri specifici europei (es. Reg. UE 333/2011 sui rottami metallici) e nazionali (es. D.M. 14 febbraio 2013, n. 22 sui combustibili solidi secondari).'],
      ['Reg. (CE) 1907/2006 (REACH)', 'Normativa sulle sostanze chimiche applicabile ai materiali che hanno cessato la qualifica di rifiuto.'],
    ],
    faq: [
      {
        q: 'Che differenza c’è tra End of Waste e sottoprodotto?',
        a: '<p>Il sottoprodotto non è mai stato un rifiuto: è un residuo di produzione che rispetta le condizioni dell’art. 184-bis. Il prodotto End of Waste nasce invece da un rifiuto sottoposto a un’operazione di recupero e che soddisfa i criteri dell’art. 184-ter.</p>',
      },
      {
        q: 'Un prodotto End of Waste è ancora soggetto alla normativa sui rifiuti?',
        a: '<p>No. Quando cessa la qualifica di rifiuto il materiale è a tutti gli effetti un prodotto e segue le regole applicabili ai prodotti, comprese quelle sulle sostanze chimiche.</p>',
      },
      {
        q: 'Quali documenti accompagnano ogni fornitura?',
        a: '<p>La documentazione prevista dai criteri End of Waste applicabili, di norma la dichiarazione di conformità del lotto, oltre a schede tecniche e rapporti di prova concordati.</p>',
      },
      {
        q: 'Potete sviluppare un prodotto su misura?',
        a: '<p>Sì: partiamo dalle specifiche del tuo processo e cerchiamo, nella nostra rete di impianti, il materiale con le caratteristiche più adatte.</p>',
      },
    ],
    related: ['consulenza-ambientale', 'smaltimento-rifiuti-industriali', 'analisi-rifiuti'],
    productsNote: ph('elenco dei prodotti End of Waste disponibili, con schede tecniche scaricabili'),
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
export const serviceUrl = (s) => `/servizi/${s.slug}/`;
