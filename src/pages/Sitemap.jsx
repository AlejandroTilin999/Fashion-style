import { Link } from "react-router-dom";

export function Sitemap() {
  const sections = [
    {
      title: "Público",
      desc: "Rutas que cualquier visitante puede abrir.",
      links: [
        { to: "/", label: "Inicio" },
        { to: "/productos", label: "Productos" },
        { to: "/lookbook", label: "Lookbook" },
        { to: "/tendencias", label: "Tendencias" },
        { to: "/login", label: "Login" },
        { to: "/registro", label: "Registro" },
      ],
    },
    {
      title: "Privado",
      desc: "Rutas protegidas para usuarios registrados.",
      links: [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/perfil", label: "Perfil" },
        { to: "/pedidos", label: "Pedidos" },
        { to: "/carrito", label: "Carrito (requiere cuenta)" },
      ],
    },
    {
      title: "Sistema",
      desc: "Rutas de soporte y estados.",
      links: [
        { to: "/sitemap", label: "Mapa del sitio" },
        { to: "/admin", label: "Admin (solo admin)" },
        { to: "/403", label: "403 Sin permisos" },
        { to: "/404", label: "404 No encontrado" },
      ],
    },
  ];

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Mapa del sitio</h1>
          <p className="muted">Navegación visual de MODA Tienda, organizada por tipo de acceso.</p>
        </div>
      </div>

      <div className="grid3">
        {sections.map((s) => (
          <article key={s.title} className="sitemapCard">
            <h2>{s.title}</h2>
            <p className="muted">{s.desc}</p>
            <ul className="sitemap">
              {s.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

