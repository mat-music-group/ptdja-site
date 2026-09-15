/*
 * Testi, immagini e metadati della pagina `/dj-course`.
 *
 * Ogni stringa è copiata da `docs/webflow/html/dj-course.html` (verità ultima)
 * e confrontata con `docs/webflow/outline/dj-course.md`. Non si riscrive, non
 * si traduce, non si corregge: i refusi del sito restano ("music genra",
 * "bring any beginner", "masters advanced mixing", "Our Teacher's DJ Set ups"
 * con la maiuscola ballerina, "lesson-hifhlights" nelle classi). Se una parola
 * sembra sbagliata, è sbagliata sul sito.
 *
 * - `META` e `JSON_LD`: copiati da `docs/webflow/meta/dj-course.json`.
 * - `DOMANDE`: le 7 domande della FAQ di questa pagina, le stesse del
 *   `FAQPage` del JSON-LD.
 * - Listino, recensioni, "More Than a Course", popup e "Book a free call" non
 *   stanno qui: sono identici su più pagine e vivono in `condivisi.ts`.
 *
 * ⚠️ I conteggi delle lezioni sul sito NON coincidono fra loro, ed è voluto
 * riprodurli così: la scheda del corso dice "130+" video sul blocco mobile e
 * "222" sulla colonna desktop; l'accordion dice "222 Lessons" nella versione
 * desktop e "130 Lessons" in quella mobile. Vedi la lista "Divergenze e
 * anomalie" nel report.
 */

import type { CorsoInVetrina } from "@/components/sections/SliderCorsi";
import type { DomandaFaq } from "@/testi/condivisi";

/* ── Metadati ───────────────────────────────────────────────────────── */

export const META = {
  title:
    "Online DJ Course with Pete Tong & World-Class DJs | Start Mixing Today",
  description:
    "Learn to DJ from the best. Join Pete Tong, Jamie Jones, Nicole Moudaber & more in our complete online DJ course. From beginner to pro. Start your journey now.",
  canonical: "https://www.petetong-djacademy.com/dj-course",
  ogImage:
    "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67c72a69971bade6763459e4_IMMAGINE%20ACADEMY.png",
  ogUrl: "https://www.petetong-djacademy.com/dj-course",
  ogSiteName: "Pete Tong DJ Academy",
} as const;

/* ── Sezione 1: hero ────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "LEARNING",
  titolo: "DJ Course",
  /* `p._w-490-4`: un solo paragrafo con uno `<strong>` in mezzo e un `<br>`. */
  paragrafo: {
    prima: "The only complete DJ program — from beginner to advanced — guided by ",
    grassetto: "the most influential mentors",
    dopo: " in the world.",
    secondaRiga:
      "A clear and structured method, designed to accelerate your artistic growth and, through the Talent Pool, get you performing at top clubs and major festivals worldwide.",
  },
  prezzo: { prima: "starting from", dopo: " per month" },
  cta: { testo: "Sign Up Now", href: "/pricing-page" },
  trustpilot: {
    prima: "Trusted by hundreds on ",
    link: "Trustpilot 4.7 ★",
    href: "https://it.trustpilot.com/review/petetong-djacademy.com?languages=all",
  },
  immagine: {
    src: "/webflow/dj-course/dj-eng.webp",
    alt: "DJ Course at the PTDJ Academy, open to all equipments and levels",
    larghezza: 1107,
    altezza: 708,
  },
} as const;

/* ── Sezione 2 e 3: "Course Content" ────────────────────────────────── */

export type VoceMetaCorso = {
  readonly icona: string;
  /* `div.course-detail-text`: l'etichetta ("Level: ", "Duration: "…). */
  readonly etichetta: string;
  /* `div.course-detail-text.strong`: il valore in verde. Manca sulle righe
     che sul sito hanno solo l'etichetta ("Talent DJ Scouting"…). */
  readonly valore?: string;
  /* `true` sulle due righe con `.align-top`, che vanno a capo. */
  readonly allineaInAlto?: boolean;
};

