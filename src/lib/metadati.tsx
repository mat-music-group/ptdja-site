/*
 * I tag social delle pagine che su Webflow NON hanno `twitter:card`.
 *
 * Il problema, e perché non si risolve con l'export `metadata`.
 * ──────────────────────────────────────────────────────────────────────────
 * Cinque pagine di questo sito — `advanced-djs`, `recess`,
 * `terms-conditions`, `terms-conditions-sa`, `404` — hanno nell'head di
 * Webflow esattamente due tag social, e nient'altro:
 *
 *     <meta content="…" property="og:title"/>
 *     <meta content="…" name="twitter:title"/>
 *
 * Niente `twitter:card` (`docs/webflow/meta/*.json`: `"twitter:card": null`).
 *
 * Il campo `metadata` di Next non sa produrre questo. Il suo campo `twitter`
 * non è un elenco di tag ma una card da comporre, e il `card` se lo inventa
 * quando manca (`resolveTwitter` in
 * `next/dist/lib/metadata/resolvers/resolve-opengraph.js`:
 * `card = card || (images?.length ? 'summary_large_image' : 'summary')`).
 * Togliere il campo `twitter` non basta: `postProcessMetadata`
 * (`next/dist/lib/metadata/resolve-metadata.js`) vede che c'è `openGraph` e
 * RICOSTRUISCE `twitter` da lì, card compresa. Finché una pagina dichiara
 * `openGraph`, Next scrive un `twitter:card`: non c'è opzione per dire di no.
 *
 * E il campo `other`, che scrive le coppie alla lettera, le scrive tutte come
 * `name="…"`: un `og:title` uscirebbe con `name` invece di `property`, cioè
 * un tag che Facebook non legge. Sarebbe barattare un tag di troppo con un
 * tag rotto.
 *
 * Quindi questi due tag si scrivono a mano. React li solleva nell'`<head>`
 * anche se il componente sta nel corpo della pagina, e Next non ci mette
 * niente attorno. Le pagine che lo usano NON devono dichiarare `openGraph`
 * né `twitter` nel loro `metadata`: se lo fanno, il `twitter:card` torna e i
 * titoli finiscono in pagina due volte.
 *
 * Le pagine che su Webflow la card CE L'HANNO — `home`, `dj-course`,
 * `producer-course`, `mix-mastering-course`, `pricing-page`,
 * `play-get-signed` — non usano questo componente: continuano con i campi
 * `openGraph` e `twitter` di `metadata`, dove la card è dichiarata e
 * corrisponde al sito.
 */
export function TagSocialSenzaCard({ titolo }: { readonly titolo: string }) {
  return (
    <>
      <meta property="og:title" content={titolo} />
      <meta name="twitter:title" content={titolo} />
    </>
  );
}
