"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShopifyImage } from "@/lib/shopify";
import { shopifyImageSrc } from "@/lib/shopify";

interface Props {
  images: ShopifyImage[];
  fallbackSrc?: string;
  alt: string;
  badge?: string | null;
  priority?: boolean;
}

export default function ImageGallery({ images, fallbackSrc, alt, badge, priority }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIdx(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // No Shopify images — render a simple fallback image (no carousel chrome)
  if (images.length === 0) {
    return (
      <div style={{
        position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden",
        background: "var(--paper-100)", height: "clamp(280px, 45vw, 500px)",
      }}>
        {fallbackSrc
          ? <Image src={fallbackSrc} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "contain" }} priority={priority} />
          : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-300)", letterSpacing: "0.14em" }}>KEIN BILD</span>
            </div>
        }
        {badge && <Badge label={badge} />}
      </div>
    );
  }

  const showNav = images.length > 1;

  return (
    <div>
      {/* ── Main carousel ── */}
      <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden" }}>
        <div ref={emblaRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex" }}>
            {images.map((img, i) => (
              <div key={i} style={{
                flex: "0 0 100%", minWidth: 0, position: "relative",
                height: "clamp(280px, 45vw, 500px)", background: "var(--paper-100)",
              }}>
                <Image
                  src={shopifyImageSrc(img.url, 1000)}
                  alt={img.altText || alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                  priority={priority && i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        {showNav && (
          <>
            <button
              onClick={scrollPrev}
              aria-label="Vorheriges Bild"
              style={{
                position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer",
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)", color: "var(--ink-900)",
                opacity: activeIdx === 0 ? 0.3 : 1, transition: "opacity 150ms",
              }}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Nächstes Bild"
              style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer",
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)", color: "var(--ink-900)",
                opacity: activeIdx === images.length - 1 ? 0.3 : 1, transition: "opacity 150ms",
              }}
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </>
        )}

        {/* Dot indicators — visible on mobile, hidden on desktop (thumbnails take over) */}
        {showNav && (
          <div className="gallery-dots" style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Bild ${i + 1}`}
                style={{
                  width: i === activeIdx ? 18 : 8, height: 8, borderRadius: "var(--r-pill)",
                  border: "none", cursor: "pointer", transition: "all 200ms",
                  background: i === activeIdx ? "white" : "rgba(255,255,255,0.45)",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}

        {badge && <Badge label={badge} />}
      </div>

      {/* ── Thumbnail strip (desktop: always visible; mobile: hidden, dots used instead) ── */}
      {showNav && (
        <div
          className="gallery-thumbs"
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "10px",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "none",
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              style={{
                flexShrink: 0, width: 62, height: 62,
                position: "relative", overflow: "hidden",
                borderRadius: "var(--r-md)", background: "var(--paper-100)",
                border: `2px solid ${i === activeIdx ? "var(--charcoal)" : "var(--paper-200)"}`,
                padding: 0, cursor: "pointer", transition: "border-color 150ms",
              }}
            >
              <Image
                src={shopifyImageSrc(img.url, 120)}
                alt={img.altText || `${alt} ${i + 1}`}
                fill
                sizes="62px"
                style={{ objectFit: "contain" }}
              />
            </button>
          ))}
        </div>
      )}

      <style>{`
        /* On mobile: show dots, hide thumbnail strip */
        @media (max-width: 519px) {
          .gallery-thumbs { display: none !important; }
          .gallery-dots   { display: flex !important; }
        }
        /* On desktop: hide dots, show thumbnails */
        @media (min-width: 520px) {
          .gallery-dots   { display: none !important; }
          .gallery-thumbs { display: flex !important; }
        }
        .gallery-thumbs::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span style={{
      position: "absolute", top: 16, left: 16,
      fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em",
      textTransform: "uppercase", padding: "5px 12px",
      background: "var(--rust-500)", color: "var(--on-rust)", borderRadius: "var(--r-pill)",
      pointerEvents: "none",
    }}>
      {label}
    </span>
  );
}
