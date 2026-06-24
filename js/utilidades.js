export function generarID(tipo) {
  const tiempo = Date.now().toString(36); // Convierte el tiempo actual a base 36 (letras y números). 8 caracteres
  const aleatorio = Math.random().toString(36).substring(2, 6); // + 4 caracteres aleatorios
  return `${tipo}-${tiempo}-${aleatorio}`; // quedaria "PROD-mqmv4g7y-h9kc"
}

export function validarCadena(cadena, min, max) {
  return cadena.length < min || cadena.length > max ? false : true;
}

export function feedback(elemento, idFeedback, msjError) {
  const feedbackDiv = document.getElementById(idFeedback);
  feedbackDiv.classList.remove("valid-feedback", "invalid-feedback");
  elemento.classList.remove("is-valid", "is-invalid");

  if (msjError) {
    elemento.classList.add("is-invalid");
    feedbackDiv.classList.add("invalid-feedback");
    feedbackDiv.textContent = msjError;
  } else {
    elemento.classList.add("is-valid");
    feedbackDiv.classList.add("valid-feedback");
    feedbackDiv.textContent = `El campo ${elemento.name} está OK`;
  }
}

export function limpiarEstados(selectorForm) {
  const inputs = document.querySelectorAll(
    `${selectorForm} .form-control, ${selectorForm} .form-select, ${selectorForm} .form-check-input`,
  );
  for (const input of inputs) {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
  }
}
