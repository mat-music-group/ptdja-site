/*
 * Testi e dati che compaiono IDENTICI su più pagine del sito.
 *
 * Ogni stringa qui dentro è copiata da `docs/webflow/outline/` e verificata
 * sull'HTML in `docs/webflow/html/`. Non si riscrive, non si traduce, non si
 * corregge: refusi compresi ("Play & Get SIgned", "1x Talent Pool Accesss",
 * "lables"). Se una parola sembra sbagliata, è sbagliata sul sito.
 */

/* ── Header ─────────────────────────────────────────────────────────── */

export type VoceMenu = {
  readonly testo: string;
  readonly href: string;
};

export const LOGO = {
  src: "/webflow/shared/logo-altra-versionewhite.png",
  alt: "Pete Tong DJ Academy logo in white with a yellow accent",
  larghezza: 1653,
  altezza: 176,
} as const;

/** Animazione Lottie dell'icona del menu (`lottieflow-menu-nav-09`). */
export const LOTTIE_MENU = "/webflow/shared/lottieflow-menu-nav-09-ffffff-easey.json";

export const MENU_CORSI: readonly VoceMenu[] = [
  { testo: "Producer", href: "/producer-course" },
  { testo: "DJ", href: "/dj-course" },
  { testo: "Mix & Mastering", href: "/mix-mastering-course" },
];

export const ETICHETTA_CORSI = "Courses";

/** Le voci a sinistra e a destra del dropdown "Courses", nell'ordine del sito. */
export const MENU_PRIMA: readonly VoceMenu[] = [{ testo: "Home", href: "/" }];

export const MENU_DOPO: readonly VoceMenu[] = [
  { testo: "Play & Get Signed", href: "/play-get-signed" },
  { testo: "Pricing", href: "/pricing-page" },
];

/* ── Footer (variante `704d21f5`, 8 pagine) ─────────────────────────── */

export const FOOTER = {
  logo: {
    src: "/webflow/shared/asset-2-2.png",
    alt: "",
    larghezza: 290,
    altezza: 30,
  },
  titoloAbout: "About Pete Tong DJ Academy",
  about:
    "Connecting thousands of DJs and producers in 140 countries, we’re the go-to platform for aspiring and seasoned artists. Build your skills, collaborate with peers, and hit top-tier gigs.",
  aboutHref: "/",
  colonne: [
    {
      titolo: "Quick Links",
      voci: [
        { testo: "DJ Course", href: "/dj-course" },
        { testo: "Producer Course", href: "/producer-course" },
        { testo: "Mix & Mastering Course", href: "/mix-mastering-course" },
        // Refuso del sito: la "I" maiuscola in "SIgned". Si riproduce.
        { testo: "Play & Get SIgned", href: "/play-get-signed" },
        { testo: "Pricing", href: "/pricing-page" },
      ],
    },
    {
      titolo: "Follow Us",
      voci: [
        { testo: "Instagram", href: "https://www.instagram.com/petetong_djacademy/" },
        { testo: "Tik Tok", href: "https://www.tiktok.com/@petetong_djacademy" },
        { testo: "Youtube", href: "https://www.youtube.com/@petetongdjacademy" },
      ],
    },
  ],
  academy: {
    titolo: "Academy Platform",
    login: { testo: "Login", href: "https://campus.petetong-djacademy.com" },
    supporto: {
      testo: "Technical Support",
      href: "https://campus.petetong-djacademy.com",
    },
    /* I tre badge Iubenda. Sul sito sono link con la classe `iubenda-embed`
       che `iubenda.js` trasforma nel badge nero: stessi href, stesso ordine. */
    iubenda: [
      {
        testo: "Privacy Policy",
        href: "https://www.iubenda.com/privacy-policy/40840624",
        title: "Privacy Policy ",
      },
      {
        testo: "Cookie Policy",
        href: "https://www.iubenda.com/privacy-policy/40840624/cookie-policy",
        title: "Cookie Policy ",
      },
      {
        testo: "Terms and Conditions",
        href: "https://www.iubenda.com/terms-and-conditions/40840624",
        title: "Terms and Conditions ",
      },
    ],
  },
  forme: {
    src: "/webflow/shared/footer.png",
    alt: "",
    larghezza: 1856,
    altezza: 538,
  },
  copyright: "© Pete Tong DJ Academy Limited 2025",
} as const;

