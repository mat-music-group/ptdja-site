/*
 * Testi, immagini e metadati della pagina `/mix-mastering-course`.
 *
 * Ogni stringa è copiata da `docs/webflow/html/mix-mastering-course.html`
 * (verità ultima) e confrontata con `docs/webflow/outline/mix-mastering-course.md`.
 * Non si riscrive, non si traduce, non si corregge: i refusi del sito restano
 * ("iRefine", "masters advanced mixing"). Se una parola sembra sbagliata, è
 * sbagliata sul sito.
 *
 * - `META` e `JSON_LD`: copiati da `docs/webflow/meta/mix-mastering-course.json`.
 * - `DOMANDE`: le 7 domande della FAQ di questa pagina, le stesse del `FAQPage`.
 * - Listino, recensioni, popup e "Book a free call" non stanno qui: sono
 *   identici su più pagine e vivono in `condivisi.ts`.
 *
 * ⚠️ I conteggi del corso NON coincidono fra loro, ed è voluto riprodurli così:
 *   scheda mobile (`.card-2.course-mobile`)  → "Videos: 24",  "Official Certification"
 *   colonna desktop (`.sidebar.course`)      → "Videos: 41",  "Official Certificate"
 *   accordion della variante desktop         → "41 Lessons | 5+ Hours"
 *   accordion della variante mobile          → "24 Lessons | 5+ hours"
 * e i capitoli elencati sono gli stessi (6) in tutte e due. Vedi la lista
 * "Divergenze e anomalie" nel report.
 */

import type { CorsoInVetrina } from "@/components/sections/SliderCorsi";
import type { DomandaFaq } from "@/testi/condivisi";

/* ── Metadati ───────────────────────────────────────────────────────── */

export const META = {
  title: "Mix & Mastering Course | Pete Tong DJ Academy",
  description:
    "Take your sound to Grammy level. Learn advanced mixing and mastering techniques for electronic music with Luca Pretolesi in this pro-level online course.",
  canonical: "https://www.petetong-djacademy.com/mix-mastering-course",
  ogImage:
    "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67c72a69971bade6763459e4_IMMAGINE%20ACADEMY.png",
  ogUrl: "https://www.petetong-djacademy.com/mix-mastering-course",
  ogSiteName: "Pete Tong DJ Academy",
} as const;

/* ── Sezione 1: hero ────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "LEARNING",
  titolo: "Mix & Mastering Course",
  /*
   * `p._w-490-4`. ⚠️ A differenza di `/dj-course`, qui lo `<strong>` sta sulla
   * SECONDA riga, non sulla prima:
   *   "The only complete … excellence." <br>
   *   "A clear and structured method … take it to " <strong>Grammy-level quality</strong> "."
   * Da qui `grassettoSu: "seconda"`, che sposta `grassetto` + `dopo` dalla
   * prima riga alla seconda.
   */
  paragrafo: {
    prima:
      "The only complete Mix & Mastering program for those striving for excellence.",
    secondaRiga:
      "A clear and structured method to perfect every detail of your sound and take it to ",
    grassetto: "Grammy-level quality",
    dopo: ".",
    grassettoSu: "seconda",
  },
  prezzo: { prima: "starting from", dopo: " per month" },
  cta: { testo: "Sign Up Now", href: "/pricing-page" },
  trustpilot: {
    prima: "Trusted by hundreds on ",
    link: "Trustpilot 4.7 ★",
    href: "https://it.trustpilot.com/review/petetong-djacademy.com?languages=all",
  },
  /* `img.hero-image-2.mix-e-master`: `alt=""` nell'HTML, si copia vuoto. */
  immagine: {
    src: "/webflow/mix-mastering-course/mix-eng.webp",
    alt: "",
    larghezza: 1107,
    altezza: 708,
  },
} as const;

/* ── Sezioni 2 e 3: "Course Content" ────────────────────────────────── */

