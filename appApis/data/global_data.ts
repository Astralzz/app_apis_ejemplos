import React from "react";
import PageApiExterna from "../pages/externa/PageApiExterna";
import PageCreada from "../pages/creada/PageCreada";

type SeccionesAppType = {
  icono: string;
  Pagina:React.FC;
  titulo?: string;
};

// * Lista
export const SeccionesApp: SeccionesAppType[] = [
  {
    icono: "videocam",
    titulo:"Existente",
    Pagina: PageApiExterna,
  },
  {
    icono: "document-text",
    titulo:"Creada",
    Pagina: PageCreada,
  },
  {
    icono: "information",
    titulo:"Información",
    Pagina: PageApiExterna,
  },
];
