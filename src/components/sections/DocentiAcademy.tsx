"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Docente, TitoloDocenti } from "@/testi/tipi";

/*
 * ⚠️ DEVIAZIONE VOLUTA dal sito Webflow, richiesta di Matteo del 2026-09-15.
 *
 * Questa sezione **non esiste** sul sito Webflow. Prende il posto della coppia
 * `TitoloDocentiCorso` + `SliderDocenti` (rimossi), cioè del titolo "DJ Course
 * Teachers" e del carosello di sole foto, su home, `/dj-course` e
 * `/producer-course`.
 *
 * L'originale è la sezione "The Academy Teachers" delle landing beginner:
 * `Funnel/Landing_ADV/PTDJA/repo-start`, funzioni `Teachers` e `TeacherCard`
 * in `src/components/sections.tsx`, più `TwoTone` e `CarouselArrows` di
 * `src/components/ui.tsx`. Là sono quattro pezzi riusati da mezza landing;
 * qui sono un file solo, perché nel sito nient'altro li usa: tenerli separati
 * vorrebbe dire tre file che hanno un chiamante ciascuno.
 *
 * ── Comportamento, identico alla landing ──────────────────────────────
 * Scorrimento nativo in orizzontale con `snap-x snap-mandatory` (niente
 * libreria, niente `transform`: è `overflow-x: auto` più lo snap del browser,
 * quindi il dito e la rotella funzionano da soli). Le frecce fanno `scrollBy`
 * di una card più il gap. La bio compare sopra la foto al passaggio del
 * puntatore; da tastiera e su touch si apre col clic, che è il motivo per cui
 * la card è un `role="button"` e non un `div` muto.
 *
 * `bioSempreVisibile` è l'`openBio` della landing, con lo stesso default
 * `false`: la bio sta sopra la foto e si scopre, non sotto il nome. Le pagine
 * corso della landing passano `openBio`; qui nessuna pagina lo fa, ma la
 * variante è portata perché è l'altra metà del componente originale.
 *
 * ── Adattamento ai token del sito ─────────────────────────────────────
 * La landing ha una tavolozza sua (`ground`, `panel`, `ink`, `muted`) che qui
 * non esiste. Corrispondenze scelte, una per una:
 *
 *   landing            sito                      perché
 *   ─────────────────  ────────────────────────  ─────────────────────────
 *   text-ink #f5f5f6   text-bianco #ffffff       il bianco del sito
 *   text-muted #8a8f98 text-testo-tenue #aaaaaa  il grigio delle righe
 *                                                 secondarie del listino
 *   text-ink-soft      text-testo-chiaro         #c9cbce contro #c9c9c9:
 *                       #c9c9c9                   praticamente lo stesso
 *   bg-ground #0a0a0b  bg-sfondo #1e1e1e         il fondo di ogni sezione
 *   bg-panel #141416   bg-grigio-sfondo #323030  la pillola delle frecce deve
 *                                                 staccarsi dal fondo: sul
 *                                                 sito il fondo è più chiaro,
 *                                                 quindi la pillola sale
 *   bg-panel-2 #1c1c1f bg-bordo #4e4e4e          il tasto "avanti" resta un
 *                                                 gradino sopra la pillola
 *   hover #2b2b2f      bg-bordo-chiaro #5a5a5a   stesso gradino in hover
 *   mint #37e0a3       mint #62e8bb              il verde del brand, qui è
 *                                                 quello di Webflow
 *
 * Il font non si tocca: `--font-sans` è Geist in tutti e due i repo, ed è già
 * il default del `body`.
 *
 * ⚠️ `tracking-normal` sparso sui titoli e sui paragrafi non è decorazione. Il
 * `@layer base` di `globals.css` copia i default Webflow, che danno a `h2`
 * -1.8px, a `h3` -1.5px e a `p` -0.8px di `letter-spacing`. La landing gira
 * con `letter-spacing: 0 !important` sul `body` e quindi non se ne accorge:
 * senza queste classi le stesse righe qui uscirebbero strizzate.
 *
 * ── Immagini ──────────────────────────────────────────────────────────
 * La landing usa `next/image` in `fill`. Qui, come il resto del sito, si passa
 * `width`/`height` reali del file (vedi `src/testi/docenti.ts`): il riquadro
 * ha già il suo rapporto 280/330 e `object-cover` fa il ritaglio, quindi il
 * risultato a schermo è lo stesso ma il browser conosce la forma nativa.
 *
 * ── Niente tracciamento ───────────────────────────────────────────────
 * Sulla landing queste card non emettono eventi, e lo slider Webflow che
 * sostituiscono non ne emetteva: qui non si aggiunge niente. Il catalogo del
 * sito è `src/lib/eventi-mixpanel.ts` e non prevede questa sezione.
 */

