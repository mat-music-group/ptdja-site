/*
 * Testi, immagini e metadati della pagina `/producer-course`.
 *
 * Ogni stringa è copiata da `docs/webflow/html/producer-course.html` (verità
 * ultima) e confrontata con `docs/webflow/outline/producer-course.md`. Non si
 * riscrive, non si traduce, non si corregge: i refusi del sito restano
 * ("music genra", "bring any beginner", "masters advanced production
 * tequines", "pro-level trakcs"). Se una parola sembra sbagliata, è sbagliata
 * sul sito.
 *
 * La pagina è una variante di `/dj-course`: stessa struttura di sezioni,
 * stessi componenti, contenuti diversi. Differenze strutturali:
 *   - **un solo** virtual tour (dj-course ne ha due, il secondo verso Typeform);
 *   - "Lessons Highlights" con **quattro** blocchi invece di tre;
 *   - cinque docenti invece di otto.
 *
 * - `META` e `JSON_LD`: copiati da `docs/webflow/meta/producer-course.json`.
 * - `DOMANDE`: le 7 domande della FAQ di questa pagina, le stesse del
 *   `FAQPage` del JSON-LD.
 * - Listino, recensioni, "More Than a Course", popup e "Book a free call" non
 *   stanno qui: sono identici su più pagine e vivono in `condivisi.ts`.
 *
 * ⚠️ I conteggi delle lezioni sul sito NON coincidono fra loro, ed è voluto
 * riprodurli così: la colonna desktop dice "Videos: 196" e la scheda mobile
 * "Videos: 200+"; l'accordion dice "196 Lessons" nella versione desktop e
 * "200 Lessons" in quella mobile. Le lezioni davvero elencate sono 165 in
 * entrambe. Vedi la lista "Divergenze e anomalie" nel report.
 *
 * ⚠️ Gli ` ` nelle etichette della scheda corso sono spazi unificatori
 * veri, come nell'HTML Webflow (`Level:&nbsp;`): scritti con l'escape perché
 * a schermo sarebbero invisibili.
 */

import type { BloccoHighlight } from "@/components/sections/LessonHighlights";
import type { CorsoInVetrina } from "@/components/sections/SliderCorsi";
import type { DomandaFaq } from "@/testi/condivisi";

/* ── Metadati ───────────────────────────────────────────────────────── */

export const META = {
  title: "Learn Music Production with Diplo, PARISI & Âme | Producer Course",
  description:
    "Master music production with our complete online Producer Course. Learn from Diplo, PARISI, Âme, and more. For aspiring and advanced producers. Start now.",
  canonical: "https://www.petetong-djacademy.com/producer-course",
  ogImage:
    "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67c72a69971bade6763459e4_IMMAGINE%20ACADEMY.png",
  ogUrl: "https://www.petetong-djacademy.com/producer-course",
  ogSiteName: "Pete Tong DJ Academy",
} as const;

/* ── Sezione 1: hero ────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "LEARNING",
  titolo: "Producer Course",
  /* `p._w-490-4`: un solo paragrafo con uno `<strong>` in mezzo e un `<br>`. */
  paragrafo: {
    prima:
      "The only complete Producer program — from zero to advanced — with the ",
    grassetto: "most influential mentors",
    dopo: " in the world.",
    secondaRiga:
      "A clear and structured method, designed to develop your sound and, through the Talent Pool, get your music heard and released by the most relevant labels.",
  },
  prezzo: { prima: "starting from", dopo: " per month" },
  cta: { testo: "Sign Up Now", href: "/pricing-page" },
  trustpilot: {
    prima: "Trusted by hundreds on ",
    link: "Trustpilot 4.7 ★",
    href: "https://it.trustpilot.com/review/petetong-djacademy.com?languages=all",
  },
  immagine: {
    src: "/webflow/producer-course/prod-eng.webp",
    alt: "Producer Course at PTDJ Academy, open to all levels and equipments",
    larghezza: 1107,
    altezza: 708,
  },
  /*
   * Le due misure in cui il blocco occhiello + titolo di questa pagina
   * differisce da quello di `/dj-course`, perché Webflow ha duplicato le
   * classi invece di riusarle:
   *   `.section-subtitle-44.negative.new-home-2.top-title-head`
   *       margin-bottom -50px (-30 sotto i 480), position relative, z-index 10
   *   `.section-title-17.new-home-2.course-page.dj-course`
   *       padding-bottom 60px (30 sotto i 480, come dj-course)
   * Su dj-course sono rispettivamente 0 e 40.
   */
  spaziatura: {
    eyebrowMargine: -50,
    eyebrowMargineMobile: -30,
    titoloPaddingBottom: 60,
  },
} as const;

/* ── Sezione 2 e 3: "Course Content" ────────────────────────────────── */

export type VoceMetaCorso = {
  readonly icona: string;
  /* `div.course-detail-text`: l'etichetta ("Level:&nbsp;", "Duration:&nbsp;"…). */
  readonly etichetta: string;
  /* `div.course-detail-text.strong`: il valore in verde. Manca sulle righe
     che sul sito hanno solo l'etichetta ("Talent Producer Scouting"…). */
  readonly valore?: string;
  /* `true` sulle due righe con `.align-top`, che vanno a capo. */
  readonly allineaInAlto?: boolean;
};

