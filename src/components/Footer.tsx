import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { SocialIcons } from "./SocialIcons";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { createImagePlaceholder, setImageFallback } from "@/lib/utils";

export function Footer() {
  if (!siteConfig.sections.footer) return null;
  const logoFallback = createImagePlaceholder(siteConfig.restaurantName, 340, 110);
  const showReservationsLink = siteConfig.integrations.reservationsEnabled && (siteConfig.sections.reservationForm || siteConfig.sections.privateDining || siteConfig.sections.reservations || siteConfig.sections.gifts);
  const showMenuLink = siteConfig.sections.menuSpecial || siteConfig.sections.menuGrid;
  const showEventsLink = siteConfig.sections.upcomingEvents || siteConfig.sections.photoGallery || siteConfig.sections.privateHire;

  return (
    <footer className="mt-16" style={{ background: "var(--ui-panel)", borderTop: "1px solid var(--ui-border-strong)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-4">
        <div className="space-y-3">
          <img
            src={siteConfig.branding.logo}
            alt={siteConfig.branding.logoAlt}
            className="h-14 w-auto"
            onError={(event) => setImageFallback(event, logoFallback)}
          />
          <p className="text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.tagline}</p>
          <p className="text-xs" style={{ color: "var(--ui-text-subtle)" }}>{siteConfig.cuisineType}</p>
          <p className="text-xs" style={{ color: "var(--ui-text-subtle)" }}>Est. {siteConfig.foundedYear}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: "var(--brand-primary)" }}>Drop In</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--ui-text-muted)" }}>
            <li className="flex gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />{siteConfig.location.address}</li>
            <li className="flex gap-2"><Phone size={14} className="mt-0.5 shrink-0" /><a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a></li>
            <li className="flex gap-2"><Mail size={14} className="mt-0.5 shrink-0" /><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: "var(--brand-primary)" }}>When We're Open</h4>
          {siteConfig.sections.hours ? (
            <ul className="space-y-1 text-xs" style={{ color: "var(--ui-text-muted)" }}>
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span>{h.day}</span>
                  <span>{h.isOpen ? `${h.openTime}-${h.closeTime}` : "Closed"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs" style={{ color: "var(--ui-text-subtle)" }}>Hours currently hidden.</p>
          )}
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: "var(--brand-primary)" }}>Find Us</h4>
          <SocialIcons variant="color" size={22} />
          <p className="mt-3 text-xs" style={{ color: "var(--ui-text-subtle)" }}>{siteConfig.socials.handle}</p>
          <div className="mt-4 flex flex-col gap-2">
            {showReservationsLink && <Link to="/reservations" className="text-sm font-semibold uppercase tracking-[0.08em] hover:underline" style={{ color: "var(--ui-text)" }}>Book a Table</Link>}
            {showMenuLink && <Link to="/menu" className="text-sm font-semibold uppercase tracking-[0.08em] hover:underline" style={{ color: "var(--ui-text)" }}>See the Menu</Link>}
            {showEventsLink && <Link to="/events" className="text-sm font-semibold uppercase tracking-[0.08em] hover:underline" style={{ color: "var(--ui-text)" }}>What's On</Link>}
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs" style={{ borderColor: "var(--ui-border)", color: "var(--ui-text-subtle)" }}>
        <Clock size={12} className="inline mr-1" />
        &copy; {new Date().getFullYear()} {siteConfig.restaurantName}. All rights reserved.
      </div>
    </footer>
  );
}
