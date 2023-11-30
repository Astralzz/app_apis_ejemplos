import React from "react";
import { Input, makeStyles } from "@rneui/themed";
import { IconNode } from "@rneui/base";

// * Props
export interface InputElementProps {
  valor: string;
  setValor: (t: string) => void;
  isDesactivado?: boolean;
  placeholderText?: string;
  noFilas?: number;
  iconoDerecho?: IconNode;
  iconoIzquierdo?: IconNode;
}

//TODO - COMPONENTE INPUT
const InputElement: React.FC<InputElementProps> = ({
  valor,
  setValor,
  isDesactivado,
  placeholderText,
  noFilas,
  iconoDerecho,
  iconoIzquierdo,
}) => {
  // * Estilos
  const styles = Styles();

  // Icono
  const formatIcon = (icon: IconNode | undefined) =>
    icon && typeof icon === "object"
      ? {
          size: 30,
          type: "ionicon",
          iconStyle: styles.tarjeta_input_icono,
          disabledStyle: styles.tarjeta_input_icono_desactivado,
          ...icon,
        }
      : icon;

  return (
    <Input
      value={valor}
      onChangeText={(t) => setValor(t)}
      style={styles.tarjeta_input_cuerpo}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      inputStyle={styles.tarjeta_input_texto}
      placeholderTextColor={"rgba(255,255,255,0.5)"}
      disabled={isDesactivado}
      placeholder={placeholderText}
      numberOfLines={noFilas}
      leftIcon={formatIcon(iconoIzquierdo)}
      rightIcon={formatIcon(iconoDerecho)}
    />
  );
};

//SECTION - Estilo
const Styles = makeStyles((theme) => ({
  tarjeta_input_texto: {
    color: theme.colors.letra_primaria,
  },
  tarjeta_input_icono: {
    color: theme.colors.letra_primaria,
    borderRadius: 15,
    padding: 5,
  },
  tarjeta_input_icono_desactivado: {
    backgroundColor: theme.colors.error,
  },
  tarjeta_input_cuerpo: {
    borderBottomColor: theme.colors.letra_primaria,
    borderBottomWidth: 1,
  },
}));

export default InputElement;
