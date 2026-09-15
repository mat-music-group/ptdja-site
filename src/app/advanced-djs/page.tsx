import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { TagSocialSenzaCard } from "@/lib/metadati";
import { ADVANCED_DJS } from "@/testi/advanced-djs";

/*
 * `/advanced-djs`: la pagina nuda del funnel.
 *
 * Non ha header, non ha footer, non ha interazioni Webflow (zero `data-w-id`
 * su tutta la pagina): dentro c'è solo l'iframe VideoAsk e, sotto, un bottone
 * verso il corso consigliato. Non si aggiunge header e footer "perché
 * starebbero bene": sul sito non ci sono.
 *
 * Misure dal CSS: `.feature-section…course-head` ha 108px sopra, 0 sotto e
 * nessun padding laterale; `.container-16` è largo 1380px con 30px di lato;
 * l'iframe è alto 600px con raggio 24px; la sezione del bottone
 * (`.feature-section…funnel-landing.virtual-landing`) ha 60px sopra e 108px
 * sotto ed è centrata.
 *
 * Metadati da `docs/webflow/meta/advanced-djs.json`: titolo e canonical,
 * nessun JSON-LD.
 */

export const metadata: Metadata = {
  title: ADVANCED_DJS.meta.title,
  alternates: { canonical: ADVANCED_DJS.meta.canonical },
  /* `og:title` e `twitter:title` NON stanno qui: la pagina non ha
     `twitter:card` su Webflow e il campo `openGraph` di Next ne creerebbe uno.
     Li scrive `TagSocialSenzaCard`, sotto. Vedi `src/lib/metadati.tsx`. */
};

export default function AdvancedDjs() {
  return (
    <section className="bg-sfondo pb-0 pt-[108px] max-sm:pt-sezione">
      <TagSocialSenzaCard titolo={ADVANCED_DJS.meta.title} />

      {/* `.container-16` a ≤479 prende `padding-bottom: 35px`. */}
      <div
        id="landing-video"
        className="mx-auto block w-full max-w-sito px-[30px] text-center max-sm:pb-[35px]"
      >
        <div className="flex flex-col gap-16">
          <div className="block">
            {/* `inline`: la preflight di Tailwind rende `iframe` un blocco,
                sul sito resta in linea e la riga che lo contiene porta con sé
                gli 8px sotto la linea di base. */}
            <iframe
              src={ADVANCED_DJS.videoask.src}
              title=""
              allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
              width="100%"
              height={ADVANCED_DJS.videoask.altezza}
              className="inline align-baseline"
              style={{ border: "none", borderRadius: "24px" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pb-[108px] pt-[60px]">
        {/* `.button-2.secondary { margin-top: 30px }`. */}
        <Button
          href={ADVANCED_DJS.cta.href}
          variante="mint"
          esterno
          className="mt-[30px]"
        >
          {ADVANCED_DJS.cta.testo}
        </Button>
      </div>
    </section>
  );
}
