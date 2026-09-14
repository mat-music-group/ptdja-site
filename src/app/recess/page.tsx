import type { Metadata } from "next";
import { SiteFooterRecess } from "@/components/layout/SiteFooterRecess";
import { SiteHeaderLegacy } from "@/components/layout/SiteHeaderLegacy";
import { PaginaLegale } from "@/components/sections/PaginaLegale";
import { TagSocialSenzaCard } from "@/lib/metadati";
import { RECESS } from "@/testi/recess";

/*
 * `/recess`: la politica di recesso e rimborso.
 *
 * Header vecchio (`684f4a0d`) e footer `be31567f`, cioè la variante di
 * `terms-conditions-sa` ma con il suo id: vedi la nota in
 * `SiteFooterRecess`.
 *
 * Metadati da `docs/webflow/meta/recess.json`: titolo "Recess" e canonical,
 * nessuna description, nessun JSON-LD.
 */

export const metadata: Metadata = {
  title: "Recess",
  alternates: { canonical: "https://www.petetong-djacademy.com/recess" },
  /* `og:title` e `twitter:title` NON stanno qui: la pagina non ha
     `twitter:card` su Webflow e il campo `openGraph` di Next ne creerebbe uno.
     Li scrive `TagSocialSenzaCard`, sotto. Vedi `src/lib/metadati.tsx`. */
};

export default function Recess() {
  return (
    <>
      <TagSocialSenzaCard titolo="Recess" />
      <SiteHeaderLegacy />
      <PaginaLegale testo={RECESS} />
      <SiteFooterRecess />
    </>
  );
}
