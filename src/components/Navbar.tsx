import { useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/siteConfig";
import { SocialIcons } from "./SocialIcons";
import { createImagePlaceholder, setImageFallback } from "@/lib/utils";

type SubLink = { label: string; to: string; hash?: string };
type NavItem = { label: string; to: string; subs: SubLink[] };

function getNavItems() {
  const homeSubs: SubLink[] = [
    siteConfig.sections.about && { label: "Our Story", to: "/", hash: "our-story" },
    siteConfig.sections.todaysSpecial && { label: "Today's Special", to: "/", hash: "tonights-special" },
    siteConfig.sections.reviews && { label: "Reviews", to: "/", hash: "reviews" },
    siteConfig.sections.pressFeatures && { label: "Press", to: "/", hash: "press-features" },
    siteConfig.sections.newsletter && { label: "Get Updates", to: "/", hash: "stay-updated" },
  ].filter(Boolean) as SubLink[];

  const reservationsSubs: SubLink[] = [
    siteConfig.sections.reservationForm && { label: "Book a Table", to: "/reservations", hash: "book-a-table" },
    siteConfig.sections.privateDining && { label: "Private Dining", to: "/reservations", hash: "private-dining" },
    siteConfig.sections.reservations && { label: "Large Groups", to: "/reservations", hash: "large-groups" },
    siteConfig.sections.gifts && { label: "Gifts & Loyalty", to: "/reservations", hash: "gifts" },
  ].filter(Boolean) as SubLink[];

  const menuSubs: SubLink[] = [
    siteConfig.sections.menuSpecial && siteConfig.sections.todaysSpecial && { label: "Today's Special", to: "/menu", hash: "tonights-special" },
    siteConfig.sections.menuGrid && { label: "Starters", to: "/menu", hash: "starters" },
    siteConfig.sections.menuGrid && { label: "Mains", to: "/menu", hash: "mains" },
    siteConfig.sections.menuGrid && { label: "Desserts", to: "/menu", hash: "desserts" },
    siteConfig.sections.menuGrid && { label: "Wine & Drinks", to: "/menu", hash: "wine-drinks" },
  ].filter(Boolean) as SubLink[];

  const eventsSubs: SubLink[] = [
    siteConfig.sections.upcomingEvents && { label: "Upcoming Events", to: "/events", hash: "upcoming-events" },
    siteConfig.sections.photoGallery && { label: "Gallery", to: "/events", hash: "gallery" },
    siteConfig.sections.privateHire && { label: "Private Hire", to: "/events", hash: "private-hire" },
  ].filter(Boolean) as SubLink[];

  const hasFindUsContent = siteConfig.sections.locationMap || siteConfig.sections.hours || siteConfig.sections.location;
  const contactSubs: SubLink[] = [
    siteConfig.sections.contactDetails && { label: "Hit Us Up", to: "/contact", hash: "get-in-touch" },
    siteConfig.sections.eventsForm && { label: "Private Dining Enquiry", to: "/contact", hash: "events" },
    hasFindUsContent && { label: "Find Us", to: "/contact", hash: "find-us" },
  ].filter(Boolean) as SubLink[];

  const navItems: NavItem[] = [];
  if (homeSubs.length > 0) navItems.push({ label: "Home", to: "/", subs: homeSubs });
  if (reservationsSubs.length > 0) navItems.push({ label: "Reservations", to: "/reservations", subs: reservationsSubs });
  if (menuSubs.length > 0) navItems.push({ label: "Menu", to: "/menu", subs: menuSubs });
  if (eventsSubs.length > 0) navItems.push({ label: "Events", to: "/events", subs: eventsSubs });
  if (contactSubs.length > 0) navItems.push({ label: "Contact", to: "/contact", subs: contactSubs });
  return navItems;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accordion, setAccordion] = useState<string | null>(null);
  const location = useLocation();
  const navItems = useMemo(() => getNavItems(), []);
  const showReserveCta = siteConfig.integrations.reservationsEnabled && navItems.some((item) => item.label === "Reservations");
  const logoFallback = createImagePlaceholder(siteConfig.restaurantName, 300, 96);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--ui-panel) 92%, transparent)", borderBottom: "1px solid var(--ui-border-strong)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={siteConfig.branding.logo}
            alt={siteConfig.branding.logoAlt}
            className="h-11 w-auto md:h-12"
            onError={(event) => setImageFallback(event, logoFallback)}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <div key={item.label} className="relative group">
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] transition-colors"
                  style={{
                    color: isActive ? "var(--brand-primary)" : "var(--ui-text)",
                    background: isActive ? "var(--brand-primary-opaque-12)" : "transparent",
                  }}
                >
                  {item.label}
                  <ChevronDown size={14} className="opacity-60 transition-transform group-hover:translate-y-px group-hover:opacity-100" />
                </Link>
                <div className="absolute left-0 top-full min-w-56 translate-y-1 pt-2 invisible opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div
                    className="overflow-hidden rounded-xl shadow-2xl"
                    style={{ background: "var(--ui-panel)", border: "1px solid var(--ui-border-strong)" }}
                  >
                    {item.subs.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        hash={s.hash}
                        className="block px-4 py-3 text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:bg-[var(--brand-primary-opaque-12)]"
                        style={{ color: "var(--ui-text-muted)" }}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <SocialIcons variant="color" size={18} />
          {showReserveCta && (
            <Link
              to="/reservations"
              className="rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
            >
              Book a Table
            </Link>
          )}
        </div>

        <button
          className="lg:hidden flex min-h-11 min-w-11 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--ui-border-strong)", color: "var(--ui-text)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: "var(--ui-border-strong)", background: "var(--ui-panel)" }}>
          <div className="max-h-[80vh] overflow-y-auto px-4 py-2">
            {navItems.map((item) => {
              const open = accordion === item.label;
              return (
                <div key={item.label} className="border-b" style={{ borderColor: "var(--ui-border)" }}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-3 text-sm font-bold uppercase tracking-[0.12em]"
                      style={{ color: location.pathname === item.to ? "var(--brand-primary)" : "var(--ui-text)" }}
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setAccordion(open ? null : item.label)}
                      className="min-h-11 min-w-11 p-3"
                      aria-label={`Toggle ${item.label} sub-menu`}
                    >
                      <ChevronDown size={18} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
                    </button>
                  </div>
                  {open && (
                    <div className="pb-2 pl-3">
                      {item.subs.map((s) => (
                        <Link
                          key={s.label}
                          to={s.to}
                          hash={s.hash}
                          onClick={() => { setMobileOpen(false); setAccordion(null); }}
                          className="block py-2.5 text-sm uppercase tracking-[0.08em]"
                          style={{ color: "var(--ui-text-muted)" }}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex items-center justify-between py-4">
              <SocialIcons variant="color" size={20} />
              {showReserveCta && (
                <Link
                  to="/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em]"
                  style={{ background: "var(--brand-primary)", color: "var(--brand-on-primary)" }}
                >
                  Book
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
