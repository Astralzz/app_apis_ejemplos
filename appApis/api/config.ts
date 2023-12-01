import axios, { AxiosResponse } from "axios";
import Pagination from "../models/api_rick_morty/Pagination";
import Nota from "../models/notas/Nota";

// Respuestas
export interface RespuestaApi {
  // De estados
  status: boolean;
  no_status?: number;
  error?: string;
  error_type?: string;

  // Dato api publica
  datosApiExterna?: {
    pagina?: Pagination;
  };

  // Dato api creada
  datosApiCreada?: {
    ListaNotas?: Nota[];
  };
}

// * Api externa
export const urlApiExterna = (page: number): string =>
  `https://rickandmortyapi.com/api/character/?page=${page}`;

// * Api creada
export const urlApiCreada = (ip_port: string): string =>
  `https://${ip_port}/api`;

// ! Error de data
export const lanzarErrorSiDatosIndefinidos = (
  res: AxiosResponse<any, any>,
  mensaje?: string
): void => {
  // ? No existe data
  if (!res.data) {
    throw new Error(mensaje ?? "Los datos son indefinidos");
  }
};

// * Respuesta axios
export const catchAxiosError = async (
  er: unknown | any
): Promise<RespuestaApi> => {
  // ? Es error de axios
  if (axios.isAxiosError(er)) {
    // ? Existe response
    if (er.response) {
      return {
        status: false,
        no_status: er?.response?.status,
        error: er?.response?.data?.error,
        error_type: er?.response?.data?.error_type,
      };
    } else {
      return {
        status: false,
        no_status: 500,
        error: "No se pudo conectar al servidor",
      };
    }
  }

  // ! Errores críticos
  return {
    status: false,
    no_status: 500,
    error: er ? String(er) : undefined,
  };
};

// * Interceptar y ver las request de hace axios
// axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
//   console.log(`-------- REQUEST ${request.url} ----------`);
//   console.log("Request:", JSON.stringify(request));
//   console.log(`-------------------- FIN ----------------------`);
//   return request;
// });
