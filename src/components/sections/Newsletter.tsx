import { useState } from "react";
import { siteConfig } from "@/siteConfig";
import { useReveal } from "@/lib/hooks";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  if (!siteConfig.sections.newsletter) return null;
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section id="stay-updated" className="px-4 py-16">
      <div ref={ref} className="fade-up mx-auto max-w-2xl text-center">
        <Mail size={28} className="mx-auto mb-3" style={{ color: "var(--brand-primary)" }} />
        <h2 className="text-3xl font-black tracking-[0.02em] md:text-4xl">Get the Drop</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>
          Be the first to know about seasonal menus, events and exclusive evenings.
        </p>
        {submitted ? (
          <div
            className="mt-8 flex items-center justify-center gap-3 rounded-xl border p-6"
            style={{ background: "var(--status-success-10)", border: "1px solid var(--status-success)" }}
          >
            <Check style={{ color: "var(--status-success)" }} />
            <span className="font-medium uppercase tracking-[0.08em]">Thanks. You&apos;re on the list.</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@burgerjoint.co.za"
              className="flex-1 rounded-xl px-4 py-3 outline-none"
              style={{ background: "var(--ui-panel)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
            />
            <button
              type="submit"
              className="rounded-xl px-6 py-3 font-bold uppercase tracking-[0.12em]"
              style={{ background: "linear-gradient(135deg, var(--brand-primary), var(--status-warning))", color: "var(--brand-on-primary)" }}
            >
              Join the List
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
