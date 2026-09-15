import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import { TagSocialSenzaCard } from "@/lib/metadati";
import { NOT_FOUND } from "@/testi/404";

/*
 * La pagina 404, ricostruita da `docs/webflow/html/404.html` e
 * `outline/404.md`.
 *
 * ⚠️ STRANEZZA DEL SITO, RIPRODOTTA COM'È ────────────────────────────────
 * Sia il link dentro il paragrafo ("homepage") sia il bottone "Go back home"
 * puntano a `/old-home`, non alla home. `/old-home` non è nel perimetro della
 * fase 1: chi ci clicca finisce su un'altra 404. È così sul sito pubblicato e
 * la regola numero uno del repo dice di riprodurre e segnalare, non di
 * correggere in silenzio. Segnalato in `handoff.md`.
 *
 * Misure dal CSS: la sezione è `aside._404-section.inner-page-padding.section-padding`,
 * quindi 200px sopra (`inner-page-padding` vince su `section-padding` perché
 * viene dopo nel foglio) e 120px sotto; il blocco è centrato con 80px fra
 * immagine e testo; l'immagine è larga al massimo 638px; il titolo è
 * `.display-heading-2`, 56px peso 500 (36px sotto i 480px); il paragrafo è
 * 16px con interlinea 180% e 20px di padding sotto.
 *
 * ⚠️ Tutte e quattro le misure verticali scalano con i breakpoint e senza le
 * varianti la pagina era 210px più alta dell'originale sul telefono
 * (misurato il 15/09): `.inner-page-padding` 200/140/120/120,
 * `.section-padding` 120/80/60/50, `._404-wrapper` gap 80/60/40/40,
 * `._404-content-block` gap 48/48/20/20, `._404-content` gap 24/24/24/16,
 * `.display-heading-2` 56/50/42/36, `.body-text-16-regular` 16/16/16/15.
 *
 * Animazioni: immagine e blocco di testo entrano con `slideInBottom`, con
 * 100 ms e 200 ms di ritardo (dall'IX2 pubblicato).
 */

export const metadata: Metadata = {
  title: NOT_FOUND.meta.title,
  alternates: { canonical: NOT_FOUND.meta.canonical },
  robots: { index: false, follow: true },
  /* `og:title` e `twitter:title` NON stanno qui: la pagina non ha
     `twitter:card` su Webflow e il campo `openGraph` di Next ne creerebbe uno.
     Li scrive `TagSocialSenzaCard`, sotto. Vedi `src/lib/metadati.tsx`. */
};

export default function NotFound() {
  return (
    <>
      <TagSocialSenzaCard titolo={NOT_FOUND.meta.title} />
      <SiteHeader />

      <aside className="bg-sfondo pb-sezione pt-[200px] max-lg:pb-20 max-lg:pt-[140px] max-md:pb-[60px] max-md:pt-[120px] max-sm:pb-[50px]">
        {/* `.container` a ≤479: `padding-bottom: 10px` oltre alla perdita dei
            30px di lato. */}
        <div className="mx-auto flex w-full max-w-sito flex-col items-center px-[30px] max-sm:px-0 max-sm:pb-[10px]">
          {/* `w-full` sui due blocchi animati: dentro un flex in colonna con
              `items-center` un figlio senza larghezza si restringe al suo
              contenuto, e su un telefono l'illustrazione e il paragrafo
              finirebbero in una colonna più stretta della pagina. */}
          <div className="flex w-full flex-col items-center justify-center gap-20 text-center max-lg:gap-[60px] max-md:gap-10">
            <RivelaAllaVista ritardo={100} className="w-full">
              <div className="mx-auto flex w-full max-w-[638px] flex-col items-start">
                <Image
                  src={NOT_FOUND.immagine.src}
                  alt={NOT_FOUND.immagine.alt}
                  width={NOT_FOUND.immagine.larghezza}
                  height={NOT_FOUND.immagine.altezza}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </RivelaAllaVista>

            <RivelaAllaVista ritardo={200} className="w-full">
              <div className="mx-auto flex w-full max-w-testo flex-col items-center gap-12 max-md:gap-5">
                <div className="flex flex-col items-center gap-6 max-sm:gap-4">
                  <h1 className="text-[56px] font-medium leading-[125%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[42px] max-sm:text-[36px]">
                    {NOT_FOUND.titolo}
                    <br />
                  </h1>
                  <p className="m-0 pb-5 text-base font-normal leading-[180%] tracking-[-0.4px] text-bianco max-sm:text-[15px]">
                    {NOT_FOUND.paragrafo}{" "}
                    <Link href={NOT_FOUND.linkTesto.href} className="text-mint">
                      {NOT_FOUND.linkTesto.testo}
                      <br />
                    </Link>
                  </p>
                </div>

                <Button
                  href={NOT_FOUND.cta.href}
                  id="buy-now-header"
                  variante="mint"
                  icona={{
                    src: NOT_FOUND.cta.icona.src,
                    alt: NOT_FOUND.cta.icona.alt,
                    lato: 24,
                  }}
                >
                  {NOT_FOUND.cta.testo}
                </Button>
              </div>
            </RivelaAllaVista>
          </div>
        </div>
      </aside>

      <SiteFooter />
    </>
  );
}
