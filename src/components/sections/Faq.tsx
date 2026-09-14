"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FAQ_ICONA, FAQ_TITOLO, type DomandaFaq } from "@/testi/condivisi";

/*
 * La sezione FAQ: `section.faq-section-one…new-home-2`.
 *
 * Struttura condivisa da 6 pagine, contenuto NO: la home ha 15 domande, le
 * altre cinque ne hanno 7 ciascuna. Per questo le domande arrivano da fuori,
 * in `domande`, e stanno in `src/testi/<slug>.ts`.
 *
 * Misure dal CSS: la sezione ha 90px sopra e 0 sotto (50px sopra a ≤479);
 * il contenitore è largo 1380px con 30px di lato; a sinistra un blocco da
 * 500px con il titolo "FAQ" a 56px, a destra la colonna delle domande larga
 * al massimo 648px con 20px fra una e l'altra; ogni domanda ha un filetto
 * bianco sopra (`.faq-header.custom-faq.faq-trasparente`: fondo trasparente,
 * `border-top` solido, raggio 0) e 16px di padding; la freccia sta in una
 * pillola nera 43×29 con raggio 16px.
 *
 * ── L'ACCORDION ─────────────────────────────────────────────────────────
 * L'interazione Webflow (`a-310` / `a-311`, "Open/Close Accordion") fa tre
 * cose: ruota la freccia di 180° in 300 ms, porta l'altezza del contenuto da
 * 0 ad `auto` in 300 ms, e inverte i colori della pillola (fondo bianco,
 * freccia invertita) mentre è aperta. Qui tutte e tre.
 *
 * ⚠️ Una quarta cosa NON è riprodotta, di proposito: chiudendo un accordion,
 * `a-311` porta il fondo di `.faq-header` a `--neutral-02` (#faf4f3), cioè
 * crema, su una pagina scura. È un residuo del preset Webflow, si vede solo
 * dopo aver aperto e richiuso, e riprodurlo significherebbe copiare un lampo
 * color panna in mezzo al nero. Annotato in `handoff.md`.
 */

type ProprietaFaq = {
  readonly domande: readonly DomandaFaq[];
  readonly className?: string;
};

export function Faq({ domande, className = "" }: ProprietaFaq) {
  /* Una sola domanda aperta per volta: è il comportamento del dropdown
     Webflow, che chiude gli altri quando ne apre uno. */
  const [aperta, setAperta] = useState<string | null>(null);

  return (
    <section
      className={`bg-sfondo pb-sezione pt-[90px] max-sm:pt-[50px] ${className}`}
    >
      <div className="mx-auto flex w-full max-w-sito flex-col items-start justify-start px-[30px] max-sm:pb-[50px]">
        <div className="flex w-full justify-between gap-[50px] pb-0 max-lg:flex-col">
          <div className="flex w-full max-w-[500px] flex-col gap-4">
            <h2 className="text-[56px] font-medium leading-[125%] tracking-[-2.5px] text-bianco max-sm:text-[36px]">
              {FAQ_TITOLO}
            </h2>
          </div>

          <div className="flex w-full max-w-testo flex-col gap-5 overflow-hidden pb-10">
            {domande.map((voce) => {
              const attiva = aperta === voce.domanda;
              return (
                <div key={voce.domanda} className="w-full">
                  <button
                    type="button"
                    aria-expanded={attiva}
                    onClick={() => setAperta(attiva ? null : voce.domanda)}
                    className="z-10 mb-[25px] flex w-full justify-between border-t border-bianco bg-transparent p-4 text-left"
                  >
                    <span className="pr-[30px] text-[18px] font-normal tracking-[-0.4px] text-bianco">
                      {voce.domanda}
                    </span>
                    <span
                      className={`flex h-[29px] w-[43px] min-w-[43px] items-center justify-center rounded-etichetta p-[5px] transition-colors duration-100 ${
                        attiva ? "bg-bianco" : "bg-nero"
                      }`}
                    >
                      <Image
                        src={FAQ_ICONA.src}
                        alt={FAQ_ICONA.alt}
                        width={FAQ_ICONA.larghezza}
                        height={FAQ_ICONA.altezza}
                        className={`transition-transform duration-300 ${
                          attiva ? "rotate-180 invert" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {/* La risposta resta montata anche da chiusa, ad altezza zero:
                      Webflow tiene `margin-top: -40px` su `.faq-item-content`
                      sempre, e quel margine negativo assorbe i 25px del bottone
                      e 15 dei 20px di gap. Con il blocco smontato il passo fra
                      due domande saliva da 67 a 107px (misurato il 14/09). */}
                  <motion.div
                    initial={false}
                    animate={{ height: attiva ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    aria-hidden={!attiva}
                    className="-mt-[40px] overflow-hidden rounded-b-media"
                  >
                    <p className="m-0 mt-[30px] px-4 pb-5 text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco">
                      {voce.risposta}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
