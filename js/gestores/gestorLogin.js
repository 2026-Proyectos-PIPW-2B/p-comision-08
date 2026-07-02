import { lanzarToast } from "../utilidades.js";
import { buscarUsuario } from "./gestorUsuarios.js";

export function autorizacion(rolPermitido) {
  const usuarioAutenticado = obtenerUsuarioAutenticado();
  if (usuarioAutenticado) {
    const habilitado = buscarUsuario(usuarioAutenticado.nombre).estado;
    if (!habilitado) {
      lanzarToast("Usuario inhabilitado. Cerrando sesión.","rojo");
      cerrarSesion();
    }
    if (usuarioAutenticado.rol !== rolPermitido) {
      redirigir(usuarioAutenticado.rol);
    }
  } else {
    if (!window.location.pathname.includes("index.html")) {
      redirigir();
    }
  }
}

export function obtenerUsuarioAutenticado() {
  return JSON.parse(localStorage.getItem("sesion"));
}

export function crearSesion(id, nombre, rol) {
  const sesion = { id, nombre, rol };
  localStorage.setItem("sesion", JSON.stringify(sesion));
}

export function cerrarSesion() {
  localStorage.removeItem("sesion");
  location.assign("index.html");
}

export function redirigir(rol) {
  if (rol === "Administrador") {
    location.assign("usuarios.html");
  } else if (rol === "Usuario") {
    location.assign("catalogo.html");
  } else {
    location.assign("index.html");
  }
}
