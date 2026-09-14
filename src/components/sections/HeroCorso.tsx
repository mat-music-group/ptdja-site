"use client";

import Image from "next/image";
import Link from "next/link";
import { usePaese } from "@/lib/usePaese";
import { visibilePerPaese } from "@/lib/geo";
import { LISTINO, VALUTE } from "@/testi/condivisi";

/*
 * La hero delle tre pagine corso: `section.hero-section-two-2.newheader`.
 *
 * ⚠️ Il nome della classe dice "header" ma questa è la HERO della pagina, non
 * l'intestazione del sito (`docs/webflow/README.md`, sezione "Header e footer
 * hanno varianti"). L'header vero è `SiteHeader`, montato prima.
 *
 * ── Due volte lo stesso blocco prezzo + CTA + Trustpilot ──────────────
 * Sul sito il gruppo "starting from $13 per month / Sign Up Now / Trusted by
 * hundreds on Trustpilot" compare due volte nel DOM:
 *
 *   1. dentro la colonna di sinistra (`div.hero-content-3…mob`), che il CSS
 *      spegne sotto i 480px;
 *   2. in fondo alla sezione (`div.container-65…hidemob`), che esiste SOLO
 *      sotto i 480px.
 *
 * Non è un doppione da ripulire: sono due posizioni diverse nel flusso, e sul
 * telefono il gruppo deve stare sotto l'immagine, non sopra. Qui sono
 * riprodotti tutti e due con le stesse visibilità.
 *
 * ── Il prezzo è geo-gated ─────────────────────────────────────────────
 * Stesso meccanismo del listino (`PricingPlans` + `src/lib/geo.ts`): le tre
 * valute stanno tutte e tre nell'HTML servito, `[data-geo]` in `globals.css`
 * le nasconde, e al primo frame dopo l'idratazione `geo-visibile` accende
 * quella del paese stimato. Gli elenchi di paesi sono gli stessi del listino
 * (`VALUTE` in `condivisi.ts`), verificati uno per uno sull'HTML della hero.
 *
 * ── Misure ────────────────────────────────────────────────────────────
 * Dal foglio Webflow, confermate misurando il sito live a 1440 e a 390:
 *   sezione            padding 60px 30px (30px sotto a ≤479)
 *   .section-title-16  gap 30 (20 a ≤479), padding-bottom 40 (30 a ≤479)
 *   .container-66      max-width 1380 → 768 a ≤991 → 600 a ≤767, padding
 *                      laterale 30px che sotto i 480 va a zero
 *   .hero-wrapper-8    riga con gap 50; colonna con gap 80 a ≤991 e
 *                      padding-bottom 50 (20 a ≤767)
 *   .hero-left-block-3 max-width 580, gap 32 (20 a ≤479)
 *   .hero-content-6    gap 24 (20 a ≤479)
 *   .hero-image-wrapper-3  668×560 → 390 di altezza a ≤767 → 250 a ≤479
 *   .hero-main-image-5     altezza 468, che a ≤991 diventa il 100%
 */

export type ProprietaHeroCorso = {
  readonly eyebrow: string;
  readonly titolo: string;
  readonly paragrafo: {
    readonly prima: string;
    readonly grassetto: string;
    readonly dopo: string;
    readonly secondaRiga: string;
  };
  readonly prezzo: { readonly prima: string; readonly dopo: string };
  readonly cta: { readonly testo: string; readonly href: string };
  readonly trustpilot: {
    readonly prima: string;
    readonly link: string;
    readonly href: string;
  };
  readonly immagine: {
    readonly src: string;
    readonly alt: string;
    readonly larghezza: number;
    readonly altezza: number;
  };
};

