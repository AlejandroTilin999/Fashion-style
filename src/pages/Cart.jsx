import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";
import { GuestAccess } from "./GuestAccess";
import { sanitizeText } from "../lib/sanitize";
import { downloadInvoicePdf, printInvoice, saveInvoice } from "../lib/invoices";

export function Cart() {
  const { items, removeItem, clear, total } = useCart();
  const { user } = useAuth();
  const [invoice, setInvoice] = useState(null);
  if (!user) return <GuestAccess />;

  function buildInvoice() {
    if (items.length === 0) return;
    const subTotal = total();
    const tax = subTotal * 0.16;
    const grandTotal = subTotal + tax;
    const number = `FAC-${Date.now()}`;
    const date = new Date().toLocaleString();

    const data = {
      number,
      date,
      customerName: sanitizeText(user.displayName ?? "Cliente"),
      customerEmail: sanitizeText(user.email ?? ""),
      items: items.map((it) => ({ ...it })),
      subTotal,
      tax,
      total: grandTotal,
    };
    setInvoice(data);
    saveInvoice(data);
  }

  function downloadInvoice() {
    downloadInvoicePdf(invoice);
  }

  function printCurrentInvoice() {
    printInvoice(invoice);
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Carrito</h1>
          <p className="muted">Sesión local segura (localStorage) + eventos de UI.</p>
        </div>
        <div className="row">
          <button className="btn ghost" onClick={clear} disabled={items.length === 0}>
            Vaciar
          </button>
          <button className="btn ghost" onClick={buildInvoice} disabled={items.length === 0}>
            Generar factura
          </button>
          <Link className="btn" to={user ? "/pedidos" : "/login"}>
            {user ? "Finalizar compra" : "Inicia sesión para comprar"}
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card">
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="btn">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="table">
            <div className="tr head">
              <div>Producto</div>
              <div>Talla</div>
              <div>Cant.</div>
              <div>Precio</div>
              <div />
            </div>
            {items.map((it) => (
              <div key={`${it.id}_${it.size}`} className="tr">
                <div>
                  <strong>{it.name}</strong>
                  <div className="muted small">{it.id}</div>
                </div>
                <div>{it.size}</div>
                <div>{it.qty}</div>
                <div>${it.price * it.qty}</div>
                <div>
                  <button className="btn ghost" onClick={() => removeItem({ id: it.id, size: it.size })}>
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="row space totalRow">
            <span className="muted">Total</span>
            <strong className="price big">${total()}</strong>
          </div>
        </div>
      )}

      {invoice ? (
        <section className="invoice3d">
          <div className="row space">
            <h2>Factura generada</h2>
            <span className="tag">{invoice.number}</span>
          </div>
          <p className="muted small">{invoice.date}</p>
          <p className="muted small">Cliente: {invoice.customerName} ({invoice.customerEmail})</p>
          <div className="stackSm">
            {invoice.items.map((it) => (
              <div key={`${it.id}_${it.size}`} className="row space">
                <span>{it.name} x{it.qty}</span>
                <strong>${(it.price * it.qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <hr />
          <div className="row space"><span>Subtotal</span><strong>${invoice.subTotal.toFixed(2)}</strong></div>
          <div className="row space"><span>IVA 16%</span><strong>${invoice.tax.toFixed(2)}</strong></div>
          <div className="row space"><span>Total</span><strong className="price big">${invoice.total.toFixed(2)}</strong></div>
          <div className="row">
            <button className="btn" onClick={downloadInvoice}>Descargar PDF</button>
            <button className="btn ghost" onClick={printCurrentInvoice}>Imprimir</button>
            <Link className="btn ghost" to="/perfil">Ver historial</Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}

