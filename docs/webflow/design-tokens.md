# Design token dal CSS Webflow

> Estratti da `docs/webflow/css/mats-mubly.webflow.shared.6b73890bb.css` (731 KB) con `scripts/estrai-design-tokens.py`. Ultimo aggiornamento: 2026-09-14.

Servono come base per `globals.css` e per la configurazione di Tailwind. Sono **frequenze misurate**, non una palette curata: un colore con 2 occorrenze è probabilmente un residuo, uno con 200 è un colore di sistema.

---

## Variabili CSS in `:root` / `html` (24)

| variabile | valore |
|---|---|
| `--button-radius` | `32px` |
| `--color` | `#3ba8e0` |
| `--colore-button-cta` | `#e7ff09` |
| `--font-family` | `Geist, sans-serif` |
| `--global-section-padding` | `120px` |
| `--neutral-01` | `black` |
| `--neutral-02` | `#faf4f3` |
| `--neutral-03` | `#1e1e1e` |
| `--neutral-04` | `#62e8bb` |
| `--neutral-05` | `#090a15` |
| `--neutral-06` | `#323030` |
| `--neutral-07` | `#e12fdf` |
| `--new-font-4-0` | `Inter, sans-serif` |
| `--number` | `0` |
| `--primary-font` | `Geist, sans-serif` |
| `--secondary-font` | `Outfit` |
| `--sfondo-grigio-base` | `#323030` |
| `--sfuma-color` | `#b30000` |
| `--theme-color-01` | `#62e8bb` |
| `--theme-color-02` | `#62e8bb` |
| `--theme-color-03` | `#e0593b` |
| `--transparent` | `#fff0` |
| `--white` | `#fff` |
| `--whitetrans` | `#ffffffe0` |

## Colori più usati (primi 40 su 215 distinti)

| colore | occorrenze |
|---|---|
| `#ffffff` | 426 |
| `#1e1e1e` | 238 |
| `#62e8bb` | 134 |
| `#000000` | 76 |
| `#0000` | 75 |
| `#faf4f3` | 66 |
| `#fff0` | 61 |
| `#e9e9e9` | 32 |
| `#0a0915` | 31 |
| `#3898ec` | 27 |
| `#dddddd` | 25 |
| `#e7ff09` | 24 |
| `#fafafa` | 23 |
| `#00ecb8` | 22 |
| `#999999` | 21 |
| `#323030` | 21 |
| `#f94b25` | 21 |
| `#e0593b` | 17 |
| `#4e4e4e` | 15 |
| `#0050bd` | 14 |
| `#f7f6f4` | 14 |
| `#e6e6e6` | 13 |
| `#1d1d1b` | 12 |
| `#0000000d` | 11 |
| `#090a15` | 10 |
| `#9c7373` | 10 |
| `#c9c9c9` | 9 |
| `#8a38f5` | 8 |
| `#0f0f0f` | 8 |
| `#ff5757` | 7 |
| `#8c82ff` | 7 |
| `#bd3232` | 7 |
| `#c9c9c9ed` | 7 |
| `#1d1a1a00` | 7 |
| `#2b2b2a` | 7 |
| `#222222` | 6 |
| `#3ba8e0` | 6 |
| `#3434ff` | 6 |
| `#5a5a5a` | 6 |
| `#333333` | 5 |

## Famiglie di font (prima voce dello stack)

| famiglia | occorrenze |
|---|---|
| `Geist` | 210 |
| `var(--primary-font)` | 67 |
| `Fa Solid 900` | 4 |
| `Arial` | 2 |
| `Fa Brands 400` | 2 |
| `sans-serif` | 1 |
| `monospace` | 1 |
| `webflow-icons` | 1 |
| `webflow-icons !important` | 1 |
| `unset` | 1 |
| `serif` | 1 |
| `Helvetica Neue` | 1 |
| `Fa 400` | 1 |
| `Oswald` | 1 |
| `Lato` | 1 |

## Pesi font usati

| peso | occorrenze |
|---|---|
| `400` | 197 |
| `300` | 150 |
| `500` | 104 |
| `600` | 85 |
| `700` | 28 |
| `normal` | 6 |
| `bold` | 4 |
| `200` | 3 |
| `unset` | 1 |
| `100` | 1 |

I font arrivano da Google Fonts via `WebFont.load` nell'`<head>`:

```js
WebFont.load({ google: { families: [
  "Oswald:200,300,400,500,600,700",
  "Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic",
  "Geist:300,400,500,600,700",
  "Inter:300,400,500,600,700"
]}});
```

In Next.js diventano quattro `next/font/google`.

## Dimensioni di testo più frequenti (prime 25)

| font-size | occorrenze |
|---|---|
| `16px` | 240 |
| `15px` | 99 |
| `18px` | 77 |
| `14px` | 74 |
| `20px` | 40 |
| `32px` | 32 |
| `12px` | 27 |
| `56px` | 26 |
| `50px` | 22 |
| `13px` | 21 |
| `34px` | 16 |
| `36px` | 15 |
| `45px` | 15 |
| `40px` | 14 |
| `28px` | 14 |
| `22px` | 13 |
| `48px` | 12 |
| `24px` | 9 |
| `10px` | 9 |
| `30px` | 7 |
| `8px` | 7 |
| `17px` | 5 |
| `29px` | 4 |
| `42px` | 4 |
| `37px` | 4 |

