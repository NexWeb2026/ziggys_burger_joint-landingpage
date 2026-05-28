import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { Star } from "lucide-react";

export function Reviews() {
  const showReviews = siteConfig.sections.reviews;
  const showPress = siteConfig.sections.pressFeatures;
  if (!showReviews && !showPress) return null;
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      {showReviews && (
        <section id="reviews" className="px-4 py-16" style={{ background: "var(--ui-panel)" }}>
          <div ref={ref} className="fade-up max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Reviews</p>
              <h2 className="text-4xl font-black tracking-[0.02em] md:text-5xl">What the Crowd Says</h2>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="var(--brand-primary)" stroke="var(--brand-primary)" />
                  ))}
                </div>
                <span className="text-sm font-medium uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
                  {siteConfig.ratings.googleRating} on Google - {siteConfig.ratings.reviewCount} reviews
                </span>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {siteConfig.reviews.map((r) => (
                <blockquote
                  key={`${r.name}-${r.location}`}
                  className="rounded-2xl border p-6"
                  style={{ background: "var(--ui-panel-alt)", borderColor: "var(--ui-border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black"
                      style={{ background: "var(--brand-primary-opaque-15)", color: "var(--brand-primary-soft)" }}
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div className="flex">
                      {Array.from({ length: r.stars }).map((_, i) => (
                        <Star key={i} size={14} fill="var(--brand-primary)" stroke="var(--brand-primary)" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-base font-medium uppercase tracking-[0.06em]" style={{ color: "var(--ui-text)" }}>
                    &quot;{r.quote}&quot;
                  </p>
                  <footer className="mt-3 text-sm font-medium uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
                    - {r.name}, {r.location}
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={siteConfig.ratings.leaveReviewUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-bold uppercase tracking-[0.08em] underline"
                style={{ color: "var(--brand-primary)" }}
              >
                Leave a Review
              </a>
              {siteConfig.ratings.tripAdvisorUrl && (
                <a
                  href={siteConfig.ratings.tripAdvisorUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-bold uppercase tracking-[0.08em] underline"
                  style={{ color: "var(--brand-primary-soft)" }}
                >
                  TripAdvisor
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {showPress && (
        <section id="press-features" className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Press</p>
              <h2 className="text-4xl font-black tracking-[0.02em] md:text-5xl">In The Press</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {siteConfig.pressFeatures.map((feature) => (
                <article
                  key={feature.publication}
                  className="rounded-2xl border p-6"
                  style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
                >
                  <h3 className="text-lg font-black uppercase tracking-[0.08em]">{feature.publication}</h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.06em]" style={{ color: "var(--ui-text-muted)" }}>&quot;{feature.quote}&quot;</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
