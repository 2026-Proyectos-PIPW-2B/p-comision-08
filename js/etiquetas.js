import { autorizacion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  agregarEtiqueta,
  traerTodasLasEtiquetas,
  eliminarEtiqueta,
  buscarEtiqueta
} from "./gestores/gestorEtiquetas.js";

const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const formAltaEtiqueta = document.getElementById("formAltaEtiqueta");


window.addEventListener("load", () => {
    autorizacion("Administrador")
    cargarDatosNavbar()
    listarEtiquetas()
});


formAltaEtiqueta.addEventListener("submit", (e) => {
  e.preventDefault();

  const validacion = validarFormAltaEtiqueta();

  if (validacion.resultado) {

    agregarEtiqueta(validacion.obj);

    alert("Etiqueta creada correctamente");

    formAltaEtiqueta.reset();

    listarEtiquetas();
  }
});

function validarFormAltaEtiqueta() {
  const nombre = inputNombre.value.trim();
  const descripcion = inputDescripcion.value.trim();

  let validacion = { resultado: true };


  if (nombre.length === 0) {
    validacion.resultado = false;
    feedback(
      inputNombre,
      "feedbackNombre",
      "ERROR: Debe ingresar un nombre para la etiqueta."
    );

  } else {

    const etiquetaExistente = buscarEtiqueta(nombre);

    if (etiquetaExistente) {
      validacion.resultado = false;

      feedback(
        inputNombre,
        "feedbackNombre",
        "ERROR: La etiqueta ya existe."
      );

    } else {
      feedback(inputNombre, "feedbackNombre");
    }
  }


  if (descripcion.length === 0) {
    validacion.resultado = false;

    feedback(
      inputDescripcion,
      "feedbackDescripcion",
      "ERROR: Debe ingresar una descripción."
    );

  } else {
    feedback(inputDescripcion, "feedbackDescripcion");
  }


  validacion.obj = {
    nombre,
    descripcion
  };

  return validacion;
}

function feedback(elemento, idFeedback, msjError) {

  const feedbackDiv = document.getElementById(idFeedback);

  feedbackDiv.classList.remove(
    "valid-feedback",
    "invalid-feedback"
  );


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

function listarEtiquetas() {

  const tablaEtiquetas = document.getElementById("tablaEtiquetas");

  tablaEtiquetas.innerHTML = "";

  const listado = traerTodasLasEtiquetas();


  for (const etiqueta of listado) {

    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    const tdDescripcion = document.createElement("td");
    const tdEditar = document.createElement("td");
    const tdEliminar = document.createElement("td");


    const btnEliminar = document.createElement("button");


    tdNombre.textContent = etiqueta.nombre;
    tdDescripcion.textContent = etiqueta.descripcion;


    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.innerHTML = `<i class="bi bi-trash"></i>`;


    btnEliminar.addEventListener("click", () => {
      borrarEtiqueta(etiqueta.nombre);
    });


    tdEliminar.appendChild(btnEliminar);


    tr.append(
      tdNombre,
      tdDescripcion,
      tdEditar,
      tdEliminar
    );


    tablaEtiquetas.appendChild(tr);
  }
}

function borrarEtiqueta(nombre) {

    eliminarEtiqueta(nombre);
    listarEtiquetas();
  }