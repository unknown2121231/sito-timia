# Sito web TIMIA S.r.l.

Sito aziendale statico, multipagina, responsive e ottimizzato SEO per TIMIA S.r.l. (Foligno).
È generato da un piccolo script Node **senza dipendenze**: il risultato in `dist/` è puro HTML/CSS/JS e si pubblica su qualunque hosting (anche i classici hosting condivisi con PHP).

## Comandi

Serve Node.js 18 o successivo.

| Comando | Cosa fa |
|---|---|
| `npm run build` | Genera il sito in `dist/` |
| `npm run serve` | Anteprima locale su http://localhost:4173 (simula anche l'invio del form) |
| `npm run dev` | Build + anteprima |

A ogni build lo script segnala quanti segnaposto `[DA INSERIRE]` / `[DA VERIFICARE]` restano nelle pagine.

## Struttura

```
src/
  config.mjs          dati aziendali, dominio, ID Google Tag Manager, tempi di risposta
  data/               contenuti: servizi, settori, team, articoli, province
  pages/              una pagina (o un gruppo di pagine) per file
  lib/                layout comune, componenti, modulo preventivo (quote-form.mjs), icone SVG, generatore PDF segnaposto
  assets/css|js|img   stile, script (menu, cookie, form), favicon e logo
  documenti/          PDF reali di certificati e autorizzazioni (vedi sotto)
form-handler/         gestore PHP del form (copiato in dist/ al build)
brand/                logo originale e script che genera le varianti web (trasparente, negativo, favicon)
build.mjs             generatore del sito
serve.mjs             server di anteprima locale
```

Pagine generate (27): Home, Chi siamo, Team, Certificazioni e autorizzazioni, Servizi + 6 pagine servizio, Settori + 4 pagine settore, News + 4 articoli, Contatti e preventivi (+ pagina di conferma), landing locale “Smaltimento rifiuti in Umbria”, Privacy policy, Cookie policy, 404. Più `sitemap.xml`, `robots.txt`, `.htaccess`.

## Checklist prima della pubblicazione

I segnaposto sono evidenziati in giallo nel sito; si trovano anche cercando `DA INSERIRE` e `DA VERIFICARE` nei file di `src/`.

