import { autorizacion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  agregarCategoria,
  buscarCategoria,
  traerTodasLasCategorias,
  eliminarCategoria,
  modificarCategoria,
} from "./gestores/gestorCategorias.js";

const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const formAltaCategoria = document.getElementById("formAltaCategoria");

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  listarCategorias();
});

formAltaCategoria.addEventListener("submit", (e) => {
  e.preventDefault();

  limpiarEstados();

  const validacion = validarFormAltaCategoria();

  if (validacion.resultado) {
    limpiarEstados();

    agregarCategoria(validacion.obj);

    alert("Categoria creada correctamente");

    formAltaCategoria.reset();

    listarCategorias();
  }
});

function validarFormAltaCategoria() {
  const nombre = inputNombre.value.trim();
  const descripcion = inputDescripcion.value.trim();

  let validacion = { resultado: true };

  if (nombre.length === 0) {
    validacion.resultado = false;

    feedback(
      inputNombre,
      "feedbackNombre",
      "ERROR: Debe ingresar un nombre para la categoría.",
    );
  } else {
    const categoriaExistente = buscarCategoria(nombre);

    if (categoriaExistente) {
      validacion.resultado = false;

      feedback(inputNombre, "feedbackNombre", "ERROR: La categoría ya existe.");
    } else {
      feedback(inputNombre, "feedbackNombre");
    }
  }

  if (descripcion.length === 0) {
    validacion.resultado = false;

    feedback(
      inputDescripcion,
      "feedbackDescripcion",
      "ERROR: Debe ingresar una descripción.",
    );
  } else {
    feedback(inputDescripcion, "feedbackDescripcion");
  }

  validacion.obj = { nombre, descripcion };

  return validacion;
}

function feedback(elemento, idFeedback, msjError) {
  const feedbackDiv = document.getElementById(idFeedback);

  feedbackDiv.classList.remove("valid-feedback", "invalid-feedback");

  if (msjError) {
    elemento.classList.add("is-invalid");
    elemento.classList.remove("is-valid");

    feedbackDiv.classList.add("invalid-feedback");
    feedbackDiv.textContent = msjError;
  } else {
    elemento.classList.add("is-valid");
    elemento.classList.remove("is-invalid");

    feedbackDiv.classList.add("valid-feedback");
    feedbackDiv.textContent = `El campo ${elemento.name} está OK`;
  }
}

function limpiarEstados() {
  const inputs = document.querySelectorAll("#formAltaCategoria .form-control");

  for (const input of inputs) {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
  }
}

function listarCategorias() {
  const tablaCategorias = document.getElementById("tablaCategorias");

  tablaCategorias.innerHTML = "";

  const listado = traerTodasLasCategorias();

  for (const categoria of listado) {
    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    const tdDescripcion = document.createElement("td");
    const tdEditar = document.createElement("td");
    const tdEliminar = document.createElement("td");

    const btnEditar = document.createElement("button");
    const btnEliminar = document.createElement("button");

    tdNombre.textContent = categoria.nombre;
    tdDescripcion.textContent = categoria.descripcion;

    // Botón editar
    btnEditar.classList.add("btn", "btn-info");
    btnEditar.setAttribute("data-bs-toggle", "modal");
    btnEditar.setAttribute("data-bs-target", "#modalEditarCategoria");
    btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    btnEditar.addEventListener("click", () =>
      cargarCategoriaEnElModal(categoria),
    );

    // Botón eliminar
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.innerHTML = `<i class="bi bi-trash"></i>`;

    btnEliminar.addEventListener("click", () =>
      borrarCategoria(categoria.nombre),
    );

    tdEditar.appendChild(btnEditar);
    tdEliminar.appendChild(btnEliminar);

    tr.append(tdNombre, tdDescripcion, tdEditar, tdEliminar);

    tablaCategorias.appendChild(tr);
  }
}

function cargarCategoriaEnElModal(categoria) {
  const nombre = document.getElementById("modalInputNombre");
  const descripcion = document.getElementById("modalInputDescripcion");

  nombre.value = categoria.nombre;
  descripcion.value = categoria.descripcion;

  const btnGuardar = document.getElementById("btnGuardarCambios");
  btnGuardar.addEventListener("click", () => editarCategoria(categoria.id));
}

function editarCategoria(id) {
  const nuevoNombre = document.getElementById("modalInputNombre").value;
  const nuevaDescripcion = document.getElementById(
    "modalInputDescripcion",
  ).value;

  const obj = { nombre: nuevoNombre, descripcion: nuevaDescripcion };

  const btnCerrarModal = document.getElementById("btnCerrarModal");
  modificarCategoria(id, obj);
  btnCerrarModal.click();
  listarCategorias();
}

function borrarCategoria(nombre) {
  eliminarCategoria(nombre);
  listarCategorias();
}
