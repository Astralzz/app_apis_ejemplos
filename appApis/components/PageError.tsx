import React from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Icon, Text, makeStyles, useTheme } from "@rneui/themed";

// * Props
export interface PageErrorComponentProps {
  mensaje: string;
  mensajeHeader?: string;
  action?: (() => void) | (() => Promise<void>);
  opcRefresh?: {
    action: () => void | Promise<void>;
    isRecargando: boolean;
  };
}

// TODO ---> PAGINA ERROR
const PageError: React.FC<PageErrorComponentProps> = ({
  mensaje,
  mensajeHeader,
  action,
  opcRefresh,
}) => {
  // * Estilo
  const styles = Styles();
  const { theme } = useTheme();
  const valorRotation = new Animated.Value(0);

  //STUB - Acción del boton
  const actionBoton = () => {
    // ? Existe acción
    if (action) {
      // Giramos el icono
      Animated.timing(valorRotation, {
        toValue: 1,
        duration: 1000, // 1 segundo
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Ejecutamos después de 1 s
      setTimeout(() => {
        action();
        // Reinicia la rotación
        valorRotation.setValue(0);
      }, 1000);
    }
  };

  //STUB - Spiner
  const spin = valorRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView
      refreshControl={
        opcRefresh && (
          <RefreshControl
            refreshing={opcRefresh?.isRecargando}
            onRefresh={opcRefresh?.action}
            progressBackgroundColor={theme.colors.boton_primario}
            colors={[theme.colors.letra_primaria]}
          />
        )
      }
      contentContainerStyle={styles.pagina}
    >
      <View style={styles.encabezado_caja}>
        <Text style={styles.encabezado_titulo}>{mensajeHeader || "Error"}</Text>
        <Text style={styles.encabezado_mensaje}>{mensaje}</Text>
      </View>
      {action && (
        <TouchableOpacity style={styles.cuerpo_boton} onPress={actionBoton}>
          <Animated.View
            style={{
              transform: [{ rotate: spin }],
            }}
          >
            <Icon
              containerStyle={styles.cuerpo_boton_icono_caja}
              iconStyle={styles.cuerpo_boton_icono}
              type="ionIcon"
              name="refresh"
              size={35}
            />
          </Animated.View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

// * Estilos
const Styles = makeStyles((theme) => ({
  //SECTION -  LETRA
  pagina: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  encabezado_caja: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  encabezado_titulo: {
    color: theme.colors.letra_primaria,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 23,
  },

  encabezado_mensaje: {
    color: theme.colors.letra_primaria,
    textAlign: "center",
    fontSize: 16,
  },

  cuerpo_caja: {
    //.....
  },

  cuerpo_boton: {
    marginVertical: 15,
  },

  cuerpo_boton_icono_caja: {
    //....
  },

  cuerpo_boton_icono: {
    color: theme.colors.letra_primaria,
  },
}));

export default PageError;
