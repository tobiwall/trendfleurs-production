"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import type { ShopifyVariant } from "@/lib/shopify";

interface Props {
  id: string;
  name: string;
  priceRaw: number;
  seed: number;
  variants: ShopifyVariant[];
  isPersonalizable: boolean;
}

export default function AddToCartClient({ id, name, priceRaw, seed, variants, isPersonalizable }: Props) {
  const { addToCart } = useStore();
  const [added, setAdded]     = useState(false);
  const [text, setText]       = useState("");

  const real = variants.filter(v => v.title !== "Default Title");
  const [selVariantId, setSelVariantId] = useState(real[0]?.id ?? "");

  const selVariant = real.find(v => v.id === selVariantId) ?? real[0];
  const price = selVariant ? (parseFloat(selVariant.price.amount) || 0) : priceRaw;

  function handleAdd() {
    const finalId    = selVariant ? `${id}::${selVariant.id}` : id;
    const variantSfx = selVariant && real.length > 1 ? ` — ${selVariant.title}` : "";
    const persoSfx   = text.trim() ? ` (${text.trim()})` : "";
    addToCart({ id: finalId, name: `${name}${variantSfx}${persoSfx}`, price, seed });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* ── Variant selector ── */}
      {real.length > 1 && (
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-500)", marginBottom: "10px" }}>
            Variante wählen
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {real.map(v => (
              <button
                key={v.id}
                disabled={!v.availableForSale}
                onClick={() => setSelVariantId(v.id)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem", padding: "8px 18px",
                  borderRadius: "var(--r-pill)", cursor: v.availableForSale ? "pointer" : "not-allowed",
                  border: `1px solid ${selVariantId === v.id ? "var(--charcoal)" : "var(--paper-300)"}`,
                  background: selVariantId === v.id ? "var(--charcoal)" : "transparent",
                  color: selVariantId === v.id ? "var(--on-charcoal)" : v.availableForSale ? "var(--ink-800)" : "var(--ink-300)",
                  opacity: v.availableForSale ? 1 : 0.5, transition: "all 140ms",
                }}
              >
                {v.title}
                {!v.availableForSale && <span style={{ marginLeft: "5px", fontSize: "0.75em" }}>(vergriffen)</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Personalization textarea ── */}
      {isPersonalizable && (
        <div>
          <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-500)", marginBottom: "8px" }}>
            Personalisierungstext
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="z.B. Sophia & Max · 12. Juni 2026"
            maxLength={200}
            rows={3}
            style={{
              width: "100%", padding: "12px 14px", boxSizing: "border-box",
              fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-800)",
              background: "var(--paper-0)", border: "1px solid var(--paper-300)",
              borderRadius: "var(--r-md)", resize: "vertical", outline: "none", lineHeight: "1.5",
            }}
          />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-400)", marginTop: "4px", letterSpacing: "0.08em" }}>
            {text.length}/200 Zeichen
          </p>
        </div>
      )}

      {/* ── Add to cart ── */}
      <button
        onClick={handleAdd}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
          fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          padding: "14px 28px", borderRadius: "var(--r-pill)", minHeight: "50px",
          width: "100%", cursor: "pointer", transition: "all 220ms",
          background: added ? "var(--rust-50)" : "var(--charcoal)",
          color: added ? "var(--rust-600)" : "var(--on-charcoal)",
          border: added ? "1px solid var(--rust-300)" : "1px solid transparent",
        }}
      >
        {added
          ? <><Check size={16} strokeWidth={2.5} /> In den Warenkorb gelegt!</>
          : <><ShoppingBag size={16} strokeWidth={1.8} /> In den Warenkorb</>
        }
      </button>
    </div>
  );
}
