import { Link, useParams } from "react-router-dom";
import { TRENDS_DATA } from "../data/trendsData";
import { fetchProducts } from "../mock/productsApi";
import { useEffect, useMemo, useState } from "react";

function matchTrendProduct(product, trend) {
  const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
  return trend.keywords.some((k) => haystack.includes(k.toLowerCase()));
}

export function TrendDetail() {
  const { slug } = useParams();
  const trend = useMemo(() => TRENDS_DATA.find((t) => t.slug === slug), [slug]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trend) return;
    let alive = true;
    fetchProducts({ registered: true })
      .then((list) => {
        if (!alive) return;
        const filtered = list.filter((p) => matchTrendProduct(p, trend));
        setProducts(filtered.length > 0 ? filtered.slice(0, 9) : list.slice(0, 9));
      })
      .catch(() => {
        if (!alive) return;
        setProducts([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [trend]);

  if (!trend) {
    return (
      <section className="card">
        <h1 className="h1">Tendencia no encontrada</h1>
        <Link className="btn" to="/tendencias">
          Volver a tendencias
        </Link>
      </section>
    );
  }

  return (
    <div className="stack">
      <section className="trendHero">
        <img src={trend.image} alt={trend.title} className="trendHeroImg" />
        <div className="trendHeroBody">
          <h1 className="h1">{trend.title}</h1>
          <p className="muted">{trend.text}</p>
          <ul className="sitemap">
            {trend.guide.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card">
        <div className="row space">
          <h2 style={{ margin: 0 }}>Productos recomendados</h2>
          <Link to="/productos" className="btn ghost">
            Ver catálogo completo
          </Link>
        </div>
        {loading ? <p className="muted">Cargando recomendaciones…</p> : null}
        <div className="gridCards">
          {products.map((p) => (
            <Link key={p.id} className="productCard" to={`/productos/${p.id}`}>
              <img src={p.image} alt={p.name} className="productImg" loading="lazy" />
              <div className="productBody">
                <strong>{p.name}</strong>
                <span className="tag">{p.category}</span>
                <span className="price">${p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

