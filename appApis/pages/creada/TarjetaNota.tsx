import React, { useState } from "react";
import { Card, Button, Text, makeStyles } from "@rneui/themed";
import { Alert, View } from "react-native";
import Nota from "../../models/notas/Nota";
import { requestEliminarNota } from "../../api/apiCreada";
import { useStatusInternet } from "../../providers/StatusInternetProvider";

// * Props
interface TarjetaNotaProps {
  nota: Nota;
  directionIp: string;
  isDireccionIpValida: boolean;
  eliminarDeLaLista: (id: number) => void;
}

//TODO - Tarjeta de notas
const TarjetaNota: React.FC<TarjetaNotaProps> = ({
  nota,
  directionIp,
  isDireccionIpValida,
  eliminarDeLaLista,
}) => {
  // * Estilos
  const { isConnected, checkInternetConnection } = useStatusInternet();
  const styles = Styles();

  // * Variables
  const [isCargando, setCargando] = useState<boolean>(false);

  // * Eliminar nota
  const eliminarNota = React.useCallback(
    async (id: number): Promise<void> => {
      try {
        // ? Cargando
        if (isCargando) return;


        // ? Internet
        checkInternetConnection();

        // Cargando
        setCargando(true);

        // Data
        const data = {
          id: id,
          ip_port: directionIp,
        };

        // Eliminamos
        const { status, error } = await requestEliminarNota(data);

        // ? falso
        if (!status) {
          throw new Error(`${error || "desconocido"}`);
        }

        // Eliminamos
        eliminarDeLaLista(id);

        // * Éxito
        Alert.alert("Éxito", "La nota se elimino correctamente");
        // ! Error
      } catch (error: unknown | any) {
        Alert.alert(
          "Error al eliminar",
          `La nota no se elimino correctamente, ${String(
            error?.message || error
          )}`
        );
      } finally {
        setCargando(false);
      }
    },
    [directionIp]
  );

  //TODO - Cuerpo
  return (
    <Card containerStyle={styles.tarjeta}>
      {/* Nombre */}
      {nota?.nombre && (
        <Card.Title style={[styles.letra]} h4>
          {nota.nombre}
        </Card.Title>
      )}

      {/* Division */}
      <Card.Divider style={styles.tarjeta_division} />

      {/* Cuerpo */}
      <View style={styles.tarjeta_cuerpo}>
        {/* Mensaje */}
        {nota?.mensaje && (
          <Text style={[styles.letra, styles.tarjeta_mensaje]}>
            {nota.mensaje}
          </Text>
        )}

        {/* Enlace */}
        {nota?.id && (
            <Button
              title={"Eliminar nota"}
              containerStyle={styles.tarjeta_button_container}
              buttonStyle={styles.tarjeta_button}
              disabledStyle={styles.tarjeta_button}
              titleStyle={[styles.letra]}
              disabled={isCargando || !isConnected}
              loading={isCargando}
              onPress={() => {
                // ? No valida
                if (!isDireccionIpValida) return;

                // Alerta
                Alert.alert(
                  "¿Seguro?",
                  "¿Estas seguro de eliminar esta nota?",
                  [
                    {
                      text: "Cancelar",
                    },
                    {
                      text: "Eliminar",
                      onPress: () => eliminarNota(nota?.id),
                    },
                  ]
                );
              }}
            />
        )}
      </View>
    </Card>
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  // * Tarjeta
  letra: {
    color: theme.colors.letra_primaria,
    textAlign: "center",
  },
  tarjeta: {
    backgroundColor: theme.colors.secundario,
    marginBottom: 10,
    borderRadius: 25,
    elevation: 15,
  },
  tarjeta_mensaje: {
    fontSize: 18,
    marginVertical: 5,
  },
  tarjeta_division: {
    backgroundColor: theme.colors.letra_primaria,
    marginVertical: 7,
  },
  tarjeta_cuerpo: {
    marginHorizontal: 10,
  },
  tarjeta_button_container: {
    marginHorizontal: 30,
  },
  tarjeta_button: {
    backgroundColor: theme.colors.boton_primario,
    borderRadius: 25,
  },
}));

export default TarjetaNota;
