/*
 * ⚠️ DEVIAZIONE VOLUTA dal sito Webflow, richiesta di Matteo del 2026-09-15.
 *
 * Il sito Webflow mostra i docenti come un carosello di sole foto, senza nome
 * né testo. Al suo posto va la sezione "The Academy Teachers" delle landing
 * beginner: foto, nome, due righe e una bio che compare sulla foto.
 *
 * ── Provenienza, riga per riga ────────────────────────────────────────
 * Tutto quello che c'è qui dentro è copiato **tale e quale** dal repo delle
 * landing, `Funnel/Landing_ADV/PTDJA/repo-start`:
 *
 *   - `src/testi/dj.ts`        → `TITOLO_DJ` e `DOCENTI_DJ`
 *     (`teachersKicker` riga 28, `teachersWhite`/`teachersGray` righe 207-208,
 *      `teachers[]` righe 209-216)
 *   - `src/testi/producer.ts`  → `TITOLO_PRODUCER` e `DOCENTI_PRODUCER`
 *
 * Niente è riscritto, tradotto o accorciato: i testi restano in inglese come
 * sulla landing. Se una frase sembra da sistemare, va sistemata là e poi
 * riportata qui, altrimenti le due pagine divergono in silenzio.
 *
 * ── Le foto ───────────────────────────────────────────────────────────
 * Copiate da `public/teachers/` della landing in `public/docenti/`, nomi
 * invariati. Le dimensioni sono quelle reali dei file, misurate con `sips`:
 * 531x609 per quasi tutti, 531x600 per pete/carl/diplo, 532x871 per tsha
 * (ritratto molto più alto: per questo la card lo ancora in alto).
 */

import type { Docente, TitoloDocenti } from "@/testi/tipi";

/* Il ritaglio più comune. Le tre eccezioni sono scritte per esteso. */
const RITRATTO = { larghezza: 531, altezza: 609 } as const;
const RITRATTO_BASSO = { larghezza: 531, altezza: 600 } as const;

const PETE: Docente = {
  foto: "/docenti/pete.png",
  ...RITRATTO_BASSO,
  nome: "Pete Tong",
  titoloValore: "The voice of dance music",
  sottotitolo: "Radio legend, tastemaker since day one.",
  bio: "BBC Radio 1 host for over 30 years, MBE, and the man who broke countless dance records. Curator of Ibiza Classics with the Heritage Orchestra and founder of this academy.",
};

/* ── DJ ──────────────────────────────────────────────────────────────── */

export const TITOLO_DJ: TitoloDocenti = {
  occhiello: "Your teachers",
  rigaBianca: "The Academy Teachers.",
  sottotitolo:
    "Over 5 Grammys, 20 nominations, and 40 years of dance music between them. Your teachers across all the courses",
};

export const DOCENTI_DJ: readonly Docente[] = [
  PETE,
  {
    foto: "/docenti/carl.png",
    ...RITRATTO_BASSO,
    nome: "Carl Cox",
    titoloValore: "Three decks, zero rules",
    sottotitolo: "The eternal king of Space Ibiza.",
    bio: "15 legendary years of residency at Space Ibiza, headliner of every major festival on earth, and one of the most loved figures in techno. Pure crowd control, decades deep.",
  },
  {
    foto: "/docenti/adam.png",
    ...RITRATTO,
    nome: "Adam Beyer",
    titoloValore: "The Drumcode standard",
    sottotitolo: "Label boss who shaped modern techno.",
    bio: "Founder of Drumcode, the most influential techno label of the last two decades. Headliner at Awakenings, Time Warp and Tomorrowland, and a master of long-game consistency.",
  },
  {
    foto: "/docenti/nicole.png",
    ...RITRATTO,
    nome: "Nicole Moudaber",
    titoloValore: "Energy you can't fake",
    sottotitolo: "Peak-time force, MOOD founder.",
    bio: "Founder of MOOD Records and host of In The MOOD, broadcast to millions in over 100 countries. Described by Carl Cox as one of the most exciting DJs in the world.",
  },
  {
    foto: "/docenti/tsha.png",
    larghezza: 532,
    altezza: 871,
    nome: "TSHA",
    titoloValore: "The new wave",
    sottotitolo: "From bedroom loops to Glastonbury.",
    bio: "Ninja Tune signee, BBC Essential Mix of the Year winner and Fabric presents curator. Proof that the path from bedroom to festival stage is real, and fast.",
  },
  {
    foto: "/docenti/jamie.png",
    ...RITRATTO,
    nome: "Jamie Jones",
    titoloValore: "The groove architect",
    sottotitolo: "Hot Creations, Paradise at DC-10, Amnesia and UNVRS.",
    bio: "Founder of Hot Creations and the Paradise parties at DC-10 Ibiza. Voted #1 in Resident Advisor's top 100, he turned deep grooves into a global movement.",
  },
];

