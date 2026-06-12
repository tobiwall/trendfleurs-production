"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { X, Minus, Plus, Trash2, Mail, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { imgSrc } from "@/app/components/trendfleurs/data";

/* ─── WhatsApp number — set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local ─── */
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "491787825994";

interface FormState {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function buildWhatsAppText(items: { name: string; price: string; unit?: string; qty: number }[], form: FormState): string {
  const list = items.map((i) => `• ${i.qty}× ${i.name} (${i.price}${i.price !== "Auf Anfrage" ? (i.unit ?? "") : ""})`).join("\n");
  return [
    "Hallo Anni! 🌸",
    "",
    "Ich möchte gerne folgende Artikel für mein Event anfragen:",
    "",
    list,
    "",
    `Event-Datum: ${form.eventDate || "noch offen"}`,
    `Name: ${form.name || "–"}`,
    `E-Mail: ${form.email || "–"}`,
    `Telefon: ${form.phone || "–"}`,
    "",
    "Ich freue mich über deine Rückmeldung! 🌿",
  ].join("\n");
}

export default function WishlistDrawer() {
  const { wishlist, wishDrawerOpen, closeWishDrawer, removeFromWishById, updateWishQty } = useStore();

  const drawerRef  = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", eventDate: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  /* ── Mount guard: keep component in DOM once it first renders ── */
  useEffect(() => { setMounted(true); }, []);

  /* ── Scroll lock ── */
  useEffect(() => {
    if (!wishDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [wishDrawerOpen]);

  /* ── GSAP open / close animations ── */
  useEffect(() => {
    if (!mounted || !drawerRef.current || !backdropRef.current) return;

    const isMob = window.matchMedia("(max-width: 767px)").matches;

    if (wishDrawerOpen) {
      /* Make visible before animating */
      gsap.set(drawerRef.current,  { display: "flex", pointerEvents: "all" });
      gsap.set(backdropRef.current, { display: "block", pointerEvents: "all" });

      if (isMob) {
        gsap.fromTo(drawerRef.current,  { y: "100%" }, { y: "0%", ease: "power4.out", duration: 0.48 });
      } else {
        gsap.fromTo(drawerRef.current,  { x: "100%" }, { x: "0%", ease: "power4.out", duration: 0.48 });
      }
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.32 });
    }
  }, [wishDrawerOpen, mounted]);

  const handleClose = useCallback(() => {
    if (!drawerRef.current || !backdropRef.current) { closeWishDrawer(); return; }
    const isMob = window.matchMedia("(max-width: 767px)").matches;
    const tl = gsap.timeline({ onComplete: () => {
      gsap.set(drawerRef.current,   { display: "none", pointerEvents: "none" });
      gsap.set(backdropRef.current, { display: "none", pointerEvents: "none" });
      closeWishDrawer();
    }});
    if (isMob) {
      tl.to(drawerRef.current,  { y: "100%", ease: "power3.in", duration: 0.36 }, 0);
    } else {
      tl.to(drawerRef.current,  { x: "100%", ease: "power3.in", duration: 0.36 }, 0);
    }
    tl.to(backdropRef.current, { opacity: 0, duration: 0.28 }, 0);
  }, [closeWishDrawer]);

  /* ── Email submit ── */
  const handleEmailSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/wishlist-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: wishlist, ...form }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }, [form, wishlist]);

  /* ── WhatsApp ── */
  const handleWhatsApp = useCallback(() => {
    const text = buildWhatsAppText(wishlist, form);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [wishlist, form]);

  const totalItems = wishlist.reduce((s, x) => s + x.qty, 0);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .wd-input {
          width: 100%;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--ink-900);
          background: var(--paper-0);
          border: 1px solid var(--paper-300);
          border-radius: var(--r-md);
          padding: 11px 14px;
          outline: none;
          transition: border-color 180ms;
          box-sizing: border-box;
        }
        .wd-input::placeholder { color: var(--ink-300); }
        .wd-input:focus { border-color: var(--rust-400); }

        .wd-qty-btn {
          width: 30px; height: 30px;
          border: 1px solid var(--paper-300);
          border-radius: var(--r-sm);
          background: var(--paper-0);
          color: var(--ink-700);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 150ms, color 150ms;
          flex-shrink: 0;
        }
        .wd-qty-btn:hover { background: var(--charcoal); color: var(--paper-0); border-color: var(--charcoal); }

        /* Mobile: slide from bottom */
        @media (max-width: 767px) {
          .wd-drawer {
            bottom: 0 !important; left: 0 !important; right: 0 !important;
            top: auto !important; width: 100% !important;
            height: 90svh !important; max-height: 90svh !important;
            border-radius: var(--r-xl) var(--r-xl) 0 0 !important;
          }
        }
        /* Desktop: slide from right */
        @media (min-width: 768px) {
          .wd-drawer {
            top: 0 !important; right: 0 !important; bottom: 0 !important;
            left: auto !important; width: 520px !important;
            height: 100svh !important; max-height: 100svh !important;
            border-radius: var(--r-xl) 0 0 var(--r-xl) !important;
          }
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        aria-hidden="true"
        style={{
          display: "none",
          position: "fixed", inset: 0,
          background: "rgba(16,10,6,0.52)",
          backdropFilter: "blur(3px)",
          zIndex: 8998,
          pointerEvents: "none",
        }}
      />

      {/* ── Drawer panel ── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Wunschzettel"
        className="wd-drawer"
        style={{
          display: "none",
          position: "fixed",
          zIndex: 8999,
          background: "var(--cream)",
          flexDirection: "column",
          pointerEvents: "none",
          boxShadow: "-8px 0 48px rgba(16,10,6,0.18), 0 -8px 48px rgba(16,10,6,0.18)",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {/* Drag handle (mobile visual) */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }} aria-hidden="true">
          <div style={{ width: 40, height: 4, borderRadius: 99, background: "var(--paper-400)" }} />
        </div>

        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px 14px",
          borderBottom: "1px solid var(--paper-200)",
          position: "sticky", top: 0,
          background: "var(--cream)", zIndex: 1,
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--rust-600)",
              marginBottom: "2px",
            }}>
              Dekoverleih
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)", fontSize: "1.35rem",
              fontWeight: 400, color: "var(--ink-900)", margin: 0,
            }}>
              Wunschzettel
              {totalItems > 0 && (
                <span style={{
                  marginLeft: "10px",
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--paper-0)", background: "var(--rust-500)",
                  padding: "3px 10px", borderRadius: "var(--r-pill)",
                  verticalAlign: "middle",
                }}>
                  {totalItems}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Wunschzettel schließen"
            style={{
              width: 40, height: 40, borderRadius: "var(--r-pill)",
              border: "1px solid var(--paper-300)", background: "var(--paper-0)",
              color: "var(--ink-700)", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              transition: "background 150ms, color 150ms",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--charcoal)"; el.style.color = "var(--paper-0)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "var(--paper-0)"; el.style.color = "var(--ink-700)"; }}
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        {/* ── Body (scrollable) ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 32px" }}>

          {/* Empty state */}
          {wishlist.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-script)", fontSize: "1.8rem", color: "var(--rust-300)", marginBottom: "10px" }}>
                Noch keine Artikel.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-small)", color: "var(--ink-400)", lineHeight: "var(--lh-body)" }}>
                Klicke auf das Herz-Symbol bei einem Artikel,<br />um ihn auf deinen Wunschzettel zu setzen.
              </p>
            </div>
          )}

          {/* Item list */}
          {wishlist.length > 0 && (
            <div style={{ padding: "0 20px" }}>
              {wishlist.map((item, i) => (
                <div key={item.id} style={{
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  padding: "16px 0",
                  borderBottom: i < wishlist.length - 1 ? "1px solid var(--paper-200)" : "none",
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    position: "relative", width: 64, height: 64,
                    borderRadius: "var(--r-sm)", overflow: "hidden", flexShrink: 0,
                    background: "var(--paper-200)",
                  }}>
                    <Image
                      src={item.imageUrl ?? imgSrc(item.seed, 128)}
                      alt={item.name}
                      fill
                      sizes="64px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "var(--font-serif)", fontSize: "1rem",
                      color: "var(--ink-900)", marginBottom: "3px",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-mono)", fontSize: "9px",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "var(--rust-500)", marginBottom: "10px",
                    }}>
                      {item.price}{item.price !== "Auf Anfrage" && item.unit}
                    </p>

                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        className="wd-qty-btn"
                        onClick={() => updateWishQty(item.id, -1)}
                        aria-label={`${item.name} — Menge verringern`}
                      >
                        <Minus size={12} strokeWidth={2} />
                      </button>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "13px",
                        fontWeight: 500, color: "var(--ink-900)",
                        minWidth: "20px", textAlign: "center",
                      }}>
                        {item.qty}
                      </span>
                      <button
                        className="wd-qty-btn"
                        onClick={() => updateWishQty(item.id, +1)}
                        aria-label={`${item.name} — Menge erhöhen`}
                      >
                        <Plus size={12} strokeWidth={2} />
                      </button>

                      <button
                        onClick={() => removeFromWishById(item.id)}
                        aria-label={`${item.name} entfernen`}
                        style={{
                          marginLeft: "auto", width: 30, height: 30,
                          border: "none", background: "transparent",
                          color: "var(--ink-300)", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: "var(--r-sm)",
                          transition: "color 150ms, background 150ms",
                        }}
                        onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = "var(--rust-500)"; el.style.background = "var(--rust-50)"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = "var(--ink-300)"; el.style.background = "transparent"; }}
                      >
                        <Trash2 size={14} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Request form ── */}
          {wishlist.length > 0 && (
            <form onSubmit={handleEmailSubmit} style={{ padding: "20px 20px 0" }}>
              <div style={{
                height: 1, background: "var(--paper-300)",
                margin: "4px 0 24px",
              }} />
              <p style={{
                fontFamily: "var(--font-serif)", fontSize: "1.1rem",
                color: "var(--ink-900)", marginBottom: "16px",
              }}>
                Deine Anfrage
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {([
                  { key: "name",      label: "Name",        type: "text",  placeholder: "Dein Name", required: true  },
                  { key: "email",     label: "E-Mail",       type: "email", placeholder: "deine@email.de", required: true },
                  { key: "phone",     label: "Telefon",      type: "tel",   placeholder: "+49 …",     required: false },
                  { key: "eventDate", label: "Event-Datum",  type: "date",  placeholder: "",          required: false },
                ] as const).map(({ key, label, type, placeholder, required }) => (
                  <div key={key}>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-mono)", fontSize: "9px",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "var(--ink-400)", marginBottom: "5px",
                    }}>
                      {label}{required && <span style={{ color: "var(--rust-500)" }}> *</span>}
                    </label>
                    <input
                      className="wd-input"
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      required={required}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div style={{
                  marginTop: "14px", padding: "12px 14px",
                  background: "var(--rust-50)", border: "1px solid var(--rust-100)",
                  borderRadius: "var(--r-md)",
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--rust-700)",
                }}>
                  ✓ Anfrage gesendet — Anni meldet sich bei dir!
                </div>
              )}
              {status === "error" && (
                <div style={{
                  marginTop: "14px", padding: "12px 14px",
                  background: "var(--paper-100)", border: "1px solid var(--paper-300)",
                  borderRadius: "var(--r-md)",
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-500)",
                }}>
                  Ups — bitte versuche es nochmal oder nutze WhatsApp.
                </div>
              )}

              {/* ── Submit buttons ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.13em", textTransform: "uppercase",
                    color: "var(--paper-0)", background: status === "success" ? "var(--rust-300)" : "var(--rust-500)",
                    padding: "14px 24px", borderRadius: "var(--r-pill)",
                    border: "none", cursor: status === "loading" ? "wait" : "pointer",
                    boxShadow: "0 6px 24px rgba(163,106,94,0.28)",
                    transition: "background 200ms, box-shadow 200ms",
                    minHeight: 48,
                  }}
                  onMouseEnter={(e) => { if (status === "idle") (e.currentTarget as HTMLElement).style.background = "var(--rust-600)"; }}
                  onMouseLeave={(e) => { if (status === "idle") (e.currentTarget as HTMLElement).style.background = "var(--rust-500)"; }}
                >
                  <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
                  {status === "loading" ? "Sende …" : status === "success" ? "Gesendet ✓" : "Anfrage per E-Mail senden"}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
                    letterSpacing: "0.13em", textTransform: "uppercase",
                    color: "var(--ink-900)", background: "transparent",
                    padding: "13px 24px", borderRadius: "var(--r-pill)",
                    border: "1px solid var(--paper-400)", cursor: "pointer",
                    transition: "background 180ms, border-color 180ms",
                    minHeight: 48,
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#DCF7C5"; el.style.borderColor = "#85C67A"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.borderColor = "var(--paper-400)"; }}
                >
                  <MessageCircle size={15} strokeWidth={1.8} aria-hidden="true" />
                  Direkt via WhatsApp anfragen
                </button>
              </div>

              <p style={{
                marginTop: "14px", marginBottom: 0,
                fontFamily: "var(--font-mono)", fontSize: "8px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-300)", textAlign: "center",
              }}>
                Unverbindlich · keine Zahlung erforderlich
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
