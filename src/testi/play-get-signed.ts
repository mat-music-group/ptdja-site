/*
 * Testi, immagini e metadati della pagina `/play-get-signed`.
 *
 * Ogni stringa è copiata da `docs/webflow/html/play-get-signed.html` (verità
 * ultima) e confrontata con `docs/webflow/outline/play-get-signed.md`. Non si
 * riscrive, non si traduce, non si corregge: i refusi del sito restano
 * ("yEarly awards", "Official Contest" al singolare, il doppio spazio in
 * "you complete  builds"). Se una parola sembra sbagliata, è sbagliata sul
 * sito.
 *
 * - `META` e `JSON_LD`: copiati da `docs/webflow/meta/play-get-signed.json`.
 * - `DOMANDE`: le 7 domande della FAQ di questa pagina, le stesse del
 *   `FAQPage` del JSON-LD.
 * - Il listino, le recensioni e il popup non stanno qui: sono identici su 6
 *   pagine e vivono in `src/testi/condivisi.ts`.
 */

import type { CorsoInVetrina } from "@/components/sections/SliderCorsi";
import type { DomandaFaq } from "@/testi/condivisi";

/* ── Metadati ───────────────────────────────────────────────────────── */

export const META = {
  title: "Play & Get Signed – Talent Pool for DJs & Producers",
  description:
    "Submit your mixes and tracks. Enter contests & get scouted by partner labels, clubs & festivals. Grow through our structured Talent Pool program.",
  canonical: "https://www.petetong-djacademy.com/play-get-signed",
  ogImage:
    "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67c72a69971bade6763459e4_IMMAGINE%20ACADEMY.png",
  ogUrl: "https://www.petetong-djacademy.com/play-get-signed",
  ogSiteName: "Pete Tong DJ Academy",
} as const;

/* ── Sezione 1: hero ────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "TALENT SCOUTING",
  /* `h2.section-title-heading.p4`: due righe separate da `<br>`, con
     "Talent Pool®" dentro `span.text-span-101` (grassetto). */
  titoloRiga1: "Play & Get Signed:",
  titoloRiga2: "Discover our ",
  titoloEvidenziato: "Talent Pool®",
  /* L'iframe embedly che incapsula il player Wistia `zpsgevif91`.
     URL e parametri identici all'HTML, `&` compresi. */
  video: {
    src: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2Fzpsgevif91&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Fpete-tong-dj-academy.wistia.com%2Fmedias%2Fzpsgevif91&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2Ff4d85ea73f5763767695f18fab30d270418031fa.jpg%3Fimage_crop_resized%3D960x540&type=text%2Fhtml&schema=wistia",
    titolo: "Talent Pool ",
    larghezza: 940,
    altezza: 529,
    /* `style="padding-top:56.27659574468085%"` sul contenitore `.w-video`. */
    proporzione: "56.27659574468085%",
  },
  cta: { testo: "See All The Opportunities", href: "#opportunities" },
} as const;

/* ── Sezione 2 e 3: "How it Works" e lo slider dei 3 passi ──────────── */

export type PassoTalentPool = {
  readonly immagine: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
  readonly titolo: string;
  readonly testo: string;
};

export const COME_FUNZIONA = {
  titoloPrima: "How it ",
  titoloEvidenziato: "Works",
  passi: [
    {
      immagine: {
        src: "/webflow/play-get-signed/step-1-asia.jpg",
        alt: "DJ Course and Talent Activities at PTDJ Academy",
        larghezza: 1038,
        altezza: 1846,
      },
      titolo: "Study and Unlock Your Potential",
      testo:
        "Climb the grades by completing lessons and tasks. Each level unlocks new resources, tools, and access to exclusive Talent Pool® activities.",
    },
    {
      immagine: {
        src: "/webflow/play-get-signed/step-2-asia.jpg",
        alt: "Weekly Activities inside the campus",
        larghezza: 1038,
        altezza: 1846,
      },
      titolo: "Enter the Talent Pool®",
      /* Doppio spazio in "you complete  builds": è nell'HTML. */
      testo:
        "Put your skills to the test in weekly activities tailored to your level. Every activity you complete  builds your skills and visibility.",
    },
    {
      immagine: {
        src: "/webflow/play-get-signed/step-3-asia.jpg",
        alt: "Enter the global stages at Pete Tong DJ Academy",
        larghezza: 1038,
        altezza: 1846,
      },
      titolo: "Earn Your Spotlight",
      testo:
        "Stand out and earn your spotlight. Get released by leading global labels and play bars, clubs, radio, and festivals.",
    },
  ] as readonly PassoTalentPool[],
} as const;

