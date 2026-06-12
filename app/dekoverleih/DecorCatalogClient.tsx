"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Check } from "lucide-react";
import { DecorPage } from "@/app/components/trendfleurs/Catalog";
import { useStore } from "@/lib/store";
import type { DecorItem } from "@/app/components/trendfleurs/data";
import type { NormalizedProduct, ShopifyVariant } from "@/lib/shopify";

function shopifyImgSrc(url: string, w: number): string {
  try { const u = new URL(url); u.searchParams.set('width', String(w)); return u.toString(); }
  catch { return url; }
}

function hasRealVariants(variants: ShopifyVariant[]): boolean {
  return variants.some(v => v.title !== 'Default Title');
}

function fmtVariantPrice(amount: string): string {
  const n = parseFloat(amount);
  if (isNaN(n)) return '–';
  return `ab ${n % 1 === 0 ? String(n) : n.toFixed(2).replace('.', ',')} €`;
}

interface Props {
  products: NormalizedProduct[];
}

export default function DecorCatalogClient({ products }: Props) {
  const router = useRouter();
  const { addToWish } = useStore();
  const [activeCat, setActiveCat] = useState("Alle");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [selVariants, setSelVariants] = useState<Record<string, string>>({});

  const cats = useMemo(() => {
    const s = new Set<string>(['Alle']);
    products.forEach(p => s.add(p.cat));
    return Array.from(s);
  }, [products]);

  const filtered = useMemo(
    () => activeCat === 'Alle' ? products : products.filter(p => p.cat === activeCat),
    [products, activeCat]
  );

  // ── Fallback to static DecorPage when Shopify not configured ──
  if (products.length === 0) {
    return (
      <DecorPage
        go={(page, ctx) => {
          if (page === 'product' && ctx?.kind === 'decor') router.push(`/dekoverleih/${ctx.id}`);
          else if (page === 'contact') router.push('/anfrage');
        }}
        addToWishlist={(item: DecorItem) =>
          addToWish({ id: item.id, name: item.name, price: item.price, unit: item.unit, seed: item.seed })
        }
      />
    );
  }

  function getVariant(product: NormalizedProduct): ShopifyVariant | undefined {
    const real = product.variants.filter(v => v.title !== 'Default Title');
    if (!real.length) return product.variants[0];
    const selId = selVariants[product.id];
    return real.find(v => v.id === selId) ?? real[0];
  }

  function handleWish(product: NormalizedProduct) {
    const variant  = getVariant(product);
    const withVar  = hasRealVariants(product.variants);
    const wishId   = variant ? `${product.id}::${variant.id}` : product.id;
    const wishName = withVar && variant ? `${product.name} — ${variant.title}` : product.name;
    const wishPrice = variant ? fmtVariantPrice(variant.price.amount) : product.price;

    addToWish({
      id: wishId, name: wishName, price: wishPrice,
      unit: product.unit, seed: product.seed,
      imageUrl: product.imageUrl ?? undefined,
    });
    setAddedIds(prev => ({ ...prev, [wishId]: true }));
    setTimeout(() => setAddedIds(prev => { const n = { ...prev }; delete n[wishId]; return n; }), 1800);
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
              <li><span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>Dekoverleih</span></li>
            </ol>
          </nav>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
            Mieten statt kaufen
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "12px", fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)", color: "var(--ink-900)" }}>
            Schönes zum Mieten
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "var(--ink-600)", marginTop: "14px", maxWidth: "52ch", lineHeight: "var(--lh-body)" }}>
            Kuratierter Dekoverleih für Hochzeiten, JGA und Events — golden, natürlich, unvergesslich.
          </p>
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
          <div className="decor-grid">
            {filtered.map(product => {
              const real = product.variants.filter(v => v.title !== 'Default Title');
              const selId = selVariants[product.id] ?? real[0]?.id ?? '';
              const selVariant = real.find(v => v.id === selId) ?? real[0];
              const displayPrice = selVariant && hasRealVariants(product.variants)
                ? fmtVariantPrice(selVariant.price.amount)
                : product.price;
              const wishId = selVariant ? `${product.id}::${selVariant.id}` : product.id;
              const isAdded = !!addedIds[wishId];
              const imgSrc = product.imageUrl
                ? shopifyImgSrc(product.imageUrl, 500)
                : `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80`;

              return (
                <article key={product.id} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-xl)",
                  overflow: "hidden", border: "1px solid var(--paper-200)",
                  boxShadow: "var(--shadow-xs)", display: "flex", flexDirection: "column",
                }}>
                  <Link href={`/dekoverleih/${product.id}`} className="decor-card-img" style={{ display: "block", position: "relative", overflow: "hidden", background: "var(--paper-100)" }}>
                    <Image
                      src={imgSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 260px"
                      style={{ objectFit: "contain" }}
                    />
                    {product.badge && (
                      <span style={{
                        position: "absolute", top: 12, left: 12,
                        fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em",
                        textTransform: "uppercase", padding: "4px 10px",
                        background: product.badge === 'Beliebt' ? "var(--rust-500)" : product.badge === 'Neu' ? "var(--charcoal)" : "var(--gold-500)",
                        color: "var(--on-rust)", borderRadius: "var(--r-pill)",
                      }}>{product.badge}</span>
                    )}
                  </Link>

                  <div className="decor-card-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-400)" }}>{product.cat}</span>
                    <Link href={`/dekoverleih/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3 className="decor-card-title" style={{ color: "var(--ink-900)", lineHeight: "1.3" }}>{product.name}</h3>
                    </Link>

                    {/* Variant selector */}
                    {real.length > 1 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                        {real.map(v => (
                          <button
                            key={v.id}
                            disabled={!v.availableForSale}
                            onClick={() => setSelVariants(prev => ({ ...prev, [product.id]: v.id }))}
                            style={{
                              fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em",
                              padding: "4px 10px", borderRadius: "var(--r-pill)", cursor: v.availableForSale ? "pointer" : "not-allowed",
                              border: `1px solid ${selId === v.id ? "var(--charcoal)" : "var(--paper-300)"}`,
                              background: selId === v.id ? "var(--charcoal)" : "transparent",
                              color: selId === v.id ? "var(--on-charcoal)" : v.availableForSale ? "var(--ink-700)" : "var(--ink-300)",
                              opacity: v.availableForSale ? 1 : 0.5, transition: "all 140ms",
                            }}
                          >
                            {v.title}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="decor-card-price" style={{ fontFamily: "var(--font-serif)", color: "var(--rust-500)", marginTop: "auto", paddingTop: "6px" }}>
                      {displayPrice} <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-400)", letterSpacing: "0.1em" }}>{product.unit}</span>
                    </div>

                    <button onClick={() => handleWish(product)} className="decor-card-btn" style={{
                      marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      fontFamily: "var(--font-sans)", fontWeight: 500, textTransform: "uppercase",
                      background: isAdded ? "var(--rust-50)" : "var(--paper-0)",
                      color: isAdded ? "var(--rust-600)" : "var(--ink-900)",
                      border: `1px solid ${isAdded ? "var(--rust-300)" : "var(--ink-900)"}`,
                      borderRadius: "var(--r-pill)", cursor: "pointer", transition: "all 200ms",
                    }}>
                      {isAdded
                        ? <><Check size={14} strokeWidth={2.5} /> Auf Wunschliste</>
                        : <><Heart size={14} strokeWidth={1.8} /> Zur Wunschliste</>
                      }
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Responsive product grid ── */
        .decor-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 520px) {
          .decor-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
          }
        }

        /* ── Card image area — portrait 4:5, scales with column width ── */
        .decor-card-img { aspect-ratio: 4/5; }

        /* ── Card body ── */
        .decor-card-body { padding: 10px 10px 12px; gap: 4px; }
        @media (min-width: 520px) { .decor-card-body { padding: 16px 16px 18px; gap: 6px; } }

        /* ── Card title ── */
        .decor-card-title { font-size: 0.8rem; }
        @media (min-width: 520px) { .decor-card-title { font-size: var(--fs-h4); } }

        /* ── Card price ── */
        .decor-card-price { font-size: 1rem; }
        @media (min-width: 520px) { .decor-card-price { font-size: 1.2rem; } }

        /* ── Card CTA button ── */
        .decor-card-btn { font-size: 0.7rem; letter-spacing: 0.1em; padding: 7px 10px; min-height: 34px; }
        @media (min-width: 520px) { .decor-card-btn { font-size: 0.82rem; letter-spacing: 0.14em; padding: 10px 14px; min-height: 44px; } }
      `}</style>

      {/* ── CTA ── */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(64px,9vw,100px) 0" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--gold-400)", display: "block" }}>
            Individuelle Anfrage?
          </span>
          <h2 style={{ color: "var(--on-charcoal)", marginTop: "10px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
            Anni berät dich persönlich
          </h2>
          <p style={{ color: "rgba(244,239,231,.6)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", marginTop: "12px", lineHeight: "var(--lh-body)" }}>
            Besondere Mengen, Kombinationen oder Ideen — einfach anfragen.
          </p>
          <Link href="/anfrage" style={{
            display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "24px",
            fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            background: "var(--rust-500)", color: "var(--on-rust)",
            padding: "14px 30px", borderRadius: "var(--r-pill)", minHeight: "50px",
          }}>
            Jetzt anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}
