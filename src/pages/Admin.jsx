import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function Admin() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const logsQ = query(collection(db, "logs"), orderBy("createdAt", "desc"), limit(20));
        const ordersQ = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(20));
        const [logsSnap, ordersSnap] = await Promise.all([getDocs(logsQ), getDocs(ordersQ)]);
        if (!alive) return;
        setLogs(logsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setOrders(ordersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        if (!alive) return;
        setError("No se pudo cargar el panel admin.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Panel Admin</h1>
          <p className="muted">Vista solo para rol Admin (rutas protegidas).</p>
        </div>
      </div>

      {error ? <div className="alert">{error}</div> : null}
      {loading ? <div className="skeleton">Cargando panel…</div> : null}

      <div className="grid2">
        <section className="card">
          <h2>Logs (últimos 20)</h2>
          <div className="stackSm">
            {logs.map((l) => (
              <div key={l.id} className="row space">
                <span className="tag">{l.type}</span>
                <span className="muted small">{l.email ?? l.where ?? "—"}</span>
              </div>
            ))}
            {logs.length === 0 && !loading ? <p className="muted">Sin logs.</p> : null}
          </div>
        </section>

        <section className="card">
          <h2>Pedidos (últimos 20)</h2>
          <div className="stackSm">
            {orders.map((o) => (
              <div key={o.id} className="row space">
                <strong className="mono small">{o.id.slice(0, 10)}</strong>
                <span className="muted small">${o.total ?? 0}</span>
              </div>
            ))}
            {orders.length === 0 && !loading ? <p className="muted">Sin pedidos.</p> : null}
          </div>
        </section>
      </div>
    </div>
  );
}