/* ── Sezione 4: "Access Tailored Opportunities" (`id="opportunities"`) ─
 *
 * Tre pannelli, non due, perché il sito ne ha tre:
 *   - `pannelloDj`               → la card "DJs", visibile sempre;
 *   - `pannelloProducerDesktop`  → la card "Producers" affiancata, che il CSS
 *                                  (`.producer-right-desktop`) mostra solo sul
 *                                  desktop;
 *   - `pannelloProducerMobile`   → la seconda tabella
 *                                  (`.pricing-table.producer.yearly`), quella
 *                                  che il toggle "Producers" accende sul
 *                                  telefono.
 *
 * ⚠️ I due pannelli Producers NON dicono la stessa cosa: sul desktop le voci
 * sono "Play and Release / Official Contest / Selections / Release Slot /
 * Free Promotion", sul mobile sono quattro "Official contests" uguali più
 * "Free Promotion", e anche il paragrafo introduttivo è diverso. È così sul
 * sito: si riproduce e si segnala.
 */

export type Opportunita = {
  /** La riga in grassetto, prima del `<br>`. */
  readonly titolo: string;
  /** La riga sotto (a volte vuota nel markup originale). */
  readonly sottotitolo: string;
  /** L'angolo colorato in alto a sinistra della card. */
  readonly tono: "giallo" | "viola" | "rosso" | "verde";
  /**
   * Testo della "i" di spiegazione. Su `/play-get-signed` non c'è mai: il
   * sito qui non mette nessun tooltip. Esiste perché la stessa sezione
   * torna sulla home, dove invece ci sono.
   */
  readonly tooltip?: string;
  readonly logo: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
};

export type PannelloOpportunita = {
  /** `h4.accordion-heading`: manca del tutto nel pannello mobile. */
  readonly titolo?: string;
  readonly tonoTitolo?: "giallo" | "arancio";
  readonly paragrafo: string;
  readonly opportunita: readonly Opportunita[];
};

const LOGO_PACHA = {
  src: "/webflow/shared/white-pacha.png",
  alt: "",
  larghezza: 164,
  altezza: 164,
} as const;
const LOGO_ELROW = {
  src: "/webflow/shared/white-elrow.png",
  alt: "",
  larghezza: 163,
  altezza: 163,
} as const;
const LOGO_ADE = {
  src: "/webflow/shared/white-ade.png",
  alt: "",
  larghezza: 164,
  altezza: 163,
} as const;
const LOGO_BEATPORT = {
  src: "/webflow/shared/white-beatport.png",
  alt: "",
  larghezza: 163,
  altezza: 163,
} as const;
const LOGO_APPLE = {
  src: "/webflow/shared/white-apple.png",
  alt: "",
  larghezza: 163,
  altezza: 164,
} as const;
const LOGO_MINISTRY = {
  src: "/webflow/shared/white-ministry.png",
  alt: "",
  larghezza: 163,
  altezza: 164,
} as const;
const LOGO_DEFECTED = {
  src: "/webflow/shared/white-defected.png",
  alt: "Defected Logo",
  larghezza: 163,
  altezza: 163,
} as const;
const LOGO_DRUMCODE = {
  src: "/webflow/shared/white-drumcode.png",
  alt: "Drumcode Logo",
  larghezza: 163,
  altezza: 163,
} as const;
const LOGO_INNERVISION = {
  src: "/webflow/shared/white-innervision.png",
  alt: "Innervision logo",
  larghezza: 163,
  altezza: 163,
} as const;
const LOGO_GROOVER = {
  src: "/webflow/shared/white-groove.png",
  alt: "Groover Logo",
  larghezza: 163,
  altezza: 163,
} as const;

