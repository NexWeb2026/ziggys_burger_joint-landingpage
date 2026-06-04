import { Link } from "@tanstack/react-router";
import { useOpenStatus } from "@/lib/hooks";
import { siteConfig } from "@/siteConfig";
import { Sparkles, Moon } from "lucide-react";

export function StickyBanner() {
  if (!siteConfig.sections.banner) return null;
  const { isOpenNow, today, nextOpen } = useOpenStatus();

  return (
    <div
      className="w-full border-b text-sm py-2 px-4 text-center"
      style={{
        background: "linear-gradient(90deg, var(--brand-primary), var(--status-warning))",
        color: "var(--brand-on-primary)",
        borderColor: "var(--brand-primary-strong)",
      }}
    >
      {isOpenNow && today ? (
        <Link to="/contact" className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.12em] hover:underline">
          <Sparkles size={16} />
          Open now. Get a table: {today.openTime}-{today.closeTime}.
        </Link>
      ) : (
        <Link to="/contact" hash="find-us" className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.12em] hover:underline">
          <Moon size={16} />
          {today?.isOpen
            ? `Closed right now. Open today from ${today.openTime}-${today.closeTime}.`
            : `Closed today. Back ${nextOpen?.day ?? "soon"}.`} Check the hours.
        </Link>
      )}
    </div>
  );
}
