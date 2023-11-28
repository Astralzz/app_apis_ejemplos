import Personaje from "./Personaje";

// * Tipo
export type InfoPaginationType = {
  count?: number;
  pages?: number;
  next?: string;
  prev?: string;
};

//TODO - Pagination
interface Pagination {
  info?: InfoPaginationType;
  results?: Personaje[];
}

export default Pagination;
