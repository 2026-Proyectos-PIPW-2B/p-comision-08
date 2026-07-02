import { cargarListadoPredeterminadoCategorias } from "./gestores/gestorCategorias.js";
import { cargarListadoPredeterminadoEtiquetas } from "./gestores/gestorEtiquetas.js";
import {
  crearSesion,
  redirigir,
  autorizacion,
} from "./gestores/gestorLogin.js";
import { cargarListadoPredeterminadoProductos } from "./gestores/gestorProductos.js";
import {
  agregarAlInicializar,
  buscarUsuario,
} from "./gestores/gestorUsuarios.js";

const formLogin = document.getElementById("formLogin");
const inputNombre = document.getElementById("inputNombre");
const inputContrasenia = document.getElementById("inputContrasenia");

window.addEventListener("load", () => {
  autorizacion();
  cargarAdministrador();

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
      validacion.obj = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      };
    } else {
      feedback("Datos inválidos");
    }
  } else {
    feedback("El usuario no se encuentra registrado");
  }

  return validacion;
}

function iniciarSesion(usuario) {
  crearSesion(usuario.id, usuario.nombre, usuario.rol);
  redirigir(usuario.rol);
}

function feedback(msj) {
  alert(msj);
}

function cargarUsuario() {
  const usuario = buscarUsuario("usuario");
  if (!usuario) {
    agregarAlInicializar({
      nombre: "usuario",
      contrasenia: "usuario",
      rol: "Usuario",
      estado: true,
    },true);
  }
}

function cargarAdministrador() {
  const admin = buscarUsuario("administrador");
  if (!admin || !admin.estado) {
    agregarAlInicializar({
      id: "admin",
      nombre: "administrador",
      contrasenia: "administrador",
      rol: "Administrador",
      estado: true,
    });
  }
}

function inicializarWeb() {
  cargarAdministrador();
  cargarUsuario();
  cargarListadoPredeterminadoCategorias();
  cargarListadoPredeterminadoEtiquetas();
  cargarListadoPredeterminadoProductos()
}

const btnIniciarWeb = document.getElementById("btnIniciarWeb");
btnIniciarWeb.addEventListener("click", inicializarWeb);
