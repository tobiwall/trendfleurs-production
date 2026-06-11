import nodemailer from "nodemailer";

export interface WishlistEmailBody {
  items: Array<{ name: string; price: string; unit?: string; qty: number }>;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
}

function buildHtml(body: WishlistEmailBody): string {
  const itemsHtml = body.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #F1E9DD;font-family:Georgia,serif;font-size:15px;color:#3A352F;">
            ${i.qty}×&nbsp; ${i.name}
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #F1E9DD;font-family:monospace;font-size:12px;color:#6F665C;white-space:nowrap;">
            ${i.price}${i.unit ?? ""}
          </td>
        </tr>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Neue Wunschzettel-Anfrage</title></head>
<body style="margin:0;padding:0;background:#FDFBF7;font-family:sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(60,42,30,.10);">
    <div style="background:#A36A5E;padding:28px 32px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(253,251,247,.75);">a_trendfleurs by Anni</p>
      <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-weight:400;font-size:26px;color:#FFFFFF;">Neue Wunschzettel-Anfrage</h1>
    </div>
    <div style="padding:28px 32px;">
      <h2 style="font-family:Georgia,serif;font-weight:400;font-size:18px;color:#1A1A1A;margin:0 0 16px;">Gewünschte Artikel</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr style="background:#F8F3EB;">
            <th style="text-align:left;padding:8px 12px;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6F665C;">Artikel</th>
            <th style="text-align:left;padding:8px 12px;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6F665C;">Preis</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <h2 style="font-family:Georgia,serif;font-weight:400;font-size:18px;color:#1A1A1A;margin:0 0 16px;">Kontaktdaten</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Name", body.name],
          ["E-Mail", body.email],
          ["Telefon", body.phone],
          ["Event-Datum", body.eventDate],
        ]
          .map(
            ([label, val]) => `<tr>
              <td style="padding:8px 0;font-family:monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#938878;width:110px;vertical-align:top;">${label}</td>
              <td style="padding:8px 0;font-family:sans-serif;font-size:15px;color:#3A352F;">${val || "–"}</td>
            </tr>`
          )
          .join("\n")}
      </table>
    </div>
    <div style="background:#F8F3EB;padding:18px 32px;text-align:center;">
      <p style="margin:0;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#938878;">a_trendfleurs.de · Anfrage über Wunschzettel</p>
    </div>
  </div>
</body>
</html>`;
}

function buildText(body: WishlistEmailBody): string {
  const items = body.items
    .map((i) => `  ${i.qty}× ${i.name} (${i.price}${i.unit ?? ""})`)
    .join("\n");
  return [
    "=== Neue Wunschzettel-Anfrage — a_trendfleurs ===",
    "",
    "ARTIKEL:",
    items,
    "",
    "KONTAKTDATEN:",
    `  Name:        ${body.name}`,
    `  E-Mail:      ${body.email}`,
    `  Telefon:     ${body.phone}`,
    `  Event-Datum: ${body.eventDate}`,
  ].join("\n");
}

export async function POST(request: Request): Promise<Response> {
  let body: WishlistEmailBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (!body.items?.length || !body.email) {
    return Response.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail  = process.env.WISHLIST_TO_EMAIL ?? "info@wallwideweb.de";

  if (!smtpUser || !smtpPass) {
    /* SMTP not yet configured — log and return success so the UX stays clean */
    console.log("[wishlist-email] SMTP not configured. Body:", JSON.stringify(body, null, 2));
    return Response.json({ success: true, dev: true });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `"a_trendfleurs Wunschzettel" <${smtpUser}>`,
      to: toEmail,
      replyTo: body.email,
      subject: `Wunschzettel-Anfrage von ${body.name} — ${body.eventDate}`,
      text: buildText(body),
      html: buildHtml(body),
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error("[wishlist-email] sendMail error:", err);
    return Response.json({ error: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
  }
}
