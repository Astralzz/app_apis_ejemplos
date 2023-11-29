import React, { useCallback, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Chip, Text, makeStyles, useThemeMode } from "@rneui/themed";
import { Card } from "@rneui/base";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";
import { useStatusInternet } from "../../providers/StatusInternetProvider";
import { abrirNavegadorSimpleAsync } from "../../functions/browserFun";
import { urlApiExterna } from "../../api/config";
import Pagination from "../../models/api_rick_morty/Pagination";
import { requestObtenerPaginaRickMorty } from "../../api/apiExterna";
import ListaCharacters from "./ListaCharacters";

//TODO - COMPONENTE PRINCIPAL
const PageApiExterna: React.FC = () => {
  // * Estilos
  const styles = Styles();
  const { mode } = useThemeMode();

  // * Proveedores
  const { isConnected } = useStatusInternet();

  // * Variables
  const [isCargandoDatos, setCargandoDatos] = useState<boolean>(true);
  const [pagina, setPagina] = useState<Pagination>(null);

  // * Obtener datos
  const obtenerDatos = useCallback(async () => {
    try {
      // ? No esta cargando, esta completa o sin internet
      if (isCargandoDatos || !isConnected) return;

      setCargandoDatos(true);

      // Buscamos
      const { estado, detalles_error, datosApiExterna } =
        await requestObtenerPaginaRickMorty({
          page: 1,
        });

      // ? falso
      if (!estado) {
        throw new Error(`${detalles_error || "desconocido"}`);
      }

      // ? No existen
      if (!datosApiExterna?.pagina) {
        throw new Error("No se encontró el dato necesario");
      }

      // Éxito
      setPagina(datosApiExterna?.pagina);

      // ! Error
    } catch (error: unknown | any) {
      Alert.alert(
        "Error al cargar",
        `No se cargaron los datos correctamente, ${String(
          error?.message || error
        )}`
      );
    } finally {
      setCargandoDatos(false);
    }
  }, [isConnected]);

  // * Tarjeta encabezado
  const TarjetaEncabezado = useCallback(
    (): React.ReactElement => (
      <Card containerStyle={styles.tarjeta}>
        {/* Titulo */}
        <Card.Title style={[styles.letra]} h4>
          The Rick and Morty API
        </Card.Title>

        {/* Division */}
        <Card.Divider style={styles.tarjeta_division} />

        {/* Cuerpo */}
        <View style={styles.tarjeta_cuerpo}>
          {/* Descripción */}
          <Text style={[styles.letra]}>
            La API de Rick and Morty es una API RESTful y GraphQL basada en el
            programa de televisión Rick and Morty y te permitirá acceder a datos
            sobre cientos de personajes, imágenes, ubicaciones y episodios.
          </Text>

          {/* Enlace */}
          <TouchableOpacity>
            <Chip
              title={"Ejemplo"}
              containerStyle={styles.tarjeta_chip}
              buttonStyle={styles.tarjeta_chip_boton}
              titleStyle={[styles.letra]}
              onPress={() => abrirNavegadorSimpleAsync(urlApiExterna(1))}
            />
          </TouchableOpacity>

          {/* Enlace */}
          <TouchableOpacity>
            <Chip
              title={"Pagina oficial"}
              containerStyle={styles.tarjeta_chip}
              buttonStyle={styles.tarjeta_chip_boton}
              titleStyle={[styles.letra]}
              onPress={() =>
                abrirNavegadorSimpleAsync("https://rickandmortyapi.com/")
              }
            />
          </TouchableOpacity>
        </View>
      </Card>
    ),
    [mode]
  );

  React.useEffect(() => {
    obtenerDatos();
  }, [isConnected]);

  return (
    <View style={styles.container}>
      {/* //SECTION - Encabezado */}
      <TarjetaEncabezado />

      {/* //SECTION - Cuerpo */}
      {isConnected || (pagina?.results && pagina?.results?.length > 0) ? (
        // ? Esta cargando
        !isCargandoDatos ? (
          pagina?.results?.length > 0 ? (
            <ListaCharacters
              pagina={pagina}
              setPagination={setPagina}
              isCargando={isCargandoDatos}
              obtenerDatos={obtenerDatos}
            />
          ) : (
            <PageError
              mensaje="La lista esta vacía"
              mensajeHeader="Sin datos"
            />
          )
        ) : (
          <PageLoading tipo="tarjetas" filas={4} sizeLinea="chica" />
        )
      ) : (
        <PageError
          mensaje="No tienes conexion a internet"
          mensajeHeader="Sin internet"
        />
      )}
    </View>
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primario,
  },
  letra: {
    color: theme.colors.letra_primaria,
    textAlign: "center",
  },

  // * Tarjeta
  tarjeta: {
    backgroundColor: theme.colors.secundario,
    marginBottom: 10,
    borderRadius: 25,
    elevation: 15,
  },
  tarjeta_division: {
    backgroundColor: theme.colors.letra_primaria,
    marginVertical: 7,
  },
  tarjeta_cuerpo: {
    marginHorizontal: 10,
  },
  tarjeta_chip: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  tarjeta_chip_boton: {
    backgroundColor: theme.colors.boton_primario,
  },
}));

export default PageApiExterna;
