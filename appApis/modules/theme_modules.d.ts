// themed.d.ts
import "@rneui/themed";

//SECTION - COLORES DE LA APP
declare module "@rneui/themed" {
  //SECTION - COLORES
  export interface Colors {
    //STUB - Colores
    primario: string;
    secundario: string;

    //STUB - Letras
    letra_primaria:string;
    letra_secundaria:string;

    //STUB - Botones
    boton_primario:string;
    boton_primario_disabled:string;
    boton_secundario:string;
    boton_secundario_disabled:string;
  }

  //SECTION - COMPONENTES
  export interface Theme {
    // ladoDelMenu: "right" | "left";
  }
}
