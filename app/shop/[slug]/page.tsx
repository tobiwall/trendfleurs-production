import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Package, Truck } from "lucide-react";
import { getProductByHandle, getShopProducts, shopifyImageSrc } from "@/lib/shopify";
import AddToCartClient from "./AddToCartClient";
import ImageGallery from "@/components/ImageGallery";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await getShopProducts();
    return products.map(p => ({ slug: p.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug).catch(() => null);
  if (!product) return { title: "Nicht gefunden" };
  return {
    title: `${product.name} — a_trendfleurs Shop`,
    description: product.description.slice(0, 160) || `${product.name} kaufen. ${product.price}.`,
    keywords: [product.name, product.cat, "Hochzeitsshop", "handgemacht", "personalisiert", "a_trendfleurs"],
    alternates: { canonical: `https://www.trendfleurs.de/shop/${product.id}` },
    openGraph: {
      title: `${product.name} — a_trendfleurs Shop`,
      description: product.description.slice(0, 100) || product.price,
      url: `https://www.trendfleurs.de/shop/${product.id}`,
      images: product.imageUrl
        ? [{ url: product.imageUrl, width: 800, height: 800, alt: product.name }]
        : [],
    },
  };
}

export default async function ShopDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductByHandle(slug).catch(() => null);
  if (!product) notFound();

  const isPersonalizable = product.tags.some(t =>
    ["personalisiert", "personalisierbar", "personalized"].includes(t.toLowerCase())
  );

  const heroImgSrc = product.imageUrl ? shopifyImageSrc(product.imageUrl, 900) : null;

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://www.trendfleurs.de/shop/${product.id}#product`,
    name: product.name,
    description: product.description,
    category: product.cat,
    offers: {
      "@type": "Offer",
      price: product.priceRaw.toFixed(2),
      priceCurrency: "EUR",
      seller: { "@type": "LocalBusiness", "@id": "https://www.trendfleurs.de/#business" },
      availability: "https://schema.org/InStock",
    },
    brand: { "@type": "Brand", name: "a_trendfleurs by Anni" },
    ...(heroImgSrc ? { image: heroImgSrc } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />

      <main>
        {/* ── Hero / Product ── */}
        <section style={{ background: "var(--cream)", paddingTop: "clamp(40px,7vw,80px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
          <div className="tf-inner">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: "28px" }}>
              <ol style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                {[
                  { href: "/", label: "Home" },
                  { href: "/shop", label: "Shop" },
                  { label: product.name, current: true },
                ].map((b, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span>}
                    {(b as { current?: boolean }).current
                      ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>{b.label}</span>
                      : <Link href={(b as { href: string }).href} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>{b.label}</Link>
                    }
                  </li>
                ))}
              </ol>
            </nav>

            {/* 2-col product layout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px,5vw,64px)" }} className="shop-product-grid">
              {/* Image gallery */}
              <ImageGallery
                images={product.images}
                alt={product.name}
                badge={product.badge}
                priority
              />

              {/* Info */}
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                  {product.cat}
                </p>
                <h1 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "10px",
                  fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)",
                  letterSpacing: "var(--track-tight)", color: "var(--ink-900)",
                }}>
                  {product.name}
                </h1>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "20px" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--rust-500)" }}>
                    {product.price}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-400)" }}>
                    {product.unit}
                  </span>
                </div>

                {/* Meta tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "14px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-500)" }}>
                    <Truck size={12} /> Versand in 3–5 Tagen
                  </span>
                  {isPersonalizable && (
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-500)" }}>
                      <Package size={12} /> Personalisierbar
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.descriptionHtml && (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    className="shopify-description"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--ink-700)", marginTop: "18px", maxWidth: "52ch" }}
                  />
                )}

                {/* Add to cart client (variants + personalization + button) */}
                <div style={{ marginTop: "28px" }}>
                  <AddToCartClient
                    id={product.id}
                    name={product.name}
                    priceRaw={product.priceRaw}
                    seed={product.seed}
                    variants={product.variants}
                    isPersonalizable={isPersonalizable}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Info cards ── */}
        <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
          <div className="tf-inner">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "20px" }}>
              {[
                { icon: "📦", title: "Versand in 3–5 Tagen", body: "Sorgfältig verpackt & per DHL. Ab 49 € versandkostenfrei innerhalb Deutschlands." },
                { icon: isPersonalizable ? "✍️" : "🌿", title: isPersonalizable ? "Personalisierbar" : "Handgemacht", body: isPersonalizable ? "Trage deinen Wunschtext ein — Anni setzt ihn liebevoll um." : "Von Anni oder ausgewählten Handwerkerinnen aus der Region gefertigt." },
                { icon: "💬", title: "Persönliche Beratung", body: "Nicht sicher? Anni hilft — kostenlos & direkt über das Kontaktformular." },
                { icon: "↩️", title: "Rückgabe & Qualität", body: "Nicht zufrieden? Melde dich innerhalb von 14 Tagen — wir finden eine Lösung." },
              ].map(card => (
                <div key={card.title} style={{ background: "var(--paper-0)", borderRadius: "var(--r-lg)", padding: "22px 20px", border: "1px solid var(--paper-200)", boxShadow: "var(--shadow-xs)" }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: "10px" }}>{card.icon}</div>
                  <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "6px" }}>{card.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.86rem", color: "var(--ink-500)", lineHeight: "1.5" }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "var(--charcoal)", padding: "clamp(64px,9vw,104px) 0" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--gold-400)", display: "block" }}>
              Sonderanfertigung?
            </span>
            <h2 style={{ color: "var(--on-charcoal)", marginTop: "10px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
              Individuelle Anfrage stellen
            </h2>
            <p style={{ color: "rgba(244,239,231,.6)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", marginTop: "12px", lineHeight: "var(--lh-body)" }}>
              Besondere Maße, Gravuren oder ein individuelles Design — Anni antwortet persönlich.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href="/anfrage?service=Shop+Sonderanfertigung" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "14px 30px", borderRadius: "var(--r-pill)", minHeight: "48px",
              }}>
                Anfrage senden <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
              <Link href="/shop" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(244,239,231,.8)", padding: "13px 22px",
                borderRadius: "var(--r-pill)", border: "1px solid rgba(244,239,231,.22)", minHeight: "48px",
              }}>
                <ArrowLeft size={14} strokeWidth={1.8} /> Zurück zum Shop
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (min-width: 768px) {
          .shop-product-grid { grid-template-columns: 1fr 1fr !important; align-items: start; }
        }
      `}</style>
    </>
  );
}
