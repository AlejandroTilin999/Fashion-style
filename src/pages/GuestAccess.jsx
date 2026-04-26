import { Link } from "react-router-dom";

export function GuestAccess() {
  return (
    <div className="stack">
      <section className="nfCard">
        <div className="nfGlow" aria-hidden="true" />
        <div className="nfCode">SOLO MIEMBROS</div>
        <p className="muted">
          Para usar carrito, pedidos y funciones de compra debes crear una cuenta.
        </p>
        <div className="row">
          <Link to="/registro" className="btn">
            Crear cuenta
          </Link>
          <Link to="/login" className="btn ghost">
            Ya tengo cuenta
          </Link>
        </div>
      </section>

      <section className="grid2">
        <article className="card">
          <h2>Beneficios de registro</h2>
          <ul className="sitemap">
            <li>Guardar carrito y pedidos</li>
            <li>Acceso a descuentos y lanzamientos</li>
            <li>Seguimiento de compra en dashboard</li>
          </ul>
        </article>
        <article className="card">
          <h2>Explora antes de comprar</h2>
          <div className="row">
            <Link className="btn ghost" to="/lookbook">
              Ver lookbook
            </Link>
            <Link className="btn ghost" to="/tendencias">
              Ver tendencias
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}