export type VoceMetaCorso = {
  readonly icona: string;
  /* `div.course-detail-text`: l'etichetta ("Level: ", "Duration: "…). */
  readonly etichetta: string;
  /* `div.course-detail-text.strong`: il valore in verde. Manca sulle righe
     che sul sito hanno solo l'etichetta ("Talent Scouting"…). */
  readonly valore?: string;
  /* `true` sulle due righe con `.align-top`, che vanno a capo. */
  readonly allineaInAlto?: boolean;
};

/** La colonna desktop (`div.sidebar.course`): 41 video, "Official Certificate". */
export const META_CORSO_DESKTOP: readonly VoceMetaCorso[] = [
  {
    icona: "/webflow/shared/icon-level-02-academy-template.png",
    etichetta: "Level: ",
    valore: "Advanced",
  },
  { icona: "/webflow/shared/reloj.png", etichetta: "Duration: ", valore: "5+ h" },
  { icona: "/webflow/shared/video.png", etichetta: "Videos: ", valore: "41" },
  { icona: "/webflow/shared/approved.png", etichetta: "Official Certificate" },
  {
    icona: "/webflow/shared/path-svgrepo-com-2.svg",
    etichetta: "Talent Scouting",
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

/** La scheda `.card-2.course-mobile`: 24 video, "Official Certification". */
export const META_CORSO_MOBILE: readonly VoceMetaCorso[] = [
  {
    icona: "/webflow/shared/icon-level-02-academy-template.png",
    etichetta: "Level: ",
    valore: "Advanced",
  },
  { icona: "/webflow/shared/reloj.png", etichetta: "Duration: ", valore: "5+ h" },
  { icona: "/webflow/shared/video.png", etichetta: "Videos: ", valore: "24" },
  { icona: "/webflow/shared/approved.png", etichetta: "Official Certification" },
  {
    icona: "/webflow/shared/path-svgrepo-com-2.svg",
    etichetta: "Talent Scouting",
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
    titolo: ": Session Setup & Workflow Preparation",
    lezioni: [
      "Welcome to the Course: What You’ll Learn",
      "Organizing Your Session for Speed and Clarity",
      "Analyzing the Track Before Mixing",
    ],
  },
  {
    numero: "Chapter 2",
    titolo: ": Starting the Mix Process",
    lezioni: [
      "Getting It Right from the Start: Gain Staging & Balance",
      "Shaping the Mix on the Stereo Bus (pt1)",
      "Shaping the Mix on the Stereo Bus (pt2)",
    ],
  },
  {
    numero: "Chapter 3",
    titolo: ": Mixing the Beat: From Kick to Drum Buss",
    lezioni: [
      "Shaping the Kick",
      "Mixing Low-Frequency Percussion",
      "High Percussion Processing",
      "Glue and Punch: Crafting the Drum Buss",
    ],
  },
  {
    numero: "Chapter 4",
    titolo: ": Shaping the Core Sound: Bass, Synths and FX",
    lezioni: [
      "Crafting a Solid Low End: Mixing the Bass",
      "Mixing Low Synths",
      "High-Frequency Synth Processing",
      "FX Processing and Integration",
    ],
  },
  {
    numero: "Chapter 5",
    titolo: ": The Vocal Mix Process: Making the Voice Shine",
    lezioni: [
      "Set the Stage: Preparing Your Vocal",
      "Shape & Shine: Vocal Treatment and Mixing",
      "Final Touches on Vocals",
      "Glueing Vocals and Synths in the Mix",
    ],
  },
  {
    numero: "Chapter 6",
    titolo: ": Mastering Stage: From Mix to Release",
    lezioni: [
      "Final Tuning before the mastering",
      "Mastering Mindset",
      "Surgical Mastering: Phase, EQ and Mid/Side Balancing",
      "Loud, But Clean: Mastering Level Dynamics",
      "Final Metering & Limiting for Streaming and Downloads",
      "Mastering Cleanup: Sample Peaks, True Peaks Declipping & Final export",
    ],
  },
];

/*
 * La seconda scheda dei tab, "What you'll learn".
 *
 * ⚠️ Le prime due righe NON sono le stesse nelle due sezioni: la versione
 * desktop dice "your projects" / "Balancing frequencies … your track mix", la
 * versione mobile "your session" / "Gaining proper balance … your mix". Le
 * ultime tre coincidono. È così sul sito pubblicato.
 */
export const COSA_IMPARERAI_DESKTOP: readonly string[] = [
  "Setting up your projects for efficient and focused workflow",
  "Balancing frequencies and shaping your track mix from the start",
  "Crafting powerful beats with punchy kicks, bass, and percussion",
  "Shaping the core sound with bass, synths, and FX for a cohesive track",
  "Mastering your mix for professional loudness, clarity, and streaming quality",
];

export const COSA_IMPARERAI_MOBILE: readonly string[] = [
  "Setting up your session for efficient and clear workflow",
  "Gaining proper balance and shaping your mix from the start",
  "Crafting powerful beats with punchy kicks, bass, and percussion",
  "Shaping the core sound with bass, synths, and FX for a cohesive track",
  "Mastering your mix for professional loudness, clarity, and streaming quality",
];

export const CONTENUTO = {
  titolo: "Course Content",
  /* Come su `/dj-course`: il web component `<wistia-player>` sta nel DOM ma il
     CSS lo nasconde dentro `.code-embed-12`, e quello che si vede sul telefono
     è l'iframe embedly qui sotto. Si riproducono entrambi. */
  wistiaMediaId: "crtx0ncx61",
  wistiaAspect: "1.7777777777777777",
  videoEmbedly: {
    src: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2Fcrtx0ncx61&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Fpete-tong-dj-academy.wistia.com%2Fmedias%2Fcrtx0ncx61&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2F2f39c05ce7a34bcb1c142971011ee39f.jpg%3Fimage_crop_resized%3D960x540&type=text%2Fhtml&schema=wistia",
    titolo: "Mix & Mastering Intro",
    larghezza: 940,
    altezza: 529,
    proporzione: "56.27659574468085%",
  },
  tabCurriculum: "Curriculum",
  tabCosaImparerai: "What you'll learn",
  /* ⚠️ Anche il titolo dell'accordion cambia fra le due sezioni: quello
     desktop ha "Advanced" davanti e UN solo `<br>` (`strong.bold-text-5.program`,
     interlinea 24px); quello mobile è il titolo corto con i soliti tre `<br>`. */
  accordionTitoloDesktop: "Advanced Mix & Mastering Lessons",
  accordionTitoloMobile: "Mix & Mastering Lessons",
  accordionSottotitoloDesktop: "41 Lessons | 5+ Hours",
  accordionSottotitoloMobile: "24 Lessons | 5+ hours",
  capitoli: CURRICULUM,
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
  /* `p.section-subtitle.negative.new-home-2` della sezione mobile-only: sul
     sito è un testo FISSO in dollari, senza le tre valute geo-gated della
     hero e senza il "starting from" del resto del sito. Si copia com'è. */
  prezzoMobileFisso: "Starting at $13 per month",
} as const;

/* ── Sezione 4: il titolo del docente ───────────────────────────────── */

/*
 * `h2.section-title-heading.p4`:
 *   <span>Your</span><span class="text-span-105"> Teacher.<br></span>A pioneer. A legend.
 * Il grassetto (peso 600) sta sulla PRIMA riga, su " Teacher.", con lo spazio
 * iniziale dentro lo span; la seconda riga è leggera.
 */
export const DOCENTE = {
  titoloPrima: "Your",
  titoloEvidenziato: " Teacher.",
  titoloDopo: "A pioneer. A legend.",
} as const;

/* ── Sezione 5: la bio di Luca Pretolesi ────────────────────────────── */

export const BIO = {
  immagine: {
    src: "/webflow/mix-mastering-course/tczj8gr4.webp",
    alt: "",
    larghezza: 4032,
    altezza: 3024,
  },
  titoloRiga1: "Luca Pretolesi.",
  titoloRiga2: "2x Grammy® winner.",
  /* `p.content-p-2`: i tre pezzi in verde sono `span.text-span-152/153/154`,
     "Artist Collaborations:" è `span.text-span-147` (stesso verde) e l'elenco
     finale è in `<em>`. */
  nomeEvidenziato: "Luca Pretolesi",
  dopoNome: " is a mixing and mastering engineer with ",
  esperienzaEvidenziata: "over 25 years of experience",
  dopoEsperienza:
    " and 40,000 hours in the studio. The founder of Studio DMI in Las Vegas, he has collaborated with internationally renowned global artists, earning him ",
  grammyEvidenziato: "two Grammy Awards.",
  titoloCollaborazioni: "Artist Collaborations:",
  collaborazioni:
    "Diplo, Skrillex, Drake, Steve Aoki, David Guetta, Major Lazer, Jack Ü, Lil Jon, Snoop Lion, Beyoncé, J Balvin, Calvin Harris, Imagine Dragons, Carnage, ZHU, Above & Beyond, G-Dragon, Jolin Tsai, and many more.",
} as const;

/* ── Sezione 6: "A revolutionary approach to mixing" ────────────────── */

/*
 * ⚠️ Questa sezione è `display: none` sopra i 479px: la regola
 * `.pricing-card-wrapper.funnel-landing { display: none }` non viene mai
 * battuta da nessuna regola più specifica, e torna `display: block` solo
 * nella media query a ≤479. Sta nel DOM del sito e sul desktop non si vede:
 * si riproduce con la stessa visibilità.
 *
 * ⚠️ Due refusi del sito, riprodotti: "iRefine" (per "Refine") e "masters
 * advanced mixing" (per "master").
 */
export const REVERSE_FUNNEL = {
  titoloEvidenziato1: "A revolutionary",
  titoloDopo1: " approach to mixing.",
  titoloRiga2: "One that changed the game. ",
  titoloEvidenziato2: "Now it's yours",
  titoloDopo2: ".",
  paragrafoPrima: "Immerse yourself in the ",
  paragrafoEvidenziato: "Reverse Funnel 2.0®",
  paragrafoDopo:
    ", a new mix approach created by Luca Pretolesi that earned him two Grammy® awards.",
  /* Lo spazio iniziale c'è nell'HTML (` iRefine your skills…`): si copia. */
  paragrafoCarta:
    " iRefine your skills, masters advanced mixing and build pro-level sets - guided by world-class DJs with exclusive industry insights.",
} as const;

/* ── Sezione 8: lo slider `ipad-slide` ──────────────────────────────── */

export type SlideIpad = {
  readonly immagine: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
  readonly titolo: string;
  readonly testo: string;
};

export const SLIDER_IPAD: readonly SlideIpad[] = [
  {
    immagine: {
      src: "/webflow/mix-mastering-course/pretolesi-1920-x-1080-px-1600-x-1080-px-2.png",
      alt: "",
      larghezza: 800,
      altezza: 540,
    },
    titolo: "Shape The Stereo Bus",
    testo:
      "Forget the classic order: start from the Stereo Bus and shape the energy and color of your mix to build a solid foundation.",
  },
  {
    immagine: {
      src: "/webflow/mix-mastering-course/3.png",
      alt: "",
      larghezza: 1000,
      altezza: 675,
    },
    titolo: "Sculpt Your Core Sounds",
    testo:
      "With the bus in place, go deep into the mix: punchy drums, powerful basslines, and rich synth textures that define your sonic identity.",
  },
  {
    immagine: {
      src: "/webflow/mix-mastering-course/pretolesi-1920-x-1080-px-1600-x-1080-px.png",
      alt: "",
      larghezza: 800,
      altezza: 540,
    },
    titolo: "Finalize Vocals & Mastering",
    testo:
      "Make the vocals shine, take the track to a professional level, and deliver a clean, powerful, release-ready result.",
  },
];

/* ── Sezioni 9 e 10: il virtual tour, due volte ─────────────────────── */

export const VIRTUAL_TOUR = {
  /* L'occhiello cambia capitalizzazione fra le due copie: "VIRTUAL TOUR" e
     "Virtual TOUR". Sopra i 480px il CSS lo rende maiuscolo e la differenza
     non si vede; sotto, dove `text-transform` torna `none`, si legge. */
  eyebrowPrima: "VIRTUAL TOUR",
  eyebrowSeconda: "Virtual TOUR",
  titoloRiga1: "Take Our",
  titoloRiga2: "Virtual Tour",
  iframe: {
    src: "https://fast.wistia.net/embed/iframe/43vokrh7kh?autoPlay=true&muted=true&endVideoBehavior=loop&playbar=false&playButton=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&controlsVisibleOnLoad=false",
    titolo: "Academy virtual tour teaser",
  },
  cta: "Unlock now",
  /* Le due CTA puntano a due form diversi: la prima al form su `start.`, la
     seconda a un Typeform. Duplicazione voluta del sito. */
  hrefPrima: "https://start.petetong-djacademy.com/virtualtour-form",
  hrefSeconda: "https://form.typeform.com/to/eu83FgdN",
  sottotesto: "Fill in the form and unlock the virtual tour",
} as const;

/* ── Sezione 11: la CTA "For Advanced Producers" ────────────────────── */

export const CTA_ELITE = {
  titoloPrima: "For Advanced Producers.",
  titoloEvidenziato: "Included in the ELITE plan.",
  paragrafo:
    "Sharpen your sound. Master your craft. Become the producer labels and crowds remember.",
  immagine: {
    src: "/webflow/mix-mastering-course/bund-04.png",
    alt: "",
    larghezza: 1215,
    altezza: 1119,
  },
} as const;

/* ── Sezione 12: "Lessons Highlights" ───────────────────────────────── */

export type BloccoHighlight = {
  readonly titolo: string;
  readonly voci: readonly string[];
  readonly disposizione: "sinistra" | "destra";
  readonly spaziatura?: "compatta" | "normale";
  /*
   * L'ordine dei due gruppi dentro `.content-image-group.feature.gifs`:
   * `"riga-prima"` è `.div-right-gifs.but-left` seguito da
   * `.div-left-gifs.but-right`; `"gruppo-prima"` è l'ordine inverso, che sul
   * sito ha solo il secondo blocco.
   */
  readonly ordine?: "riga-prima" | "gruppo-prima";
  /** `true` dove dentro la riga il 140% precede il 60%. */
  readonly rigaInvertita?: boolean;
  readonly immagini: readonly {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  }[];
};

/*
 * Tutti e tre i blocchi sono `content-image-group feature gifs` senza
 * `.original`, quindi `disposizione: "destra"`. Quello che cambia è l'ordine
 * dei figli nell'HTML:
 *   blocco 1  riga [140%, 60%]  poi immagine piena      → rigaInvertita
 *   blocco 2  immagine piena    poi riga [140%, 60%]    → gruppo-prima + rigaInvertita
 *   blocco 3  riga [60%, 140%]  poi immagine piena      → ordine naturale
 * Le immagini sono sempre elencate qui nell'ordine "60%, 140%, piena", cioè
 * quello delle props del componente, non quello del DOM.
 */
export const HIGHLIGHTS = {
  titoloPrima: "Lessons ",
  titoloEvidenziato: "Highlights",
  blocchi: [
    {
      titolo: "Project Setup & Mixing Prep",
      disposizione: "destra",
      /* `.content-card-4.new-home-2.dj-course` + `.lesson-hifhlights` (refuso
         del sito) sul blocco del titolo: solo il primo blocco li ha. */
      spaziatura: "compatta",
      rigaInvertita: true,
      immagini: [
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-59-55.webp",
          alt: "",
          larghezza: 1055,
          altezza: 1472,
        },
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-59-00.webp",
          alt: "",
          larghezza: 1842,
          altezza: 1166,
        },
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-42-58-min.webp",
          alt: "",
          larghezza: 1865,
          altezza: 1014,
        },
      ],
      voci: [
        "Organize your session for speed and clarity",
        "Analyze the track before starting the mix",
        "Get the right balance from the start with Gain Staging",
        "Shape the mix on the Stereo Bus for a solid foundation",
        "Prepare your workflow for quick and clean results",
      ],
    },
    {
      titolo: "Shaping The Beat - Mixing Drums, Bass & Grooves",
      disposizione: "destra",
      ordine: "gruppo-prima",
      rigaInvertita: true,
      immagini: [
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-43-37-min-copia.png",
          alt: "",
          larghezza: 253,
          altezza: 308,
        },
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-19-alle-12-59-28-min.webp",
          alt: "",
          larghezza: 2923,
          altezza: 1590,
        },
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-15-06-57.avif",
          alt: "",
          larghezza: 2860,
          altezza: 1598,
        },
      ],
      voci: [
        "Shape the kick with EQ and compression",
        "Mix low percussion for a groovy rhythm",
        'Add punch and cohesion to the Drum Buss with the right "glue"',
        "Create a solid low-end by mixing the bass",
        "Enhance synth bass and process high-frequency synths for clarity",
      ],
    },
    {
      titolo: "Final Mix & Mastering - Vocals & Synths",
      disposizione: "destra",
      immagini: [
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-42-01-copia-min.png",
          alt: "",
          larghezza: 562,
          altezza: 732,
        },
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-42-33-min.avif",
          alt: "",
          larghezza: 1858,
          altezza: 1044,
        },
        {
          src: "/webflow/mix-mastering-course/screenshot-2025-07-22-alle-14-44-18-min.webp",
          alt: "",
          larghezza: 1870,
          altezza: 1051,
        },
      ],
      voci: [
        "Prepare the vocal for optimal mixing performance",
        "Shape and treat the vocal for a natural shine",
        "Make the vocal stand out with the right final touches",
        "Adopt the right mindset for professional mastering",
        "Optimize dynamics for clean and powerful loudness",
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
];

