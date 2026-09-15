"use client";

import Image from "next/image";
import { MuroDocenti } from "@/components/sections/MuroDocenti";
import { Button } from "@/components/ui/Button";
import { LinkTrustpilot } from "@/components/ui/LinkTrustpilot";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { visibilePerPaese } from "@/lib/geo";
import { usePaese } from "@/lib/usePaese";
import { LISTINO, VALUTE } from "@/testi/condivisi";
import { HERO, MURO } from "@/testi/home";

/*
 * La hero della home: `section.hero-section.new-home-2.home-teachers-slider`.
 *
 * ── Due volte lo stesso blocco prezzo + CTA + Trustpilot ──────────────
 * Come nella hero delle pagine corso, il gruppo compare due volte nel DOM:
 *   1. dentro la colonna di sinistra (`.hero-content.new-home-2
 *      .home-button-container`), che il CSS spegne sotto i 480px;
 *   2. in fondo alla sezione (`.container.brands.new-home-2`), che è
 *      `display: none` di base e diventa `flex` solo sotto i 480px.
 * Non è un doppione da ripulire: sul telefono il gruppo deve stare sotto le
 * strisce di foto, non sopra.
 *
 * ⚠️ A differenza delle pagine corso, qui **entrambe** le frasi Trustpilot
 * hanno classe `paragraph`, quindi il selettore del custom code
 * (`p.paragraph a[href*="trustpilot.com"]`) le prende tutte e due: sono due
 * dei quattro link tracciati dell'intero sito. Per questo si usa
 * `LinkTrustpilot` in tutti e due i posti.
 *
 * ── Il prezzo è geo-gated ─────────────────────────────────────────────
 * Stesso meccanismo del listino e della hero dei corsi: le tre valute stanno
 * tutte e tre nell'HTML servito, `[data-geo]` in `globals.css` le nasconde e
 * `geo-visibile` accende quella del paese stimato. Gli elenchi di paesi sono
 * quelli di `VALUTE`, verificati sull'HTML della home.
 *
 * ── Misure ────────────────────────────────────────────────────────────
 * Dal foglio Webflow, confrontate con `screenshots/home-desktop.png`:
 *   .hero-section…    padding 0 0 120px; 140px sopra a ≤991, 130 a ≤767,
 *                     50px sopra e 0 sotto (senza padding laterale) a ≤479
 *   .container.new-home-2  max-width 1380 a OGNI breakpoint (due classi
 *                     battono le regole a una classe dentro le media),
 *                     padding-x 30 → 0 a ≤479
 *   .hero-wrapper-1.teachers  riga con space-between; colonna con gap 10 a ≤991
 *   .hero-left-block…border   width 100%, max-width 580; 50% a ≤479
 *   .hero-content.header-testi  colonna con gap 15 (16 e 30px di lato a ≤479)
 *   .image-44         max-width 230 → 200 a ≤479
 *   il bottone        280×36 (padding verticale 5px, testo a interlinea 160%)
 *
 * ⚠️ DIVERGENZA DICHIARATA sulla larghezza delle due colonne. Sul sito né la
 * colonna di sinistra né il muro hanno `flex-shrink`, eppure a 1440 Chrome
 * lascia la sinistra a 580px e restringe solo il muro (misurato sullo
 * screenshot: la colonna di foto è larga 220px, che torna solo con un muro da
 * ~740px). Riprodurre quel risultato affidandosi all'algoritmo flex non è
 * deterministico: qui la colonna di sinistra ha `shrink-0` e il muro `min-w-0`,
 * che a 1440 danno esattamente 580 + 740.
 */

