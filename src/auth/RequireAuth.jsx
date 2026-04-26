import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireAuth({ allowRoles }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Cargando sesión…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (Array.isArray(allowRoles) && allowRoles.length > 0) {
    if (!allowRoles.includes(role)) return <Navigate to="/403" replace />;
  }
  return <Outlet />;
}

