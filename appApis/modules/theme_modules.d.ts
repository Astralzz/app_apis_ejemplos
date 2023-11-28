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
  }

  //SECTION - COMPONENTES
  export interface Theme {
    // ladoDelMenu: "right" | "left";
  }
}
