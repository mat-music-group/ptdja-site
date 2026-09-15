import type { NextConfig } from "next";

/*
 * Configurazione del sito PTDJA.
 *
 * Nasce da quella del repo landing (`Funnel/Landing_ADV/PTDJA/repo-start`) e ne
 * tiene una cosa sola: gli host remoti per `next/image`. Tutto il resto di là
 * (i rimandi 308 degli slug rinominati, il middleware di split A/B) riguarda le
 * landing e qui non esiste.
 *
 * ⚠️ I REDIRECT 301 DI WEBFLOW MANCANO, e non si inventano.
 *
 * Su Webflow stanno in Site settings → Publishing → 301 redirects. L'elenco va
 * esportato di là (lo fa Matteo) e replicato QUI DENTRO, in una funzione
 * `async redirects()` accanto a `images`, una voce per riga con
 * `{ source, destination, permanent: true }` — `permanent: true` è il 301,
 * `false` sarebbe un 308 temporaneo e non è quello che Webflow serve oggi.
 *
 * Finché l'elenco non arriva questa configurazione non ha redirect: scriverne
 * a memoria significherebbe mandare traffico vero su destinazioni indovinate.
 * Al cambio dominio, senza quelle righe, i link in giro (ads, email, partner,
 * risultati di ricerca) si rompono tutti insieme. È il punto 4 del piano in
 * `tasks/todo.md`.
 */
const nextConfig: NextConfig = {
  /*
   * `trailingSlash` non è dichiarato di proposito: il default di Next è
   * `false`, cioè URL senza slash finale, che è come Webflow serve il sito
   * (`/pricing-page`, non `/pricing-page/`). Metterlo a `true` creerebbe un
   * redirect su ogni URL canonico e cambierebbe tutti i canonical: non si
   * tocca.
   */

  /*
   * La radice del progetto, dichiarata invece che dedotta.
   *
   * Turbopack la indovina risalendo fino al primo lockfile che trova, e sulla
   * macchina di sviluppo ne esiste uno in `/Users/matteo`: senza questa riga
   * sceglieva la home dell'utente come radice del progetto, avvisandolo a ogni
   * build. Non è solo rumore, è la cartella da cui verrebbero risolti i file.
   */
  turbopack: {
    root: import.meta.dirname,
  },

  /*
   * Security header (Vibe Shield, /setup-security del 2026-09-15).
   *
   * Valgono per ogni risposta. Niente Content-Security-Policy per ora: la
   * pagina carica GTM via Stape, Mixpanel, Clarity, Wistia, Feedspace,
   * Trustpilot, Trengo, DynTube, Iubenda, VideoAsk e Google Fonts, e una CSP
   * scritta a tavolino romperebbe qualcuno di questi in silenzio. Va costruita
   * in report-only sull'URL di test, leggendo le violazioni, prima di
   * imporla. `X-Frame-Options: SAMEORIGIN` e non `DENY`: il sito non deve
   * essere incorniciato da terzi, ma non è escluso che una pagina interna
   * venga usata in un iframe del gruppo (campus, tool). HSTS è comunque
   * aggiunto da Vercel sui domini https; ripeterlo qui non fa danno e vale
   * anche su altri hosting.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      /* Gli asset del sito Webflow. Le immagini verranno scaricate in `public/`
         (piano, sezione 1), ma finché la migrazione degli asset non è completa
         una pagina può ancora puntare alla CDN di origine. */
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      /* Il muro di testimonianze Feedspace, presente su 6 delle 10 pagine. */
      { protocol: "https", hostname: "static.feedspace.io" },
    ],
  },
};

export default nextConfig;