export function HeroHome() {
  const paese = usePaese();

  return (
    <section className="overflow-hidden bg-sfondo pb-[120px] pt-0 max-lg:pt-[140px] max-md:pt-[130px] max-sm:px-0 max-sm:pb-0 max-sm:pt-[50px]">
      {/* `.w-layout-blockcontainer.container.new-home-2.w-container` */}
      <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-end bg-sfondo px-[30px] max-sm:overflow-clip max-sm:px-0 max-sm:pb-[10px]">
        {/* `.hero-wrapper-1.teachers`: unico elemento della hero che nell'HTML
            pubblicato ha `data-w-id` **e** `style="opacity:0"`. */}
        <RivelaAllaVista className="flex items-center justify-between gap-0 max-lg:flex-col max-lg:gap-[10px]">
          {/* `.hero-left-block.new-home-2.border` */}
          <div className="flex w-full max-w-[580px] shrink-0 flex-col gap-0 max-lg:items-center max-lg:text-center max-sm:max-w-[50%]">
            {/* `.hero-content.header-testi` */}
            <div className="flex flex-col gap-[15px] max-sm:gap-4 max-sm:px-[30px]">
              {/* `h1.heading-2.homepage.new-home.new-font.new-home-2` */}
              <h1 className="m-0 text-[68px] font-medium leading-[105%] tracking-[-3.5px] text-bianco max-sm:max-w-[300px] max-sm:pt-0 max-sm:text-left max-sm:text-[37px] max-sm:font-normal max-sm:capitalize max-sm:leading-[115%] max-sm:tracking-[-1px]">
                {HERO.titoloRiga1}
                <br />
                {HERO.titoloRiga2}
              </h1>

              {/* `p._w-490-3.new-home-2` */}
              <p className="m-0 w-full max-w-[490px] text-[20px] font-normal leading-[180%] tracking-[-0.8px] text-bianco max-sm:text-left max-sm:text-base">
                {HERO.paragrafo}
              </p>

              {/* `img.image-44`: il marchio "Ableton Certified Training
                  Center", che nell'HTML sta dentro il blocco di testo. */}
              <Image
                src={HERO.logo.src}
                alt={HERO.logo.alt}
                width={HERO.logo.larghezza}
                height={HERO.logo.altezza}
                loading="lazy"
                sizes="(max-width: 479px) 200px, 230px"
                className="h-auto w-[230px] max-sm:w-[200px]"
              />
            </div>

            {/* `.hero-content.new-home-2.home-button-container`:
                `display: none` sotto i 480px. */}
            <div className="flex flex-col gap-0 max-sm:hidden">
              <PrezzoGeo paese={paese} />
              <CtaSignUp variante="desktop" />
              <FraseTrustpilot />
            </div>
          </div>

          <MuroDocenti
            colonna1={MURO.colonna1}
            colonna2={MURO.colonna2}
            colonna3={MURO.colonna3}
            mobileAlto={MURO.mobileAlto}
            mobileBasso={MURO.mobileBasso}
          />
        </RivelaAllaVista>
      </div>

      {/* `.container.brands.new-home-2`: `display: none` di base, `flex`
          centrato solo sotto i 480px, dove ripete prezzo, CTA e Trustpilot
          sotto le due strisce di foto. */}
      {/* `.container.brands` a ≤479 ha `padding-top: 10px` oltre ai 10 sotto:
          mancava, e il blocco misurava 147px invece di 157. */}
      <div className="mx-auto hidden w-auto max-w-sito flex-col items-center justify-center max-sm:flex max-sm:overflow-clip max-sm:pb-[10px] max-sm:pt-[10px]">
        <PrezzoGeo paese={paese} />
        {/* `.hero-button-group.new-home-2.sign-up-now` */}
        <div className="flex items-center justify-center gap-4">
          <CtaSignUp variante="mobile" />
        </div>
        <FraseTrustpilot />
      </div>
    </section>
  );
}

/*
 * `h2.heading-18.text-provv.new-cur-head`: "starting from $13 per month".
 *
 * Stesso blocco della hero dei corsi, stessa classe Webflow: sopra i 1280px
 * diventa flex con 30px di padding sopra e niente margine, sotto resta un
 * blocco con 30px di margine.
 */
function PrezzoGeo({ paese }: { readonly paese: string | null }) {
  return (
    <h2 className="m-0 mt-[30px] pb-[10px] text-left text-[16px] font-light leading-[130%] tracking-normal text-bianco opacity-70 xl:mt-0 xl:flex xl:pt-[30px] max-sm:leading-[1.2]">
      {/* `.text-span-410` */}
      <span className="xl:pr-[5px] xl:opacity-70">{HERO.prezzo.prima}</span>{" "}
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
        {HERO.prezzo.dopo}
      </span>
    </h2>
  );
}

/*
 * `a.button.enroll.homepage.new-home-2.signup-now(.desktop-only)`.
 *
 * Sul sito il custom code del footer aggancia `a.button.enroll.signup-now` e
 * manda `CTA Click` con `section: 'Hero Signup'` (costante nello script).
 * Nel repo le classi Webflow non esistono, quindi l'evento si dichiara qui,
 * con la props `traccia` di `Button`.
 *
 * I due `!` sul padding non sono un vezzo: `Button` nasce con il padding di
 * `.button` (10px sopra, 8px sotto) e questa variante lo porta a 5px e 5px.
 * Senza `!` l'ordine con cui Tailwind emette `pt-*`/`pb-*` deciderebbe quale
 * vince, e non è qualcosa su cui appoggiare una misura. L'interlinea 160%
 * dello `<span>` è quella di `.button-text`: con le due cose insieme il
 * bottone è alto 36px, come sullo screenshot di riferimento.
 */
function CtaSignUp({ variante }: { readonly variante: "desktop" | "mobile" }) {
  return (
    <Button
      href={HERO.cta.href}
      variante="mint"
      className={`block pb-[5px]! pt-[5px]! ${
        variante === "desktop" ? "w-[280px]" : "w-[80vw] max-w-[300px]"
      }`}
      traccia={{ evento: "CTA Click", section: "Hero Signup" }}
    >
      <span className="block leading-[160%]">{HERO.cta.testo}</span>
    </Button>
  );
}

/*
 * `p.paragraph.home-trustpilot.new-home-2.trustpilot-phrase.trust-hide`.
 *
 * Qui, a differenza delle pagine corso, la frase si vede a ogni breakpoint:
 * `.trust-hide` con cinque classi vale `display: block` sia di base sia in
 * tutte e quattro le media query. Sotto i 480px il peso passa da 300 a 400.
 */
function FraseTrustpilot() {
  return (
    <p className="m-0 overflow-hidden pt-[10px] text-left text-[18px] font-light leading-[180%] text-bianco max-sm:w-auto max-sm:font-normal">
      {HERO.trustpilot.prima}
      <LinkTrustpilot href={HERO.trustpilot.href}>
        {/* `.text-span-5`: il verde del brand. */}
        <span className="text-mint">{HERO.trustpilot.link}</span>
      </LinkTrustpilot>
    </p>
  );
}
