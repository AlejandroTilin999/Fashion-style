import { useAuth } from "../auth/AuthContext";
import { downloadInvoicePdf, printInvoice, readInvoices } from "../lib/invoices";

export function Profile() {
  const { user, role } = useAuth();
  const invoices = readInvoices();

  const initials = (user?.displayName ?? user?.email ?? "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Perfil</h1>
          <p className="muted">Datos de sesión (Firebase Auth) + rol desde Firestore.</p>
        </div>
      </div>

      <div className="profileShell">
        <section className="profileCard">
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <div className="stackSm">
            <strong className="profileName">{user?.displayName ?? "—"}</strong>
            <span className="tag">{role ?? "—"}</span>
            <span className="muted small">{user?.email ?? "—"}</span>
          </div>
        </section>

        <section className="card">
          <h2 style={{ marginTop: 0 }}>Detalles</h2>
          <div className="grid2">
            <div>
              <p className="muted small">UID</p>
              <p className="mono small">{user?.uid ?? "—"}</p>
            </div>
            <div>
              <p className="muted small">Proveedor</p>
              <p><strong>Email/Password</strong></p>
            </div>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="row space">
          <h2 style={{ margin: 0 }}>Facturas en perfil</h2>
          <span className="tag">{invoices.length}</span>
        </div>
        {invoices.length === 0 ? (
          <p className="muted">Aún no tienes facturas. Genéralas desde carrito.</p>
        ) : (
          <div className="stackSm">
            {invoices.slice(0, 8).map((f) => (
              <article key={f.number} className="invoiceMini">
                <div className="row space">
                  <strong>{f.number}</strong>
                  <span className="muted small">{f.date}</span>
                </div>
                <p className="muted small">Total: ${Number(f.total ?? 0).toFixed(2)}</p>
                <div className="row">
                  <button className="btn ghost" onClick={() => downloadInvoicePdf(f)}>
                    Descargar PDF
                  </button>
                  <button className="btn ghost" onClick={() => printInvoice(f)}>
                    Imprimir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

