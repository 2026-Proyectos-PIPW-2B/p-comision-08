import { autorizacion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  agregarCategoria,
  buscarCategoria,
  traerTodasLasCategorias,
  eliminarCategoria,
  modificarCategoria,
  borrarTodasLasCategorias,
  cargarListadoPredeterminadoCategorias,
} from "./gestores/gestorCategorias.js";
import { feedback, lanzarToast, limpiarEstados } from "./utilidades.js";

const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const formAltaCategoria = document.getElementById("formAltaCategoria");
const btnListadoPred = document.getElementById("btnListadoPred");
const btnBorrarTodasCat = document.getElementById("btnBorrarTodasCat");

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  listarCategorias();
  btnListadoPred.addEventListener("click", () => {
    cargarListadoPredeterminadoCategorias()
    listarCategorias()
});
  btnBorrarTodasCat.addEventListener("click", () => {
    borrarTodasLasCategorias();
    listarCategorias();
  });
});

formAltaCategoria.addEventListener("submit", (e) => {
  e.preventDefault();

  limpiarEstados("#formAltaCategoria");

  const validacion = validarFormAltaCategoria();

  if (validacion.resultado) {
    limpiarEstados("#formAltaCategoria");

    agregarCategoria(validacion.obj);

    lanzarToast("Categoria creada correctamente","verde");

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

function listarCategorias() {
  const tablaCategorias = document.getElementById("tablaCategorias");
  const contenedorTabla = document.getElementById("contenedorTabla");
  const msjCategorias = document.getElementById("msjCategorias");

  tablaCategorias.innerHTML = "";

  const listado = traerTodasLasCategorias();
  if (listado.length === 0) {
    contenedorTabla.classList.add("d-none");
    msjCategorias.classList.remove("d-none");
  } else {
    contenedorTabla.classList.remove("d-none");
    msjCategorias.classList.add("d-none");

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
      btnEditar.classList.add("btn", "btn-primary", "btn-sm");
      btnEditar.setAttribute("data-bs-toggle", "modal");
      btnEditar.setAttribute("data-bs-target", "#modalEditarCategoria");
      btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
      btnEditar.addEventListener("click", () =>
        cargarCategoriaEnElModal(categoria),
      );

      // Botón eliminar
      btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
      btnEliminar.innerHTML = `<i class="bi bi-trash"></i> Eliminar`;

      btnEliminar.addEventListener("click", () =>
        borrarCategoria(categoria.id),
      );

      tdEditar.appendChild(btnEditar);
      tdEliminar.appendChild(btnEliminar);

      tr.append(tdNombre, tdDescripcion, tdEditar, tdEliminar);

      tablaCategorias.appendChild(tr);
    }
  }
}

function cargarCategoriaEnElModal(categoria) {
  const nombre = document.getElementById("modalInputNombre");
  const descripcion = document.getElementById("modalInputDescripcion");

  nombre.value = categoria.nombre;
  descripcion.value = categoria.descripcion;

  const btnGuardar = document.getElementById("btnGuardarCambios");
  btnGuardar.onclick = () => editarCategoria(categoria.id);
  limpiarEstados("#modalFormAltaCategoria");
}

function editarCategoria(id) {
  const modalFormAltaCategoria = document.getElementById(
    "modalFormAltaCategoria",
  );
  const btnCerrarModal = document.getElementById("btnCerrarModal");
  const nuevoNombre = document.getElementById("modalInputNombre").value;
  const nuevaDescripcion = document.getElementById(
    "modalInputDescripcion",
  ).value;

  const obj = { nombre: nuevoNombre, descripcion: nuevaDescripcion };

  limpiarEstados("#modalFormAltaCategoria");

  const validacion = validarFormModal();

  if (validacion.resultado) {
    limpiarEstados("#modalFormAltaCategoria");
    modificarCategoria(id, obj);
    btnCerrarModal.click();
    listarCategorias();
    modalFormAltaCategoria.reset();
    lanzarToast("Categoria modificada correctamente","verde");
  }
}

function borrarCategoria(id) {
  eliminarCategoria(id);
  lanzarToast("Categoría eliminada correctamente","verde")
  listarCategorias();
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
      "ERROR: Debe ingresar un nombre para la categoría.",
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