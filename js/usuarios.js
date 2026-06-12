import {
  agregarUsuario,
  eliminarUsuario,
  traerTodosLosUsuarios,
} from "./gestores/gestorUsuarios.js";

const inputNombre = document.getElementById("inputNombre");
const selectRol = document.getElementById("selectRol");
const inputContrasenia = document.getElementById("inputContrasenia");
const inputRepetirContrasenia = document.getElementById(
  "inputRepetirContrasenia",
);
const btnRegistrarUsuario = document.getElementById("btnRegistrarUsuario");

window.addEventListener("load", () => {
  btnRegistrarUsuario.addEventListener("click", registrarUsuario);
});

function registrarUsuario() {
  const nombre = inputNombre.value;
  const rol = selectRol.value;
  const contrasenia = inputContrasenia.value;
  const contraRepe = inputRepetirContrasenia.value;

  // hacer las validaciones

  // si esta todo ok
  agregarUsuario(nombre, rol, contrasenia);
  listarUsuarios();
}

function borrarUsuario(nombre) {
  eliminarUsuario(nombre);
  listarUsuarios();
}

function listarUsuarios() {
  const listado = traerTodosLosUsuarios();
  // generar la tabla con ese listado
}
