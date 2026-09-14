import { GTM_CONTAINER_ID, STAPE_HOST } from "@/lib/analytics.config";

/*
 * Google Tag Manager, ed è QUI che il sito diverge dalle landing.
 *
 * Sulle landing non c'è GTM affatto: GA4 e Google Ads sono chiamati a codice
 * (`GoogleTags` del repo landing) perché là il container non è mai stato
 * installato. Sul sito GTM c'è dal principio, ed è lui a portare dentro tutto il
 * resto: GA4, il pixel Meta, la Cookie Solution di Iubenda. Rifarne una metà a
 * codice significherebbe mandare gli stessi eventi due volte da due sistemi che
 * non si deduplicano fra loro.
 *
 * IL LOADER NON È QUELLO STANDARD. Non è `googletagmanager.com/gtm.js`: è il
 * loader server side di Stape, servito da `sgtm.petetong-djacademy.com` sotto un
 * nome di file offuscato (`ezffoibuv.js`), con il container passato come stringa
 * cifrata invece che come `GTM-XXXXXXX` in chiaro. È la ragione per cui il
 * tracciamento del sito passa anche dove un adblock ferma il dominio di Google:
 * lo script arriva da un sottodominio del brand.
 *
 * ⚠️ Riprodotto VERBATIM dall'HTML del sito, compresa la stringa del container.
 * Non va "normalizzato" nella forma standard: quella caricherebbe il container
 * dal dominio di Google e butterebbe via il vantaggio per cui il proxy Stape
 * esiste. Fonte: `<head>` di ogni pagina pubblicata, letto il 2026-09-14.
 *
 * Il `<noscript>` invece punta al dominio di Google, esattamente come sul sito:
 * è il ripiego per chi ha JavaScript spento, e là il proxy non serve.
 *
 * Perché uno `<script>` in linea e non `next/script`: questo tag deve finire
 * nell'HTML servito, alla posizione in cui lo mettiamo. Con
 * `strategy="afterInteractive"` GTM partirebbe solo dopo l'idratazione di React,
 * cioè dopo tutto il resto, e il container è ciò che carica il CMP.
 */

/** La stringa cifrata che Stape usa al posto dell'ID container in chiaro. */
const STAPE_CONTAINER_PARAM =
  "8=HxFfLjsrSy06MzMrWiFADEtHTFhJAghHBhAWDBsJCB1bEQgIDAcCHxsMTAoACw%3D%3D";

const STAPE_LOADER = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="${STAPE_HOST}/ezffoibuv.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${STAPE_CONTAINER_PARAM}');`;

export function GoogleTags() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: STAPE_LOADER }} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
