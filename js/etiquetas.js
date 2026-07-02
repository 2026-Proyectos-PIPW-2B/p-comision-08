import { autorizacion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  agregarEtiqueta,
  traerTodasLasEtiquetas,
  eliminarEtiqueta,
  buscarEtiqueta,
  modificarEtiqueta,
  borrarTodasLasEtiquetas,
  cargarListadoPredeterminadoEtiquetas,
} from "./gestores/gestorEtiquetas.js";
import { feedback, lanzarToast, limpiarEstados } from "./utilidades.js";

const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const formAltaEtiqueta = document.getElementById("formAltaEtiqueta");
const btnListadoPred = document.getElementById("btnListadoPred");
const btnBorrarTodasEti = document.getElementById("btnBorrarTodasEti");

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  listarEtiquetas();
  btnListadoPred.addEventListener("click", () => {
    cargarListadoPredeterminadoEtiquetas()
    listarEtiquetas()
  });
  btnBorrarTodasEti.addEventListener("click", () => {
    borrarTodasLasEtiquetas();
    listarEtiquetas();
  });
});

formAltaEtiqueta.addEventListener("submit", (e) => {
  e.preventDefault();

  limpiarEstados("#formAltaEtiqueta");

  const validacion = validarFormAltaEtiqueta();

  if (validacion.resultado) {
    limpiarEstados("#formAltaEtiqueta");

    agregarEtiqueta(validacion.obj);

    lanzarToast("Etiqueta creada correctamente","verde");

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
      "ERROR: Debe ingresar un nombre para la etiqueta.",
    );
  } else {
    const etiquetaExistente = buscarEtiqueta(nombre);

    if (etiquetaExistente) {
      validacion.resultado = false;

      feedback(inputNombre, "feedbackNombre", "ERROR: La etiqueta ya existe.");
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

  validacion.obj = {
    nombre,
    descripcion,
  };

  return validacion;
}

function listarEtiquetas() {
  const tablaEtiquetas = document.getElementById("tablaEtiquetas");
  const contenedorTabla = document.getElementById("contenedorTabla");
  const msjEtiquetas = document.getElementById("msjEtiquetas");

  tablaEtiquetas.innerHTML = "";

  const listado = traerTodasLasEtiquetas();
  if (listado.length === 0) {
    contenedorTabla.classList.add("d-none");
    msjEtiquetas.classList.remove("d-none");
  } else {
    contenedorTabla.classList.remove("d-none");
    msjEtiquetas.classList.add("d-none");
  }

  for (const etiqueta of listado) {
    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    const tdDescripcion = document.createElement("td");
    const tdEditar = document.createElement("td");
    const tdEliminar = document.createElement("td");

    const btnEditar = document.createElement("button");
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
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.innerHTML = `<i class="bi bi-trash"></i> Eliminar`;

    btnEliminar.addEventListener("click", () => {
      borrarEtiqueta(etiqueta.nombre);
    });

    tdEditar.appendChild(btnEditar);
    tdEliminar.appendChild(btnEliminar);

    tr.append(tdNombre, tdDescripcion, tdEditar, tdEditar, tdEliminar);

    tablaEtiquetas.appendChild(tr);
  }
}

function cargarEtiquetaEnElModal(etiqueta) {
  const nombre = document.getElementById("modalInputNombre");
  const descripcion = document.getElementById("modalInputDescripcion");

  nombre.value = etiqueta.nombre;
  descripcion.value = etiqueta.descripcion;

  const btnGuardar = document.getElementById("btnGuardarCambios");
  btnGuardar.onclick = () => editarEtiqueta(etiqueta.id);
  limpiarEstados("#modalFormAltaEtiqueta");
}

function editarEtiqueta(id) {
  const modalFormAltaEtiqueta = document.getElementById(
    "modalFormAltaEtiqueta",
  );
  const btnCerrarModal = document.getElementById("btnCerrarModal");

  const nuevoNombre = document.getElementById("modalInputNombre").value;
  const nuevaDescripcion = document.getElementById(
    "modalInputDescripcion",
  ).value;

  const obj = { nombre: nuevoNombre, descripcion: nuevaDescripcion };

  limpiarEstados("#modalFormAltaEtiqueta");

  const validacion = validarFormModal();

  if (validacion.resultado) {
    limpiarEstados("#modalFormAltaEtiqueta");
    modificarEtiqueta(id, obj);
    btnCerrarModal.click();
    listarEtiquetas();
    modalFormAltaEtiqueta.reset();
    lanzarToast("Etiqueta modificada correctamente","verde");
  }
}

function borrarEtiqueta(nombre) {
  eliminarEtiqueta(nombre);
  lanzarToast("Etiqueta eliminada correctamente","verde");
  listarEtiquetas();
}

function validarFormModal() {
  const modalInputNombre = document.getElementById("modalInputNombre");
  const modalInputDescripcion = document.getElementById(
    "modalInputDescripcion",
  );
  const nombre = modalInputNombre.value.trim();
  const descripcion = modalInputDescripcion.value.trim();

  let validacion = { resultado: true };

  if (nombre.length === 0) {
    validacion.resultado = false;

    feedback(
      modalInputNombre,
      "feedbackNombreModal",
      "ERROR: Debe ingresar un nombre para la etiqueta.",
    );
  } else {
    feedback(modalInputNombre, "feedbackNombreModal");
  }

  if (descripcion.length === 0) {
    validacion.resultado = false;

    feedback(
      modalInputDescripcion,
      "feedbackDescripcionModal",
      "ERROR: Debe ingresar una descripción.",
    );
  } else {
    feedback(modalInputDescripcion, "feedbackDescripcionModal");
  }

  validacion.obj = { nombre, descripcion };

  return validacion;
}
