"use client";

import type { MouseEvent, ReactNode } from "react";
import { tracciaTrustpilotCtaClicked } from "@/lib/eventi-mixpanel";

/*
 * Il link "Trustpilot 4.7 ★" dentro la frase "Trusted by hundreds on …".
 *
 * Nell'HTML Webflow è un `<a target="_blank">` dentro un `<p class="paragraph
 * home-trustpilot">`, e il footer ci aggancia l'evento `Trustpilot CTA Clicked`
 * con il selettore `p.paragraph a[href*="trustpilot.com"]`.
 *
 * ── DOVE VIVE, E DOVE NON VIVE ──────────────────────────────────────────
 * Quel selettore, sulle 11 pagine pubblicate, prende **quattro** link in tutto:
 * i due della hero della home (versione desktop e versione mobile) e quello a
 * metà pagina di `dj-course`, `producer-course` e `mix-mastering-course` (uno
 * per pagina). Le altre occorrenze della stessa frase hanno classe
 * `paragraph-13/-14/-15` invece di `paragraph`, quindi il selettore NON le
 * prende e il sito, lì, non traccia niente: è una disuguaglianza del custom
 * code, non una svista, e si riproduce montando questo componente solo dove il
 * selettore del sito arriva davvero.
 *
 * Su `/pricing-page` e `/play-get-signed` non c'è nessuno di questi link, né su
 * Webflow né qui.
 *
 * Il componente è separato dalla frase che lo contiene perché la frase cambia
 * classi e posizione da una hero all'altra, mentre il link e il suo evento no.
 */

type ProprietaLinkTrustpilot = {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export function LinkTrustpilot({
  href,
  children,
  className,
}: ProprietaLinkTrustpilot) {
  const suClick = (evento: MouseEvent<HTMLAnchorElement>) =>
    tracciaTrustpilotCtaClicked(evento.currentTarget);

  return (
    <a
      href={href}
      target="_blank"
      /* Nell'HTML Webflow c'è `target="_blank"` e basta: niente `rel`. Si copia
         com'è, `noopener` compreso — cioè assente. */
      className={className}
      onClick={suClick}
    >
      {children}
    </a>
  );
}