**Dati aziendali** (`src/config.mjs`)
- [ ] Capitale sociale (obbligatorio per le S.r.l., art. 2250 c.c.)
- [ ] URL della pagina Facebook (ora vuoto: l'icona compare solo quando è inserito)
- [ ] Tempo di risposta mostrato nel form (`responseTime`, ora “entro 1 giorno lavorativo”): confermarlo
- [ ] Dominio definitivo (`site.url`), usato per canonical, sitemap e dati strutturati

**Certificazioni e autorizzazioni** (`src/pages/certificazioni.mjs` e barra in home `src/pages/home.mjs`)
- [ ] Numeri di certificato ISO 9001 / ISO 14001, ente, scadenze
- [ ] Iscrizione all'Albo Gestori Ambientali: numero, sezione, categorie e classi
- [ ] Autorizzazioni ambientali: tipo, ente, estremi
- [ ] PDF reali: copiarli in `src/documenti/` con questi nomi, poi rifare la build:
  `certificato-iso-9001.pdf`, `certificato-iso-14001.pdf`, `iscrizione-albo-gestori-ambientali.pdf`, `autorizzazioni-ambientali.pdf`, `politica-qualita-ambiente.pdf`

**Contenuti**
- [ ] Storia aziendale e tappe con anni (`src/pages/chi-siamo.mjs`)
- [ ] Tonnellate gestite e clienti serviti (home, sezione numeri)
- [ ] Eventuali nomi o loghi dei partner, se autorizzati
- [ ] Accreditamento dei laboratori (servizio Analisi)
- [ ] Elenco prodotti End of Waste e schede tecniche (servizio EoW)
- [ ] Iscrizioni MEPA / elenchi fornitori (settore PA), solo se presenti
- [ ] Far rileggere i 4 articoli e le sezioni “Normativa di riferimento” al responsabile tecnico e aggiornare le date di pubblicazione (`src/data/posts.mjs`)

**Immagini** (nessuna immagine generata: ovunque c'è un segnaposto “FOTO REALE DA INSERIRE” con la descrizione dello scatto suggerito)
- [x] Logo ufficiale inserito (header, footer, favicon, dati strutturati). Le varianti web si rigenerano con `python brand/genera-logo.py` a partire da `brand/logo-timia-originale.webp` (serve Python con Pillow e numpy); se disponibile, sostituire l'originale con il file vettoriale (SVG/PDF) dello studio grafico per una resa più nitida
- [ ] **Foto di apertura della home** (la più importante per questo stile): `site.heroImage` in `src/config.mjs`, consigliata 2400×1400 px, WebP o JPG sotto i 400 KB
- [ ] Foto: nei file delle pagine, aggiungere `src` alla chiamata `photo({...})`, ad es.
  `photo({ desc: '…', src: '/assets/img/foto/piazzale.webp', width: 1600, height: 1000 })` → viene generato un `<img>` con lazy loading.
  Consigliato: WebP o AVIF, 1600 px sul lato lungo, sotto i 250 KB.
- [ ] Foto del team (formato verticale 4:5): campo `photo` in `src/data/team.mjs`
- [ ] Immagine di condivisione social 1200×630: `site.ogImage` in `config.mjs`

**Privacy e cookie**
- [ ] Far validare privacy policy e cookie policy al consulente privacy; completare tempi di conservazione, fornitori (hosting, email), eventuale DPO; rimuovere l'avviso “BOZZA”
- [ ] Aggiornare la tabella dei cookie con gli strumenti realmente configurati in Tag Manager
- [ ] Consigliato: ospitare i font sul proprio server (oggi arrivano da Bunny Fonts, CDN europea senza cookie). Scaricare Archivo, IBM Plex Sans e IBM Plex Mono in formato woff2, metterli in `src/assets/fonts/` e sostituire il link `FONTS` in `src/lib/layout.mjs` con regole `@font-face`

**Form preventivo** (Netlify Forms, form `preventivo`)
- [ ] Su Netlify: *Forms → Enable form detection*, poi un nuovo deploy; in *Forms → Form notifications* aggiungere l'email che riceve le richieste (es. info@timia.it)
- [ ] Fare un invio di prova reale, con allegato, e verificare la ricezione. Limiti: 5 allegati, 8 MB in totale per invio (piano gratuito: 100 invii/mese)
- [ ] Hosting PHP tradizionale invece di Netlify: impostare `site.formEndpoint = '/invia-richiesta.php'` (il gestore in `form-handler/` **non è stato testato** e va adattato ai campi `allegato1`…`allegato5`)

**Netlify**: build `node build.mjs`, cartella `dist` (già impostate in `netlify.toml`). Ogni push su GitHub ripubblica il sito.

**Pubblicazione**
- [ ] Caricare **il contenuto** di `dist/` nella root del sito (FTP/SFTP), incluso il file nascosto `.htaccess`
- [ ] Attivare in `.htaccess` il redirect a HTTPS (righe commentate) dopo aver verificato il certificato SSL
- [ ] Google Search Console: verificare il dominio e inviare `sitemap.xml`
- [ ] Creare o aggiornare la scheda **Google Business Profile** della sede di Foligno (fondamentale per le ricerche locali)

## Analytics e conversioni (GA4 tramite Google Tag Manager)

1. Inserire l'ID del contenitore in `src/config.mjs` → `gtmId: 'GTM-XXXXXXX'` e rifare la build.
2. GTM viene caricato **solo dopo il consenso** ai cookie statistici o di marketing. Prima del consenso Google Consent Mode v2 è impostato su `denied`; alla scelta dell'utente parte `gtag('consent', 'update', …)`.
3. In GTM: tag “Google tag” GA4 sull'evento `consent_update` e su All Pages, più un tag evento GA4 per ciascun evento sotto.
4. In GA4: segnare `generate_lead` come **evento chiave** (conversione). Per Google Ads, importare la conversione da GA4 o creare un tag di conversione sullo stesso evento.

Eventi inviati al `dataLayer` (nessun dato personale):

| Evento | Quando | Parametri |
|---|---|---|
| `generate_lead` | Invio del form riuscito | `form_name`, `request_type`, `waste_category`, `province`, `has_attachments` |
| `form_start` | Prima interazione col form | `request_type` |
| `form_step` | Passaggio allo step successivo | `form_step`, `request_type` |
| `form_error` | Errori di validazione | `form_step`, `error_fields` |
| `form_submit_error` | Invio fallito | – |
| `click_to_call` | Clic su un numero di telefono | `link_location` |
| `click_email` | Clic su un indirizzo email | `link_location` |
| `file_download` | Download di un PDF | `file_name` |
| `cta_click` | Clic sui pulsanti di invito all'azione | `cta_location`, `cta_text` |
| `map_load` | Caricamento della mappa Google | – |
| `consent_update` | Scelta sui cookie | `consent_analytics`, `consent_marketing` |

Il form invia anche il campo `origine` (parametri UTM o sito di provenienza + pagina di atterraggio) per attribuire ogni richiesta alla sua sorgente.

## Scelte tecniche

- **Stile**: stessa impostazione grafica di comagest.it — struttura “a capitoli” (Capitolo 00, 01…) con sezioni scure, chiare e una sezione sul colore del marchio, font Onest, titoli maiuscoli con le parole che salgono, occhielli spaziati, preloader (una volta per sessione), header trasparente che diventa bianco allo scroll con barra di avanzamento, menu mobile a schermo intero, punti di navigazione laterali in home, effetto “riflettore” che scurisce le sezioni in uscita, vetrina orizzontale dei settori, fascia scorrevole dei servizi, grande scritta TIMIA nel footer. Animazioni disattivate per chi ha impostato “riduci movimento”.

- **Colori** (dal logo TIMIA): ardesia `#12242B` / `#0B161A` per le sezioni scure, carta `#F2F4F1` per quelle chiare, verde oliva `#55692A` per i pulsanti (testo bianco AA, ripreso dal payoff “Ambiente & Energia”), verde salvia `#BCCF7F` per le parole evidenziate su fondo scuro, sezione del marchio con gradiente verde prato → azzurro cielo `#2D6595` (come la lampadina con l’albero). Contrasti verificati WCAG AA; tutti i token sono in cima a `src/assets/css/main.css`.

- **SEO**: title e meta description unici, un solo H1 per pagina, URL parlanti, canonical, Open Graph, sitemap, dati strutturati Schema.org (`LocalBusiness`/`Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`), landing locale per Umbria/Foligno/Perugia.
- **Accessibilità (WCAG 2.1 AA)**: contrasti verificati, link “Vai al contenuto”, navigazione completa da tastiera (menu con Esc, focus visibile), etichette ed errori dei campi collegati, riepilogo errori con link ai campi, `prefers-reduced-motion` rispettato.
- **Performance**: nessun framework, un solo CSS (~15 KB compresso con gzip), JS differito, icone SVG inline, font non bloccanti, cache-busting automatico degli asset, compressione e cache in `.htaccess`.
- **GDPR**: banner conforme alle Linee guida del Garante (rifiuto con la stessa evidenza dell'accettazione, “X” = rifiuto, scelta valida 6 mesi, link “Preferenze cookie” nel footer), mappa Google caricata solo su richiesta, consenso privacy obbligatorio separato da quello marketing facoltativo.
- **Form senza JavaScript**: funziona comunque come modulo unico e reindirizza a `/contatti/grazie/`.
