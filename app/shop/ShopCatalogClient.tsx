"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import type { NormalizedProduct } from "@/lib/shopify";

function shopifyImgSrc(url: string, w: number): string {
  try { const u = new URL(url); u.searchParams.set('width', String(w)); return u.toString(); }
  catch { return url; }
}

export default function ShopCatalogClient({ products }: { products: NormalizedProduct[] }) {
  const [activeCat, setActiveCat] = useState("Alle");
  const [addedId, setAddedId]     = useState<string | null>(null);
  const { addToCart } = useStore();

  const cats = useMemo(() => {
    const s = new Set<string>(["Alle"]);
    products.forEach(p => s.add(p.cat));
    return Array.from(s);
  }, [products]);

  const filtered = useMemo(
    () => activeCat === "Alle" ? products : products.filter(p => p.cat === activeCat),
    [activeCat, products]
  );

  function handleQuickAdd(product: NormalizedProduct) {
    // Quick-add uses the first available variant; variant selection is on the detail page
    const real = product.variants.filter(v => v.title !== "Default Title");
    const v    = real[0] ?? product.variants[0];
    const id   = v ? `${product.id}::${v.id}` : product.id;
    const price = v ? (parseFloat(v.price.amount) || 0) : product.priceRaw;
    addToCart({ id, name: product.name, price, seed: product.seed });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,9vw,96px) 0 clamp(40px,6vw,60px)" }}>
        <div className="tf-inner">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
            <ol style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <li><Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>Home</Link></li>
              <li><span style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span></li>
              <li><span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>Shop</span></li>
            </ol>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", alignItems: "end" }} className="shop-hero-grid">
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                Handgemacht & personalisierbar
              </p>
              <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "12px", fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)", color: "var(--ink-900)" }}>
                Kleine Details, große Wirkung
              </h1>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "var(--ink-600)", marginTop: "14px", maxWidth: "50ch", lineHeight: "var(--lh-body)" }}>
                Willkommensschilder, Tischkarten, Kerzen & Gästebücher — handgemacht und auf Wunsch graviert oder personalisiert.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "18px" }}>
                {["Versand in 3–5 Tagen", "Personalisierbar", "Handgemacht"].map(tag => (
                  <span key={tag} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-500)" }}>
                    <Check size={12} strokeWidth={2.5} color="var(--rust-400)" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero thumbnails from live Shopify products */}
            <div style={{ display: "flex", gap: "8px" }}>
              {products.slice(0, 3).map((p) => {
                const src = p.imageUrl ? shopifyImgSrc(p.imageUrl, 300) : null;
                return (
                  <Link key={p.id} href={`/shop/${p.id}`} style={{ flex: 1, position: "relative", aspectRatio: "2/3", borderRadius: "var(--r-lg)", overflow: "hidden", minHeight: "120px", background: "var(--paper-100)" }}>
                    {src && <Image src={src} alt={p.name} fill sizes="120px" style={{ objectFit: "contain" }} />}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
        <div className="tf-inner">
          {/* Filter chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "clamp(24px,4vw,40px)" }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} style={{
                fontFamily: "var(--font-sans)", fontSize: "0.88rem",
                padding: "9px 18px", borderRadius: "var(--r-pill)", cursor: "pointer",
                border: `1px solid ${activeCat === cat ? "var(--charcoal)" : "rgba(26,26,26,.2)"}`,
                background: activeCat === cat ? "var(--charcoal)" : "var(--paper-0)",
                color: activeCat === cat ? "var(--on-charcoal)" : "var(--ink-700)",
                transition: "all 160ms",
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "clamp(48px,8vw,96px) 0", color: "var(--ink-400)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Produkte werden geladen …
              </p>
            </div>
          ) : (
            <div className="shop-grid">
              {filtered.map(product => {
                const isAdded = addedId === product.id;
                const src = product.imageUrl ? shopifyImgSrc(product.imageUrl, 500) : null;

                return (
                  <article key={product.id} style={{
                    background: "var(--paper-0)", borderRadius: "var(--r-xl)",
                    overflow: "hidden", border: "1px solid var(--paper-200)",
                    boxShadow: "var(--shadow-xs)", display: "flex", flexDirection: "column",
                  }}>
                    {/* Clickable image */}
                    <Link href={`/shop/${product.id}`} className="shop-card-img" style={{ display: "block", position: "relative", overflow: "hidden", background: "var(--paper-100)" }}>
                      {src && <Image src={src} alt={product.name} fill sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 260px" style={{ objectFit: "contain" }} />}
                      {product.badge && (
                        <span style={{
                          position: "absolute", top: 12, left: 12,
                          fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em",
                          textTransform: "uppercase", padding: "4px 10px",
                          background: product.badge === "Beliebt" ? "var(--rust-500)" : product.badge === "Neu" ? "var(--charcoal)" : "var(--gold-500)",
                          color: "var(--on-rust)", borderRadius: "var(--r-pill)",
                        }}>{product.badge}</span>
                      )}
                    </Link>

                    <div className="shop-card-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-400)" }}>{product.cat}</span>
                      <Link href={`/shop/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h3 className="shop-card-title" style={{ color: "var(--ink-900)", lineHeight: "1.3" }}>{product.name}</h3>
                      </Link>
                      <div className="shop-card-price" style={{ fontFamily: "var(--font-serif)", color: "var(--rust-500)", marginTop: "auto", paddingTop: "6px" }}>
                        {product.price}
                      </div>

                      {/* Actions row */}
                      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                        <button onClick={() => handleQuickAdd(product)} className="shop-card-btn" style={{
                          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                          fontFamily: "var(--font-sans)", fontWeight: 500, textTransform: "uppercase",
                          background: isAdded ? "var(--rust-50)" : "var(--charcoal)",
                          color: isAdded ? "var(--rust-600)" : "var(--on-charcoal)",
                          border: isAdded ? "1px solid var(--rust-300)" : "1px solid transparent",
                          borderRadius: "var(--r-pill)", cursor: "pointer", transition: "all 200ms",
                        }}>
                          {isAdded
                            ? <><Check size={13} strokeWidth={2.5} /> Gelegt</>
                            : <><ShoppingBag size={13} strokeWidth={1.8} /> Kaufen</>
                          }
                        </button>
                        <Link href={`/shop/${product.id}`} className="shop-card-detail-btn" style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-mono)", textTransform: "uppercase",
                          color: "var(--ink-700)", background: "transparent",
                          border: "1px solid var(--paper-300)", borderRadius: "var(--r-pill)",
                          textDecoration: "none", whiteSpace: "nowrap",
                        }}>
                          Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Info bar ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(40px,6vw,64px) 0" }}>
        <div className="tf-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "20px" }}>
            {[
              { icon: "📦", title: "Versand in 3–5 Tagen", body: "Sorgfältig verpackt & per DHL. Ab 49 € versandkostenfrei." },
              { icon: "✍️", title: "Personalisierbar", body: "Gravur, Druck, Stickerei — viele Artikel auf Wunsch mit eurem Namen." },
              { icon: "💬", title: "Persönliche Beratung", body: "Nicht sicher, was passt? Anni hilft bei der Auswahl — kostenlos & direkt." },
              { icon: "🌿", title: "Handgemacht in Deutschland", body: "Alle Artikel von Anni oder ausgewählten Handwerkerinnen aus der Region." },
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
      <section style={{ background: "var(--charcoal)", padding: "clamp(64px,9vw,100px) 0" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--gold-400)", display: "block" }}>
            Sonderanfertigung?
          </span>
          <h2 style={{ color: "var(--on-charcoal)", marginTop: "10px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
            Ich fertige auch individuell an
          </h2>
          <p style={{ color: "rgba(244,239,231,.6)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", marginTop: "12px", lineHeight: "var(--lh-body)" }}>
            Schilder in bestimmten Maßen, besondere Gravuren oder eine komplette Papeterie-Suite — einfach anfragen.
          </p>
          <Link href="/anfrage?service=Shop+Sonderanfertigung" style={{
            display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "24px",
            fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            background: "var(--rust-500)", color: "var(--on-rust)",
            padding: "14px 30px", borderRadius: "var(--r-pill)", minHeight: "50px",
          }}>
            Sonderanfertigung anfragen <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (min-width: 640px) {
          .shop-hero-grid { grid-template-columns: 1fr 280px !important; }
        }

        /* ── Product grid ── */
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 520px) {
          .shop-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
          }
        }

        /* ── Card image ── */
        .shop-card-img { height: 150px; }
        @media (min-width: 520px) { .shop-card-img { height: 200px; } }

        /* ── Card body ── */
        .shop-card-body { padding: 10px 10px 12px; gap: 4px; }
        @media (min-width: 520px) { .shop-card-body { padding: 16px 16px 18px; gap: 6px; } }

        /* ── Card title ── */
        .shop-card-title { font-size: 0.8rem; margin: 0; }
        @media (min-width: 520px) { .shop-card-title { font-size: var(--fs-h4); } }

        /* ── Card price ── */
        .shop-card-price { font-size: 1rem; }
        @media (min-width: 520px) { .shop-card-price { font-size: 1.2rem; } }

        /* ── Quick-add & detail buttons ── */
        .shop-card-btn { font-size: 0.68rem; letter-spacing: 0.08em; padding: 7px 8px; min-height: 34px; }
        @media (min-width: 520px) { .shop-card-btn { font-size: 0.78rem; letter-spacing: 0.12em; padding: 9px 12px; min-height: 40px; } }

        .shop-card-detail-btn { font-size: 0.65rem; letter-spacing: 0.08em; padding: 7px 10px; }
        @media (min-width: 520px) { .shop-card-detail-btn { font-size: 0.72rem; letter-spacing: 0.1em; padding: 9px 14px; } }
      `}</style>
    </main>
  );
}
