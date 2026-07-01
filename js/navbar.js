import { cerrarSesion, obtenerUsuarioAutenticado } from "./gestores/gestorLogin.js";

export function cargarDatosNavbar() {
    const contenedorLinks = document.getElementById("contenedorLinks");
    const divBienvenida = document.getElementById("divBienvenida");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    const { nombre, rol } = obtenerUsuarioAutenticado();
    let links;
    let bienvenida

    if (rol === "Administrador") {
        bienvenida = `<span class="badge text-bg-warning">${rol}</span> Bienvenid@ ${nombre}`;
        links = `
        <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">${crearLink("usuarios.html", "Usuarios")}</li>
            <li class="nav-item">${crearLink("productos.html", "Productos")}</li>
            <li class="nav-item">${crearLink("categorias.html", "Categorías")}</li>
            <li class="nav-item">${crearLink("etiquetas.html", "Etiquetas")}</li>
        </ul>
        `;
    } else {
        bienvenida = `Bienvenid@ ${nombre}`;
        links = `
        <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">${crearLink("catalogo.html", "Catálogo")}</li>
            <li class="nav-item">${crearLink("carrito.html", "Carrito")}</li>
        </ul>
        `;
    }
    
    divBienvenida.innerHTML = bienvenida
    contenedorLinks.innerHTML = links;
    
    btnCerrarSesion.addEventListener("click", cerrarSesion);
}

function crearLink(direccion, pagina) {
    const esActivo = location.pathname.includes(direccion);
    if (esActivo) {
        return `<a class="nav-link active" aria-current="page" href="#">${pagina}</a>`;
    } else {
        return `<a class="nav-link" href="./${direccion}">${pagina}</a>`;
    }
}