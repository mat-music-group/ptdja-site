import { FooterVecchio } from "@/components/layout/FooterVecchio";

/*
 * Il footer della pagina `recess`, variante `be31567f`.
 *
 * Oggi è identico parola per parola a quello di `terms-conditions-sa`
 * (variante `652f6da5`): l'unica differenza registrata nell'outline è
 * l'attributo `sizes` dell'immagine delle forme, che in Next.js non esiste
 * perché le dimensioni le dichiara `next/image`.
 *
 * Resta comunque un componente suo, e non un alias, per due motivi: l'outline
 * le tratta come due varianti distinte, e sono due footer di pagine vecchie
 * che nessuno tiene allineate — il giorno in cui una delle due cambia, qui
 * c'è già il posto dove metterlo senza toccare l'altra.
 */
export function SiteFooterRecess() {
  return <FooterVecchio />;
}
