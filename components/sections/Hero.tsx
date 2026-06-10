"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

/*
 * 3-Layer Parallax Depth Stack
 *
 * Layer 0 — Background (farthest)   → moves DOWN  +30 yPercent (slow)
 * Layer 1 — Anni cutout (middle)    → moves UP    -80px        (medium)
 * Layer 2 — Text + CTAs (closest)   → natural page scroll      (fastest)
 *
 * Result: strong binocular-disparity 3D illusion as user scrolls.
 */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const anniRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Entrance sequence ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl
        .from(".h-eyebrow",   { opacity: 0, y: 20,  duration: 0.8 }, 0.05)
        .from(".h-eyebrow-2", { opacity: 0, y: 16,  duration: 0.7 }, 0.2)
        .from(".h-line",      { opacity: 0, y: 52,  duration: 1.1, stagger: 0.11 }, 0.3)
        .from(".h-sub",       { opacity: 0, y: 20,  duration: 0.9 }, 0.88)
        .from(".h-cta-wrap",  { opacity: 0, y: 20,  duration: 0.8 }, 1.05)
        .from(".h-badge",     { opacity: 0, scale: 0.82, duration: 0.8, stagger: 0.1 }, 0.72)
        .from(".h-anni",      { opacity: 0, x: 40, scale: 0.96, duration: 1.2, ease: "power2.out" }, 0.15)
        .from(".h-scroll-cue",{ opacity: 0, duration: 1.4 }, 1.4);

      /* ── Layer 0: background (slowest / farthest) ── */
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      /* ── Layer 1: Anni (medium / middle depth) ── */
      gsap.to(anniRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-headline"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--cream)",
      }}
    >
      {/* ── Layer 0: Background image ── */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          willChange: "transform",
          transform: "scale(1.22)",
          transformOrigin: "center 40%",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1800&q=85"
          alt="Florale Hochzeitsdekoration mit Trockenblumen und Pampas-Gras — a_trendfleurs by Anni"
          fill priority sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        {/* Directional gradient — left heavy for text, right open for Anni */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(108deg, rgba(253,251,247,.97) 0%, rgba(253,251,247,.82) 38%, rgba(253,251,247,.30) 65%, rgba(253,251,247,.06) 100%)",
        }} />
      </div>

      {/* ── Content grid (Layer 2 for text, Layer 1 for Anni) ── */}
      <div
        className="tf-inner"
        style={{
          position: "relative", zIndex: 2, width: "100%",
          padding: "clamp(96px,14vw,160px) var(--gutter) clamp(80px,10vw,120px)",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "clamp(24px, 4vw, 64px)",
          alignItems: "center",
        }}
      >
        {/* ── Left column: Text (Layer 2 — no explicit parallax = fastest) ── */}
        <div style={{ position: "relative", zIndex: 10 }}>

          {/* Eyebrow: region signal */}
          <p
            className="h-eyebrow"
            aria-label="Tätigkeitsregionen"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
              color: "var(--rust-600)", fontWeight: 400,
            }}
          >
            Westerwald · Köln · Frankfurt · NRW
          </p>
          <p
            className="h-eyebrow-2"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
              color: "var(--ink-400)", fontWeight: 400, marginTop: "6px",
            }}
          >
            Eventagentur · Floristik · Dekoverleih
          </p>

          {/* H1 — exactly one per page */}
          <h1
            id="hero-headline"
            style={{
              fontFamily: "var(--font-serif)", fontWeight: 400,
              fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)", marginTop: "20px",
            }}
          >
            <span className="h-line" style={{ display: "block" }}>Dein schönster</span>
            <span className="h-line" style={{ display: "block" }}>Tag — gestaltet</span>
            <span className="h-line" style={{ display: "block" }}>
              mit <em style={{ fontStyle: "italic", color: "var(--rust-500)" }}>Liebe</em>.
            </span>
          </h1>

          {/* Sub — with regional keyword */}
          <p
            className="h-sub"
            style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "var(--fs-lead)", lineHeight: "var(--lh-body)",
              color: "var(--ink-700)", maxWidth: "44ch", marginTop: "24px",
            }}
          >
            Als gelernte Floristin im Westerwald gestalte ich nicht nur
            schöne Blumen — ich erschaffe das ganze Gefühl deines Tages.
            Persönlich, sorgfältig, unvergesslich.
          </p>

          {/* CTAs with micro-copy */}
          <div className="h-cta-wrap" style={{ marginTop: "36px" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>

              {/* Primary */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Link
                  href="/dekoverleih"
                  aria-label="Mietkollektion ansehen — Hoops, Pampas und mehr"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "var(--rust-500)", color: "var(--on-rust)",
                    padding: "15px 30px", borderRadius: "var(--r-pill)",
                    boxShadow: "var(--shadow-md)", minHeight: "48px",
                    transition: "background 220ms, transform 220ms, box-shadow 220ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--rust-600)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--rust-500)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                >
                  Mietkollektion ansehen <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </Link>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--ink-400)", letterSpacing: "0.04em", paddingLeft: "4px" }}>
                  Goldene Hoops ab 15 €/Tag · keine Mindesbestellung
                </span>
              </div>

              {/* Ghost */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Link
                  href="/anfrage"
                  aria-label="Kostenlose, unverbindliche Anfrage stellen"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "transparent", color: "var(--ink-900)",
                    padding: "14px 28px", borderRadius: "var(--r-pill)",
                    border: "1px solid var(--ink-900)", minHeight: "48px",
                    transition: "background 220ms, color 220ms, transform 220ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--charcoal)";
                    e.currentTarget.style.color = "var(--on-charcoal)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--ink-900)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  Kostenlos anfragen
                </Link>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--ink-400)", letterSpacing: "0.04em", paddingLeft: "4px" }}>
                  Unverbindlich · Anni antwortet persönlich in 48 h
                </span>
              </div>
            </div>
          </div>

          {/* Social proof badges */}
          <div style={{ display: "flex", gap: "10px", marginTop: "36px", flexWrap: "wrap" }}>
            {[
              { main: "★★★★★ Google", sub: "Top-bewertet" },
              { main: "100+ Events", sub: "gestaltet" },
              { main: "Persönliche Beratung", sub: "immer inklusive" },
            ].map((b) => (
              <div key={b.main} className="h-badge" style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                border: "1px solid var(--paper-400)", borderRadius: "var(--r-pill)",
                padding: "7px 14px", background: "rgba(253,251,247,0.88)",
                backdropFilter: "blur(10px)",
                display: "flex", flexDirection: "column", gap: "1px",
              }}>
                <span style={{ color: "var(--ink-700)", fontWeight: 500 }}>{b.main}</span>
                <span style={{ color: "var(--ink-400)", fontSize: "9px" }}>{b.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column: Anni cutout (Layer 1 — GSAP parallax) ── */}
        <div
          className="h-anni-col"
          style={{ position: "relative", height: "clamp(440px, 65vh, 640px)", zIndex: 5 }}
        >
          <div
            ref={anniRef}
            className="h-anni"
            style={{
              position: "absolute", inset: 0,
              filter: "drop-shadow(0 24px 56px rgba(60,42,30,0.22)) drop-shadow(0 6px 18px rgba(60,42,30,0.12))",
              willChange: "transform",
            }}
          >
            <Image
              src="/anni1.jpg"
              alt="Anni, Inhaberin und Floristin von a_trendfleurs — Hochzeitsplanung im Westerwald"
              fill
              sizes="(max-width: 900px) 0px, 40vw"
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
              priority
            />
          </div>

          {/* Floating card — audio phone badge */}
          <div className="h-badge" style={{
            position: "absolute", bottom: "8%", left: "-8%",
            background: "rgba(253,251,247,0.94)", borderRadius: "var(--r-lg)",
            boxShadow: "var(--shadow-md)", padding: "14px 18px",
            display: "flex", alignItems: "center", gap: "10px",
            backdropFilter: "blur(12px)", border: "1px solid var(--paper-300)",
            zIndex: 6,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "18px" }}>📞</span>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rust-600)", margin: 0 }}>
                Audio Gästetelefon
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--ink-500)", margin: 0 }}>
                ab 89 € / Event
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="h-scroll-cue"
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "36px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink-400)" }}>
          Entdecken
        </span>
        <div style={{ width: "1px", height: "44px", background: "var(--rust-300)", animation: "scroll-pulse 2.2s ease-in-out infinite", transformOrigin: "top" }} />
      </div>

      {/* Hide Anni column on mobile */}
      <style>{`
        @media (max-width: 860px) {
          .h-anni-col { display: none !important; }
        }
        @media (max-width: 860px) {
          [style*="grid-template-columns: 1.1fr 0.9fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
