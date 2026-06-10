"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";

interface Props {
  id: string;
  name: string;
  price: string;
  unit: string;
  seed: number;
}

export default function WishlistButton({ id, name, price, unit, seed }: Props) {
  const { addToWish, wishlist } = useStore();
  const [added, setAdded] = useState(false);
  const isInWish = wishlist.some((w) => w.id === id);

  function handleClick() {
    addToWish({ id, name, price, unit, seed });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
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
        cursor: "pointer", minHeight: "48px",
        transition: "all 220ms",
      }}
    >
      <Heart size={16} strokeWidth={1.8} fill={isInWish ? "currentColor" : "none"} />
      {added ? "Hinzugefügt!" : isInWish ? "Auf Wunschliste" : "Zur Wunschliste"}
    </button>
  );
}
