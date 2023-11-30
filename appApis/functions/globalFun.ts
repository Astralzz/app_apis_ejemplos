// * Genera key
export function generarClaveUnica(n: number = 6): string {
  let clave = "";

  // Generamos
  for (let i = 0; i < n; i++) {
    // Genera un número aleatorio entre 0 y 9, y lo convierte a cadena
    clave += Math.floor(Math.random() * 10).toString();
  }

  return clave;
}
