import React, { useState } from "react";
import { Card, Chip, Text, makeStyles } from "@rneui/themed";
import { Alert, TouchableOpacity, View } from "react-native";
import Nota from "../../models/notas/Nota";
import { requestEliminarNota } from "../../api/apiCreada";

// * Props
interface TarjetaNotaProps {
  nota: Nota;
  directionIp: string;
  isDireccionIpValida: boolean;
}

//TODO - Tarjeta de notas
const TarjetaNota: React.FC<TarjetaNotaProps> = ({
  nota,
  directionIp,
  isDireccionIpValida,
}) => {
  // * Estilos
  const styles = Styles();

  // * Variables
  const [isCargando, setCargando] = useState<boolean>(false);
  const [isNotaEliminada, setNotaEliminada] = useState<boolean>(false);

  // * Eliminar nota
  const eliminarNota = React.useCallback(
    async (id: number): Promise<void> => {
      try {
        // ? Cargando
        if (isCargando) return;

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

        // * Éxito
        setNotaEliminada(true);
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
  return isNotaEliminada ? (
    <React.Fragment />
  ) : (
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
          <TouchableOpacity>
            <Chip
              title={"Eliminar nota"}
              containerStyle={styles.tarjeta_chip}
              buttonStyle={styles.tarjeta_chip_boton}
              titleStyle={[styles.letra]}
              disabled={isCargando}
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
          </TouchableOpacity>
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
  tarjeta_chip: {
    marginHorizontal: 30,
  },
  tarjeta_chip_boton: {
    backgroundColor: theme.colors.boton_primario,
  },
}));

export default TarjetaNota;
