/*
 * Testi, immagini e metadati della home (`/`).
 *
 * Ogni stringa è copiata da `docs/webflow/html/home.html` (verità ultima) e
 * confrontata con `docs/webflow/outline/home.md`. Non si riscrive, non si
 * traduce, non si corregge: quello che sul sito è scritto storto resta storto
 * ("Student's Success Stories" con l'apostrofo, "The Courses is designed",
 * "Students' Trending Opportunities"). Se una parola sembra sbagliata, è
 * sbagliata sul sito.
 *
 * - `META` e `JSON_LD`: copiati da `docs/webflow/meta/home.json`.
 * - `DOMANDE`: le 15 domande della FAQ della home (le altre cinque pagine ne
 *   hanno 7 ciascuna).
 * - Listino, recensioni, "More Than a Course" e popup non stanno qui: sono
 *   identici su più pagine e vivono in `condivisi.ts`.
 *
 * ⚠️ `OPPORTUNITA` ripete parola per parola il contenuto di
 * `play-get-signed.ts`: sul sito le due sezioni sono lo stesso blocco con un
 * titolo diverso. Sta qui e non in `condivisi.ts` per la convenzione del repo
 * ("un file di testi per pagina") e per non toccare un file condiviso mentre
 * altre pagine sono in lavorazione; nel report c'è la proposta di unificarlo.
 */

import type { CorsoInVetrina } from "@/components/sections/SliderCorsi";
import type { ImmagineSuccesso } from "@/components/sections/SuccessStories";
import type { DomandaFaq } from "@/testi/condivisi";
import type {
  Opportunita,
  PannelloOpportunita,
} from "@/testi/play-get-signed";

/* ── Metadati ───────────────────────────────────────────────────────── */

export const META = {
  title: "Pete Tong DJ Academy – Online DJ & Producer Courses",
  description:
    "Learn online with Grammy‑winning DJs and producers. Comprehensive DJ, music production & mixing courses. Join our Talent Pool and launch your career.",
  /* Senza `/` finale: è così nel `<link rel="canonical">` della pagina, mentre
     `og:url` ce l'ha. Si copiano tutti e due come stanno. */
  canonical: "https://www.petetong-djacademy.com",
  ogImage:
    "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67c72a69971bade6763459e4_IMMAGINE%20ACADEMY.png",
  ogUrl: "https://www.petetong-djacademy.com/",
  ogSiteName: "Pete Tong DJ Academy",
} as const;

/* ── Sezione 1: hero ────────────────────────────────────────────────── */

export type ImmagineMuro = {
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
};

export const HERO = {
  /* `h1.heading-2.homepage.new-home.new-font.new-home-2`, con un `<br>`. */
  titoloRiga1: "Become the",
  titoloRiga2: "DJ and Producer the world wants to hear",
  paragrafo:
    "Learn online with incredible Grammy-award winning producers and global DJs. Follow our proven learning structure, enter monthly contests to play real gigs and get signed by established record labels.",
  /* `img.image-44`: il logo "Ableton Certified Training Center". */
  logo: {
    src: "/webflow/home/abletonctr.png",
    alt: "",
    larghezza: 1696,
    altezza: 442,
  },
  prezzo: { prima: "starting from", dopo: " per month" },
  cta: { testo: "Sign Up Now", href: "/pricing-page" },
  trustpilot: {
    prima: "Trusted by hundreds on ",
    link: "Trustpilot 4.7 ★",
    href: "https://it.trustpilot.com/review/petetong-djacademy.com?languages=all",
  },
} as const;

/*
 * Il muro di immagini della hero: `div.hero-images.desktop` (tre colonne) più
 * due strisce che esistono solo sotto i 480px.
 *
 * 41 immagini sul desktop e 28 sul telefono, alcune ripetute fra un blocco e
 * l'altro (e `22.png` compare due volte nella stessa colonna `_2`): sono i
 * doppioni del sito, si riproducono. Con il logo Ableton della colonna di
 * sinistra fanno le 70 immagini della hero.
 *
 * Le due strisce mobile NON sono la copia di due colonne desktop: la prima
 * ripete la colonna `_1` ma con `2-min.png` al posto di `3.webp`, la seconda
 * ripete la colonna `_3` per intero. Anche questo è del sito.
 */

