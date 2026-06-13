"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    kicker: "01 · Floristik",
    title: "Event-Floristik",
    body: "Brautstrauß, Traubogen, Tafeldekoration — persönlich gebunden, geliefert und aufgebaut.",
    cta: "Floristik entdecken",
    href: "/leistungen/hochzeiten",
    Icon: Flower2,
    accent: "var(--rust-500)",
    accentRgb: "163,106,94",
    img: "/eventfloristik-thumb.webp",
    imgAlt: "Elegante Hochzeitsfloristik — Brautstrauß und Tischdekoration",
  },
  {
    kicker: "02 · Dekoverleih",
    title: "Exklusiver Dekoverleih",
    body: "Goldene Hoops, Pampas-Gras, Candlelights, Audio Gästetelefon (ab 89 €/Event) — kuratiert für euren perfekten Tag.",
    cta: "Kollektion ansehen",
    href: "/dekoverleih",
    Icon: Heart,
    accent: "var(--gold-500)",
    accentRgb: "184,150,44",
    img: "/deko-thumb.webp",
    imgAlt: "Goldener Hoop mit Blumen — Dekoverleih für Hochzeiten",
  },
  {
    kicker: "03 · Full-Service",
    title: "Ganzheitliche Event-Konzeption",
    body: "Von der ersten Idee bis zur letzten Blüte — Konzept, Floristik, Deko, Aufbau, Abbau.",
    cta: "Full-Service anfragen",
    href: "/anfrage",
    Icon: Sparkles,
    accent: "var(--charcoal)",
    accentRgb: "26,26,26",
    img: "/fullservice-thumb.webp",
    imgAlt: "Eleganter Hochzeitssaal — ganzheitliche Event-Konzeption",
  },
] as const;

