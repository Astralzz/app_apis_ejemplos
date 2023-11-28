import axios, { AxiosResponse } from "axios";

// Respuestas
export interface RespuestaApi {
  // De estados
  estado: boolean;
  noEstado?: number | string | undefined;
  detalles_error?: string;

  // Datos de usuario
  datosMovies?: {
  
  };

}

// * Comprobar apis
export const urlApiNoEncontrada = (): boolean => !process.env.EXPO_PUBLIC_API_URL;

// ! Error de api
export const lanzarErrorSiUrlNoEncontrada = (): void => {
  // ? Url no encontrada
  if (urlApiNoEncontrada()) {
    throw new Error("No se pudo encontrar la url al servidor");
  }
};

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
        estado: false,
        noEstado: "ERROR " + (er.response.status || undefined),
        detalles_error: er.response.data?.error,
      };
    } else {
      return {
        estado: false,
        noEstado: "ERROR 500",
        detalles_error: "No se pudo conectar al servidor",
      };
    }
  }

  // ! Errores críticos
  return {
    estado: false,
    noEstado: "ERROR CRITICO",
    detalles_error: er ? String(er) : undefined,
  };
};

// * Interceptar y ver las request de hace axios
// axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
//   console.log(`-------- REQUEST ${request.url} ----------`);
//   console.log("Request:", JSON.stringify(request));
//   console.log(`-------------------- FIN ----------------------`);
//   return request;
// });