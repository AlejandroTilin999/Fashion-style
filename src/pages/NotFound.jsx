import { NotFoundState } from "../components/NotFoundState";

export function NotFound() {
  return (
    <NotFoundState
      title="404"
      message="La página que buscas no existe o fue movida."
      ctaTo="/productos"
      ctaLabel="Ver todo el catálogo"
    />
  );
}

