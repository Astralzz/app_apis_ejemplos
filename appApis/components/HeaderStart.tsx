import React from "react";
import { Header, Text, makeStyles, useTheme } from "@rneui/themed";
import { useStatusInternet } from "../providers/StatusInternetProvider";
import { View } from "react-native";

// * Props
interface HeaderStartProps {
  seccion: number;
}

//TODO - COMPONENTE PRINCIPAL
const HeaderStart: React.FC<HeaderStartProps> = ({ seccion }) => {
  // * Estilos
  const { isConnected } = useStatusInternet();
  const { theme, updateTheme } = useTheme();
  const styles = Styles();

  // * Actualizar tema
  const actualizarTema = (): void => {
    // Tema
    const tema = theme.mode === "dark" ? "light" : "dark";

    // ? Es el mismo
    if (theme.mode === tema) {
      return;
    }

    // Actualizamos
    updateTheme({
      mode: tema,
    });
  };

  return (
    <>
      <Header
        placement="right"
        backgroundColor={theme.colors.primario}
        leftComponent={{
          icon: theme.mode === "light" ? "sunny" : "moon",
          type: "ionicon",
          iconStyle: styles.icono_barra,
          onPress: actualizarTema,
        }}
        centerComponent={{
          text:
            seccion === 0
              ? "Api existente"
              : seccion === 1
              ? "Api creada"
              : "Información",
          style: styles.letra_barra,
        }}
      />
      {/* // ? Sin conexion */}
      {!isConnected && (
        <View style={styles.text_container}>
          <Text style={styles.letra}>Sin conexión a internet</Text>
        </View>
      )}
    </>
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  barra: {
    backgroundColor: theme.colors.primario,
  },
  letra_barra: {
    color: theme.colors.letra_primaria,
    fontSize: 20,
  },
  icono_barra: {
    color: theme.colors.letra_primaria,
    textAlign: "center",
    borderRadius: 15,
    fontSize: 30,
    marginLeft: 10,
  },
  letra: {
    color: theme.colors.letra_primaria,
    textAlign: "center",
    fontSize: 12,
  },
  text_container: {
    backgroundColor: theme.colors.error,
  },
}));

export default HeaderStart;
