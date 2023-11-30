import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Button, makeStyles, useTheme } from "@rneui/themed";
import { useStatusInternet } from "../../providers/StatusInternetProvider";
import { generarClaveUnica } from "../../functions/globalFun";
import Nota from "../../models/notas/Nota";
import { requestObtenerListaNotas } from "../../api/apiCreada";
import TarjetaNota from "./TarjetaNota";

// * Props
interface ListaNotasProps {
  lista: Nota[];
  setLista: React.Dispatch<React.SetStateAction<Nota[]>>;
  isCargando: boolean;
  obtenerDatos: () => Promise<void>;
  directionIp: string;
  isDireccionIpValida: boolean;
}

//TODO - Tarjeta de noticias
const ListaNotas: React.FC<ListaNotasProps> = ({
  lista,
  setLista,
  isCargando,
  obtenerDatos,
  directionIp,
  isDireccionIpValida,
}) => {
  //SECTION - Proveedores y estilos
  const styles = Styles();
  const { isConnected } = useStatusInternet();
  const { theme } = useTheme();

  //SECTION - Variables
  const [isCargandoMas, setCargandoMas] = useState<boolean>(false);
  const [isListaCompleta, setListaCompleta] = useState<boolean>(false);

  // Referencia al componente FlatList
  const flatListRef = useRef<FlatList<Nota> | null>(null);

  //SECTION - Funciones

  // * Cargar mas noticias
  const cargarMasDatos = useCallback(
    async (info: { distanceFromEnd: number }): Promise<void> => {
      try {
        // ? No esta cargando, esta completa o sin internet
        if (isListaCompleta || isCargandoMas || isCargando || !isConnected)
          return;

        // Cargando
        setCargandoMas(true);

        // Data
        const data = {
          inicio: lista.length,
          final: lista.length + 10,
          ip_port: directionIp,
        };

        // Buscamos
        const { status, error, datosApiCreada } =
          await requestObtenerListaNotas(data);

        // ? falso
        if (!status) {
          throw new Error(`${error || "desconocido"}`);
        }

        // ? No existen
        if (!datosApiCreada?.ListaNotas) {
          throw new Error("No se encontró el dato necesario");
        }

        // ? Sin nuevas notas
        if (datosApiCreada?.ListaNotas.length < 1) {
          setListaCompleta(true);
          return;
        }

        // Actualizamos
        setLista(
          (PreLista) => [...PreLista, ...datosApiCreada.ListaNotas] as Nota[]
        );

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
    [isConnected, isListaCompleta, isCargandoMas, isCargando, directionIp]
  );

  // * Pre cargar datos
  const preCargarDatos = async (): Promise<void> => {
    setListaCompleta(false);
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
    // ? No tiene 10 datos
    if (lista?.length < 10 || !isDireccionIpValida) return;

    // ? Lista completa
    if (isListaCompleta) {
      return (
        <View style={styles.pie_caja}>
          <Button
            title={`${
              isListaCompleta ? "No hay mas notas" : "Limite alcanzado"
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
      data={lista}
      keyExtractor={(nt: Nota) => `${String(nt.id)}${generarClaveUnica()}`}
      renderItem={({ item }) => (
        <TarjetaNota
          nota={item}
          directionIp={directionIp}
          isDireccionIpValida={isDireccionIpValida}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isCargando}
          onRefresh={isConnected && isDireccionIpValida && preCargarDatos}
          progressBackgroundColor={theme.colors.boton_primario}
          colors={[theme.colors.letra_primaria]}
        />
      }
      onEndReached={isDireccionIpValida && cargarMasDatos}
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

export default ListaNotas;
