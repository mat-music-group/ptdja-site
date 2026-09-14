import Script from "next/script";

/*
 * Il bootstrap dei widget Trustpilot.
 *
 * ⚠️ NON è montato nel layout, di proposito, e questa è l'unica differenza
 * strutturale rispetto al sito Webflow su questo script. Là sta nell'`<head>` di
 * ogni pagina, comprese quelle che non hanno nessun widget: sono circa 50KB di
 * JavaScript di terza parte caricati per niente su metà del sito.
 *
 * Qui lo monta la pagina che ha davvero un widget, insieme al widget. Il
 * risultato a schermo è identico dove il widget c'è, e dove non c'è la pagina
 * non paga niente.
 *
 * Uso:
 *
 *     <TrustpilotWidget
 *       templateId="53aa8912dec7e10d38f59f36"
 *       height="140px"
 *       token="…"
 *     />
 *
 * `businessunit-id` è unico per il brand e vive qui. `template-id`, altezza,
 * token, stelle e lingue cambiano widget per widget: si copiano dall'HTML
 * Webflow della pagina che si sta ricostruendo, senza inventarne di nuovi.
 *
 * Il `<a>` interno non è decorativo: Trustpilot lo sostituisce col widget vero e,
 * finché lo script non è arrivato, è il ripiego visibile. Sul sito c'è, quindi
 * resta.
 */

const BOOTSTRAP_SRC = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
const BUSINESS_UNIT_ID = "63690996cb86e3016af6e8e2";
const REVIEW_URL = "https://www.trustpilot.com/review/petetong-djacademy.com";

/** Il caricatore, una volta sola per pagina: `next/script` deduplica per `src`. */
export function TrustpilotBootstrap() {
  return <Script src={BOOTSTRAP_SRC} strategy="afterInteractive" />;
}

export function TrustpilotWidget({
  templateId,
  height,
  token,
  locale = "en-US",
  stars = "4,5",
  theme = "dark",
  width = "100%",
}: {
  /** `data-template-id` del widget, copiato dall'HTML Webflow della pagina. */
  templateId: string;
  /** `data-style-height`, per esempio "140px". */
  height: string;
  /** `data-token` del widget. */
  token: string;
  locale?: string;
  stars?: string;
  theme?: string;
  width?: string;
}) {
  return (
    <>
      <TrustpilotBootstrap />
      <div
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height={height}
        data-style-width={width}
        data-theme={theme}
        data-token={token}
        data-stars={stars}
      >
        <a href={REVIEW_URL} target="_blank" rel="noopener">
          Trustpilot
        </a>
      </div>
    </>
  );
}
