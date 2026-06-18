import { cerrarSesion, obtenerUsuarioAutenticado } from "./gestores/gestorLogin.js";

export function cargarDatosNavbar() {
    const divBienvenida = document.getElementById("divBienvenida")
    const btnCerrarSesion = document.getElementById("btnCerrarSesion")
    btnCerrarSesion.addEventListener("click", cerrarSesion)
    const usuarioAutenticado = obtenerUsuarioAutenticado()
    if(usuarioAutenticado.rol === "Administrador") {
        divBienvenida.innerHTML = `<span class="badge text-bg-secondary">${usuarioAutenticado.rol}</span> Bienvenid@ ${usuarioAutenticado.nombre}`
    } else {
        divBienvenida.innerHTML = `Bienvenid@ ${usuarioAutenticado.nombre}`
    }
}