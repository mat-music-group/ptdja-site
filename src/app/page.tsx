import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { Faq } from "@/components/sections/Faq";
import { HeroHome } from "@/components/sections/HeroHome";
import { MarqueeBrand } from "@/components/sections/MarqueeBrand";
import { MoreThanACourse } from "@/components/sections/MoreThanACourse";
import { OpportunitaTalentPool } from "@/components/sections/OpportunitaTalentPool";
import { PlayGetSignedTeaser } from "@/components/sections/PlayGetSignedTeaser";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Reviews } from "@/components/sections/Reviews";
import { SliderCorsi } from "@/components/sections/SliderCorsi";
import { SliderDocenti } from "@/components/sections/SliderDocenti";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { VirtualTour } from "@/components/sections/VirtualTour";
import { Trengo } from "@/components/tracking/Trengo";
import { JsonLd } from "@/components/ui/JsonLd";
import { RivelaAllaVista } from "@/components/ui/RivelaAllaVista";
import {
  BRAND,
  CORSI,
  CORSI_INTRO,
  DOCENTI,
  DOMANDE,
  JSON_LD,
  META,
  OPPORTUNITA,
  SUCCESS_STORIES,
  VIRTUAL_TOUR,
} from "@/testi/home";

/*
 * La home, `/`.
 *
 * Ordine dei blocchi, dall'HTML pubblicato (17 di primo livello: header,
 * 15 sezioni e footer):
 *   header → hero con il muro di 70 immagini → occhiello "YOUR TEACHERS" →
 *   carosello degli 11 docenti + occhiello "PARTNERS" → striscia dei 22 loghi
 *   → "LEARNING / Our Courses" → carosello dei 3 corsi → virtual tour →
 *   "TALENT SCOUTING / Play & Get Signed" → "Students' Trending Opportunities"
 *   → "Student's Success Stories" → "More Than a Course" → recensioni →
 *   listino → FAQ (15 domande) → footer → popup exit intent.
 *
 * `Trengo` (la chat) sta qui e non nel layout: sul sito è custom code di
 * pagina, presente su sei pagine su undici.
 *
 * Le `RivelaAllaVista` stanno esattamente sugli elementi che nell'HTML
 * pubblicato hanno `data-w-id` **e** `style="opacity:0"`: `.hero-wrapper-1`
 * dentro `HeroHome`, il `.section-title` di "Play & Get Signed", e i due
 * `.section-title.reach-goal.course-home` di "Our Courses" e del virtual tour
 * (quest'ultimo dentro il componente condiviso). Tutti gli altri `data-w-id`
 * della pagina sono interazioni di click, di slider o di hover: lì non si
 * anima niente, perché al primo caricamento sul sito non si anima niente.
 *
 * ⚠️ `robots` non è dichiarato qui, e non è una dimenticanza: il blocco
 * all'indicizzazione vive in `src/app/robots.ts` (Disallow: /) finché il repo
 * sta su un dominio di prova. Il `noindex` nei metadati era del segnaposto,
 * che dichiarava contenuto non pubblicabile; questa pagina invece è la copia
 * fedele di una pagina già indicizzata, e i suoi metadati sono quelli del
 * sito.
 *
 * Metadati e JSON-LD da `docs/webflow/meta/home.json`, identici.
 */

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: META.canonical },
  openGraph: {
    title: META.title,
    description: META.description,
    images: [META.ogImage],
    type: "website",
    url: META.ogUrl,
    siteName: META.ogSiteName,
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: [META.ogImage],
  },
};

/* `.section-subtitle.negative.new-home-2`: l'occhiello grigio di ogni sezione.
   `text-align: left` nel foglio, ma su tutte e tre le occorrenze della home
   sta dentro una colonna flex centrata, quindi a schermo è centrato. */
const OCCHIELLO =
  "pb-0 text-center text-base font-light uppercase leading-[180%] tracking-normal text-bianco opacity-70 max-sm:pb-0 max-sm:normal-case";