const MURO_COLONNA_1: readonly ImmagineMuro[] = [
  { src: "/webflow/home/20-min.png", alt: "Âme in a music studio with audio equipment behind them.", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/9-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/1-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/4-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/8-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/13-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/21-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/10-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/3.webp", alt: "", larghezza: 1080, altezza: 1080 },
  { src: "/webflow/home/3-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/15-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/12-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/5-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/7-min.png", alt: "", larghezza: 540, altezza: 540 },
];

const MURO_COLONNA_2: readonly ImmagineMuro[] = [
  { src: "/webflow/home/34.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/24.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/30.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/23.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/36.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/22.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/31.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/32.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/14-min.png", alt: "Jack and Marco Parisi during an Interview", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/27.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/7-min-468125.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/12-min-b04a7a.png", alt: "Carl Cox, tutor at Pete Tong DJ Academy, playing in front of a big crowd", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/22.png", alt: "", larghezza: 540, altezza: 540 },
];

const MURO_COLONNA_3: readonly ImmagineMuro[] = [
  { src: "/webflow/home/35.png", alt: "Man wearing cap and hoodie adjusting controls at a professional audio mixing console in a studio.", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/18-min.png", alt: "Diplo teaching at Pete Tong DJ Academy", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/3-min-232afa.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/25.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/28.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/16-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/23-75efc0.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/33.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/19-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/13-min-d80513.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/26.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/22-b96d7f.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/10-min-19fe0b.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/9-min-c78e74.png", alt: "", larghezza: 540, altezza: 540 },
];

const MURO_MOBILE_ALTO: readonly ImmagineMuro[] = [
  { src: "/webflow/home/20-min.png", alt: "Âme in a music studio with audio equipment behind them.", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/9-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/1-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/4-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/8-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/13-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/21-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/10-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/2-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/3-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/15-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/12-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/5-min.png", alt: "", larghezza: 540, altezza: 540 },
  { src: "/webflow/home/7-min.png", alt: "", larghezza: 540, altezza: 540 },
];

const MURO_MOBILE_BASSO: readonly ImmagineMuro[] = MURO_COLONNA_3;

export const MURO = {
  colonna1: MURO_COLONNA_1,
  colonna2: MURO_COLONNA_2,
  colonna3: MURO_COLONNA_3,
  mobileAlto: MURO_MOBILE_ALTO,
  mobileBasso: MURO_MOBILE_BASSO,
} as const;

/* ── Sezioni 2 e 3: docenti ───────────────────────────────────
 *
 * ⚠️ DEVIAZIONE VOLUTA dal sito Webflow, richiesta di Matteo del 2026-09-15.
 * L'''occhiello "YOUR TEACHERS" e le undici slide del carosello dei docenti
 * stavano qui e sono stati tolti: la home monta `DocentiAcademy`, che prende
 * titolo e persone da `src/testi/docenti.ts` (i testi delle landing beginner).
 * Le foto Webflow in `public/webflow/` restano dove sono: sono il riferimento
 * degli screenshot.
 *
 * Resta `eyebrowPartner`, che sul sito è l'''ultimo figlio dello stesso blocco
 * del carosello ma appartiene alla striscia dei loghi qui sotto, non ai
 * docenti: quella parte della home non cambia.
 */

export const DOCENTI = {
  /* `p.section-subtitle.negative.new-home-2`, l'''occhiello sopra i loghi. */
  eyebrowPartner: "PARTNERS",
} as const;

/* ── Sezione 4: la striscia dei 22 loghi ────────────────────────────── */

export type LogoBrand = {
  readonly src: string;
  readonly alt: string;
  readonly larghezza: number;
  readonly altezza: number;
  /** L'attributo `width` dell'HTML: è la larghezza a cui il logo va reso. */
  readonly larghezzaResa: number;
};

/*
 * `div.brand-slider-wrapper` con tre `div.brand-slider-list` da 8, 7 e 7 loghi.
 *
 * ⚠️ Le tre liste non sono identiche: la prima ha anche Groover, e IMS Ibiza
 * passa da `width="90"` nella prima a `width="120"` nelle altre due. Gli `alt`
 * ci sono solo nella prima lista (più Defected, che ce l'ha in tutte e tre).
 * Sono i doppioni e le disattenzioni del sito: si riproducono.
 */
export const BRAND: readonly (readonly LogoBrand[])[] = [
  [
    { src: "/webflow/home/elogolivtello-1-1.png", alt: "elrow Logo", larghezza: 429, altezza: 164, larghezzaResa: 214.5 },
    { src: "/webflow/home/alpha.png", alt: "AlphaTheta Logo", larghezza: 1254, altezza: 284, larghezzaResa: 250 },
    { src: "/webflow/home/pioneer-dj-logo-march15-white-on-black-1.png", alt: "Pioneer DJ Logo", larghezza: 399, altezza: 218, larghezzaResa: 250 },
    { src: "/webflow/home/ebeatporttrans.png", alt: "Beatport Logo", larghezza: 464, altezza: 143, larghezzaResa: 232 },
    { src: "/webflow/home/09.png", alt: "IMS Ibiza Logo", larghezza: 415, altezza: 366, larghezzaResa: 90 },
    { src: "/webflow/home/kdefectedtrans2.png", alt: "Defected Logo", larghezza: 1113, altezza: 217, larghezzaResa: 230 },
    { src: "/webflow/home/groover.png", alt: "", larghezza: 626, altezza: 100, larghezzaResa: 220 },
    { src: "/webflow/home/rinradiowhite.png", alt: "", larghezza: 380, altezza: 241, larghezzaResa: 140 },
  ],
  [
    { src: "/webflow/home/elogolivtello-1-1.png", alt: "", larghezza: 429, altezza: 164, larghezzaResa: 214.5 },
    { src: "/webflow/home/alpha.png", alt: "", larghezza: 1254, altezza: 284, larghezzaResa: 250 },
    { src: "/webflow/home/pioneer-dj-logo-march15-white-on-black-1.png", alt: "", larghezza: 399, altezza: 218, larghezzaResa: 250 },
    { src: "/webflow/home/ebeatporttrans.png", alt: "", larghezza: 464, altezza: 143, larghezzaResa: 232 },
    { src: "/webflow/home/09.png", alt: "", larghezza: 415, altezza: 366, larghezzaResa: 120 },
    { src: "/webflow/home/kdefectedtrans2.png", alt: "Defected Logo", larghezza: 1113, altezza: 217, larghezzaResa: 230 },
    { src: "/webflow/home/rinradiowhite.png", alt: "", larghezza: 380, altezza: 241, larghezzaResa: 140 },
  ],
  [
    { src: "/webflow/home/elogolivtello-1-1.png", alt: "", larghezza: 429, altezza: 164, larghezzaResa: 214.5 },
    { src: "/webflow/home/alpha.png", alt: "", larghezza: 1254, altezza: 284, larghezzaResa: 250 },
    { src: "/webflow/home/pioneer-dj-logo-march15-white-on-black-1.png", alt: "", larghezza: 399, altezza: 218, larghezzaResa: 250 },
    { src: "/webflow/home/ebeatporttrans.png", alt: "", larghezza: 464, altezza: 143, larghezzaResa: 232 },
    { src: "/webflow/home/09.png", alt: "", larghezza: 415, altezza: 366, larghezzaResa: 120 },
    { src: "/webflow/home/kdefectedtrans2.png", alt: "Defected Logo", larghezza: 1113, altezza: 217, larghezzaResa: 230 },
    { src: "/webflow/home/rinradiowhite.png", alt: "", larghezza: 380, altezza: 241, larghezzaResa: 140 },
  ],
];

/* ── Sezioni 5 e 6: "LEARNING / Our Courses" e le tre card ──────────── */

export const CORSI_INTRO = {
  eyebrow: "LEARNING",
  titoloPrima: "Our",
  /* `span.text-span-108`, peso 600. Lo spazio iniziale è nell'HTML. */
  titoloEvidenziato: " Courses",
  paragrafo:
    "Start your journey with the DJ or Production courses. Combine them both, or unlock the full experience with our Advanced Mixing & Mastering course.",
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

/* ── Sezione 7: virtual tour ────────────────────────────────────────── */

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

/* ── Sezione 8: "TALENT SCOUTING / Play & Get Signed" ───────────────── */

export const PLAY_GET_SIGNED = {
  eyebrow: "TALENT SCOUTING",
  /* `h2.section-title-heading.p4`: "Play" e "Signed" in `<span>` a peso 600,
     " & Get " fra i due. Gli spazi sono quelli dell'HTML. */
  titoloPlay: "Play",
  titoloMezzo: " & Get ",
  titoloSigned: "Signed",
  paragrafo:
    "Our students perform and share their music with our internal labels. Plus enter activations to access global leading partner labels, clubs, and festivals.",
  /* `img.image-15.only-mobile`: 400px, visibile solo sotto i 480px. */
  immagineMobile: {
    src: "/webflow/home/play-and-get-vert.png",
    alt: "",
    larghezza: 274,
    altezza: 487,
  },
  /* `img.image-15.only-desk.img-onlydesk`: 500px, nascosta sotto i 480px. */
  immagineDesktop: {
    src: "/webflow/home/play-and-get-quad.webp",
    alt: "Play & Get Signed at the Pete Tong Academy - Infographic.",
    larghezza: 497,
    altezza: 497,
  },
  cta: { testo: "See How To Level Up", href: "/play-get-signed" },
} as const;

/* ── Sezione 9: "Students' Trending Opportunities" ──────────────────── */

const LOGO_PACHA = { src: "/webflow/shared/white-pacha.png", alt: "", larghezza: 164, altezza: 164 } as const;
const LOGO_ELROW = { src: "/webflow/shared/white-elrow.png", alt: "", larghezza: 163, altezza: 163 } as const;
const LOGO_ADE = { src: "/webflow/shared/white-ade.png", alt: "", larghezza: 164, altezza: 163 } as const;
const LOGO_BEATPORT = { src: "/webflow/shared/white-beatport.png", alt: "", larghezza: 163, altezza: 163 } as const;
const LOGO_APPLE = { src: "/webflow/shared/white-apple.png", alt: "", larghezza: 163, altezza: 164 } as const;
const LOGO_MINISTRY = { src: "/webflow/shared/white-ministry.png", alt: "", larghezza: 163, altezza: 164 } as const;
const LOGO_DEFECTED = { src: "/webflow/shared/white-defected.png", alt: "Defected Logo", larghezza: 163, altezza: 163 } as const;
const LOGO_DRUMCODE = { src: "/webflow/shared/white-drumcode.png", alt: "Drumcode Logo", larghezza: 163, altezza: 163 } as const;
const LOGO_INNERVISION = { src: "/webflow/shared/white-innervision.png", alt: "Innervision logo", larghezza: 163, altezza: 163 } as const;
const LOGO_GROOVER = { src: "/webflow/shared/white-groove.png", alt: "Groover Logo", larghezza: 163, altezza: 163 } as const;

const OPPORTUNITA_DJ: readonly Opportunita[] = [
  { titolo: "Play Official Slot", sottotitolo: "Summer slots", tono: "giallo", logo: LOGO_PACHA },
  { titolo: "Play Elrow Slot", sottotitolo: "Yearly Contest", tono: "viola", logo: LOGO_ELROW },
  { titolo: "Play Official Slot", sottotitolo: "Yearly Contest", tono: "rosso", logo: LOGO_ADE },
  { titolo: "DJ Mix", sottotitolo: "Every Month", tono: "verde", logo: LOGO_BEATPORT },
  { titolo: "DJ Mix", sottotitolo: "Every Month", tono: "giallo", logo: LOGO_APPLE },
];

const OPPORTUNITA_PRODUCER_DESKTOP: readonly Opportunita[] = [
  { titolo: "Play and Release", sottotitolo: "Yearly", tono: "giallo", logo: LOGO_MINISTRY },
  { titolo: "Official Contest", sottotitolo: "Yearly", tono: "viola", logo: LOGO_DEFECTED },
  { titolo: "Selections", sottotitolo: "Yearly", tono: "rosso", logo: LOGO_DRUMCODE },
  { titolo: "Release Slot", sottotitolo: "Yearly", tono: "verde", logo: LOGO_INNERVISION },
  { titolo: "Free Promotion", sottotitolo: "Yearly", tono: "giallo", logo: LOGO_GROOVER },
];

const OPPORTUNITA_PRODUCER_MOBILE: readonly Opportunita[] = [
  { titolo: "Official contests", sottotitolo: "Yearly", tono: "giallo", logo: LOGO_MINISTRY },
  { titolo: "Official contests", sottotitolo: "Yearly", tono: "viola", logo: LOGO_DEFECTED },
  { titolo: "Official contests", sottotitolo: "Yearly", tono: "rosso", logo: LOGO_DRUMCODE },
  { titolo: "Official contests", sottotitolo: "Yearly", tono: "verde", logo: LOGO_INNERVISION },
  { titolo: "Free Promotion", sottotitolo: "Yearly", tono: "giallo", logo: LOGO_GROOVER },
];

/*
 * ⚠️ Come su `/play-get-signed`, i due pannelli Producers dicono cose diverse
 * (voci e paragrafo) e non è un errore di copiatura: è così nell'HTML.
 * Qui cambia solo il titolo della sezione rispetto a quella pagina.
 */
export const OPPORTUNITA = {
  id: "opportunities",
  titoloRiga1: "Students' Trending",
  titoloRiga2: "Opportunities",
  toggle: { producers: "Producers", djs: "DJs" },

  pannelloDj: {
    titolo: "DJs",
    tonoTitolo: "giallo",
    paragrafo:
      "Take part in entry-level DJ contests and curated challenges to sharpen your skills, gain visibility and access advanced opportunities once you're ready.",
    opportunita: OPPORTUNITA_DJ,
  } as PannelloOpportunita,

  pannelloProducerDesktop: {
    titolo: "Producers",
    tonoTitolo: "arancio",
    paragrafo:
      "Start with simple production briefs and submit your tracks for early-stage feedback, internal labels, or global leading labels and partners.",
    opportunita: OPPORTUNITA_PRODUCER_DESKTOP,
  } as PannelloOpportunita,

  pannelloProducerMobile: {
    paragrafo:
      "Start with simple production briefs and submit your tracks for early-stage feedback from label scouts.",
    opportunita: OPPORTUNITA_PRODUCER_MOBILE,
  } as PannelloOpportunita,
} as const;

/* ── Sezione 10: "Student's Success Stories" ────────────────────────── */

/*
 * Le stesse otto immagini di `/play-get-signed`, ma con gli `alt` dell'HTML
 * della home, che sono più corti. Vince la pagina che si sta ricostruendo.
 * "Student's" con l'apostrofo è del sito.
 */
export const SUCCESS_STORIES = {
  titoloPrima: "Student's",
  titoloEvidenziato: "Success Stories",
  immagini: [
    { src: "/webflow/shared/victoria-whynot.jpg", alt: "Victoria WHYNOT & Carl Cox", larghezza: 450, altezza: 800, priorita: true },
    { src: "/webflow/shared/constanza-pucheta.jpg", alt: "Constanza Pucheta at Amnesia", larghezza: 450, altezza: 800 },
    { src: "/webflow/shared/tavola-da-disegno-15.jpg", alt: "Academy Students at PACHA", larghezza: 450, altezza: 800, priorita: true },
    { src: "/webflow/shared/tavola-da-disegno-8.jpg", alt: "Maya Live at Green Valley", larghezza: 450, altezza: 800 },
    { src: "/webflow/shared/tavola-da-disegno-12.png", alt: "Cozmic Cat x HE.SHE.THEY. ", larghezza: 540, altezza: 960 },
    { src: "/webflow/shared/tavola-da-disegno-14.png", alt: "2Nomads at Bauman Festival", larghezza: 540, altezza: 960 },
    { src: "/webflow/shared/tavola-da-disegno-9.png", alt: "DJ Suni Side Up from the PTDJA", larghezza: 540, altezza: 960 },
    { src: "/webflow/shared/tavola-da-disegno-16.png", alt: "Pharma D opening Ibiza Classics, with Pete Tong", larghezza: 540, altezza: 960 },
  ] as readonly ImmagineSuccesso[],
} as const;

/* ── Sezione 14: le 15 domande della FAQ ────────────────────────────── */

/*
 * ⚠️ Gli `\n` dentro le risposte sono i `<br>` dell'HTML. Il componente `Faq`
 * condiviso rende la risposta in un solo `<p>` senza `whitespace-pre-line`,
 * quindi a schermo diventano spazi. Non si vede: le risposte sono chiuse
 * (altezza zero) finché non si clicca, e nello screenshot di riferimento sono
 * tutte chiuse. La proposta di modifica al componente è nel report.
 */
export const DOMANDE: readonly DomandaFaq[] = [
  {
    domanda: "What types of courses are available?",
    risposta:
      "You can choose from three main paths: DJing, Music Production and Mixing & Mastering. You can take one, two, or all three — based on your goals.",
  },
  {
    domanda: "Is this suitable for beginners?",
    risposta:
      "Yes! The Courses is designed for all levels — whether you're just starting out or already have experience.",
  },
  {
    domanda: "Is this for any music genre?",
    risposta:
      "Absolutely. Whether you're into techno, house, hip hop, EDM, afrobeat or experimental, the skills you learn apply across all genres.",
  },
  /* Le tre risposte che nell'HTML hanno `<strong>` e `<br>`: arrivano come
     righe di segmenti invece che come stringa, perché un `\n` dentro una
     stringa in HTML vale uno spazio e quei capoverso sparivano. Gli `‍`
     (ZWJ) sono nell'HTML del sito: si copiano. */
  {
    domanda: "How many lessons are included?",
    risposta: [
      [
        {
          grassetto: false,
          testo:
            "Each course includes structured video lessons, practical exercises, downloadable resources, and tests. The total number of lessons depends on your plan:",
        },
      ],
      [],
      [
        { grassetto: false, testo: "✅ " },
        { grassetto: true, testo: "1 course" },
        { grassetto: false, testo: ": over " },
        { grassetto: true, testo: "130 lessons" },
      ],
      [
        { grassetto: false, testo: "✅ " },
        { grassetto: true, testo: "2 courses" },
        { grassetto: false, testo: ": over " },
        { grassetto: true, testo: "330 lessons" },
      ],
      [
        { grassetto: false, testo: "✅ " },
        { grassetto: true, testo: "3 full paths" },
        { grassetto: false, testo: ": over " },
        { grassetto: true, testo: "350 lessons" },
        {
          grassetto: false,
          testo: ", covering DJing, Production & Mastering.",
        },
      ],
    ],
  },
  {
    domanda: "What’s included in a subscription?",
    risposta: [
      [
        {
          grassetto: false,
          testo:
            "Every subscription — no matter which plan you choose — gives you access to a powerful set of tools and resources to support your journey as a DJ and Music Producer.",
        },
      ],
      [],
      [
        { grassetto: false, testo: "‍" },
        { grassetto: true, testo: "Included in every plan:" },
      ],
      [{ grassetto: true, testo: "‍" }],
      [
        { grassetto: true, testo: "‍• 24/7 support" },
        { grassetto: false, testo: " through " },
        { grassetto: true, testo: "AI tutors" },
        { grassetto: false, testo: ", available anytime for guidance" },
      ],
      [
        { grassetto: true, testo: "• Weekly live mentoring" },
        {
          grassetto: false,
          testo: " sessions with professional DJs and producers",
        },
      ],
      [
        { grassetto: true, testo: "• Downloadable templates" },
        {
          grassetto: false,
          testo: ", guides, sample packs, and project files",
        },
      ],
      [
        { grassetto: true, testo: "• Weekly perks " },
        {
          grassetto: false,
          testo: "with fresh creative content, challenges, and bonuses",
        },
      ],
      [
        { grassetto: true, testo: "•" },
        { grassetto: false, testo: " Full access from both " },
        { grassetto: true, testo: "desktop and mobile" },
      ],
      [
        { grassetto: true, testo: "• Multilingual subtitles" },
        {
          grassetto: false,
          testo: " (English, French, Spanish, Portuguese)",
        },
      ],
      [
        { grassetto: true, testo: "• " },
        { grassetto: false, testo: "An " },
        { grassetto: true, testo: "official Academy Certificate" },
        { grassetto: false, testo: " for each course you complete" },
      ],
      [
        { grassetto: true, testo: "• " },
        {
          grassetto: false,
          testo: "Entry to exclusive DJ contests to compete and ",
        },
        { grassetto: true, testo: "gain visibility" },
      ],
      [
        { grassetto: true, testo: "• Access to our Label Radar" },
        { grassetto: false, testo: ", where producers can get discovered" },
      ],
      [],
      [{ grassetto: true, testo: "The only difference?" }],
      [
        {
          grassetto: false,
          testo:
            "The more courses your plan includes, the more lessons, skill areas, and career opportunities you unlock — from DJing, to production, to professional mastering.",
        },
      ],
      [
        {
          grassetto: false,
          testo:
            "Choose your plan based on how far you want to go — and grow.",
        },
      ],
    ],
  },
  {
    domanda: "What do I need to get started?",
    risposta: [
      [
        { grassetto: false, testo: "For " },
        { grassetto: true, testo: "DJing" },
        {
          grassetto: false,
          testo: ": just a laptop and internet connection. ",
        },
      ],
      [
        { grassetto: false, testo: "For " },
        { grassetto: true, testo: "Production" },
        { grassetto: false, testo: ": a computer and headphones are enough." },
      ],
    ],
  },
  {
    domanda: "Can I access the platform on any device?",
    /* Lo spazio iniziale è nell'HTML. */
    risposta: " Yes. It works seamlessly on desktop, tablet, and mobile.",
  },
  {
    domanda: "What languages are supported?",
    risposta:
      "Courses come with subtitles in English, French, and Spanish (more languages coming soon).",
  },
  {
    domanda: "Can I get discovered or signed to a label?",
    risposta:
      "Yes. By joining our contests, talent pool, and label radar network, you'll gain exposure and real opportunities.",
  },
  {
    domanda: "Will I receive a certificate?",
    risposta:
      "Yes. Each course comes with an official completion certificate, recognized across the industry.",
  },
  {
    domanda: "Will I get feedback on my work?",
    risposta:
      "Definitely. Weekly live mentor sessions and talent pool activities give you personal feedback and improvement tips.",
  },
  {
    domanda: "How much does it cost?",
    risposta:
      "Plans start at just $13/month, with flexible options depending on how many courses and features you want access to.",
  },
  {
    domanda: "Can I cancel anytime?",
    risposta:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time.",
  },
  {
    domanda: "Is personal support available?",
    risposta:
      "Yes! You get 24/7 AI tutoring for instant help, plus access to weekly live mentorship sessions with professionals.",
  },
  {
    domanda: "What if I have questions or need help?",
    risposta:
      "You can reach us anytime through the platform’s chat or email support, or get answers from the community and mentors.",
  },
];

/* ── JSON-LD ────────────────────────────────────────────────────────────
 *
 * Copiato tale quale da `docs/webflow/meta/home.json`. Nessuna riga aggiunta,
 * nessuna tolta: il `@graph` con Organization, Person, WebSite e WebPage è
 * quello che il sito serve oggi.
 */

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": "https://www.petetong-djacademy.com/#organization",
      name: "Pete Tong DJ Academy",
      alternateName: "PTDJA",
      url: "https://www.petetong-djacademy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67ba16cad5588af38e877220_logo-altra%20versionewhite.png",
      },
      description:
        "Connecting thousands of DJs and producers in 140 countries, the go-to platform for aspiring and seasoned artists. Build your skills, collaborate with peers, and hit top-tier gigs.",
      founder: { "@id": "https://www.petetong-djacademy.com/#pete-tong" },
      sameAs: [
        "https://www.instagram.com/petetong_djacademy/",
        "https://www.tiktok.com/@petetong_djacademy",
        "https://www.youtube.com/@petetongdjacademy",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#pete-tong",
      name: "Pete Tong",
      jobTitle: "DJ, broadcaster and founder",
      sameAs: ["https://en.wikipedia.org/wiki/Pete_Tong"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.petetong-djacademy.com/#website",
      url: "https://www.petetong-djacademy.com",
      name: "Pete Tong DJ Academy",
      publisher: { "@id": "https://www.petetong-djacademy.com/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.petetong-djacademy.com/#webpage",
      url: "https://www.petetong-djacademy.com/",
      name: "Pete Tong DJ Academy – Online DJ & Producer Courses",
      description:
        "Start your journey with the DJ or Production courses. Combine them both, or unlock the full experience with the Advanced Mixing & Mastering course.",
      isPartOf: { "@id": "https://www.petetong-djacademy.com/#website" },
    },
  ],
} as const;
