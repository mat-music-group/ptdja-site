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
          risalire il titolo del listino sotto di esso. */}
      <h1 className="relative z-10 mt-[30px] mb-[-50px] rounded-etichetta text-center text-base font-light uppercase text-bianco opacity-70">
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
