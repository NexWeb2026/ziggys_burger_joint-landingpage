import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { Check, Users, Sparkles, Gift } from "lucide-react";

export function ReservationForm() {
  const showReservationForm = siteConfig.sections.reservationForm;
  const showPrivateDining = siteConfig.sections.privateDining;
  const showLargeGroups = siteConfig.sections.reservations;
  const showGifts = siteConfig.sections.gifts;

  if (!showReservationForm && !showPrivateDining && !showLargeGroups && !showGifts) return null;
  const ref = useReveal<HTMLDivElement>();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: siteConfig.reservations.timeslots[0] ?? "",
    guests: "2",
    requests: "",
  });

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      {showReservationForm && (
        <section id="book-a-table" className="px-4 py-16">
          <div ref={ref} className="fade-up max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Reservations</p>
              <h1 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Book a Table</h1>
              <p className="mt-3 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.reservations.note}</p>
            </div>

            {submitted ? (
              <div
                className="rounded-2xl border p-8 text-center"
                style={{ background: "var(--status-success-08)", border: "1px solid var(--status-success)" }}
              >
                <Check size={36} className="mx-auto mb-3" style={{ color: "var(--status-success)" }} />
                <h3 className="text-2xl font-black tracking-[0.02em]">Request Sent</h3>
                <p className="mt-2 uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
                  {siteConfig.contact.responseTimeNote}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4 rounded-2xl border p-6 md:p-8"
                style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Name" required value={form.name} onChange={upd("name")} />
                  <Field label="Email" type="email" required value={form.email} onChange={upd("email")} />
                  <Field label="Phone" type="tel" required value={form.phone} onChange={upd("phone")} />
                  <Field label="Date" type="date" required value={form.date} onChange={upd("date")} />
                  <SelectField label="Time" required value={form.time} onChange={upd("time")}>
                    {siteConfig.reservations.timeslots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </SelectField>
                  <SelectField label="Guests" required value={form.guests} onChange={upd("guests")}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                  </SelectField>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--ui-text-muted)" }}>Special Requests</label>
                  <textarea
                    rows={3}
                    value={form.requests}
                    onChange={upd("requests")}
                    className="w-full rounded-xl px-3 py-3 outline-none"
                    style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl py-3.5 font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
                >
                  Lock It In
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {showPrivateDining && (
        <section id="private-dining" className="px-4 py-12">
          <div
            className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border p-8 md:flex-row"
            style={{ background: "var(--ui-panel-alt)", borderColor: "var(--brand-primary-strong)" }}
          >
            <Sparkles size={28} style={{ color: "var(--brand-primary)" }} />
            <div className="flex-1">
              <h2 className="text-2xl font-black tracking-[0.02em]">Private Dining</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.reservations.privateDiningNote}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-subtle)" }}>{siteConfig.contact.cateringResponseNote}</p>
            </div>
            <Link
              to="/contact"
              hash="events"
              className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em]"
              style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
            >
              Hit Us Up
            </Link>
          </div>
        </section>
      )}

      {showLargeGroups && (
        <section id="large-groups" className="px-4 py-12">
          <div
            className="mx-auto flex max-w-4xl items-center gap-4 rounded-2xl border p-6"
            style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
          >
            <Users size={24} style={{ color: "var(--brand-primary)" }} />
            <p className="flex-1 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
              {siteConfig.reservations.largeGroupNote}
            </p>
            <Link to="/contact" hash="events" className="text-sm font-bold uppercase tracking-[0.08em] underline" style={{ color: "var(--brand-primary)" }}>
              Event form
            </Link>
          </div>
        </section>
      )}

      {showGifts && (
        <section id="gifts" className="px-4 py-12">
          <div
            className="mx-auto rounded-2xl border p-6"
            style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}
          >
            <div className="flex items-center gap-3">
              <Gift size={22} style={{ color: "var(--brand-primary)" }} />
              <h2 className="text-2xl font-black tracking-[0.02em]">Gifts & Loyalty</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>{siteConfig.gifts.voucherNote}</p>
            {siteConfig.gifts.voucherUrl && (
              <a
                href={siteConfig.gifts.voucherUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-block text-sm font-bold uppercase tracking-[0.08em] underline"
                style={{ color: "var(--brand-primary)" }}
              >
                Grab a voucher
              </a>
            )}
            <p className="mt-4 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-subtle)" }}>{siteConfig.gifts.loyaltyNote}</p>
          </div>
        </section>
      )}
    </>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
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

function SelectField({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
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