## Breakpoint delle media query

| media query | occorrenze |
|---|---|
| `max-width: 479px` | 6 |
| `max-width: 991px` | 4 |
| `max-width: 767px` | 4 |
| `min-width: 768px` | 1 |
| `min-width: 1280px` | 1 |
| `min-width: 1440px` | 1 |
| `min-width: 1920px` | 1 |

Webflow usa tre soglie fisse: **991px** (tablet), **767px** (mobile landscape), **479px** (mobile portrait), tutte `max-width`, quindi desktop first. Tailwind lavora al contrario (`min-width`): riscrivere le regole, non tradurle meccanicamente.

## `max-width` dei container (241)

| classe | max-width |
|---|---|
| `.w-container` | `940px` |
| `.w-container` | `728px` |
| `.w-container` | `none` |
| `.w-layout-blockcontainer` | `940px` |
| `.w-commerce-commercecartcontainer` | `480px` |
| `.w-layout-blockcontainer` | `728px` |
| `.w-layout-blockcontainer` | `none` |
| `.container` | `1380px` |
| `.container` | `830px` |
| `.container` | `1264px` |
| `.container-2` | `1380px` |
| `.container-3` | `1380px` |
| `.container-4` | `1380px` |
| `.container-5` | `1380px` |
| `.container-6` | `1380px` |
| `.container-7` | `1380px` |
| `.container-8` | `1380px` |
| `.container-9` | `1380px` |
| `.container-10` | `1380px` |
| `.container-default-1209px` | `1209px` |
| `.container-11` | `1380px` |
| `.container-12` | `1380px` |
| `.container-13` | `1380px` |
| `.container-14` | `1380px` |
| `.container-15` | `1380px` |
| `.container-16` | `1380px` |
| `.container-17` | `1380px` |
| `.container-18` | `1380px` |
| `.container-19` | `1380px` |
| `.container-20` | `1380px` |
| `.container-21` | `1380px` |
| `.container-22` | `1380px` |
| `.container-23` | `1380px` |
| `.container-24` | `1380px` |
| `.container-25` | `1380px` |
| `.container-26` | `1380px` |
| `.container-sticky` | `100%` |
| `.timer-container` | `580px` |
| `.container-large` | `80rem` |
| `.container-default` | `1240px` |
| `.container-default` | `1380px` |
| `.container-27` | `100%` |
| `.container-28` | `1380px` |
| `.container-29` | `1380px` |
| `.container-30` | `1380px` |
| `.container-30` | `1100px` |
| `.container-31` | `1380px` |
| `.container-32` | `1380px` |
| `.container-33` | `1380px` |
| `.container-34` | `1380px` |
| `.container-35` | `1380px` |
| `.container-36` | `1380px` |
| `.container-37` | `1380px` |
| `.container-38` | `1380px` |
| `.container-39` | `1380px` |
| `.video-container` | `30%` |
| `.container-40` | `1380px` |
| `.container-41` | `1380px` |
| `.container-42` | `1380px` |
| `.container-43` | `1380px` |

## Border radius ricorrenti (primi 20)

| valore | occorrenze |
|---|---|
| `25px` | 112 |
| `24px` | 62 |
| `16px` | 47 |
| `20px` | 26 |
| `3px` | 24 |
| `12px` | 22 |
| `999px` | 13 |
| `0` | 12 |
| `100%` | 11 |
| `4px` | 10 |
| `8px` | 8 |
| `360px` | 8 |
| `50%` | 7 |
| `5px` | 6 |
| `32px` | 6 |
| `2px` | 5 |
| `10px` | 5 |
| `0 0 25px 25px` | 5 |
| `30px` | 5 |
| `100px` | 4 |

## Ombre ricorrenti (prime 20)

| box-shadow | occorrenze |
|---|---|
| `0 8px 50px #0000000d` | 7 |
| `0 4px 10px #4a3aff26` | 5 |
| `0 20px 36px #0000000d` | 4 |
| `none` | 2 |
| `0 9px 18px #0003` | 2 |
| `0 14px 44px #0000000f` | 2 |
| `4px 4px 14px #080f340a, 1px 1px 1px #170f490a, 0 0 1px #170f4908` | 2 |
| `0 3px 12px #4a3aff1f` | 2 |
| `unset` | 1 |
| `0 0 0 1px #0000001a, 0 1px 3px #0000001a` | 1 |
| `0 0 3px #3336` | 1 |
| `0 0 0 2px #fff` | 1 |
| `0 0 3px 1px #3898ec` | 1 |
| `0 5px 25px #00000040` | 1 |
| `0 20px 34px #0b0b2c0a, 0 4px 8px #0b0b2c05, 0 10px 34px #3434ff0d` | 1 |
| `0 5px 18px #0b0b2c0a, 0 1px 2px #0b0b2c05, 0 3px 15px #3434ff0d` | 1 |
| `0 25px 70px #0b0b2cb5, 0 4px 4px #00000040` | 1 |
| `0 10px 30px #0b0b2cb5, 0 1px 1px #00000040` | 1 |
| `0 -2px 4px #0000001a` | 1 |
| `0 0 4px #ff168633` | 1 |
