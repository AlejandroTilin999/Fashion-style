import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { TRENDS_DATA } from "../data/trendsData";

export function Trends() {
  const { user } = useAuth();

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Tendencias 2026</h1>
          <p className="muted">Resumen rápido de lo que está dominando en moda urbana.</p>
        </div>
      </div>

      <div className="trendGrid">
        {TRENDS_DATA.map((t) => (
          <Link
            key={t.slug}
            className="trendCard"
            to={user ? `/tendencias/${t.slug}` : "/registro"}
            aria-label={`Abrir tendencia ${t.title}`}
          >
            <img src={t.image} alt={t.title} className="trendImg" loading="lazy" />
            <div className="trendBody">
              <h2>{t.title}</h2>
              <p className="muted">{t.text}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="row">
        <Link to="/lookbook" className="btn ghost">
          Ver looks
        </Link>
        <Link to="/productos" className="btn">
          Ir a productos
        </Link>
      </div>
    </div>
  );
}

