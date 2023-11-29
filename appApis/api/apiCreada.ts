import axios from "axios";
import {
  RespuestaApi,
  catchAxiosError,
  lanzarErrorSiDatosIndefinidos,
  urlApiCreada,
} from "./config";

// * Obtener lista de nota
export async function requestObtenerListaNotas(data: {
  ip_port: string;
  inicio: number;
  final: number;
}): Promise<RespuestaApi> {
  try {
    // Ruta
    let url = `${urlApiCreada(data.ip_port)}/notas/get/lista/${data.inicio}/${
      data.final
    }`;

    // Enviamos
    const res = await axios.get(url);

    lanzarErrorSiDatosIndefinidos(res);

    // * Éxito
    return {
      status: true,
      datosApiCreada: {
        ListaNotas: res.data,
      },
    };

    // ! Error
  } catch (er: unknown | any) {
    return await catchAxiosError(er?.message);
  }
}