/** La scheda del corso della colonna desktop (`div.sidebar.course`): 222 video. */
export const META_CORSO_DESKTOP: readonly VoceMetaCorso[] = [
  {
    icona: "/webflow/shared/icon-level-02-academy-template.png",
    etichetta: "Level: ",
    valore: "Beginner & Advanced",
  },
  { icona: "/webflow/shared/reloj.png", etichetta: "Duration: ", valore: "30+ h" },
  { icona: "/webflow/shared/video.png", etichetta: "Videos: ", valore: "222" },
  { icona: "/webflow/shared/approved.png", etichetta: "Official Certificate" },
  {
    icona: "/webflow/shared/path-svgrepo-com-2.svg",
    etichetta: "Talent DJ Scouting",
  },
  {
    icona: "/webflow/shared/pctab.png",
    etichetta: "Access from any Computer, Tablet or Mobile",
    allineaInAlto: true,
  },
  {
    icona: "/webflow/shared/comment-01.png",
    etichetta: "Subtitles: English, Spanish, French, Portuguese, Italian",
    allineaInAlto: true,
  },
];

/** La scheda del blocco `.card-2.course-mobile`: 130+ video, "Certification". */
export const META_CORSO_MOBILE: readonly VoceMetaCorso[] = [
  {
    icona: "/webflow/shared/icon-level-02-academy-template.png",
    etichetta: "Level: ",
    valore: "Beginner & Advanced",
  },
  { icona: "/webflow/shared/reloj.png", etichetta: "Duration: ", valore: "30+ h" },
  { icona: "/webflow/shared/video.png", etichetta: "Videos: ", valore: "130+" },
  { icona: "/webflow/shared/approved.png", etichetta: "Official Certification" },
  {
    icona: "/webflow/shared/path-svgrepo-com-2.svg",
    etichetta: "Talent DJ Scouting",
  },
  {
    icona: "/webflow/shared/pctab.png",
    etichetta: "Access from any Computer, Tablet or Mobile",
    allineaInAlto: true,
  },
  {
    icona: "/webflow/shared/comment-01.png",
    etichetta: "Subtitles: English, Spanish, French, Portuguese, Italian",
    allineaInAlto: true,
  },
];

/** Le sette bolle dei docenti sopra le schede, in ordine. */
export const BOLLE_DOCENTI: readonly { readonly src: string; readonly alt: string }[] =
  [
    { src: "/webflow/shared/miniatura-profilo-pete.png", alt: "" },
    { src: "/webflow/dj-course/miniatura-profilo-carl.png", alt: "" },
    { src: "/webflow/dj-course/miniatura-profilo-adam.png", alt: "" },
    { src: "/webflow/dj-course/miniatura-profilo-jamie.png", alt: "" },
    { src: "/webflow/dj-course/miniatura-profilo-nicole.png", alt: "" },
    { src: "/webflow/dj-course/miniatura-profilo-tsha.png", alt: "" },
    { src: "/webflow/shared/miniatura-profilo-ame.png", alt: "" },
  ];

export type CapitoloCorso = {
  /** `span.text-span-44`, in verde: "Chapter 1". */
  readonly numero: string;
  /** Il resto del titolo, due punti compresi. */
  readonly titolo: string;
  readonly lezioni: readonly string[];
};

