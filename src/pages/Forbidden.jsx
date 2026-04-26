import { Link } from "react-router-dom";

export function Forbidden() {
  return (
    <div className="centerCard">
      <h1 className="h1">403</h1>
      <p className="muted">No tienes permisos para ver esta sección.</p>
      <div className="row">
        <Link to="/" className="btn">
          Ir al inicio
        </Link>
        <Link to="/dashboard" className="btn ghost">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

