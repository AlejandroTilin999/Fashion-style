const INVOICE_KEY = "moda_invoices_v1";

function readInvoices() {
  try {
    const raw = localStorage.getItem(INVOICE_KEY);
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function Invoices() {
  const invoices = readInvoices();

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Facturas</h1>
          <p className="muted">Historial local de facturas generadas desde carrito.</p>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="card">
          <p>Aún no tienes facturas. Genera una desde el carrito.</p>
        </div>
      ) : (
        <div className="stackSm">
          {invoices.map((f) => (
            <article key={f.number} className="invoiceMini">
              <div className="row space">
                <strong>{f.number}</strong>
                <span className="tag">{f.date}</span>
              </div>
              <p className="muted small">Cliente: {f.customerName}</p>
              <p className="muted small">Total: ${f.total.toFixed(2)}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

