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

/*
 * ⚠️ DEVIAZIONE VOLUTA dal sito Webflow, richiesta di Matteo del 2026-09-15.
 *
 * `Docente` e `TitoloDocenti` non descrivono niente che esista sul sito: sono
 * la forma dei dati della sezione "The Academy Teachers" delle landing
 * beginner (`Funnel/Landing_ADV/PTDJA/repo-start`, tipo `Teacher` in
 * `src/testi/tipi.ts` di quel repo), portata qui al posto del carosello di
 * sole foto del Webflow. I testi restano quelli della landing, in inglese e
 * non riscritti; i nomi dei campi sono tradotti come nel resto di questo repo.
 *
 * `larghezza` e `altezza` non ci sono nella landing: là l'immagine è in
 * `fill`. Qui servono perché il sito usa `next/image` con le dimensioni reali
 * del file, e sono le dimensioni misurate dei PNG in `public/docenti/`.
 */
export type Docente = {
  /** Percorso sotto `public/`, es. `/docenti/pete.png`. */
  readonly foto: string;
  readonly larghezza: number;
  readonly altezza: number;
  readonly nome: string;
  /** La riga sotto il nome: la frase che dice perché quella persona conta. */
  readonly titoloValore: string;
  /** La seconda riga, più concreta della prima. */
  readonly sottotitolo: string;
  /** Il paragrafo che compare sulla foto al passaggio del puntatore. */
  readonly bio: string;
};

/** Le tre righe del titolo: occhiello verde, riga bianca, riga tenue. */
export type TitoloDocenti = {
  readonly occhiello: string;
  readonly rigaBianca: string;
  readonly sottotitolo: string;
};
