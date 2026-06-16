import {
  agregarUsuario,
  eliminarUsuario,
  traerTodosLosUsuarios,
  cambiarDisponibilidad,
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
  listarUsuarios();
});

function registrarUsuario() {
  const nombre = inputNombre.value;
  const rol = selectRol.value;
  const contrasenia = inputContrasenia.value;
  const contraRepe = inputRepetirContrasenia.value;

  // hacer las validaciones
  // que el usuario no exista
  // que la contraseña cumpla ciertas condiciones
  // que las contraseñas coincidan

  // si esta todo ok
  agregarUsuario(nombre, rol, contrasenia);
  listarUsuarios();
}

function borrarUsuario(nombre) {
  eliminarUsuario(nombre);
  listarUsuarios();
}

function cambiarEstado(nombre) {
  cambiarDisponibilidad(nombre);
  listarUsuarios();
}

function listarUsuarios() {
  tablaUsuarios.innerHTML = "";
  const listado = traerTodosLosUsuarios();

  if (listado.length === 0) {
    alert("no hay usuarios");
    // esconder la tabla y mostrar un mensaje de que aun no se han registrado usuarios
  } else {
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

      td_gestionar.appendChild(btn_gestionar);
      td_eliminar.appendChild(btn_eliminar);

      tr.append(td_nombre, td_rol, td_estado, td_gestionar, td_eliminar);
      tablaUsuarios.appendChild(tr);
    }
  }
}
