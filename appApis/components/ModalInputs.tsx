import React from "react";
import { Button, Dialog, makeStyles } from "@rneui/themed";
import InputElement, { InputElementProps } from "./InputElement";
import { View } from "react-native";

// * Props
interface ModalInputsProps {
  isVisible: boolean;
  cerrarModal: () => void;
  inputsProps: InputElementProps[];
  titulo: string;
  action: () => void | Promise<void>;
  isCargandoAction: boolean;
}

//TODO - COMPONENTE INPUT
const ModalInputs: React.FC<ModalInputsProps> = ({
  isVisible,
  cerrarModal,
  inputsProps,
  titulo,
  action,
  isCargandoAction,
}) => {
  // * Estilos
  const styles = Styles();

  return (
    <Dialog
      overlayStyle={styles.container_modal}
      isVisible={isVisible}
      onBackdropPress={cerrarModal}
    >
      {/* Titulo */}
      <Dialog.Title titleStyle={[styles.letra, styles.titulo]} title={titulo} />

      {/* Cuerpo */}
      <View>
        {/* Inputs */}
        {inputsProps.map((props, i) => (
          <InputElement key={i} {...props} />
        ))}

        {/* Boton de aceptar */}
        <Button
          title={"Aceptar"}
          containerStyle={styles.tarjeta_button_container}
          buttonStyle={styles.tarjeta_button}
          disabledStyle={styles.tarjeta_button}
          titleStyle={[styles.letra]}
          disabled={isCargandoAction}
          loading={isCargandoAction}
          onPress={action}
        />
      </View>
    </Dialog>
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  container_modal: {
    backgroundColor: theme.colors.primario,
  },

  titulo: {
    fontSize: 22,
    marginBottom: 30,
  },

  letra: {
    color: theme.colors.letra_primaria,
  },

  tarjeta_button_container: {
    marginHorizontal: 30,
  },
  tarjeta_button: {
    backgroundColor: theme.colors.boton_primario,
  },
}));

export default ModalInputs;
