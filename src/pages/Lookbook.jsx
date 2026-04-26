import { Link } from "react-router-dom";

const LOOKS = [
  {
    id: 1,
    title: "Street Minimal",
    desc: "Sudadera neutra + jeans slim + tenis blancos.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: 2,
    title: "Casual Smart",
    desc: "Playera oversize + chamarra denim + accesorios sobrios.",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: 3,
    title: "Night Urban",
    desc: "Total black con layering y textura satinada.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=70",
  },
];

export function Lookbook() {
  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Lookbook</h1>
          <p className="muted">Inspiración de outfits para combinar productos de la tienda.</p>
        </div>
        <Link to="/productos" className="btn">
          Comprar piezas
        </Link>
      </div>

      <div className="lookGrid">
        {LOOKS.map((look) => (
          <article key={look.id} className="lookCard">
            <img src={look.image} alt={look.title} className="lookImg" loading="lazy" />
            <div className="lookBody">
              <h2>{look.title}</h2>
              <p className="muted">{look.desc}</p>
              <Link to="/productos" className="btn ghost">
                Comprar este estilo
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

