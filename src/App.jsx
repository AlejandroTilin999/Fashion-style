import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./layout/AppLayout";
import { RequireAuth } from "./auth/RequireAuth";

const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const Login = lazy(() => import("./pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("./pages/Register").then((m) => ({ default: m.Register })));
const Products = lazy(() => import("./pages/Products").then((m) => ({ default: m.Products })));
const ProductDetail = lazy(() =>
  import("./pages/ProductDetail").then((m) => ({ default: m.ProductDetail }))
);
const Cart = lazy(() => import("./pages/Cart").then((m) => ({ default: m.Cart })));
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const Profile = lazy(() => import("./pages/Profile").then((m) => ({ default: m.Profile })));
const Orders = lazy(() => import("./pages/Orders").then((m) => ({ default: m.Orders })));
const Admin = lazy(() => import("./pages/Admin").then((m) => ({ default: m.Admin })));
const Sitemap = lazy(() => import("./pages/Sitemap").then((m) => ({ default: m.Sitemap })));
const Lookbook = lazy(() => import("./pages/Lookbook").then((m) => ({ default: m.Lookbook })));
const Trends = lazy(() => import("./pages/Trends").then((m) => ({ default: m.Trends })));
const TrendDetail = lazy(() =>
  import("./pages/TrendDetail").then((m) => ({ default: m.TrendDetail }))
);
const Benefits = lazy(() => import("./pages/Benefits").then((m) => ({ default: m.Benefits })));
const Forbidden = lazy(() =>
  import("./pages/Forbidden").then((m) => ({ default: m.Forbidden }))
);
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

function Loading() {
  return <div className="skeleton">Cargando…</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />

            <Route path="productos" element={<Products />} />
            <Route path="lookbook" element={<Lookbook />} />
            <Route path="tendencias" element={<Trends />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="403" element={<Forbidden />} />
            <Route path="404" element={<NotFound />} />

            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="pedidos" element={<Orders />} />
              <Route path="beneficios" element={<Benefits />} />
              <Route path="productos/:id" element={<ProductDetail />} />
              <Route path="tendencias/:slug" element={<TrendDetail />} />
            </Route>

            <Route element={<RequireAuth allowRoles={["admin"]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