/* `.section-title-heading.p4`: 56px peso 300, bianco, centrato. */
const TITOLO_P4 =
  "m-0 text-center text-[56px] font-light leading-[130%] tracking-[-2.5px] text-bianco max-lg:text-[50px] max-md:text-[45px] max-sm:text-[32px]";

export default function Home() {
  return (
    <>
      <JsonLd dati={JSON_LD} />
      <SiteHeader />

      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <HeroHome />

      {/* ── 2. L'occhiello "YOUR TEACHERS", che sul sito è una sezione
             intera con dentro solo quel paragrafo ────────────────────
          `.the-team.new-home-2` azzera il padding verticale: lo spazio lo
          fanno i margini dell'occhiello. A ≤479 la sezione prende 40px sopra
          e 15px di lato. */}
      <section className="block overflow-hidden bg-sfondo py-0 max-sm:px-[15px] max-sm:pt-10">
        {/* `.container.new-home-2.names` */}
        <div className="mx-auto flex w-auto max-w-sito flex-col items-center justify-center bg-sfondo px-[30px] max-sm:overflow-clip max-sm:px-0 max-sm:pb-[10px]">
          {/* `.teachers-section` porta il margine sopra a zero. */}
          <p className={`mt-0 ${OCCHIELLO}`}>{DOCENTI.eyebrow}</p>
        </div>
      </section>

      {/* ── 3. Il carosello degli 11 docenti ──────────────────────────
          Sul sito l'occhiello "PARTNERS" è l'ultimo figlio dello stesso
          `div.introduction-content…slider-block` che contiene il carosello.
          `SliderDocenti` rende solo il carosello e non accetta figli: qui il
          paragrafo è un fratello subito dopo. Il contenitore è una colonna
          centrata, quindi il risultato a schermo è lo stesso. */}
      {/* `paddingSopraSotto480`: i 30px sopra di
          `.introduction-content…slider-block` valgono anche sotto i 480px.
          Ad azzerarli lì sono `.slider-block.dj-course` e
          `.slider-block.warmup-landing`, classi che la home non ha. */}
      <SliderDocenti slide={DOCENTI.slide} paddingSopraSotto480 />
      {/* Sul sito questo paragrafo è l'ultimo figlio dello stesso contenitore
          del carosello, che sotto i 480px ha `gap: 30px`: 30 di gap più 30 di
          `margin-top`. Qui il carosello è un fratello, quindi i 60px stanno
          tutti sul margine. */}
      <p className={`mt-[30px] bg-sfondo max-sm:mt-[60px] ${OCCHIELLO}`}>
        {DOCENTI.eyebrowPartner}
      </p>

      {/* ── 4. La striscia dei 22 loghi ─────────────────────────────── */}
      <MarqueeBrand liste={BRAND} />

      {/* ── 5. "LEARNING / Our Courses" ─────────────────────────────── */}
      <section className="block overflow-hidden bg-sfondo py-0 max-sm:px-[30px] max-sm:pt-[30px] max-sm:text-center">
        {/* `.container-5.new-home-2.most-complete-courses` */}
        <div className="mx-auto flex w-full max-w-sito flex-col items-start justify-start px-[30px] max-lg:max-w-[768px] max-md:max-w-[600px] max-sm:items-center max-sm:justify-center max-sm:overflow-clip max-sm:px-0">
          {/* `.feature-tabs-wrapper-2` */}
          <div className="flex w-full flex-col items-center justify-center max-lg:mx-auto max-lg:w-[70%] max-md:w-full">
            {/* `.section-title.reach-goal.course-home`, con `data-w-id` e
                `opacity:0` nell'HTML. */}
            <RivelaAllaVista className="flex flex-col items-center gap-[30px] pb-[30px] text-center max-sm:gap-5 max-sm:px-[30px] max-sm:pb-0">
              <p className={`mt-0 ${OCCHIELLO}`}>{CORSI_INTRO.eyebrow}</p>
              <h2 className={TITOLO_P4}>
                {CORSI_INTRO.titoloPrima}
                {/* `span.text-span-108`, peso 600. */}
                <span className="font-semibold">
                  {CORSI_INTRO.titoloEvidenziato}
                </span>
              </h2>
              {/* `p.cta-p._w-520.reach-undertitle`. Resta a 16px anche sotto i
                  480px: il foglio porta `.cta-p` a 15px lì, ma `.cta-p._w-520`
                  dichiara 16px con una classe in più e vince. */}
              <p className="mt-0 w-full max-w-[520px] pb-0 text-base font-light leading-[180%] tracking-[-0.4px] text-bianco opacity-75 max-sm:text-center max-sm:opacity-100">
                {CORSI_INTRO.paragrafo}
              </p>
            </RivelaAllaVista>
          </div>
        </div>
      </section>

      {/* ── 6. Il carosello dei tre corsi ────────────────────────────
          `div.introduction-content.homepage.new-home-3` →
          `div.introduction-left-content.new-home-2` → lo slider. */}
      <div className="flex w-full items-center justify-center bg-sfondo pt-0 max-lg:flex-col max-lg:text-center max-sm:gap-5">
        <div className="flex w-[90%] flex-col items-center justify-center gap-4 overflow-hidden max-sm:w-full max-sm:gap-0 2xl:max-w-sito">
          <SliderCorsi corsi={CORSI} />
        </div>
      </div>

      {/* ── 7. Virtual tour (condiviso) ─────────────────────────────── */}
      <VirtualTour
        eyebrow={VIRTUAL_TOUR.eyebrow}
        titoloRiga1={VIRTUAL_TOUR.titoloRiga1}
        titoloRiga2={VIRTUAL_TOUR.titoloRiga2}
        iframe={VIRTUAL_TOUR.iframe}
        cta={VIRTUAL_TOUR.cta}
        href={VIRTUAL_TOUR.href}
        sottotesto={VIRTUAL_TOUR.sottotesto}
      />

      {/* ── 8. "TALENT SCOUTING / Play & Get Signed" ─────────────────── */}
      <PlayGetSignedTeaser />

      {/* ── 9. "Students' Trending Opportunities" ─────────────────────
          Stesso componente e stessi testi di `/play-get-signed`: sul sito
          cambia solo il titolo. */}
      <OpportunitaTalentPool
        id={OPPORTUNITA.id}
        etichetteToggle={{
          sinistra: OPPORTUNITA.toggle.producers,
          destra: OPPORTUNITA.toggle.djs,
        }}
        pannelloDj={OPPORTUNITA.pannelloDj}
        pannelloProducerDesktop={OPPORTUNITA.pannelloProducerDesktop}
        pannelloProducerMobile={OPPORTUNITA.pannelloProducerMobile}
        titolo={
          /* `h2.section-title-heading.p4.trending-opportunities`: un `<br>`,
             il carattere invisibile (ZWNJ) che Webflow lascia nel markup, e
             "Opportunities" dentro `span.text-span-91 > strong`. */
          <h2 className={TITOLO_P4}>
            {OPPORTUNITA.titoloRiga1}
            <br />
            {"‍"}
            <span>
              {/* `font-bold` esplicito: il foglio Webflow dichiara
                  `strong { font-weight: bold }` (700 assoluto), mentre la
                  preflight di Tailwind usa `bolder`, che è relativo. Dentro un
                  titolo di peso 300 `bolder` vale 400. */}
              <strong className="font-bold">{OPPORTUNITA.titoloRiga2}</strong>
            </span>
          </h2>
        }
      />

      {/* ── 10. "Student's Success Stories" ──────────────────────────── */}
      <SuccessStories
        titoloPrima={SUCCESS_STORIES.titoloPrima}
        titoloEvidenziato={SUCCESS_STORIES.titoloEvidenziato}
        immagini={SUCCESS_STORIES.immagini}
      />

      {/* ── 11-14. Condivisi ────────────────────────────────────────── */}
      <MoreThanACourse />
      <Reviews />
      <PricingPlans />
      <Faq domande={DOMANDE} />

      <SiteFooter />
      <ExitIntentPopup />
      <Trengo />
    </>
  );
}
