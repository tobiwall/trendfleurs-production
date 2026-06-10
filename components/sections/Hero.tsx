"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

/*
 * Parallax layers
 * Layer 0 — Background flowers  → yPercent +30  (slow)
 * Layer 1 — Anni                → y –90px desktop / –30px mobile  (medium)
 * Layer 2 — Text                → natural scroll  (fastest)
 *
 * Mobile hero layout:
 *   Top ~50 svh  — cream fade, eyebrow, H1, CTAs
 *   Bottom ~55 svh — Anni portrait (absolute), z-index 2
 *   Gradient bridge — cream→transparent top-to-bottom at the seam
 */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const anniRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Entrance — shared across all sizes ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl
        .from(".h-eyebrow",    { opacity: 0, y: 20, duration: 0.8 }, 0.05)
        .from(".h-eyebrow-2",  { opacity: 0, y: 16, duration: 0.7 }, 0.2)
        .from(".h-line",       { opacity: 0, y: 52, duration: 1.1, stagger: 0.11 }, 0.3)
        .from(".h-sub",        { opacity: 0, y: 20, duration: 0.9 }, 0.88)
        .from(".h-cta-wrap",   { opacity: 0, y: 20, duration: 0.8 }, 1.05)
        .from(".h-badge",      { opacity: 0, scale: 0.82, duration: 0.8, stagger: 0.1 }, 0.72)
        .from(".h-scroll-cue", { opacity: 0, duration: 1.4 }, 1.4);

      /* ── Anni entrance — direction differs by breakpoint ── */
      mm.add("(min-width: 861px)", () => {
        tl.from(".h-anni", { opacity: 0, x: 40, scale: 0.96, duration: 1.2, ease: "power2.out" }, 0.15);
      });
      mm.add("(max-width: 860px)", () => {
        tl.from(".h-anni", { opacity: 0, y: 70, scale: 0.97, duration: 1.3, ease: "power2.out" }, 0.35);
      });

      /* ── Background parallax (all sizes) ── */
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", end: "bottom top",
          scrub: 0.6,
        },
      });

      /* ── Anni parallax — desktop: strong depth; mobile: gentle so she stays visible ── */
      mm.add("(min-width: 861px)", () => {
        gsap.to(anniRef.current, {
          y: -90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", end: "bottom top",
            scrub: 0.9,
          },
        });
      });
      mm.add("(max-width: 860px)", () => {
        gsap.to(anniRef.current, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", end: "bottom top",
            scrub: 0.9,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Desktop: standard 2-col grid ── */
        .h-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(24px, 4vw, 64px);
          align-items: center;
        }

        /* ── Desktop: Anni column natural in grid ── */
        .h-anni-col {
          position: relative;
          height: clamp(440px, 65vh, 640px);
          z-index: 5;
        }

        /* Mobile gradient bridge — hidden on desktop */
        .h-mob-bridge { display: none; }

        /* ── Mobile (≤ 860px) ── */
        @media (max-width: 860px) {
          /* Single-column text, bottom padding = space for Anni */
          .h-grid {
            grid-template-columns: 1fr;
            padding-top: clamp(52px, 10vw, 72px) !important;
            padding-bottom: 54svh !important;
            gap: 0 !important;
            align-items: flex-start;
          }

          /* Anni: float out of grid, anchor to section bottom */
          .h-anni-col {
            position: absolute !important;
            inset: auto 0 0 0 !important;
            height: 58svh;
            z-index: 2;
          }

          /* Gradient bridge: cream top → transparent bottom, sits above Anni */
          .h-mob-bridge {
            display: block;
            position: absolute;
            left: 0; right: 0;
            bottom: calc(58svh - 100px);
            height: 200px;
            background: linear-gradient(to bottom, var(--cream) 0%, transparent 100%);
            z-index: 3;
            pointer-events: none;
          }

          /* Hide the floating phone badge on mobile (not enough space) */
          .h-phone-badge { display: none; }

          /* Sub text too long for mobile — hide to keep hero tight */
          .h-sub { display: none; }

          /* Badges wrap, reduce font size */
          .h-badge-wrap {
            gap: 6px !important;
            margin-top: 20px !important;
          }
          .h-badge {
            font-size: 9px !important;
            padding: 5px 10px !important;
          }

          /* CTAs stack vertically */
          .h-cta-inner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .h-cta-inner a {
            justify-content: center !important;
          }

          /* Hide micro-copy under buttons */
          .h-cta-note { display: none !important; }
        }

        /* Scroll pulse animation */
        @keyframes scroll-pulse {
          0%, 100% { transform: scaleY(0.6); opacity: 0.4; }
          50%       { transform: scaleY(1.0); opacity: 1.0; }
        }
      `}</style>

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
        {/* ── Layer 0: Background flowers ── */}
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
          {/* Desktop: left-heavy gradient for text readability */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(108deg, rgba(253,251,247,.97) 0%, rgba(253,251,247,.82) 38%, rgba(253,251,247,.30) 65%, rgba(253,251,247,.06) 100%)",
          }} />
          {/* Mobile: top-heavy gradient so text area reads clean */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(253,251,247,0.97) 0%, rgba(253,251,247,0.88) 30%, rgba(253,251,247,0.4) 52%, rgba(253,251,247,0) 72%)",
          }} className="h-mob-top-grad" />
        </div>

        {/* ── Mobile-only gradient bridge (cream→transparent above Anni) ── */}
        <div className="h-mob-bridge" aria-hidden="true" />

        {/* ── Content grid ── */}
        <div
          className="tf-inner h-grid"
          style={{
            position: "relative", zIndex: 4, width: "100%",
            padding: "clamp(96px,14vw,160px) var(--gutter) clamp(80px,10vw,120px)",
          }}
        >
          {/* ── Left: Text ── */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <p className="h-eyebrow" aria-label="Tätigkeitsregionen" style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
              color: "var(--rust-600)", fontWeight: 400,
            }}>
              Westerwald · Köln · Frankfurt · NRW
            </p>
            <p className="h-eyebrow-2" style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
              color: "var(--ink-400)", fontWeight: 400, marginTop: "6px",
            }}>
              Eventagentur · Floristik · Dekoverleih
            </p>

            <h1 id="hero-headline" style={{
              fontFamily: "var(--font-serif)", fontWeight: 400,
              fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)",
              letterSpacing: "var(--track-tight)", color: "var(--ink-900)", marginTop: "20px",
            }}>
              <span className="h-line" style={{ display: "block" }}>Dein schönster</span>
              <span className="h-line" style={{ display: "block" }}>Tag — gestaltet</span>
              <span className="h-line" style={{ display: "block" }}>
                mit <em style={{ fontStyle: "italic", color: "var(--rust-500)" }}>Liebe</em>.
              </span>
            </h1>

            <p className="h-sub" style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "var(--fs-lead)", lineHeight: "var(--lh-body)",
              color: "var(--ink-700)", maxWidth: "44ch", marginTop: "24px",
            }}>
              Als gelernte Floristin im Westerwald gestalte ich nicht nur
              schöne Blumen — ich erschaffe das ganze Gefühl deines Tages.
              Persönlich, sorgfältig, unvergesslich.
            </p>

            <div className="h-cta-wrap" style={{ marginTop: "32px" }}>
              <div className="h-cta-inner" style={{
                display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Link href="/dekoverleih"
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
                  <span className="h-cta-note" style={{
                    fontFamily: "var(--font-sans)", fontSize: "11px",
                    color: "var(--ink-400)", letterSpacing: "0.04em", paddingLeft: "4px",
                  }}>
                    Goldene Hoops ab 15 €/Tag · keine Mindestbestellung
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Link href="/anfrage"
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
                  <span className="h-cta-note" style={{
                    fontFamily: "var(--font-sans)", fontSize: "11px",
                    color: "var(--ink-400)", letterSpacing: "0.04em", paddingLeft: "4px",
                  }}>
                    Unverbindlich · Anni antwortet persönlich in 48 h
                  </span>
                </div>
              </div>
            </div>

            <div className="h-badge-wrap" style={{
              display: "flex", gap: "10px", marginTop: "36px", flexWrap: "wrap",
            }}>
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

          {/* ── Right / Mobile-bottom: Anni ── */}
          <div className="h-anni-col">
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
                sizes="(max-width: 860px) 100vw, 40vw"
                style={{ objectFit: "contain", objectPosition: "bottom center" }}
                priority
              />
            </div>

            {/* Floating badge — hidden on mobile via class */}
            <div className="h-badge h-phone-badge" style={{
              position: "absolute", bottom: "8%", left: "-8%",
              background: "rgba(253,251,247,0.94)", borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow-md)", padding: "14px 18px",
              display: "flex", alignItems: "center", gap: "10px",
              backdropFilter: "blur(12px)", border: "1px solid var(--paper-300)",
              zIndex: 6,
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "18px" }}>📞</span>
              <div>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "11px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--rust-600)", margin: 0,
                }}>
                  Audio Gästetelefon
                </p>
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: "10px",
                  color: "var(--ink-500)", margin: 0,
                }}>
                  ab 89 € / Event
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="h-scroll-cue" aria-hidden="true" style={{
          position: "absolute", bottom: "36px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          pointerEvents: "none", zIndex: 10,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink-400)",
          }}>
            Entdecken
          </span>
          <div style={{
            width: "1px", height: "44px", background: "var(--rust-300)",
            animation: "scroll-pulse 2.2s ease-in-out infinite",
            transformOrigin: "top",
          }} />
        </div>
      </section>
    </>
  );
}
