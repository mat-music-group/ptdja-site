import type { Metadata } from "next";
import { SiteFooterTermsSa } from "@/components/layout/SiteFooterTermsSa";
import { SiteHeaderLegacy } from "@/components/layout/SiteHeaderLegacy";
import { PaginaLegale } from "@/components/sections/PaginaLegale";
import { TagSocialSenzaCard } from "@/lib/metadati";
import { TERMS_CONDITIONS_SA } from "@/testi/terms-conditions-sa";

/*
 * `/terms-conditions-sa`. È una delle due pagine rimaste con header e footer
 * VECCHI: header `684f4a0d` (solo il logo, largo 400px, link a `#`) e footer
 * `652f6da5` (cinque colonne, claim "8000+ DJs", link alle pagine `-old`).
 *
 * Metadati da `docs/webflow/meta/terms-conditions-sa.json`: titolo e
 * canonical, niente altro, nessun JSON-LD.
 */

export const metadata: Metadata = {
  title: "Terms & Conditions SA",
  alternates: {
    canonical: "https://www.petetong-djacademy.com/terms-conditions-sa",
  },
  /* `og:title` e `twitter:title` NON stanno qui: la pagina non ha
     `twitter:card` su Webflow e il campo `openGraph` di Next ne creerebbe uno.
     Li scrive `TagSocialSenzaCard`, sotto. Vedi `src/lib/metadati.tsx`. */
};

export default function TermsConditionsSa() {
  return (
    <>
      <TagSocialSenzaCard titolo="Terms & Conditions SA" />
      <SiteHeaderLegacy />
      <PaginaLegale testo={TERMS_CONDITIONS_SA} />
      <SiteFooterTermsSa />
    </>
  );
}
