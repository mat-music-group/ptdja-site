/*
 * Testi e metadati della pagina `/pricing-page`.
 *
 * - `META`: copiato da `docs/webflow/meta/pricing-page.json`.
 * - `JSON_LD`: il blocco `application/ld+json` della pagina, identico al
 *   pubblicato. Contiene Organization, Person, WebPage, BreadcrumbList,
 *   FAQPage e i tre Product con le sei offerte ciascuno.
 * - `DOMANDE`: le 7 domande della FAQ. Sono le stesse del FAQPage del
 *   JSON-LD — verificato in generazione confrontandole con i
 *   `.faq-item-heading` del DOM — quindi non possono divergere.
 *
 * Il listino vero (piani, prezzi, link Chargebee) NON sta qui: è identico su
 * 6 pagine e vive in `src/testi/condivisi.ts`.
 *
 * File generato dall'HTML e dai metadati pubblicati: non riscrivere a mano.
 */

import type { DomandaFaq } from "@/testi/condivisi";

export const META = {
  title: "Pete Tong DJ Academy Pricing – Online DJ & Producer Courses",
  description: "Learn to DJ, produce and master with Pete Tong DJ Academy. Three plans from $13 per month, taught by Pete Tong, Carl Cox, Diplo and other leading artists. Cancel anytime.",
  canonical: "https://www.petetong-djacademy.com/pricing-page",
  ogImage: "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67c72a69971bade6763459e4_IMMAGINE%20ACADEMY.png",
  ogUrl: "https://www.petetong-djacademy.com/pricing-page",
  ogSiteName: "Pete Tong DJ Academy",
} as const;

/** L'eyebrow in cima alla pagina: `h1.section-subtitle-44…top-title-head`. */
export const EYEBROW = "PRICING";

