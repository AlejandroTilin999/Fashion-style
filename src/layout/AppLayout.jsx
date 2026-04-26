import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function AppLayout() {
  return (
    <div className="appShell">
      <NavBar />
      <div className="content">
        <Breadcrumbs />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} MODA Tienda</span>
        <span className="muted">Seguridad básica, roles y rutas protegidas</span>
      </footer>
    </div>
  );
}

