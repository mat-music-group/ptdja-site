import type { NextConfig } from "next";

/*
 * Configurazione del sito PTDJA.
 *
 * Nasce da quella del repo landing (`Funnel/Landing_ADV/PTDJA/repo-start`) e ne
 * tiene una cosa sola: gli host remoti per `next/image`. Tutto il resto di là
 * (i rimandi 308 degli slug rinominati, il middleware di split A/B) riguarda le
 * landing e qui non esiste.
 *
 * ⚠️ I redirect 301 configurati su Webflow (Site settings → Publishing) NON sono
 * ancora qui: l'elenco va esportato dal pannello e replicato prima del cambio
 * dominio, altrimenti i link in giro (ads, email, partner) si rompono nel
 * passaggio. È il punto 4 del piano in `tasks/todo.md`.
 */
const nextConfig: NextConfig = {
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
