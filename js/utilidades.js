export function generarID(tipo) {
  const tiempo = Date.now().toString(36); // Convierte el tiempo actual a base 36 (letras y números). 8 caracteres
  const aleatorio = Math.random().toString(36).substring(2, 6); // + 4 caracteres aleatorios
  return `${tipo}-${tiempo}-${aleatorio}`;  // quedaria "PROD-mqmv4g7y-h9kc"
}