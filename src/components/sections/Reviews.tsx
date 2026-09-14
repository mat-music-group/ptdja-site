"use client";

import Script from "next/script";
import { TrustpilotWidget } from "@/components/tracking/Trustpilot";
import { RECENSIONI } from "@/testi/condivisi";

/*
 * La sezione recensioni "Their Words, Not Ours":
 * `section.testimonial-section…reviews.new-home-2.trust`, presente su 6 pagine
 * con lo stesso contenuto.
 *
 * Dentro ci sono tre cose, nell'ordine dell'HTML:
 * 1. il muro di video testimonianze di Feedspace (`data-id` fisso);
 * 2. il carosello Trustpilot, visibile da 480px in su (`.code-embed-4`);
 * 3. lo slider Trustpilot, che sul sito ha classe `.code-embed-3`, cioè
 *    `display: none` di default e `display: block` solo sotto i 480px
 *    (la classe `trustbox-mob` dice a cosa serve).
 *
 * Misure: `.testimonial-wrapper` ha 120px sopra, 70px sotto, 60px di lato e
 * 26px fra i blocchi; a ≤991px gap 0, 80px sopra, 30px di lato; a ≤767px
 * 60px sopra e sotto; a ≤479px `padding: 50px 20px 0`. La sezione ha
 * `padding-bottom: 0`.
 *
 * ── PERCHÉ È UN CLIENT COMPONENT ────────────────────────────────────────
 * Solo per `next/script`: l'embed Feedspace va caricato dopo l'idratazione,
 * come sul sito, dove lo `<script>` è `async`. Nessuno stato, nessun effetto.
 */
export function Reviews() {
  return (
    <section className="bg-sfondo pb-0 pt-0">
      {/* `.testimonial-wrapper`: 120/60/70 di base, poi il foglio lo
          ridisegna a ogni soglia — a ≤991px gap 0, 80px sopra e 30px di lato;
          a ≤767px 60px sopra e sotto; a ≤479px `padding: 50px 20px 0`, cioè
          niente spazio sotto. Erano i 166px di troppo sul telefono.

          Niente `max-w-sito`: a differenza di tutte le altre sezioni, qui fra
          la `<section>` e il contenuto non c'è nessun contenitore Webflow.
          `.testimonial-wrapper` sta attaccato alla sezione e non ha né
          `max-width` né `margin: auto`, quindi a 1440px il muro Feedspace è
          largo 1320 e non 1260, e le sue card sono più alte di conseguenza. */}
      <div className="flex w-full flex-col gap-[26px] rounded-blocco px-[60px] pb-[70px] pt-sezione max-lg:gap-0 max-lg:px-[30px] max-lg:pt-20 max-md:pb-[60px] max-md:pt-[60px] max-sm:px-5 max-sm:pb-0 max-sm:pt-[50px]">
        {/* `.section-title-heading` è 56px peso 400, che `.new-home-2` porta a
            300; l'interlinea non è dichiarata, quindi resta il 130% dell'`h2`
            del sito. Corpo 50px a ≤991, 45px a ≤767, 32px a ≤479. */}
        <h2 className="text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]">
          <span className="font-semibold text-bianco">{RECENSIONI.titoloEvidenziato}</span>
          {RECENSIONI.titoloResto}
          <br />
        </h2>

        <div className="overflow-hidden pt-0">
          {/* Feedspace: il muro di testimonianze video. Il `<div>` vuoto è il
              contenitore che lo script riempie, esattamente come su Webflow. */}
          <div className="feedspace-embed" data-id={RECENSIONI.feedspaceId} />
          <Script
            src="https://js.feedspace.io/v1/embed/embed.min.js"
            strategy="afterInteractive"
          />

          {/* Trustpilot, carosello: la soglia è 480px, non 992px.
              `.code-embed-4.spazio-su` è `display: block` ovunque e
              `display: none` solo nel blocco `max-width: 479px`. */}
          <div className="block pt-[10px] max-sm:hidden">
            <TrustpilotWidget
              templateId={RECENSIONI.trustpilotCarosello.templateId}
              height={RECENSIONI.trustpilotCarosello.altezza}
              token={RECENSIONI.trustpilotCarosello.token}
            />
          </div>

          {/* Trustpilot, slider: solo sotto i 480px. `.code-embed-3` è
              `display: none` di base e torna `block` in
              `.code-embed-3.space-su.trustbox-mob` dentro `max-width: 479px`. */}
          <div className="hidden pt-[10px] max-sm:block">
            <TrustpilotWidget
              templateId={RECENSIONI.trustpilotSlider.templateId}
              height={RECENSIONI.trustpilotSlider.altezza}
              token={RECENSIONI.trustpilotSlider.token}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
