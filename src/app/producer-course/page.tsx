import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AdattaATe } from "@/components/sections/AdattaATe";
import { BookACall } from "@/components/sections/BookACall";
import { ContenutoCorso } from "@/components/sections/ContenutoCorso";
import { DocentiAcademy } from "@/components/sections/DocentiAcademy";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { Faq } from "@/components/sections/Faq";
import { HeroCorso } from "@/components/sections/HeroCorso";
import { LessonHighlights } from "@/components/sections/LessonHighlights";
import { MoreThanACourse } from "@/components/sections/MoreThanACourse";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { RelatedCourses } from "@/components/sections/RelatedCourses";
import { Reviews } from "@/components/sections/Reviews";
import { TalentPoolCorso } from "@/components/sections/TalentPoolCorso";
import { VirtualTour } from "@/components/sections/VirtualTour";
import { Trengo } from "@/components/tracking/Trengo";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  ADATTA,
  BOLLE_DOCENTI,
  CONTENUTO,
  CORSI_CORRELATI,
  CORSI_CORRELATI_TITOLO,
  DOMANDE,
  HERO,
  HIGHLIGHTS,
  JSON_LD,
  META,
  META_CORSO_DESKTOP,
  META_CORSO_MOBILE,
  TALENT_POOL,
  VIRTUAL_TOUR,
} from "@/testi/producer-course";
import { DOCENTI_PRODUCER, TITOLO_PRODUCER } from "@/testi/docenti";