/* ── Footer vecchio (varianti `be31567f` e `652f6da5`) ──────────────────
   `recess` e `terms-conditions-sa` usano un footer più vecchio, con cinque
   colonne e il claim "8000+ DJs". Il testo delle due varianti è identico:
   differiscono solo per l'attributo `sizes` dell'immagine delle forme, che
   in Next.js non esiste. Restano due componenti perché l'outline le tratta
   come due varianti distinte e perché domani potrebbero divergere. */

export const FOOTER_VECCHIO = {
  logo: FOOTER.logo,
  titoloAbout: "About Pete Tong DJ Academy",
  about:
    "Connecting 8000+ DJs in 140 countries, we’re the go-to platform for aspiring and seasoned artists. Build your skills, collaborate with peers, and hit top-tier gigs.",
  aboutHref: "/old-home",
  colonne: [
    {
      titolo: "Quick Links",
      voci: [
        { testo: "Full Course", href: "/dj-course-full-path-old" },
        { testo: "Advanced Only", href: "/dj-course-advanced-path-old" },
        { testo: "Digital Campus", href: "/digital-campus-old" },
        { testo: "Talent Pool", href: "/talent-pool-old" },
        { testo: "FAQ", href: "#" },
      ],
    },
    {
      titolo: "Follow Us",
      voci: [
        { testo: "Instagram", href: "https://www.instagram.com/petetong_djacademy/" },
        { testo: "Tik Tok", href: "https://www.tiktok.com/@petetong_djacademy" },
        { testo: "Youtube", href: "https://www.youtube.com/@petetongdjacademy" },
      ],
    },
    {
      titolo: "What's Your Level?",
      voci: [
        {
          testo: "Find your Path",
          href: "https://hmx9w0ptzd4.typeform.com/to/FYsfgc9E",
        },
      ],
    },
    {
      titolo: "Campus",
      voci: [
        { testo: "Login", href: "https://campus.petetong-djacademy.com" },
        {
          testo: "Technical Support",
          href: "https://campus.petetong-djacademy.com",
        },
      ],
    },
  ],
  forme: FOOTER.forme,
  copyright: "© Pete Tong DJ Academy Limited 2025",
} as const;

/* ── Listino ────────────────────────────────────────────────────────────
   Struttura identica nelle tre valute: cambiano solo il simbolo, le cifre e
   il pezzo `<VALUTA>` dell'item price Chargebee. I 18 link finali sono
   `https://cart.petetong-djacademy.com?subscription_items[item_price_id][0]=`
   più `<PIANO>-<VALUTA>-<CICLO>`, e vengono composti in `PricingPlans`.

   ⚠️ Attenzione ai nomi: sul sito `.is_monthly` è il piano ANNUALE e
   `.is_annual` è il TRIMESTRALE. Qui i cicli si chiamano come sono:
   `annuale` e `trimestrale`. */

export type VoceListino = {
  readonly testo: string;
  /** Testo del tooltip nativo, dove sul sito c'era la "i" di Flowbase. */
  readonly tooltip?: string;
  /** Voci figlie (i Talent Pool dei piani Pro ed Elite). */
  readonly sotto?: readonly { readonly testo: string; readonly tooltip: string }[];
  /** `true` per la riga "UP TO GRADE n", che ha l'icona del distintivo. */
  readonly grado?: boolean;
};

export type Piano = {
  readonly id: "One" | "PRO" | "ELITE";
  readonly nome: string;
  readonly badge?: { readonly testo: string; readonly tono: "mint" | "giallo" };
  readonly sottotitolo: string;
  /** Prezzo mensile equivalente del piano annuale (`data-month` nel DOM). */
  readonly mensileAnnuale: number;
  /** Prezzo mensile equivalente del piano trimestrale (`data-year` nel DOM). */
  readonly mensileTrimestrale: number;
  /** Totale annuale, e prezzo pieno barrato accanto. */
  readonly totaleAnnuale: number;
  readonly totalePieno: number;
  /** Totale del trimestre. */
  readonly totaleTrimestrale: number;
  readonly voci: readonly VoceListino[];
  /** "Best For" + la frase, con le parole evidenziate in mint. */
  readonly bestFor: {
    readonly titolo: string;
    readonly prima: string;
    readonly evidenziato: string;
    readonly mezzo?: string;
    readonly evidenziato2?: string;
  };
};

