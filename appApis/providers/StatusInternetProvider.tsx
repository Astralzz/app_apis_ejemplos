import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import NetInfo, {
  NetInfoState,
  NetInfoStateType,
} from "@react-native-community/netinfo";

// * Tipo de contexto
interface StatusInternetContextType {
  isConnected: boolean;
  connectionType: NetInfoStateType;
  checkInternetConnection: (customMessage?: string) => void;
}

//STUB -  Contexto
const StatusInternetContext = createContext<StatusInternetContextType | undefined>(
  undefined
);

//TODO - Proveedor de internet
const StatusInternetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //SECTION - Variables
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<NetInfoStateType>(
    NetInfoStateType.none
  );

  // * Checa conexión
  const checkInternetConnection = (customMessage?: string): void => {
    // ? Sin internet
    if (!isConnected) {
      throw new Error(
        customMessage ||
          "No tienes conexión a Internet en este momento. Por favor, verifica tu conexión y vuelve a intentarlo."
      );
    }
  };

  // * Al iniciar
  useEffect(() => {
    // * Al cambiar el internet
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    return () => unsubscribe();
  }, []);

  // * Proveedor
  return (
    <StatusInternetContext.Provider
      value={{ isConnected, connectionType, checkInternetConnection }}
    >
      {children}
    </StatusInternetContext.Provider>
  );
};

// * Uso
export const useStatusInternet = () => {
  // Contexto
  const context = useContext(StatusInternetContext);

  // ? Sin contexto
  if (!context) {
    throw new Error(
      "useStatusInternet debe usarse dentro de un StatusInternetProvider"
    );
  }

  return context;
};

export default StatusInternetProvider;
