import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { MenuEntry } from "@/siteConfig";

const CART_STORAGE_KEY = "ziggys-cart-v1";

export type CartProduct = Pick<MenuEntry, "name" | "description" | "price" | "category" | "image"> & {
  id: string;
  unitPriceCents: number;
  hasListedPrice: boolean;
};

export type CartItem = {
  product: CartProduct;
  quantity: number;
  notes: string;
};

type PersistedCart = {
  items: CartItem[];
  note: string;
  customerName: string;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  totalPriceCents: number;
  note: string;
  customerName: string;
  addItem: (entry: MenuEntry) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
  setNote: (note: string) => void;
  setCustomerName: (name: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function parsePriceToCents(price: string): number {
  const compact = price.replace(/[^\d.,-]/g, "");
  const lastSeparator = Math.max(compact.lastIndexOf("."), compact.lastIndexOf(","));
  const normalized =
    lastSeparator >= 0 && compact.length - lastSeparator <= 3
      ? `${compact.slice(0, lastSeparator).replace(/[.,]/g, "")}.${compact.slice(lastSeparator + 1).replace(/[.,]/g, "")}`
      : compact.replace(/[.,]/g, "");
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.round(value * 100);
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function menuEntryToProduct(entry: MenuEntry): CartProduct {
  const unitPriceCents = parsePriceToCents(entry.price);
  return {
    id: `${entry.category}:${entry.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: entry.name,
    description: entry.description,
    price: entry.price,
    category: entry.category,
    image: entry.image,
    unitPriceCents,
    hasListedPrice: unitPriceCents > 0,
  };
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CartItem;
  return (
    typeof item.quantity === "number" &&
    item.quantity > 0 &&
    Number.isFinite(item.quantity) &&
    typeof item.notes === "string" &&
    Boolean(item.product) &&
    typeof item.product.id === "string" &&
    typeof item.product.name === "string" &&
    typeof item.product.description === "string" &&
    typeof item.product.price === "string" &&
    typeof item.product.category === "string" &&
    typeof item.product.image === "string" &&
    typeof item.product.unitPriceCents === "number" &&
    typeof item.product.hasListedPrice === "boolean"
  );
}

function loadPersistedCart(): PersistedCart {
  if (typeof window === "undefined") return { items: [], note: "", customerName: "" };

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [], note: "", customerName: "" };
    const parsed = JSON.parse(raw) as Partial<PersistedCart>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items.filter(isCartItem) : [],
      note: typeof parsed.note === "string" ? parsed.note : "",
      customerName: typeof parsed.customerName === "string" ? parsed.customerName : "",
    };
  } catch {
    return { items: [], note: "", customerName: "" };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [note, setNote] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadPersistedCart();
    setItems(persisted.items);
    setNote(persisted.note);
    setCustomerName(persisted.customerName);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, note, customerName }));
  }, [hydrated, items, note, customerName]);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPriceCents = items.reduce((sum, item) => sum + item.product.unitPriceCents * item.quantity, 0);

    return {
      items,
      totalQuantity,
      totalPriceCents,
      note,
      customerName,
      addItem: (entry) => {
        const product = menuEntryToProduct(entry);
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }
          return [...current, { product, quantity: 1, notes: "" }];
        });
      },
      removeItem: (productId) => setItems((current) => current.filter((item) => item.product.id !== productId)),
      updateQuantity: (productId, quantity) => {
        setItems((current) => {
          if (quantity <= 0) return current.filter((item) => item.product.id !== productId);
          return current.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.min(Math.floor(quantity), 99) } : item,
          );
        });
      },
      updateItemNotes: (productId, notes) => {
        setItems((current) => current.map((item) => (item.product.id === productId ? { ...item, notes } : item)));
      },
      clearCart: () => {
        setItems([]);
        setNote("");
        setCustomerName("");
      },
      setNote,
      setCustomerName,
    };
  }, [items, note, customerName]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
