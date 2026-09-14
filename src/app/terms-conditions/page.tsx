import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PaginaLegale } from "@/components/sections/PaginaLegale";
import { TagSocialSenzaCard } from "@/lib/metadati";
import { TERMS_CONDITIONS } from "@/testi/terms-conditions";

/*
 * `/terms-conditions`. Header e footer nuovi (varianti `a418b0b3` e
 * `704d21f5`), una sola sezione di testo, nessun popup, nessuna chat.
 *
 * Metadati copiati da `docs/webflow/meta/terms-conditions.json`: la pagina ha
 * solo il titolo e il canonical, nessuna description, nessuna immagine Open
 * Graph, nessun JSON-LD (`"jsonld": []`). Non se ne inventano.
 */

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: {
    canonical: "https://www.petetong-djacademy.com/terms-conditions",
  },
  /* `og:title` e `twitter:title` NON stanno qui: la pagina non ha
     `twitter:card` su Webflow e il campo `openGraph` di Next ne creerebbe uno.
     Li scrive `TagSocialSenzaCard`, sotto. Vedi `src/lib/metadati.tsx`. */
};

export default function TermsConditions() {
  return (
    <>
      <TagSocialSenzaCard titolo="Terms & Conditions" />
      <SiteHeader />
      <PaginaLegale testo={TERMS_CONDITIONS} />
      <SiteFooter />
    </>
  );
}