/* ── Producer ────────────────────────────────────────────────────────── */

/* `sottotitolo` è più corto di quello DJ: sulla landing producer la frase
   finisce a "between them.", senza la coda "Your teachers across all the
   courses". È una differenza della landing, non una svista. */
export const TITOLO_PRODUCER: TitoloDocenti = {
  occhiello: "Your teachers",
  rigaBianca: "The Academy Teachers.",
  sottotitolo:
    "Over 5 Grammys, 20 nominations, and 40 years of dance music between them.",
};

export const DOCENTI_PRODUCER: readonly Docente[] = [
  PETE,
  {
    foto: "/docenti/diplo.png",
    ...RITRATTO_BASSO,
    nome: "Diplo",
    titoloValore: "Three Grammys of range",
    sottotitolo: "From pop hits to underground heat.",
    bio: "Grammy-winning producer behind Major Lazer and Jack Ü with Skrillex. He has produced for the biggest names in pop while never leaving the club, a masterclass in range.",
  },
  {
    foto: "/docenti/parisi.png",
    ...RITRATTO,
    nome: "Parisi",
    titoloValore: "Engineering the impossible",
    sottotitolo: "The duo behind the modern club sound.",
    bio: "Italian production duo collaborating with Skrillex, MK and the sharpest names in dance music. Sound design, arrangement and mixdown pushed to the edge.",
  },
  {
    foto: "/docenti/ame.png",
    ...RITRATTO,
    nome: "Âme",
    titoloValore: "Deep house royalty",
    sottotitolo: "Innervisions co-founders, authors of Rej.",
    bio: "Co-founders of Innervisions with Dixon and authors of Rej, one of the most influential deep house records ever. Depth, emotion and timeless arrangement.",
  },
  {
    foto: "/docenti/reloud.png",
    ...RITRATTO,
    nome: "The Reloud",
    titoloValore: "Method over magic",
    sottotitolo: "The minds behind the MAT method.",
    bio: "Producers and educators behind the academy's method: a repeatable process that takes you from first loop to finished, label-ready track. No mystery, just method.",
  },
  {
    foto: "/docenti/luca.png",
    ...RITRATTO,
    nome: "Luca Pretolesi",
    titoloValore: "The mix & master ear",
    sottotitolo: "Engineer for Diplo, Snoop Dogg, Steve Aoki.",
    bio: "Founder of Studio DMI in Las Vegas, mixing and mastering engineer for Diplo, Major Lazer and Snoop Dogg. Grammy-nominated, and the ear behind countless chart records.",
  },
];

/* ── Home ────────────────────────────────────────────────────────────── */

/*
 * L'unione delle due liste, DJ prima e producer poi, senza doppioni: Pete Tong
 * è in tutte e due e va mostrato una volta sola. Sono 11 persone, lo stesso
 * numero di slide che aveva il carosello Webflow della home (coincidenza, non
 * un vincolo: le facce non sono le stesse).
 *
 * Il confronto è su `foto`, non su `nome`: è la chiave che identifica il file,
 * e due voci con la stessa foto sarebbero comunque un doppione a schermo.
 */
export const DOCENTI_HOME: readonly Docente[] = [
  ...DOCENTI_DJ,
  ...DOCENTI_PRODUCER.filter(
    (docente) => !DOCENTI_DJ.some((gia) => gia.foto === docente.foto),
  ),
];

/* Il titolo della home è quello DJ: è l'unico dei due che dice "across all the
   courses", cioè esattamente cosa sono le 11 persone messe insieme. */
export const TITOLO_HOME: TitoloDocenti = TITOLO_DJ;
