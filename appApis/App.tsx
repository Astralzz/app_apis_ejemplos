import React from "react";
import { ThemeProvider } from "@rneui/themed";
import themeApp from "./theme/theme";
import Main from "./Main";
import StatusInternetProvider from "./providers/StatusInternetProvider";

//TODO - COMPONENTE PRINCIPAL
const App: React.FC = () => {
  return (
    <ThemeProvider theme={themeApp}>
      <StatusInternetProvider>
        <Main />
      </StatusInternetProvider>
    </ThemeProvider>
  );
};

export default App;
