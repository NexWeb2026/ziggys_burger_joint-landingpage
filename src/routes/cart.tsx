import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, Send, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/siteConfig";
import { formatMoney, useCart } from "@/lib/cart";
import { useOpenStatus } from "@/lib/hooks";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: `Cart - ${siteConfig.restaurantName}` },
      { name: "description", content: `Review your ${siteConfig.restaurantName} order and send it through WhatsApp.` },
      { property: "og:title", content: `Cart - ${siteConfig.restaurantName}` },
      { property: "og:description", content: "Build your burger order and send it straight to the team." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { isOpenNow, today, nextOpen } = useOpenStatus();
  const {
    items,
    totalQuantity,
    totalPriceCents,
    note,
    customerName,
    updateQuantity,
    updateItemNotes,
    removeItem,
    clearCart,
    setNote,
    setCustomerName,
  } = useCart();

  const hasUnpricedItems = items.some((item) => !item.product.hasListedPrice);

  const submitOrder = () => {
    if (items.length === 0) {
      toast.info("Your cart is empty. Add a few favourites first.");
      void navigate({ to: "/menu" });
      return;
    }

    if (!isOpenNow) {
      toast.error(
        today?.isOpen
          ? `Ordering is closed right now. Today's hours are ${today.openTime}-${today.closeTime}.`
          : `Ordering is closed today. Back ${nextOpen?.day ?? "soon"}.`,
      );
      return;
    }

    if (!siteConfig.contact.whatsapp) {
      toast.error("WhatsApp ordering is unavailable right now.");
      return;
    }

    window.open(buildWhatsAppOrderUrl({ items, totalPriceCents, note, customerName, hasUnpricedItems }), "_blank", "noopener,noreferrer");
    clearCart();
    toast.success("Order sent. We'll pick it up on WhatsApp.");
    void navigate({ to: "/" });
  };

  if (items.length === 0) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border p-8 text-center" style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}>
          <ShoppingBag size={42} className="mx-auto mb-4" style={{ color: "var(--brand-primary)" }} />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Cart</p>
          <h1 className="text-4xl font-black tracking-[0.02em]">Your Cart Is Empty</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>
            Start with the menu, add your favourites, then come back here to send your order.
          </p>
          <Link
            to="/menu"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-black uppercase tracking-[0.12em] transition-colors hover:bg-[var(--brand-primary-strong)]"
            style={{ background: "var(--brand-primary)", color: "var(--brand-on-primary)" }}
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/menu" className="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] hover:underline" style={{ color: "var(--ui-text-muted)" }}>
          <ArrowLeft size={16} />
          Back to menu
        </Link>

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: "var(--brand-primary)" }}>Order Cart</p>
          <h1 className="text-4xl font-black tracking-[0.02em] md:text-5xl">Review Your Order</h1>
          <p className="mt-3 text-sm uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-muted)" }}>
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"} ready for WhatsApp checkout.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.product.id} className="rounded-2xl border p-4 md:p-5" style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}>
                <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
                  <div className="h-24 overflow-hidden rounded-xl" style={{ background: "var(--ui-panel-alt)" }}>
                    {item.product.image ? (
                      <img src={item.product.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <ShoppingBag size={22} style={{ color: "var(--brand-primary)" }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "var(--ui-text-subtle)" }}>{item.product.category}</p>
                        <h2 className="text-2xl font-black tracking-[0.02em]">{item.product.name}</h2>
                        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--ui-text-muted)" }}>{item.product.description}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-lg font-black" style={{ color: "var(--brand-primary)" }}>
                          {item.product.hasListedPrice ? formatMoney(item.product.unitPriceCents * item.quantity) : "Ask price"}
                        </div>
                        <div className="text-xs uppercase tracking-[0.08em]" style={{ color: "var(--ui-text-subtle)" }}>
                          {item.product.hasListedPrice ? `${item.product.price} each` : "Price on request"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-full border" style={{ borderColor: "var(--ui-border-strong)" }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="grid h-10 w-10 place-items-center transition-colors hover:bg-[var(--brand-primary-opaque-12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                          aria-label={`Decrease ${item.product.name} quantity`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-10 text-center text-sm font-black" aria-label={`${item.quantity} selected`}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="grid h-10 w-10 place-items-center transition-colors hover:bg-[var(--brand-primary-opaque-12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                          aria-label={`Increase ${item.product.name} quantity`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          removeItem(item.product.id);
                          toast.info(`${item.product.name} removed`);
                        }}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[var(--brand-primary-opaque-12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                        style={{ borderColor: "var(--ui-border-strong)", color: "var(--ui-text-muted)" }}
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>

                    <label className="mt-4 block">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--ui-text-muted)" }}>Item note</span>
                      <input
                        value={item.notes}
                        onChange={(event) => updateItemNotes(item.product.id, event.target.value)}
                        placeholder="No onions, extra sauce..."
                        className="w-full rounded-xl px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                        style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
                      />
                    </label>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border p-5 lg:sticky lg:top-24" style={{ background: "var(--ui-panel)", borderColor: "var(--ui-border)" }}>
            <h2 className="text-2xl font-black tracking-[0.02em]">Order Details</h2>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--ui-text-muted)" }}>Name optional</span>
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="w-full rounded-xl px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                  style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--ui-text-muted)" }}>Order notes optional</span>
                <textarea
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Pickup time, special requests, allergies..."
                  className="w-full resize-none rounded-xl px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                  style={{ background: "var(--ui-panel-alt)", border: "1px solid var(--ui-border-strong)", color: "var(--ui-text)" }}
                />
              </label>
            </div>

            <div className="my-5 border-t" style={{ borderColor: "var(--ui-border)" }} />

            <div className="space-y-2 text-sm" style={{ color: "var(--ui-text-muted)" }}>
              <div className="flex justify-between gap-3">
                <span>Items</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between gap-3 text-lg font-black" style={{ color: "var(--ui-text)" }}>
                <span>Total</span>
                <span>{formatMoney(totalPriceCents)}</span>
              </div>
              {hasUnpricedItems && (
                <p className="text-xs leading-relaxed" style={{ color: "var(--ui-text-subtle)" }}>
                  Some items do not have listed prices and will be confirmed on WhatsApp.
                </p>
              )}
              {!isOpenNow && (
                <p className="rounded-xl border p-3 text-xs font-bold uppercase tracking-[0.08em]" style={{ background: "var(--brand-primary-opaque-12)", borderColor: "var(--brand-primary)", color: "var(--ui-text)" }}>
                  {today?.isOpen ? `Closed now. Open today ${today.openTime}-${today.closeTime}.` : `Closed today. Back ${nextOpen?.day ?? "soon"}.`}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={submitOrder}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-black uppercase tracking-[0.12em] transition-colors hover:bg-[var(--brand-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              style={{
                background: isOpenNow ? "var(--brand-primary)" : "var(--ui-panel-alt)",
                color: isOpenNow ? "var(--brand-on-primary)" : "var(--ui-text-muted)",
                border: isOpenNow ? "1px solid var(--brand-primary)" : "1px solid var(--ui-border-strong)",
              }}
            >
              <Send size={17} />
              {isOpenNow ? "Send on WhatsApp" : "Ordering Closed"}
            </button>
            <button
              type="button"
              onClick={() => {
                clearCart();
                toast.info("Cart cleared");
              }}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl border px-4 text-xs font-black uppercase tracking-[0.12em] transition-colors hover:bg-[var(--brand-primary-opaque-12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              style={{ borderColor: "var(--ui-border-strong)", color: "var(--ui-text-muted)" }}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function buildWhatsAppOrderUrl({
  items,
  totalPriceCents,
  note,
  customerName,
  hasUnpricedItems,
}: Pick<ReturnType<typeof useCart>, "items" | "totalPriceCents" | "note" | "customerName"> & { hasUnpricedItems: boolean }) {
  const lines = [
    `Hi ${siteConfig.restaurantName}, I'd like to place an order:`,
    "",
    ...items.flatMap((item, index) => [
      `${index + 1}. ${item.quantity} x ${item.product.name}`,
      `   ${item.product.hasListedPrice ? formatMoney(item.product.unitPriceCents * item.quantity) : "Price on request"}`,
      item.notes ? `   Note: ${item.notes}` : "",
    ]).filter(Boolean),
    "",
    `Total: ${formatMoney(totalPriceCents)}${hasUnpricedItems ? " plus items to confirm" : ""}`,
    customerName.trim() ? `Name: ${customerName.trim()}` : "",
    note.trim() ? `Order notes: ${note.trim()}` : "",
  ].filter(Boolean);

  return `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(lines.join("\n"))}`;
}
