import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../mock/productsApi";
import { useCart } from "../cart/CartContext";
import { sanitizeText } from "../lib/sanitize";
import { NotFoundState } from "../components/NotFoundState";

export function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const safeId = useMemo(() => sanitizeText(id), [id]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchProductById(safeId)
      .then((p) => {
        if (!alive) return;
        setProduct(p);
        setSize(p.sizes?.[0] ?? "");
      })
      .catch(() => {
        if (!alive) return;
        setError("Producto no encontrado.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [safeId]);

  const onAdd = () => {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, size, qty });
    setPulse(true);
    window.setTimeout(() => setPulse(false), 250);
  };

  if (loading) return <div className="skeleton">Cargando…</div>;
  if (error) {
    return (
      <NotFoundState
        title="404 Producto"
        message="Este producto no está registrado o ya no está disponible."
        ctaTo="/productos"
        ctaLabel="Ir a productos"
      />
    );
  }
  if (!product) return null;

  return (
    <div className="detail">
      <div className="detailMedia">
        <img src={product.image} alt={product.name} className="detailImg" />
      </div>
      <div className="detailInfo">
        <h1 className="h1">{product.name}</h1>
        <p className="muted">{product.description}</p>
        <div className="row space">
          <span className="tag">{product.category}</span>
          <span className="price big">${product.price}</span>
        </div>

        <div className="row">
          <label className="field inline">
            <span>Talla</span>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="field inline">
            <span>Cantidad</span>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            />
          </label>
        </div>

        <div className="row">
          <button className={`btn ${pulse ? "pulse" : ""}`} onClick={onAdd}>
            Agregar al carrito
          </button>
          <Link className="btn ghost" to="/carrito">
            Ver carrito
          </Link>
        </div>
      </div>
    </div>
  );
}

