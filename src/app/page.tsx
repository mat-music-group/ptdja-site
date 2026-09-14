import type { Metadata } from "next";

/*
 * Segnaposto.
 *
 * Verrà sostituito dalla home ricostruita a componenti dall'HTML Webflow
 * (`docs/webflow/home.html` più gli screenshot di riferimento). Non aggiungere
 * niente qui: qualunque cosa si scriva adesso è copy inventato, e la regola
 * numero uno di questo repo è che nessuna stringa esista senza venire dal sito.
 *
 * Esiste comunque perché una rotta `/` che risponde 200 è ciò che permette al
 * test in `test/rotte.mjs` di verificare, fin dal primo giorno, che il
 * tracciamento sia montato e che gli script che abbiamo deciso di non portare
 * non rientrino di soppiatto.
 */

export const metadata: Metadata = {
  title: "Pete Tong DJ Academy — in costruzione",
  robots: { index: false, follow: false },
};

export default function Home() {
  /* Le due utility dei font non sono decorazione: sono l'unico punto in cui
     `font-oswald` e `font-lato` vengono usate oggi, e Tailwind genera una
     utility solo se qualcuno la usa. Finché la home vera non arriva, servono a
     tenere in piedi la prova che la catena next/font → variabile CSS → utility
     funziona davvero. */
  return (
    <main className="font-lato p-12">
      <h1 className="font-oswald text-4xl">in costruzione</h1>
    </main>
  );
}
