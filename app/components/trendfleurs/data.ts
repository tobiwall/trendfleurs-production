export interface Service {
  id: string;
  kicker: string;
  title: string;
  body: string;
  icon: string;
}

export interface DecorItem {
  id: string;
  name: string;
  cat: string;
  price: string;
  unit: string;
  badge: string | null;
  seed: number;
}

export interface ShopItem {
  id: string;
  name: string;
  cat: string;
  price: number;
  badge: string | null;
  seed: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  seed: number;
  qty: number;
}

export interface WishItem {
  id: string;
  name: string;
  price: string;
  unit?: string;
  seed: number;
  qty: number;
}

export type Page = 'home' | 'services' | 'decor' | 'shop' | 'product' | 'contact';
export type DrawerTab = 'cart' | 'wish';
export type ProductKind = 'decor' | 'shop';
export interface ProductCtx { kind: ProductKind; id: string; }

export const SERVICES: Service[] = [
  { id: 's1', kicker: 'Full-Service', title: 'Hochzeiten', body: 'Von der ersten Blüte bis zum letzten Tanz — wir planen und gestalten deinen schönsten Tag, ruhig und persönlich.', icon: 'flower-2' },
  { id: 's2', kicker: 'Feiern', title: 'Junggesellinnen­abschied', body: 'Ein JGA, der zu euch passt: Workshops, Deko und das beliebte Audio Gästetelefon inklusive.', icon: 'gift' },
  { id: 's3', kicker: 'Hands-on', title: 'Workshops & Flower Styling', body: 'Lerne florales Handwerk direkt von Anni — Kränze, Sträuße und Tischkunst zum Selbermachen.', icon: 'leaf' },
  { id: 's4', kicker: 'Events', title: 'Events aller Art', body: 'Taufen, Geburtstage, Firmenfeiern — durchdachte Konzepte und Deko, die Atmosphäre schafft.', icon: 'sparkles' },
];

export const DECOR: DecorItem[] = [
  { id: 'd1', name: 'Goldener Hoop', cat: 'Bögen & Hoops', price: 'ab 15 €', unit: '/ Tag', badge: 'Beliebt', seed: 0 },
  { id: 'd2', name: 'Pampas-Set Groß', cat: 'Florals', price: 'ab 24 €', unit: '/ Tag', badge: null, seed: 1 },
  { id: 'd3', name: 'Audio Gästetelefon', cat: 'Highlights', price: 'ab 89 €', unit: '/ Event', badge: 'Highlight', seed: 2 },
  { id: 'd4', name: 'Kerzenständer Messing', cat: 'Tischdeko', price: 'ab 4 €', unit: '/ Tag', badge: null, seed: 3 },
  { id: 'd5', name: 'Vasen-Sammlung', cat: 'Florals', price: 'ab 6 €', unit: '/ Tag', badge: null, seed: 4 },
  { id: 'd6', name: 'Makramee-Rückwand', cat: 'Bögen & Hoops', price: 'ab 35 €', unit: '/ Tag', badge: 'Neu', seed: 5 },
];

export const DECOR_CATS = ['Alle', 'Bögen & Hoops', 'Florals', 'Tischdeko', 'Highlights'];

export const SHOP: ShopItem[] = [
  { id: 'p1', name: 'Willkommen-Schild', cat: 'Schilder', price: 34, badge: 'Personalisiert', seed: 2 },
  { id: 'p2', name: 'Tischkarten 10er-Set', cat: 'Papeterie', price: 12, badge: null, seed: 3 },
  { id: 'p3', name: 'Trockenblumen-Strauß', cat: 'Florals', price: 28, badge: 'Beliebt', seed: 1 },
  { id: 'p4', name: 'Kerze „mit Liebe"', cat: 'Kleinigkeiten', price: 16, badge: null, seed: 5 },
  { id: 'p5', name: 'Gästebuch Leinen', cat: 'Papeterie', price: 42, badge: 'Neu', seed: 0 },
  { id: 'p6', name: 'Geschenkbox JGA', cat: 'Kleinigkeiten', price: 49, badge: 'Personalisiert', seed: 4 },
];

export const SHOP_CATS = ['Alle', 'Schilder', 'Papeterie', 'Florals', 'Kleinigkeiten'];

export const REGIONS = ['Hamm/Sieg', 'Westerwald', 'Köln', 'Düsseldorf', 'Frankfurt'];

