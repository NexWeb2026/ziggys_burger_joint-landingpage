import { useState } from "react";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { Quote } from "lucide-react";
import { createGradientPlaceholder, isFilled, setImageFallback } from "@/lib/utils";

export function About() {
  if (!siteConfig.sections.about) return null;
  const ref = useReveal<HTMLDivElement>();
  const [interiorFailed, setInteriorFailed] = useState(!isFilled(siteConfig.interiorImage));
  const [chefFailed, setChefFailed] = useState(!isFilled(siteConfig.chef.image));
  const interiorFallback = createGradientPlaceholder("Harbour Dining Room", 1200, 720);
  const chefFallback = createGradientPlaceholder(siteConfig.chef.name, 640, 760);

  return (
    <section id="our-story" className="px-4 py-16">
      <div ref={ref} className="fade-up max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Our Story</p>
          <h2 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Where the Grill Does the Talking</h2>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <p className="text-base leading-relaxed md:text-lg" style={{ color: "var(--ui-text-muted)" }}>
            {siteConfig.story}
          </p>
          <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: "var(--ui-border-strong)" }}>
            {interiorFailed ? (
              <div
                className="h-80 w-full"
                style={{
                  backgroundImage: `url("${interiorFallback}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-label="Interior placeholder"
              />
            ) : (
              <img
                src={siteConfig.interiorImage}
                alt="Restaurant interior"
                className="h-80 w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  setImageFallback(event, interiorFallback);
                  setInteriorFailed(true);
                }}
              />
            )}
          </div>
        </div>

        <div
          className="mt-12 grid gap-6 rounded-2xl border p-6 md:grid-cols-[260px_1fr] md:p-8"
          style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
        >
          {chefFailed ? (
            <div
              className="h-64 w-full rounded-xl md:h-full"
              style={{
                backgroundImage: `url("${chefFallback}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label={`${siteConfig.chef.name} placeholder`}
            />
          ) : (
              <img
                src={siteConfig.chef.image}
                alt={siteConfig.chef.name}
                className="h-64 w-full rounded-xl object-cover md:h-full"
                loading="lazy"
                onError={(event) => {
                  setImageFallback(event, chefFallback);
                setChefFailed(true);
              }}
            />
          )}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>{siteConfig.chef.title}</p>
            <h3 className="text-3xl font-black tracking-[0.02em]">{siteConfig.chef.name}</h3>
            <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.chef.bio}</p>
            <blockquote
              className="mt-5 border-l-2 pl-4 text-base font-medium uppercase tracking-[0.08em]"
              style={{ borderColor: "var(--brand-primary)", color: "var(--ui-text)" }}
            >
              <Quote size={16} className="inline mr-1 opacity-60" />
              {siteConfig.chef.quote}
            </blockquote>
            <p className="mt-4 text-sm" style={{ color: "var(--ui-text-subtle)" }}>
              Signature dish: <span style={{ color: "var(--brand-primary-soft)" }}>{siteConfig.chef.signatureDish}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {siteConfig.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border p-5 text-center"
              style={{ background: "var(--ui-panel-alt)", borderColor: "var(--ui-border)" }}
            >
              <div className="text-2xl font-black tracking-[0.04em] md:text-3xl" style={{ color: "var(--brand-primary)" }}>
                {s.value}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
