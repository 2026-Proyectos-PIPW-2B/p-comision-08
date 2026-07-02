import {
  agregarUsuario,
  eliminarUsuario,
  traerTodosLosUsuarios,
  cambiarDisponibilidad,
  buscarUsuario,
} from "./gestores/gestorUsuarios.js";
import { autorizacion, cerrarSesion, obtenerUsuarioAutenticado } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import { feedback, lanzarToast, limpiarEstados } from "./utilidades.js";

const inputNombre = document.getElementById("inputNombre");
const selectRol = document.getElementById("selectRol");
const inputContrasenia = document.getElementById("inputContrasenia");
const inputRepetirContrasenia = document.getElementById(
  "inputRepetirContrasenia",
);
const formAltaUsuario = document.getElementById("formAltaUsuario");
const tablaUsuarios = document.getElementById("tablaUsuarios");
const divTabla = document.getElementById("divTabla");
const divMensajeTabla = document.getElementById("divMensajeTabla");

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  inicializar();
});

function inicializar() {
  listarUsuarios();
  formAltaUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarEstados("#formAltaUsuario");

    const validacion = validarFormAltaUsuario();
    if (validacion.resultado) {
      formAltaUsuario.reset();
      limpiarEstados("#formAltaUsuario");
      agregarUsuario(validacion.obj);
      listarUsuarios();
      mensajeExitoso("Usuario creado correctamente");
    }
  });
}

function mensajeExitoso(msj) {
  lanzarToast(msj,"verde");
}

function validarFormAltaUsuario() {
  const nombre = inputNombre.value;
  const rol = selectRol.value;
  const contrasenia = inputContrasenia.value;
  const contraRepe = inputRepetirContrasenia.value;

  let validacion = { resultado: true };

  // Validaciones
  // que el nombre de usuario tenga ciertas condiciones
  if (nombre.length < 5) {
    validacion.resultado = false;
    feedback(
      inputNombre,
      "feedbackNombre",
      "ERROR: El nombre debe tener al menos 5 caracteres.",
    );
  } else {
    // que el usuario no exista ya en la base
    const usuarioExistente = buscarUsuario(nombre);
    if (usuarioExistente) {
      validacion.resultado = false;
      feedback(
        inputNombre,
        "feedbackNombre",
        "ERROR: El usuario ya existe en la base de datos.",
      );
    } else {
      feedback(inputNombre, "feedbackNombre");
    }
  }

  // que se haya seleccionado un rol
  if (rol.length === 0) {
    validacion.resultado = false;
    feedback(selectRol, "feedbackRol", "ERROR: Debe seleccionar un rol.");
  } else {
    feedback(selectRol, "feedbackRol");
  }

  // que la contraseña cumpla ciertas condiciones
  if (contrasenia.length < 5) {
    validacion.resultado = false;
    feedback(
      inputContrasenia,
      "feedbackContrasenia",
      "ERROR: La contraseña debe tener al menos 5 caracteres.",
    );
  } else {
    feedback(inputContrasenia, "feedbackContrasenia");
  }

  // que las contraseñas coincidan
  if (contrasenia !== contraRepe) {
    validacion.resultado = false;
    feedback(
      inputRepetirContrasenia,
      "feedbackRepetirContra",
      "ERROR: Las contraseñas deben coincidir.",
    );
  } else {
    feedback(inputRepetirContrasenia, "feedbackRepetirContra");
  }

  validacion.obj = { nombre, rol, contrasenia };
  return validacion;
}

function borrarUsuario(nombre) {
  eliminarUsuario(nombre);
  const sesion = obtenerUsuarioAutenticado()
  if (sesion.nombre === nombre) {
    cerrarSesion()
    lanzarToast("Usuario eliminado, cerrando sesión","rojo")
  }
  lanzarToast("Usuario eliminado correctamente","verde")
  listarUsuarios();
}

function cambiarEstado(nombre) {
  const estado = cambiarDisponibilidad(nombre);
  const sesion = obtenerUsuarioAutenticado()
  if (sesion.nombre === nombre) {
    lanzarToast("Usuario inhabilitado, cerrando sesión","rojo")
    cerrarSesion()
  }
  lanzarToast(`Usuario ${estado ? "habilitado" : "inhabilitado"} correctamente`,"verde")
  listarUsuarios();
}

function listarUsuarios() {
  tablaUsuarios.innerHTML = "";
  const listado = traerTodosLosUsuarios();

  if (listado.length === 0) {
    // esconder la tabla y mostrar un mensaje de que aun no se han registrado usuarios
    divTabla.classList.add("d-none");
    divMensajeTabla.classList.remove("d-none");
  } else {
    // esconder mensaje y mostrar tabla de usuarios
    divTabla.classList.remove("d-none");
    divMensajeTabla.classList.add("d-none");

    // generar la tabla con ese listado
    for (const usuario of listado) {
      const tr = document.createElement("tr");

      const td_nombre = document.createElement("td");
      const td_rol = document.createElement("td");
      const td_estado = document.createElement("td");
      const td_gestionar = document.createElement("td");
      const td_eliminar = document.createElement("td");

      const btn_gestionar = document.createElement("btn");
      const btn_eliminar = document.createElement("btn");

      td_nombre.textContent = usuario.nombre;
      td_rol.textContent = usuario.rol;

      if (usuario.estado) {
        td_estado.textContent = "Habilitado";
        btn_gestionar.textContent = "Inhabilitar";
        btn_gestionar.classList.add("btn", "btn-outline-danger");
      } else {
        td_estado.textContent = "Inhabilitado";
        btn_gestionar.textContent = "Habilitar";
        btn_gestionar.classList.add("btn", "btn-outline-success");
      }

      btn_gestionar.addEventListener("click", () =>
        cambiarEstado(usuario.nombre),
      );

      btn_eliminar.classList.add("btn", "btn-danger");
      btn_eliminar.innerHTML = `<i class="bi bi-trash"></i>`;
      btn_eliminar.addEventListener("click", () =>
        borrarUsuario(usuario.nombre),
      );

      if (usuario.id === "admin") {
        btn_eliminar.classList.add("disabled")
        btn_gestionar.classList.add("disabled")
      }

      td_gestionar.appendChild(btn_gestionar);
      td_eliminar.appendChild(btn_eliminar);

      tr.append(td_nombre, td_rol, td_estado, td_gestionar, td_eliminar);
      tablaUsuarios.appendChild(tr);
    }
  }
}
