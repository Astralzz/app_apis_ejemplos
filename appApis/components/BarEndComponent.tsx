import React from "react";

import { Tab, makeStyles } from "@rneui/themed";
import { SeccionesApp } from "../data/global_data";

// * Props
interface BarEndComponentProps {
  seccion: number;
  setSeccion: (n: number) => void;
}

//TODO - COMPONENTE PRINCIPAL
const BarEndComponent: React.FC<BarEndComponentProps> = ({
  seccion,
  setSeccion,
}) => {
  // * Estilos
  const styles = Styles();

  return (
    <Tab
      value={seccion}
      onChange={(s) => setSeccion(s)}
      disableIndicator
      containerStyle={styles.tap}
    >
      {/* Secciones */}
      {SeccionesApp.map((sec, i) => (
        <Tab.Item key={i} icon={{ name: sec?.icono }} />
      ))}
    </Tab>
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  tap: {
    alignSelf: "flex-end",
    borderTopWidth:0.5,
    borderTopColor:theme.colors.letra_primaria,
    backgroundColor: theme.colors.primario,
  },
}));

export default BarEndComponent;