/* Larghezza di una card e distanza fra due card, in pixel: servono sia al CSS
   sia al calcolo dello scorrimento delle frecce. Sotto i 768px la card è più
   stretta, come sulla landing. */
const GAP = 20;
const GAP_DESKTOP = 24;

type ProprietaCard = {
  readonly docente: Docente;
  readonly bioSempreVisibile: boolean;
};

function CardDocente({ docente, bioSempreVisibile }: ProprietaCard) {
  const [aperta, setAperta] = useState(false);

  /* TSHA è l'unico ritratto molto più alto che largo (532x871): ritagliato al
     centro perderebbe la testa, quindi si ancora in alto. Sulla landing la
     regola è la stessa, scritta come `t.photo.includes("tsha")`. */
  const ancoraInAlto = docente.foto.includes("tsha");

  const immagine = (classi: string) => (
    <Image
      src={docente.foto}
      alt={docente.nome}
      width={docente.larghezza}
      height={docente.altezza}
      sizes="(max-width: 767px) 230px, 260px"
      className={`h-full w-full object-cover ${ancoraInAlto ? "object-top" : ""} ${classi}`}
    />
  );

  if (bioSempreVisibile)
    return (
      <div>
        <div className="relative aspect-[280/330] overflow-hidden rounded-[22px]">
          {immagine("")}
        </div>
        <h3 className="mt-4 text-[16px] font-medium leading-tight tracking-normal text-bianco md:text-[18px]">
          {docente.nome}
        </h3>
        <p className="mt-2 text-pretty text-[13px] leading-[1.45] tracking-normal text-testo-tenue md:text-[13.5px]">
          {docente.bio}
        </p>
      </div>
    );

  return (
    <div
      className="group cursor-pointer select-none rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-sfondo"
      onClick={() => setAperta((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setAperta((v) => !v);
        }
      }}
      aria-expanded={aperta}
    >
      <div className="relative aspect-[280/330] overflow-hidden rounded-[22px]">
        {immagine(
          `transition-all duration-300 group-hover:scale-[1.02] group-hover:blur-[6px] group-hover:brightness-[0.3] ${
            aperta ? "scale-[1.02] blur-[6px] brightness-[0.3]" : ""
          }`,
        )}
        <div
          className={`absolute inset-0 flex items-end p-[10px] transition-opacity duration-300 ${
            aperta ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        >
          <p className="text-[11px] leading-[1.3] tracking-normal text-bianco md:text-[15px]">
            {docente.bio}
          </p>
        </div>
      </div>
      <h3 className="mt-5 text-[20px] font-normal leading-tight tracking-normal text-bianco md:text-[28px]">
        {docente.nome}
      </h3>
      <p className="mt-1.5 line-clamp-1 text-[14px] leading-[1.2] tracking-normal text-testo-tenue md:text-[16px]">
        {docente.titoloValore}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[14px] leading-[1.2] tracking-normal text-testo-tenue md:text-[16px]">
        {docente.sottotitolo}
      </p>
    </div>
  );
}

/* Le due frecce della landing (`CarouselArrows`): una pillola con dentro
   "indietro" trasparente e "avanti" pieno. */
function FrecceCarosello({
  onIndietro,
  onAvanti,
}: {
  readonly onIndietro: () => void;
  readonly onAvanti: () => void;
}) {
  const tratto = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-grigio-sfondo p-1.5">
      <button
        type="button"
        aria-label="Previous"
        onClick={onIndietro}
        className="group grid h-10 w-10 cursor-pointer place-items-center rounded-full transition-colors duration-200 hover:bg-white/5"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-testo-chiaro transition-colors duration-200 group-hover:text-bianco"
          {...tratto}
          aria-hidden="true"
        >
          <path d="m14 6-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={onAvanti}
        className="group grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-bordo transition-colors duration-200 hover:bg-bordo-chiaro"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-testo-chiaro transition-colors duration-200 group-hover:text-bianco"
          {...tratto}
          aria-hidden="true"
        >
          <path d="m10 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

export type ProprietaDocentiAcademy = {
  readonly titolo: TitoloDocenti;
  readonly docenti: readonly Docente[];
  /** L'`openBio` della landing: bio stampata sotto il nome invece che sulla foto. */
  readonly bioSempreVisibile?: boolean;
};

export function DocentiAcademy({
  titolo,
  docenti,
  bioSempreVisibile = false,
}: ProprietaDocentiAcademy) {
  const pista = useRef<HTMLDivElement>(null);

  const scorri = (direzione: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const passo =
      (card?.offsetWidth ?? 240) + (window.innerWidth >= 768 ? GAP_DESKTOP : GAP);
    el.scrollBy({ left: direzione * passo, behavior: "smooth" });
  };

  /* Spaziatura: `pt-sezione` e `pb-0` sono quelle di tutte le sezioni vicine
     (VirtualTour, SuccessStories, TalentPoolCorso…), con le tre soglie
     Webflow. Le due sezioni che questa sostituisce sommavano 60+40+30+25px
     sopra: partire da qui tiene il ritmo verticale della pagina. */
  return (
    <section className="block overflow-hidden bg-sfondo pb-0 pt-sezione max-lg:pt-20 max-md:pt-[60px] max-sm:pt-[50px]">
      {/* Il titolo sta in una colonna da 1100px, la misura della landing: il
          `max-w-sito` da 1380 del Webflow qui allargherebbe righe pensate per
          26 e 54 caratteri. */}
      <div className="mx-auto w-full max-w-[1100px] px-4 text-center">
        {titolo.occhiello && (
          <p className="mb-3 inline-flex items-center gap-2 text-[14px] font-semibold uppercase leading-normal tracking-[0.14em] text-mint">
            <PallinoLampeggiante />
            {titolo.occhiello}
            <PallinoLampeggiante />
          </p>
        )}
        <h2 className="mx-auto max-w-[26ch] text-balance text-[clamp(24px,4.2vw,36px)] font-medium leading-[1.18] tracking-normal text-bianco">
          {titolo.rigaBianca}
        </h2>
        {titolo.sottotitolo && (
          <p className="mx-auto mt-4 max-w-[54ch] text-pretty text-[17px] leading-relaxed tracking-normal text-testo-tenue lg:text-[20px]">
            {titolo.sottotitolo}
          </p>
        )}
      </div>

      {/* La pista. Il padding laterale asimmetrico allinea la prima card al
          bordo della colonna da 1100px e lascia scorrere l'ultima fino in
          fondo; `scroll-px` fa fermare lo snap nello stesso punto. */}
      <div
        ref={pista}
        className="no-scrollbar mt-[40px] flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 md:gap-6 md:scroll-px-[max(16px,calc((100vw-1100px)/2))] md:px-[max(16px,calc((100vw-1100px)/2))]"
      >
        {docenti.map((docente) => (
          <div
            key={docente.foto}
            data-card
            className="w-[230px] shrink-0 snap-start md:w-[260px]"
          >
            <CardDocente docente={docente} bioSempreVisibile={bioSempreVisibile} />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-[1100px] justify-center px-4">
        <FrecceCarosello onIndietro={() => scorri(-1)} onAvanti={() => scorri(1)} />
      </div>
    </section>
  );
}

/* Il pallino verde ai due lati dell'occhiello. `animate-[blink_…]` usa la
   keyframe `blink` dichiarata in `globals.css`. */
function PallinoLampeggiante() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 animate-[blink_1.6s_ease-in-out_infinite] rounded-full bg-mint"
    />
  );
}
