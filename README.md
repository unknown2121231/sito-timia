# Sito web TIMIA S.r.l. — preventivo online rifiuti

Sito statico in stile "comparatore": il visitatore sceglie i rifiuti da smaltire, indica le quantità, confronta tre offerte con il prezzo calcolato e, se gli va bene, preme **Contatta TIMIA**. La richiesta (con riepilogo di rifiuti, quantità, offerta e totale) arriva via email.

Generato da un piccolo script Node **senza dipendenze**: il risultato in `dist/` è puro HTML/CSS/JS.

## Comandi (Node 18+)

| Comando | Cosa fa |
|---|---|
| `npm run build` | Genera il sito in `dist/` |
| `npm run serve` | Anteprima su http://localhost:4173 (simula anche l'invio del modulo) |
| `npm run dev` | Build + anteprima |

## Dove inserire i PREZZI

1. **`src/data/rifiuti.mjs`** — elenco dei rifiuti: nome, codice EER, unità (`kg`, `t`, `m3`, `m2`, `pz`) e `prezzo` in € per unità, IVA esclusa. `prezzo: null` = "prezzo su richiesta"; `prezzo: 0` = nessun costo di smaltimento. Si possono aggiungere o togliere rifiuti e categorie.
2. **`src/data/offerte.mjs`** — le tre formule (Essenziale, Smart, Express): costo fisso, maggiorazione %, ordine minimo, tempi e cosa è incluso.

   `totale = costoFisso + Σ(prezzo × quantità) × (1 + maggiorazione/100)`, mai sotto `ordineMinimo`.
3. In **`src/config.mjs`** mettere `prezziDiEsempio: false` quando gli importi sono quelli reali: sparisce l'avviso "prezzi di esempio".

**Gli importi attuali sono solo di esempio.**

## Come arrivano le richieste (email)

Il modulo usa **Netlify Forms** (modulo `richiesta-offerta`):
- [ ] Su Netlify: *Forms → Enable form detection*, poi un nuovo deploy.
- [ ] *Forms → Form notifications → Email notification*: inserire l'indirizzo che riceve le richieste (es. info@timia.it).
- [ ] Fare un invio di prova.

Ogni email contiene: nome, azienda, email, telefono, comune/CAP, note, consensi, `rifiuti`, `offerta`, `totale_stimato`, `riepilogo` completo e `origine` (UTM/provenienza).
In più, nel passo 4 c'è il link "Invia il riepilogo dalla tua app di posta", che apre un'email già compilata verso `company.email`.

## Struttura

```
src/
  config.mjs        dati aziendali, nome del modulo, avviso prezzi di esempio, GTM
  data/             rifiuti.mjs (catalogo e prezzi), offerte.mjs (formule)
  pages/            home.mjs (hero, configuratore, come funziona, FAQ…), legal.mjs (privacy, cookie, grazie, 404)
  lib/              layout comune, icone SVG
  assets/           css/main.css, js/main.js (menu, cookie), js/configuratore.js (calcolo e invio)
brand/              logo originale e script per le varianti web
```

## Da completare prima della pubblicazione
- [ ] Prezzi reali (vedi sopra) e `prezziDiEsempio: false`
- [ ] Capitale sociale in `src/config.mjs`
- [ ] Tempo di risposta (`responseTime`)
- [ ] Far validare privacy e cookie policy (testi segnati "DA INSERIRE")
- [ ] ID di Google Tag Manager (`gtmId`), caricato solo dopo il consenso cookie

Eventi inviati al `dataLayer`: `form_start`, `form_step`, `select_offer`, `form_error`, `generate_lead`, `form_submit_error`, `click_to_call`, `click_email`, `cta_click`, `consent_update`.
