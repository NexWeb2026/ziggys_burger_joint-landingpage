import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { Flame } from "lucide-react";
import { createGradientPlaceholder, isFilled, setImageFallback } from "@/lib/utils";

export function TodaysSpecial() {
  const ref = useReveal<HTMLDivElement>();
  const s = siteConfig.todaysSpecial;
  const [imageFailed, setImageFailed] = useState(!isFilled(s.image));
  const specialFallback = createGradientPlaceholder(s.name, 900, 680);
  const canReserve = siteConfig.integrations.reservationsEnabled && (siteConfig.sections.reservationForm || siteConfig.sections.privateDining || siteConfig.sections.reservations);
  if (!siteConfig.sections.todaysSpecial) return null;

  return (
    <section id="tonights-special" className="px-4 py-16" style={{ background: "var(--ui-panel)" }}>
      <div ref={ref} className="fade-up max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>
            <Flame size={14} /> Today&apos;s Special
          </p>
          <h2 className="text-4xl font-black tracking-[0.02em] md:text-5xl">{s.name}</h2>
        </div>
        <div
          className="grid items-center gap-6 overflow-hidden rounded-2xl border"
          style={{ background: "var(--ui-panel-alt)", borderColor: "var(--brand-primary-strong)" }}
        >
          {imageFailed ? (
            <div
              className="h-72 w-full md:h-full"
              style={{
                backgroundImage: `url("${specialFallback}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Special placeholder"
            />
          ) : (
              <img
                src={s.image}
                alt={s.name}
                className="h-72 w-full object-cover md:h-full"
                loading="lazy"
                onError={(event) => {
                  setImageFallback(event, specialFallback);
                setImageFailed(true);
              }}
            />
          )}
          <div className="p-6 md:p-8">
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "var(--ui-text-muted)" }}>{s.description}</p>
            {s.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em]"
                    style={{ background: "var(--brand-primary-opaque-15)", color: "var(--brand-primary-soft)", borderColor: "var(--brand-primary)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-3xl font-black tracking-[0.04em]" style={{ color: "var(--brand-primary)" }}>
                {s.price}
              </div>
              {canReserve && (
                <Link
                  to="/reservations"
                  className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
                >
                  Grab One
                </Link>
              )}
            </div>
            {s.note && <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-subtle)" }}>{s.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
