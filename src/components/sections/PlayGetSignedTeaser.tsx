import Image from "next/image";
import Link from "next/link";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { PLAY_GET_SIGNED } from "@/testi/home";

/*
 * "TALENT SCOUTING / Play & Get Signed", la sezione della home che rimanda a
 * `/play-get-signed`: `section.feature-section.section-padding
 * .remove-bottom-padding.the-team.new-home-2`.
 *
 * ── Due immagini, una per breakpoint ──────────────────────────────────
 * `PLAY-AND-GET-VERT.png` (`.image-15.only-mobile`) e
 * `PLAY-AND-GET-QUAD.webp` (`.image-15.only-desk.img-onlydesk`) sono la stessa
 * infografica in due formati: nel DOM ci sono tutte e due e il CSS ne spegne
 * una. Sono le uniche due immagini `loading="eager"` della sezione.
 *
 * ⚠️ Gli `alt` sono asimmetrici: la verticale ce l'ha vuoto, la quadrata no.
 * È così nell'HTML.
 *
 * ── Misure ────────────────────────────────────────────────────────────
 *   sezione          padding verticale 0 (lo spazio lo fa il margine
 *                    dell'occhiello); 30px di lato e testo centrato a ≤479
 *   .container-5…    NON è un flex: `.w-layout-blockcontainer` lo lascia
 *                    `display: block`, quindi le proprietà flex della regola
 *                    non si applicano e il link in fondo è centrato dal
 *                    `text-align: center` di `.get-signed`. Diventa flex solo
 *                    sotto i 480px.
 *   .feature-tabs-wrapper-2…  colonna centrata, 30px sotto; 70% a ≤991
 *   .section-subtitle…play-get-signed  margine sopra 120px (0 a ≤479)
 *   .section-title   gap 30, 30px sotto (50 a ≤991, 40 a ≤767, 0 a ≤479)
 *   .image-15        raggio 25, larghezza 400 → 500 per la quadrata;
 *                    35px sotto a ≤479
 *   il link          `.button.link.link-secondary`: nessun fondo, nessun
 *                    bordo, testo mint, raggio 120px
 */

export function PlayGetSignedTeaser() {
  return (
    <section className="block overflow-hidden bg-sfondo py-0 max-sm:px-[30px] max-sm:text-center">
      {/* `.container-5.new-home-2.talent-scouting.get-signed` */}
      <div className="mx-auto max-w-sito px-[30px] text-center max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:px-0 max-sm:pt-[50px]">
        {/* `.feature-tabs-wrapper-2.new-home-2.play-get-signed` */}
        <div className="flex w-full flex-col items-center justify-center pb-[30px] max-lg:mx-auto max-lg:w-[70%] max-md:w-full max-sm:rounded-media">
          {/* `div.section-title` con `data-w-id` e `opacity:0` nell'HTML. */}
          <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-lg:pb-[50px] max-md:pb-10 max-sm:gap-5 max-sm:pb-0">
            <p className="mt-[120px] pb-0 text-center text-base font-light uppercase leading-[180%] tracking-normal text-bianco opacity-70 max-sm:mt-0 max-sm:pb-[5px] max-sm:normal-case">
              {PLAY_GET_SIGNED.eyebrow}
            </p>

            {/* `h2.section-title-heading.p4`: peso 300, con "Play" e "Signed"
                in due `<span>` a peso 600. */}
            <h2 className="m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              <span className="font-semibold">{PLAY_GET_SIGNED.titoloPlay}</span>
              {PLAY_GET_SIGNED.titoloMezzo}
              <span className="font-semibold">
                {PLAY_GET_SIGNED.titoloSigned}
              </span>
            </h2>

            {/* `p.cta-p._w-520.new-font.undertitle-get-signed.play-home`.
                Resta a 16px anche sotto i 480px: lì il foglio porta `.cta-p` a
                15px, ma `.cta-p._w-520` dichiara 16px con una classe in più. */}
            <p className="mt-0 w-full max-w-[520px] pb-0 text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:pb-[30px] max-sm:text-center max-sm:opacity-100">
              {PLAY_GET_SIGNED.paragrafo}
            </p>
          </RivelaAllaVista>

          {/* `.image-15.only-mobile`: esiste solo sotto i 480px. */}
          <Image
            src={PLAY_GET_SIGNED.immagineMobile.src}
            alt={PLAY_GET_SIGNED.immagineMobile.alt}
            width={PLAY_GET_SIGNED.immagineMobile.larghezza}
            height={PLAY_GET_SIGNED.immagineMobile.altezza}
            priority
            sizes="(max-width: 479px) 100vw, 400px"
            className="hidden h-auto w-[400px] max-w-full rounded-media max-sm:block max-sm:pb-0"
          />

          {/* `.image-15.only-desk.img-onlydesk`: 500px, sparisce a ≤479. */}
          <Image
            src={PLAY_GET_SIGNED.immagineDesktop.src}
            alt={PLAY_GET_SIGNED.immagineDesktop.alt}
            width={PLAY_GET_SIGNED.immagineDesktop.larghezza}
            height={PLAY_GET_SIGNED.immagineDesktop.altezza}
            priority
            sizes="500px"
            className="inline-flex h-auto w-[500px] max-w-full items-baseline rounded-media max-sm:hidden"
          />
        </div>

        {/* `a.button.link.link-secondary`: un link di testo, non un bottone.
            La freccia è il glifo `` di Font Awesome, che il sito carica e
            questo repo no: qui è lo stesso chevron disegnato in SVG, come
            sulla hero di `/play-get-signed`. */}
        <Link
          href={PLAY_GET_SIGNED.cta.href}
          className="group inline-block max-w-full rounded-[120px] border-0 p-0 text-left text-base font-normal leading-[180%] transition-all duration-500"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-left leading-[160%] text-mint">
              {PLAY_GET_SIGNED.cta.testo}
            </span>
            <span className="relative flex justify-end overflow-visible text-mint">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 4 L17 12 L9 20"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