export const OPPORTUNITA = {
  id: "opportunities",
  titoloPrima: "Access Tailored",
  titoloEvidenziato: "Opportunities",
  /* Nel toggle "Producers" è a sinistra e "DJs" a destra: l'attivo alla
     prima apertura è "DJs" (classe `.monthly`, come nel listino). */
  toggle: { producers: "Producers", djs: "DJs" },

  pannelloDj: {
    titolo: "DJs",
    tonoTitolo: "giallo",
    paragrafo:
      "Take part in entry-level DJ contests and curated challenges to sharpen your skills, gain visibility and access advanced opportunities once you're ready.",
    opportunita: [
      {
        titolo: "Play Official Slot",
        sottotitolo: "Summer slots",
        tono: "giallo",
        logo: LOGO_PACHA,
      },
      {
        titolo: "Play Elrow Slot",
        sottotitolo: "Yearly Contest",
        tono: "viola",
        logo: LOGO_ELROW,
      },
      {
        titolo: "Play Official Slot",
        sottotitolo: "Yearly Contest",
        tono: "rosso",
        logo: LOGO_ADE,
      },
      {
        titolo: "DJ Mix",
        sottotitolo: "Every Month",
        tono: "verde",
        logo: LOGO_BEATPORT,
      },
      {
        titolo: "DJ Mix",
        sottotitolo: "Every Month",
        tono: "giallo",
        logo: LOGO_APPLE,
      },
    ],
  } as PannelloOpportunita,

  pannelloProducerDesktop: {
    titolo: "Producers",
    tonoTitolo: "arancio",
    paragrafo:
      "Start with simple production briefs and submit your tracks for early-stage feedback, internal labels, or global leading labels and partners.",
    opportunita: [
      {
        titolo: "Play and Release",
        sottotitolo: "Yearly",
        tono: "giallo",
        logo: LOGO_MINISTRY,
      },
      {
        titolo: "Official Contest",
        sottotitolo: "Yearly",
        tono: "viola",
        logo: LOGO_DEFECTED,
      },
      {
        titolo: "Selections",
        sottotitolo: "Yearly",
        tono: "rosso",
        logo: LOGO_DRUMCODE,
      },
      {
        titolo: "Release Slot",
        sottotitolo: "Yearly",
        tono: "verde",
        logo: LOGO_INNERVISION,
      },
      {
        titolo: "Free Promotion",
        sottotitolo: "Yearly",
        tono: "giallo",
        logo: LOGO_GROOVER,
      },
    ],
  } as PannelloOpportunita,

  pannelloProducerMobile: {
    paragrafo:
      "Start with simple production briefs and submit your tracks for early-stage feedback from label scouts.",
    opportunita: [
      {
        titolo: "Official contests",
        sottotitolo: "Yearly",
        tono: "giallo",
        logo: { ...LOGO_MINISTRY, alt: "" },
      },
      {
        titolo: "Official contests",
        sottotitolo: "Yearly",
        tono: "viola",
        logo: LOGO_DEFECTED,
      },
      {
        titolo: "Official contests",
        sottotitolo: "Yearly",
        tono: "rosso",
        logo: LOGO_DRUMCODE,
      },
      {
        titolo: "Official contests",
        sottotitolo: "Yearly",
        tono: "verde",
        logo: LOGO_INNERVISION,
      },
      {
        titolo: "Free Promotion",
        sottotitolo: "Yearly",
        tono: "giallo",
        logo: LOGO_GROOVER,
      },
    ],
  } as PannelloOpportunita,
} as const;

/* ── Sezione 6: "Student Success Stories" ───────────────────────────── */

