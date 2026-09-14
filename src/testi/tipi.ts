/*
 * Tipi condivisi dai file di testo.
 *
 * `TestoLegale` descrive le tre pagine di sola prosa (`terms-conditions`,
 * `terms-conditions-sa`, `recess`). Sul sito quelle pagine sono un singolo
 * `<p>` lunghissimo in cui i titoli di paragrafo sono `<strong>` e gli "a
 * capo" sono `<br>`: non c'è nessuna struttura semantica da cui ricavare
 * `<h3>` e paragrafi separati.
 *
 * Il modello qui sotto la rispecchia: un elenco di righe, ogni riga fatta di
 * segmenti che sono in grassetto o non lo sono. Una riga vuota è un `<br>`
 * senza testo. Ricostruire una gerarchia di titoli sarebbe più bello e
 * sarebbe una modifica al sito: non si fa.
 */

export type SegmentoTesto = {
  readonly grassetto: boolean;
  readonly testo: string;
};

export type RigaTesto = readonly SegmentoTesto[];

export type TestoLegale = {
  /** La riga sopra il titolo, minuscola nell'HTML e resa maiuscola dal CSS. */
  readonly eyebrow: string;
  readonly titolo: string;
  /** `true` dove l'HTML avvolge il titolo in uno `<strong>`. */
  readonly titoloInGrassetto: boolean;
  readonly righe: readonly RigaTesto[];
};
