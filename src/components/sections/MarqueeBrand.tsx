import Image from "next/image";
import type { LogoBrand } from "@/testi/home";

/*
 * La striscia dei loghi partner: `div.brand-slider-wrapper` con tre
 * `div.brand-slider-list` da 8, 7 e 7 immagini (22 in tutto).
 *
 * ── NON C'È NESSUNA ANIMAZIONE DA RIPRODURRE ──────────────────────────
 * Verificato riga per riga, il 2026-09-15:
 *   - nel foglio Webflow (`css/mats-mubly.webflow.shared.*.css`) le regole
 *     `.brand-slider-wrapper` e `.brand-slider-list` non hanno né `animation`
 *     né `transition`, e l'unico `@keyframes` di tutto il file è `spin`, che
 *     serve ad altro;
 *   - nell'HTML della home c'è un solo `<style>` inline, quello che nasconde
 *     gli elementi `data-ms-code` della valuta: zero `@keyframes`, zero
 *     `animation`;
 *   - in `custom-code-head.html`, `custom-code-footer.html` e
 *     `custom-code-per-pagina.md` le parole `keyframes` e `animation` non
 *     compaiono mai;
 *   - sul wrapper non c'è nessun `data-w-id`, quindi nemmeno un'interazione
 *     IX2.
 * Quindi la resa corretta, con il materiale di riferimento, è quella statica:
 * le tre liste una dopo l'altra a partire da sinistra, quello che esce dalla
 * larghezza della pagina tagliato da `overflow: hidden`.
 *
 * ⚠️ Nello screenshot di riferimento la striscia è fotografata più avanti
 * (si vedono la coda della prima lista e l'inizio della seconda): al momento
 * dello scatto qualcosa sul sito live la stava traslando, ma quel qualcosa non
 * è nel materiale scaricato. Non cambia l'altezza della pagina, cambia quali
 * loghi si vedono. Segnalata fra le divergenze.
 *
 * ── Misure ────────────────────────────────────────────────────────────
 *   .brand-slider-wrapper  flex riga, gap 30, align-items center, width auto,
 *                          overflow hidden, sfondo `--neutral-03`;
 *                          40px sopra e sotto a ≤767, zero a ≤479
 *   .brand-slider-list     flex, gap 30 (18 a ≤479), `flex: none`,
 *                          min-width 100, overflow clip
 *   .brand-partners        larghezza dall'attributo `width` dell'HTML
 *                          (214,5 / 250 / 232 / 90 / 230 / 220 / 140);
 *                          120px per tutti a ≤479
 */

type ProprietaMarqueeBrand = {
  readonly liste: readonly (readonly LogoBrand[])[];
};

export function MarqueeBrand({ liste }: ProprietaMarqueeBrand) {
  return (
    <div className="relative flex w-auto items-center gap-[30px] overflow-hidden bg-sfondo max-md:py-10 max-sm:mt-0 max-sm:py-0">
      {liste.map((lista, indice) => (
        <div
          /* Le tre liste sono quasi identiche: la chiave è la posizione. */
          key={indice}
          className="flex min-w-[100px] shrink-0 grow-0 basis-auto items-center justify-between gap-[30px] overflow-clip max-sm:gap-[18px]"
        >
          {lista.map((logo, i) => (
            <Image
              key={`${logo.src}-${i}`}
              src={logo.src}
              alt={logo.alt}
              width={logo.larghezza}
              height={logo.altezza}
              loading="lazy"
              sizes="(max-width: 479px) 120px, 250px"
              className="h-auto max-w-none max-sm:w-[120px]!"
              /* La larghezza arriva dall'attributo `width` dell'HTML, che è
                 un numero per logo (e per uno di loro ha pure i decimali:
                 214.5). Scriverla come classe vorrebbe dire sette utility
                 arbitrarie per una misura che è un dato, non uno stile. */
              style={{ width: `${logo.larghezzaResa}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
