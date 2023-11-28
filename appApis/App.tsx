import React from "react";
import { ThemeProvider } from "@rneui/themed";
import themeApp from "./theme/theme";
import Main from "./Main";

//TODO - COMPONENTE PRINCIPAL
const App: React.FC = () => {
  return (
    <ThemeProvider theme={themeApp}>
      <Main />
    </ThemeProvider>
  );
};

export default App;
