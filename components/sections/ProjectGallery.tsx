"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const ROW_1 = [
  { img: "/projekte/01.webp", title: "Freie Trauung im Grünen" },
  { img: "/projekte/02.webp", title: "Fine-Art Table Setting" },
  { img: "/projekte/03.webp", title: "Brautstrauß in Blush & Nude" },
  { img: "/projekte/04.webp", title: "Goldener Hoop · Boho" },
  { img: "/projekte/05.webp", title: "Personalisiertes Willkommensbild" },
  { img: "/projekte/06.webp", title: "Florale Trauungsinsel" },
  { img: "/projekte/07.webp", title: "Candlelight Dinner Deko" },
  { img: "/projekte/08.webp", title: "Festlicher Empfang" },
  { img: "/projekte/09.webp", title: "Romantischer Traubogen" },
  { img: "/projekte/10.webp", title: "JGA Deko-Highlight" },
] as const;

const ROW_2 = [
  { img: "/projekte/11.webp", title: "Edles Fine-Art Tafel Setup" },
  { img: "/projekte/12.webp", title: "Boho-Lounge am See" },
  { img: "/projekte/13.webp", title: "Pampas & Protea Gesteck" },
  { img: "/projekte/14.webp", title: "Kerzen & Florals" },
  { img: "/projekte/15.webp", title: "Personalisierte Gravur" },
  { img: "/projekte/16.webp", title: "Elegante Hochzeitsfloristik" },
  { img: "/projekte/17.webp", title: "Kreativer Workshop" },
  { img: "/projekte/18.webp", title: "Herbstliche Tischdeko" },
  { img: "/projekte/19.webp", title: "Pampas & Goldene Hoops" },
  { img: "/projekte/20.webp", title: "Besonderer Moment" },
] as const;

export default function ProjectGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 24, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes pg-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pg-rtl {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* ── Row container ── */
        .pg-row {
          overflow: hidden;
          /* Fade-out edges for cinematic feel */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%, black 5%, black 95%, transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%, black 5%, black 95%, transparent 100%
          );
        }

        /* ── Tracks ── */
        .pg-track {
          display: flex;
          width: max-content;
          gap: clamp(8px, 1.2vw, 14px);
          will-change: transform;
        }
        .pg-track-ltr { animation: pg-ltr 40s linear infinite; }
        .pg-track-rtl { animation: pg-rtl 36s linear infinite; }

        /* Pause on hover */
        .pg-row:hover > .pg-track { animation-play-state: paused; }

        /* ── Image tile ── */
        .pg-tile {
          position: relative;
          height: clamp(180px, 22vw, 300px);
          aspect-ratio: 3 / 4;
          border-radius: var(--r-lg);
          overflow: hidden;
          flex-shrink: 0;
          cursor: pointer;
        }
        .pg-tile-img {
          transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pg-tile:hover .pg-tile-img { transform: scale(1.07); }

        /* ── Hover overlay + title ── */
        .pg-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(14, 8, 4, 0.75) 0%,
            rgba(14, 8, 4, 0.18) 55%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 300ms ease;
          display: flex;
          align-items: flex-end;
          padding: clamp(10px, 1.4vw, 16px);
          pointer-events: none;
        }
        .pg-tile:hover .pg-tile-overlay { opacity: 1; }

        .pg-tile-title {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(0.7rem, 1.1vw, 0.88rem);
          color: var(--paper-0);
          line-height: 1.3;
          letter-spacing: 0.01em;
        }

        /* ── Mobile: smaller tiles, overlay always visible ── */
        @media (max-width: 767px) {
          .pg-tile {
            height: clamp(140px, 42vw, 190px);
          }
          .pg-tile-overlay {
            opacity: 1;
            background: linear-gradient(
              to top,
              rgba(14, 8, 4, 0.62) 0%,
              transparent 60%
            );
          }
          .pg-tile-title { font-size: 0.68rem; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="pg-section"
        aria-label="Projekte & Momente"
        style={{
          background: "var(--cream)",
          paddingTop: "var(--sp-section)",
          overflow: "hidden",
        }}
      >
        {/* ── Section header ── */}
        <div ref={headerRef} className="tf-inner" style={{
          paddingBottom: "clamp(28px, 4vw, 52px)",
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
            <Link
              href="/anfrage"
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

        {/* ── Row 1 — rechts nach links ── */}
        <div className="pg-row" style={{ marginBottom: "clamp(8px, 1.2vw, 14px)" }}>
          <div className="pg-track pg-track-ltr">
            {[...ROW_1, ...ROW_1].map((item, i) => (
              <div
                key={i}
                className="pg-tile"
                aria-hidden={i >= ROW_1.length ? "true" : undefined}
              >
                <Image
                  src={item.img}
                  alt={i < ROW_1.length ? item.title : ""}
                  fill
                  className="pg-tile-img"
                  sizes="(max-width: 767px) 42vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="pg-tile-overlay" aria-hidden="true">
                  <span className="pg-tile-title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2 — links nach rechts ── */}
        <div className="pg-row" style={{ paddingBottom: "var(--sp-section)" }}>
          <div className="pg-track pg-track-rtl">
            {[...ROW_2, ...ROW_2].map((item, i) => (
              <div
                key={i}
                className="pg-tile"
                aria-hidden={i >= ROW_2.length ? "true" : undefined}
              >
                <Image
                  src={item.img}
                  alt={i < ROW_2.length ? item.title : ""}
                  fill
                  className="pg-tile-img"
                  sizes="(max-width: 767px) 42vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="pg-tile-overlay" aria-hidden="true">
                  <span className="pg-tile-title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