export const SUCCESS_STORIES = {
  titoloPrima: "Student",
  titoloEvidenziato: "Success Stories",
  /* Otto immagini, `alt` copiati dall'HTML: due sono vuoti o accorciati
     rispetto alla mappa degli asset, vince l'HTML. */
  immagini: [
    {
      src: "/webflow/shared/victoria-whynot.jpg",
      alt: "Pete Tong DJ Academy student Victoria WHYNOT performing alongside Carl Cox, featured in the Students' Success showcase",
      larghezza: 450,
      altezza: 800,
      priorita: true,
    },
    {
      src: "/webflow/shared/constanza-pucheta.jpg",
      alt: "Pete Tong DJ Academy student Constanza Pucheta performing at Amnesia Ibiza for elrow, featured in the Students' Success showcase",
      larghezza: 450,
      altezza: 800,
      priorita: false,
    },
    {
      src: "/webflow/shared/tavola-da-disegno-15.jpg",
      alt: "",
      larghezza: 450,
      altezza: 800,
      priorita: true,
    },
    {
      src: "/webflow/shared/tavola-da-disegno-8.jpg",
      alt: "Pete Tong DJ Academy student Maya performing live at Green Valley, featured in the Students' Success showcase.",
      larghezza: 450,
      altezza: 800,
      priorita: false,
    },
    {
      src: "/webflow/shared/tavola-da-disegno-12.png",
      alt: "Pete Tong DJ Academy student Cozmic Cat celebrates a release on HE.SHE.THEY. Records, featured in the Students' Success showcase",
      larghezza: 540,
      altezza: 960,
      priorita: false,
    },
    {
      src: "/webflow/shared/tavola-da-disegno-14.png",
      alt: "Pete Tong DJ Academy students 2Nomads performing at Bauman Festival, featured in the Students' Success showcase",
      larghezza: 540,
      altezza: 960,
      priorita: false,
    },
    {
      src: "/webflow/shared/tavola-da-disegno-9.png",
      alt: "Pete Tong DJ Academy student Suni Side Up featured for playing at Ministry of Sound, highlighting student success",
      larghezza: 540,
      altezza: 960,
      priorita: false,
    },
    {
      src: "/webflow/shared/tavola-da-disegno-16.png",
      alt: "Pete Tong DJ Academy student Pharma D performing the opening set for Ibiza Classics alongside Pete Tong, featured in the Students' Success showcase",
      larghezza: 540,
      altezza: 960,
      priorita: false,
    },
  ],
} as const;

/* ── Sezione 7: "The Future Talent Awards®" ─────────────────────────── */

/** Un pezzo di `h2.statement`: testo, se è in mint, e se lo segue un `<br>`. */
export type PezzoStatement = {
  readonly testo: string;
  readonly evidenziato: boolean;
  readonly aCapo?: boolean;
};

export const AWARDS = {
  /* Refuso del sito: la "E" maiuscola in "yEarly". Il CSS lo rende
     comunque tutto maiuscolo. */
  eyebrow: "yEarly awards",
  logo: {
    src: "/webflow/play-get-signed/group.png",
    alt: "",
    larghezza: 276,
    altezza: 207,
    /* `width="250"` nell'HTML. */
    larghezzaResa: 250,
  },
  titoloRiga1: "The Future Talent Awards®",
  titoloRiga2: "You Could Be Next. ",
  /* `h2.statement`: dodici pezzi, quelli evidenziati sono in mint. Si tengono
     separati per non perdere gli spazi di troppo dell'originale. */
  statement: [
    { testo: "The highlight of our ", evidenziato: false },
    { testo: "Talent Pool journey", evidenziato: true },
    { testo: " is an annual celebration where standout DJs who've ", evidenziato: false },
    { testo: "excelled in advanced grades", evidenziato: true },
    { testo: " come together. ", evidenziato: false, aCapo: true },
    { testo: "Many winners have leveraged this event to ", evidenziato: false },
    { testo: "boost their careers", evidenziato: true },
    { testo: ", and we're dedicated to launching every aspiring ", evidenziato: false },
    { testo: "top labels, touring worldwide ", evidenziato: true },
    { testo: "and ", evidenziato: false },
    { testo: "connecting ", evidenziato: true },
    { testo: "with Pete Tong, Carl Cox, Adam Beyer, etc.", evidenziato: false },
  ] as readonly PezzoStatement[],
  /* L'embed `f870a03f`: lo script DynTube più il div con la chiave. */
  dyntube: "lD6ElB9Lp0mDRAgFLJReJA",
} as const;

/* ── Sezione 8 e 9: "Explore the Courses" e lo slider dei 3 corsi ───── */

export const ESPLORA_CORSI = {
  titoloPrima: "Explore the ",
  titoloCorsi: "Courses",
  titoloE: "& ",
  titoloBuild: "Build",
  titoloDopo: " Your Plan",
  paragrafo: "Talent Pool®, community and resources included in every plan",
} as const;

export const CORSI: readonly CorsoInVetrina[] = [
  {
    href: "/dj-course",
    src: "/webflow/shared/djcourse.png",
    alt: "",
    larghezza: 491,
    altezza: 923,
  },
  {
    href: "/producer-course",
    src: "/webflow/shared/producercourse.png",
    alt: "",
    larghezza: 491,
    altezza: 923,
  },
  {
    href: "/mix-mastering-course",
    src: "/webflow/shared/mixcourse.png",
    alt: "",
    larghezza: 491,
    altezza: 923,
  },
];

