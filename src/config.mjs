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
  // Nome del modulo su Netlify Forms: le richieste arrivano in Netlify → Forms → "richiesta-offerta"
  // e vengono inoltrate via email agli indirizzi impostati in Forms → Form notifications.
  formName: 'richiesta-offerta',
  // true = sul sito compare l'avviso "prezzi di esempio". Metterlo a false dopo aver inserito
  // gli importi reali in src/data/rifiuti.mjs e src/data/offerte.mjs.
  prezziDiEsempio: true,
  // Tempo di risposta mostrato dopo l'invio — DA VERIFICARE con l'azienda.
  responseTime: 'entro 1 giorno lavorativo',
  // Immagine di condivisione social 1200×630 (es. '/assets/img/og-timia.jpg'). Vuoto = non inserita.
  ogImage: '',
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
