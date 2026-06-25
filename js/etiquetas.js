import { autorizacion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  agregarEtiqueta,
  traerTodasLasEtiquetas,
  eliminarEtiqueta,
  buscarEtiqueta,
  modificarEtiqueta
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

  limpiarEstados();

  const validacion = validarFormAltaEtiqueta();

  if (validacion.resultado) {

    limpiarEstados();

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


    const btnEditar = document.createElement("button")
    const btnEliminar = document.createElement("button");


    tdNombre.textContent = etiqueta.nombre;
    tdDescripcion.textContent = etiqueta.descripcion;

    //Boton editar
    btnEditar.classList.add("btn", "btn-primary", "btn-sm");
    btnEditar.setAttribute("data-bs-toggle", "modal");
    btnEditar.setAttribute("data-bs-target", "#modalEditarEtiqueta");
    btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
    btnEditar.addEventListener("click", () =>
      cargarEtiquetaEnElModal(etiqueta),
    );

    // Boton eliminar
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.innerHTML = `<i class="bi bi-trash"></i>`;


    btnEliminar.addEventListener("click", () => {
      borrarEtiqueta(etiqueta.nombre);
    });

    tdEditar.appendChild(btnEditar);
    tdEliminar.appendChild(btnEliminar);


    tr.append(
      tdNombre,
      tdDescripcion,
      tdEditar,
      tdEditar,
      tdEliminar
    );


    tablaEtiquetas.appendChild(tr);
  }
}

function cargarEtiquetaEnElModal(etiqueta) {
  const nombre = document.getElementById("modalInputNombre");
  const descripcion = document.getElementById("modalInputDescripcion");

  nombre.value = etiqueta.nombre;
  descripcion.value = etiqueta.descripcion;

  const btnGuardar = document.getElementById("btnGuardarCambios");
  btnGuardar.addEventListener("click", () => editarEtiqueta(etiqueta.id));
}

function editarEtiqueta(id) {
  const nuevoNombre = document.getElementById("modalInputNombre").value;
  const nuevaDescripcion = document.getElementById(
    "modalInputDescripcion",
  ).value;

  const obj = { nombre: nuevoNombre, descripcion: nuevaDescripcion };

  const btnCerrarModal = document.getElementById("btnCerrarModal");
  modificarEtiqueta(id, obj);
  btnCerrarModal.click();
  listarEtiquetas();
}



function borrarEtiqueta(nombre) {

    eliminarEtiqueta(nombre);
    listarEtiquetas();
  }

function limpiarEstados() {
  const inputs = document.querySelectorAll("#formAltaEtiqueta .form-control");

  for (const input of inputs) {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
  }
}