/* ── Sezione 18: FAQ ────────────────────────────────────────────────── */

export const DOMANDE: readonly DomandaFaq[] = [
  {
    domanda: "Is this course suitable for self-releasing artists?",
    risposta:
      "Yes. It's designed to help you prepare your tracks for platforms like Spotify, Beatport, and more.",
  },
  {
    domanda: "What topics are covered in mixing and mastering?",
    risposta:
      "EQ, compression, stereo imaging, reverb, loudness, dynamics, exporting and more.",
  },
  {
    domanda: "Will I be able to finalize tracks for streaming?",
    risposta:
      "Yes — after the course you’ll know how to prepare your mix/master for release.",
  },
  {
    domanda: "Can I get feedback on my mix?",
    risposta: "Yes. Through live sessions and Talent Pool submissions.",
  },
  {
    domanda: "Is mastering included in all subscription plans?",
    risposta:
      "No — the Mixing & Mastering course is only available in the Elite (3-course) plan. It’s an advanced course designed for students who want full access to the entire learning path.",
  },
  {
    domanda: "Do I need the full access plan to get everything?",
    risposta:
      "All subscription plans include the same features: live sessions, AI tutors, contests, feedback, downloads, and community access. However, to unlock the Mixing & Mastering course and its exclusive content, you’ll need the Elite plan (3-course access) — which gives you the full educational experience from DJing to final mastering.",
  },
  {
    domanda: "Is certification included in the price?",
    risposta:
      "Yes. Complete the course and you'll receive an official certificate.",
  },
];

