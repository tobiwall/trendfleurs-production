"use client";

import { useRouter } from "next/navigation";
import { DecorPage } from "@/app/components/trendfleurs/Catalog";
import { useStore } from "@/lib/store";
import type { DecorItem } from "@/app/components/trendfleurs/data";

export default function DecorCatalogClient() {
  const router = useRouter();
  const { addToWish } = useStore();

  function go(page: string, ctx?: { kind: "decor" | "shop"; id: string }) {
    if (page === "product" && ctx?.kind === "decor") {
      router.push(`/dekoverleih/${ctx.id}`);
    } else if (page === "contact") {
      router.push("/anfrage");
    }
  }

  function handleWish(item: DecorItem) {
    addToWish({ id: item.id, name: item.name, price: item.price, unit: item.unit, seed: item.seed });
  }

  return <DecorPage go={go} addToWishlist={handleWish} />;
}
