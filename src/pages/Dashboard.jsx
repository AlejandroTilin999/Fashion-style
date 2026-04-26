import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function Dashboard() {
  const { user, role } = useAuth();

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Dashboard</h1>
          <p className="muted">Ruta protegida + rol: <strong>{role}</strong></p>
        </div>
      </div>

      <div className="grid3">
        <article className="infoCard">
          <h2>Sesión</h2>
          <p className="muted small">Usuario</p>
          <p><strong>{user?.displayName ?? "—"}</strong></p>
          <p className="muted small">Correo</p>
          <p><strong>{user?.email ?? "—"}</strong></p>
        </article>
        <article className="infoCard">
          <h2>Acciones</h2>
          <div className="stackSm">
            <Link className="btn" to="/productos">Comprar</Link>
            <Link className="btn ghost" to="/pedidos">Mis pedidos</Link>
            <Link className="btn ghost" to="/perfil">Mi perfil</Link>
            <Link className="btn ghost" to="/beneficios">Zona VIP</Link>
            <Link className="btn ghost" to="/perfil">Ver facturas en perfil</Link>
          </div>
        </article>
        <article className="infoCard">
          <h2>Admin</h2>
          <p className="muted">Si tu rol es Admin, puedes entrar al panel.</p>
          <Link className="btn ghost" to="/admin">Abrir panel</Link>
        </article>
      </div>
    </div>
  );
}

