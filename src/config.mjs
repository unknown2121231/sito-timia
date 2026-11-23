// Configurazione generale del sito TIMIA.
// I valori segnati "DA INSERIRE" / "DA VERIFICARE" vanno completati prima della pubblicazione
// (vedi checklist nel README).

export const site = {
  url: 'https://www.timia.it', // dominio di produzione, senza slash finale
  name: 'TIMIA',
  lang: 'it',
  locale: 'it_IT',
  themeColor: '#12242B',
  // Google Tag Manager: inserire l'ID del contenitore (es. 'GTM-ABC1234').
  // Viene caricato SOLO dopo il consenso ai cookie statistici o di marketing.
  gtmId: '',
  // Destinazione del form preventivo. Su Netlify le richieste sono raccolte da Netlify Forms
  // (form name="preventivo") e questa è la pagina di conferma mostrata a chi invia senza JavaScript.
  // Su un hosting PHP tradizionale usare invece '/invia-richiesta.php' (vedi /form-handler).
  formEndpoint: '/contatti/grazie/',
  // Tempo di risposta mostrato nel messaggio di conferma del form — DA VERIFICARE con l'azienda.
  responseTime: 'entro 1 giorno lavorativo',
  // Immagine di condivisione social 1200×630 (es. '/assets/img/og-timia.jpg'). Vuoto = non inserita.
  ogImage: '',
  // Foto di sfondo dell'apertura in home (consigliato 2400×1400, WebP/JPG sotto i 400 KB),
  // es. '/assets/img/foto/hero-piazzale.webp'. Vuoto = segnaposto "FOTO REALE DA INSERIRE".
  heroImage: '',
  // Aumentare questo numero se cambiano le finalità dei cookie: il banner verrà riproposto a tutti.
  consentVersion: 1,
  // Data di ultimo aggiornamento di privacy e cookie policy.
  policyUpdated: '23 settembre 2026',
};

export const company = {
  legalName: 'TIMIA S.r.l.',
  street: 'Via delle Industrie, 78',
  postalCode: '06034',
  city: 'Foligno',
  province: 'PG',
  region: 'Umbria',
  country: 'IT',
  phone: '+39 0742 391253',
  phoneHref: '+390742391253',
  email: 'info@timia.it',
  pec: 'timia@pec.it',
  vat: '03264790548',
  rea: 'PG-276288',
  shareCapital: '', // es. '€ 10.000,00 i.v.' — obbligatorio per le S.r.l. (art. 2250 c.c.)
  hoursLabel: 'Lunedì–venerdì 9:00–17:00',
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  yearsExperience: 30,
  social: {
    instagram: 'https://www.instagram.com/timiasrl/',
    facebook: '', // DA INSERIRE: URL della pagina Facebook ufficiale
  },
};

export const mapsQuery = encodeURIComponent(`${company.street}, ${company.postalCode} ${company.city} ${company.province}`);
