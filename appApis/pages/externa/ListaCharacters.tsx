import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Button, makeStyles, useTheme } from "@rneui/themed";
import Personaje from "../../models/api_rick_morty/Personaje";
import Pagination from "../../models/api_rick_morty/Pagination";
import { useStatusInternet } from "../../providers/StatusInternetProvider";
import { requestObtenerUrlRickMorty } from "../../api/apiExterna";
import TarjetaCharacter from "./TarjetaCharacter";
import { generarClaveUnica } from "../../functions/globalFun";

// * Props
interface ListaCharactersProps {
  pagina: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  isCargando: boolean;
  obtenerDatos: () => Promise<void>;
}

//TODO - Tarjeta de noticias
const ListaCharacters: React.FC<ListaCharactersProps> = ({
  pagina,
  setPagination,
  isCargando,
  obtenerDatos,
}) => {
  //SECTION - Proveedores y estilos
  const styles = Styles();
  const { isConnected } = useStatusInternet();
  const { theme } = useTheme();

  //SECTION - Variables
  const [isCargandoMas, setCargandoMas] = useState<boolean>(false);
  const [isListaCompleta, setPaginationCompleta] = useState<boolean>(false);

  // Referencia al componente FlatList
  const flatListRef = useRef<FlatList<Personaje> | null>(null);

  //SECTION - Funciones

  // * Cargar mas noticias
  const cargarMasDatos = useCallback(
    async (info: { distanceFromEnd: number }): Promise<void> => {
      try {
        // ? No esta cargando, esta completa o sin internet
        if (
          isListaCompleta ||
          isCargandoMas ||
          isCargando ||
          !isConnected ||
          pagina?.info?.next === null
        )
          return;

        // ? No tiene 10 datos
        if (pagina?.results?.length < 10) return;

        // Cargando
        setCargandoMas(true);

        // Buscamos
        const {
          status: estado,
          error: detalles_error,
          datosApiExterna,
        } = await requestObtenerUrlRickMorty({
          url: pagina?.info?.next,
        });

        // ? falso
        if (!estado) {
          throw new Error(`${detalles_error || "desconocido"}`);
        }

        // ? No existen
        if (!datosApiExterna?.pagina?.info) {
          throw new Error("No se encontró el dato necesario");
        }

        // ? Sin nuevos caracteres
        if (datosApiExterna?.pagina?.info?.next === null) {
          setPaginationCompleta(true);
          return;
        }

        // Actualizamos
        setPagination((prevPagina) => ({
          info: datosApiExterna?.pagina?.info,
          results: [
            ...prevPagina?.results,
            ...datosApiExterna?.pagina?.results,
          ],
        }));

        // ! Error
      } catch (error: unknown | any) {
        Alert.alert(
          "Error al cargar",
          `No se cargaron los datos correctamente, ${String(
            error?.message || error
          )}`
        );
      } finally {
        setCargandoMas(false);
      }
    },
    [isConnected, isListaCompleta, isCargandoMas, isCargando]
  );

  // * Pre cargar datos
  const preCargarDatos = async (): Promise<void> => {
    setPaginationCompleta(false);
    await obtenerDatos();
  };

  // * Ir arriba
  const irArriba = (): void => {
    // ? Existe
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  // * Componente al final
  const ComponentFinalLista = (): React.ReactElement => {
    // ? No tiene 10 datos, no internet
    if (pagina?.results.length < 10 || !isConnected) return;

    // ? Lista completa
    if (isListaCompleta) {
      return (
        <View style={styles.pie_caja}>
          <Button
            title={`${
              isListaCompleta ? "No hay mas personajes" : "Limite alcanzado"
            }, Ir arriba`}
            titleStyle={styles.pie_boton_texto}
            icon={{
              type: "ionicon",
              name: "arrow-up-outline",
              iconStyle: styles.pie_boton_texto,
            }}
            buttonStyle={styles.pie_boton_caja}
            onPress={irArriba}
          ></Button>
        </View>
      );
    }

    // Carga
    return (
      <ActivityIndicator
        style={{ marginVertical: 10 }}
        size="small"
        color={theme.colors.letra_primaria}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={pagina?.results}
      keyExtractor={(per: Personaje) =>
        `${String(per.id)}${generarClaveUnica()}`
      }
      renderItem={({ item }) => <TarjetaCharacter personaje={item} />}
      refreshControl={
        <RefreshControl
          refreshing={isCargando}
          onRefresh={isConnected && preCargarDatos}
          progressBackgroundColor={theme.colors.boton_primario}
          colors={[theme.colors.letra_primaria]}
        />
      }
      onEndReached={cargarMasDatos}
      onEndReachedThreshold={0.9}
      ListFooterComponent={ComponentFinalLista}
    />
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  //SECTION -  Pie
  pie_caja: {
    marginTop: 10,
    alignContent: "center",
    backgroundColor: theme.colors.secundario,
  },
  pie_boton_caja: {
    backgroundColor: theme.colors.boton_primario,
    borderColor: "red",
  },
  pie_boton_texto: {
    color: theme.colors.letra_primaria,
    fontSize: 15,
  },
}));

export default ListaCharacters;
