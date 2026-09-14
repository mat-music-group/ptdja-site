"use client";

import Script from "next/script";

/*
 * Il player DynTube, cioè l'embed `f870a03f` del custom code di pagina.
 *
 * Sul sito l'embed è questo, dentro un `div.code-embed-2.w-embed.w-script`:
 *
 *   <script>!function(e,t,i){if(void 0===e._dyntube_v1_init){
 *     e._dyntube_v1_init=!0; … src="https://embed.dyntube.com/v1.0/dyntube.js" …
 *   }}(window,document);</script>
 *   <div data-dyntube-key="lD6ElB9Lp0mDRAgFLJReJA"></div>
 *
 * Lo snippet inline fa una cosa sola: caricare `dyntube.js` una volta sola,
 * con la guardia `_dyntube_v1_init`. In Next quel lavoro lo fa `next/script`
 * con `afterInteractive`, che di suo non duplica lo script se il componente
 * viene montato due volte: la guardia diventa superflua e il comportamento è
 * lo stesso.
 *
 * Il `<div data-dyntube-key>` resta identico: è quello che la libreria cerca
 * nel DOM per sostituirlo col player. Non va avvolto in altro né gli si
 * cambiano le classi, o lo script non lo trova.
 *
 * ⚠️ L'altezza del player la decide `dyntube.js` dopo il caricamento: finché
 * non arriva, il div è alto zero. È così anche sul sito.
 */

type ProprietaDynTube = {
  /** Il valore di `data-dyntube-key`: identifica il video. */
  readonly chiave: string;
  /** Classi del contenitore (sul sito `.code-embed-2`). */
  readonly className?: string;
};

export function DynTube({ chiave, className = "" }: ProprietaDynTube) {
  return (
    <div className={className}>
      <Script
        id={`dyntube-${chiave}`}
        src="https://embed.dyntube.com/v1.0/dyntube.js"
        strategy="afterInteractive"
      />
      <div data-dyntube-key={chiave} />
    </div>
  );
}