/* ── JSON-LD ────────────────────────────────────────────────────────────
   Copiato da `docs/webflow/meta/mix-mastering-course.json`, campo `jsonld`,
   senza toccare nulla: è già pubblicato e indicizzato così. */

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
      "@id": "https://www.petetong-djacademy.com/#luca-pretolesi",
      name: "Luca Pretolesi",
      jobTitle: "Mixing and mastering engineer, founder of Studio DMI",
      sameAs: ["https://en.wikipedia.org/wiki/Luca_Pretolesi"],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.petetong-djacademy.com/mix-mastering-course#webpage",
      url: "https://www.petetong-djacademy.com/mix-mastering-course",
      name: "Mix & Mastering Course | Pete Tong DJ Academy",
      description:
        "Take your sound to Grammy level. Learn advanced mixing and mastering techniques for electronic music with Luca Pretolesi in this pro-level online course.",
      isPartOf: { "@id": "https://www.petetong-djacademy.com/#website" },
      breadcrumb: {
        "@id":
          "https://www.petetong-djacademy.com/mix-mastering-course#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.petetong-djacademy.com/mix-mastering-course#breadcrumb",
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
          name: "Mix & Mastering Course",
          item: "https://www.petetong-djacademy.com/mix-mastering-course",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.petetong-djacademy.com/mix-mastering-course#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this course suitable for self-releasing artists?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It's designed to help you prepare your tracks for platforms like Spotify, Beatport, and more.",
          },
        },
        {
          "@type": "Question",
          name: "What topics are covered in mixing and mastering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EQ, compression, stereo imaging, reverb, loudness, dynamics, exporting and more.",
          },
        },
        {
          "@type": "Question",
          name: "Will I be able to finalize tracks for streaming?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — after the course you’ll know how to prepare your mix/master for release.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get feedback on my mix?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Through live sessions and Talent Pool submissions.",
          },
        },
        {
          "@type": "Question",
          name: "Is mastering included in all subscription plans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — the Mixing & Mastering course is only available in the Elite (3-course) plan. It’s an advanced course designed for students who want full access to the entire learning path.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need the full access plan to get everything?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All subscription plans include the same features: live sessions, AI tutors, contests, feedback, downloads, and community access. However, to unlock the Mixing & Mastering course and its exclusive content, you’ll need the Elite plan (3-course access) — which gives you the full educational experience from DJing to final mastering.",
          },
        },
        {
          "@type": "Question",
          name: "Is certification included in the price?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Complete the course and you'll receive an official certificate.",
          },
        },
      ],
    },
    {
      "@type": "Course",
      "@id": "https://www.petetong-djacademy.com/mix-mastering-course#course",
      name: "Grammy® Advanced Mix & Mastering Course",
      description:
        "Advanced mixing and mastering course led by Luca Pretolesi, mixing and mastering engineer and founder of Studio DMI in Las Vegas, who has collaborated with artists including Diplo, Skrillex, Drake, Steve Aoki, David Guetta and Beyoncé. Built on his Reverse Funnel 2.0® approach: shape the stereo bus first, sculpt the core sounds, then finalize vocals and mastering for a release-ready result. Available in the Elite plan. Includes subtitles in English, Spanish, French, Portuguese and Italian.",
      url: "https://www.petetong-djacademy.com/mix-mastering-course",
      provider: { "@id": "https://www.petetong-djacademy.com/#organization" },
      inLanguage: "en",
      educationalLevel: "Advanced",
      educationalCredentialAwarded: "Official certificate",
      instructor: [
        { "@id": "https://www.petetong-djacademy.com/#luca-pretolesi" },
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
          lowPrice: "117.00",
          highPrice: "288.00",
          offerCount: 2,
          url: "https://www.petetong-djacademy.com/pricing-page",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "117.00",
          highPrice: "288.00",
          offerCount: 2,
          url: "https://www.petetong-djacademy.com/pricing-page",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "AggregateOffer",
          priceCurrency: "GBP",
          lowPrice: "117.00",
          highPrice: "288.00",
          offerCount: 2,
          url: "https://www.petetong-djacademy.com/pricing-page",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  ],
} as const;