/**
 * La scheda della colonna desktop (`div.sidebar.course`): 196 video,
 * "Official Certificate", "Talent Producer Scouting".
 */
export const META_CORSO_DESKTOP: readonly VoceMetaCorso[] = [
  {
    icona: "/webflow/shared/icon-level-02-academy-template.png",
    etichetta: "Level: ",
    valore: "Beginner & Advanced",
  },
  {
    icona: "/webflow/shared/reloj.png",
    etichetta: "Duration: ",
    valore: "50+ h",
  },
  { icona: "/webflow/shared/video.png", etichetta: "Videos: ", valore: "196" },
  { icona: "/webflow/shared/approved.png", etichetta: "Official Certificate" },
  {
    icona: "/webflow/shared/path-svgrepo-com-2.svg",
    etichetta: "Talent Producer Scouting",
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

/**
 * La scheda del blocco `.card-2.course-mobile`: 200+ video,
 * "Official Certification", "Talent Scouting" (senza "Producer").
 */
export const META_CORSO_MOBILE: readonly VoceMetaCorso[] = [
  {
    icona: "/webflow/shared/icon-level-02-academy-template.png",
    etichetta: "Level: ",
    valore: "Beginner & Advanced",
  },
  {
    icona: "/webflow/shared/reloj.png",
    etichetta: "Duration: ",
    valore: "50+ h",
  },
  {
    icona: "/webflow/shared/video.png",
    etichetta: "Videos: ",
    valore: "200+",
  },
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

/** Le cinque bolle dei docenti sopra le schede, in ordine. */
export const BOLLE_DOCENTI: readonly { readonly src: string; readonly alt: string }[] =
  [
    { src: "/webflow/shared/miniatura-profilo-pete.png", alt: "" },
    { src: "/webflow/producer-course/miniatura-profilo-diplo.png", alt: "" },
    { src: "/webflow/producer-course/miniatura-profilo-parisi.png", alt: "" },
    { src: "/webflow/shared/miniatura-profilo-ame.png", alt: "" },
    { src: "/webflow/producer-course/miniatura-profilo-the-reloud.png", alt: "" },
  ];

export type CapitoloCorso = {
  /** `span.text-span-44`, in verde: "Chapter 1". */
  readonly numero: string;
  /** Il resto del titolo, due punti compresi. */
  readonly titolo: string;
  readonly lezioni: readonly string[];
};

/*
 * Gli undici capitoli, identici fra la variante desktop e quella mobile.
 * 165 lezioni in tutto: né 196 né 200, che sono i due numeri scritti nel
 * titolo dell'accordion. È il sito, non un taglio di questa copia.
 *
 * ⚠️ Nel capitolo 3 due lezioni compaiono due volte identiche ("Kick & Bass:
 * The 10 Essential Steps for Perfect Balance" e "Session Workflow: Organizing
 * Your Project Like a Pro"), e nel capitolo 10 ricompare "Âme: Building the
 * Foundation — Mood, Motif & Movement" già presente nel capitolo 9. Si
 * riproducono.
 */
export const CURRICULUM: readonly CapitoloCorso[] = [
  {
    numero: "Chapter 1",
    titolo: ": Welcome & mindset",
    lezioni: [
      "Course Overview — Unlock the Fundamentals, One Chapter at a Time",
      "The Right Mindset for a Successful Music Producer",
      "Be Unique as an Artist — Your Sound Is Your Identity",
      "The Essence of a Hit Track: The Hit Test®",
    ],
  },
  {
    numero: "Chapter 2",
    titolo: ": The Drums & DNA of Sound",
    lezioni: [
      "Groove Foundations: Building Blocks of Rhythm & Energy",
      "Kick Power: The 3 Golden Rules + ADSR & Sound Design",
      "Bass Precision: Kick Phase & Club-Ready Low End",
      "Club Kick Tuning: Crafting the Perfect Dancefloor Impact",
      "Phase Control: XPhase, Neutron & Pro Kick Alignment",
      "Mix Room Tactics: Placing the Kick for Maximum Impact",
      "Inside the Bounce: Kick Crafting with Diplo",
      "Sonic Architecture: Parisi’s Approach to Kick Design",
      "Depth & Detail: Âme’s Signature Kick Technique",
      "Mix Metrics: Balancing Bass, Loudness & Perception",
      "The Art of EQ: Corrective vs Creative Tools",
      "The Power of Compression: Control, Glue & Character",
      "Music & the Mind: How the Brain Responds to Sound",
      "Drum Foundations Pt. 1: The 3 Golden Rules of Groove",
      "Drum Foundations Pt. 2: Creative FX & Advanced Flow",
      "The 3+3+2 Pattern: Groove Theory in Practice",
      "Drums in the Mix: Finding the Perfect Balance",
      "Diplo Drums: Writing Real-World Rhythms",
      "Diplo Starter Track: Jack Ü x Keiza Template",
      "Parisi Drums: Crafting Future-Forward Grooves",
      "Parisi Drum Kit: Sounds from the Edge of Innovation",
      "Âme Drums: Deep Rhythms & Organic Flow",
      "Âme Drum Kit: Textures for Hypnotic Grooves",
      "Skrillex Tricks: Sound Design & Production Hacks",
      "Reverb Mastery: Space, Depth & Dimension",
      "Main Sound Shaping: Interventions That Matter",
      "Parallel Compression: Power Without Losing Dynamics",
      "The Drum Bus: Glue, Drive & Cohesion",
      "Parisi: What’s on My Drum Bus: Processing for Character & Cohesion",
      "Diplo Origins: How It All Started & The Journey to the Top",
    ],
  },
  {
    numero: "Chapter 3",
    titolo: ": The Bass Dimension",
    lezioni: [
      "The Role of the Bass: Foundation, Weight & Groove",
      "Placing the Bass: Finding Its Spot in the Mix",
      "The 3 Golden Rules of Bass: Rule 1 — The Fundamentals",
      "Rule 2 — Bass Movement (Parts 1–4): Flow & Function",
      "Rule 2 (Parts 5–6) + Rule 3: Dynamics, Drive & Direction",
      "Kick & Bass: Phase Alignment and Low-End Clarity",
      "Kick & Bass: The 10 Essential Steps for Perfect Balance",
      "Session Workflow: Organizing Your Project Like a Pro",
      "Parisi Bass: Creative Approaches to Low-End Design",
      "Kick & Bass: The 10 Essential Steps for Perfect Balance",
      "Session Workflow: Organizing Your Project Like a Pro",
      "Diplo Bass: Groove-Driven Low-End Techniques",
      "Diplo Bass Template: Inside the Biber Bass Sound",
      "Âme Bass: Deep, Hypnotic Bass Writing Techniques",
      "Âme Bass Toolkit: Template, Sound Pack or Presets",
    ],
  },
  {
    numero: "Chapter 4",
    titolo: ": Beyond the Oscillator — Creative Synthesis",
    lezioni: [
      "Synthesis Fundamentals: Overview & Additive Techniques",
      "Subtractive Synthesis: Shaping Sound Through Removal",
      "The ADSR Envelope: Controlling Time & Shape",
      "LFOs Unlocked: Modulation & Movement in Sound",
      "Modern Synths: Architecture & Workflow Explained",
      "Sound Design from Scratch: Build Any Sound You Imagine",
      "Mix-Ready Sounds: Secrets for Instant Polish & Presence",
      "Parisi Synth Choices: What we Use and Why",
      "Parisi Presets Pack: Signature Sounds & Starting Points",
      "Parisi on Sampling: Tools, Techniques & Texture",
      "Diplo Deconstructed: Signature Sounds in Detail",
      "Mastering MIDI: Arpeggiators, Editors & Hidden Tricks",
      "Synth Recording Hacks: Workflow & Editing That Work",
      "Analog Power: Exploring Iconic Studio Synths",
      "Âme Origins: From inspiration to innovation",
    ],
  },
  {
    numero: "Chapter 5",
    titolo: ": The Hidden Structure of Music",
    lezioni: [
      "The Main Harmonic Families: Tone, Role & Emotion",
      "Writing Leads with the Major Scale: Brightness & Clarity",
      "Writing Leads with the Minor Scale: Mood & Depth",
      "Chords & Beyond: From Basics to Advanced Harmony",
      "Major vs Minor: Progressions & the Circle of Fifths",
      "Writing Better Chord Progressions: Make It Musical",
      "Chord Micro-Pack: 10 Famous Progressions You Should Know",
      "The Pad Rules: 3 Golden Principles + Harmonic Placement in the Mix",
      "Pete Intro — Why Artist Bios Matter",
    ],
  },
  {
    numero: "Chapter 6",
    titolo: ": Producing with Vocals — Edit, Shape, Own it",
    lezioni: [
      "The 3 Golden Rules for Perfect Vocals",
      "Capturing the Take: How to Record a Clean Vocal Signal",
      "Vocal Editing Masterclass: Best Takes, Volume Riding & Mix Placement",
      "Creative Acapella Use: Flip, Twist & Transform",
      "AI Vocals & Sample Packs: Redesign, Resample, Reinvent",
      "Vocal Chops: Turn Samples & Acapellas into Instruments",
      "Diplo Vocal Tricks: Chops & Chain Breakdown",
      "Âme Vocal Processing: From Raw Take to Final Texture",
      "Autotune Essentials: The Written Guide to Pitch Perfection",
      "30 Acapella Cuts from the MORE Vault",
    ],
  },
  {
    numero: "Chapter 7",
    titolo: ": Structure = Story — Arranging for Impact",
    lezioni: [
      "The 3 Golden Rules of Structure: Emotional Growth in Theory",
      "Writing a Hit: Structure & Emotional Growth in Iconic Tracks",
      "How to Build Emotional Growth: Instruments, Filters & FX",
      "The Massive Drop: Crafting Impact at the Peak",
      "Using Reference Tracks: Learn from the Best to Build Better",
      "Âme Track Structure Breakdown: Theory Meets Practice",
    ],
  },
  {
    numero: "Chapter 8",
    titolo: ": Mix & Master — Shape, Polish, Release",
    lezioni: [
      "The Perfect Product: What Makes a Track Sound Finished",
      "Mix vs Master: What Really Sets Them Apart?",
      "Loudness Targets Explained: RMS, LUFS & Industry Benchmarks",
      "The Mix — The 3 Golden Rules: Part 3 | The Full Process Unpacked",
      "Transient Shapers: Sculpting Attack & Punch",
      "Creative & Clean: Delay as a Mixing Tool",
      "Harmonic Exciters: Adding Color, Warmth & Presence",
      "Space & Imaging: Panning, Wideners, HAAS & Stereo Control",
      "Dynamic Tools: Limiter, Gate & Expander in the Mix",
      "Mix Walkthrough: Applying the MAT MIX MATRIX",
      "The Mastering: The 3 Golden Rules Part 1 — Dynamics, Loudness War & Dithering",
      "The Mastering: The 8 Steps Part 1 — Clean, Space, Level, EQ",
      "The Mastering: The 8 Steps Part 1 — Depth, Sparkle, Volume, Dithering",
      "The Mastering: The MAT MIX MATRIX",
      "Automatic Mastering: Quick Models with God Particle & Ozone 11",
      "How to Export Stems for Mix — The Right Way vs The Wrong Way",
      "How to Render Your Track for Mastering — The Right Way vs The Wrong Way",
      "Parisi: Inside Our Studio — How Structure Shapes Creativity",
      "Reloud: Choosing the Right DAW — Workflow Is Everything",
      "Âme: Why Monitoring Is the Heart of Our Sound",
    ],
  },
  {
    numero: "Chapter 9",
    titolo: ": Finding your Way — Strategies for Modern Production",
    lezioni: [
      "Diplo: Starting Tracks with Energy and Simplicity",
      "Âme: Building the Foundation — Mood, Motif & Movement",
      "Parisi: Track Starters from Sound Design to Groove",
      "Diplo: Breaking Creative Blocks — Just Keep Moving",
      "Âme: Overcoming Creative Blocks Through Emotion & Repetition",
      "Parisi: Creative Reset — Sound Experiments & Mental Shifts",
      "Diplo: Studio Flow — Fast Routines, Big Results",
      "Âme: Daily Studio Rituals — Focus, Flow & Intuition",
      "Parisi: Crafting the Creative Day — Balance, Tech & Inspiration",
      "Diplo: Staying Inspired — Move Fast, Stay Curious",
      "Âme: Long-Term Inspiration Through Deep Listening & Evolution",
      "Parisi: Inspiration Over Time — Innovation Through Sound Discovery",
      "Diplo: Staying Updated — Fast Tools, Fresh Sounds",
      "Âme: Evolving with Technology — Tools That Serve the Sound",
      "Parisi: Staying Ahead — Exploring Tech to Push Creativity",
    ],
  },
  {
    numero: "Chapter 10",
    titolo: ": Building Your World — Records, Relationships & Reach",
    lezioni: [
      "Diplo: Labels, Leverage & Playing the Game",
      "Âme: Navigating Labels — Artistry, Trust & Timing",
      "Parisi: Working with Labels — Sound, Vision & Creative Freedom",
      "Diplo: Studio Collabs — Vibe First, Rules Later",
      "Âme: Collaboration as Composition — Building Together in the Studio",
      "Parisi: Collaborative Sessions — Blending Voices, Sounds & Ideas",
      "Diplo: Creative Clashes — Keep It Moving, Keep It Fun",
      "Âme: Turning Conflict into Progress — The Art of Listening",
      "Âme: Building the Foundation — Mood, Motif & Movement",
      "Parisi: Creative Disagreements — Communication Is the Key",
      "Diplo: Network or Die — Making Real Connections That Count",
      "Âme: Organic Networking — Let the Music Speak First",
      "Parisi: Strategic Networking — Relationships That Build Careers",
      "Diplo: Feedback Without Ego — Stay Open, Stay Sharp",
      "Âme: Feedback as Dialogue — Grow Through Exchange",
      "Parisi: Constructive Feedback — Sharpening Ideas Through Perspective",
    ],
  },
  {
    numero: "Chapter 11",
    titolo: ": Turning Skills Into A Career",
    lezioni: [
      "Diplo: Hustle Smart — My Advice for Making It in Music",
      "Âme: Stay True, Stay Consistent — Building a Career That Lasts",
      "Parisi: Build with Intention — How to Grow a Career with Purpose",
      "Pete Tong: Long Game Mentality — What It Really Takes",
      "Diplo: Success Is Movement — Keep Growing, Keep Going",
      "Âme: Redefining Success — Depth Over Hype",
      "Parisi: Measuring Success Through Creativity & Connection",
      "Diplo: Labels Publishing Streaming — Play the Game Your Way",
      "Âme: Labels Publishing Streaming — Balance Art and Business",
      "Parisi: Labels Publishing Streaming — Control Your Sound and Rights",
      "Diplo: Social Media Relevancy — Stay Loud, Stay Present",
      "Âme: Social Media Relevancy — Be Selective, Stay Authentic",
      "Parisi: Social Media Relevancy — Use It to Share the Process",
      "Diplo: Protecting Your Ears — Don’t Burn Out Your Most Important Tool",
      "Âme: Protecting Your Ears — Longevity Through Listening Care",
      "Parisi: Protecting Your Ears — Habits, Tools and Awareness",
      "Diplo: Work-Life Balance — Surviving the Tour, Thriving in the Studio",
      "Âme: Work-Life Balance — Finding Rhythm Between Travel and Creation",
      "Parisi: Work-Life Balance — Managing Energy Between Studio and Life",
      "Diplo: When to Consider Management — Build First, Then Delegate",
      "Âme: When to Consider Management — Trust, Timing and Vision",
      "Parisi: When to Consider Management — When Growth Needs Structure",
      "Diplo: 3–5 Year Planning — Think Big, Stay Flexible",
      "Âme: 3–5 Year Planning — Evolve with Intention",
      "Parisi: 3–5 Year Planning — Map the Vision, Adapt the Path",
    ],
  },
];

/** La seconda scheda dei tab, "What you'll learn". */
export const COSA_IMPARERAI: readonly string[] = [
  "The mindset and workflow of a successful music producer",
  "Complete music production: from scratch to finished track, including music theory",
  "Professional sound design and audio processing",
  "Advanced mixing & mastering techniques for label-ready quality",
  "Career strategies and how to grow in the music industry",
];

export const CONTENUTO = {
  titolo: "Course Content",
  /* Come su dj-course il video sta nel DOM tre volte: due `<wistia-player>`
     (uno dentro `.code-embed-12`, che il CSS spegne) e l'iframe embedly qui
     sotto, visibile solo sotto i 480px. */
  wistiaMediaId: "stn3x7wxvy",
  wistiaAspect: "1.7777777777777777",
  videoEmbedly: {
    src: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2Fstn3x7wxvy&display_name=Wistia%2C+Inc.&url=https%3A%2F%2Fpete-tong-dj-academy.wistia.com%2Fmedias%2Fstn3x7wxvy&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2F1b571a45796ec91e0b67b286ab650c8e.jpg%3Fimage_crop_resized%3D960x540&type=text%2Fhtml&schema=wistia",
    titolo: "Producer Course Intro",
    larghezza: 940,
    altezza: 529,
    proporzione: "56.27659574468085%",
  },
  tabCurriculum: "Curriculum",
  tabCosaImparerai: "What you'll learn",
  accordionTitolo: "Producer Lessons",
  /* I `<br>` fra titolo e conteggio: **due** nella versione desktop e **tre**
     in quella mobile. Su dj-course sono tre in entrambe. Differenza del sito. */
  accordionBrDesktop: 2,
  accordionBrMobile: 3,
  /* Il sottotitolo dell'accordion: 196 nella versione desktop, 200 in quella
     mobile. Differenza del sito, non un refuso di copiatura. */
  accordionSottotitoloDesktop: "196 Lessons | 50 hours",
  accordionSottotitoloMobile: "200 Lessons | 50 hours",
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
  titoloRiga1: "Producer Course",
  titoloEvidenziato: "Teachers",
  slide: [
    {
      src: "/webflow/shared/geometrics-two-pete.png",
      alt: "Pete Tong, Tutor of the Producer Course",
      ...RITRATTO,
    },
    {
      src: "/webflow/shared/geometrics-two-diplo.png",
      alt: "Multi-Grammy Award-winning global icon Diplo",
      ...RITRATTO,
    },
    {
      src: "/webflow/shared/geometrics-two-parisi.webp",
      alt: "Portrait of brothers and duo PARISI, tutors of the academy, on a yellow background",
      ...RITRATTO,
    },
    { src: "/webflow/shared/geometrics-two-ame.png", alt: "", ...RITRATTO },
    {
      src: "/webflow/shared/geometrics-two-the-reloud.png",
      alt: "",
      ...RITRATTO,
    },
  ],
} as const;

/* ── Sezione 6: il virtual tour, una volta sola ─────────────────────── */

/*
 * A differenza di `/dj-course`, qui la sezione compare UNA volta e la CTA
 * punta solo al form su `start.`: niente seconda copia verso Typeform.
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

/* ── Sezioni 7 e 8: "The Course that Adapts to You" ─────────────────── */

export const ADATTA = {
  titoloPrima: "The Course that",
  titoloEvidenziato: "Adapts ",
  titoloDopo: "to You",
  titoloDopoAccordion: "to You",
  toggleAvanzato: "Advanced",
  togglePrincipiante: "Beginner",
  /* ── Versione slider (`dj-v2`), quella che si vede ──────────────────
     Qui, a differenza di dj-course, le due schede affiancate e i due pannelli
     del toggle dicono la STESSA cosa: nell'HTML i quattro paragrafi sono due
     coppie identiche. */
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
        "If you are already advanced, master advanced production techniques and build pro-level tracks - while refining your fundamentals.",
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
        "If you are already advanced, master advanced production techniques and build pro-level tracks - while refining your fundamentals.",
      gradiente: "/webflow/shared/gradient-eng-2.png",
      skill: "/webflow/shared/skills-eng-dj-adv.png",
    },
  },
  /* ── Versione accordion (`container-31`), mai visibile ──────────────
     `.container-31` è `display: none` a ogni breakpoint: questo blocco esiste
     nel DOM del sito e non si vede mai. Si riproduce perché il riferimento è
     l'HTML. Contiene i refusi "music genra", "bring any beginner" e
     "masters advanced production tequines".
     ⚠️ Nell'HTML i pannelli qui dentro sono TRE: "For Beginner", "For
     Advanced" e una terza copia di "For Advanced" con un refuso in più
     ("pro-level trakcs") e senza titolo. `AdattaATe` ne prevede due; essendo
     tutto `display: none`, l'impatto sul rendering è nullo. */
  accordion: {
    principiante: {
      titolo: "For Beginner",
      testo:
        "Our multi-level approach, that works for any style, music genra and gear, bring any beginner to pro, providing all the skills needed to succeed.",
      gradiente: "/webflow/shared/gradient-eng-1.png",
      skill: "/webflow/producer-course/skills-eng-dj.png",
    },
    avanzato: {
      titolo: "For Advanced",
      testo:
        "If you are already advanced, masters advanced production tequines and build pro-level tracks - while refining your fundamentals.",
      gradiente: "/webflow/shared/gradient-eng-2.png",
      skill: "/webflow/producer-course/skills-eng-producer.png",
    },
  },
} as const;

/* ── Sezione 10: "Lessons Highlights" ───────────────────────────────── */

/*
 * Quattro blocchi invece dei tre di dj-course, e tutti e quattro senza
 * `.original` sul gruppo immagini, cioè in colonna (`disposizione: "destra"`).
 *
 * ⚠️ L'ordine dei due gruppi dentro la colonna cambia da blocco a blocco e nel
 * foglio non c'è nessun `order`: decide il DOM. Blocchi 1 e 3 hanno
 * l'immagine a tutta larghezza SOPRA (`ordine: "gruppo-prima"`), blocchi 2 e 4
 * sotto. Sul blocco 3 anche i due elementi della riga sono invertiti
 * (`rigaInvertita`): il 140% precede il 60%.
 *
 * `immagini` resta sempre nell'ordine degli slot: [60%, 140%, 100%].
 */
export const HIGHLIGHTS = {
  titoloPrima: "Lessons ",
  titoloEvidenziato: "Highlights",
  blocchi: [
    {
      titolo: "Groove & Sound Design",
      disposizione: "destra",
      ordine: "gruppo-prima",
      /* Solo il primo blocco porta `.new-home-2.dj-course` sulla card e
         `.lesson-hifhlights` (refuso del sito) sul blocco del titolo. */
      spaziatura: "compatta",
      immagini: [
        {
          src: "/webflow/producer-course/screenshot-2025-07-21-alle-17-25-07-copia.webp",
          alt: "DS-10 Plugin",
          larghezza: 630,
          altezza: 957,
        },
        {
          src: "/webflow/producer-course/screenshot-2025-07-21-alle-17-25-47.webp",
          alt: "",
          larghezza: 1816,
          altezza: 1020,
        },
        {
          src: "/webflow/producer-course/screenshot-2025-07-21-alle-17-33-37-copia.png",
          alt: "Alex Tripi and Diplo in one of the Pete Tong Academy's lessons",
          larghezza: 624,
          altezza: 388,
        },
      ],
      voci: [
        "Design punchy kicks with synthesis, ADSR & phase alignment",
        "Create basslines with 6 movement types for maximum groove",
        "Tighten the low-end using sidechain, layering & phase correction",
        "Craft original sounds from scratch learning subtractive/additive synthesis",
        "Use filters, LFOs & textures to develop your own sonic identity",
      ],
    },
    {
      titolo: "Theory & Arrangement",
      disposizione: "destra",
      immagini: [
        {
          src: "/webflow/producer-course/screenshot-2025-07-19-alle-11-56-09-copia.webp",
          alt: "",
          larghezza: 873,
          altezza: 1162,
        },
        {
          src: "/webflow/producer-course/a1kl3zoowau8z3vb689u.webp",
          alt: "",
          larghezza: 2896,
          altezza: 1614,
        },
        {
          src: "/webflow/producer-course/screenshot-2025-07-21-alle-17-40-18.webp",
          alt: "Jack and Marco PARISI producing with a Seabord Roli",
          larghezza: 1850,
          altezza: 1038,
        },
      ],
      voci: [
        "Learn scales, chords, intervals & key signatures",
        "Write effective harmonic progressions with ease",
        "Structure intros, build-ups, drops & breakdowns",
        "Evolve loops into complete, flowing tracks",
        "Create musical narratives that keep listeners engaged",
      ],
    },
    {
      titolo: "Mix & Mastering Pro",
      disposizione: "destra",
      ordine: "gruppo-prima",
      rigaInvertita: true,
      immagini: [
        {
          src: "/webflow/producer-course/screenshot-2025-07-19-alle-11-53-35-copia.webp",
          alt: "",
          larghezza: 1042,
          altezza: 1349,
        },
        {
          src: "/webflow/producer-course/screenshot-2025-07-22-alle-15-06-57-copia.webp",
          alt: "",
          larghezza: 1956,
          altezza: 916,
        },
        {
          src: "/webflow/producer-course/screenshot-2025-07-21-alle-17-24-53.webp",
          alt: "PARISI opening an Ableton Project",
          larghezza: 1862,
          altezza: 1035,
        },
      ],
      voci: [
        "Use EQ, compression & stereo imaging with intention",
        "Follow a proven 8-step mastering method",
        "Achieve loudness, depth & clarity without distortion",
        "Get a competitive sound across all platforms",
        "Make your mix sound like a release-ready record",
      ],
    },
    {
      titolo: "Soft Skills",
      disposizione: "destra",
      immagini: [
        {
          src: "/webflow/producer-course/screenshot-2025-07-19-alle-11-54-04.webp",
          alt: "",
          larghezza: 1293,
          altezza: 1615,
        },
        {
          src: "/webflow/producer-course/screenshot-2025-07-21-alle-17-24-32.png",
          alt: "",
          larghezza: 1855,
          altezza: 1033,
        },
        {
          src: "/webflow/producer-course/g7cbun2lc4ovppj8q7x3.webp",
          alt: "Pete Tong and Diplo discussing music trends",
          larghezza: 2921,
          altezza: 1607,
        },
      ],
      /* Quattro voci invece di cinque, e l'ultima è copiata dal blocco
         "Mix & Mastering Pro": è così sul sito. */
      voci: [
        "Mindset and resilience",
        "Organization and time management",
        "Collaboration and effective communication",
        "Make your mix sound like a release-ready record",
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

/* ── Sezione 11: "Producer Talent Pool® Opportunities" ──────────────── */

export type OpportunitaCorso = {
  readonly titolo: string;
  readonly sottotitolo: string;
  readonly tono: "giallo" | "viola" | "rosso" | "verde";
  readonly logo: { readonly src: string; readonly alt: string };
};

export const TALENT_POOL = {
  eyebrow: "TALENT SCOUTING",
  titoloRiga1: "Producer Talent Pool®",
  titoloRiga2: "Opportunities",
  paragrafo:
    "Take part in entry-level Producer contests and curated challenges to sharpen your skills, gain visibility and sign with our internal and partner labels.",
  /* I toni seguono `.content-list-item-4.new-home-2.<colore>`, che è
     l'elemento su cui il foglio mette lo spicchio sopra i 480px. Sul terzo
     riquadro la classe colore sta solo sull'elemento esterno e quello interno
     resta al rosso di default: stesso risultato, stessa stranezza di
     dj-course. */
  opportunita: [
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "giallo",
      logo: { src: "/webflow/shared/white-ministry.png", alt: "Ministry of Sound Logo" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "viola",
      logo: { src: "/webflow/shared/white-defected.png", alt: "Defected Logo" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "rosso",
      logo: { src: "/webflow/shared/white-drumcode.png", alt: "Drumcode Logo" },
    },
    {
      titolo: "Official contests",
      sottotitolo: "Yearly",
      tono: "verde",
      logo: { src: "/webflow/shared/white-innervision.png", alt: "Innervision logo" },
    },
    {
      titolo: "Free Promotion",
      sottotitolo: "100% granted",
      tono: "giallo",
      logo: { src: "/webflow/shared/white-groove.png", alt: "Groover Logo" },
    },
  ] as readonly OpportunitaCorso[],
} as const;

/* ── Sezioni 14 e 15: "Related Courses" ─────────────────────────────── */

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
    href: "/mix-mastering-course",
    src: "/webflow/shared/mixcourse.png",
    alt: "",
    larghezza: 491,
    altezza: 923,
  },
];

/* ── Sezione 17: FAQ ────────────────────────────────────────────────── */

export const DOMANDE: readonly DomandaFaq[] = [
  {
    domanda: "What software or tools do I need to produce?",
    risposta:
      "You can start with free or trial versions of any DAW (e.g. Ableton, FL Studio, Logic etc. ). No hardware required.",
  },
  {
    domanda: "What kind of tracks will I be able to create?",
    risposta:
      "You’ll learn how to go from a blank project to a full track — drums, melodies, basslines, arrangements and effects.",
  },
  {
    domanda: "Are genre-specific styles covered?",
    risposta:
      "Yes. Techniques apply to any genre and you’ll also get genre-based templates and inspiration.",
  },
  {
    domanda: "Will I get downloadable samples and templates?",
    risposta:
      "Absolutely. Every module includes downloadable files and creative tools.",
  },
  {
    domanda: "Is the Production course part of the basic plan?",
    risposta:
      "Yes — if selected as your main course in a 1-course or higher plan.",
  },
  {
    domanda: "Do I unlock more production content with higher plans?",
    risposta:
      "Yes. More courses = more hours of content, resources, live mentoring and contest access.",
  },
  {
    domanda: "Can I pay monthly or annually?",
    risposta:
      "Yes. Choose what fits your budget: monthly or discounted yearly plans.",
  },
];

/* ── JSON-LD ────────────────────────────────────────────────────────────
   Copiato da `docs/webflow/meta/producer-course.json`, campo `jsonld`, senza
   toccare nulla: è già pubblicato e indicizzato così.
   ⚠️ `WebPage.name` ("Learn Music Production with the Pete Tong DJ Academy |
   Producer Course") NON coincide con il `<title>` della pagina, che nomina
   Diplo, PARISI e Âme. Differenza del sito. */

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": [
        "Organization",
        "EducationalOrganization"
      ],
      "@id": "https://www.petetong-djacademy.com/#organization",
      "name": "Pete Tong DJ Academy",
      "url": "https://www.petetong-djacademy.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67ba16cad5588af38e877220_logo-altra%20versionewhite.png"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#pete-tong",
      "name": "Pete Tong",
      "jobTitle": "DJ, broadcaster and founder",
      "sameAs": [
        "https://en.wikipedia.org/wiki/Pete_Tong"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#diplo",
      "name": "Diplo",
      "sameAs": [
        "https://en.wikipedia.org/wiki/Diplo"
      ]
    },
    {
      "@type": "MusicGroup",
      "@id": "https://www.petetong-djacademy.com/#parisi",
      "name": "PARISI"
    },
    {
      "@type": "MusicGroup",
      "@id": "https://www.petetong-djacademy.com/#ame",
      "name": "Âme",
      "sameAs": [
        "https://en.wikipedia.org/wiki/%C3%82me"
      ]
    },
    {
      "@type": "MusicGroup",
      "@id": "https://www.petetong-djacademy.com/#the-reloud",
      "name": "The Reloud"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.petetong-djacademy.com/producer-course#webpage",
      "url": "https://www.petetong-djacademy.com/producer-course",
      "name": "Learn Music Production with the Pete Tong DJ Academy | Producer Course",
      "description": "Master music production with our complete online Producer Course. Learn from Diplo, PARISI, Âme, and more. For aspiring and advanced producers. Start now.",
      "isPartOf": {
        "@id": "https://www.petetong-djacademy.com/#website"
      },
      "breadcrumb": {
        "@id": "https://www.petetong-djacademy.com/producer-course#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.petetong-djacademy.com/producer-course#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.petetong-djacademy.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Producer Course",
          "item": "https://www.petetong-djacademy.com/producer-course"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.petetong-djacademy.com/producer-course#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What software or tools do I need to produce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can start with free or trial versions of any DAW (e.g. Ableton, FL Studio, Logic etc. ). No hardware required."
          }
        },
        {
          "@type": "Question",
          "name": "What kind of tracks will I be able to create?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You’ll learn how to go from a blank project to a full track — drums, melodies, basslines, arrangements and effects."
          }
        },
        {
          "@type": "Question",
          "name": "Are genre-specific styles covered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Techniques apply to any genre and you’ll also get genre-based templates and inspiration."
          }
        },
        {
          "@type": "Question",
          "name": "Will I get downloadable samples and templates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Every module includes downloadable files and creative tools."
          }
        },
        {
          "@type": "Question",
          "name": "Is the Production course part of the basic plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — if selected as your main course in a 1-course or higher plan."
          }
        },
        {
          "@type": "Question",
          "name": "Do I unlock more production content with higher plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. More courses = more hours of content, resources, live mentoring and contest access."
          }
        },
        {
          "@type": "Question",
          "name": "Can I pay monthly or annually?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Choose what fits your budget: monthly or discounted yearly plans."
          }
        }
      ]
    },
    {
      "@type": "Course",
      "@id": "https://www.petetong-djacademy.com/producer-course#course",
      "name": "Producer Course",
      "description": "Complete online music production course taught by Pete Tong, Diplo, PARISI, Âme and The Reloud. Covers producer mindset, drums and sound design, bass, synthesis, music theory and arrangement, vocals, mixing and mastering, and music career strategy. Includes subtitles in English, Spanish, French, Portuguese and Italian.",
      "url": "https://www.petetong-djacademy.com/producer-course",
      "provider": {
        "@id": "https://www.petetong-djacademy.com/#organization"
      },
      "inLanguage": "en",
      "educationalLevel": "Beginner & Advanced",
      "educationalCredentialAwarded": "Official certificate",
      "instructor": [
        {
          "@id": "https://www.petetong-djacademy.com/#pete-tong"
        },
        {
          "@id": "https://www.petetong-djacademy.com/#diplo"
        },
        {
          "@id": "https://www.petetong-djacademy.com/#parisi"
        },
        {
          "@id": "https://www.petetong-djacademy.com/#ame"
        },
        {
          "@id": "https://www.petetong-djacademy.com/#the-reloud"
        }
      ],
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "location": {
          "@type": "VirtualLocation",
          "url": "https://www.petetong-djacademy.com"
        }
      },
      "offers": [
        {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": "57.00",
          "highPrice": "288.00",
          "offerCount": 6,
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": "57.00",
          "highPrice": "288.00",
          "offerCount": 6,
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "AggregateOffer",
          "priceCurrency": "GBP",
          "lowPrice": "57.00",
          "highPrice": "288.00",
          "offerCount": 6,
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  ]
} as const;
