//https://rickandmortyapi.com/api/character/?page=1

// * Tipos
export type LocationPersonajeType = {
  name?: string;
  url?: string;
};

export type OriginPersonajeType = {
  name?: string;
  url?: string;
};

export type EpisodeLinkType = string;
export type GenderPersonajeType = "Female" | "Male" | "Genderless" | "unknown";
export type StatusPersonajeType = "Alive" | "Dead" | "unknown";

//TODO - Pagination
interface Personaje {
  id: number;
  name?: string;
  status?: StatusPersonajeType;
  species?: string;
  type?: string;
  gender?: GenderPersonajeType;
  origin?: OriginPersonajeType;
  location?: LocationPersonajeType;
  image?: string;
  episode?: EpisodeLinkType[];
  url?: string;
  created?: Date;
}

export default Personaje;
