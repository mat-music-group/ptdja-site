import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BookACall } from "@/components/sections/BookACall";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { Faq } from "@/components/sections/Faq";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Reviews } from "@/components/sections/Reviews";
import { Trengo } from "@/components/tracking/Trengo";
import { JsonLd } from "@/components/ui/JsonLd";
import { DOMANDE, EYEBROW, JSON_LD, META } from "@/testi/pricing-page";

/*
 * `/pricing-page`.
 *
 * Ordine delle sezioni, dall'outline (8 blocchi di primo livello):
 *   header → eyebrow "PRICING" → blocco prezzi → recensioni →
 *   book a free call → FAQ → footer → popup.
 *
 * Il popup sta DOPO il footer nell'HTML: è `position: fixed`, quindi dove si
 * trova nel DOM non cambia niente a schermo, ma l'ordine si rispetta lo stesso.
 *
 * `Trengo` (la chat) sta qui e non nel layout: sul sito è custom code di
 * pagina, presente solo su sei pagine su undici. Montarlo nel layout
 * metterebbe la bolla della chat anche su terms-conditions e recess, dove
 * oggi non c'è.
 *
 * Metadati e JSON-LD da `docs/webflow/meta/pricing-page.json`, identici:
 * è l'unica delle sei pagine di questo passo che ha entrambi.
 */

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: META.canonical },
  openGraph: {
    title: META.title,
    description: META.description,
    images: [META.ogImage],
    type: "website",
    url: META.ogUrl,
    siteName: META.ogSiteName,
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd dati={JSON_LD} />
      <SiteHeader />

      {/* L'eyebrow è un `<h1>` con la classe di un sottotitolo: è l'unico
          titolo di primo livello della pagina e vale "PRICING". Il
          `margin-bottom: -50px` è del CSS (`.top-title-head`) e serve a far
          risalire il titolo del listino sotto di esso.

          `tracking-normal` non è un gusto: `.section-subtitle-44.negative
          .new-home-2` dichiara `letter-spacing: 0`, mentre il default `h1` del
          sito è `-3.5px`. Senza, a 16px le lettere di "PRICING" si
          sovrappongono e la parola sembra scritta in un condensato.

          Sotto i 480px il foglio cambia tre cose (blocco `max-width: 479px`):
          `margin-bottom: -30px` su `.top-title-head`, `line-height: 16px`
          sempre su `.top-title-head`, `text-transform: none` su
          `.negative.new-home-2` (qui non si vede, il testo è già maiuscolo).

          Corpo scritto come `text-[16px]` e non `text-base`: le utility
          `text-*` di Tailwind impongono anche l'interlinea (1.5rem), mentre
          `.section-subtitle-44` non la dichiara e quindi vale il 115% dell'`h1`
          del sito. */}
      <h1 className="relative z-10 mt-[30px] mb-[-50px] rounded-etichetta text-center text-[16px] font-light uppercase tracking-normal text-bianco opacity-70 max-sm:mb-[-30px] max-sm:normal-case max-sm:leading-4">
        {EYEBROW}
      </h1>

      <PricingPlans />
      <Reviews />
      <BookACall />
      <Faq domande={DOMANDE} />

      <SiteFooter />
      <ExitIntentPopup />
      <Trengo />
    </>
  );
}
