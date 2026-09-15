import iubenda from "@/lib/iubenda.config.json";

/*
 * Iubenda Cookie Solution.
 *
 * ⛔ NON MONTATO NEL LAYOUT, e montarlo senza aver letto questo commento rompe
 * il consenso su tutto il sito.
 *
 * Il sito Webflow **non ha nessuna configurazione Iubenda nell'HTML**:
 * verificato il 2026-09-14 cercando `csConfiguration` in tutte le pagine
 * pubblicate, zero occorrenze. La Cookie Solution la carica **GTM**, dal
 * container `GTM-WLFQB5G`, attraverso il template Iubenda. Il container lo
 * montiamo già noi (`GoogleTags`), quindi il banner arriva da lì come sul sito.
 *
 * Montare anche questo componente significherebbe due configurazioni e due
 * caricamenti della stessa Cookie Solution nella stessa pagina, con la seconda
 * che sovrascrive la prima a seconda dell'ordine di arrivo: il classico difetto
 * che non dà errore e che si manifesta come "a volte il banner è diverso".
 *
 * A cosa serve allora che esista. A due cose, entrambe future:
 *
 * 1. Se un giorno si decide di togliere il CMP da GTM e gestirlo dal codice,
 *    come fanno le landing, il pezzo c'è già.
 * 2. `src/lib/iubenda.config.json` è il posto in cui scrivere la configurazione
 *    del sito quando qualcuno la estrarrà da GTM. Oggi quel file contiene la
 *    configurazione della LANDING, non quella del sito: le divergenze note sono
 *    elencate dentro il file, a partire dal `cookiePolicyId`, che sul sito è
 *    40840624 e non 27491891.
 *
 * ⚠️ Prima di montarlo va tolto il template Iubenda da GTM, non "provato per
 * vedere che succede".
 *
 * I tre script, tre lavori diversi:
 * - `autoblocking/3605700.js` blocca da sé gli script di terza parte noti finché
 *   il consenso non arriva. Il sito **non lo carica**: è la ragione per cui là
 *   Clarity e Mixpanel partono per tutti.
 * - `gpp/stub.js`: stub del Global Privacy Platform, richiesto dalla normativa
 *   statunitense che questa configurazione ha attiva (`enableUspr`).
 * - `iubenda_cs.js`: il banner.
 */
/* Come in `JsonLd`: un `<` nel JSON (per esempio `</script>` in un testo del
   banner) chiuderebbe il tag in anticipo. Si neutralizza (Vibe Shield, F6). */
function senzaMinore(valore: unknown): string {
  return JSON.stringify(valore).replace(/</g, "\\u003c");
}

export function Cmp() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `var _iub = _iub || [];
_iub.csConfiguration = ${senzaMinore(iubenda.csConfiguration)};
_iub.csLangConfiguration = ${senzaMinore(iubenda.csLangConfiguration)};`,
        }}
      />
      <script src="https://cs.iubenda.com/autoblocking/3605700.js" />
      <script src="https://cdn.iubenda.com/cs/gpp/stub.js" />
      <script src="https://cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async />
    </>
  );
}
