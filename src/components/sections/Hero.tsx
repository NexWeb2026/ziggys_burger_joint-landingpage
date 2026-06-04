import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { createGradientPlaceholder, isFilled, setImageFallback } from "@/lib/utils";

export function Hero() {
  const ref = useReveal<HTMLDivElement>();
  const [heroFailed, setHeroFailed] = useState(!isFilled(siteConfig.heroImage));
  const heroFallback = createGradientPlaceholder(siteConfig.restaurantName, 1600, 900);
  const showReservationsCta = siteConfig.integrations.reservationsEnabled && (siteConfig.sections.reservationForm || siteConfig.sections.privateDining || siteConfig.sections.reservations);
  const showMenuCta = siteConfig.sections.menuSpecial || siteConfig.sections.menuGrid;
  if (!siteConfig.sections.hero) return null;

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {heroFailed ? (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgb(221, 29, 55), rgb(238, 255, 0)), url("${heroFallback}")`,
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

      {/* 🔑 Replaced the single faint overlay with a stronger multi-stop gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      <div ref={ref} className="fade-up relative z-10 max-w-4xl px-4 text-center">
        <span
          className="mb-5 inline-block rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em]"
          style={{
            background: "var(--brand-primary-opaque-15)",
            color: "var(--brand-primary-soft)",
            borderColor: "var(--brand-primary)",
          }}
        >
          {siteConfig.cuisineType}
        </span>

        {/* 🔑 Added drop-shadow to make the title pop off the image */}
        <h1
          className="text-5xl font-black leading-[0.9] tracking-[0.02em] md:text-7xl lg:text-8xl"
          style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.7))" }}
        >
          <span className="text-gradient-gold">{siteConfig.restaurantName}</span>
        </h1>

        {/* 🔑 Bumped tagline to white so it reads cleanly over dark overlay */}
        <p
          className="mx-auto mt-5 max-w-2xl text-base font-medium uppercase tracking-[0.14em] md:text-lg"
          style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
        >
          {siteConfig.tagline}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {showReservationsCta && (
            <Link
              to="/reservations"
              className="rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))",
                color: "var(--brand-on-primary)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              Book a Table
            </Link>
          )}
          {showMenuCta && (
            <Link
              to="/menu"
              className="rounded-full border-2 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[var(--brand-primary-opaque-12)]"
              style={{
                borderColor: "var(--brand-primary)",
                color: "var(--brand-primary-soft)",
                backdropFilter: "blur(4px)",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              See the Menu
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}