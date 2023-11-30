import React from "react";
import { Header, makeStyles, useTheme } from "@rneui/themed";

// * Props
interface HeaderStartProps {
  seccion: number;
}

//TODO - COMPONENTE PRINCIPAL
const HeaderStart: React.FC<HeaderStartProps> = ({ seccion }) => {
  // * Estilos
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
    textAlign:"center",
    borderRadius:15,
    fontSize: 30,
    marginLeft: 10,
  },
}));

export default HeaderStart;
