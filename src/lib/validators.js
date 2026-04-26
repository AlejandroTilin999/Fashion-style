export function isRequired(value) {
  return String(value ?? "").trim().length > 0;
}

export function isEmail(value) {
  const v = String(value ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isStrongPassword(value) {
  const v = String(value ?? "");
  // mínimo 8, mayúscula, minúscula, número
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
}

export function isValidName(value) {
  const v = String(value ?? "").trim();
  // letras (incluye acentos), espacios y guiones, 2-40 chars
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]{2,40}$/.test(v);
}

export function isValidRole(value) {
  return value === "admin" || value === "user";
}

export function isValidCartItem(item) {
  if (!item || typeof item !== "object") return false;
  const hasId = isRequired(item.id);
  const hasName = isRequired(item.name);
  const hasSize = isRequired(item.size);
  const qty = Number(item.qty);
  const price = Number(item.price);
  return hasId && hasName && hasSize && Number.isFinite(qty) && qty > 0 && Number.isFinite(price) && price >= 0;
}

export function isCoherentOrderPayload({ uid, email, items, total }) {
  if (!isRequired(uid) || !isEmail(email)) return false;
  if (!Array.isArray(items) || items.length === 0) return false;
  if (!items.every(isValidCartItem)) return false;

  const computed = items.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);
  const safeTotal = Number(total);
  return Number.isFinite(safeTotal) && Math.abs(computed - safeTotal) < 0.001;
}

