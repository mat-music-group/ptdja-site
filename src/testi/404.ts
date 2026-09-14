/*
 * Testi della pagina 404.
 *
 * Da `docs/webflow/outline/404.md` e `docs/webflow/meta/404.json`.
 *
 * ⚠️ `linkTesto.href` e `cta.href` puntano a `/old-home` e non a `/`: è così
 * sul sito pubblicato, e si riproduce. Vedi la nota in `src/app/not-found.tsx`.
 */

export const NOT_FOUND = {
  meta: {
    title: "Not Found",
    canonical: "https://www.petetong-djacademy.com/404",
  },
  immagine: {
    src: "/webflow/404/404.png",
    alt: "",
    larghezza: 1272,
    altezza: 830,
  },
  titolo: "Oops! Page Not Found",
  paragrafo:
    "We couldn’t find the page you were looking for. It might have been removed, renamed, or temporarily unavailable. Feel free to head back to our",
  linkTesto: { testo: "homepage", href: "/old-home" },
  cta: {
    testo: "Go back home",
    href: "/old-home",
    icona: { src: "/webflow/404/arrowgrey.png", alt: "" },
  },
} as const;
