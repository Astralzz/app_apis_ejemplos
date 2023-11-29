import React from "react";
import PageApiExterna from "../pages/externa/PageApiExterna";

type SeccionesAppType = {
  icono: string;
  Pagina:React.FC;
  titulo?: string;
};

// * Lista
export const SeccionesApp: SeccionesAppType[] = [
  {
    icono: "videocam",
    Pagina: PageApiExterna,
  },
  {
    icono: "document-text",
    Pagina: PageApiExterna,
  },
  {
    icono: "information",
    Pagina: PageApiExterna,
  },
];
