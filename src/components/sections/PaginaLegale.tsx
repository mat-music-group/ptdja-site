"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import type { TestoLegale } from "@/testi/tipi";

/*
 * Il corpo delle tre pagine di sola prosa: `terms-conditions`,
 * `terms-conditions-sa`, `recess`. Sul sito hanno la stessa identica
 * struttura, `section.feature-section.section-padding.remove-bottom-padding`,
 * e cambiano solo il titolo e il testo.
 *
 * Misure dal CSS: la sezione ha 120px sopra e 0 sotto, fondo `#1e1e1e`
 * (30px di lato sotto i 480px); il contenitore è largo 1380px con 30px di
 * lato; `.section-title` è una colonna centrata con 30px fra eyebrow e
 * titolo e 30px sotto; il titolo è `.section-title-heading`, 56px peso 400,
 * `letter-spacing: -2.5px`; il testo è `.paragraph-2.course-description`,
 * bianco, giustificato, 30px di margine sotto, e prende corpo 20px e
 * interlinea 180% dalla regola globale `p` del sito.
 *
 * ⚠️ Le misure verticali scalano con i breakpoint: senza le varianti la
 * pagina era 95px più alta dell'originale sul telefono (misurato il 15/09).
 * `.section-padding` sopra 120/80/60/50; `.section-title` gap 30/30/30/20 e
 * `padding-bottom` 30/50/40/0; `.section-title-heading` 56/50/45/32;
 * `.container` a ≤479 aggiunge `padding-bottom: 10px`.
 *
 * Due animazioni Webflow, entrambe su `SCROLL_INTO_VIEW`:
 * - il titolo entra con `slideInBottom` (`data-w-id` diverso per pagina);
 * - il testo entra con `a-113` "Zoom In 0.3s": parte a scala .97 e opacità 0,
 *   e in 700 ms dopo 300 ms di ritardo arriva a scala 1 e opacità 1.
 */

type ProprietaPaginaLegale = {
  readonly testo: TestoLegale;
};

export function PaginaLegale({ testo }: ProprietaPaginaLegale) {
  return (
    <section className="flex items-start justify-start bg-sfondo pb-0 pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:px-[30px] max-sm:pt-[50px] max-sm:text-center">
      <div className="mx-auto flex w-full max-w-sito flex-col items-center justify-center px-[30px] max-sm:px-0 max-sm:pb-[10px]">
        <RivelaAllaVista>
          <div className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-lg:pb-[50px] max-md:pb-10 max-sm:gap-5 max-sm:pb-0">
            {/* `.section-subtitle`: 16px peso 300 senza interlinea propria,
                quindi eredita il 180% del `p` globale. Scritto come valore
                arbitrario perché `text-base` porterebbe con sé 24px. */}
            <p className="m-0 text-[16px] font-light uppercase leading-[180%] tracking-[3px] text-bianco opacity-70">
              {testo.eyebrow}
            </p>
            {/* `.section-title-heading`: 56px, 50px a ≤991, 45px a ≤767,
                32px a ≤479. */}
            <h2 className="text-[56px] font-normal leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
              {testo.titoloInGrassetto ? (
                <strong>{testo.titolo}</strong>
              ) : (
                testo.titolo
              )}
            </h2>
          </div>
        </RivelaAllaVista>

        <div className="flex w-full items-stretch justify-between">
          <div className="w-full max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
              className="block"
            >
              {/* 20px, e 16px sotto i 480px: è la regola globale `p` del sito,
                  che nel blocco `max-width: 479px` scende a 16px. Senza, sul
                  telefono la pagina cresce di oltre il 40% in altezza. */}
              <p className="mb-[30px] w-full max-w-none text-justify text-[20px] font-normal leading-[180%] tracking-[-0.8px] text-bianco max-sm:text-[16px]">
                {testo.righe.map((riga, indiceRiga) => (
                  /* L'indice è una chiave legittima qui: l'elenco è una
                     costante, non cambia mai ordine e non viene filtrato. */
                  <Fragment key={indiceRiga}>
                    {indiceRiga > 0 ? <br /> : null}
                    {riga.map((segmento, indiceSegmento) => (
                      <Fragment key={indiceSegmento}>
                        {segmento.grassetto ? (
                          <strong>{segmento.testo}</strong>
                        ) : (
                          segmento.testo
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
