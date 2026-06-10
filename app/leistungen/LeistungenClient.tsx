"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flower2, Gift, Leaf, Sparkles, Check } from "lucide-react";

const LEISTUNGEN = [
  {
    href: "/leistungen/hochzeiten",
    icon: <Flower2 size={22} strokeWidth={1.5} />,
    kicker: "Full-Service",
    title: "Hochzeiten & Floristik",
    body: "Von der ersten Blüte bis zum letzten Tanz: Brautstrauß, Traubogen, Tafeldekoration, Aufbau & Abbau. Persönlich geplant von Floristin Anni.",
    tags: ["Brautstrauß", "Traubogen", "Tischdeko", "Aufbau & Abbau"],
    img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80",
    badge: "Beliebt",
  },
  {
    href: "/leistungen/events",
    icon: <Sparkles size={22} strokeWidth={1.5} />,
    kicker: "Events & Corporate",
    title: "Events aller Art",
    body: "Geburtstage, Taufen, Firmenjubiläen — durchdachte Deko-Konzepte, die Atmosphäre schaffen und in Erinnerung bleiben.",
    tags: ["Geburtstag", "Firmenfeier", "Taufe", "Raumgestaltung"],
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    badge: null,
  },
  {
    href: "/leistungen/jga",
    icon: <Gift size={22} strokeWidth={1.5} />,
    kicker: "JGA & Workshops",
    title: "Junggesellinnenabschied",
    body: "Ein JGA, der zu euch passt: Flower Crown Workshop, Boho-Deko und das beliebte Audio Gästetelefon — persönlich und unvergesslich.",
    tags: ["Flower Crown", "Audio Gästetelefon", "Workshop", "Boho-Deko"],
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
    badge: "Neu",
  },
  {
    href: "/dekoverleih",
    icon: <Leaf size={22} strokeWidth={1.5} />,
    kicker: "Verleih",
    title: "Dekoverleih",
    body: "Goldener Hoop, Pampas, Kerzenständer & mehr — kuratierte Verleihstücke für euer Event. Abholung oder Lieferung inklusive Styling.",
    tags: ["Goldener Hoop", "Pampas", "Kerzenständer", "Audio Gästetelefon"],
    img: "https://images.unsplash.com/photo-1544078751-58fed2b32c83?auto=format&fit=crop&w=900&q=80",
    badge: null,
  },
];

const PROCESS = [
  { num: "01", title: "Anfrage senden", body: "Kurze Nachricht mit Datum, Anlass und Region — komplett kostenlos & unverbindlich." },
  { num: "02", title: "Persönliches Gespräch", body: "Anni meldet sich innerhalb von 48 h für ein Kennenlernen per Telefon oder Video." },
  { num: "03", title: "Konzept & Angebot", body: "Individuelles Konzept, abgestimmt auf euren Stil und euer Budget — transparent, ohne Überraschungen." },
  { num: "04", title: "Euer Tag glänzt", body: "Anni baut auf, styled und baut ab. Ihr genießt — fertig." },
];

