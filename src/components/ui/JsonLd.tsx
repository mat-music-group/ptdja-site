/*
 * Inietta un blocco JSON-LD identico a quello della pagina Webflow.
 *
 * I dati arrivano da `docs/webflow/meta/<slug>.json`, campo `jsonld`, copiati
 * senza toccarli: sono già pubblicati e indicizzati così, e ogni differenza
 * (anche solo un `@id` diverso) è un cambiamento SEO che nessuno ha chiesto.
 *
 * `dangerouslySetInnerHTML` è l'unico modo di mettere del testo dentro uno
 * `<script>` in React. Il rischio che il nome suggerisce qui non c'è: il
 * contenuto non viene da un utente, viene da un oggetto costante del repo,
 * serializzato da `JSON.stringify`. L'unica sequenza che potrebbe uscire dal
 * tag è `</script>`, e la si neutralizza sostituendo `<` con `<`.
 */

type ProprietaJsonLd = {
  readonly dati: unknown;
};

export function JsonLd({ dati }: ProprietaJsonLd) {
  const testo = JSON.stringify(dati).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: testo }}
    />
  );
}