/*
 * `/producer-course`, la seconda delle tre pagine corso.
 *
 * È una variante di `/dj-course`: stessi componenti, stesso ordine, contenuti
 * diversi. Ordine dei blocchi, dall'outline (20 di primo livello, 18 sezioni
 * più header e footer):
 *   header → hero → "Course Content" (variante desktop) → "Course Content"
 *   (variante mobile) → titolo "Producer Course Teachers" → carosello dei
 *   docenti → virtual tour → "The Course that Adapts to You" (slider) → la
 *   stessa in versione accordion (mai visibile) → "More Than a Course" →
 *   "Lessons Highlights" → "Producer Talent Pool® Opportunities" → recensioni
 *   → listino → "Related Courses" + carosello → "Book a free call" → FAQ →
 *   footer → popup exit intent.
 *
 * ── Le tre differenze strutturali rispetto a dj-course ────────────────
 *   1. il virtual tour c'è UNA volta sola: manca la copia con la CTA verso
 *      Typeform, che su dj-course segue la prima;
 *   2. "Lessons Highlights" ha QUATTRO blocchi invece di tre;
 *   3. l'`h2` di "Course Content" non ha `id` (`dj-coursecontent` esiste solo
 *      su dj-course), quindi `idTitolo` non si passa.
 *
 * `Trengo` (la chat) sta qui e non nel layout: sul sito è custom code di
 * pagina, presente su sei pagine su undici.
 *
 * Metadati e JSON-LD da `docs/webflow/meta/producer-course.json`, identici.
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

export default function ProducerCoursePage() {
  return (
    <>
      <JsonLd dati={JSON_LD} />
      <SiteHeader />

      {/* ── 1. Hero ──────────────────────────────────────────────────
          `section.hero-section-two-2.newheader`: nonostante il nome è la hero
          della pagina, non un header. `spaziatura` porta i due numeri di
          `.section-subtitle-44` e `.section-title-17`, che su questa pagina
          non sono quelli di dj-course. */}
      <HeroCorso
        eyebrow={HERO.eyebrow}
        titolo={HERO.titolo}
        paragrafo={HERO.paragrafo}
        prezzo={HERO.prezzo}
        cta={HERO.cta}
        trustpilot={HERO.trustpilot}
        immagine={HERO.immagine}
        spaziatura={HERO.spaziatura}
      />

      {/* ── 2. "Course Content", versione desktop (196 lezioni) ────── */}
      <ContenutoCorso
        variante="desktop"
        id="program"
        titolo={CONTENUTO.titolo}
        bolle={BOLLE_DOCENTI}
        metaDesktop={META_CORSO_DESKTOP}
        metaMobile={META_CORSO_MOBILE}
        wistiaMediaId={CONTENUTO.wistiaMediaId}
        wistiaAspect={CONTENUTO.wistiaAspect}
        videoEmbedly={CONTENUTO.videoEmbedly}
        tabCurriculum={CONTENUTO.tabCurriculum}
        tabCosaImparerai={CONTENUTO.tabCosaImparerai}
        accordionTitolo={CONTENUTO.accordionTitolo}
        accordionTitoloBr={CONTENUTO.accordionBrDesktop}
        accordionSottotitolo={CONTENUTO.accordionSottotitoloDesktop}
        capitoli={CONTENUTO.capitoli}
        cosaImparerai={CONTENUTO.cosaImparerai}
        iconaFreccia={CONTENUTO.iconaFreccia}
        iconaSpunta={CONTENUTO.iconaSpunta}
      />

      {/* ── 3. "Course Content", versione mobile (200 lezioni) ─────── */}
      <ContenutoCorso
        variante="mobile"
        titolo={CONTENUTO.titolo}
        bolle={BOLLE_DOCENTI}
        metaDesktop={META_CORSO_DESKTOP}
        metaMobile={META_CORSO_MOBILE}
        wistiaMediaId={CONTENUTO.wistiaMediaId}
        wistiaAspect={CONTENUTO.wistiaAspect}
        videoEmbedly={CONTENUTO.videoEmbedly}
        tabCurriculum={CONTENUTO.tabCurriculum}
        tabCosaImparerai={CONTENUTO.tabCosaImparerai}
        accordionTitolo={CONTENUTO.accordionTitolo}
        accordionTitoloBr={CONTENUTO.accordionBrMobile}
        accordionSottotitolo={CONTENUTO.accordionSottotitoloMobile}
        capitoli={CONTENUTO.capitoli}
        cosaImparerai={CONTENUTO.cosaImparerai}
        iconaFreccia={CONTENUTO.iconaFreccia}
        iconaSpunta={CONTENUTO.iconaSpunta}
        prezzo={HERO.prezzo}
        cta={HERO.cta}
        trustpilot={HERO.trustpilot}
      />

      {/* ── 4 e 5. Docenti ─────────────────────────────────────────────
          ⚠️ DEVIAZIONE VOLUTA dal sito Webflow, richiesta di Matteo del
          2026-09-15. Al posto del titolo "Producer Course Teachers" e del
          carosello di sole foto (`TitoloDocentiCorso` + `SliderDocenti`,
          rimossi) c'è "The Academy Teachers" delle landing beginner, nella
          stessa posizione. Titolo e persone vengono dalla landing producer. */}
      <DocentiAcademy titolo={TITOLO_PRODUCER} docenti={DOCENTI_PRODUCER} />

      {/* ── 6. Il virtual tour, una volta sola ─────────────────────── */}
      <VirtualTour
        eyebrow={VIRTUAL_TOUR.eyebrow}
        titoloRiga1={VIRTUAL_TOUR.titoloRiga1}
        titoloRiga2={VIRTUAL_TOUR.titoloRiga2}
        iframe={VIRTUAL_TOUR.iframe}
        cta={VIRTUAL_TOUR.cta}
        href={VIRTUAL_TOUR.href}
        sottotesto={VIRTUAL_TOUR.sottotesto}
      />

      {/* ── 7. "The Course that Adapts to You" (versione slider) ───── */}
      <AdattaATe
        variante="slider"
        titoloPrima={ADATTA.titoloPrima}
        titoloEvidenziato={ADATTA.titoloEvidenziato}
        titoloDopo={ADATTA.titoloDopo}
        toggleAvanzato={ADATTA.toggleAvanzato}
        togglePrincipiante={ADATTA.togglePrincipiante}
        principiante={ADATTA.slider.principiante}
        avanzato={ADATTA.slider.avanzato}
        togglePannelloPrincipiante={ADATTA.slider.togglePrincipiante}
        togglePannelloAvanzato={ADATTA.slider.toggleAvanzato}
      />

      {/* ── 8. La stessa sezione in versione accordion ──────────────
          `.container-31` è `display: none` a ogni breakpoint: questo blocco
          esiste nel DOM del sito e non si vede mai. Si riproduce lo stesso. */}
      <AdattaATe
        variante="accordion"
        titoloPrima={ADATTA.titoloPrima}
        titoloEvidenziato={ADATTA.titoloEvidenziato}
        titoloDopo={ADATTA.titoloDopoAccordion}
        toggleAvanzato={ADATTA.toggleAvanzato}
        togglePrincipiante={ADATTA.togglePrincipiante}
        principiante={ADATTA.accordion.principiante}
        avanzato={ADATTA.accordion.avanzato}
      />

      {/* ── 9. "More Than a Course" (condivisa) ────────────────────── */}
      <MoreThanACourse />

      {/* ── 10. "Lessons Highlights", quattro blocchi ──────────────── */}
      <LessonHighlights
        id="highlights"
        titoloPrima={HIGHLIGHTS.titoloPrima}
        titoloEvidenziato={HIGHLIGHTS.titoloEvidenziato}
        blocchi={HIGHLIGHTS.blocchi}
        iconaSpunta={HIGHLIGHTS.iconaSpunta}
      />

      {/* ── 11. "Producer Talent Pool® Opportunities" ──────────────── */}
      <TalentPoolCorso
        eyebrow={TALENT_POOL.eyebrow}
        titoloRiga1={TALENT_POOL.titoloRiga1}
        titoloRiga2={TALENT_POOL.titoloRiga2}
        paragrafo={TALENT_POOL.paragrafo}
        opportunita={TALENT_POOL.opportunita}
      />

      {/* ── 12 e 13. Recensioni e listino (condivisi) ──────────────── */}
      <Reviews />
      <PricingPlans />

      {/* ── 14 e 15. "Related Courses" ─────────────────────────────── */}
      <RelatedCourses
        titoloEvidenziato={CORSI_CORRELATI_TITOLO.evidenziato}
        titoloResto={CORSI_CORRELATI_TITOLO.resto}
        corsi={CORSI_CORRELATI}
      />

      {/* ── 16 e 17. "Book a free call" e FAQ (condivisi) ──────────── */}
      <BookACall />
      <Faq domande={DOMANDE} />

      <SiteFooter />
      <ExitIntentPopup />
      <Trengo />
    </>
  );
}
