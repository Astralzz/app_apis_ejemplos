import React from "react";
import { Card, Image, Text, makeStyles } from "@rneui/themed";
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {/* Imagen */}
        {personaje?.image && (
          <Image
            source={{ uri: personaje.image }}
            containerStyle={styles.tarjeta_img}
            resizeMode="center"
          />
        )}

        <View
          style={{
            marginStart: 70,
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {/* Genero */}
          {personaje?.gender && (
            <Text style={[styles.letra]}>{personaje.gender}</Text>
          )}

          {/* Genero */}
          {personaje?.species && (
            <Text style={[styles.letra]}>{String(personaje.species)}</Text>
          )}

          {/* Genero */}
          {personaje?.status && (
            <Text style={[styles.letra]}>{personaje.status}</Text>
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
  tarjeta_img: {
    width: 150,
    height: 150,
  },
}));

export default TarjetaCharacter;
