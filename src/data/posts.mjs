// Articoli della sezione News / Approfondimenti.
// Contenuti informativi: prima della pubblicazione far verificare date e riferimenti
// al responsabile tecnico, perché la normativa ambientale cambia spesso.

export const categories = {
  rentri: 'RENTRI e tracciabilità',
  eer: 'Classificazione e codici EER',
  eow: 'End of Waste',
  amianto: 'Amianto',
};

export const posts = [
  {
    slug: 'rentri-registro-elettronico-rifiuti',
    category: 'rentri',
    date: '2026-09-10',
    title: 'RENTRI: obblighi, scadenze e cosa verificare in azienda',
    metaTitle: 'RENTRI: obblighi e verifiche per le aziende | TIMIA',
    description:
      'Cos’è il RENTRI, chi è obbligato all’iscrizione, cosa cambia per registro cronologico e formulario (FIR) e una checklist per verificare la tua azienda.',
    excerpt:
      'Chi è obbligato, come sono cambiati registro e formulario e una checklist pratica per verificare che la tua azienda sia in regola con il registro elettronico nazionale.',
    service: 'consulenza-ambientale',
    body: `
<p>Il <strong>RENTRI</strong>, Registro elettronico nazionale per la tracciabilità dei rifiuti, è il sistema digitale gestito dal Ministero dell’Ambiente e della Sicurezza Energetica con il supporto tecnico dell’Albo Nazionale Gestori Ambientali. È disciplinato dal <strong>D.M. 4 aprile 2023, n. 59</strong> e sostituisce progressivamente la gestione cartacea di registri e formulari.</p>
<p>Dopo le finestre di iscrizione scaglionate tra il 2024 e il 2026, il sistema è entrato a regime. Il punto oggi non è più “cosa cambierà”, ma verificare che quanto previsto sia davvero applicato in azienda.</p>

<h2>Chi è obbligato all’iscrizione</h2>
<p>In sintesi, devono iscriversi al RENTRI i soggetti tenuti al registro cronologico di carico e scarico, tra cui:</p>
<ul>
  <li>enti e imprese che effettuano operazioni di trattamento dei rifiuti;</li>
  <li>produttori iniziali di rifiuti speciali pericolosi;</li>
  <li>produttori iniziali di rifiuti speciali non pericolosi derivanti da lavorazioni industriali e artigianali o dal trattamento di rifiuti e acque, con più di dieci dipendenti;</li>
  <li>chi raccoglie e trasporta rifiuti a titolo professionale, commercianti e intermediari di rifiuti pericolosi.</li>
</ul>
<p>Esistono esclusioni ed eccezioni: la posizione di ogni azienda va verificata in base all’attività svolta, ai rifiuti prodotti e al numero di dipendenti.</p>

<h2>Le finestre di iscrizione</h2>
<p>L’iscrizione è stata organizzata in tre fasi, in base al tipo di soggetto e alle dimensioni dell’impresa:</p>
<ul>
  <li><strong>dal 15 dicembre 2024 al 13 febbraio 2025</strong>: produttori con più di 50 dipendenti e gli altri soggetti obbligati diversi dai produttori, come trasportatori e impianti;</li>
  <li><strong>dal 15 giugno al 14 agosto 2025</strong>: produttori con più di 10 e fino a 50 dipendenti;</li>
  <li><strong>dal 15 dicembre 2025 al 13 febbraio 2026</strong>: gli altri produttori obbligati, inclusi quelli fino a 10 dipendenti.</li>
</ul>
<p>Se la tua azienda rientra tra i soggetti obbligati e non ha completato l’iscrizione, è il primo aspetto da regolarizzare.</p>

<h2>Registro e formulario: i nuovi modelli</h2>
<p>Dal <strong>13 febbraio 2025</strong> sono in uso i nuovi modelli di registro cronologico di carico e scarico e di formulario di identificazione del rifiuto (FIR). Il formulario va vidimato in modalità digitale attraverso i servizi del RENTRI, e chi è iscritto tiene il registro in formato digitale, trasmettendo i dati al sistema con le modalità previste.</p>
<p>Il decreto prevede anche il passaggio al formulario interamente digitale, con tempistiche scaglionate: verifica sul portale ufficiale del RENTRI il calendario aggiornato applicabile alla tua posizione.</p>

<h2>Checklist: cosa verificare oggi in azienda</h2>
<ol>
  <li>La tua azienda rientra tra i soggetti obbligati? Controlla attività, tipologie di rifiuti e numero di dipendenti.</li>
  <li>L’iscrizione è completa e i contributi annuali sono stati versati?</li>
  <li>Il registro cronologico segue il nuovo modello ed è aggiornato nei tempi previsti?</li>
  <li>I formulari sono vidimati digitalmente e compilati secondo il nuovo modello?</li>
  <li>La trasmissione dei dati al RENTRI avviene nei tempi previsti?</li>
  <li>Se ti affidi a un consulente o a un’associazione di categoria, la delega è formalizzata?</li>
  <li>Il personale che compila registri e formulari è formato sui nuovi strumenti?</li>
</ol>

<h2>Come possiamo aiutarti</h2>
<p>Con il servizio di <a href="/servizi/consulenza-ambientale/">consulenza ambientale</a> verifichiamo la posizione della tua azienda rispetto al RENTRI, supportiamo iscrizione e impostazione di registro e formulari e controlliamo che i dati siano coerenti con la gestione reale dei rifiuti.</p>
`,
  },
  {
    slug: 'codici-eer-classificazione-rifiuti',
    category: 'eer',
    date: '2026-07-15',
    title: 'Codici EER: come si classifica correttamente un rifiuto',
    metaTitle: 'Codici EER: guida alla classificazione dei rifiuti | TIMIA',
    description:
      'Come si attribuisce il codice EER: struttura dell’elenco europeo, ordine di ricerca dei capitoli, voci assolute e a specchio, caratteristiche di pericolo HP.',
    excerpt:
      'Struttura del codice, ordine in cui cercare i capitoli, voci assolute e voci a specchio, caratteristiche di pericolo: i passaggi per una classificazione che regge ai controlli.',
    service: 'analisi-rifiuti',
    body: `
<p>La classificazione è il primo passo nella gestione di un rifiuto, e il più delicato. Spetta al <strong>produttore</strong>, che attribuisce il codice dell’Elenco europeo dei rifiuti (<strong>EER</strong>) prima di avviare il rifiuto a recupero o smaltimento. Da quel codice dipendono impianti utilizzabili, modalità di trasporto, adempimenti e costi.</p>

<h2>Com’è fatto un codice EER</h2>
<p>Il codice è composto da sei cifre, lette a coppie:</p>
<ul>
  <li>le prime due indicano il <strong>capitolo</strong>, cioè la fonte o l’attività che genera il rifiuto;</li>
  <li>le seconde il <strong>sottocapitolo</strong>, cioè il processo;</li>
  <li>le ultime due il <strong>rifiuto specifico</strong>.</li>
</ul>
<p>Esempio: nel codice <strong>17 06 05*</strong>, “17” indica i rifiuti delle attività di costruzione e demolizione, “17 06” i materiali isolanti e da costruzione contenenti amianto, “17 06 05*” i materiali da costruzione contenenti amianto. L’<strong>asterisco</strong> segnala un rifiuto pericoloso.</p>

<h2>In che ordine cercare il codice</h2>
<p>L’elenco è organizzato in 20 capitoli e va consultato seguendo un ordine preciso:</p>
<ol>
  <li>capitoli da 01 a 12 e da 17 a 20, in base all’attività che ha generato il rifiuto;</li>
  <li>se nessun codice è adatto, capitoli 13, 14 e 15;</li>
  <li>poi il capitolo 16;</li>
  <li>solo come ultima opzione, i codici che terminano con 99 del capitolo corrispondente all’attività.</li>
</ol>

<h2>Voci assolute e voci a specchio</h2>
<p>Alcuni codici sono <strong>voci assolute</strong>: il rifiuto è sempre pericoloso (per esempio 17 06 05*) oppure sempre non pericoloso (per esempio 17 04 05, ferro e acciaio).</p>
<p>Altri sono <strong>voci a specchio</strong>: coppie di codici per lo stesso tipo di rifiuto, una pericolosa e una no, come 17 05 03* e 17 05 04 per terra e rocce. In questi casi il produttore deve stabilire, sulla base delle informazioni sul processo e, se necessario, di analisi, se il rifiuto contiene sostanze pericolose che gli conferiscono una o più caratteristiche di pericolo.</p>

<h2>Le caratteristiche di pericolo HP</h2>
<p>Le caratteristiche di pericolo sono 15, definite dal Regolamento (UE) 1357/2014; i criteri per la HP14 sono stati fissati dal Regolamento (UE) 2017/997.</p>
<div class="table-wrap"><table>
  <caption>Caratteristiche di pericolo dei rifiuti</caption>
  <thead><tr><th scope="col">Codice</th><th scope="col">Caratteristica</th></tr></thead>
  <tbody>
    <tr><td>HP1</td><td>Esplosivo</td></tr>
    <tr><td>HP2</td><td>Comburente</td></tr>
    <tr><td>HP3</td><td>Infiammabile</td></tr>
    <tr><td>HP4</td><td>Irritante (irritazione cutanea e lesioni oculari)</td></tr>
    <tr><td>HP5</td><td>Tossicità specifica per organi bersaglio / tossicità in caso di aspirazione</td></tr>
    <tr><td>HP6</td><td>Tossicità acuta</td></tr>
    <tr><td>HP7</td><td>Cancerogeno</td></tr>
    <tr><td>HP8</td><td>Corrosivo</td></tr>
    <tr><td>HP9</td><td>Infettivo</td></tr>
    <tr><td>HP10</td><td>Tossico per la riproduzione</td></tr>
    <tr><td>HP11</td><td>Mutageno</td></tr>
    <tr><td>HP12</td><td>Liberazione di gas a tossicità acuta</td></tr>
    <tr><td>HP13</td><td>Sensibilizzante</td></tr>
    <tr><td>HP14</td><td>Ecotossico</td></tr>
    <tr><td>HP15</td><td>Rifiuto che può manifestare una caratteristica di pericolo non posseduta direttamente</td></tr>
  </tbody>
</table></div>

<h2>Il riferimento delle Linee guida SNPA</h2>
<p>Le <strong>Linee guida sulla classificazione dei rifiuti</strong> del Sistema nazionale per la protezione dell’ambiente (Delibera SNPA n. 105/2021, approvate con Decreto direttoriale n. 47 del 9 agosto 2021) descrivono la procedura da seguire: raccolta delle informazioni sul processo e sulle materie prime, uso delle schede di sicurezza, analisi quando le informazioni non bastano.</p>
<p>Se, pur avendo raccolto tutte le informazioni ragionevolmente disponibili, non è possibile escludere la presenza di caratteristiche di pericolo, il rifiuto va classificato come pericoloso, in applicazione del principio di precauzione.</p>

<h2>Gli errori più frequenti</h2>
<ul>
  <li>Usare il codice indicato dal fornitore o quello dell’anno precedente senza verificarlo.</li>
  <li>Scegliere un codice che termina con 99 per comodità, quando esiste una voce più specifica.</li>
  <li>Eseguire analisi con un set di parametri generico, non collegato al processo che genera il rifiuto.</li>
  <li>Non aggiornare la classificazione quando cambiano processo, materie prime o fornitori.</li>
</ul>

<h2>Come possiamo aiutarti</h2>
<p>Con il servizio di <a href="/servizi/analisi-rifiuti/">analisi e caratterizzazione dei rifiuti</a> ti affianchiamo in tutte le fasi, dal piano di campionamento all’interpretazione dei risultati, fino all’attribuzione del codice e alla scelta del destino.</p>
`,
  },
  {
    slug: 'end-of-waste-cessazione-qualifica-rifiuto',
    category: 'eow',
    date: '2026-05-20',
    title: 'End of Waste: quando un rifiuto smette di essere un rifiuto',
    metaTitle: 'End of Waste: cessazione della qualifica di rifiuto | TIMIA',
    description:
      'Art. 184-ter del D.Lgs. 152/2006: condizioni per l’End of Waste, criteri europei e nazionali, differenze con il sottoprodotto e opportunità per le imprese.',
    excerpt:
      'Le condizioni dell’art. 184-ter, chi stabilisce i criteri, la differenza con il sottoprodotto e cosa chiedere a chi fornisce materiali End of Waste.',
    service: 'prodotti-end-of-waste',
    body: `
<p><strong>End of Waste</strong> (cessazione della qualifica di rifiuto) indica il momento in cui un rifiuto, dopo un’operazione di recupero, diventa a tutti gli effetti un prodotto. È uno strumento centrale dell’economia circolare: permette di reimmettere materiali nei cicli produttivi al posto delle materie prime vergini.</p>

<h2>Le quattro condizioni dell’art. 184-ter</h2>
<p>Secondo l’art. 184-ter del D.Lgs. 152/2006, un rifiuto cessa di essere tale quando è stato sottoposto a un’operazione di recupero e soddisfa criteri specifici, nel rispetto di quattro condizioni:</p>
<ol>
  <li>la sostanza o l’oggetto è destinato a essere utilizzato per scopi specifici;</li>
  <li>esiste un mercato o una domanda per tale sostanza od oggetto;</li>
  <li>soddisfa i requisiti tecnici per gli scopi specifici e rispetta la normativa e gli standard esistenti applicabili ai prodotti;</li>
  <li>il suo utilizzo non porterà a impatti complessivi negativi sull’ambiente o sulla salute umana.</li>
</ol>

<h2>Chi stabilisce i criteri</h2>
<p>I criteri di dettaglio sono fissati su tre livelli:</p>
<ul>
  <li><strong>regolamenti europei</strong>, per esempio il Reg. (UE) 333/2011 sui rottami di ferro, acciaio e alluminio, il Reg. (UE) 1179/2012 sui rottami di vetro e il Reg. (UE) 715/2013 sui rottami di rame;</li>
  <li><strong>decreti ministeriali nazionali</strong>, per esempio sui combustibili solidi secondari (D.M. 22/2013), sul conglomerato bituminoso (D.M. 69/2018), sulla gomma vulcanizzata da pneumatici fuori uso (D.M. 78/2020), su carta e cartone (D.M. 188/2020) e sui rifiuti inerti da costruzione e demolizione (D.M. 127/2024);</li>
  <li><strong>autorizzazioni “caso per caso”</strong> rilasciate ai singoli impianti in assenza di criteri specifici, con controlli a campione del sistema ISPRA-ARPA.</li>
</ul>

<h2>End of Waste o sottoprodotto?</h2>
<div class="table-wrap"><table>
  <caption>Differenze tra sottoprodotto e End of Waste</caption>
  <thead><tr><th scope="col"></th><th scope="col">Sottoprodotto</th><th scope="col">End of Waste</th></tr></thead>
  <tbody>
    <tr><th scope="row">Riferimento</th><td>Art. 184-bis D.Lgs. 152/2006</td><td>Art. 184-ter D.Lgs. 152/2006</td></tr>
    <tr><th scope="row">È mai stato un rifiuto?</th><td>No</td><td>Sì, fino al completamento del recupero</td></tr>
    <tr><th scope="row">Trattamento</th><td>Solo normale pratica industriale</td><td>Operazione di recupero autorizzata</td></tr>
    <tr><th scope="row">Chi lo dimostra</th><td>Il produttore del residuo</td><td>L’impianto di recupero, secondo i criteri applicabili</td></tr>
  </tbody>
</table></div>

<h2>Perché interessa a laterifici, cementifici e impianti di biogas</h2>
<p>Per chi utilizza grandi quantità di materie prime, i prodotti End of Waste possono ridurre costi e consumo di risorse vergini e contribuire agli obiettivi di sostenibilità. Funzionano però solo a tre condizioni: caratteristiche costanti nel tempo, documentazione completa e compatibilità con l’autorizzazione e il processo dell’impianto che li riceve.</p>

<h2>Cosa chiedere a chi fornisce materiali End of Waste</h2>
<ul>
  <li>I criteri End of Waste applicati e l’autorizzazione dell’impianto che produce il materiale.</li>
  <li>La dichiarazione di conformità di ogni lotto, quando prevista dai criteri applicabili.</li>
  <li>Schede tecniche e rapporti di prova sui parametri rilevanti per il tuo processo.</li>
  <li>Tolleranze concordate e modalità di gestione delle non conformità.</li>
  <li>La tracciabilità dei lotti consegnati.</li>
</ul>

<h2>Come possiamo aiutarti</h2>
<p>Selezioniamo e forniamo <a href="/servizi/prodotti-end-of-waste/">prodotti End of Waste personalizzati</a> sulle specifiche del tuo impianto, con la documentazione di ogni lotto.</p>
`,
  },
  {
    slug: 'amianto-gestione-rifiuti-bonifica',
    category: 'amianto',
    date: '2026-03-18',
    title: 'Amianto: come si gestiscono i rifiuti da bonifica, compatto e friabile',
    metaTitle: 'Rifiuti da bonifica amianto: compatto e friabile | TIMIA',
    description:
      'Amianto compatto e friabile: chi può rimuoverlo, piano di lavoro, codici EER, trasporto e smaltimento. Guida pratica per aziende ed enti.',
    excerpt:
      'Differenze tra matrice compatta e friabile, chi può eseguire la bonifica, piano di lavoro, codici EER e destino dei rifiuti: cosa deve sapere chi commissiona l’intervento.',
    service: 'smaltimento-amianto',
    body: `
<p>L’impiego dell’amianto è vietato in Italia dalla <strong>Legge 257/1992</strong>, ma molti materiali che lo contengono sono ancora presenti in capannoni, edifici e impianti. Quando vengono rimossi diventano <strong>rifiuti pericolosi</strong>, da gestire con regole precise dalla bonifica fino al destino finale.</p>

<h2>Compatto o friabile: perché fa la differenza</h2>
<p>Il <strong>D.M. 6 settembre 1994</strong> distingue due tipologie di materiali:</p>
<ul>
  <li><strong>matrice compatta</strong>: le fibre sono legate in una matrice solida, come nel cemento-amianto di lastre di copertura, canne fumarie e serbatoi;</li>
  <li><strong>matrice friabile</strong>: il materiale può essere sbriciolato o ridotto in polvere con la semplice pressione manuale, come alcune coibentazioni e i rivestimenti a spruzzo.</li>
</ul>
<p>Il materiale friabile rilascia fibre molto più facilmente: per questo la sua bonifica richiede misure di protezione e confinamento più severe.</p>

<h2>Rimuovere, incapsulare o confinare</h2>
<p>Non sempre l’amianto deve essere rimosso subito. In base allo stato di conservazione, la normativa prevede tre tipi di intervento:</p>
<ul>
  <li><strong>rimozione</strong>, che elimina definitivamente il problema;</li>
  <li><strong>incapsulamento</strong>, con prodotti che inglobano le fibre;</li>
  <li><strong>confinamento</strong>, con una barriera che separa il materiale dagli ambienti occupati.</li>
</ul>
<p>Molte Regioni adottano metodi specifici per valutare il degrado delle coperture e stabilire i tempi di intervento.</p>

<h2>Chi può eseguire la bonifica</h2>
<p>Gli interventi devono essere eseguiti da imprese iscritte all’<strong>Albo Nazionale Gestori Ambientali in categoria 10</strong>: sottocategoria 10A per i materiali compatti, 10B per quelli friabili. Gli addetti devono aver seguito i percorsi formativi previsti.</p>
<p>Prima dell’inizio dei lavori l’impresa predispone il <strong>piano di lavoro</strong> previsto dall’art. 256 del D.Lgs. 81/2008 e lo invia all’organo di vigilanza competente, di norma almeno 30 giorni prima, salvo i casi di urgenza.</p>

<h2>Classificazione, imballaggio e trasporto</h2>
<p>I rifiuti da bonifica edilizia sono classificati di norma con i codici <strong>17 06 05*</strong> (materiali da costruzione contenenti amianto) o <strong>17 06 01*</strong> (materiali isolanti contenenti amianto). Esistono altri codici per rifiuti di diversa origine, per esempio apparecchiature o pastiglie per freni contenenti amianto: il codice corretto dipende sempre dalla provenienza.</p>
<p>Il materiale rimosso viene trattato per evitare la dispersione di fibre, imballato in modo sicuro ed etichettato. Il trasporto è eseguito da vettori autorizzati, applicando quando necessario le regole ADR per le merci pericolose.</p>

<h2>Il destino finale</h2>
<p>I rifiuti contenenti amianto sono conferiti in impianti autorizzati, in Italia soprattutto discariche con requisiti specifici. Il D.M. 248/2004 disciplina anche i trattamenti che modificano la struttura cristallina delle fibre.</p>

<h2>Checklist per chi commissiona l’intervento</h2>
<ol>
  <li>Verificare la presenza di amianto, se necessario con un’analisi di laboratorio.</li>
  <li>Far valutare lo stato di conservazione del materiale.</li>
  <li>Affidare i lavori a un’impresa iscritta in categoria 10A o 10B, secondo il materiale.</li>
  <li>Accertarsi che il piano di lavoro sia stato presentato.</li>
  <li>Richiedere e conservare formulari e documentazione di avvenuto smaltimento.</li>
</ol>

<h2>Come possiamo aiutarti</h2>
<p>Con il servizio di <a href="/servizi/smaltimento-amianto/">gestione dei rifiuti da bonifica amianto</a> coordiniamo le aziende qualificate e gestiamo i rifiuti fino al conferimento finale, con tutta la documentazione.</p>
`,
  },
];

export const postUrl = (p) => `/news/${p.slug}/`;

export function readingTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
