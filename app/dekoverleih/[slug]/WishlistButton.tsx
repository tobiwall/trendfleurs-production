"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import type { ShopifyVariant } from "@/lib/shopify";

interface Props {
  id: string;
  name: string;
  price: string;
  unit: string;
  seed: number;
  imageUrl?: string;
  variants?: ShopifyVariant[];
}

function fmtVariantPrice(amount: string): string {
  const n = parseFloat(amount);
  if (isNaN(n)) return '–';
  return `ab ${n % 1 === 0 ? String(n) : n.toFixed(2).replace('.', ',')} €`;
}

export default function WishlistButton({ id, name, price, unit, seed, imageUrl, variants = [] }: Props) {
  const { addToWish, wishlist } = useStore();
  const [added, setAdded] = useState(false);

  const real = variants.filter(v => v.title !== 'Default Title');
  const [selVariantId, setSelVariantId] = useState<string>(real[0]?.id ?? '');

  const selVariant = real.find(v => v.id === selVariantId) ?? real[0];
  const wishId  = selVariant ? `${id}::${selVariant.id}` : id;
  const isInWish = wishlist.some(w => w.id === wishId || w.id === id);

  function handleClick() {
    const finalId    = selVariant ? `${id}::${selVariant.id}` : id;
    const finalName  = selVariant ? `${name} — ${selVariant.title}` : name;
    const finalPrice = selVariant ? fmtVariantPrice(selVariant.price.amount) : price;
    addToWish({ id: finalId, name: finalName, price: finalPrice, unit, seed, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Variant selector */}
      {real.length > 1 && (
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-500)", marginBottom: "8px" }}>
            Variante wählen
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {real.map(v => (
              <button
                key={v.id}
                disabled={!v.availableForSale}
                onClick={() => setSelVariantId(v.id)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem", padding: "8px 16px",
                  borderRadius: "var(--r-pill)", cursor: v.availableForSale ? "pointer" : "not-allowed",
                  border: `1px solid ${selVariantId === v.id ? "var(--charcoal)" : "var(--paper-300)"}`,
                  background: selVariantId === v.id ? "var(--charcoal)" : "transparent",
                  color: selVariantId === v.id ? "var(--on-charcoal)" : v.availableForSale ? "var(--ink-800)" : "var(--ink-300)",
                  opacity: v.availableForSale ? 1 : 0.5, transition: "all 140ms",
                }}
              >
                {v.title}
                {!v.availableForSale && <span style={{ marginLeft: "6px", fontSize: "0.75em" }}>(vergriffen)</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          background: isInWish ? "var(--rust-50)" : "var(--paper-0)",
          color: isInWish ? "var(--rust-600)" : "var(--ink-900)",
          padding: "13px 24px", borderRadius: "var(--r-pill)",
          border: `1px solid ${isInWish ? "var(--rust-300)" : "var(--ink-900)"}`,
          cursor: "pointer", minHeight: "48px", transition: "all 220ms",
        }}
      >
        <Heart size={16} strokeWidth={1.8} fill={isInWish ? "currentColor" : "none"} />
        {added ? "Hinzugefügt!" : isInWish ? "Auf Wunschliste" : "Zur Wunschliste"}
      </button>
    </div>
  );
}
