# DESIDERATA: sito-ptdja

> Cosa costruire e perché. Aggiornare in modo incrementale quando cambia lo scope. Confermare con l'utente prima di costruire.
> Last updated: 2026-09-14

## 🎯 Goal / problema da risolvere
Rifare il sito pubblico di Pete Tong DJ Academy (`www.petetong-djacademy.com`, oggi su Webflow) in modo identico, pagina per pagina e contenuto per contenuto, come progetto Next.js su Vercel, sul modello del repo delle landing beginner (`mat-music-group/djcoursepetetong`). Per ora vive in un repository suo, separato, per testare durante lo sviluppo.

## 👥 Utenti / per chi è
- Visitatori del sito PTDJA (traffico ads, organico, partner). Mobile first.
- Matteo e il team che oggi modifica il sito e il blog su Webflow.

## 📦 In scope
- **Fase 1: le 10 pagine in sitemap** (deciso il 2026-09-14): home, `dj-course`, `producer-course`, `mix-mastering-course`, `pricing-page`, `play-get-signed`, `advanced-djs`, `recess`, `terms-conditions`, `terms-conditions-sa`. Più 404. Testi, immagini, video, FAQ, prezzi, layout e animazioni percepibili.
- **Fase 2: blog** (22 articoli, 8 pubblicati). Scelta lasciata a Claude: gli articoli restano scritti su Webflow, il sito Next li legge dal CMS Webflow via API (headless, sola lettura). Nessun nuovo flusso editoriale da imparare, nessuna migrazione di contenuti.
- Le altre 42 pagine pubblicate fuori sitemap (partner landing, scholarship, promo, virtual tour, thank you) restano su Webflow finché non si decide altrimenti: elenco esplicito da fare prima del cambio dominio.
- Tutto il tracking e l'attribuzione oggi installati sul sito, con le stesse invarianti (cookie sul dominio radice, `cb push`, GTM, Mixpanel, Clarity, track.js proprietario, consenso Iubenda).
- Link al checkout Chargebee identici (`cart.petetong-djacademy.com`, `item_price_id`).
- SEO: title, meta description, Open Graph, JSON-LD, sitemap, robots, redirect esistenti.
- Repo GitHub proprio, progetto Vercel proprio, anteprima su URL di test.

## 🚫 Out of scope (non-goals)
- Redesign, cambio copy, cambio struttura: la parola d'ordine è identico.
- Migrazione del dominio in produzione (fase successiva, decisione a parte).
- Checkout: resta su `cart.petetong-djacademy.com`, non si tocca.
- Pagine residue del template Webflow (Products, SKUs, Integrations, Categories, checkout Webflow, order confirmation).

## ⭐ Features must-have
- Parità visiva e di contenuto con il sito live, pagina per pagina, verificata con confronto screenshot desktop e mobile.
- Parità di tracking: gli stessi eventi verso gli stessi strumenti, verificati prima di ricevere traffico (regola `04-kit-landing.md`).
- Attribuzione verso Chargebee intatta (`customer[cf_*]` sui link al carrello).
- Blog con gli articoli attuali e un modo per pubblicarne di nuovi senza toccare il codice.
- Stesso comportamento degli slug e redirect, così i link in giro (ads, email, partner) non si rompono.

## ✨ Features nice-to-have
- Pulizia delle pagine vecchie e in bozza, se il team conferma che non servono.
- Prestazioni migliori del Webflow attuale (misurare prima e dopo, non assumere).
- Rimozione del `debug: true` di Mixpanel in produzione.

## 🧩 Terze parti: cosa resta e cosa no (deciso il 2026-09-14)
| Strumento | Cos'è | Sulle 10 pagine | Decisione |
|---|---|---|---|
| Optibase | A/B test | script sito | **via**, abbiamo il tool A/B nostro |
| Intellimize (Webflow Optimize) | A/B test e personalizzazione di Webflow, iniettato da Webflow stesso | ogni pagina | **via**, non esiste fuori da Webflow |
| Flowbase tooltip | libreria di tooltip per Webflow ("i" nel carrello) | script sito | **via**, tooltip rifatto nativo |
| Iubenda | cookie banner e consenso (CMP) | ogni pagina | **resta**, obbligatorio, e gate del tracking |
| GTM, Mixpanel, Clarity, track.js, cb push | tracking e attribuzione | ogni pagina | **restano**, identici |
| Trustpilot | widget recensioni e link | 10 pagine | **resta** |
| Feedspace | muro di testimonianze (embed `data-id`) | 6 pagine | **resta** |
| Refersion | tracking affiliati (chi porta vendite prende una commissione) | 10 pagine | **via**, programma affiliati chiuso (Matteo, 14/09) |
| Typeform | due quiz esterni raggiunti da link (`eu83FgdN` su 6 pagine, `FYsfgc9E` su 2) | link | **resta** come link, niente da rifare |
| Calendly | prenotazione call gratuita | link su 4 pagine | **resta** come link |
| Wistia | player video (hero in loop e lezioni) | 4 pagine | **resta**, embed identici |
| YouTube | solo link al canale | 9 pagine | link |
| Lottie | animazione icona menu | 7 pagine | **resta**, file `.json` da Webflow |
| vt-quiz.js | landing kit, quiz Virtual Tour su `start.petetong` | ogni pagina | **resta** |
| Trengo | widget di chat (bolla in basso a destra), custom code di pagina | 6 pagine: home, dj-course, producer-course, mix-mastering-course, pricing-page, play-get-signed | **resta** (Matteo, 14/09), montato solo su quelle 6 |
| Google Fonts | Oswald, Lato, Geist, Inter | ogni pagina | gratuiti, via `next/font` |

