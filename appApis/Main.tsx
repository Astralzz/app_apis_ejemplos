import React from "react";

import { SafeAreaView } from "react-native";
import { TabView, Text, makeStyles } from "@rneui/themed";
import BarEndComponent from "./components/BarEndComponent";
import HeaderStart from "./components/HeaderStart";
import { SeccionesApp } from "./data/global_data";

//TODO - COMPONENTE PRINCIPAL
const Main: React.FC = () => {
  // * Estilos
  const styles = Styles();

  const [seccion, setSeccion] = React.useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de estado */}
      {/* <StatusBar style="auto" translucent={false} /> */}

      {/* Barra superior */}
      <HeaderStart seccion={seccion} />

      {/* Cuerpo */}
      <TabView value={seccion} onChange={(se) => setSeccion(se)}>
        {SeccionesApp.map((sec, i) => (
          <TabView.Item key={i} style={styles.container_tab}>
            <Text>{sec?.titulo ?? i}</Text>
          </TabView.Item>
        ))}
      </TabView>

      {/* Barra final */}
      <BarEndComponent seccion={seccion} setSeccion={setSeccion} />
    </SafeAreaView>
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: theme.colors.primario,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  container_tab: {
    flex: 1,
  },
}));

export default Main;
