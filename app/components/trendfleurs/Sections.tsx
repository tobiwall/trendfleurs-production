"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Kicker, Button, Reveal, Icon } from './primitives';
import { SERVICES, REGIONS, imgSrc } from './data';
import type { Page } from './data';

/* ─── RegionsSection ─── */
interface RegionsSectionProps { go: (p: Page) => void; }

export function RegionsSection({ go }: RegionsSectionProps) {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: 'var(--taupe)', padding: 'var(--sp-section) 0' }}>
      <div className="tf-inner">
        <div className="tf-grid-halves">
          {/* Text */}
          <div>
            <Reveal y={0}><Kicker color="var(--rust-700)">Vor Ort für dich</Kicker></Reveal>
            <Reveal delay={70}>
              <h2 style={{ marginTop: '14px' }}>Eventplanung & Dekoverleih in deiner Region</h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ marginTop: '18px', maxWidth: '44ch', color: 'var(--ink-700)' }}>
                Wir gestalten Hochzeiten und Events mit Herz — persönlich vor Ort. Wähle deine Region für lokale Verfügbarkeit, Anfahrt und Referenzen.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '28px' }}>
                {REGIONS.map((r, i) => (
                  <button key={r} onClick={() => setActive(i)} style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.88rem',
                    padding: '10px 18px', borderRadius: '999px', cursor: 'pointer',
                    border: '1px solid ' + (active === i ? 'var(--charcoal)' : 'rgba(26,26,26,.22)'),
                    background: active === i ? 'var(--charcoal)' : 'rgba(253,251,247,.55)',
                    color: active === i ? 'var(--on-charcoal)' : 'var(--ink-900)',
                    transition: 'all var(--dur-fast)',
                  }}>
                    {r}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Region card */}
          <Reveal delay={120} y={36}>
            <div style={{ background: 'var(--cream)', borderRadius: 'var(--r-xl)', padding: '8px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ position: 'relative', aspectRatio: '16/11', borderRadius: 'calc(var(--r-xl) - 8px)', overflow: 'hidden' }}>
                <Image
                  src={imgSrc(active, 800)}
                  alt={`Region ${REGIONS[active]}`}
                  fill
                  sizes="(max-width: 900px) 90vw, 45vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '22px 22px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--rust-500)' }}>
                  <Icon name="map-pin" size={18} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--ink-900)' }}>
                    {REGIONS[active]}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--fs-small)', margin: '10px 0 16px' }}>
                  Hochzeiten, JGA & Dekoverleih in {REGIONS[active]} und Umgebung — inkl. Lieferung, Auf- und Abbau.
                </p>
                <Button variant="gold" onClick={() => go('contact')} icon="arrow-up-right">
                  Anfrage für {REGIONS[active]}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Mapping: service id → sub-page href ─── */
const SERVICE_HREFS: Record<string, string> = {
  s1: '/leistungen/hochzeiten',
  s2: '/leistungen/jga',
  s3: '/leistungen/jga',
  s4: '/leistungen/events',
};

/* ─── ServicesPage ─── */
interface ServicesPageProps { go: (p: Page) => void; }

