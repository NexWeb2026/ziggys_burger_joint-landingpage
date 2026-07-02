import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { MenuEntry } from "@/siteConfig";
import { useCart } from "@/lib/cart";

export function AddToCartButton({ item }: { item: MenuEntry }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addItem(item);
        toast.success(`${item.name} added to cart`);
      }}
      className="mt-3 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] transition-colors hover:bg-[var(--brand-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      style={{ background: "var(--brand-primary)", color: "var(--brand-on-primary)" }}
    >
      <Plus size={14} aria-hidden="true" />
      Add to Cart
    </button>
  );
}
