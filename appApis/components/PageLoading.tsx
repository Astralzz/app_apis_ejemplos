import React from "react";
import { DimensionValue, ScrollView, View } from "react-native";
import {
  Card,
  LinearProgress,
  Skeleton,
  makeStyles,
  useTheme,
} from "@rneui/themed";

// * Props
interface PageLoadingComponentProps {
  tipo?: "default" | "tarjetas";
  sizeLinea?: "chica" | "grande";
  filas?: number;
}

//TODO - Pagina cargando
const PageLoading: React.FC<PageLoadingComponentProps> = ({
  tipo = "default",
  sizeLinea = "grande",
  filas = tipo === "default" ? 18 : 5,
}) => {
  // * Estilo
  const styles = Style();
  const { theme } = useTheme();

  // * Cuerpo
  const CuerpoEsqueleto: React.FC = () => {
    // ? Tarjeta
    if (tipo === "tarjetas") {
      return (
        <View style={styles.cuerpo_default_tarjeta}>
          {Array(filas)
            .fill(null)
            .map((_, i) => {
              return (
                <Card key={i} containerStyle={styles.tarjeta_loading_caja}>
                  {/* Titulo */}
                  <Skeleton
                    height={sizeLinea === "chica" ? 20 : 35}
                    style={styles.skeleton_tarjeta_titulo}
                    skeletonStyle={styles.skeleton_loading_tarjeta}
                    animation="wave"
                  />

                  {/* Division> */}
                  <Card.Divider
                    width={0.4}
                    style={styles.tarjeta_loading_division}
                  />

                  {/* Cuerpo */}
                  {[90, 96, 89].map((por, index) => (
                    <Skeleton
                      key={index}
                      height={sizeLinea === "chica" ? 15 : 30}
                      style={[
                        styles.skeleton_caja,
                        {
                          width: `${por}%`,
                        },
                      ]}
                      skeletonStyle={styles.skeleton_loading_tarjeta}
                      animation="wave"
                    />
                  ))}
                </Card>
              );
            })}
        </View>
      );
    }

    return (
      <View style={styles.cuerpo_default}>
        {Array(filas)
          .fill(null)
          .map((_, index) => {
            // n aleatorio [70, 80, 90, 100]
            const anchoAleatorio: DimensionValue = `${
              (Math.floor(Math.random() * 4) + 7) * 10
            }%`;

            return (
              <Skeleton
                key={index}
                height={30}
                style={[
                  styles.skeleton_caja,
                  {
                    width: anchoAleatorio,
                  },
                ]}
                skeletonStyle={styles.skeleton_loading_caja}
                animation="wave"
              />
            );
          })}
      </View>
    );
  };

  return (
    <View style={styles.pagina}>
      <ScrollView>
        {/* Linea de progreso */}
        <LinearProgress
          color={theme.colors.error}
          style={sizeLinea === "chica" && { height: 0.7 }}
          variant="indeterminate"
          animation={{ duration: 1000 }}
        />

        {/* Esqueleto */}
        <CuerpoEsqueleto />
      </ScrollView>
    </View>
  );
};

// * Estilos
const Style = makeStyles((theme) => ({
  // PAGINA
  pagina: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    flexDirection: "row",
  },

  // * ----- DEFAULT
  cuerpo_default: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 18,
    alignItems: "flex-start",
  },
  skeleton_caja: {
    marginVertical: 5,
  },
  skeleton_loading_caja: {
    backgroundColor: theme.colors.error,
  },

  // * TARJETAS
  cuerpo_default_tarjeta: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 18,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tarjeta_loading_caja: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.secundario,
    shadowColor: "transparent",
    borderRadius: 15,
    padding: 10,
  },
  skeleton_tarjeta_titulo: {
    width: "70%",
    marginVertical: 5,
  },
  tarjeta_loading_division: {
    backgroundColor: "transparent", //theme.colors.linea_tarjeta_RGBA,
    marginVertical: 5,
  },
  skeleton_loading_tarjeta: {
    backgroundColor: theme.colors.boton_primario,
  },
}));

export default PageLoading;
