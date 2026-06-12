import { unstable_cache } from 'next/cache';

// ── Types ──────────────────────────────────────────────────────────────────

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductHighlight {
  id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  type: 'verleih' | 'shop';
}

export interface NormalizedProduct {
  id: string;           // Shopify handle — used as URL slug
  shopifyId: string;    // full GID
  name: string;
  description: string;
  descriptionHtml: string;
  cat: string;
  price: string;        // formatted, e.g. "ab 15 €"
  priceRaw: number;
  unit: string;         // "/ Tag" | "/ Stück"
  badge: string | null;
  seed: number;         // positional index, used as Unsplash fallback
  imageUrl: string | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  tags: string[];
}

// ── Tag helpers ────────────────────────────────────────────────────────────

const CAT_MAP: Record<string, string> = {
  'bögen & hoops': 'Bögen & Hoops',
  'hoops': 'Bögen & Hoops',
  'florals': 'Florals',
  'tischdeko': 'Tischdeko',
  'highlights': 'Highlights',
  'schilder': 'Schilder',
  'papeterie': 'Papeterie',
  'kleinigkeiten': 'Kleinigkeiten',
};

function catFromTags(tags: string[]): string {
  for (const t of tags) {
    const match = CAT_MAP[t.toLowerCase()];
    if (match) return match;
  }
  return 'Allgemein';
}

function badgeFromTags(tags: string[]): string | null {
  const lc = tags.map(t => t.toLowerCase());
  if (lc.includes('beliebt')) return 'Beliebt';
  if (lc.includes('neu'))     return 'Neu';
  if (lc.includes('highlight')) return 'Highlight';
  if (lc.includes('personalisiert')) return 'Personalisiert';
  return null;
}

function fmtPrice(amount: string): string {
  const n = parseFloat(amount);
  if (isNaN(n)) return '–';
  if (n === 0) return 'Auf Anfrage';
  const s = n % 1 === 0 ? String(n) : n.toFixed(2).replace('.', ',');
  return `ab ${s} €`;
}

// ── CDN image helper (pure — safe to duplicate in client components) ───────

export function shopifyImageSrc(url: string, width: number): string {
  try {
    const u = new URL(url);
    u.searchParams.set('width', String(width));
    return u.toString();
  } catch {
    return url;
  }
}

// ── GraphQL ────────────────────────────────────────────────────────────────

const PRODUCTS_QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 10) {
            edges { node { url altText width height } }
          }
          variants(first: 20) {
            edges { node { id title price { amount currencyCode } availableForSale } }
          }
        }
      }
    }
  }
`;

// ── Fetch + normalize ──────────────────────────────────────────────────────

async function _fetchAllProducts(): Promise<NormalizedProduct[]> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    console.warn('[shopify] env vars not set — returning empty product list');
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let json: any;
  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query: PRODUCTS_QUERY, variables: { first: 50 } }),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    json = await res.json();
  } catch (err) {
    console.error('[shopify] fetch error:', err);
    return [];
  }

  if (json.errors?.length) {
    console.error('[shopify] GraphQL errors:', json.errors);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.data?.products?.edges ?? []).map(({ node }: any, i: number): NormalizedProduct => {
    const isRental = (node.tags as string[]).some(t => t.toLowerCase() === 'verleih');
    return {
      id:          node.handle,
      shopifyId:   node.id,
      name:        node.title,
      description:     node.description ?? '',
      descriptionHtml: node.descriptionHtml ?? '',
      cat:         catFromTags(node.tags),
      price:       fmtPrice(node.priceRange.minVariantPrice.amount),
      priceRaw:    parseFloat(node.priceRange.minVariantPrice.amount) || 0,
      unit:        isRental ? '/ Tag' : '/ Stück',
      badge:       badgeFromTags(node.tags),
      seed:        i,
      imageUrl:    node.images.edges[0]?.node?.url ?? null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images:      node.images.edges.map((e: any) => e.node),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants:    node.variants.edges.map((e: any) => e.node),
      tags:        node.tags,
    };
  });
}

export const getAllProducts = unstable_cache(
  _fetchAllProducts,
  ['shopify-all-products'],
  { revalidate: 3600, tags: ['shopify-products'] }
);

export async function getVerleihProducts(): Promise<NormalizedProduct[]> {
  return (await getAllProducts()).filter(p =>
    p.tags.some(t => t.toLowerCase() === 'verleih')
  );
}

export async function getShopProducts(): Promise<NormalizedProduct[]> {
  return (await getAllProducts()).filter(p =>
    p.tags.some(t => t.toLowerCase() === 'verkauf')
  );
}

export async function getProductByHandle(handle: string): Promise<NormalizedProduct | null> {
  return (await getAllProducts()).find(p => p.id === handle) ?? null;
}
