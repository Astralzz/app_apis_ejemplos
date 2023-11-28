import { createTheme } from "@rneui/themed";

//TODO - Tema
const themeApp = createTheme({
  //SECTION - #FFF
  lightColors: {
    primario: "#2ebd46",
    secundario: "#54d469",

    letra_primaria: "#ffffff",
    letra_secundaria: "#000000",
  },

  //SECTION - #000
  darkColors: {
    primario: "#0f0f10",
    secundario: "##3b3b3e",

    letra_primaria: "#ffffff",
    letra_secundaria: "#ffffff",
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
