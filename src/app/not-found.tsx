/*
 * Segnaposto della 404.
 *
 * Verrà rifatta dalla pagina 404 del sito Webflow, che ha il suo header, il suo
 * footer e il suo copy. Per ora serve a una cosa sola: che una rotta inesistente
 * risponda 404 con un documento completo di layout, così il test delle rotte può
 * verificarlo prima ancora che esistano le pagine vere.
 *
 * Nessun `export const metadata` qui: `not-found` non è una `page`, e l'App
 * Router non ne legge i metadati. Il titolo lo dà il layout. Quando arriverà la
 * 404 vera, se le serve un titolo suo, si passa da `generateMetadata` della
 * rotta catch all, non da questo file.
 */
export default function NotFound() {
  return (
    <main className="font-lato p-12">
      <h1 className="font-oswald text-4xl">404</h1>
      <p>Page not found.</p>
    </main>
  );
}