export default function ServiceWorlds() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const deckWrapRef = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const c0 = useRef<HTMLDivElement>(null);
  const c1 = useRef<HTMLDivElement>(null);
  const c2 = useRef<HTMLDivElement>(null);
  const cardRefs = [c0, c1, c2] as const;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cards = cardRefs.map((r) => r.current!).filter(Boolean);

      /* ── Section header reveal (all sizes) ── */
      gsap.from(headerRef.current!.children, {
        opacity: 0, y: 22, stagger: 0.12, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%", once: true },
      });

      /* ══════════════════════════════════════════════
         DESKTOP: cinematic entrance + 3D tilt
      ══════════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, {
          transformPerspective: 900,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity, filter",
        });

        gsap.from(cards, {
          y: 70, rotateX: 16, scale: 0.84,
          opacity: 0, filter: "blur(12px)",
          stagger: 0.2, duration: 1.35, ease: "expo.out",
          onComplete: () => gsap.set(cards, { willChange: "auto" }),
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%", once: true,
          },
        });

        const cleanups: (() => void)[] = [];
        cardRefs.forEach((ref) => {
          const card = ref.current;
          if (!card) return;
          const imgInner = card.querySelector<HTMLElement>(".sw-img-inner");
          gsap.set(card, { transformPerspective: 900 });

          const qRotX = gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3.out" });
          const qRotY = gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3.out" });
          const qScl  = gsap.quickTo(card, "scale",   { duration: 0.5, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const nx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
            const ny = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
            qRotX(-ny * 6); qRotY(nx * 9); qScl(1.025);
            if (imgInner) gsap.to(imgInner, { x: nx * -14, y: ny * -10, duration: 0.7, ease: "power2.out", overwrite: "auto" });
          };
          const onLeave = () => {
            qRotX(0); qRotY(0); qScl(1);
            if (imgInner) gsap.to(imgInner, { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" });
          };

          card.addEventListener("mousemove", onMove as EventListener);
          card.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            card.removeEventListener("mousemove", onMove as EventListener);
            card.removeEventListener("mouseleave", onLeave);
            gsap.set(card, { clearProps: "rotateX,rotateY,scale,transformPerspective" });
            if (imgInner) gsap.set(imgInner, { clearProps: "x,y" });
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });

      /* ══════════════════════════════════════════════
         MOBILE: 3D Overlap-Deck — cards stack on top
         of each other; each flies off to top-left as
         the user scrolls, revealing the next beneath.
         Section is pinned for the duration of the deck.
      ══════════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        const grid    = gridRef.current!;
        const deckWrap = deckWrapRef.current!;

        /* Measure card size: full width, portrait 2:3 */
        const cardW = grid.offsetWidth;
        const cardH = Math.round(cardW * 1.38);
        /* Extra height so the peeking cards below show */
        gsap.set(grid, { height: cardH + 52 });

        /* Stack the three cards on top of each other */
        gsap.set(c0.current, {
          position: "absolute", top: 0, left: 0, width: "100%", height: cardH,
          zIndex: 3, y: 0, scale: 1,
          transformPerspective: 900, transformOrigin: "50% 100%",
        });
        gsap.set(c1.current, {
          position: "absolute", top: 0, left: 0, width: "100%", height: cardH,
          zIndex: 2, y: 16, scale: 0.952,
          transformPerspective: 900, transformOrigin: "50% 100%",
        });
        gsap.set(c2.current, {
          position: "absolute", top: 0, left: 0, width: "100%", height: cardH,
          zIndex: 1, y: 32, scale: 0.906,
          transformPerspective: 900, transformOrigin: "50% 100%",
        });

        /* Pin the deck; 1×100vh scroll space — snaps immediately between card states */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: deckWrap,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            snap: { snapTo: 1 / 2, duration: 0.5, ease: "power3.inOut" },
          },
        });

        /* ── Phase 1 (0→0.5): card 0 flies upper-left, card 1 rises to front ── */
        tl.to(c0.current, {
          y: "-40%", x: "-120%",
          rotateZ: -15,
          opacity: 0,
          duration: 0.42, ease: "power4.out",
        }, 0);
        tl.to(c1.current, { y: 0, scale: 1, duration: 0.42, ease: "power2.out" }, 0);
        tl.to(c2.current, { y: 16, scale: 0.952, duration: 0.42, ease: "power2.out" }, 0);

        /* ── Phase 2 (0.5→1): card 1 flies lower-right, card 2 rises to front ── */
        tl.to(c1.current, {
          y: "40%", x: "120%",
          rotateZ: 15,
          opacity: 0,
          duration: 0.42, ease: "power4.out",
        }, 0.5);
        tl.to(c2.current, { y: 0, scale: 1, duration: 0.42, ease: "power2.out" }, 0.5);

        return () => {
          if (grid) gsap.set(grid, { clearProps: "height" });
          [c0.current, c1.current, c2.current].forEach((el) => {
            if (el) gsap.set(el, { clearProps: "all" });
          });
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        .sw-section { overflow: hidden; }

        /* ── Desktop grid: 3 columns ── */
        .sw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.8vw, 34px);
        }

        .sw-card-wrap { border-radius: var(--r-xl); will-change: transform, opacity, filter; }
        .sw-article {
          border-radius: var(--r-xl);
          overflow: hidden;
          background: var(--paper-0);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--paper-200);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .sw-img-outer {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sw-img-inner { position: absolute; inset: -8%; will-change: transform; }

        .sw-content-wrap {
          padding: 28px 26px 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .sw-arrow { transition: transform 220ms ease; display: inline-block; }
        .sw-card-wrap:hover .sw-arrow { transform: translateX(5px); }

        /* Mobile gradient overlay — hidden on desktop */
        .sw-mob-gradient {
          display: none;
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(16,10,6,0.88) 0%,
            rgba(16,10,6,0.55) 40%,
            rgba(16,10,6,0.0) 75%
          );
          z-index: 1; pointer-events: none;
        }

        /* ════════════════════════════════════════════
           DESKTOP deck outer: bottom padding only
        ════════════════════════════════════════════ */
        .sw-deck-outer {
          padding-bottom: clamp(96px, 12vw, 160px);
        }

        /* ════════════════════════════════════════════
           MOBILE: 3D Overlap-Deck
           Each card is a full-height poster; they are
           stacked via GSAP absolute positioning.
        ════════════════════════════════════════════ */
        @media (max-width: 767px) {
          /* Deck wrapper fills the viewport so it pins cleanly */
          .sw-deck-outer {
            padding: 0;
            height: 100svh;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .sw-deck-outer > .tf-inner {
            width: 100%;
          }

          /* Grid becomes a stacking context — height set by GSAP */
          .sw-grid {
            grid-template-columns: 1fr;
            gap: 0;
            position: relative;
          }

          /* Cards: absolute, poster portrait — GSAP sets position/size */
          .sw-card-wrap {
            /* base styles; GSAP applies position:absolute, height */
            border-radius: var(--r-xl) !important;
            overflow: hidden;
          }

          /* Poster layout: image fills card, text overlays bottom */
          .sw-article {
            position: relative;
            flex-direction: row !important; /* allow absolute children */
            width: 100%;
            height: 100%;
            border-radius: var(--r-xl);
            box-shadow: 0 18px 48px rgba(16,10,6,0.28);
          }
          .sw-img-outer {
            position: absolute !important;
            inset: 0 !important;
            aspect-ratio: unset !important;
          }
          .sw-mob-gradient { display: block !important; }

          .sw-content-wrap {
            position: absolute !important;
            bottom: 0; left: 0; right: 0;
            padding: 28px 22px 26px;
            flex: unset !important;
            background: transparent;
            z-index: 2;
          }

          /* Text on dark gradient */
          .sw-mob-title { color: var(--paper-0) !important; }
          .sw-mob-body  { color: rgba(253,251,247,0.78) !important; }
          .sw-mob-cta   {
            color: var(--paper-0) !important;
            border-bottom-color: rgba(253,251,247,0.4) !important;
          }

          /* Card depth indicator: shadow layers for stacked-card feel */
          .sw-card-wrap:nth-child(2) .sw-article {
            box-shadow: 0 14px 38px rgba(16,10,6,0.22);
          }
          .sw-card-wrap:nth-child(3) .sw-article {
            box-shadow: 0 10px 28px rgba(16,10,6,0.16);
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="sw-section"
        aria-label="Unsere Leistungswelten"
        style={{
          background: "var(--paper-100)",
          paddingTop: "clamp(96px, 12vw, 160px)",
        }}
      >
        {/* ── Header (separate, stays above the pinned deck) ── */}
        <div className="tf-inner">
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 80px)" }}>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
              letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
              color: "var(--rust-600)", marginBottom: "16px",
            }}>
              Strukturierter Luxus
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontSize: "var(--fs-h2)",
              lineHeight: "var(--lh-head)", letterSpacing: "0.01em",
              color: "var(--ink-900)", maxWidth: "22ch", margin: "0 auto",
            }}>
              Drei Welten. Ein Anspruch.
            </h2>
          </div>
        </div>

        {/* ── Deck wrapper — pinned on mobile ── */}
        <div ref={deckWrapRef} className="sw-deck-outer">
          <div className="tf-inner">
            <div ref={gridRef} className="sw-grid">
              {SERVICES.map((s, i) => (
                <div key={s.title} ref={cardRefs[i]} className="sw-card-wrap">
                  <article className="sw-article">

                    {/* Image */}
                    <div className="sw-img-outer">
                      <div className="sw-img-inner">
                        <Image
                          src={s.img} alt={s.imgAlt} fill
                          sizes="(max-width: 767px) 100vw, 34vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Desktop accent overlay */}
                      <div aria-hidden="true" style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        background: `linear-gradient(to bottom, transparent 38%, rgba(${s.accentRgb},0.18) 100%)`,
                        pointerEvents: "none",
                      }} />

                      {/* Mobile dark gradient */}
                      <div className="sw-mob-gradient" aria-hidden="true" />

                      {/* Kicker badge */}
                      <div style={{
                        position: "absolute", top: 14, left: 14, zIndex: 2,
                        background: "rgba(253,251,247,0.93)", backdropFilter: "blur(10px)",
                        borderRadius: "var(--r-pill)", padding: "5px 14px",
                        border: "1px solid var(--paper-300)",
                      }}>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: "9px",
                          letterSpacing: "0.2em", textTransform: "uppercase", color: s.accent,
                        }}>
                          {s.kicker}
                        </span>
                      </div>

                      {/* Icon */}
                      <div style={{
                        position: "absolute", bottom: 14, right: 14, zIndex: 2,
                        width: 40, height: 40, borderRadius: "var(--r-sm)",
                        background: "rgba(253,251,247,0.92)", backdropFilter: "blur(8px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: s.accent, boxShadow: "var(--shadow-sm)",
                      }}>
                        <s.Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="sw-content-wrap">
                      <h3 className="sw-mob-title" style={{
                        fontFamily: "var(--font-serif)", fontSize: "var(--fs-h3)",
                        lineHeight: "var(--lh-tight)", letterSpacing: "0.01em",
                        color: "var(--ink-900)", marginBottom: "14px",
                      }}>
                        {s.title}
                      </h3>
                      <p className="sw-mob-body" style={{
                        fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)",
                        lineHeight: "var(--lh-body)", color: "var(--ink-500)",
                        flex: 1, marginBottom: "20px",
                      }}>
                        {s.body}
                      </p>
                      <Link
                        href={s.href}
                        aria-label={`${s.cta} — a_trendfleurs by Anni`}
                        className="sw-mob-cta"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                          letterSpacing: "0.13em", textTransform: "uppercase",
                          color: s.accent, borderBottom: `1px solid ${s.accent}44`,
                          paddingBottom: "2px", alignSelf: "flex-start",
                        }}
                      >
                        {s.cta}
                        <span className="sw-arrow" aria-hidden="true">
                          <ArrowRight size={13} strokeWidth={1.8} />
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