/* ── Sezione 12: FAQ ────────────────────────────────────────────────── */

export const DOMANDE: readonly DomandaFaq[] = [
  {
    domanda: "What is the Talent Pool and how does it work?",
    risposta:
      "The Talent Pool is our exclusive artist hub where students can submit tracks or DJ sets, join contests, and gain exposure through our label radar and community feedback.",
  },
  {
    domanda: "Who can participate in Talent Pool activities?",
    risposta:
      "All active subscribers — regardless of plan — can access Talent Pool features and participate.",
  },
  {
    domanda: "What types of opportunities can I unlock?",
    risposta:
      "Visibility on our platform, direct feedback, potential label attention, bookings, and contest rewards.",
  },
  {
    domanda: "Will I receive feedback on my submissions?",
    risposta:
      "Yes. Every contest includes structured feedback from Pete Tong DJ Academy mentors or industry professionals.",
  },
  {
    domanda: "Is the Talent Pool included in every plan?",
    risposta: "Yes. Every subscription includes access to Talent Pool activities.",
  },
  {
    domanda: "Do I need to pay extra to submit my work?",
    risposta:
      "No extra cost. Submissions and participation are included in your subscription.",
  },
  {
    domanda: "Can I join the Talent Pool with a 1-course plan?",
    risposta:
      "Yes, but plans with more courses unlock more contest categories and visibility tools.",
  },
];

/* ── JSON-LD ────────────────────────────────────────────────────────
   Copiato tal quale da `docs/webflow/meta/play-get-signed.json`. */

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": "https://www.petetong-djacademy.com/#organization",
      name: "Pete Tong DJ Academy",
      url: "https://www.petetong-djacademy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67ba16cad5588af38e877220_logo-altra%20versionewhite.png",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.petetong-djacademy.com/play-get-signed#webpage",
      url: "https://www.petetong-djacademy.com/play-get-signed",
      name: "Play & Get Signed – Talent Pool for DJs & Producers",
      description:
        "Submit your mixes and tracks. Enter contests & get scouted by partner labels, clubs & festivals. Grow through our structured Talent Pool program.",
      isPartOf: { "@id": "https://www.petetong-djacademy.com/#website" },
      breadcrumb: {
        "@id": "https://www.petetong-djacademy.com/play-get-signed#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.petetong-djacademy.com/play-get-signed#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.petetong-djacademy.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Play & Get Signed",
          item: "https://www.petetong-djacademy.com/play-get-signed",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.petetong-djacademy.com/play-get-signed#talent-pool",
      name: "Talent Pool®",
      serviceType: "Artist development and talent scouting program",
      provider: { "@id": "https://www.petetong-djacademy.com/#organization" },
      audience: { "@type": "Audience", audienceType: "DJs and music producers" },
      description:
        "Pete Tong DJ Academy's structured talent scouting program, included in every subscription. Students climb grades by completing lessons, enter weekly Talent Pool activities, contests and curated challenges tailored to their level, and submit tracks and DJ mixes for structured feedback from mentors and industry professionals. Standout artists earn releases and performance opportunities with partner labels, clubs and festivals including Pacha, elrow, Amsterdam Dance Event, Beatport, Ministry of Sound, Defected, Drumcode and Innervisions, culminating in the annual Future Talent Awards®.",
      offers: [
        {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "57.00",
          highPrice: "288.00",
          offerCount: 6,
          url: "https://www.petetong-djacademy.com/pricing-page",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "57.00",
          highPrice: "288.00",
          offerCount: 6,
          url: "https://www.petetong-djacademy.com/pricing-page",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "AggregateOffer",
          priceCurrency: "GBP",
          lowPrice: "57.00",
          highPrice: "288.00",
          offerCount: 6,
          url: "https://www.petetong-djacademy.com/pricing-page",
          availability: "https://schema.org/InStock",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.petetong-djacademy.com/play-get-signed#faq",
      mainEntity: DOMANDE.map((d) => ({
        "@type": "Question",
        name: d.domanda,
        acceptedAnswer: { "@type": "Answer", text: d.risposta },
      })),
    },
  ],
};
