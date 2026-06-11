"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const HEADLINE: Array<{ text: string; break?: true }> = [
  { text: "Floristik," },
  { text: "die" },
  { text: "Geschichten", break: true },
  { text: "erzählt." },
];

export default function StorySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgWrapRef  = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const kickerRef   = useRef<HTMLParagraphElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const textColRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ══════════════════════════════════════════
         DESKTOP: existing 3D lamella + parallax
      ══════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        const scrollTrig = {
          trigger: sectionRef.current,
          start: "top 76%",
          once: true,
        };

        gsap.from(kickerRef.current, {
          opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
          scrollTrigger: scrollTrig,
        });

        gsap.set(sectionRef.current!.querySelectorAll(".story-word"), {
          transformPerspective: 700,
          transformOrigin: "50% 0%",
        });
        gsap.from(sectionRef.current!.querySelectorAll(".story-word"), {
          rotateX: -90, opacity: 0, y: 8,
          stagger: 0.085, duration: 0.95, ease: "power4.out",
          scrollTrigger: scrollTrig,
        });

        gsap.from(bodyRef.current!.children, {
          opacity: 0, y: 22, stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { ...scrollTrig, start: "top 70%" },
        });

        gsap.fromTo(
          imgRef.current,
          { yPercent: -5 },
          {
            yPercent: 7, ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom", end: "bottom top", scrub: 0.9,
            },
          }
        );
      });

      /* ══════════════════════════════════════════
         MOBILE: Full-Screen Parallax — text flies
         toward viewer on the Z axis
      ══════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        const section = sectionRef.current!;
        const st = { trigger: section, start: "top 82%", once: true };

        /* Background parallax — stronger on mobile for drama */
        gsap.fromTo(imgRef.current,
          { yPercent: -10 },
          {
            yPercent: 10, ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom", end: "bottom top", scrub: 0.7,
            },
          }
        );

        /* Kicker drifts up */
        gsap.from(kickerRef.current, {
          opacity: 0, y: 22, duration: 0.9, ease: "power4.out",
          scrollTrigger: st,
        });

        /* Words: Z-axis scale fly-through — each word zooms in
           from "far away" (small) to full size, staggered */
        gsap.set(section.querySelectorAll(".story-word"), {
          transformPerspective: 520,
          transformOrigin: "50% 50%",
        });
        gsap.from(section.querySelectorAll(".story-word"), {
          scale: 0.42,
          opacity: 0,
          y: 10,
          stagger: 0.075,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { ...st, start: "top 86%" },
        });

        /* Body block: line-by-line drift up */
        gsap.from(bodyRef.current!.children, {
          opacity: 0, y: 24,
          stagger: 0.09, duration: 0.95, ease: "power4.out",
          scrollTrigger: { ...st, start: "top 78%" },
        });

        return () => {
          gsap.set(section.querySelectorAll(".story-word"), { clearProps: "all" });
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Two-column desktop grid ── */
        .story-section {
          position: relative;
          background: var(--cream);
          padding: var(--sp-section) 0;
          overflow: hidden;
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 6vw, 96px);
          align-items: center;
        }

        /* ── Lamella-word clip ── */
        .story-word-clip {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          margin-right: 0.22em;
        }
        .story-word {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ── Desktop background wash ── */
        .story-desk-wash {
          position: absolute; top: 0; right: 0;
          width: 42%; height: 100%;
          background: linear-gradient(to left, var(--paper-100), transparent);
          pointer-events: none;
        }

        /* ── Mobile overlay (dark gradient, hidden on desktop) ── */
        .story-mob-gradient {
          display: none;
        }

        /* ══════════════════════════════════════════
           MOBILE: Full-Screen Parallax Layout
        ══════════════════════════════════════════ */
        @media (max-width: 767px) {
          .story-section {
            padding: 0 !important;
            min-height: 100svh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          .story-desk-wash { display: none; }

          /* Dark gradient for text legibility */
          .story-mob-gradient {
            display: block;
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(10,6,3,0.93) 0%,
              rgba(10,6,3,0.64) 36%,
              rgba(10,6,3,0.22) 62%,
              transparent 100%
            );
            z-index: 2;
            pointer-events: none;
          }

          .story-grid {
            display: block !important;
            gap: 0 !important;
          }

          /* Image: fill the entire section as background */
          .story-img-col {
            position: absolute !important;
            inset: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            aspect-ratio: unset !important;
            z-index: 1;
          }
          .story-img-col > div:first-child {
            inset: -15% 0 !important; /* extra tall for parallax travel */
          }

          /* Quote badge: hidden on mobile (text already over image) */
          .story-quote-badge { display: none !important; }

          /* Text column: sits above gradient, anchored to bottom */
          .story-text-col {
            position: relative;
            z-index: 3;
            padding: 0 var(--gutter) 72px;
          }

          /* Recolor for dark background */
          .story-kicker {
            color: var(--gold-300) !important;
            margin-bottom: 18px !important;
          }
          .story-headline {
            color: var(--paper-0) !important;
            font-size: clamp(2.4rem, 9.5vw, 3.5rem) !important;
            margin-bottom: 20px !important;
          }
          .story-body p {
            color: rgba(253,251,247,0.78) !important;
            max-width: none !important;
          }
          .story-body .story-tag {
            background: rgba(253,251,247,0.10) !important;
            color: var(--paper-0) !important;
            border-color: rgba(253,251,247,0.22) !important;
          }
          .story-body a {
            background: rgba(163,106,94,0.85) !important;
            backdrop-filter: blur(8px) !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="story-section"
        aria-label="Unsere Geschichte & Positionierung"
      >
        {/* Dark gradient (mobile-only) */}
        <div className="story-mob-gradient" aria-hidden="true" />

        {/* Desktop background wash */}
        <div className="story-desk-wash" aria-hidden="true" />

        <div className="tf-inner story-grid" style={{ position: "relative" }}>

          {/* ── Image column ── */}
          <div
            className="story-img-col"
            ref={imgWrapRef}
            style={{
              position: "relative",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              aspectRatio: "3/4",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div ref={imgRef} style={{ position: "absolute", inset: "-10% 0", willChange: "transform" }}>
              <Image
                src="/anni3.webp"
                alt="Anni bei der Arbeit — florale Gestaltung für eine Hochzeit"
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(26,14,8,0.42) 0%, transparent 52%)",
            }} />

            {/* Quote badge (hidden on mobile via CSS) */}
            <div className="story-quote-badge" style={{
              position: "absolute", bottom: 28, left: 20, right: 20,
              background: "rgba(253,251,247,0.93)",
              backdropFilter: "blur(14px)",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--paper-300)",
              padding: "16px 20px",
              boxShadow: "var(--shadow-md)",
            }}>
              <p style={{
                fontFamily: "var(--font-script)", fontSize: "1.4rem",
                color: "var(--rust-600)", lineHeight: 1.2, marginBottom: "6px",
              }}>
                „Jedes Detail erzählt eure Geschichte."
              </p>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-400)",
              }}>
                — Anni, Inhaberin a_trendfleurs
              </p>
            </div>
          </div>

          {/* ── Text column ── */}
          <div className="story-text-col" ref={textColRef}>
            <p
              ref={kickerRef}
              className="story-kicker"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "var(--fs-kicker)",
                letterSpacing: "var(--track-kicker)", textTransform: "uppercase",
                color: "var(--rust-600)", marginBottom: "20px",
              }}
            >
              Warum a_trendfleurs?
            </p>

            {/* 3D Lamella / Z-Fly headline */}
            <h2
              className="story-headline"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--fs-h1)",
                lineHeight: 1.12,
                letterSpacing: "var(--track-tight)",
                color: "var(--ink-900)",
                marginBottom: "28px",
              }}
            >
              {HEADLINE.map((item, i) => (
                <span key={i}>
                  <span className="story-word-clip">
                    <span className="story-word">{item.text}</span>
                  </span>
                  {item.break && <br />}
                </span>
              ))}
            </h2>

            <div ref={bodyRef} className="story-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
                lineHeight: "var(--lh-body)", color: "var(--ink-500)", maxWidth: "46ch",
              }}>
                Ich glaube, dass die schönsten Momente entstehen, wenn jemand
                wirklich zuhört. Kein Template, kein Baukastensystem — nur deine
                Geschichte, in Blumen, Licht und Atmosphäre verwandelt.
              </p>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)",
                lineHeight: "var(--lh-body)", color: "var(--ink-500)", maxWidth: "46ch",
              }}>
                Als gelernte Floristin plane und gestalte ich jede Hochzeit und
                jeden Event persönlich — von der ersten Idee bis zum letzten
                Blütenblatt.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "4px" }}>
                {["100+ Hochzeiten", "Gelernte Floristin", "Alles aus einer Hand", "Westerwald & NRW"].map((tag) => (
                  <span key={tag} className="story-tag" style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "6px 14px", borderRadius: "var(--r-pill)",
                    background: "var(--rust-50)", color: "var(--rust-600)",
                    border: "1px solid var(--rust-100)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ paddingTop: "8px" }}>
                <Link
                  href="/ueber-uns"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--paper-0)", background: "var(--rust-500)",
                    padding: "14px 28px", borderRadius: "var(--r-pill)",
                    boxShadow: "0 6px 24px rgba(163,106,94,0.28)",
                    transition: "background 220ms, box-shadow 220ms, gap 180ms",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--rust-600)";
                    el.style.boxShadow = "0 8px 32px rgba(163,106,94,0.38)";
                    el.style.gap = "16px";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--rust-500)";
                    el.style.boxShadow = "0 6px 24px rgba(163,106,94,0.28)";
                    el.style.gap = "10px";
                  }}
                >
                  Meine Geschichte <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
