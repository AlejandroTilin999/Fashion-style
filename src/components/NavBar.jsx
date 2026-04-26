import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

export function NavBar() {
  const { user, role, logout } = useAuth();
  const { itemCount } = useCart();
  const count = itemCount();

  return (
    <header className="topbar">
      <div className="brand">
        <span className="logoMark">MODA</span>
        <span className="logoText">Tienda</span>
      </div>

      <nav className="nav">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/lookbook">Lookbook</NavLink>
        <NavLink to="/tendencias">Tendencias</NavLink>
        <NavLink to="/carrito">
          Carrito {user && count > 0 ? <span className="cartBadge">{count}</span> : null}
        </NavLink>
        {user ? <NavLink to="/beneficios">VIP</NavLink> : null}
        <NavLink to="/sitemap">Mapa</NavLink>
        {user ? <NavLink to="/dashboard">Dashboard</NavLink> : null}
        {role === "admin" ? <NavLink to="/admin">Admin</NavLink> : null}
      </nav>

      <div className="session">
        {user ? (
          <>
            <NavLink to="/perfil" className="pill">
              {user.displayName ?? user.email}
            </NavLink>
            <button className="btn ghost" onClick={logout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn ghost">
              Login
            </NavLink>
            <NavLink to="/registro" className="btn">
              Registro
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