const TOOLTIP_AI =
  "24/7 AI mentor trained on course content and tutor expertise. Get answers, feedback, and personalized guidance along your path.";
const TOOLTIP_TP_DJ =
  "Unlock DJ path - exclusive visibility opportunities through our global partners: Pacha, Elrow, Apple Music, Beatport, and more.";
const TOOLTIP_TP_PRODUCER =
  "Producer Path dedicated visibility opportunities with our internal lables and global partners like Drumcode, Innervisions, Defected, In The Mood and much more.";
const TOOLTIP_TP_360 =
  "Graduate from both DJ and Production paths to unlock our premium gateway, giving top artists exclusive access to high-visibility opportunities.";

export const PIANI: readonly Piano[] = [
  {
    id: "One",
    nome: "One",
    sottotitolo: "Choose DJ or Producer Course",
    mensileAnnuale: 13,
    mensileTrimestrale: 19,
    totaleAnnuale: 156,
    totalePieno: 228,
    totaleTrimestrale: 57,
    voci: [
      { testo: "Full course (DJ or Producer) " },
      { testo: "Ableton® Certified Masterclass" },
      { testo: "AI Mentor ֍ 24/7 - Always Available", tooltip: TOOLTIP_AI },
      { testo: "1x monthly tutoring session" },
      { testo: "One live Q&A/month" },
      { testo: "Official diploma" },
      { testo: "Weekly resource pack" },
      { testo: "Campus & Community access" },
      {
        testo: "1x Talent Pool Accesss",
        tooltip:
          "Join your path’s Talent Pool® to share your work, receive expert feedback, climb the rankings, and unlock real booking opportunities.",
      },
      {
        testo: "UP TO GRADE 3",
        grado: true,
        tooltip:
          "Develop your skills along your chosen path, reach Excellent Grade 3, and start unlocking Talent Pool® opportunities as you progress.",
      },
    ],
    bestFor: {
      titolo: "Best For",
      prima: "Beginners and Advanced aiming to master just ",
      evidenziato: "One Craft",
    },
  },
  {
    id: "PRO",
    nome: "Pro",
    badge: { testo: "Most Popular", tono: "mint" },
    sottotitolo: "DJ + Producer",
    mensileAnnuale: 19,
    mensileTrimestrale: 29,
    totaleAnnuale: 228,
    totalePieno: 348,
    totaleTrimestrale: 87,
    voci: [
      { testo: "Two Full courses" },
      { testo: "Ableton® Masterclass" },
      { testo: "2x AI Mentor ֍ 24/7 - Always Available", tooltip: TOOLTIP_AI },
      { testo: "2x monthly tutoring session" },
      { testo: "2x live Q&A/month" },
      { testo: "2x official diplomas" },
      { testo: "2x weekly resources" },
      { testo: "Campus & Community access" },
      {
        testo: "3x Talent Pool Access",
        sotto: [
          { testo: "DJ Talent pool", tooltip: TOOLTIP_TP_DJ },
          { testo: "Producer Talent Pool", tooltip: TOOLTIP_TP_PRODUCER },
          { testo: "360° Artist Talent Pool", tooltip: TOOLTIP_TP_360 },
        ],
      },
      {
        testo: "UP TO GRADE 4",
        grado: true,
        tooltip:
          "Graduate in both DJ and Music Production paths, reach Professional Grade 4, and unlock advanced opportunities to stand out at a higher level.",
      },
    ],
    bestFor: {
      titolo: "Best For",
      prima: "Beginners and Advanced aiming to excel in both ",
      evidenziato: "DJing",
      mezzo: " and ",
      evidenziato2: "Production",
    },
  },
  {
    id: "ELITE",
    nome: "Elite",
    badge: { testo: "Most Complete", tono: "giallo" },
    sottotitolo: "DJ + Producer + Mix & Mastering",
    mensileAnnuale: 24,
    mensileTrimestrale: 39,
    totaleAnnuale: 288,
    totalePieno: 486,
    totaleTrimestrale: 117,
    voci: [
      { testo: "Three Full Courses" },
      { testo: "Ableton® Masterclass" },
      { testo: "3x AI Mentor ֍ 24/7 - Always Available", tooltip: TOOLTIP_AI },
      { testo: "3x monthly tutoring session" },
      { testo: "3x live Q&A/month" },
      { testo: "3x official diplomas" },
      { testo: "3x weekly resources" },
      {
        testo: "Extra Monthly Mix - Mastering tutoring",
        tooltip:
          "Access exclusive live Mix & Mastering sessions to take your tracks to the next level.",
      },
      {
        testo:
          "Extra Monthly Career Masterclasses for pro-level industry insight",
        tooltip: "Elite plan–only sessions focused on advancing your career.",
      },
      { testo: "Campus & Community access" },
      {
        testo: "4x Talent Pool Access",
        sotto: [
          { testo: "DJ Talent pool", tooltip: TOOLTIP_TP_DJ },
          { testo: "Producer Talent Pool", tooltip: TOOLTIP_TP_PRODUCER },
          { testo: "360° Artist Talent Pool", tooltip: TOOLTIP_TP_360 },
          {
            testo: "Elite Artist Talent Pool",
            tooltip:
              "Access top-tier showcases and industry opportunities reserved for top-performing students.",
          },
        ],
      },
      {
        testo: "UP TO GRADE 6",
        grado: true,
        tooltip:
          "Reaching GRADE 6 in our Talent Pool grants you access to the highest-level opportunities, including advanced labels, both internal and partner, and to the Future Talent Awards, which annually recognize the Academy’s best students and introduce them to the global market.",
      },
    ],
    bestFor: {
      titolo: "Best For",
      prima: "Beginners and Advanced aiming to gain ",
      evidenziato: "full-stack skills",
      mezzo: " and ",
      evidenziato2: "industry access",
    },
  },
];

