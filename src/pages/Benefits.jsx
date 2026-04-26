import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../mock/productsApi";

const BENEFITS = [
  { title: "Drop VIP", text: "Acceso anticipado 24h a nuevos lanzamientos." },
  { title: "Cupones personales", text: "Descuentos dinámicos por historial de compra." },
  { title: "Envio express", text: "Prioridad de preparación y salida de pedidos." },
];

export function Benefits() {
  const [coupon, setCoupon] = useState("");
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    fetchProducts({ registered: true })
      .then((data) => setDrops(data.slice(0, 3)))
      .catch(() => setDrops([]));
  }, []);

  const generateCoupon = () => {
    const code = `VIP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setCoupon(code);
    localStorage.setItem("moda_vip_coupon", code);
  };

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Zona VIP</h1>
          <p className="muted">Contenido y ventajas exclusivas para usuarios registrados.</p>
        </div>
        <Link className="btn" to="/productos">
          Aprovechar beneficios
        </Link>
      </div>

      <section className="card">
        <div className="row space">
          <h2 style={{ margin: 0 }}>Acciones VIP</h2>
          <button className="btn ghost" onClick={generateCoupon}>
            Generar cupón
          </button>
        </div>
        {coupon ? <p className="tag">Cupón activo: {coupon}</p> : <p className="muted">Genera tu cupón personal.</p>}
      </section>

      <div className="grid3">
        {BENEFITS.map((b) => (
          <article key={b.title} className="vipCard">
            <h2>{b.title}</h2>
            <p className="muted">{b.text}</p>
          </article>
        ))}
      </div>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Drops exclusivos para miembros</h2>
        <div className="grid3">
          {drops.map((p) => (
            <article key={p.id} className="infoCard">
              <img src={p.image} alt={p.name} className="productImg" loading="lazy" />
              <h3 style={{ margin: "8px 0 4px" }}>{p.name}</h3>
              <p className="muted small">{p.category}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

