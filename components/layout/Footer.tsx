"use client";

import Link from "next/link";

const REGIONS = ["Hamm/Sieg", "Westerwald", "Köln", "Düsseldorf", "Frankfurt"];

const FOOTER_LINKS = {
  Entdecken: [
    { href: "/leistungen", label: "Leistungen" },
    { href: "/leistungen/hochzeiten", label: "Hochzeiten" },
    { href: "/leistungen/events", label: "Events" },
    { href: "/leistungen/jga", label: "JGA & Workshops" },
    { href: "/dekoverleih", label: "Dekoverleih" },
    { href: "/shop", label: "Shop" },
  ],
  "Über uns": [
    { href: "/ueber-uns", label: "Über Anni" },
    { href: "/faq", label: "FAQ" },
    { href: "/anfrage", label: "Anfrage stellen" },
    { href: "/anfrage", label: "Kontakt" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--charcoal)", color: "var(--on-charcoal)", paddingTop: "var(--sp-9)", paddingBottom: "40px" }}
      aria-label="Footer"
    >
      <div className="tf-inner">
        <div className="tf-grid-footer" style={{ paddingBottom: "var(--sp-8)" }}>
          {/* ── Brand ── */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "19px", letterSpacing: "0.01em" }}>
              a<span style={{ color: "var(--gold-400)" }}>_</span>trendfleurs
            </div>
            <div style={{ fontFamily: "var(--font-script)", fontSize: "22px", color: "var(--gold-400)", marginTop: "-2px" }}>
              by Anni
            </div>
            <p style={{ color: "rgba(244,239,231,.55)", fontSize: "var(--fs-small)", marginTop: "18px", maxWidth: "30ch", lineHeight: 1.65 }}>
              Eventagentur, Floristik & Dekoverleih — Hochzeiten, JGA und Events mit Herz.
            </p>
            {/* Schema: areaServed hidden text for SEO */}
            <p className="sr-only" aria-hidden="true">
              Tätig in: {REGIONS.join(", ")} und Umgebung
            </p>
          </div>

          {/* ── Nav columns ── */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,239,231,.4)", marginBottom: "18px" }}>
                {title}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "rgba(244,239,231,.72)", transition: "color 200ms" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-300)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,239,231,.72)")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Regions ── */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,239,231,.4)", marginBottom: "18px" }}>
              Regionen
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {REGIONS.map((r) => (
                <Link key={r} href={`/anfrage?region=${encodeURIComponent(r)}`}
                  style={{
                    fontFamily: "var(--font-sans)", fontSize: "0.78rem",
                    padding: "7px 13px", borderRadius: "var(--r-pill)",
                    border: "1px solid rgba(244,239,231,.15)",
                    background: "rgba(244,239,231,.07)", color: "rgba(244,239,231,.7)",
                    transition: "all 240ms",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget.style.background = "rgba(244,239,231,.14)"); (e.currentTarget.style.color = "rgba(244,239,231,1)"); }}
                  onMouseLeave={(e) => { (e.currentTarget.style.background = "rgba(244,239,231,.07)"); (e.currentTarget.style.color = "rgba(244,239,231,.7)"); }}
                >
                  {r}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: "1px solid rgba(244,239,231,.1)", paddingTop: "24px",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(244,239,231,.35)" }}>
            © {new Date().getFullYear()} a_trendfleurs by Anni
            {" · "}
            <Link href="/impressum" style={{ color: "rgba(244,239,231,.35)" }}>Impressum</Link>
            {" · "}
            <Link href="/datenschutz" style={{ color: "rgba(244,239,231,.35)" }}>Datenschutz</Link>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(244,239,231,.3)" }}>
            mit Liebe gemacht ✦
          </span>
        </div>
      </div>
    </footer>
  );
}
