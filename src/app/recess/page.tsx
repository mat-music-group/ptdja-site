import type { Metadata } from "next";
import { SiteFooterRecess } from "@/components/layout/SiteFooterRecess";
import { SiteHeaderLegacy } from "@/components/layout/SiteHeaderLegacy";
import { PaginaLegale } from "@/components/sections/PaginaLegale";
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
  openGraph: { title: "Recess" },
  twitter: { title: "Recess" },
};

export default function Recess() {
  return (
    <>
      <SiteHeaderLegacy />
      <PaginaLegale testo={RECESS} />
      <SiteFooterRecess />
    </>
  );
}
