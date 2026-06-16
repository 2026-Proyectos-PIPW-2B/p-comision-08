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
const tablaUsuarios = document.getElementById("tablaUsuarios");

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
  console.log(listado);

  // generar la tabla con ese listado
  for (const usuario of listado) {
    const tr = document.createElement("tr");
    const td_nombre = document.createElement("td");
    const td_rol = document.createElement("td");
    const td_estado = document.createElement("td");
    const td_gestionar = document.createElement("td");
    const td_eliminar = document.createElement("td");
    const btn_estado = document.createElement("btn");
    const btn_eliminar = document.createElement("btn");

    td_nombre.textContent = usuario.nombre;
    td_rol.textContent = usuario.rol;

    if (usuario.estado) {
      td_estado.textContent = "Habilitado";
      btn_estado.textContent = "Inhabilitar";
      btn_estado.classList.add("btn");
    } else {
      td_estado.textContent = "Inhabilitado";
      btn_estado.textContent = "Habilitar";
    }

    td_gestionar.appendChild(btn_estado);
    td_eliminar.appendChild(btn_eliminar);

    tr.append(td_nombre, td_estado, td_gestionar, td_eliminar);
    tablaUsuarios.appendChild(tr);
  }
}
listarUsuarios();
