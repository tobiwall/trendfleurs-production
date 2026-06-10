"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star } from "lucide-react";

const PROJECTS = [
  {
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    alt: "Romantische Hochzeit im Westerwald — Tafeldekoration mit Blumen",
    label: "Hochzeit im Westerwald",
    tag: "Full-Service",
    accent: "var(--rust-500)",
  },
  {
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    alt: "Elegante Hochzeitstafel mit Kerzenlicht und Blumen",
    label: "Boho-Dinner · Köln",
    tag: "Event-Floristik",
    accent: "var(--gold-500)",
  },
  {
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc81?auto=format&fit=crop&w=800&q=80",
    alt: "Florale Bogengestaltung für Hochzeiten",
    label: "Traubogen · Frankfurt",
    tag: "Floristik",
    accent: "var(--rust-500)",
  },
  {
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80",
    alt: "Goldener Hoop mit Pampas und Rosen",
    label: "Goldener Hoop · Hamm/Sieg",
    tag: "Dekoverleih",
    accent: "var(--gold-500)",
  },
  {
    img: "https://images.unsplash.com/photo-1544078751-58fed2b32c83?auto=format&fit=crop&w=800&q=80",
    alt: "Personalisiertes Willkommensschild für Hochzeit",
    label: "Personalisierung · NRW",
    tag: "Shop",
    accent: "var(--charcoal)",
  },
] as const;

const TESTIMONIALS = [
  {
    quote: "Anni hat unsere Vorstellung in etwas verwandelt, das weit über unsere Erwartungen hinausging. Jedes Detail hat gestimmt — absolut traumhaft.",
    author: "Laura & Markus",
    event: "Hochzeit · September 2024",
    bg: "var(--rust-50)",
    border: "var(--rust-100)",
    starColor: "var(--rust-400)",
  },
  {
    quote: "Professionell, herzlich und unglaublich kreativ. Wir hätten uns niemand besseres für unseren Tag vorstellen können.",
    author: "Sophie & Julian",
    event: "Hochzeit · Juni 2024",
    bg: "var(--gold-100)",
    border: "var(--gold-200)",
    starColor: "var(--gold-400)",
  },
  {
    quote: "Der Goldene Hoop war der absolute Hingucker. Lieferung und Aufbau liefen reibungslos — wir haben entspannt genossen.",
    author: "Melanie K.",
    event: "Dekoverleih · Juli 2024",
    bg: "var(--rust-50)",
    border: "var(--rust-100)",
    starColor: "var(--rust-400)",
  },
] as const;

/* Left column: images 0, 2, 4 | Right column: image 1, testimonial, image 3 */
const LEFT_ITEMS  = [PROJECTS[0], PROJECTS[2], PROJECTS[4]] as const;
const RIGHT_ITEMS = [
  { type: "photo",       data: PROJECTS[1] },
  { type: "testimonial", data: TESTIMONIALS[0] },
  { type: "photo",       data: PROJECTS[3] },
] as const;

