"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  createCartItemKey,
  normalizeCartStorage,
  type CartItem,
  type CartProductSelection,
  type CartStorage,
} from "@/lib/cart/cart-types";

const storageKey = "shoopby-cart";
const changeEvent = "shoopby-cart-change";
const emptyCart: CartStorage = {
  items: [],
  promoCode: null,
  directCheckoutItem: null,
};
const emptySnapshot = JSON.stringify(emptyCart);
let memorySnapshot = emptySnapshot;
let persistenceUnavailable = false;
let invalidStorageReported = false;
const subscribeReady = () => () => {};
const getReadySnapshot = () => true;
const getServerReadySnapshot = () => false;

type CartContextValue = {
  items: CartItem[];
  checkoutItems: CartItem[];
  itemCount: number;
  isReady: boolean;
  promoCode: string | null;
  addItem: (item: CartProductSelection) => void;
  buyNow: (item: CartProductSelection) => void;
  clearDirectPurchase: () => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  clearPromoCode: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function getSnapshot() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      if (persistenceUnavailable) return memorySnapshot;
      memorySnapshot = emptySnapshot;
      return emptySnapshot;
    }

    const parsed: unknown = JSON.parse(stored);
    const normalized = normalizeCartStorage(parsed);
    if (normalized) {
      return JSON.stringify(normalized);
    }

    if (!invalidStorageReported) {
      console.warn("Saved cart data could not be restored and was reset.");
      invalidStorageReported = true;
    }
    memorySnapshot = emptySnapshot;
    return emptySnapshot;
  } catch (error) {
    persistenceUnavailable = true;
    console.error("Unable to read the shopping cart.", error);
  }

  return memorySnapshot;
}

function getServerSnapshot() {
  return emptySnapshot;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function readCurrentCart(): CartStorage {
  const parsed: unknown = JSON.parse(getSnapshot());
  return normalizeCartStorage(parsed) ?? emptyCart;
}

function updateCart(update: (current: CartStorage) => CartStorage) {
  const next = update(readCurrentCart());
  memorySnapshot = JSON.stringify(next);

  try {
    window.localStorage.setItem(storageKey, memorySnapshot);
    persistenceUnavailable = false;
  } catch (error) {
    persistenceUnavailable = true;
    console.error("Unable to save the shopping cart.", error);
  }

  window.dispatchEvent(new Event(changeEvent));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isReady = useSyncExternalStore(
    subscribeReady,
    getReadySnapshot,
    getServerReadySnapshot,
  );
  const cart = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(snapshot);
      return normalizeCartStorage(parsed) ?? emptyCart;
    } catch (error) {
      console.error("Unable to parse shopping cart data.", error);
      return emptyCart;
    }
  }, [snapshot]);

  const addItem = useCallback((selection: CartProductSelection) => {
    const key = createCartItemKey(selection);
    updateCart((current) => {
      const existing = current.items.find((item) => item.key === key);
      if (existing) {
        return {
          ...current,
          directCheckoutItem: null,
          items: current.items.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + selection.quantity }
              : item,
          ),
        };
      }

      return {
        ...current,
        directCheckoutItem: null,
        items: [...current.items, { ...selection, key }],
      };
    });
  }, []);

  const buyNow = useCallback((selection: CartProductSelection) => {
    const key = createCartItemKey(selection);
    updateCart((current) => ({
      ...current,
      directCheckoutItem: { ...selection, key },
    }));
  }, []);

  const clearDirectPurchase = useCallback(() => {
    updateCart((current) => ({ ...current, directCheckoutItem: null }));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) return;
    updateCart((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.key === key ? { ...item, quantity } : item,
      ),
    }));
  }, []);

  const removeItem = useCallback((key: string) => {
    updateCart((current) => {
      const items = current.items.filter((item) => item.key !== key);
      return {
        ...current,
        items,
        promoCode: items.length > 0 ? current.promoCode : null,
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    updateCart(() => emptyCart);
  }, []);

  const applyPromoCode = useCallback((code: string) => {
    if (code.trim().toUpperCase() !== "SAVE20") return false;
    updateCart((current) => ({ ...current, promoCode: "SAVE20" }));
    return true;
  }, []);

  const clearPromoCode = useCallback(() => {
    updateCart((current) => ({ ...current, promoCode: null }));
  }, []);

  const value = useMemo(
    () => ({
      items: cart.items,
      checkoutItems: cart.directCheckoutItem
        ? [cart.directCheckoutItem]
        : cart.items,
      itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
      isReady,
      promoCode: cart.promoCode,
      addItem,
      buyNow,
      clearDirectPurchase,
      setQuantity,
      removeItem,
      clearCart,
      applyPromoCode,
      clearPromoCode,
    }),
    [
      cart,
      isReady,
      addItem,
      buyNow,
      clearDirectPurchase,
      setQuantity,
      removeItem,
      clearCart,
      applyPromoCode,
      clearPromoCode,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }
  return context;
}
