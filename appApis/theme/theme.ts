import { createTheme } from "@rneui/themed";

//TODO - Tema
const themeApp = createTheme({
  //SECTION - #FFF
  lightColors: {
    primario: "rgb(46, 189, 70)",
    secundario: "rgb(84, 212, 105)",

    boton_primario: "rgb(32, 153, 53)",
    boton_secundario_disabled: "rgba(32, 153, 53, 0.5)",

    letra_primaria: "rgb(255,255,255)",
    letra_secundaria: "rgb(0,0,0)",
  },

  //SECTION - #000F
  darkColors: {
    primario: "rgb(15, 15, 16)",
    secundario: "rgb(59, 59, 62)",

    boton_primario: "rgb(109, 120, 135)",
    boton_secundario_disabled: "rgba(109, 120, 135,0.5)",

    letra_primaria: "rgb(255,255,255)",
    letra_secundaria: "rgb(255,255,255)",
  },

  //SECTION - COMPONENTES
  components: {
    Button: {
      raised: true,
    },
    TabItem: {
      titleStyle: {
        color: "white",
      },
      icon: {
        color: "white",
        type: "ionicon",
        size: 35,
      },
    },
  },
});

export default themeApp;