export function HeroCorso({
  eyebrow,
  titolo,
  paragrafo,
  prezzo,
  cta,
  trustpilot,
  immagine,
}: ProprietaHeroCorso) {
  const paese = usePaese();

  return (
    <section className="block bg-sfondo px-[30px] py-[60px] max-sm:pb-[30px]">
      {/* `.section-title-16.new-home-2.course-page.dj-course` */}
      <div className="flex w-full flex-col items-center justify-start gap-[30px] pb-10 text-left max-sm:gap-5 max-sm:pb-[30px]">
        {/* `.section-subtitle-41.negative.new-home-2.top-title-head` */}
        <p className="mt-[30px] pb-0 text-center text-base font-light uppercase leading-[180%] tracking-normal text-bianco opacity-70 max-sm:leading-[16px]">
          {eyebrow}
        </p>
      </div>

      {/* `.container-66.header-space--mob.w-container` */}
      <div className="mx-auto w-auto max-w-sito px-[30px] text-center max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:px-0">
        {/* `.hero-wrapper-8` */}
        <div className="flex items-center justify-between gap-[50px] max-lg:flex-col max-lg:gap-20 max-lg:pb-[50px] max-md:pb-5 max-sm:gap-[50px]">
          {/* `.hero-left-block-3` */}
          <div className="flex w-full max-w-[580px] flex-col items-start justify-center gap-8 max-lg:items-center max-lg:text-center max-sm:gap-5">
            {/* `.hero-content-6` */}
            <div className="flex flex-col gap-6 max-sm:gap-5">
              {/* `.heading-15` + `span.text-span-310` (crema). */}
              <h1 className="m-0 text-left text-[72px] font-medium leading-[115%] tracking-[-3.5px] text-crema max-lg:text-[55px] max-md:text-[42px] max-sm:text-center max-sm:text-[34px]">
                <span>{titolo}</span>
                <br />
              </h1>

              {/* `p._w-490-4` */}
              <p className="m-0 text-left text-[20px] font-normal leading-[180%] tracking-[-0.8px] text-bianco max-lg:text-[15px] max-sm:text-center">
                {paragrafo.prima}
                <strong className="font-bold">{paragrafo.grassetto}</strong>
                {paragrafo.dopo}
                <br />
                {paragrafo.secondaRiga}
                <br />
              </p>

              {/* `.hero-content-3.new-home-2.home-button-container.mob`:
                  `display: none` sotto i 480px. */}
              <div className="flex flex-col gap-0 max-sm:hidden">
                <PrezzoGeo prezzo={prezzo} paese={paese} />
                <CtaHero testo={cta.testo} href={cta.href} variante="colonna" />
                <FraseTrustpilot trustpilot={trustpilot} />
              </div>
            </div>
          </div>

          {/* `.hero-image-wrapper-3` (il gradiente `.gradient-h2` non si
              disegna: nel foglio è `display: none` a ogni breakpoint). */}
          <div className="relative z-[1] h-[560px] w-full max-w-[668px] max-md:h-[390px] max-sm:h-[250px]">
            {/* `.hero-main-image-5` */}
            <div className="relative z-[1] h-[468px] w-full overflow-hidden max-lg:h-full">
              <Image
                src={immagine.src}
                alt={immagine.alt}
                width={immagine.larghezza}
                height={immagine.altezza}
                className="h-full w-full rounded-[12px] object-cover object-left-top"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* `.container-65.brands.new-home-2.space.hidemob`: esiste solo sotto i
          480px, dove ripete prezzo, CTA e Trustpilot sotto l'immagine. */}
      <div className="mx-auto hidden w-auto max-w-sito max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:block max-sm:overflow-clip">
        <PrezzoGeo prezzo={prezzo} paese={paese} centrato />
        {/* `.hero-button-group.new-home-2.sign-up-now` */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CtaHero testo={cta.testo} href={cta.href} variante="mobile" />
        </div>
        <FraseTrustpilot trustpilot={trustpilot} />
      </div>
    </section>
  );
}

/*
 * `h2.heading-18.text-provv.new-cur-head`: "starting from $13 per month".
 *
 * Sopra i 1280px il foglio lo porta a `display: flex` con `padding-top: 30px`
 * e `margin-top: 0`; sotto resta un blocco con `margin-top: 30px`. Le tre
 * valute sono tre `<span>` gated, una sola delle quali si accende.
 */
function PrezzoGeo({
  prezzo,
  paese,
  centrato = false,
}: {
  readonly prezzo: { readonly prima: string; readonly dopo: string };
  readonly paese: string | null;
  readonly centrato?: boolean;
}) {
  return (
    <h2
      className={`m-0 mt-[30px] pb-[10px] text-[16px] font-light leading-[130%] tracking-normal text-bianco opacity-70 xl:mt-0 xl:flex xl:pt-[30px] max-sm:leading-[1.2] ${
        centrato ? "text-center" : "text-left max-sm:text-center"
      }`}
    >
      {/* `.text-span-410`: sopra i 1280 ha opacità .7 e 5px di spazio a destra. */}
      <span className="xl:pr-[5px] xl:opacity-70">{prezzo.prima}</span>{" "}
      {/* `.text-span-409.new-cur-head` */}
      <span className="text-bianco xl:block xl:text-[16px] xl:leading-[125%] xl:opacity-70">
        {VALUTE.map((valuta) => (
          <span
            key={valuta.codice}
            data-geo={valuta.modo}
            className={
              visibilePerPaese(valuta.modo, valuta.paesi, paese)
                ? "geo-visibile"
                : undefined
            }
          >
            {valuta.simbolo}
            {LISTINO.cifraTitolo}
          </span>
        ))}
        {prezzo.dopo}
      </span>
    </h2>
  );
}

/*
 * `a.button-2.enroll.homepage.new-home-2.signup-now`.
 *
 * `variante="colonna"` è quella con `.desktop-only`: 280px fissi, visibile
 * ovunque. `variante="mobile"` è quella senza, che il foglio tiene a
 * `display: none` e riaccende solo sotto i 480px, larga 90vw fino a 300px.
 *
 * Lo sfondo verde sul sito è una `background-image: linear-gradient(#62e8bb,
 * #62e8bb)` e non un `background-color`: serve a coprire il nero di
 * `.button-2` senza toccarlo. Qui basta il colore pieno, il risultato è lo
 * stesso pixel.
 */
function CtaHero({
  testo,
  href,
  variante,
}: {
  readonly testo: string;
  readonly href: string;
  readonly variante: "colonna" | "mobile";
}) {
  return (
    <Link
      href={href}
      data-label="pick_your_course_header"
      data-event="cta_click"
      data-category="homepage"
      className={`block rounded-bottone border-0 bg-mint px-6 py-[5px] text-center text-base font-normal leading-[180%] transition-all duration-500 ${
        variante === "colonna"
          ? "w-[280px]"
          : "hidden w-[90vw] max-w-[300px] max-sm:block"
      }`}
    >
      {/* `.button-area-18` / `.button-area-19` + `.button-text-26` / `-27`. */}
      <span className="flex items-center justify-center gap-3">
        <span className="leading-[160%] text-sfondo">{testo}</span>
      </span>
    </Link>
  );
}

/*
 * `p.paragraph-13.home-trustpilot.new-home-2.trustpilot-phrase.trust-hide`.
 *
 * Fra 480px e 767px il foglio la spegne: sul tablet la frase non c'è. È del
 * sito, si riproduce.
 */
function FraseTrustpilot({
  trustpilot,
}: {
  readonly trustpilot: {
    readonly prima: string;
    readonly link: string;
    readonly href: string;
  };
}) {
  return (
    <p className="m-0 overflow-hidden pt-[10px] text-left text-[18px] font-light leading-[180%] text-bianco max-md:hidden max-sm:block max-sm:text-center max-sm:font-normal">
      {trustpilot.prima}
      <a href={trustpilot.href} target="_blank" rel="noreferrer">
        <span className="text-mint">{trustpilot.link}</span>
      </a>
    </p>
  );
}
