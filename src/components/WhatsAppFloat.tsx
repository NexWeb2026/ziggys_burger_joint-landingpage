import { siteConfig } from "@/siteConfig";
import { isFilled, setImageFallback } from "@/lib/utils";

export function WhatsAppFloat() {
  if (!siteConfig.integrations.whatsappEnabled || !isFilled(siteConfig.socials.whatsappChannelUrl)) return null;
  return (
    <a
      href={siteConfig.socials.whatsappChannelUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="WhatsApp"
      className="fixed bottom-20 lg:bottom-6 right-4 z-30 rounded-full shadow-2xl p-3 hover:scale-110 transition-transform"
      style={{ background: "var(--brand-primary)" }}
    >
      <img
        src={siteConfig.iconAssets.whatsappBlack}
        alt="WhatsApp"
        width={28}
        height={28}
        onError={(event) => setImageFallback(event, siteConfig.iconAssets.whatsapp)}
      />
    </a>
  );
}
