import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { sanitizeText } from "../lib/sanitize";
import { isEmail, isRequired } from "../lib/validators";

export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const from = useMemo(() => loc.state?.from?.pathname ?? "/dashboard", [loc.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const safeEmail = sanitizeText(email).trim();
    if (!isRequired(safeEmail) || !isEmail(safeEmail)) return setError("Correo inválido.");
    if (!isRequired(password)) return setError("Password obligatorio.");

    setBusy(true);
    try {
      await login(safeEmail, password);
      nav(from, { replace: true });
    } catch {
      setError("No se pudo iniciar sesión. Verifica tus datos.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="authShell">
      <div className="authCard">
        <h1 className="h1">Login</h1>
        <p className="muted">Accede para ver el dashboard y tus pedidos.</p>

        {error ? <div className="alert">{error}</div> : null}

        <form className="form" onSubmit={onSubmit}>
          <label className="field">
            <span>Correo</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
            />
          </label>
          <label className="field">
            <span>Contraseña</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>
          <button className="btn wide" disabled={busy}>
            {busy ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="muted">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

