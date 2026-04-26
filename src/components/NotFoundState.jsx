import { Link } from "react-router-dom";

export function NotFoundState({
  title = "404",
  message = "No encontramos resultados.",
  ctaTo = "/",
  ctaLabel = "Ir al inicio",
  onCta,
}) {
  return (
    <section className="nfCard" role="status" aria-live="polite">
      <div className="nfGlow" aria-hidden="true" />
      <div className="nfCode">{title}</div>
      <p className="muted">{message}</p>
      {onCta ? (
        <button type="button" className="btn" onClick={onCta}>
          {ctaLabel}
        </button>
      ) : (
        <Link to={ctaTo} className="btn">
          {ctaLabel}
        </Link>
      )}
    </section>
  );
}

