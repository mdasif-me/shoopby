export type CartProductSelection = {
  slug: string;
  name: string;
  image: string;
  price: number;
  colorName: string;
  colorValue: string;
  size: string;
  quantity: number;
};

export type CartItem = CartProductSelection & {
  key: string;
};

export type CartStorage = {
  items: CartItem[];
  promoCode: string | null;
  directCheckoutItem?: CartItem | null;
};

export type CartTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

export function createCartItemKey(item: CartProductSelection) {
  return [item.slug, item.colorValue, item.size].join(":");
}

function isCartProductSelection(value: unknown): value is CartProductSelection {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<CartProductSelection>;

  return (
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    typeof item.colorName === "string" &&
    typeof item.colorValue === "string" &&
    typeof item.size === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

export function isCartItem(value: unknown): value is CartItem {
  return (
    isCartProductSelection(value) &&
    "key" in value &&
    typeof value.key === "string"
  );
}

function normalizeCartItem(value: unknown): CartItem | null {
  if (isCartItem(value)) return value;
  if (!isCartProductSelection(value)) return null;
  return { ...value, key: createCartItemKey(value) };
}

export function normalizeCartStorage(value: unknown): CartStorage | null {
  if (Array.isArray(value)) {
    const items = value
      .map(normalizeCartItem)
      .filter((item): item is CartItem => item !== null);
    return { items, promoCode: null, directCheckoutItem: null };
  }

  if (typeof value !== "object" || value === null) return null;
  const storage = value as Partial<CartStorage>;
  if (!Array.isArray(storage.items)) return null;

  const items = storage.items
    .map(normalizeCartItem)
    .filter((item): item is CartItem => item !== null);
  const directCheckoutItem =
    storage.directCheckoutItem == null
      ? null
      : normalizeCartItem(storage.directCheckoutItem);

  return {
    items,
    promoCode: storage.promoCode === "SAVE20" ? "SAVE20" : null,
    directCheckoutItem,
  };
}

export function calculateCartTotals(
  items: CartItem[],
  promoCode: string | null,
): CartTotals {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount =
    promoCode === "SAVE20" && subtotal > 0 ? Math.round(subtotal * 0.2) : 0;
  const shipping = items.length > 0 ? 15 : 0;

  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
  };
}
