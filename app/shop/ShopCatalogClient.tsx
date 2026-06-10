"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Check, Star } from "lucide-react";
import { SHOP, SHOP_CATS, imgSrc } from "@/app/components/trendfleurs/data";
import { useStore } from "@/lib/store";

export default function ShopCatalogClient() {
  const [activeCat, setActiveCat] = useState("Alle");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useStore();

  const filtered = activeCat === "Alle" ? SHOP : SHOP.filter((p) => p.cat === activeCat);

  function handleAdd(item: typeof SHOP[0]) {
    addToCart({ id: item.id, name: item.name, price: item.price, seed: item.seed });
    setAddedId(item.id);
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
                {["Versand in 3–5 Tagen", "Personalisierbar", "Handgemacht"].map((tag) => (
                  <span key={tag} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-500)" }}>
                    <Check size={12} strokeWidth={2.5} color="var(--rust-400)" /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {SHOP_CATS.slice(1, 4).map((cat) => {
                const item = SHOP.find((p) => p.cat === cat);
                if (!item) return null;
                return (
                  <div key={cat} style={{ flex: 1, position: "relative", aspectRatio: "2/3", borderRadius: "var(--r-lg)", overflow: "hidden", minHeight: "120px" }}>
                    <Image src={imgSrc(item.seed, 300)} alt={cat} fill sizes="120px" style={{ objectFit: "cover" }} />
                  </div>
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
            {SHOP_CATS.map((cat) => (
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "20px" }}>
            {filtered.map((item) => {
              const isAdded = addedId === item.id;
              return (
                <article key={item.id} style={{
                  background: "var(--paper-0)", borderRadius: "var(--r-xl)",
                  overflow: "hidden", border: "1px solid var(--paper-200)",
                  boxShadow: "var(--shadow-xs)",
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{ position: "relative", aspectRatio: "4/3" }}>
                    <Image src={imgSrc(item.seed, 500)} alt={item.name} fill sizes="(max-width: 600px) 100vw, 260px" style={{ objectFit: "cover" }} />
                    {item.badge && (
                      <span style={{
                        position: "absolute", top: 12, left: 12,
                        fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em",
                        textTransform: "uppercase", padding: "4px 10px",
                        background: item.badge === "Beliebt" ? "var(--rust-500)" : item.badge === "Neu" ? "var(--charcoal)" : "var(--gold-500)",
                        color: "var(--on-rust)", borderRadius: "var(--r-pill)",
                      }}>{item.badge}</span>
                    )}
                  </div>
                  <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-400)" }}>{item.cat}</span>
                    <h3 style={{ fontSize: "var(--fs-h4)", color: "var(--ink-900)", lineHeight: "1.3" }}>{item.name}</h3>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--rust-500)", marginTop: "auto", paddingTop: "8px" }}>
                      {item.price.toFixed(2).replace(".", ",")} €
                    </div>
                    {/* Stars placeholder */}
                    <div style={{ display: "flex", gap: "2px", marginTop: "2px" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={11} fill="var(--gold-400)" color="var(--gold-400)" />
                      ))}
                    </div>
                    <button onClick={() => handleAdd(item)} style={{
                      marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      background: isAdded ? "var(--rust-50)" : "var(--charcoal)",
                      color: isAdded ? "var(--rust-600)" : "var(--on-charcoal)",
                      border: isAdded ? "1px solid var(--rust-300)" : "1px solid transparent",
                      padding: "10px 14px", borderRadius: "var(--r-pill)", cursor: "pointer",
                      transition: "all 200ms", minHeight: "44px",
                    }}>
                      {isAdded
                        ? <><Check size={14} strokeWidth={2.5} /> In den Warenkorb</>
                        : <><ShoppingBag size={14} strokeWidth={1.8} /> In den Warenkorb</>
                      }
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
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
            ].map((card) => (
              <div key={card.title} style={{
                background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                padding: "22px 20px", border: "1px solid var(--paper-200)", boxShadow: "var(--shadow-xs)",
              }}>
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
      `}</style>
    </main>
  );
}
