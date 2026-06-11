export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

export interface ReviewsData {
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
}

// Module-level in-memory cache — persists across requests in the same process
let _cache: { data: ReviewsData; expires: number } | null = null;

export async function GET(): Promise<Response> {
  if (_cache && Date.now() < _cache.expires) {
    return Response.json(_cache.data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  }

  const apiKey  = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn("[reviews] GOOGLE_PLACES_API_KEY or NEXT_PUBLIC_GOOGLE_PLACE_ID not set");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any;
  try {
    const r = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${encodeURIComponent(placeId)}` +
        `&fields=reviews%2Crating%2Cuser_ratings_total` +
        `&key=${apiKey}` +
        `&language=de`,
      { cache: "no-store" }
    );
    if (!r.ok) {
      return Response.json({ error: "google_http_error" }, { status: 502 });
    }
    payload = await r.json();
  } catch (err) {
    console.error("[reviews] fetch error:", err);
    return Response.json({ error: "fetch_failed" }, { status: 502 });
  }

  if (payload.status !== "OK") {
    console.error("[reviews] Places API status:", payload.status, payload.error_message);
    return Response.json({ error: payload.status }, { status: 502 });
  }

  const data: ReviewsData = {
    rating:       payload.result?.rating              ?? 0,
    totalRatings: payload.result?.user_ratings_total  ?? 0,
    reviews:      (payload.result?.reviews ?? []).slice(0, 5),
  };

  _cache = { data, expires: Date.now() + 24 * 60 * 60 * 1000 };

  return Response.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
  });
}
