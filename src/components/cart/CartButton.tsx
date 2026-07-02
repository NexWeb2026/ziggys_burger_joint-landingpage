import { useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

export function CartButton({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const { totalQuantity } = useCart();

  const openCart = () => {
    if (totalQuantity === 0) {
      toast.info("Your cart is empty. Pick something tasty from the menu first.");
      void navigate({ to: "/menu" });
      return;
    }
    void navigate({ to: "/cart" });
  };

  return (
    <button
      type="button"
      onClick={openCart}
      className={
        compact
          ? "relative flex min-h-[58px] flex-1 flex-col items-center gap-1 py-3 text-xs font-bold uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
          : "relative inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-black uppercase tracking-[0.12em] transition-colors hover:bg-[var(--brand-primary-opaque-12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      }
      style={{ color: "var(--ui-text)", borderColor: "var(--ui-border-strong)" }}
      aria-label={totalQuantity > 0 ? `Open cart with ${totalQuantity} items` : "Open empty cart"}
    >
      <span className="relative">
        <ShoppingBag size={compact ? 20 : 17} style={{ color: "var(--brand-primary)" }} aria-hidden="true" />
        {totalQuantity > 0 && (
          <span
            className="absolute -right-2 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-black leading-none"
            style={{ background: "var(--status-warning)", color: "var(--ui-page)" }}
          >
            {totalQuantity}
          </span>
        )}
      </span>
      Cart
    </button>
  );
}