export default function LeistungenClient() {
  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,9vw,96px) 0 clamp(48px,7vw,72px)" }}>
        <div className="tf-inner" style={{ maxWidth: "860px" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "24px" }}>
            <ol style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <li><Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-400)" }}>Home</Link></li>
              <li><span style={{ color: "var(--ink-300)", fontSize: "11px" }}>/</span></li>
              <li><span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rust-500)" }}>Leistungen</span></li>
            </ol>
          </nav>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
            Full-Service aus einer Hand
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "12px", fontSize: "var(--fs-h1)", lineHeight: "var(--lh-head)", color: "var(--ink-900)" }}>
            Alles für deinen schönsten Tag
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "var(--ink-600)", marginTop: "14px", maxWidth: "52ch", lineHeight: "var(--lh-body)" }}>
            Von der Konzeptidee bis zum letzten Abbau — persönlich geplant und umgesetzt von gelernter Floristin Anni.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
            <Link href="/anfrage" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase",
              background: "var(--rust-500)", color: "var(--on-rust)",
              padding: "13px 26px", borderRadius: "var(--r-pill)", minHeight: "48px",
            }}>
              Kostenlos anfragen <ArrowRight size={15} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}>
        <div className="tf-inner" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {LEISTUNGEN.map((s, i) => (
            <article key={s.href} style={{
              display: "grid", gridTemplateColumns: "1fr",
              background: "var(--paper-0)", borderRadius: "var(--r-xl)",
              overflow: "hidden", border: "1px solid var(--paper-200)",
              boxShadow: "var(--shadow-xs)",
            }} className="leistung-card">
              {/* Image */}
              <div style={{
                position: "relative", aspectRatio: "16/9", minHeight: "220px",
                order: 0,
              }} className={i % 2 === 1 ? "leistung-img-right" : ""}>
                <Image src={s.img} alt={s.title} fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: "cover" }} />
                {s.badge && (
                  <span style={{
                    position: "absolute", top: 14, left: 14,
                    fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em",
                    textTransform: "uppercase", padding: "5px 12px",
                    background: "var(--rust-500)", color: "var(--on-rust)", borderRadius: "var(--r-pill)",
                  }}>{s.badge}</span>
                )}
              </div>
              {/* Text */}
              <div style={{ padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--rust-400)", marginBottom: "10px" }}>
                  {s.icon}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
                    {s.kicker}
                  </span>
                </div>
                <h2 style={{ fontSize: "var(--fs-h2)", color: "var(--ink-900)" }}>{s.title}</h2>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", color: "var(--ink-600)", lineHeight: "var(--lh-body)", marginTop: "10px", maxWidth: "48ch" }}>
                  {s.body}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" }}>
                  {s.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em",
                      textTransform: "uppercase", padding: "5px 11px",
                      borderRadius: "var(--r-pill)", background: "var(--paper-200)",
                      color: "var(--ink-500)", border: "1px solid var(--paper-300)",
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
                  <Link href={s.href} style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "var(--rust-500)", color: "var(--on-rust)",
                    padding: "11px 22px", borderRadius: "var(--r-pill)",
                    boxShadow: "0 4px 14px rgba(163,106,94,.22)",
                  }}>
                    Mehr erfahren <ArrowRight size={14} strokeWidth={1.8} />
                  </Link>
                  <Link href={`/anfrage?service=${encodeURIComponent(s.title)}`} style={{
                    display: "inline-flex", alignItems: "center",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--ink-900)", padding: "11px 20px",
                    borderRadius: "var(--r-pill)", border: "1px solid var(--paper-400)",
                  }}>
                    Anfragen
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: "var(--taupe)", padding: "var(--sp-section) 0" }}>
        <div className="tf-inner">
          <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,60px)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>Wie es funktioniert</p>
            <h2 style={{ marginTop: "10px" }}>Von der Anfrage zum Traumevent</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {PROCESS.map((step) => (
              <div key={step.num} style={{
                background: "var(--paper-0)", borderRadius: "var(--r-lg)",
                padding: "28px 22px", boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--paper-200)",
              }}>
                <div style={{ fontFamily: "var(--font-script)", fontSize: "2.2rem", color: "var(--rust-300)", lineHeight: 1 }}>{step.num}</div>
                <h3 style={{ fontSize: "var(--fs-h4)", marginTop: "10px", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-500)", lineHeight: "var(--lh-body)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(40px,6vw,64px) 0" }}>
        <div className="tf-inner">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(16px,3vw,32px)", justifyContent: "center", alignItems: "center" }}>
            {[
              "Ausgebildete Floristin",
              "100+ Hochzeiten gestaltet",
              "Persönliche Betreuung",
              "Westerwald · Köln · Frankfurt · NRW",
              "Aufbau & Abbau inklusive",
            ].map((trust) => (
              <div key={trust} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={14} strokeWidth={2.5} color="var(--rust-400)" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-600)" }}>{trust}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(72px,10vw,120px) 0" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--gold-400)", display: "block" }}>
            Dein Event wartet
          </span>
          <h2 style={{ color: "var(--on-charcoal)", marginTop: "12px", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--fs-h2)" }}>
            Lass uns gemeinsam planen
          </h2>
          <p style={{ color: "rgba(244,239,231,.6)", fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-body)", marginTop: "14px", lineHeight: "var(--lh-body)" }}>
            Kostenlose, unverbindliche Erstberatung. Anni antwortet persönlich innerhalb von 48 Stunden.
          </p>
          <Link href="/anfrage" style={{
            display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "28px",
            fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            background: "var(--rust-500)", color: "var(--on-rust)",
            padding: "15px 34px", borderRadius: "var(--r-pill)", minHeight: "52px",
          }}>
            Jetzt kostenlos anfragen <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .leistung-card { grid-template-columns: 1fr 1fr !important; align-items: stretch; }
          .leistung-img-right { order: 2 !important; }
        }
      `}</style>
    </main>
  );
}
