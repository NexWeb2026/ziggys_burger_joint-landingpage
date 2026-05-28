import { siteConfig } from "@/siteConfig";
import { isFilled, setImageFallback } from "@/lib/utils";

type Variant = "color" | "black";

export function SocialIcons({ variant = "color", size = 20 }: { variant?: Variant; size?: number }) {
  if (!siteConfig.integrations.socialLinksEnabled) return null;
  const i = siteConfig.iconAssets;
  const items = [
    { url: siteConfig.socials.instagram, src: variant === "color" ? i.instagram : i.instagramBlack, alt: "Instagram" },
    { url: siteConfig.socials.facebook, src: variant === "color" ? i.facebook : i.facebookBlack, alt: "Facebook" },
    { url: siteConfig.socials.tiktok, src: variant === "color" ? i.tiktok : i.tiktokBlack, alt: "TikTok" },
  ].filter((item) => isFilled(item.url) && isFilled(item.src));
  return (
    <div className="flex items-center gap-3">
      {items.map((it) => (
        <a
          key={it.alt}
          href={it.url}
          target="_blank"
          rel="noreferrer noopener"
          className="opacity-90 transition duration-200 hover:-translate-y-0.5 hover:opacity-100"
          aria-label={it.alt}
        >
          <img
            src={it.src}
            alt={it.alt}
            width={size}
            height={size}
            loading="lazy"
            onError={(event) => setImageFallback(event, variant === "color" ? siteConfig.iconAssets.whatsapp : siteConfig.iconAssets.whatsappBlack)}
          />
        </a>
      ))}
    </div>
  );
}