export const DOMANDE: readonly DomandaFaq[] = [
  {
    "domanda": "What’s the difference between the plans?",
    "risposta": "Each plan gives you access to 1, 2, or all 3 courses — the more you unlock, the more content and opportunities you get."
  },
  {
    "domanda": "What’s included in every subscription?",
    "risposta": "AI tutors, live sessions, downloadable tools, contests, certificates, label access, and the Talent Pool."
  },
  {
    "domanda": "Can I access everything with the 3-course plan?",
    "risposta": "Yes. It's the full-access plan — everything unlocked, no limits."
  },
  {
    "domanda": "Will I lose progress if I downgrade?",
    "risposta": "No, your progress is saved. You’ll just lose access to the courses you remove."
  },
  {
    "domanda": "How much does it cost to join?",
    "risposta": "Plans start from 13/month — pricing depends on how many courses you include."
  },
  {
    "domanda": "Can I cancel anytime?",
    "risposta": "Yes, anytime. No lock-ins or penalties."
  },
  {
    "domanda": "Are there discounts for longer plans?",
    "risposta": "Yes — yearly plans come with reduced monthly pricing."
  }
];

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": [
        "Organization",
        "EducationalOrganization"
      ],
      "@id": "https://www.petetong-djacademy.com/#organization",
      "name": "Pete Tong DJ Academy",
      "alternateName": "PTDJA",
      "url": "https://www.petetong-djacademy.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.prod.website-files.com/677f9e71c11a68b86359df57/67ba16cad5588af38e877220_logo-altra%20versionewhite.png"
      },
      "description": "Online academy for DJs and producers, taught by the artists who shaped dance music. Graded paths from complete beginner to professional, with a global campus community.",
      "founder": {
        "@id": "https://www.petetong-djacademy.com/#pete-tong"
      },
      "sameAs": [
        "https://www.instagram.com/petetong_djacademy/",
        "https://www.tiktok.com/@petetong_djacademy",
        "https://www.youtube.com/@petetongdjacademy"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.petetong-djacademy.com/#pete-tong",
      "name": "Pete Tong",
      "jobTitle": "DJ, broadcaster and founder",
      "sameAs": [
        "https://en.wikipedia.org/wiki/Pete_Tong"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.petetong-djacademy.com/pricing-page#webpage",
      "url": "https://www.petetong-djacademy.com/pricing-page",
      "name": "DJ & Producer Course Pricing | Pete Tong DJ Academy",
      "description": "Learn to DJ, produce and master with Pete Tong DJ Academy. Three plans from $13 per month. Cancel anytime.",
      "isPartOf": {
        "@id": "https://www.petetong-djacademy.com/#organization"
      },
      "breadcrumb": {
        "@id": "https://www.petetong-djacademy.com/pricing-page#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.petetong-djacademy.com/pricing-page#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.petetong-djacademy.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pricing",
          "item": "https://www.petetong-djacademy.com/pricing-page"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.petetong-djacademy.com/pricing-page#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What’s the difference between the plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each plan gives you access to 1, 2, or all 3 courses — the more you unlock, the more content and opportunities you get."
          }
        },
        {
          "@type": "Question",
          "name": "What’s included in every subscription?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI tutors, live sessions, downloadable tools, contests, certificates, label access, and the Talent Pool."
          }
        },
        {
          "@type": "Question",
          "name": "Can I access everything with the 3-course plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. It's the full-access plan — everything unlocked, no limits."
          }
        },
        {
          "@type": "Question",
          "name": "Will I lose progress if I downgrade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, your progress is saved. You’ll just lose access to the courses you remove."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to join?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Plans start from 13/month — pricing depends on how many courses you include."
          }
        },
        {
          "@type": "Question",
          "name": "Can I cancel anytime?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, anytime. No lock-ins or penalties."
          }
        },
        {
          "@type": "Question",
          "name": "Are there discounts for longer plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — yearly plans come with reduced monthly pricing."
          }
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://www.petetong-djacademy.com/pricing-page#plan-one",
      "name": "Pete Tong DJ Academy One Plan",
      "description": "Choose the DJ or Producer course. Includes the full course, Ableton Certified Masterclass, AI mentor, one monthly tutoring session, one live Q&A per month, official diploma, weekly resource pack, campus and community access, Talent Pool access. Up to Grade 3.",
      "brand": {
        "@id": "https://www.petetong-djacademy.com/#organization"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Yearly USD",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "156.00",
          "priceCurrency": "USD",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly USD",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "57.00",
          "priceCurrency": "USD",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Yearly EUR",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "156.00",
          "priceCurrency": "EUR",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly EUR",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "57.00",
          "priceCurrency": "EUR",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Yearly GBP",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "156.00",
          "priceCurrency": "GBP",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly GBP",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "57.00",
          "priceCurrency": "GBP",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://www.petetong-djacademy.com/pricing-page#plan-pro",
      "name": "Pete Tong DJ Academy Pro Plan",
      "description": "DJ and Producer courses together. Includes both full courses, Ableton Masterclass, AI mentors, two monthly tutoring sessions, two live Q&As per month, two official diplomas, weekly resources, campus and community access, three Talent Pools. Up to Grade 4.",
      "brand": {
        "@id": "https://www.petetong-djacademy.com/#organization"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Yearly USD",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "228.00",
          "priceCurrency": "USD",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly USD",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "87.00",
          "priceCurrency": "USD",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Yearly EUR",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "228.00",
          "priceCurrency": "EUR",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly EUR",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "87.00",
          "priceCurrency": "EUR",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Yearly GBP",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "228.00",
          "priceCurrency": "GBP",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly GBP",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "87.00",
          "priceCurrency": "GBP",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://www.petetong-djacademy.com/pricing-page#plan-elite",
      "name": "Pete Tong DJ Academy Elite Plan",
      "description": "DJ, Producer and Mix & Mastering courses. Includes all three full courses, Ableton Masterclass, AI mentors, three monthly tutoring sessions, three live Q&As per month, three official diplomas, extra monthly Mix & Mastering tutoring, monthly career masterclasses, campus and community access, four Talent Pools. Up to Grade 6.",
      "brand": {
        "@id": "https://www.petetong-djacademy.com/#organization"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Yearly USD",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "288.00",
          "priceCurrency": "USD",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly USD",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "117.00",
          "priceCurrency": "USD",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Yearly EUR",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "288.00",
          "priceCurrency": "EUR",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly EUR",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "117.00",
          "priceCurrency": "EUR",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Yearly GBP",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "288.00",
          "priceCurrency": "GBP",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Quarterly GBP",
          "url": "https://www.petetong-djacademy.com/pricing-page",
          "price": "117.00",
          "priceCurrency": "GBP",
          "category": "Subscription",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  ]
};
