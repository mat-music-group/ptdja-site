import type { Metadata } from "next";
import { SiteFooterTermsSa } from "@/components/layout/SiteFooterTermsSa";
import { SiteHeaderLegacy } from "@/components/layout/SiteHeaderLegacy";
import { PaginaLegale } from "@/components/sections/PaginaLegale";
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
  openGraph: { title: "Terms & Conditions SA" },
  twitter: { title: "Terms & Conditions SA" },
};

export default function TermsConditionsSa() {
  return (
    <>
      <SiteHeaderLegacy />
      <PaginaLegale testo={TERMS_CONDITIONS_SA} />
      <SiteFooterTermsSa />
    </>
  );
}
