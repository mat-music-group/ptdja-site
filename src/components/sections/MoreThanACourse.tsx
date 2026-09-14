"use client";

import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { MORE_THAN_A_COURSE } from "@/testi/condivisi";

/*
 * La CTA "More Than a Course, Everything You Need is Here":
 * `section.feature-cta-section-3.new-home-2.features.molto-piu`,
 * su home, dj-course e producer-course.
 *
 * ⚠️ NON VERIFICATA CON GLI SCREENSHOT ─────────────────────────────────────
 * Nessuna delle sei pagine ricostruite in questo passo (404, terms,
 * terms-sa, advanced-djs, recess, pricing) monta questa sezione: esiste solo
 * su pagine che qualcun altro costruirà. È ricostruita dall'HTML e dal CSS
 * Webflow più lo screenshot `home-desktop.png`, ma non è stata confrontata
 * pixel per pixel con niente, perché non c'era una pagina su cui renderla.
 * Chi costruisce la home la verifichi e la corregga: i testi e i link sono
 * giusti (vengono da `docs/webflow/outline/home.md`), la disposizione è una
 * prima passata.
 *
 * Due cose scoperte leggendo il CSS, che chi la rifinisce deve sapere:
 *
 * 1. Le didascalie in verde che si vedono sotto le immagini del carosello
 *    ("Complete Courses Library", "Live Sessions & Mentoring") NON sono
 *    testo: sono disegnate dentro i PNG delle slide. Non vanno riscritte.
 * 2. La griglia con le sei voci e l'icona "i" è
 *    `.grid-two-columns.new-home-2.more-than-a-course`, che nel foglio ha
 *    `display: none` e torna `display: grid` solo nel blocco
 *    `max-width: 479px`. Cioè: sul desktop non si vede, esiste solo sul
 *    telefono stretto. Qui è riprodotta così.
 *
 * ⚠️ ASSET MANCANTE: il riquadro nero ha come sfondo
 * `GEOMETRICS-FOURTEEN-02.png`, che il CSS carica con `url()`. Gli asset
 * referenziati dal CSS non sono stati scaricati (limite noto scritto in
 * `handoff.md`), quindi qui c'è il nero pieno e manca la trama. Va scaricato
 * prima di pubblicare la home.
 */

export function MoreThanACourse() {
  return (
    <section className="overflow-hidden bg-sfondo pt-sezione">
      <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0">
        <div className="flex w-full flex-col items-center gap-[30px] overflow-hidden rounded-media bg-nero px-[30px] py-[35px]">
          <div className="flex flex-col items-center gap-16 px-5 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="max-w-[710px] text-[56px] font-normal leading-[125%] tracking-[-2.5px] text-bianco max-sm:text-[32px]">
                <span className="text-mint">
                  {MORE_THAN_A_COURSE.titoloEvidenziato}
                </span>
                <br />
                {MORE_THAN_A_COURSE.titoloPrima}
                <span className="font-semibold">
                  {" "}
                  <strong>{MORE_THAN_A_COURSE.titoloGrassetto}</strong>
                  {MORE_THAN_A_COURSE.titoloDopo}
                </span>
                <br />
              </h2>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sito px-[60px] max-sm:px-[10px]">
            {/* La griglia delle sei voci: solo sotto i 480px, come sul sito. */}
            <div className="hidden grid-cols-1 gap-x-[99px] gap-y-5 rounded-t-[15px] px-[10px] py-5 max-sm:grid">
              {MORE_THAN_A_COURSE.voci.map((voce) => (
                <div
                  key={voce.testo}
                  className="relative flex items-center justify-center"
                >
                  <Image src={voce.icona} alt="" width={25} height={25} />
                  <p className="m-0 text-left text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco">
                    <strong>{voce.testo}</strong>
                  </p>
                  <Tooltip messaggio={voce.tooltip} />
                </div>
              ))}
            </div>
          </div>

          {/* Il carosello: immagini diverse fra desktop e mobile. */}
          <Carosello
            slide={MORE_THAN_A_COURSE.slideDesktop}
            larghezzaSlide={600}
            className="max-sm:hidden"
          />
          <Carosello
            slide={MORE_THAN_A_COURSE.slideMobile}
            larghezzaSlide={350}
            className="hidden max-sm:block"
          />
        </div>
      </div>
    </section>
  );
}

/*
 * Il carosello Webflow (`.slider-79`) rifatto con una traslazione CSS.
 * `data-infinite="true"`, `data-duration="500"`, `data-autoplay="false"`:
 * scorre solo se lo si spinge, mezzo secondo per slide.
 */
function Carosello({
  slide,
  larghezzaSlide,
  className = "",
}: {
  readonly slide: readonly { readonly src: string; readonly alt: string }[];
  readonly larghezzaSlide: number;
  readonly className?: string;
}) {
  const [indice, setIndice] = useState(0);

  const vai = (delta: number) => {
    const totale = slide.length;
    setIndice((i) => (i + delta + totale) % totale);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${indice * larghezzaSlide}px)` }}
        >
          {slide.map((s) => (
            <div
              key={s.src}
              className="shrink-0 px-5"
              style={{ width: larghezzaSlide }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={larghezzaSlide}
                height={Math.round(larghezzaSlide * 0.765)}
                className="h-auto w-full rounded-[20px]"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => vai(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-2xl text-bianco"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => vai(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-2xl text-bianco"
      >
        ›
      </button>

      <div className="mt-4 flex justify-center gap-[15px]">
        {slide.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndice(i)}
            className={`h-2 w-2 rounded-full ${
              i === indice ? "bg-bianco" : "bg-bianco/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
