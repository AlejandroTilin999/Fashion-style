import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function Home() {
  const { user } = useAuth();
  return (
    <div className="stack">
      <section className="heroCard">
        <div className="heroCopy">
          <h1 className="title">MODA Tienda</h1>
          <p className="subtitle">
            Ropa urbana, básicos premium y outfits completos. Compra rápido, seguro y con rutas protegidas.
          </p>
          <div className="row">
            <Link className="btn" to="/productos">
              Ver productos
            </Link>
            <Link className="btn ghost" to="/dashboard">
              Ir al dashboard
            </Link>
          </div>
        </div>
        <div className="heroArt" aria-hidden="true">
          <div className="orb a" />
          <div className="orb b" />
          <div className="orb c" />
        </div>
      </section>

      {/* 3 secciones informativas (requisito) */}
      <section className="grid3">
        <article className="infoCard">
          <h2>Envíos y tiempos</h2>
          <p>
            Entregas en 24–72h en zona local. Tracking y soporte por pedido.
          </p>
        </article>
        <article className="infoCard">
          <h2>Seguridad</h2>
          <p>
            Inputs sanitizados, rutas protegidas y sesión con Firebase Auth. Logs de accesos y errores.
          </p>
        </article>
        <article className="infoCard">
          <h2>Calidad</h2>
          <p>
            Materiales premium, tallas claras y devoluciones sencillas. Tu outfit, tu estilo.
          </p>
        </article>
      </section>

      {user ? (
        <section className="vipHero">
          <h2>Bienvenido de nuevo, {user.displayName ?? "miembro"}.</h2>
          <p className="muted">Tu cuenta desbloquea zona VIP, historial de facturas y compras completas.</p>
          <div className="row">
            <Link className="btn" to="/beneficios">
              Ir a Zona VIP
            </Link>
            <Link className="btn ghost" to="/facturas">
              Ver facturas
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}