export type Valuta = {
  readonly codice: "USD" | "EUR" | "GBP";
  readonly simbolo: string;
  /** `mostra` = visibile solo nei paesi elencati; `nascondi` = visibile fuori. */
  readonly modo: "mostra" | "nascondi";
  readonly paesi: readonly string[];
};

/** I 26 paesi dell'area euro elencati dal sito, nell'ordine originale. */
const PAESI_EURO = [
  "AT", "BE", "BG", "HR", "CY", "EE", "FI", "FR", "DE", "EL", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", "AD", "MC", "SM",
  "VA", "XK", "ME",
] as const;

export const VALUTE: readonly Valuta[] = [
  /* USD è il default: si nasconde nei paesi euro e nel Regno Unito. */
  {
    codice: "USD",
    simbolo: "$",
    modo: "nascondi",
    paesi: ["GB", ...PAESI_EURO],
  },
  { codice: "EUR", simbolo: "€", modo: "mostra", paesi: PAESI_EURO },
  { codice: "GBP", simbolo: "£", modo: "mostra", paesi: ["GB", "UK"] },
];

export const LISTINO = {
  titoloPrima: "Plans starting at",
  titoloDopo: " per month",
  cifraTitolo: 13,
  paragrafo:
    "Choose your payment method. The price shown is exactly\nwhat you’ll pay. No surprises at checkout.",
  toggleAnnuale: "Annual (-40%)",
  toggleTrimestrale: "Quarterly",
  perMeseAnnuale: "per month\nbilled yearly",
  perMeseTrimestrale: "per month\nbilled every 3 months",
  ctaPrefisso: "Start Now at ",
  rassicurazione: "cancel anytime, no hidden fees",
  incluso: "What's Included:",
  iconaSpunta: {
    src: "/webflow/shared/arrow.png",
    alt: "",
    larghezza: 42,
    altezza: 42,
  },
  iconaGrado: {
    src: "/webflow/shared/group-112.png",
    alt: "",
    larghezza: 27,
    altezza: 42,
  },
  baseCarrello: "https://cart.petetong-djacademy.com",
} as const;

/* ── Recensioni ("Their Words, Not Ours") ───────────────────────────── */

export const RECENSIONI = {
  titoloEvidenziato: "Their Words",
  titoloResto: ", Not Ours",
  feedspaceId: "5272f5b0-278a-478c-9056-6c8c1cdb786f",
  /* I due widget Trustpilot: il carosello sul desktop, lo slider sul mobile.
     Attributi copiati uno per uno dagli embed `b26753a3` e `66052146`. */
  trustpilotCarosello: {
    templateId: "53aa8912dec7e10d38f59f36",
    altezza: "140px",
    token: "894fbcac-4133-4c62-88d6-804318fc01a9",
  },
  trustpilotSlider: {
    templateId: "54ad5defc6454f065c28af8b",
    altezza: "240px",
    token: "fc8b6f0b-f295-4a65-9c7c-1c530652f0a9",
  },
  businessUnitId: "63690996cb86e3016af6e8e2",
  linkTrustpilot: "https://www.trustpilot.com/review/petetong-djacademy.com",
} as const;

