import * as WebBrowser from "expo-web-browser";

// * Abrir navegador
export const abrirNavegadorSimpleAsync = async (url: string) => {
  try {
    // const result: WebBrowserResult = await WebBrowser.openBrowserAsync(url);
    await WebBrowser.openBrowserAsync(url);
  } catch (error: unknown | any) {
    console.log("====================================");
    console.log(`Error al abrir navegador, ${String(error?.message || error)}`);
    console.log("====================================");
  }
};
