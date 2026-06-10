"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        background: "var(--charcoal)", padding: "clamp(72px,10vw,128px) 0",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hoop.svg" alt="" aria-hidden="true" style={{ position: "absolute", left: "-60px", bottom: "-60px", width: "320px", opacity: 0.15, pointerEvents: "none" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hoop.svg" alt="" aria-hidden="true" style={{ position: "absolute", right: "-50px", top: "-50px", width: "260px", opacity: 0.1, pointerEvents: "none" }} />

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 var(--gutter)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <span aria-hidden="true" style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", color: "var(--gold-400)", lineHeight: 1 }}>
          mit Liebe gemacht
        </span>
        <h2 id="cta-heading" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "14px", color: "var(--on-charcoal)", fontSize: "var(--fs-h2)" }}>
          Lass uns deinen Tag planen.
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "var(--fs-lead)", color: "rgba(244,239,231,.65)", marginTop: "16px", lineHeight: "var(--lh-body)", maxWidth: "44ch", margin: "16px auto 0" }}>
          Hochzeiten, JGA, Workshops & Dekoverleih — für jedes Budget und jeden Stil.
          Floristik & Events in Westerwald, Köln, Frankfurt und ganz NRW.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "36px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Primary */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <Link href="/anfrage"
              aria-label="Kostenlose, unverbindliche Anfrage stellen — Anni antwortet persönlich"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                background: "var(--rust-500)", color: "var(--on-rust)",
                padding: "15px 32px", borderRadius: "var(--r-pill)",
                boxShadow: "var(--shadow-md)", minHeight: "48px",
                transition: "background 220ms, transform 220ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget.style.background = "var(--rust-600)"); (e.currentTarget.style.transform = "translateY(-2px)"); }}
              onMouseLeave={(e) => { (e.currentTarget.style.background = "var(--rust-500)"); (e.currentTarget.style.transform = "none"); }}
            >
              Jetzt anfragen <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            {/* Micro-Copy */}
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(244,239,231,.45)", letterSpacing: "0.04em" }}>
              Anni antwortet persönlich · kostenlos & unverbindlich
            </span>
          </div>

          {/* Ghost */}
          <Link href="/dekoverleih"
            aria-label="Dekoverleih Mietkollektion entdecken"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase",
              background: "transparent", color: "rgba(244,239,231,.85)",
              padding: "14px 28px", borderRadius: "var(--r-pill)", minHeight: "48px",
              border: "1px solid rgba(244,239,231,.25)", transition: "all 220ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget.style.borderColor = "rgba(244,239,231,.6)"); (e.currentTarget.style.color = "rgba(244,239,231,1)"); }}
            onMouseLeave={(e) => { (e.currentTarget.style.borderColor = "rgba(244,239,231,.25)"); (e.currentTarget.style.color = "rgba(244,239,231,.85)"); }}
          >
            Mietkollektion entdecken
          </Link>
        </div>
      </div>
    </section>
  );
}
