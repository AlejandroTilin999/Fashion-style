import { jsPDF } from "jspdf";

const INVOICE_KEY = "moda_invoices_v1";

export function readInvoices() {
  try {
    const raw = localStorage.getItem(INVOICE_KEY);
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveInvoice(invoice) {
  const list = readInvoices();
  localStorage.setItem(INVOICE_KEY, JSON.stringify([invoice, ...list].slice(0, 50)));
}

export function downloadInvoicePdf(invoice) {
  if (!invoice) return;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 48;
  let y = 52;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("MODA Tienda - Factura", left, y);

  y += 26;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Folio: ${invoice.number}`, left, y);
  y += 16;
  doc.text(`Fecha: ${invoice.date}`, left, y);
  y += 16;
  doc.text(`Cliente: ${invoice.customerName}`, left, y);
  y += 16;
  doc.text(`Email: ${invoice.customerEmail}`, left, y);

  y += 26;
  doc.setFont("helvetica", "bold");
  doc.text("Detalle", left, y);
  y += 18;
  doc.setFont("helvetica", "normal");

  (invoice.items ?? []).forEach((it) => {
    const line = `${it.name} | Talla ${it.size} | Cant ${it.qty} | $${(
      Number(it.price) * Number(it.qty)
    ).toFixed(2)}`;
    const wrapped = doc.splitTextToSize(line, 500);
    doc.text(wrapped, left, y);
    y += wrapped.length * 14;
    if (y > 760) {
      doc.addPage();
      y = 52;
    }
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal: $${Number(invoice.subTotal ?? 0).toFixed(2)}`, left, y);
  y += 16;
  doc.text(`IVA 16%: $${Number(invoice.tax ?? 0).toFixed(2)}`, left, y);
  y += 18;
  doc.setFontSize(13);
  doc.text(`Total: $${Number(invoice.total ?? 0).toFixed(2)}`, left, y);

  doc.save(`${invoice.number}.pdf`);
}

export function printInvoice(invoice) {
  if (!invoice) return;
  const popup = window.open("", "_blank", "width=900,height=700");
  if (!popup) return;

  const rows = (invoice.items ?? [])
    .map(
      (it) =>
        `<tr><td>${it.name}</td><td>${it.size}</td><td>${it.qty}</td><td>$${(
          Number(it.price) * Number(it.qty)
        ).toFixed(2)}</td></tr>`
    )
    .join("");

  popup.document.write(`
    <html>
      <head><title>${invoice.number}</title></head>
      <body style="font-family:Arial,sans-serif;padding:24px">
        <h1>MODA Tienda - Factura</h1>
        <p><strong>${invoice.number}</strong> | ${invoice.date}</p>
        <p>${invoice.customerName} (${invoice.customerEmail})</p>
        <table border="1" cellspacing="0" cellpadding="8" width="100%">
          <thead><tr><th>Producto</th><th>Talla</th><th>Cantidad</th><th>Total</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="margin-top:16px">Subtotal: $${Number(invoice.subTotal ?? 0).toFixed(2)}</p>
        <p>IVA 16%: $${Number(invoice.tax ?? 0).toFixed(2)}</p>
        <h2>Total: $${Number(invoice.total ?? 0).toFixed(2)}</h2>
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
}

