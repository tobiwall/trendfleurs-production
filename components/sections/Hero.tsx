"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const DESKTOP_IMGS = [
  "/hero/desktop/01.webp",
  "/hero/desktop/02.webp",
  "/hero/desktop/03.webp",
  "/hero/desktop/04.webp",
  "/hero/desktop/05.webp",
  "/hero/desktop/06.webp",
  "/hero/desktop/07.webp",
  "/hero/desktop/08.webp",
];

const MOBILE_IMGS = [
  "/hero/mobil/01.webp",
  "/hero/mobil/02.webp",
  "/hero/mobil/03.webp",
  "/hero/mobil/04.webp",
  "/hero/mobil/05.webp",
  "/hero/mobil/06.webp",
  "/hero/mobil/07.webp",
  "/hero/mobil/08.webp",
  "/hero/mobil/09.webp",
  "/hero/mobil/10.webp",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [imgs, setImgs] = useState<string[]>(DESKTOP_IMGS);

  // Switch image set based on viewport width (breakpoint: 1080px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1080px)");
    const update = (e: MediaQueryList | MediaQueryListEvent) => {
      setImgs(e.matches ? MOBILE_IMGS : DESKTOP_IMGS);
      setSlide(0);
    };
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Restart interval whenever the image set changes
  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % imgs.length), 2000);
    return () => clearInterval(timer);
  }, [imgs]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl
        .from(".h-line",       { opacity: 0, y: 52, duration: 1.1, stagger: 0.11 }, 0.1)
        .from(".h-sub",        { opacity: 0, y: 20, duration: 0.9 }, 0.68)
        .from(".h-cta-wrap",   { opacity: 0, y: 20, duration: 0.8 }, 0.85)
        .from(".h-badge",      { opacity: 0, scale: 0.82, duration: 0.8, stagger: 0.1 }, 0.52)
        .from(".h-scroll-cue", { opacity: 0, duration: 1.4 }, 1.2);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes scroll-pulse {
          0%, 100% { transform: scaleY(0.6); opacity: 0.4; }
          50%       { transform: scaleY(1.0); opacity: 1.0; }
        }

        /* ── Anni portrait — clear presence above the overlay ── */
        .h-anni-wrap {
          position: absolute;
          right: 0;
          bottom: 0;
          width: clamp(300px, 38%, 580px);
          height: 100%;
          z-index: 3;
          opacity: 1;
          -webkit-mask-image:
            linear-gradient(to right,  transparent 0%, black 18%, black 100%),
            linear-gradient(to bottom, transparent 0%, black 14%, black 100%);
          -webkit-mask-composite: source-in;
          mask-image:
            linear-gradient(to right,  transparent 0%, black 18%, black 100%),
            linear-gradient(to bottom, transparent 0%, black 14%, black 100%);
          mask-composite: intersect;
          pointer-events: none;
        }

        @media (max-width: 860px) {
          .h-sub { display: none; }
          .h-badge-wrap { gap: 6px !important; margin-top: 20px !important; }
          .h-badge { font-size: 9px !important; padding: 5px 10px !important; }
          .h-cta-inner { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; }
          .h-cta-inner a { justify-content: center !important; }
          .h-cta-note { display: none !important; }
          .h-anni-wrap {
            width: 44%;
            right: 0;
            height: 42%;
            opacity: 0.6;
          }
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
        }}
      >
        {/* ── Crossfading background images ── */}
        {imgs.map((src, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, zIndex: 0,
              opacity: i === slide ? 1 : 0,
              transition: "opacity 1000ms ease-in-out",
              willChange: "opacity",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* ── Dark warm overlay ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(160deg, rgba(26,18,12,0.62) 0%, rgba(26,18,12,0.40) 100%)",
          }}
        />

        {/* ── Anni — subtile Präsenz im rechten Bilddrittel ── */}
        <div className="h-anni-wrap" aria-hidden="true">
          <Image
            src="/anni1.jpg"
            alt=""
            fill
            style={{ objectFit: "contain", objectPosition: "bottom center" }}
            sizes="(max-width: 860px) 65vw, 34vw"
            priority
          />
        </div>

        {/* ── Foreground content ── */}
        <div
          className="tf-inner"
          style={{
            position: "relative", zIndex: 4, width: "100%",
            padding: "clamp(96px,14vw,160px) var(--gutter) clamp(80px,10vw,120px)",
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)",
              textTransform: "uppercase",
              color: "var(--gold-300)",
              marginBottom: "20px",
            }}>
              Floristik · Dekoverleih · Eventplanung
            </p>

            <h1 id="hero-headline" style={{
              fontFamily: "var(--font-serif)", fontWeight: 400,
              fontSize: "var(--fs-display)", lineHeight: "var(--lh-display)",
              letterSpacing: "var(--track-tight)", color: "#fff",
            }}>
              <span className="h-line" style={{ display: "block" }}>Dein schönster</span>
              <span className="h-line" style={{ display: "block" }}>Tag — gestaltet</span>
              <span className="h-line" style={{ display: "block" }}>
                mit <em style={{ fontStyle: "italic", color: "var(--gold-300)" }}>Liebe</em>.
              </span>
            </h1>

            <p className="h-sub" style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: "var(--fs-lead)", lineHeight: "var(--lh-body)",
              color: "rgba(255,255,255,0.85)", maxWidth: "44ch", marginTop: "24px",
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
                    color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", paddingLeft: "4px",
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
                      background: "transparent", color: "#fff",
                      padding: "14px 28px", borderRadius: "var(--r-pill)",
                      border: "1px solid rgba(255,255,255,0.65)", minHeight: "48px",
                      transition: "background 220ms, color 220ms, transform 220ms, border-color 220ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.65)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    Kostenlos anfragen
                  </Link>
                  <span className="h-cta-note" style={{
                    fontFamily: "var(--font-sans)", fontSize: "11px",
                    color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", paddingLeft: "4px",
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
                  border: "1px solid rgba(255,255,255,0.25)", borderRadius: "var(--r-pill)",
                  padding: "7px 14px", background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  display: "flex", flexDirection: "column", gap: "1px",
                }}>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{b.main}</span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px" }}>{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div className="h-scroll-cue" aria-hidden="true" style={{
          position: "absolute", bottom: "36px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          pointerEvents: "none", zIndex: 10,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
          }}>
            Entdecken
          </span>
          <div style={{
            width: "1px", height: "44px", background: "rgba(255,255,255,0.4)",
            animation: "scroll-pulse 2.2s ease-in-out infinite",
            transformOrigin: "top",
          }} />
        </div>
      </section>
    </>
  );
}