export const CURRICULUM: readonly CapitoloCorso[] = [
  {
    numero: "Chapter 1",
    titolo: ": Our teacher's DJ history & mindset",
    lezioni: [
      "Pete Tong's detailed DJ history & mindset",
      "Carl Cox's detailed DJ history & mindset",
      "Adam Beyer's detailed DJ history & mindset",
      "Nicole Moudaber's detailed DJ history & mindset",
      "TSHA's detailed DJ history & mindset",
      "Jamie Jones' detailed DJ history & mindset",
    ],
  },
  {
    numero: "Chapter 2",
    titolo: ": The Perfect Setup",
    lezioni: [
      "Basic booth DJ Setup",
      "Decks focus",
      "Mixer focus",
      "Cross fader",
      "Headphones",
    ],
  },
  {
    numero: "Chapter 3",
    titolo: ": Learn to Mix",
    lezioni: [
      "How to mix two tracks: Understanding phase and BPM",
      "Learn to count",
      "Exclusive access to Beatport Streaming and Teachers’ & Defected record bags",
      "Track structure and how to read it",
      "Phase alignment",
      "Learn to beat match",
      "Mix with volume",
      "Mix with EQ (Low, Mid, High)",
    ],
  },
  {
    numero: "Chapter 4",
    titolo: ": Advanced Mix Techniques",
    lezioni: [
      "Basic use of filters",
      "FX use: Delay and reverb",
      "Loops",
      "Hot cues",
      "How to save a mix",
      "Mix in Key",
      "Play more music styles together",
      "Build the DJ set flow",
      "Where to source your tracks",
      "Build your record box",
    ],
  },
  {
    numero: "Chapter 5",
    titolo: ": Building a DJ Set",
    lezioni: [
      "Set structure depending on the slot",
      "Club-Festival mix vs radio mix",
      "Intro handling",
      "Type of tracks and role into a record bag",
      "Read the crowd",
      "Back To Back",
      "Body Language",
    ],
  },
  {
    numero: "Chapter 6",
    titolo: ": Our Teacher's DJ Set ups",
    lezioni: [
      "PETE TONG DJ set up in detail",
      "CARL COX DJ set up in detail",
      "JAMIE JONES DJ set up in detail",
      "NICOLE MOUDABER DJ set up in detail",
      "TSHA DJ set up in detail",
      "ADAM BEYER DJ set up in detail",
    ],
  },
  {
    numero: "Chapter 7",
    titolo: ": Multicam HD DJ Sets from our teachers",
    lezioni: [
      "PETE TONG HD multicam DJ set",
      "CARL COX HD multicam DJ set",
      "JAMIE JONES HD multicam DJ set",
      "NICOLE MOUDABER HD multicam DJ set",
      "TSHA HD multicam DJ set",
      /* Refuso del sito: nel capitolo dei set multicam l'ultima riga ripete
         "DJ set up in detail" invece di "HD multicam DJ set". Si riproduce. */
      "ADAM BEYER DJ set up in detail",
    ],
  },
  {
    numero: "Chapter 8",
    titolo: ": Network, DJ Etiquette and the Industry",
    lezioni: [
      "DJ etiquette tips",
      "How to build a DJ career",
      "Travel, work-life balance, ear fatiguing",
      "The importance of social media",
      "3-5 year planning",
      "Management and booking agency",
      "DJ as a music maker",
    ],
  },
  {
    numero: "Chapter 9",
    titolo: ": Final Exam and the Access to the Talent Pool",
    lezioni: [
      "Pete Tong final remarks",
      "Exam",
      "Access to the Talent Pool",
    ],
  },
];

/** La seconda scheda dei tab, "What you'll learn". */
export const COSA_IMPARERAI: readonly string[] = [
  "Master gear, software, and setup to perform like a pro in any location.",
  "Learn beatmatching, phrasing, and mixing techniques for flawless transitions.",
  "Build a solid foundation for high-level performances across all kinds of sets.",
  "Gain industry insights, career advice, and soft skills to connect with venues and promoters.",
];

