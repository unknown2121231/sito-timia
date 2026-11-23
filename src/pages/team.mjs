import { company } from '../config.mjs';
import { chapterHead, ctaBand, pageHero, breadcrumbLd, orgRef, btn, quoteUrl, pad2 } from '../lib/html.mjs';
import { personCard } from '../lib/components.mjs';
import { team, teamAreas } from '../data/team.mjs';

const crumbs = [
  { name: 'Chi siamo', path: '/chi-siamo/' },
  { name: 'Team', path: '/team/' },
];

export default {
  path: '/team/',
  pageType: 'team',
  title: 'Il team TIMIA | Persone e competenze',
  description:
    'Il team tecnico-commerciale di TIMIA: sviluppo aziendale, area tecnica, amministrazione e logistica. Le persone che seguono la tua pratica rifiuti.',
  jsonld: [
    breadcrumbLd(crumbs),
    ...team.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role, worksFor: orgRef() })),
  ],
  body: `
${pageHero({
  crumbs,
  kicker: 'Team',
  title: 'Le persone <em>di TIMIA.</em>',
  lede: 'Un team tecnico-commerciale con competenze tecniche e normative. Sono le persone che seguono la tua pratica, dal primo contatto alla chiusura documentale.',
  ctas: btn(quoteUrl({ tipo: 'ricontatto' }), 'Parla con un tecnico', { variant: 'primary', cta: 'team-hero', ico: 'phone' }),
  ghost: 'Team',
})}

${teamAreas
  .map((area, i) => {
    const people = team.filter((p) => p.area === area.id);
    const theme = i % 2 ? 't-dark' : 't-light';
    return `<section class="section section--team ${theme} spot" data-theme="${i % 2 ? 'dark' : 'light'}" aria-labelledby="area-${area.id}">
  <div class="container team-area">
    ${chapterHead({ kicker: `${pad2(i + 1)} — Area`, title: area.name, id: `area-${area.id}`, lede: area.desc })}
    <div class="team-grid">
      ${people.map((p) => personCard(p)).join('')}
    </div>
  </div>
</section>`;
  })
  .join('')}

${ctaBand({
  kicker: 'Contatti',
  title: 'Vuoi parlare con <em>il referente giusto?</em>',
  text: `Scrivici o chiamaci al ${company.phone}: ti mettiamo in contatto con la persona che segue il tuo tipo di richiesta.`,
  where: 'team-final',
  ghost: 'Team',
})}
`,
};
