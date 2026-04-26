import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { sanitizeText } from "../lib/sanitize";
import { isEmail, isRequired, isStrongPassword, isValidName, isValidRole } from "../lib/validators";

export function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestedRole, setRequestedRole] = useState("user");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const safeName = sanitizeText(name).trim();
    const safeEmail = sanitizeText(email).trim();
    const safeRole = sanitizeText(requestedRole).trim();

    if (!isRequired(safeName)) return setError("Nombre obligatorio.");
    if (!isValidName(safeName)) return setError("Nombre inválido. Solo letras y espacios (2-40).");
    if (!isRequired(safeEmail) || !isEmail(safeEmail)) return setError("Correo inválido.");
    if (!isStrongPassword(password))
      return setError("Password débil. Usa 8+ caracteres, mayúscula, minúscula y número.");
    if (!isValidRole(safeRole)) return setError("Rol inválido.");

    setBusy(true);
    try {
      await register({ name: safeName, email: safeEmail, password, requestedRole: safeRole });
      nav("/dashboard", { replace: true });
    } catch {
      setError("No se pudo registrar. Intenta con otro correo.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="authShell">
      <div className="authCard">
        <h1 className="h1">Registro</h1>
        <p className="muted">Crea tu cuenta para comprar y ver tus pedidos.</p>

        {error ? <div className="alert">{error}</div> : null}

        <form className="form" onSubmit={onSubmit}>
          <label className="field">
            <span>Nombre</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
          </label>
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
              autoComplete="new-password"
              placeholder="Mínimo 8 + Mayús + número"
            />
          </label>
          <label className="field">
            <span>Rol (demo)</span>
            <select value={requestedRole} onChange={(e) => setRequestedRole(e.target.value)}>
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button className="btn wide" disabled={busy}>
            {busy ? "Creando…" : "Crear cuenta"}
          </button>
        </form>

        <p className="muted">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