export const CONTENUTO = {
  titolo: "Course Content",
  /* Sul sito il video è un web component `<wistia-player>` con i due script di
     `fast.wistia.com`. Nel DOM della pagina il CSS lo nasconde
     (`.code-embed-12` è `display: none`) e quello che si vede sul telefono è
     l'iframe embedly qui sotto. Si riproducono entrambi, come sul sito. */
  wistiaMediaId: "dlp7rnn95p",
  wistiaAspect: "1.7777777777777777",
  /* `div.new-home-2.video-talent-pool.w-video` + iframe embedly: `display:
     none` sopra i 479px, visibile solo sul telefono. */
  videoEmbedly: {
    src: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2Fdlp7rnn95p&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Fpete-tong-dj-academy.wistia.com%2Fmedias%2Fdlp7rnn95p&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2Fa8fd477e6e923233a04379c405daad21e67fa0d8.jpg%3Fimage_crop_resized%3D960x540&type=text%2Fhtml&schema=wistia",
    titolo: "DJ Course Explanation",
    larghezza: 940,
    altezza: 529,
    proporzione: "56.27659574468085%",
  },
  tabCurriculum: "Curriculum",
  tabCosaImparerai: "What you'll learn",
  accordionTitolo: "DJ Lessons",
  /* Il sottotitolo dell'accordion: 222 nella versione desktop, 130 in quella
     mobile. Differenza del sito, non un refuso di copiatura. */
  accordionSottotitoloDesktop: "222 Lessons | 30 hours",
  accordionSottotitoloMobile: "130 Lessons | 30 hours",
  capitoli: CURRICULUM,
  cosaImparerai: COSA_IMPARERAI,
  iconaFreccia: {
    src: "/webflow/shared/arrow-down.svg",
    alt: "",
    larghezza: 24,
    altezza: 24,
  },
  iconaSpunta: {
    src: "/webflow/shared/checkmark-circle-02-1.png",
    alt: "",
    larghezza: 20,
    altezza: 20,
  },
} as const;

/* ── Sezione 4 e 5: docenti ─────────────────────────────────────────── */

/* Tutti i ritratti sono 295×556: la misura è quella del file, non una stima. */
const RITRATTO = { larghezza: 295, altezza: 556 } as const;

export const DOCENTI = {
  titoloRiga1: "DJ Course",
  titoloEvidenziato: "Teachers",
  slide: [
    {
      src: "/webflow/shared/geometrics-two-pete.png",
      alt: "Portrait of DJ Pete Tong wearing a black shirt, set against a bright blue background",
      ...RITRATTO,
    },
    {
      src: "/webflow/shared/geometrics-two-carl-cox.png",
      alt: "Portrait of DJ Carl Cox wearing sunglasses and a black t-shirt, smiling against a pink background",
      ...RITRATTO,
    },
    {
      src: "/webflow/shared/geometrics-two-adam-beyer.png",
      alt: "Portrait of DJ Adam Beyer smiling against a blue background",
      ...RITRATTO,
    },
    { src: "/webflow/shared/geometrics-two-ame.png", alt: "", ...RITRATTO },
    {
      src: "/webflow/shared/geometrics-two-jamies-jones.png",
      alt: "",
      ...RITRATTO,
    },
    {
      src: "/webflow/shared/geometrics-two-nicole-moudaber.png",
      alt: "",
      ...RITRATTO,
    },
    { src: "/webflow/shared/geometrics-two-tsha.png", alt: "", ...RITRATTO },
    {
      src: "/webflow/shared/geometrics-two-the-reloud.png",
      alt: "",
      ...RITRATTO,
    },
  ],
} as const;

/* ── Sezione 6: il virtual tour ─────────────────────────────────────
 *
 * ⚠️ DEVIAZIONE VOLUTA dal sito Webflow, richiesta di Matteo del 2026-09-15.
 * Sul sito la sezione è ripetuta due volte di fila (sezioni 6 e 7): la seconda
 * copia ha l'occhiello "Virtual TOUR" (stesso testo con capitalizzazione
 * diversa: il CSS lo rende maiuscolo, quindi a schermo non si vedeva) e la CTA
 * verso il Typeform `https://form.typeform.com/to/eu83FgdN`. Qui la sezione è
 * montata una volta sola, con la CTA verso il form su `start.`: i due campi
 * della seconda copia sono stati tolti perché non aveva più senso tenerli
 * senza nessun chiamante.
 */

export const VIRTUAL_TOUR = {
  eyebrow: "VIRTUAL TOUR",
  titoloRiga1: "Take Our",
  titoloRiga2: "Virtual Tour",
  iframe: {
    src: "https://fast.wistia.net/embed/iframe/43vokrh7kh?autoPlay=true&muted=true&endVideoBehavior=loop&playbar=false&playButton=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&controlsVisibleOnLoad=false",
    titolo: "Academy virtual tour teaser",
  },
  cta: "Unlock now",
  href: "https://start.petetong-djacademy.com/virtualtour-form",
  sottotesto: "Fill in the form and unlock the virtual tour",
} as const;

