import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../mock/productsApi";
import { sanitizeText } from "../lib/sanitize";
import { NotFoundState } from "../components/NotFoundState";
import { useAuth } from "../auth/AuthContext";

export function Products() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const safeQ = useMemo(() => sanitizeText(q), [q]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchProducts({ q: safeQ, registered: Boolean(user) })
      .then((data) => {
        if (!alive) return;
        setProducts(data);
      })
      .catch(() => {
        if (!alive) return;
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [safeQ, user]);

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Productos</h1>
          <p className="muted">
            Consume <strong>Fake Store API</strong> (online) y hace fallback a mock/local (offline).
          </p>
          {user ? (
            <p className="muted small">Modo miembro activo: catálogo ampliado + ediciones exclusivas.</p>
          ) : (
            <p className="muted small">Vista invitado: catálogo reducido. Regístrate para ver más colecciones.</p>
          )}
        </div>
        <div className="search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar (playera, hoodie, jeans...)"
            aria-label="Buscar productos"
          />
        </div>
      </div>

      {error ? <div className="alert">{error}</div> : null}
      {loading ? <div className="skeleton">Cargando productos…</div> : null}
      {!loading && !error && products.length === 0 ? (
        <NotFoundState
          title="404 Producto"
          message={`No hay productos registrados con "${safeQ}". Prueba otra búsqueda.`}
          ctaTo="/productos"
          ctaLabel="Ver todo el catálogo"
          onCta={() => setQ("")}
        />
      ) : null}

      {!user ? (
        <div className="card">
          <p className="muted">
            Puedes explorar el catálogo. Para abrir un producto y comprar, primero regístrate.
          </p>
        </div>
      ) : null}

      <div className="gridCards">
        {products.map((p) => (
          <Link key={p.id} to={user ? `/productos/${p.id}` : "/registro"} className="productCard">
            <img src={p.image} alt={p.name} className="productImg" />
            <div className="productBody">
              <div className="row space">
                <strong>{p.name}</strong>
                <span className="price">${p.price}</span>
              </div>
              <span className="tag">{p.category}</span>
              <p className="muted clamp">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