/* ── "Book a free call" ─────────────────────────────────────────────── */

export const BOOK_A_CALL = {
  eyebrow: "BOOK A FREE CALL",
  immagine: {
    src: "/webflow/shared/villanis.png",
    alt: "Pete Tong Academy Students during a video conference",
    larghezza: 805,
    altezza: 805,
  },
  titolo: "Get all the details about our courses — book a free call",
  paragrafo:
    "Book a free 30-minute Zoom call to explore our courses in detail — our experts will guide you and answer your questions live!",
  cta: "Book a free call",
  href: "https://calendly.com/ptdja_freecall/demo_ptdja",
} as const;

/* ── FAQ ────────────────────────────────────────────────────────────── */

export type DomandaFaq = {
  readonly domanda: string;
  readonly risposta: string;
};

export const FAQ_TITOLO = "FAQ";

export const FAQ_ICONA = {
  src: "/webflow/shared/arrow-down.svg",
  alt: "",
  larghezza: 24,
  altezza: 24,
} as const;

/* ── "More Than a Course" ───────────────────────────────────────────── */

export const MORE_THAN_A_COURSE = {
  titoloEvidenziato: "More Than a Course,",
  titoloPrima: "Everything You Need",
  titoloGrassetto: "is Here",
  titoloDopo: ".",
  /* La griglia con le sei voci e la "i": sul sito è `display: none` sopra i
     479px, cioè si vede solo sul mobile stretto. Le didascalie che si leggono
     sul desktop ("Complete Courses Library"…) sono disegnate DENTRO i PNG
     delle slide, non sono testo. */
  voci: [
    {
      icona: "/webflow/shared/icon-01.png",
      testo: "Complete Courses' Library",
      tooltip:
        "A comprehensive library of courses, designed to guide you from beginner to advanced levels and provide a complete education.",
    },
    {
      icona: "/webflow/shared/icon-05.png",
      testo: " Live Sessions & Mentoring",
      tooltip:
        "Interactive live sessions and mentoring with industry experts to receive real-time feedback and refine your practical skills.",
    },
    {
      icona: "/webflow/shared/icon-06.png",
      testo: "Templates & Guides",
      tooltip:
        "Professional templates and detailed guides to optimize workflow, improve productivity, and accelerate the learning process.",
    },
    {
      icona: "/webflow/shared/icon-03.png",
      testo: "Progress Tracking",
      tooltip:
        "Advanced tools to track your progress, monitor goal achievement, and optimize your learning path according to your needs.",
    },
    {
      icona: "/webflow/shared/icon-04.png",
      testo: "Community Chat & Messaging",
      tooltip:
        "A dynamic environment to interact with other students and mentors, exchanging ideas, tips, and feedback for continuous and shared growth.",
    },
    {
      icona: "/webflow/shared/icon-02.png",
      testo: "Talent Scouting",
      tooltip:
        "Participate in exclusive contests for DJs and Producers, submit tracks to partner labels, and send mixes to gain opportunities to perform in top clubs and expand your visibility.",
    },
  ],
  slideDesktop: [
    {
      src: "/webflow/shared/geometrics-twelve-pete-comp-1.png",
      alt: "Pete Tong Academy First Lesson Preview",
      href: "/dj-course",
    },
    {
      src: "/webflow/shared/geometrics-twelve-pete-comp-3.png",
      alt: "Live Mentoring Section of the PTDJ Academy",
    },
    { src: "/webflow/shared/geometrics-twelve-pete-comp-2.png", alt: "" },
    { src: "/webflow/shared/geometrics-twelve-pete-comp-4.png", alt: "" },
    { src: "/webflow/shared/geometrics-twelve-pete-comp-5.png", alt: "" },
  ],
  slideMobile: [
    { src: "/webflow/shared/pete-iphone-5.png", alt: "" },
    { src: "/webflow/shared/pete-iphone-4.png", alt: "" },
    { src: "/webflow/shared/pete-iphone-3.png", alt: "" },
    { src: "/webflow/shared/pete-iphone-2.png", alt: "" },
    { src: "/webflow/shared/pete-iphone-1.png", alt: "" },
  ],
} as const;
