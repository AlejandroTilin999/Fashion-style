import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";
import { isCoherentOrderPayload } from "../lib/validators";

export function Orders() {
  const { user } = useAuth();
  const { items, total, clear } = useCart();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const q = query(
        collection(db, "orders"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setError("No se pudieron cargar tus pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createOrder = async () => {
    if (items.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const payload = {
        uid: user.uid,
        email: user.email ?? "",
        items,
        total: total(),
        status: "creado",
        createdAt: serverTimestamp(),
      };

      // Backend simulado: coherencia de datos antes de persistir
      if (!isCoherentOrderPayload(payload)) {
        throw new Error("ORDER_COHERENCE_ERROR");
      }

      await addDoc(collection(db, "orders"), payload);
      clear();
      await load();
    } catch {
      setError("No se pudo crear el pedido. Datos incoherentes o error de conexión.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Pedidos</h1>
          <p className="muted">Guardados en Firestore (backend real) + sesión.</p>
        </div>
        <button className="btn" disabled={busy || items.length === 0} onClick={createOrder}>
          {busy ? "Creando…" : items.length === 0 ? "Carrito vacío" : `Crear pedido ($${total()})`}
        </button>
      </div>

      {error ? <div className="alert">{error}</div> : null}
      {loading ? <div className="skeleton">Cargando pedidos…</div> : null}

      <div className="stackSm">
        {orders.map((o) => (
          <div key={o.id} className="card">
            <div className="row space">
              <strong>Pedido #{o.id.slice(0, 8).toUpperCase()}</strong>
              <span className="tag">{o.status ?? "—"}</span>
            </div>
            <div className="muted small">Total: ${o.total ?? 0}</div>
            <div className="muted small">Items: {Array.isArray(o.items) ? o.items.length : 0}</div>
          </div>
        ))}
        {!loading && orders.length === 0 ? (
          <div className="card">
            <p>No tienes pedidos todavía.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

