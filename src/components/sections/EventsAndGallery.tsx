import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { Calendar, MapPin, Clock, X, Ticket } from "lucide-react";
import { createGradientPlaceholder, isFilled, setImageFallback } from "@/lib/utils";

export function EventsList() {
  if (!siteConfig.sections.upcomingEvents) return null;
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="upcoming-events" className="px-4 py-16">
      <div ref={ref} className="fade-up max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>What&apos;s On</p>
          <h1 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Upcoming Events</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.events.map((ev) => {
            const eventCardPlaceholder = createGradientPlaceholder(ev.name, 600, 240);
            return (
              <article
                key={`${ev.name}-${ev.date}`}
                className="flex flex-col overflow-hidden rounded-2xl border"
                style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
              >
                <div
                  className="h-28"
                  style={{
                    backgroundImage: `url("${eventCardPlaceholder}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-label={`${ev.name} placeholder`}
                />
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className="self-start mb-3 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
                    style={{ background: "var(--brand-primary-opaque-15)", color: "var(--brand-primary-soft)", borderColor: "var(--brand-primary)" }}
                  >
                    {ev.type}
                  </span>
                  <h3 className="text-xl font-black tracking-[0.02em]">{ev.name}</h3>
                  <div className="mt-3 space-y-1.5 text-sm" style={{ color: "var(--ui-text-muted)" }}>
                    <div className="flex items-center gap-2"><Calendar size={14} /> {ev.date}</div>
                    <div className="flex items-center gap-2"><Clock size={14} /> {ev.time}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} /> {ev.location}</div>
                    {ev.address && <div className="text-xs uppercase tracking-[0.06em]">{ev.address}</div>}
                    {ev.notes && <div className="text-xs uppercase tracking-[0.06em]">{ev.notes}</div>}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>{ev.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {ev.ticketUrl && (
                      <a
                        href={ev.ticketUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-bold uppercase tracking-[0.08em]"
                        style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
                      >
                        <Ticket size={14} /> Tickets
                      </a>
                    )}
                    {ev.googleMapsUrl && (
                      <a
                        href={ev.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-bold uppercase tracking-[0.08em]"
                        style={{ background: "var(--ui-panel-alt)", color: "var(--ui-text)" }}
                      >
                        <MapPin size={14} /> Map
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  if (!siteConfig.sections.photoGallery) return null;
  const [active, setActive] = useState<string | null>(null);
  const galleryItems = useMemo(() => siteConfig.gallery.filter((src) => isFilled(src)), []);
  if (galleryItems.length === 0) return null;

  const tileFallback = createGradientPlaceholder("Gallery", 600, 600);

  return (
    <section id="gallery" className="px-4 py-16" style={{ background: "var(--ui-panel)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Gallery</p>
          <h2 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Moments at {siteConfig.restaurantName}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
            Follow us {siteConfig.socials.handle} for more.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => setActive(src)}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                onError={(event) => setImageFallback(event, tileFallback)}
              />
            </button>
          ))}
        </div>
      </div>
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "var(--overlay-85)" }}
          onClick={() => setActive(null)}
        >
          <button className="absolute top-4 right-4 p-3" style={{ color: "var(--ui-text)" }} onClick={() => setActive(null)} aria-label="Close">
            <X size={28} />
          </button>
          <img
            src={active}
            alt="Gallery detail"
            className="max-w-full max-h-full rounded-lg"
            onError={(event) => setImageFallback(event, tileFallback)}
          />
        </div>
      )}
    </section>
  );
}

export function PrivateHireCTA() {
  if (!siteConfig.sections.privateHire) return null;
  return (
    <section id="private-hire" className="px-4 py-16">
      <div
        className="mx-auto rounded-2xl border p-8 text-center md:p-10"
        style={{ background: "var(--ui-panel-alt)", borderColor: "var(--brand-primary-strong)" }}
      >
        <h2 className="text-3xl font-black tracking-[0.02em] md:text-4xl">Host Your Event Here</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>
          From intimate dinners to milestone celebrations, we&apos;ll craft a memorable evening for your guests.
        </p>
        <Link
          to="/contact"
          hash="events"
          className="mt-6 inline-block rounded-full px-7 py-3 font-bold uppercase tracking-[0.12em]"
          style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
        >
          Book the Space
        </Link>
      </div>
    </section>
  );
}