/* ── Sezioni 8 e 9: "The Course that Adapts to You" ─────────────────── */

export const ADATTA = {
  titoloPrima: "The Course that",
  /* Lo spazio dopo "Adapts" sta DENTRO lo span nella versione slider
     (`<span>Adapts </span>to You`) e FUORI in quella accordion
     (`<span>Adapts</span> to You`). A schermo è lo stesso: qui sta sempre
     dentro, così non si perde. */
  titoloEvidenziato: "Adapts ",
  titoloDopo: "to You",
  titoloDopoAccordion: "to You",
  toggleAvanzato: "Advanced",
  togglePrincipiante: "Beginner",
  /* ── Versione slider (`dj-v2`), quella che si vede ──────────────────
     Le due schede affiancate sul desktop hanno un testo, le due "pagine" del
     toggle sotto i 480px ne hanno un altro: il pannello "Advanced" del toggle
     parla di mixing, quello della scheda affiancata parla di community. Sono
     due testi diversi sul sito, non un errore di copiatura. */
  slider: {
    principiante: {
      titolo: "For Beginner",
      testo:
        "Our multi-level approach, that works for any style, music genre and gear, brings any beginner to pro, providing all the skills needed to succeed.",
      gradiente: "/webflow/shared/gradient-eng-1.png",
      skill: "/webflow/shared/skills-eng-dj-adv.png",
    },
    avanzato: {
      titolo: "For Advanced",
      testo:
        "Got a production hurdle or DJ technique question? Post it here and let thousands of peers share their insights, tips, and encouragement.",
      gradiente: "/webflow/shared/gradient-eng-2.png",
      skill: "/webflow/shared/skills-eng-dj-adv.png",
    },
    togglePrincipiante: {
      testo:
        "Our multi-level approach, that works for any style, music genre and gear, brings any beginner to pro, providing all the skills needed to succeed.",
      gradiente: "/webflow/shared/gradient-eng-1.png",
      skill: "/webflow/shared/skills-eng-dj-adv.png",
    },
    toggleAvanzato: {
      testo:
        "If you are already advanced, master advanced mixing and build pro-level sets - while refining your fundamentals with world-class DJs.",
      gradiente: "/webflow/shared/gradient-eng-2.png",
      skill: "/webflow/shared/skills-eng-dj-adv.png",
    },
  },
  /* ── Versione accordion (`container-31`), mai visibile ──────────────
     `.container-31` è `display: none` a ogni breakpoint: questo blocco esiste
     nel DOM del sito e non si vede mai. Si riproduce perché il riferimento è
     l'HTML. Contiene i refusi "music genra", "bring any beginner" e
     "masters advanced mixing". */
  accordion: {
    principiante: {
      titolo: "For Beginner",
      testo:
        "Our multi-level approach, that works for any style, music genra and gear, bring any beginner to pro, providing all the skills needed to succeed.",
      gradiente: "/webflow/shared/gradient-eng-1.png",
      skill: "/webflow/dj-course/skills-eng-dj-beg.png",
    },
    avanzato: {
      titolo: "For Advanced",
      testo:
        "If you are already advanced, masters advanced mixing and build pro-level sets - and refine your fundamentals from  world-class DJs.",
      gradiente: "/webflow/shared/gradient-eng-2.png",
      skill: "/webflow/shared/skills-eng-dj-adv.png",
    },
  },
} as const;

/* ── Sezione 11: "Lessons Highlights" ───────────────────────────────── */

export type BloccoHighlight = {
  readonly titolo: string;
  readonly voci: readonly string[];
  /* `.content-image-group.feature.gifs` con o senza `.original`: cambia la
     disposizione delle tre immagini (una grande a sinistra e due a destra,
     oppure due a sinistra e una a destra). */
  readonly disposizione: "sinistra" | "destra";
  readonly immagini: readonly {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  }[];
};

