import type { Metadata } from "next";
import ShopCatalogClient from "./ShopCatalogClient";
import { getShopProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop — Personalisierte Hochzeitsdeko kaufen",
  description:
    "Personalisierte Hochzeitsdeko kaufen: Willkommensschilder, Tischkarten, Kerzen & Gästebücher — handgemacht & gravierbar. Versand in 3–5 Tagen. Perfekt für Hochzeiten und JGA.",
  keywords: [
    "personalisierte Hochzeitsdeko kaufen",
    "Willkommensschild Hochzeit",
    "Tischkarten personalisiert",
    "Hochzeitskerze graviert",
    "JGA Geschenkbox",
    "Gästebuch Hochzeit",
    "handgemachte Hochzeitsdeko",
  ],
  alternates: { canonical: "https://www.trendfleurs.de/shop" },
  openGraph: {
    title: "Shop — Personalisierte Hochzeitsdeko | a_trendfleurs by Anni",
    description:
      "Handgemachte Hochzeitsdeko kaufen: Willkommensschilder, Tischkarten, Kerzen & mehr. Personalisierbar, Versand 3–5 Tage.",
    url: "https://www.trendfleurs.de/shop",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Personalisierte Hochzeitsdeko — a_trendfleurs Shop" }],
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@id": "https://www.trendfleurs.de", name: "Home" } },
      { "@type": "ListItem", position: 2, item: { "@id": "https://www.trendfleurs.de/shop", name: "Shop" } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Personalisierte Hochzeitsdeko",
    description: "Handgemachte und personalisierbare Hochzeitsdekorationen",
    url: "https://www.trendfleurs.de/shop",
    numberOfItems: 6,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Willkommen-Schild", item: { "@type": "Product", name: "Willkommen-Schild", offers: { "@type": "Offer", price: "34", priceCurrency: "EUR" } } },
      { "@type": "ListItem", position: 2, name: "Tischkarten 10er-Set", item: { "@type": "Product", name: "Tischkarten 10er-Set", offers: { "@type": "Offer", price: "12", priceCurrency: "EUR" } } },
      { "@type": "ListItem", position: 3, name: "Trockenblumen-Strauß", item: { "@type": "Product", name: "Trockenblumen-Strauß", offers: { "@type": "Offer", price: "28", priceCurrency: "EUR" } } },
      { "@type": "ListItem", position: 4, name: "Gästebuch Leinen", item: { "@type": "Product", name: "Gästebuch Leinen", offers: { "@type": "Offer", price: "42", priceCurrency: "EUR" } } },
    ],
  },
];

export default async function ShopPage() {
  const products = await getShopProducts();
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ShopCatalogClient products={products} />
    </>
  );
}
