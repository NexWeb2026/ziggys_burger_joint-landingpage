import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { createGradientPlaceholder, isFilled, setImageFallback } from "@/lib/utils";

export function Hero() {
  if (!siteConfig.sections.hero) return null;
  const ref = useReveal<HTMLDivElement>();
  const [heroFailed, setHeroFailed] = useState(!isFilled(siteConfig.heroImage));
  const heroFallback = createGradientPlaceholder(siteConfig.restaurantName, 1600, 900);
  const showReservationsCta = siteConfig.integrations.reservationsEnabled && (siteConfig.sections.reservationForm || siteConfig.sections.privateDining || siteConfig.sections.reservations);
  const showMenuCta = siteConfig.sections.menuSpecial || siteConfig.sections.menuGrid;

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {heroFailed ? (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url("${heroFallback}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <img
          src={siteConfig.heroImage}
          alt={`${siteConfig.restaurantName} ambiance`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(event) => {
            setImageFallback(event, heroFallback);
            setHeroFailed(true);
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--overlay-50) 0%, var(--overlay-85) 100%)" }}
      />
      <div ref={ref} className="fade-up relative z-10 max-w-4xl px-4 text-center">
        <span
          className="mb-5 inline-block rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em]"
          style={{ background: "var(--brand-primary-opaque-15)", color: "var(--brand-primary-soft)", borderColor: "var(--brand-primary)" }}
        >
          {siteConfig.cuisineType}
        </span>
        <h1 className="text-5xl font-black leading-[0.9] tracking-[0.02em] md:text-7xl lg:text-8xl">
          <span className="text-gradient-gold">{siteConfig.restaurantName}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium uppercase tracking-[0.14em] md:text-lg" style={{ color: "var(--ui-text-muted)" }}>
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {showReservationsCta && (
            <Link
              to="/reservations"
              className="rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
            >
              Book a Table
            </Link>
          )}
          {showMenuCta && (
            <Link
              to="/menu"
              className="rounded-full border-2 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[var(--brand-primary-opaque-12)]"
              style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary-soft)" }}
            >
              See the Menu
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
