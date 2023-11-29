import axios from "axios";
import {
  RespuestaApi,
  catchAxiosError,
  lanzarErrorSiDatosIndefinidos,
  urlApiExterna,
} from "./config";

// * Obtener pagina
export async function requestObtenerPaginaRickMorty(data: {
  page: number;
}): Promise<RespuestaApi> {
  try {
    // Ruta
    let url = urlApiExterna(data.page);

    // Enviamos
    const res = await axios.get(url);

    lanzarErrorSiDatosIndefinidos(res);

    // * Éxito
    return {
      estado: true,
      datosApiExterna: {
        pagina: res.data,
      },
    };

    // ! Error
  } catch (er: unknown | any) {
    return await catchAxiosError(er?.message);
  }
}

// * Obtener pagina
export async function requestObtenerUrlRickMorty(data: {
  url: string;
}): Promise<RespuestaApi> {
  try {
    // Enviamos
    const res = await axios.get(data.url);

    lanzarErrorSiDatosIndefinidos(res);

    // * Éxito
    return {
      estado: true,
      datosApiExterna: {
        pagina: res.data,
      },
    };

    // ! Error
  } catch (er: unknown | any) {
    return await catchAxiosError(er?.message);
  }
}
