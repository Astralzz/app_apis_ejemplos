import React, { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { Card, Chip, Text, makeStyles } from "@rneui/themed";
import PageLoading from "../../components/PageLoading";
import PageError from "../../components/PageError";
import { useStatusInternet } from "../../providers/StatusInternetProvider";
import Nota from "../../models/notas/Nota";
import {
  requestCrearNota,
  requestObtenerListaNotas,
} from "../../api/apiCreada";
import ListaNotas from "./ListaNotas";
import InputElement from "../../components/InputElement";
import ModalInputs from "../../components/ModalInputs";

// * ER
const directionIpRegExp: RegExp =
  /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}$/;
const nombreRegExp: RegExp = /^[a-zA-Z0-9\s]{2,240}$/;
const mensajeRegExp: RegExp = /^.{2,700}$/;

//TODO - COMPONENTE PRINCIPAL
const PageCreada: React.FC = () => {
  // * Estilos
  const styles = Styles();

  // * Proveedores
  const { isConnected, checkInternetConnection } = useStatusInternet();

  // * Variables
  const [directionIp, setDirectionIp] = useState<string>("");
  const [isCargandoDatos, setCargandoDatos] = useState<boolean>(false);
  const [isDireccionIpValida, setDireccionIpValida] = useState<boolean>(false);
  const [listaNotas, setListaNotas] = useState<Nota[]>([]);

  // * Variables crear nota
  const [isCreandoNota, setCreandoNota] = useState<boolean>(false);
  const [isModalCrear, setModalCrear] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  // * Obtener datos
  const obtenerDatos = useCallback(async () => {
    try {
      // ? Esta cargando, sin internet
      if (isCargandoDatos || !isConnected) return;

      // ? direccion no valida
      if (!directionIpRegExp.test(directionIp)) {
        throw new Error("La direccion ip no es valida");
      }

      setCargandoDatos(true);

      // Data
      const data = {
        inicio: 1,
        final: 10,
        ip_port: directionIp,
      };

      // Buscamos
      const { status, error, datosApiCreada } = await requestObtenerListaNotas(
        data
      );

      // ? falso
      if (!status) {
        throw new Error(`${error || "desconocido"}`);
      }

      // ? No existen
      if (!datosApiCreada?.ListaNotas) {
        throw new Error("No se encontró el dato necesario");
      }

      // Éxito
      setListaNotas(datosApiCreada?.ListaNotas);
      setDireccionIpValida(true);

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
  }, [directionIp, isConnected]);

  // * Obtener datos
  const crearNota = useCallback(async () => {
    try {
      // ? Checamos internet
      checkInternetConnection();

      // ? Nombre no valida
      if (!nombreRegExp.test(nombre)) throw new Error("El nombre es erróneo");

      // ? Mensaje no valido
      if (!mensajeRegExp.test(mensaje))
        throw new Error("El mensaje es erróneo");

      setCreandoNota(true);

      // Data
      const data = {
        ip_port: directionIp,
        nombre: nombre,
        mensaje: mensaje,
      };

      // Buscamos
      const { status, error } = await requestCrearNota(data);

      // ? falso
      if (!status) {
        throw new Error(`${error || "desconocido"}`);
      }

      // Limpiamos
      setNombre("");
      setMensaje("");

      // Mensaje
      Alert.alert("Éxito", "La nota se creo correctamente");

      // Actualizamos
      await obtenerDatos();

      // ! Error
    } catch (error: unknown | any) {
      Alert.alert("Error al crear nota", `${String(error?.message || error)}`);
    } finally {
      setCreandoNota(false);
    }
  }, [nombre, mensaje, directionIp, isConnected]);

  return (
    <View style={styles.container}>
      {/* //SECTION - Encabezado */}
      <Card containerStyle={styles.tarjeta}>
        {/* Titulo */}
        <Card.Title style={[styles.letra]} h4>
          Api creada por Arturo Navarro
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
            <InputElement
              valor={directionIp}
              setValor={setDirectionIp}
              isDesactivado={isCargandoDatos || isDireccionIpValida}
              placeholderText="127.0.0.1:8000"
              iconoIzquierdo={{
                name: "close",
                onPress: () => {
                  setDirectionIp("");
                  setDireccionIpValida(false);
                },
              }}
              iconoDerecho={{
                name: "search",
                onPress: obtenerDatos,
                disabled: isCargandoDatos || isDireccionIpValida,
              }}
            />
          </View>

          {/* Crear nota */}
          <Chip
            title={"Crear nota"}
            containerStyle={styles.tarjeta_chip}
            buttonStyle={styles.tarjeta_chip_boton}
            disabledStyle={styles.tarjeta_chip_boton}
            titleStyle={[styles.letra]}
            disabled={!isDireccionIpValida}
            onPress={() => setModalCrear(true)}
          />
        </View>
      </Card>

      {/* //SECTION - Cuerpo */}
      {isConnected || listaNotas?.length > 0 ? (
        // ? Esta cargando
        !isCargandoDatos ? (
          listaNotas?.length > 0 ? (
            <ListaNotas
              lista={listaNotas}
              setLista={setListaNotas}
              isCargando={isCargandoDatos}
              obtenerDatos={obtenerDatos}
              directionIp={directionIp}
              isDireccionIpValida={isDireccionIpValida}
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

      {/* Modal de crear nota */}
      <ModalInputs
        isVisible={isModalCrear}
        cerrarModal={() => setModalCrear(false)}
        inputsProps={[
          {
            valor: nombre,
            setValor: setNombre,
            placeholderText: "Nombre",
          },
          {
            valor: mensaje,
            setValor: setMensaje,
            placeholderText: "Mensaje",
            noFilas: 3,
          },
        ]}
        titulo={"Crear nota"}
        action={crearNota}
        isCargandoAction={isCreandoNota}
      />
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
    marginHorizontal: 30,
  },
  tarjeta_chip_boton: {
    backgroundColor: theme.colors.boton_primario,
  },
}));

export default PageCreada;
