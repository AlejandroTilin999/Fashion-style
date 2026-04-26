import { sanitizeText } from "../lib/sanitize";
import { isRequired } from "../lib/validators";

const PRODUCTS = [
  // {
  //   id: "p001",
  //   name: "Playera Oversize Negra",
  //   price: 249,
  //   category: "Playeras",
  //   sizes: ["CH", "M", "G", "XG"],
  //   image:
  //     "https://images.unsplash.com/photo-1520975958225-0b6815a0b5e8?auto=format&fit=crop&w=1200&q=70",
  //   description:
  //     "Corte oversize, algodón suave. Básico premium para combinar con todo.",
  // },
  // {
  //   id: "p002",
  //   name: "Sudadera Beige Minimal",
  //   price: 499,
  //   category: "Hoodies",
  //   sizes: ["M", "G", "XG"],
  //   image:
  //     "https://images.unsplash.com/photo-1520975693411-80e0d1f6d97b?auto=format&fit=crop&w=1200&q=70",
  //   description:
  //     "Sudadera minimal con felpa interna. Ideal para clima fresco.",
  // },
  {
    id: "p003",
    name: "Jeans Slim Azul",
    price: 599,
    category: "Pantalones",
    sizes: ["28", "30", "32", "34"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=70",
    description: "Denim elástico, ajuste slim. Look moderno sin perder comodidad.",
  },
  // {
  //   id: "p004",
  //   name: "Chamarra Denim",
  //   price: 799,
  //   category: "Chamarras",
  //   sizes: ["CH", "M", "G"],
  //   image:
  //     "https://images.unsplash.com/photo-1520975869010-1b1b7b4f2b04?auto=format&fit=crop&w=1200&q=70",
  //   description: "Clásica chamarra de mezclilla. Atemporal y resistente.",
  // },
  // {
  //   id: "p005",
  //   name: "Vestido Satinado",
  //   price: 699,
  //   category: "Vestidos",
  //   sizes: ["CH", "M", "G"],
  //   image:
  //     "https://images.unsplash.com/photo-1520975698145-9d0f2f7b8f17?auto=format&fit=crop&w=1200&q=70",
  //   description: "Acabado satinado, caída elegante. Perfecto para eventos.",
  // },
  {
    id: "p006",
    name: "Tenis Urban Blancos",
    price: 899,
    category: "Calzado",
    sizes: ["23", "24", "25", "26", "27"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=70",
    description: "Tenis urbanos, versátiles y cómodos para diario.",
  },
];

const FASHION_LABELS = [
  "Set Urbano",
  "Coleccion Studio",
  "Drop Street",
  "Linea Essentials",
  "Capsula Premium",
];

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function mapFakeStoreProduct(p) {
  const rawTitle = sanitizeText(p?.title ?? "Producto");
  const catSource = sanitizeText(p?.category ?? "").toLowerCase();
  const categoryMap = {
    electronics: "Accesorios",
    jewelery: "Accesorios",
    "men's clothing": "Moda Hombre",
    "women's clothing": "Moda Mujer",
  };
  const category = categoryMap[catSource] ?? "Moda";
  const title = `${FASHION_LABELS[Math.floor(Math.random() * FASHION_LABELS.length)]} - ${rawTitle
    .split(" ")
    .slice(0, 3)
    .join(" ")}`;
  const price = Number.isFinite(Number(p?.price)) ? Math.round(Number(p.price) * 20) : 399;
  const image = sanitizeText(p?.image ?? "/placeholder.svg");
  const id = `api_${sanitizeText(p?.id ?? "")}`;
  const desc = `Prenda seleccionada para estilo diario. ${sanitizeText(p?.description ?? "Producto de moda.")}`;

  const sizeSets = [
    ["CH", "M", "G", "XG"],
    ["28", "30", "32", "34"],
    ["23", "24", "25", "26", "27"],
  ];
  const sizes = sizeSets[Math.floor(Math.random() * sizeSets.length)];

  return { id, name: title, category, price, image, sizes, description: desc };
}

function buildMemberExclusive(base) {
  const output = [];
  base.slice(0, 8).forEach((p, i) => {
    output.push({
      ...p,
      id: `${p.id}_vip_${i + 1}`,
      name: `${p.name} (Edicion Miembro)`,
      price: Math.round(Number(p.price) * 0.92),
      description: `${p.description} Incluye acceso a preventa para miembros.`,
    });
  });
  return output;
}

function isCoherentProduct(product) {
  if (!product || typeof product !== "object") return false;
  if (!isRequired(product.id) || !isRequired(product.name) || !isRequired(product.category)) return false;
  if (!Number.isFinite(Number(product.price)) || Number(product.price) <= 0) return false;
  if (!Array.isArray(product.sizes) || product.sizes.length === 0) return false;
  return true;
}

export async function fetchProducts({ q, registered = false } = {}) {
  await delay(250);
  const query = sanitizeText(q).trim().toLowerCase();

  // ========================= API CONSUMIDA =========================
  // API real usada por el proyecto: Fake Store API
  // Endpoint principal: https://fakestoreapi.com/products
  // Documentacion: https://fakestoreapi.com/
  // ================================================================
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("API error");
    const apiList = (await res.json()).map(mapFakeStoreProduct).filter(isCoherentProduct);

    const merged = [...PRODUCTS.filter(isCoherentProduct), ...apiList];
    const visible = registered ? [...merged, ...buildMemberExclusive(merged)] : merged.slice(0, 10);
    if (!query) return visible;
    return visible.filter((p) =>
      `${p.name} ${p.category}`.toLowerCase().includes(query)
    );
  } catch {
    // fallback local (mock)
    const coherentLocal = PRODUCTS.filter(isCoherentProduct);
    const visible = registered ? [...coherentLocal, ...buildMemberExclusive(coherentLocal)] : coherentLocal;
    if (!query) return visible;
    return visible.filter((p) =>
      `${p.name} ${p.category}`.toLowerCase().includes(query)
    );
  }
}

export async function fetchProductById(id) {
  await delay(200);
  const safeId = sanitizeText(id).trim();
  const local = PRODUCTS.filter(isCoherentProduct).find((x) => x.id === safeId);
  if (local) return local;

  if (safeId.startsWith("api_")) {
    const numericId = safeId.replace("api_", "");
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${numericId}`);
      if (!res.ok) throw new Error("API not found");
      const mapped = mapFakeStoreProduct(await res.json());
      if (!isCoherentProduct(mapped)) throw new Error("INCOHERENT_PRODUCT_DATA");
      return mapped;
    } catch {
      // ignore, throw below
    }
  }

  const err = new Error("Producto no encontrado");
  err.code = "NOT_FOUND";
  throw err;
}

