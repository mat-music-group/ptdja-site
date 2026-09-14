/*
 * Testi della pagina `advanced-djs`.
 *
 * È la pagina più corta del sito: un iframe VideoAsk e un bottone. Niente
 * header, niente footer, niente tracking di pagina. Da
 * `docs/webflow/outline/advanced-djs.md`.
 */

export const ADVANCED_DJS = {
  meta: {
    title: "Advanced DJs",
    canonical: "https://www.petetong-djacademy.com/advanced-djs",
  },
  videoask: {
    src: "https://www.videoask.com/fu1pxfvu9",
    /* L'altezza è fissa nell'attributo `height` dell'iframe, non nel CSS. */
    altezza: 600,
  },
  cta: {
    testo: "Bring Me to My Recommended Course",
    /* Link assoluto e con lo slash finale prima dell'ancora: è così
       nell'HTML, e punta a una pagina fuori dal perimetro della fase 1. */
    href: "https://www.petetong-djacademy.com/dj-course-advanced-path/#program",
  },
} as const;
