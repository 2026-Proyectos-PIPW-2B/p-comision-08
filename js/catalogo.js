import { autorizacion, cerrarSesion, obtenerUsuarioAutenticado } from "./gestores/gestorLogin.js";

const divBienvenida = document.getElementById("divBienvenida")
const btnCerrarSesion = document.getElementById("btnCerrarSesion")

window.addEventListener("load", () => {
  autorizacion("Usuario")
  inicializar()
});

function inicializar() {
    cargarDatosNavbar()
    btnCerrarSesion.addEventListener("click", cerrarSesion)
}

function cargarDatosNavbar() {
    const usuarioAutenticado = obtenerUsuarioAutenticado()
    if(usuarioAutenticado.rol === "Administrador") {
        divBienvenida.innerHTML = `<span class="badge text-bg-secondary">${usuarioAutenticado.rol}</span> Bienvenid@ ${usuarioAutenticado.nombre}`
    } else {
        divBienvenida.innerHTML = `Bienvenid@ ${usuarioAutenticado.nombre}`
    }
}