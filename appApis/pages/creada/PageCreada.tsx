import React, { useCallback, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import {
  Card,
  Chip,
  Input,
  Text,
  makeStyles,
  useThemeMode,
} from "@rneui/themed";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";
import { useStatusInternet } from "../../providers/StatusInternetProvider";
import Pagination from "../../models/api_rick_morty/Pagination";
import { requestObtenerPaginaRickMorty } from "../../api/apiExterna";
import Nota from "../../models/notas/Nota";
import { requestObtenerListaNotas } from "../../api/apiCreada";

//TODO - COMPONENTE PRINCIPAL
const PageCreada: React.FC = () => {
  // * Estilos
  const styles = Styles();
  const { mode } = useThemeMode();

  // * Proveedores
  const { isConnected } = useStatusInternet();

  // * Variables
  const [directionIp, setDirectionIp] = useState<string>("127.0.0.1:8000");
  const [isCargandoDatos, setCargandoDatos] = useState<boolean>(false);
  const [listaNotas, setListaNotas] = useState<Nota[]>([]);

  // * Obtener datos
  const obtenerDatos = useCallback(async () => {
    try {
      // ? No esta cargando, esta completa o sin internet
      if (isCargandoDatos || !isConnected) return;

      setCargandoDatos(true);

      // Buscamos
      const { status, error, datosApiCreada } = await requestObtenerListaNotas({
        inicio: 1,
        final: 10,
        ip_port: directionIp,
      });

      // ? falso
      if (!status) {
        throw new Error(`${error || "desconocido"}`);
      }

      // ? No existen
      if (!datosApiCreada?.ListaNotas) {
        throw new Error("No se encontró el dato necesario");
      }

      console.log("====================================");
      console.log(datosApiCreada?.ListaNotas);
      console.log("====================================");

      // Éxito
      setListaNotas(datosApiCreada?.ListaNotas);

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
  }, [directionIp]);

  return (
    <View style={styles.container}>
      {/* //SECTION - Encabezado */}
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
            Esta api fue creada por mi, la api consta de un servidor en laravel
            conectada a una base de datos MySQL. Contiene una tabla llamada
            notas donde ponemos crear, eliminar y ver la lista
          </Text>

          {/* Dirección ip */}
          <View style={{ flexDirection: "row" }}>
            <Input
              value={directionIp}
              onChangeText={(t) => setDirectionIp(t)}
              style={styles.tarjeta_input_cuerpo}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={styles.tarjeta_input_texto}
              placeholderTextColor={"rgba(255,255,255,0.5)"}
              placeholder="Dirección ip"
              rightIcon={{
                size: 30,
                iconStyle: styles.tarjeta_input_icono,
                name: "search",
                type: "ionicon",
                onPress: obtenerDatos,
              }}
            />
          </View>

          {/* Enlace */}
          <TouchableOpacity>
            <Chip
              title={"Crear nota"}
              containerStyle={styles.tarjeta_chip}
              buttonStyle={styles.tarjeta_chip_boton}
              titleStyle={[styles.letra]}
              onPress={() => {}}
            />
          </TouchableOpacity>
        </View>
      </Card>

      {/* //SECTION - Cuerpo */}
      {isConnected || listaNotas?.length > 0 ? (
        // ? Esta cargando
        !isCargandoDatos ? (
          listaNotas?.length > 0 ? (
            <></>
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
  tarjeta_input_texto: {
    color: theme.colors.letra_primaria,
  },
  tarjeta_input_icono: {
    color: theme.colors.letra_primaria,
  },
  tarjeta_input_cuerpo: {
    borderBottomColor: theme.colors.letra_primaria,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  tarjeta_chip: {
    marginHorizontal: 30,
  },
  tarjeta_chip_boton: {
    backgroundColor: theme.colors.boton_primario,
  },
}));

export default PageCreada;
