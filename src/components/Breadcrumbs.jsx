import { Link, useLocation } from "react-router-dom";

const LABELS = {
  "": "Inicio",
  productos: "Productos",
  carrito: "Carrito",
  dashboard: "Dashboard",
  perfil: "Perfil",
  admin: "Admin",
  pedidos: "Pedidos",
  login: "Login",
  registro: "Registro",
  sitemap: "Mapa del sitio",
  lookbook: "Lookbook",
  tendencias: "Tendencias",
  "colores-tierra": "Colores tierra",
  oversized: "Oversized",
  "denim-vintage": "Denim vintage",
  athleisure: "Athleisure",
  beneficios: "VIP",
  facturas: "Facturas",
  404: "No encontrado",
  403: "Sin permisos",
};

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);

  const crumbs = [{ to: "/", label: "Inicio" }];
  let acc = "";
  for (const p of parts) {
    acc += `/${p}`;
    crumbs.push({ to: acc, label: LABELS[p] ?? p });
  }

  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {crumbs.map((c, i) => (
        <span key={c.to} className="crumb">
          {i === crumbs.length - 1 ? (
            <span aria-current="page">{c.label}</span>
          ) : (
            <Link to={c.to}>{c.label}</Link>
          )}
          {i < crumbs.length - 1 ? <span className="sep">/</span> : null}
        </span>
      ))}
    </nav>
  );
}

