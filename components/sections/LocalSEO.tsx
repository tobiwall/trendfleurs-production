"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

const REGIONS = [
  {
    name: "Westerwald",
    slug: "westerwald",
    tagline: "Heimatregion & Herz",
    desc: "Idyllische Hochzeiten in der Natur — Hoofs, Florals und persönliche Beratung direkt vor Ort im Westerwald.",
    highlight: true,
  },
  {
    name: "Hamm/Sieg",
    slug: "hamm-sieg",
    tagline: "Direkt vor Ort",
    desc: "Dekoverleih & Full-Service Hochzeitsplanung in der Region Hamm/Sieg und dem Rhein-Sieg-Kreis.",
    highlight: false,
  },
  {
    name: "Köln",
    slug: "koeln",
    tagline: "Metropolregion",
    desc: "Events, JGA und Hochzeitsdekoration in Köln — mit Lieferung und Aufbau in der gesamten Domstadt.",
    highlight: false,
  },
  {
    name: "Düsseldorf",
    slug: "duesseldorf",
    tagline: "Design & Eleganz",
    desc: "Fine Art Floristik und Dekoverleih für gehobene Events und Hochzeiten in Düsseldorf und Umgebung.",
    highlight: false,
  },
  {
    name: "Frankfurt",
    slug: "frankfurt",
    tagline: "Events & Feiern",
    desc: "JGA, Taufen, Geburtstage und Hochzeiten — Trendfleurs liefert auch nach Frankfurt und das Rhein-Main-Gebiet.",
    highlight: false,
  },
  {
    name: "NRW & Hessen",
    slug: "nrw-hessen",
    tagline: "Regionale Abdeckung",
    desc: "Mit dem Lieferwagen erreichbar — ganz NRW und Teile Hessens. Frage gerne nach deiner Region.",
    highlight: false,
  },
];

export default function LocalSEO() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".lseo-card", {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      gsap.from(".lseo-head", {
        opacity: 0, y: 28, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Regionen und Einzugsgebiet"
      style={{ background: "var(--paper-100)", padding: "var(--sp-section) 0" }}
    >
      <div className="tf-inner">
        {/* Heading */}
        <div className="lseo-head" style={{ maxWidth: "580px", marginBottom: "52px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)", letterSpacing: "var(--track-kicker)", textTransform: "uppercase", color: "var(--rust-600)" }}>
            Vor Ort für euch
          </p>
          <h2 style={{ marginTop: "14px", color: "var(--ink-900)" }}>
            Hochzeiten & Events in eurer Region
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "var(--ink-500)", marginTop: "14px", lineHeight: "var(--lh-body)" }}>
            Trendfleurs gestaltet Hochzeiten, JGA und Events persönlich vor Ort —
            von der ersten Beratung bis zum Abbau. Wähle deine Region.
          </p>
        </div>

        {/* Region grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} className="lseo-grid">
          {REGIONS.map((r) => (
            <article
              key={r.slug}
              className="lseo-card"
              itemScope
              itemType="https://schema.org/Service"
            >
              <Link href={`/anfrage?region=${r.slug}`} style={{
                display: "block", padding: "26px 24px 22px",
                background: r.highlight ? "var(--rust-500)" : "var(--cream)",
                borderRadius: "var(--r-lg)",
                border: `1px solid ${r.highlight ? "transparent" : "var(--paper-300)"}`,
                boxShadow: r.highlight ? "var(--shadow-md)" : "var(--shadow-xs)",
                textDecoration: "none", transition: "box-shadow 300ms, transform 300ms var(--ease-organic)",
              }}
              onMouseEnter={(e) => { (e.currentTarget.style.boxShadow = "var(--shadow-md)"); (e.currentTarget.style.transform = "translateY(-3px)"); }}
              onMouseLeave={(e) => { (e.currentTarget.style.boxShadow = r.highlight ? "var(--shadow-md)" : "var(--shadow-xs)"); (e.currentTarget.style.transform = "none"); }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <MapPin size={15} strokeWidth={1.6} style={{ color: r.highlight ? "rgba(251,243,239,.7)" : "var(--rust-500)", flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em",
                    textTransform: "uppercase", color: r.highlight ? "rgba(251,243,239,.65)" : "var(--ink-400)",
                  }}>
                    {r.tagline}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "var(--fs-h4)",
                  color: r.highlight ? "var(--on-rust)" : "var(--ink-900)",
                }}
                itemProp="areaServed"
                >
                  {r.name}
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: "var(--fs-caption)",
                  color: r.highlight ? "rgba(251,243,239,.75)" : "var(--ink-500)",
                  marginTop: "8px", lineHeight: 1.6,
                }}
                itemProp="description"
                >
                  {r.desc}
                </p>
                <span style={{
                  display: "inline-block", marginTop: "14px",
                  fontFamily: "var(--font-sans)", fontSize: "0.74rem", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: r.highlight ? "rgba(251,243,239,.9)" : "var(--rust-500)",
                  borderBottom: `1px solid ${r.highlight ? "rgba(251,243,239,.4)" : "var(--rust-300)"}`,
                  paddingBottom: "1px",
                }}>
                  Anfrage stellen →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .lseo-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 500px) { .lseo-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
