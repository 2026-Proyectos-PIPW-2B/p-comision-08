import {
  crearSesion,
  cerrarSesion,
  redirigir,
  autorizacion,
} from "./gestores/gestorLogin.js";
import { buscarUsuario } from "./gestores/gestorUsuarios.js";

const formLogin = document.getElementById("formLogin");
const inputNombre = document.getElementById("inputNombre");
const inputContrasenia = document.getElementById("inputContrasenia");

window.addEventListener("load", () => {
  autorizacion();
  cargarUsuarioAdmin();

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const validacion = validarFormLogin();
    if (validacion.resultado) {
      formLogin.reset();
      iniciarSesion(validacion.obj);
    }
  });
});

function validarFormLogin() {
  const nombre = inputNombre.value;
  const contrasenia = inputContrasenia.value;
  const validacion = { resultado: false };

  const usuario = buscarUsuario(nombre);
  if (usuario) {
    if (usuario.contrasenia === contrasenia) {
      validacion.resultado = true;
      validacion.obj = { nombre: usuario.nombre, rol: usuario.rol };
    } else {
      feedback("Datos inválidos");
    }
  } else {
    feedback("El usuario no se encuentra registrado");
  }

  return validacion;
}

function iniciarSesion(usuario) {
  crearSesion(usuario.nombre, usuario.rol);
  redirigir(usuario.rol);
}

function feedback(msj) {
  alert(msj);
}

function cargarUsuarioAdmin() {
  const userAdmin = buscarUsuario("admin");
  if (!userAdmin || !userAdmin.estado) {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([
        {
          nombre: "admin",
          contrasenia: "admin",
          rol: "Administrador",
          estado: true,
        },
      ]),
    );
  }
}