export function ServicesPage({ go }: ServicesPageProps) {
  return (
    <div style={{ paddingBottom: 'var(--sp-section)' }}>
      <div className="tf-inner" style={{ paddingTop: '60px' }}>
        <Reveal y={0}><Kicker>Leistungen</Kicker></Reveal>
        <Reveal delay={70}><h1 style={{ marginTop: '14px', maxWidth: '14ch' }}>Full-Service für deinen Tag</h1></Reveal>
        <Reveal delay={150}>
          <p style={{ maxWidth: '480px', marginTop: '18px', fontWeight: 300, fontSize: 'var(--fs-lead)' }}>
            Von der ersten Idee bis zum Abbau — alles aus einer Hand, gestaltet von Anni als gelernter Floristin.
          </p>
        </Reveal>
      </div>

      <div className="tf-inner" style={{ paddingTop: '44px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {SERVICES.map((s, i) => {
          const subHref = SERVICE_HREFS[s.id];
          return (
            <Reveal key={s.id} delay={i * 70}>
              <div
                className="tf-grid-editorial"
                style={{ background: 'var(--paper-0)', borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xs)' }}
              >
                <div className="edit-img" style={{ order: i % 2 ? 2 : 0, position: 'relative', aspectRatio: '4/3', minHeight: '220px' }}>
                  <Image
                    src={imgSrc(i + 1, 700)}
                    alt={s.title}
                    fill
                    sizes="(max-width: 900px) 90vw, 40vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--rust-500)', marginBottom: '14px' }}>
                    <Icon name={s.icon} size={22} />
                    <Kicker>{s.kicker}</Kicker>
                  </div>
                  <h2 style={{ fontSize: 'var(--fs-h2)' }}>{s.title}</h2>
                  <p style={{ marginTop: '12px', maxWidth: '46ch' }}>{s.body}</p>
                  <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {subHref && (
                      <a href={subHref} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        background: 'var(--rust-500)', color: 'var(--on-rust)',
                        padding: '11px 22px', borderRadius: '999px',
                        boxShadow: '0 4px 14px rgba(163,106,94,.25)',
                        textDecoration: 'none',
                      }}>
                        Mehr erfahren →
                      </a>
                    )}
                    <Button variant="ghost" onClick={() => go('contact')}>Anfragen</Button>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ─── ContactPage ─── */
interface FieldProps { label: string; placeholder: string; area?: boolean; }

function Field({ label, placeholder, area }: FieldProps) {
  const [focus, setFocus] = useState(false);
  const st: React.CSSProperties = {
    width: '100%', fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--ink-900)',
    background: 'var(--paper-0)', borderRadius: 'var(--r-sm)', padding: '13px 15px',
    outline: 'none', resize: 'vertical', boxSizing: 'border-box',
    border: '1px solid ' + (focus ? 'var(--rust-500)' : 'var(--border-strong)'),
    boxShadow: focus ? '0 0 0 3px rgba(163,106,94,.14)' : 'none',
  };
  return (
    <label style={{ display: 'block' }}>
      <span style={{
        display: 'block', fontFamily: 'var(--font-sans)', fontSize: '12px',
        letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: '8px',
      }}>
        {label}
      </span>
      {area
        ? <textarea rows={4} placeholder={placeholder} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={st} />
        : <input type="text" placeholder={placeholder} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={st} />
      }
    </label>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px var(--gutter) var(--sp-section)' }}>
      <Reveal y={0}><Kicker>Anfrage</Kicker></Reveal>
      <Reveal delay={70}><h1 style={{ marginTop: '14px' }}>Lass uns reden</h1></Reveal>
      <Reveal delay={140}>
        <p style={{ marginTop: '16px', fontWeight: 300, fontSize: 'var(--fs-lead)', maxWidth: '52ch' }}>
          Erzähl uns von deinem Event — Hochzeit, JGA, Workshop oder Dekoverleih. Anni meldet sich persönlich.
        </p>
      </Reveal>

      {sent ? (
        <div style={{ marginTop: '40px', background: 'var(--rust-50)', border: '1px solid var(--rust-200)', borderRadius: 'var(--r-lg)', padding: '40px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', color: 'var(--rust-500)' }}>
            <Icon name="check-circle" size={44} stroke={1.4} />
          </div>
          <h3 style={{ marginTop: '14px' }}>Danke! Deine Anfrage ist unterwegs.</h3>
          <p style={{ fontSize: 'var(--fs-small)', marginTop: '8px' }}>Wir melden uns innerhalb von 1–2 Tagen — mit Liebe, Anni.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        >
          <Field label="Dein Name" placeholder="Anni Musterfrau" />
          <Field label="E-Mail" placeholder="hallo@trendfleurs.de" />
          <Field label="Art des Events" placeholder="Hochzeit · JGA · Workshop …" />
          <Field label="Datum (ca.)" placeholder="Sommer 2026" />
          <div style={{ gridColumn: '1/3' }}>
            <Field label="Erzähl uns mehr" placeholder="Region, Gästezahl, Ideen …" area />
          </div>
          <div style={{ gridColumn: '1/3' }}>
            <Button type="submit" icon="arrow-up-right" style={{ width: '100%', justifyContent: 'center' }}>
              Anfrage senden
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ─── Footer ─── */
interface FooterColProps {
  title: string;
  links: [string, Page][];
  go: (p: Page) => void;
}

function FooterCol({ title, links, go }: FooterColProps) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'rgba(244,239,231,.45)', marginBottom: '18px',
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map(([label, id]) => (
          <button key={label} onClick={() => go(id)} style={{
            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            color: 'rgba(244,239,231,.76)', fontFamily: 'var(--font-sans)', fontSize: '0.92rem', padding: 0,
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface FooterProps { go: (p: Page) => void; }

export function Footer({ go }: FooterProps) {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'var(--on-charcoal)', padding: 'var(--sp-9) 0 44px' }}>
      <div className="tf-inner">
        <div className="tf-grid-footer">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '20px', letterSpacing: '0.01em' }}>
              a<span style={{ color: 'var(--gold-400)' }}>_</span>trendfleurs
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '22px', color: 'var(--gold-400)', marginTop: '-2px' }}>
              by Anni
            </div>
            <p style={{ color: 'rgba(244,239,231,.55)', fontSize: 'var(--fs-small)', marginTop: '18px', maxWidth: '30ch', lineHeight: 1.6 }}>
              Eventagentur, Floristik & Dekoverleih. Hochzeiten, JGA und Events aller Art — mit Liebe gemacht.
            </p>
          </div>
          <FooterCol title="Entdecken" links={[['Leistungen', 'services'], ['Dekoverleih', 'decor'], ['Shop', 'shop'], ['Anfrage', 'contact']]} go={go} />
          <FooterCol title="Service" links={[['Wunschzettel', 'decor'], ['Workshops', 'services'], ['JGA', 'services'], ['FAQ', 'contact']]} go={go} />
          {/* Regions */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,231,.45)', marginBottom: '18px' }}>
              Regionen
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {REGIONS.map((r) => (
                <button key={r} onClick={() => go('contact')} style={{
                  background: 'rgba(244,239,231,.08)', border: '1px solid rgba(244,239,231,.14)',
                  color: 'rgba(244,239,231,.78)', fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem', padding: '7px 13px', borderRadius: '999px', cursor: 'pointer',
                }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(244,239,231,.1)', marginTop: '52px', paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(244,239,231,.38)' }}>
            © 2026 a_trendfleurs by Anni · Impressum · Datenschutz
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(244,239,231,.38)' }}>
            mit Liebe gemacht
          </span>
        </div>
      </div>
    </footer>
  );
}
