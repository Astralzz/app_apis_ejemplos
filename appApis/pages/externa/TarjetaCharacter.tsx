import React from "react";
import { Card, Text, makeStyles } from "@rneui/themed";
import { View } from "react-native";
import Personaje from "../../models/api_rick_morty/Personaje";

// * Props
interface TarjetaCharacterProps {
  personaje: Personaje;
}

//TODO - Tarjeta de personajes
const TarjetaCharacter: React.FC<TarjetaCharacterProps> = ({ personaje }) => {
  const styles = Styles();

  return (
    <Card containerStyle={styles.tarjeta}>
      <View style={styles.tarjeta_encabezado}>
        {/* Imagen */}
        {personaje?.image && (
          <Card.Image
            source={{ uri: personaje.image }}
            containerStyle={styles.tarjeta_img}
            resizeMode="center"
          />
        )}

        {/* Parte derecha */}
        <View style={styles.tarjeta_encabezado_derecha}>
          {/* Genero */}
          {personaje?.gender && (
            <Text
              style={[styles.letra, styles.tarjeta_encabezado_derecha_letra]}
            >
              {personaje.gender}
            </Text>
          )}

          {/* Especie */}
          {personaje?.species && (
            <Text
              style={[styles.letra, styles.tarjeta_encabezado_derecha_letra]}
            >
              {String(personaje.species)}
            </Text>
          )}

          {/* Estado */}
          {personaje?.status && (
            <Text
              style={[styles.letra, styles.tarjeta_encabezado_derecha_letra]}
            >
              {personaje.status}
            </Text>
          )}
        </View>
      </View>

      {/* Division */}
      <Card.Divider style={styles.tarjeta_division} />

      {/* Cuerpo */}
      <View style={styles.tarjeta_cuerpo}>
        {/* Nombre */}
        {personaje?.name && (
          <Card.Title style={[styles.letra]} h4>
            {personaje.name}
          </Card.Title>
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
  tarjeta_encabezado: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tarjeta_encabezado_derecha: {
    flex: 1,
    flexDirection: "column",
  },
  tarjeta_encabezado_derecha_letra: {
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
  tarjeta_img: {
    width: 150,
    height: 150,
  },
}));

export default TarjetaCharacter;