export default function ProjectGallery() {
  const sectionRef    = useRef<HTMLElement>(null);
  const pinRef        = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  /* Mobile masonry */
  const mobMasonryRef = useRef<HTMLDivElement>(null);
  const rightColRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Header reveal (all sizes) ── */
      gsap.from(headerRef.current, {
        opacity: 0, y: 24, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });

      /* ══════════════════════════════════════════
         DESKTOP: GSAP-pinned horizontal scroll
      ══════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current!;
        const pin   = pinRef.current!;
        ScrollTrigger.refresh();

        gsap.to(track, {
          x: () => -(track.scrollWidth - pin.offsetWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${track.scrollWidth - pin.offsetWidth}`,
            pin: true, scrub: 1.15,
            anticipatePin: 1, invalidateOnRefresh: true,
          },
        });
        return () => gsap.set(track, { clearProps: "x" });
      });

      /* ══════════════════════════════════════════
         MOBILE: Cinematic Masonry Split-Schiene
         Left col scrolls normally; right col moves
         upward (counter-direction) via scrub.
         Each image tilts on the 3D X axis as it
         passes through the center of the screen.
      ══════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        const masonry   = mobMasonryRef.current!;
        const rightCol  = rightColRef.current!;

        /* Right column counter-scrolls upward */
        gsap.to(rightCol, {
          y: -110,
          ease: "none",
          scrollTrigger: {
            trigger: masonry,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        /* Per-image 3D tilt — responds to scroll speed/position */
        masonry.querySelectorAll<HTMLElement>(".pg-mob-tile").forEach((tile) => {
          const inRight = tile.closest(".pg-col-right") !== null;
          gsap.fromTo(tile,
            {
              rotateX:  inRight ? -5 : 5,
              rotateY:  inRight ?  3 : -3,
              transformPerspective: 650,
              transformOrigin: "50% 50%",
            },
            {
              rotateX:  inRight ?  5 : -5,
              rotateY:  inRight ? -3 :  3,
              ease: "none",
              scrollTrigger: {
                trigger: tile,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        return () => {
          gsap.set(rightCol, { clearProps: "y" });
          masonry.querySelectorAll<HTMLElement>(".pg-mob-tile")
            .forEach((t) => gsap.set(t, { clearProps: "all" }));
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .pg-section { overflow: hidden; }

        /* ── Desktop: pinned container ── */
        .pg-pin { height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
        .pg-track {
          display: flex; flex-direction: row; align-items: stretch;
          gap: clamp(14px, 1.8vw, 22px);
          padding: 0 var(--gutter);
          width: max-content; will-change: transform;
        }
        .pg-card { width: clamp(270px, 26vw, 360px); flex-shrink: 0; }
        .pg-card-tall { height: clamp(380px, 52vh, 520px); }
        .pg-img { transition: transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .pg-card:hover .pg-img { transform: scale(1.05); }

        /* ── Mobile masonry: hidden on desktop ── */
        .pg-mob-masonry { display: none; }

        /* ════════════════════════════════════════════
           MOBILE: Cinematic Masonry Split-Schiene
        ════════════════════════════════════════════ */
        @media (max-width: 767px) {
          /* Hide desktop horizontal scroll */
          .pg-pin { display: none !important; }

          /* Show mobile masonry */
          .pg-mob-masonry {
            display: block;
            padding: 0 var(--gutter) var(--sp-section);
          }

          /* Two-column grid, aligned at top */
          .pg-mob-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 9px;
            align-items: start;
          }

          /* Columns stack their items vertically */
          .pg-col-left, .pg-col-right {
            display: flex;
            flex-direction: column;
            gap: 9px;
            will-change: transform;
          }

          /* Right column starts lower for visual rhythm */
          .pg-col-right { margin-top: 36px; }

          /* Photo tile: frameless portrait, fine border line */
          .pg-mob-tile {
            position: relative;
            aspect-ratio: 2/3;
            overflow: hidden;
            border-radius: var(--r-sm);
            will-change: transform;
            /* Fine hairline divider instead of box-shadow */
            border: 1px solid rgba(215,196,183,0.35);
          }

          /* Photo gradient for label legibility */
          .pg-mob-tile::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(14,8,4,0.62) 0%,
              rgba(14,8,4,0.25) 38%,
              transparent 65%
            );
            z-index: 1;
            pointer-events: none;
          }

          .pg-mob-tile-label {
            position: absolute;
            bottom: 10px; left: 10px; right: 10px;
            z-index: 2;
          }

          /* Quote tile: warm card */
          .pg-mob-quote {
            border-radius: var(--r-sm);
            padding: 14px 14px 16px;
            border: 1px solid;
          }

          /* CTA block: full-width, below the columns */
          .pg-mob-cta {
            margin-top: 20px;
            border-radius: var(--r-lg);
            padding: clamp(22px, 4vw, 36px);
            background: var(--charcoal);
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="pg-section"
        aria-label="Projekte & Kundenstimmen"
        style={{ background: "var(--cream)" }}
      >
        {/* ── Section header ── */}
        <div ref={headerRef} className="tf-inner" style={{
          paddingTop: "var(--sp-section)",
          paddingBottom: "clamp(28px, 4vw, 48px)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "20px",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
                letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
                color: "var(--rust-600)", marginBottom: "12px",
              }}>
                Das „Wow"-Erlebnis
              </p>
              <h2 style={{
                fontFamily: "var(--font-serif)", fontSize: "var(--fs-h2)",
                lineHeight: "var(--lh-head)", letterSpacing: "var(--track-tight)",
                color: "var(--ink-900)",
              }}>
                Projekte & Momente
              </h2>
            </div>
            <Link href="/anfrage"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--rust-600)", borderBottom: "1px solid var(--rust-200)",
                paddingBottom: "2px", transition: "gap 200ms", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "14px"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "8px"; }}
            >
              Anfrage stellen <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            DESKTOP: pinned horizontal scroll
        ══════════════════════════════════════════════ */}
        <div ref={pinRef} className="pg-pin">
          <div className="pg-scroll-wrap">
            <div ref={trackRef} className="pg-track">
              {PROJECTS.map((p) => (
                <div key={p.label} className="pg-card">
                  <article className="pg-card-tall" style={{
                    position: "relative", borderRadius: "var(--r-xl)",
                    overflow: "hidden", boxShadow: "var(--shadow-md)", height: "100%",
                  }}>
                    <div className="pg-mob-photo" style={{ position: "absolute", inset: 0 }}>
                      <Image
                        src={p.img} alt={p.alt} className="pg-img"
                        fill sizes="(max-width: 767px) 100vw, 26vw"
                        style={{ objectFit: "cover", transformOrigin: "center" }}
                      />
                    </div>
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0, zIndex: 1,
                      background: "linear-gradient(to top, rgba(26,14,8,0.60) 0%, transparent 55%)",
                      pointerEvents: "none",
                    }} />
                    <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, zIndex: 2 }}>
                      <span style={{
                        display: "inline-block",
                        fontFamily: "var(--font-mono)", fontSize: "9px",
                        letterSpacing: "0.16em", textTransform: "uppercase",
                        color: "var(--paper-0)", background: p.accent,
                        padding: "4px 12px", borderRadius: "var(--r-pill)",
                        marginBottom: "7px", opacity: 0.92,
                      }}>
                        {p.tag}
                      </span>
                      <p style={{
                        fontFamily: "var(--font-serif)", fontSize: "1.1rem",
                        color: "var(--paper-0)", lineHeight: "var(--lh-tight)",
                      }}>
                        {p.label}
                      </p>
                    </div>
                  </article>
                </div>
              ))}

              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="pg-card" style={{ display: "flex", alignItems: "center" }}>
                  <article className="pg-testimonial" style={{
                    background: t.bg, borderRadius: "var(--r-xl)",
                    padding: "clamp(24px, 3vw, 44px)",
                    border: `1px solid ${t.border}`,
                    boxShadow: "var(--shadow-sm)", width: "100%",
                  }}>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={14} fill={t.starColor} color="transparent" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                      lineHeight: "var(--lh-body)", color: "var(--ink-700)",
                      fontStyle: "italic", marginBottom: "24px", letterSpacing: "0.01em",
                    }}>
                      „{t.quote}"
                    </blockquote>
                    <footer>
                      <p style={{
                        fontFamily: "var(--font-sans)", fontSize: "0.9rem",
                        fontWeight: 500, color: "var(--ink-900)", marginBottom: "3px",
                      }}>
                        {t.author}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "9px",
                        letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-400)",
                      }}>
                        {t.event}
                      </p>
                    </footer>
                  </article>
                </div>
              ))}

              <div className="pg-card" style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  background: "var(--charcoal)", borderRadius: "var(--r-xl)",
                  padding: "clamp(24px, 3vw, 44px)", width: "100%",
                  display: "flex", flexDirection: "column", gap: "18px",
                }}>
                  <p style={{ fontFamily: "var(--font-script)", fontSize: "2.1rem", color: "var(--gold-300)", lineHeight: 1.2 }}>
                    Euer Moment wartet.
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)", lineHeight: "var(--lh-body)", color: "var(--paper-300)" }}>
                    Bereit für ein unvergessliches Event? Lass uns gemeinsam eure Geschichte gestalten.
                  </p>
                  <Link href="/anfrage"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--charcoal)", background: "var(--gold-300)",
                      padding: "13px 24px", borderRadius: "var(--r-pill)",
                      alignSelf: "flex-start", transition: "background 200ms, gap 180ms",
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold-200)"; el.style.gap = "14px"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--gold-300)"; el.style.gap = "10px"; }}
                  >
                    Anfrage stellen <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div style={{ width: "var(--gutter)", flexShrink: 0 }} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MOBILE: Cinematic Masonry Split-Schiene
            Left column scrolls normally.
            Right column moves upward via GSAP scrub.
        ══════════════════════════════════════════════ */}
        <div ref={mobMasonryRef} className="pg-mob-masonry">
          <div className="pg-mob-cols">

            {/* Left column — static scroll */}
            <div className="pg-col-left">
              {LEFT_ITEMS.map((p) => (
                <div key={p.label} className="pg-mob-tile">
                  <Image
                    src={p.img} alt={p.alt} fill
                    sizes="45vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="pg-mob-tile-label">
                    <span style={{
                      display: "inline-block",
                      fontFamily: "var(--font-mono)", fontSize: "8px",
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "var(--paper-0)", background: p.accent,
                      padding: "3px 10px", borderRadius: "var(--r-pill)",
                      marginBottom: "4px", opacity: 0.9,
                    }}>
                      {p.tag}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-serif)", fontSize: "0.82rem",
                      color: "var(--paper-0)", lineHeight: 1.3,
                    }}>
                      {p.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column — scrolls counter-upward via GSAP */}
            <div ref={rightColRef} className="pg-col-right">
              {RIGHT_ITEMS.map((item, i) => {
                if (item.type === "photo") {
                  const p = item.data as typeof PROJECTS[number];
                  return (
                    <div key={p.label} className="pg-mob-tile">
                      <Image
                        src={p.img} alt={p.alt} fill
                        sizes="45vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="pg-mob-tile-label">
                        <span style={{
                          display: "inline-block",
                          fontFamily: "var(--font-mono)", fontSize: "8px",
                          letterSpacing: "0.18em", textTransform: "uppercase",
                          color: "var(--paper-0)", background: p.accent,
                          padding: "3px 10px", borderRadius: "var(--r-pill)",
                          marginBottom: "4px", opacity: 0.9,
                        }}>
                          {p.tag}
                        </span>
                        <p style={{
                          fontFamily: "var(--font-serif)", fontSize: "0.82rem",
                          color: "var(--paper-0)", lineHeight: 1.3,
                        }}>
                          {p.label}
                        </p>
                      </div>
                    </div>
                  );
                }
                const t = item.data as typeof TESTIMONIALS[number];
                return (
                  <div key={i} className="pg-mob-quote" style={{ background: t.bg, borderColor: t.border }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={11} fill={t.starColor} color="transparent" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "0.82rem",
                      lineHeight: 1.55,
                      color: "var(--ink-700)",
                      fontStyle: "italic",
                      marginBottom: "10px",
                    }}>
                      „{t.quote}"
                    </blockquote>
                    <p style={{
                      fontFamily: "var(--font-mono)", fontSize: "8px",
                      letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-500)",
                    }}>
                      {t.author}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full-width CTA */}
          <div className="pg-mob-cta">
            <p style={{
              fontFamily: "var(--font-script)", fontSize: "1.9rem",
              color: "var(--gold-300)", lineHeight: 1.2,
            }}>
              Euer Moment wartet.
            </p>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)",
              lineHeight: "var(--lh-body)", color: "var(--paper-300)",
            }}>
              Bereit für ein unvergessliches Event? Lass uns gemeinsam eure Geschichte gestalten.
            </p>
            <Link href="/anfrage"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--charcoal)", background: "var(--gold-300)",
                padding: "13px 24px", borderRadius: "var(--r-pill)",
                alignSelf: "flex-start",
              }}
            >
              Anfrage stellen <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div style={{ paddingBottom: "var(--sp-section)" }} aria-hidden="true" />
      </section>
    </>
  );
}