export const HIGHLIGHTS = {
  titoloPrima: "Lessons ",
  titoloEvidenziato: "Highlights",
  blocchi: [
    {
      titolo: "Gear & Setup",
      disposizione: "sinistra",
      /* Solo il primo blocco porta `.new-home-2.dj-course` sulla card e
         `.lesson-hifhlights` (refuso del sito) sul titolo: sotto i 480px
         stringe il `gap` della card e quello sopra il titolo. */
      spaziatura: "compatta",
      immagini: [
        {
          src: "/webflow/dj-course/ezgif-com-resize.gif",
          alt: "Close-up of a DJ adjusting faders and knobs on a Pioneer DJ mixer. The DJ wears a performance glove while mixing live",
          larghezza: 300,
          altezza: 435,
        },
        {
          src: "/webflow/dj-course/for-beginners.webp",
          alt: "Close-up of a DJ mixing on a Pioneer DJ setup with a professional mixer and CDJ. The screen displays waveforms and track details during live performance",
          larghezza: 573,
          altezza: 324,
        },
        {
          src: "/webflow/dj-course/1blocco-1.webp",
          alt: "DJ performing on a hybrid setup with turntables, CDJs, and a professional mixer. Second view features Carl Cox using effects like 'Shorten FX Time' and 'Combo Fill' on a multi-deck Pioneer DJ system",
          larghezza: 453,
          altezza: 538,
        },
      ],
      voci: [
        "Master essential gear & software",
        "Set up your DJ station like a pro",
        "Optimize workflow for any venue",
        "Ensure smooth, flawless performances",
        "Be ready for any live setup scenario",
      ],
    },
    {
      titolo: "Technical DJ Skills & Fundamentals",
      disposizione: "sinistra",
      immagini: [
        {
          src: "/webflow/dj-course/hard-skills.webp",
          alt: "DJ performing on a professional mixer in a club setting with atmospheric lighting and fog effects",
          larghezza: 600,
          altezza: 815,
        },
        {
          src: "/webflow/dj-course/ezgif-com-resize-2-1.gif",
          alt: "DJ mixing on a professional Pioneer DJ setup with multiple CDJs and a central mixer, adjusting faders and effects in real-time",
          larghezza: 400,
          altezza: 235,
        },
        {
          src: "/webflow/dj-course/hard-skills-2.webp",
          alt: "Nicole Moudaber performing on a professional DJ mixer in a studio setting, wearing sunglasses and a performance glove",
          larghezza: 600,
          altezza: 629,
        },
      ],
      voci: [
        "Master beatmatching for seamless transitions",
        "Learn cross-genre mixing techniques",
        "Build essential DJ skills for any set",
        "Develop tight phrasing & timing control",
        "Solid foundation for pro-level performances",
      ],
    },
    {
      titolo: "Soft Skills, Industry Career & Advanced Set-up Lessons",
      disposizione: "destra",
      immagini: [
        {
          src: "/webflow/dj-course/risorsa-5-3.webp",
          alt: "Smiling woman in a white t-shirt sitting in a chair during an interview, with a colorful music event poster wall in the background",
          larghezza: 390,
          altezza: 498,
        },
        {
          src: "/webflow/dj-course/risorsa-8-2.webp",
          alt: "Nicole Moudaber performing in a professional studio with a mixer, controllers, and a laptop running DJ software. Multi-angle view shows equipment close-ups and waveform display on screen",
          larghezza: 564,
          altezza: 305,
        },
        {
          src: "/webflow/dj-course/ezgif-com-resize-4-1.gif",
          alt: "Pete Tong interviewing a music industry professional in front of a vibrant collage wall with music event posters. The text 'Managers and Promoters' appears on the screen",
          larghezza: 700,
          altezza: 366,
        },
      ],
      voci: [
        "Build key soft skills to connect with promoters & venues",
        "Get actionable career advice & industry insights",
        "Develop strong networking strategies",
        "Master advanced performance setups for unique shows",
        "Elevate your DJ career with real-world opportunities",
      ],
    },
  ] as readonly BloccoHighlight[],
  iconaSpunta: {
    src: "/webflow/shared/checkmark-circle-02-1.png",
    alt: "",
    larghezza: 20,
    altezza: 20,
  },
} as const;