export interface TableItem {
  label: string;
  seed: number;
  x: number;
  y: number;
  w: number;
  dx: number;
  dy: number;
  rot: number;
}

export interface Table {
  id: string;
  kicker: string;
  theme: string;
  title: string;
  body: string;
  bg: string;
  items: TableItem[];
}

/* ─── Image helpers ─── */
const IMG_IDS = [
  'photo-1527529482837-4698179dc6ce', // wedding florals
  'photo-1511285560929-80b456fea0bc', // wedding ceremony / events
  'photo-1523438885200-e635ba2c371e', // floral arrangement
  'photo-1544078751-58fed2b32c83',    // shop / decorative items
  'photo-1527529482837-4698179dc6ce', // florals — alt crop
  'photo-1511285560929-80b456fea0bc', // events — alt crop
];
const IMG_CROPS = ['center', 'center', 'center', 'center', 'top', 'bottom'];

export function imgSrc(seed: number, w = 800): string {
  const idx = seed % IMG_IDS.length;
  return `https://images.unsplash.com/${IMG_IDS[idx]}?auto=format&fit=crop&crop=${IMG_CROPS[idx]}&w=${w}&q=80`;
}

export const ANNI_SRC = '/anni1.jpg';
export const ANNI_SRC_2 = '/anni2.jpg';

export const TABLES: Table[] = [
  {
    id: 't1', kicker: 'Tisch 01', theme: 'Hochzeit · Boho', title: 'Boho-Hochzeit',
    body: 'Pampas, Trockenblumen und warmes Gold — eine Tafel, die Ruhe und Romantik atmet.',
    bg: 'radial-gradient(120% 90% at 70% 20%, #EBD6CF 0%, #D7C4B7 45%, #A36A5E 100%)',
    items: [
      { label: 'Pampas', seed: 1, x: -34, y: -20, w: 26, dx: -220, dy: -120, rot: -55 },
      { label: 'Hoop',   seed: 0, x:  28, y: -26, w: 30, dx:  260, dy: -150, rot:  70 },
      { label: 'Vase',   seed: 4, x: -26, y:  28, w: 19, dx: -180, dy:  180, rot: -40 },
      { label: 'Kerzen', seed: 3, x:  32, y:  30, w: 17, dx:  210, dy:  150, rot:  48 },
    ],
  },
  {
    id: 't2', kicker: 'Tisch 02', theme: 'JGA · Celebration', title: 'Junggesellinnen­abschied',
    body: 'Verspielt und persönlich: Rosé-Töne, das Audio Gästetelefon und kleine Überraschungen.',
    bg: 'radial-gradient(120% 90% at 30% 25%, #F1E4BC 0%, #D9B4A9 50%, #8C5750 100%)',
    items: [
      { label: 'Gästetelefon', seed: 2, x:  30, y: -22, w: 23, dx:  250, dy: -130, rot:  60 },
      { label: 'Florals',      seed: 1, x: -32, y: -24, w: 27, dx: -250, dy: -150, rot: -65 },
      { label: 'Schild',       seed: 5, x: -24, y:  30, w: 21, dx: -190, dy:  190, rot: -45 },
      { label: 'Box',          seed: 4, x:  28, y:  32, w: 19, dx:  200, dy:  170, rot:  50 },
    ],
  },
  {
    id: 't3', kicker: 'Tisch 03', theme: 'Personalisiertes Event', title: 'Dein Event, personalisiert',
    body: 'Elegant in Charcoal und Gold — Tischkarten, Gravuren und Details mit deinem Namen.',
    bg: 'radial-gradient(120% 90% at 60% 20%, #6F665C 0%, #3A352F 55%, #1A1A1A 100%)',
    items: [
      { label: 'Tischkarte', seed: 3, x: -30, y: -22, w: 23, dx: -230, dy: -130, rot: -50 },
      { label: 'Gravur',     seed: 0, x:  30, y: -24, w: 25, dx:  250, dy: -150, rot:  62 },
      { label: 'Gästebuch',  seed: 5, x: -26, y:  30, w: 21, dx: -190, dy:  180, rot: -42 },
      { label: 'Kerze',      seed: 2, x:  28, y:  32, w: 17, dx:  200, dy:  160, rot:  46 },
    ],
  },
];
