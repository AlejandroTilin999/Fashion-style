import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { sanitizeText } from "../lib/sanitize";

const CartContext = createContext(null);
const STORAGE_KEY = "moda_cart_v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return Array.isArray(safeParse(raw, [])) ? safeParse(raw, []) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(
    () => ({
      items,
      addItem({ id, name, price, size, qty = 1 }) {
        const safeId = sanitizeText(id);
        const safeName = sanitizeText(name);
        const safeSize = sanitizeText(size);
        const safeQty = Number.isFinite(Number(qty)) ? Math.max(1, Number(qty)) : 1;
        const safePrice = Number.isFinite(Number(price)) ? Math.max(0, Number(price)) : 0;

        setItems((prev) => {
          const idx = prev.findIndex((x) => x.id === safeId && x.size === safeSize);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + safeQty };
            return copy;
          }
          return [...prev, { id: safeId, name: safeName, price: safePrice, size: safeSize, qty: safeQty }];
        });
      },
      removeItem({ id, size }) {
        const safeId = sanitizeText(id);
        const safeSize = sanitizeText(size);
        setItems((prev) => prev.filter((x) => !(x.id === safeId && x.size === safeSize)));
      },
      clear() {
        setItems([]);
      },
      total() {
        return items.reduce((acc, it) => acc + it.price * it.qty, 0);
      },
      itemCount() {
        return items.reduce((acc, it) => acc + Number(it.qty || 0), 0);
      },
    }),
    [items]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

