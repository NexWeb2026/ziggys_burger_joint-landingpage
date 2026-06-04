import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { SocialIcons } from "@/components/SocialIcons";
import { Phone, Mail, MapPin, Check, Accessibility, Car, CreditCard, Clock3 } from "lucide-react";
import { isFilled, setImageFallback, createImagePlaceholder } from "@/lib/utils";

export function ContactDetails() {
  if (!siteConfig.sections.contactDetails) return null;
  return (
    <section id="get-in-touch" className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Contact</p>
          <h1 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Hit Us Up</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.contact.responseTimeNote}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-4 rounded-2xl border p-6 transition-colors hover:bg-[var(--brand-primary-opaque-12)]"
            style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
          >
            <Phone style={{ color: "var(--brand-primary)" }} />
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>Phone</div>
              <div className="text-lg font-black tracking-[0.04em]">{siteConfig.contact.phone}</div>
            </div>
          </a>

          {siteConfig.integrations.whatsappEnabled && isFilled(siteConfig.socials.whatsappChannelUrl) && (
            <a
              href={siteConfig.socials.whatsappChannelUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl border p-6 transition-colors hover:bg-[var(--brand-primary-opaque-12)]"
              style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
            >
              <img
                src={siteConfig.iconAssets.whatsapp}
                alt="WhatsApp"
                width={26}
                height={26}
                onError={(event) => setImageFallback(event, siteConfig.iconAssets.whatsappBlack)}
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>WhatsApp</div>
                <div className="text-lg font-black tracking-[0.04em]">{siteConfig.contact.whatsapp}</div>
              </div>
            </a>
          )}

          <div
            className="flex items-center gap-4 rounded-2xl border p-6"
            style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
          >
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>Follow</div>
              <SocialIcons variant="color" size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventEnquiryForm() {
  if (!siteConfig.sections.eventsForm || !siteConfig.sections.privateDining) return null;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Private Dining",
    date: "",
    guests: "",
    message: "",
  });
  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section id="socials" className="scroll-mt-32 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Socials & Private Dining</p>
          <h2 className="text-3xl font-black tracking-[0.02em] md:text-4xl">Book Your Socials</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.contact.cateringResponseNote}</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border p-8 text-center" style={{ background: "var(--status-success-08)", border: "1px solid var(--status-success)" }}>
            <Check size={36} className="mx-auto mb-3" style={{ color: "var(--status-success)" }} />
            <h3 className="text-2xl font-black tracking-[0.02em]">Locked In</h3>
            <p className="mt-2 uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
              {siteConfig.contact.cateringResponseNote}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-4 rounded-2xl border p-6 md:p-8"
            style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Name" required value={form.name} onChange={upd("name")} />
              <Input label="Email" type="email" required value={form.email} onChange={upd("email")} />
              <Input label="Phone" type="tel" required value={form.phone} onChange={upd("phone")} />
              <Select label="Event Type" value={form.eventType} onChange={upd("eventType")}>
                <option>Private Dining</option>
                <option>Wedding</option>
                <option>Corporate</option>
                <option>Celebration</option>
                <option>Other</option>
              </Select>
              <Input label="Date" type="date" required value={form.date} onChange={upd("date")} />
              <Input label="Guest Count" type="number" min={1} required value={form.guests} onChange={upd("guests")} />
            </div>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>Message</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={upd("message")}
                className="w-full rounded-xl px-3 py-3 outline-none"
                style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl py-3.5 font-bold uppercase tracking-[0.12em]"
              style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
            >
              Send It
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function LocationSection() {
  const showMap = siteConfig.sections.locationMap;
  const showHours = siteConfig.sections.hours;
  const showFindUs = showMap || showHours || siteConfig.sections.location;
  if (!showFindUs) return null;

  const mapPlaceholder = createImagePlaceholder("Map unavailable", 1200, 760);

  return (
    <section id="find-us" className="scroll-mt-32 px-4 py-16" style={{ background: "var(--ui-panel)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Find Us</p>
          <h2 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Find the Spot</h2>
        </div>

        {showMap && (
          <div className="overflow-hidden rounded-2xl border mb-8" style={{ borderColor: "var(--ui-border-strong)" }}>
            {isFilled(siteConfig.location.mapEmbedUrl) ? (
              <iframe
                title="Map"
                src={siteConfig.location.mapEmbedUrl}
                className="block h-96 w-full border-0"
                loading="lazy"
                onError={(event) => {
                  const target = event.currentTarget;
                  target.src = mapPlaceholder;
                }}
              />
            ) : (
              <div
                className="w-full h-96"
                style={{
                  backgroundImage: `url("${mapPlaceholder}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <div className="p-3 text-center" style={{ background: "var(--ui-panel-alt)" }}>
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-bold uppercase tracking-[0.08em] underline"
                style={{ color: "var(--brand-primary)" }}
              >
                Open in Maps
              </a>
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Info icon={<MapPin size={18} />} label="Address">
            {siteConfig.location.address}
          </Info>
          <Info icon={<Car size={18} />} label="Parking">
            {siteConfig.location.parkingNote}
          </Info>
          <Info icon={<Accessibility size={18} />} label="Accessibility">
            {siteConfig.location.accessibilityNote}
          </Info>
          <Info icon={<CreditCard size={18} />} label="Payment">
            {siteConfig.location.paymentMethods.join(" - ")}
          </Info>
        </div>

        {showHours && (
          <div className="mt-5 rounded-xl border p-5" style={{ background: "var(--ui-panel-alt)", borderColor: "var(--ui-border)" }}>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: "var(--brand-primary)" }}>
              <Clock3 size={16} />
              Hours
            </h4>
            <ul className="grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-4" style={{ color: "var(--ui-text-muted)" }}>
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between rounded-lg px-3 py-2" style={{ background: "var(--ui-panel)" }}>
                  <span>{h.day}</span>
                  <span>{h.isOpen ? `${h.openTime}-${h.closeTime}` : "Closed"}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {siteConfig.integrations.deliveryEnabled && siteConfig.sections.delivery && siteConfig.delivery.length > 0 && (
          <div className="mt-12 text-center">
            <h3 className="mb-4 text-xl font-black tracking-[0.02em]">Get Delivery</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {siteConfig.delivery.map((d) => (
                <a
                  key={d.name}
                  href={d.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.08em]"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
                >
                  <img
                    src={d.icon}
                    alt={d.iconAlt}
                    width={22}
                    height={22}
                    onError={(event) => setImageFallback(event, d.iconBlack)}
                  />
                  {d.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Info({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border p-4" style={{ background: "var(--ui-panel-alt)", borderColor: "var(--ui-border)" }}>
      <div style={{ color: "var(--brand-primary)" }}>{icon}</div>
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>{label}</div>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>{label}</span>
      <input
        {...props}
        className="w-full rounded-xl px-3 py-3 outline-none"
        style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
      />
    </label>
  );
}

function Select({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>{label}</span>
      <select
        {...props}
        className="w-full rounded-xl px-3 py-3 outline-none"
        style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
      >
        {children}
      </select>
    </label>
  );
}