Form Webflow: **nessuno sulle 10 pagine** (verificato sull'HTML live e sulla lista form del sito). I 27 form Webflow esistenti stanno su lite-version, rekordbox trial, pagine `-old` e contact in bozza: fuori scope.

## 📐 Vincoli
- Stack: Next.js + Tailwind + Framer Motion, come il repo landing (`Funnel/Landing_ADV/PTDJA/repo-start`). Ricostruzione a componenti con parità visiva verificata screenshot per screenshot, non porting del CSS Webflow (deciso il 2026-09-14).
- GitHub sotto `mat-music-group`, Vercel team `mat-music-group-s-projects`. Autore dei commit con identità verificabile, altrimenti Vercel blocca il deploy (`06-hosting-e-tool-interni.md`).
- Niente segreti nel repo. Nessun cambiamento al sito Webflow live durante lo sviluppo.
- Modelli: Fable come amministratore e revisore, Opus per scrivere il codice (subagenti).
- Vibe Shield: audit di sicurezza prima di ogni push, come da regola globale.

## ✅ Criteri di successo
- Ogni pagina in scope ha uno screenshot di confronto desktop e mobile senza differenze percepibili.
- Su un URL di test, il flusso home → pricing → click carrello arriva a Chargebee con gli stessi parametri `customer[cf_*]` del sito Webflow.
- In dashboard `tool.ptdja.com/tracking/` con `data-landing` di test arrivano pageview ed eventi; GTM Preview, Mixpanel e Clarity vedono gli stessi eventi del sito attuale.
- Lighthouse mobile non peggiore del sito attuale.

## ❓ Open questions
Ancora aperte:
1. ~~Refersion~~ risolta: programma chiuso, script via.
2. Pricing: la pagina contiene già i 18 link Chargebee per USD, EUR e GBP (One, PRO, ELITE × annuale e trimestrale). Da capire in fase di build come viene scelta la valuta mostrata (switch manuale, geolocalizzazione, script). `pricing-page-geo` è una copia fuori sitemap.
3. Redirect 301 configurati in Webflow (Site settings → Publishing): elenco da esportare.
4. Nome repo GitHub e progetto Vercel: `mat-music-group/ptdja-site` (nessuna obiezione). Test sull'URL `*.vercel.app` (Matteo, 14/09: il dominio arriva dopo, insieme allo spostamento). ⚠️ Su `*.vercel.app` i cookie `trk_vid` e `attr_*` non stanno sul dominio radice del brand: il collegamento col checkout si verifica solo dopo il cambio dominio. Stato dei login `gh` e `vercel` ancora da confermare.
5. Pagine protette da password: quali, e servono nella fase 1? (Nessuna delle 10 sembra protetta.)

Risolte il 2026-09-14: perimetro (10 pagine, poi blog), metodo (ricostruzione a componenti), blog (Webflow headless), terze parti (tabella sopra), form (nessuno in scope), font (Google Fonts gratuiti).

## 📝 Changelog
- 2026-09-14 (notte): via al piano. Test su `*.vercel.app`, dominio dopo. Refersion via. Riusare le strutture esistenti (componenti tracking del repo landing, landing kit) invece di riscrivere.
- 2026-09-14 (sera): risposte di Matteo alle prime 5 domande. Perimetro fase 1 = 10 pagine in sitemap. Ricostruzione a componenti. Blog in fase 2 come Webflow headless. Via Optibase, Intellimize e Flowbase; il resto resta. Verificato che nessuna delle 10 pagine ha form Webflow. Font identificati.
- 2026-09-14: creazione del documento dopo inventario Webflow via MCP (131 pagine, 8 collezioni, 1048 asset, custom code sito).
