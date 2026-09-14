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
 * 2. il carosello Trustpilot, visibile da 992px in su (`.code-embed-4`);
 * 3. lo slider Trustpilot, che sul sito ha classe `.code-embed-3`, cioè
 *    `display: none` di default e `display: block` solo sotto i 992px
 *    (la classe `trustbox-mob` dice a cosa serve).
 *
 * Misure: `.testimonial-wrapper` ha 120px sopra, 70px sotto, 60px di lato e
 * 26px fra i blocchi; la sezione ha `padding-bottom: 0`.
 *
 * ── PERCHÉ È UN CLIENT COMPONENT ────────────────────────────────────────
 * Solo per `next/script`: l'embed Feedspace va caricato dopo l'idratazione,
 * come sul sito, dove lo `<script>` è `async`. Nessuno stato, nessun effetto.
 */
export function Reviews() {
  return (
    <section className="bg-sfondo pb-0 pt-0">
      <div className="mx-auto flex w-full max-w-sito flex-col gap-[26px] rounded-blocco px-[60px] pb-[70px] pt-sezione max-md:px-[20px]">
        <h2 className="text-center text-[56px] font-medium leading-[125%] tracking-[-2.5px] text-bianco max-sm:text-[36px]">
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

          {/* Trustpilot, carosello: solo da tablet in su. */}
          <div className="block pt-[10px] max-lg:hidden">
            <TrustpilotWidget
              templateId={RECENSIONI.trustpilotCarosello.templateId}
              height={RECENSIONI.trustpilotCarosello.altezza}
              token={RECENSIONI.trustpilotCarosello.token}
            />
          </div>

          {/* Trustpilot, slider: solo sotto i 992px (classe `trustbox-mob`). */}
          <div className="hidden pt-[10px] max-lg:block">
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