/* ── Sezione 12: "DJ Talent Pool® Opportunities" ────────────────────── */

export type OpportunitaCorso = {
  readonly titolo: string;
  readonly sottotitolo: string;
  readonly tono: "giallo" | "viola" | "rosso" | "verde";
  readonly logo: { readonly src: string; readonly alt: string };
};

export const TALENT_POOL = {
  eyebrow: "TALENT SCOUTING",
  titoloRiga1: "DJ Talent Pool®",
  titoloRiga2: "Opportunities",
  paragrafo:
    "Take part in entry-level DJ contests and curated challenges to sharpen your skills and gain visibility.",
  opportunita: [
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "giallo",
      logo: { src: "/webflow/shared/white-pacha.png", alt: "" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "viola",
      logo: { src: "/webflow/shared/white-elrow.png", alt: "" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "rosso",
      logo: { src: "/webflow/shared/white-ade.png", alt: "" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "verde",
      logo: { src: "/webflow/shared/white-beatport.png", alt: "" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "giallo",
      logo: { src: "/webflow/shared/white-apple.png", alt: "" },
    },
  ] as readonly OpportunitaCorso[],
} as const;

/* ── Sezioni 15 e 16: "Related Courses" ─────────────────────────────── */

/* `<h2><span class="text-span-96">Related</span> Courses</h2>`: la prima
   parola è in grassetto (peso 600), la seconda no. Lo spazio sta fuori dallo
   span, come nell'HTML. */
export const CORSI_CORRELATI_TITOLO = {
  evidenziato: "Related",
  resto: " Courses",
} as const;

export const CORSI_CORRELATI: readonly CorsoInVetrina[] = [
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

/* ── Sezione 18: FAQ ────────────────────────────────────────────────── */

export const DOMANDE: readonly DomandaFaq[] = [
  {
    domanda: "Is this course beginner-friendly?",
    risposta:
      "Yes. It's perfect for newcomers and also includes advanced modules for experienced DJs.",
  },
  {
    domanda: "What skills will I learn in the DJ course?",
    risposta:
      "You’ll master mixing, transitions, effects, crowd control, set prep, and performance techniques.",
  },
  {
    domanda: "Do I need equipment to get started?",
    risposta:
      "No. You can begin with just a laptop and free software provided in the course.",
  },
  {
    domanda: "Are live mentor sessions included?",
    risposta: "Yes. Monthly live sessions are part of every plan.",
  },
  {
    domanda: "Is the DJ course available in every plan?",
    risposta:
      "Yes, but only if DJing is one of the courses selected in your plan.",
  },
  {
    domanda: "What’s the difference between 1, 2, and 3 course plans?",
    risposta:
      "Each additional course unlocks more lessons, features, and bonus content — up to full access.",
  },
  {
    domanda: "Can I upgrade later to access more courses?",
    risposta: "Absolutely. You can upgrade at any time from your dashboard.",
  },
];

/* ── JSON-LD ────────────────────────────────────────────────────────────
   Copiato da `docs/webflow/meta/dj-course.json`, campo `jsonld`, senza
   toccare nulla: è già pubblicato e indicizzato così. */

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
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#pete-tong",
      name: "Pete Tong",
      jobTitle: "DJ, broadcaster and founder",
      sameAs: ["https://en.wikipedia.org/wiki/Pete_Tong"],
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#carl-cox",
      name: "Carl Cox",
      sameAs: ["https://en.wikipedia.org/wiki/Carl_Cox"],
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#adam-beyer",
      name: "Adam Beyer",
      sameAs: ["https://en.wikipedia.org/wiki/Adam_Beyer"],
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#jamie-jones",
      name: "Jamie Jones",
      sameAs: ["https://en.wikipedia.org/wiki/Jamie_Jones_(DJ)"],
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#nicole-moudaber",
      name: "Nicole Moudaber",
      sameAs: ["https://en.wikipedia.org/wiki/Nicole_Moudaber"],
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#tsha",
      name: "TSHA",
      sameAs: ["https://en.wikipedia.org/wiki/TSHA_(musician)"],
    },
    {
      "@type": "MusicGroup",
      "@id": "https://www.petetong-djacademy.com/#ame",
      name: "Âme",
      sameAs: ["https://en.wikipedia.org/wiki/%C3%82me"],
    },
    {
      "@type": "MusicGroup",
      "@id": "https://www.petetong-djacademy.com/#the-reloud",
      name: "The Reloud",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.petetong-djacademy.com/dj-course#webpage",
      url: "https://www.petetong-djacademy.com/dj-course",
      name: "Online DJ Course with Pete Tong & World-Class DJs | Start Mixing Today",
      description:
        "Learn to DJ from the best. Join Pete Tong, Jamie Jones, Nicole Moudaber & more in our complete online DJ course. From beginner to pro. Start your journey now.",
      isPartOf: { "@id": "https://www.petetong-djacademy.com/#website" },
      breadcrumb: {
        "@id": "https://www.petetong-djacademy.com/dj-course#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.petetong-djacademy.com/dj-course#breadcrumb",
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
          name: "DJ Course",
          item: "https://www.petetong-djacademy.com/dj-course",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.petetong-djacademy.com/dj-course#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this course beginner-friendly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It's perfect for newcomers and also includes advanced modules for experienced DJs.",
          },
        },
        {
          "@type": "Question",
          name: "What skills will I learn in the DJ course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You’ll master mixing, transitions, effects, crowd control, set prep, and performance techniques.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need equipment to get started?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. You can begin with just a laptop and free software provided in the course.",
          },
        },
        {
          "@type": "Question",
          name: "Are live mentor sessions included?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Monthly live sessions are part of every plan.",
          },
        },
        {
          "@type": "Question",
          name: "Is the DJ course available in every plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, but only if DJing is one of the courses selected in your plan.",
          },
        },
        {
          "@type": "Question",
          name: "What’s the difference between 1, 2, and 3 course plans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each additional course unlocks more lessons, features, and bonus content — up to full access.",
          },
        },
        {
          "@type": "Question",
          name: "Can I upgrade later to access more courses?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. You can upgrade at any time from your dashboard.",
          },
        },
      ],
    },
    {
      "@type": "Course",
      "@id": "https://www.petetong-djacademy.com/dj-course#course",
      name: "DJ Course",
      description:
        "Online DJ course taught by Pete Tong, Carl Cox, Adam Beyer, Jamie Jones, Nicole Moudaber, TSHA, Âme and The Reloud. A multi-level path for beginners and advanced DJs covering setup, beatmatching, mixing with EQ and effects, building DJ sets, reading the crowd, and DJ career and industry skills. Includes subtitles in English, Spanish, French, Portuguese and Italian.",
      url: "https://www.petetong-djacademy.com/dj-course",
      provider: { "@id": "https://www.petetong-djacademy.com/#organization" },
      inLanguage: "en",
      educationalLevel: "Beginner & Advanced",
      educationalCredentialAwarded: "Official certificate",
      instructor: [
        { "@id": "https://www.petetong-djacademy.com/#pete-tong" },
        { "@id": "https://www.petetong-djacademy.com/#carl-cox" },
        { "@id": "https://www.petetong-djacademy.com/#adam-beyer" },
        { "@id": "https://www.petetong-djacademy.com/#jamie-jones" },
        { "@id": "https://www.petetong-djacademy.com/#nicole-moudaber" },
        { "@id": "https://www.petetong-djacademy.com/#tsha" },
        { "@id": "https://www.petetong-djacademy.com/#ame" },
        { "@id": "https://www.petetong-djacademy.com/#the-reloud" },
      ],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        location: {
          "@type": "VirtualLocation",
          url: "https://www.petetong-djacademy.com",
        },
      },
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
  ],
} as const;
