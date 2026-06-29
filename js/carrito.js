import { autorizacion, cerrarSesion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import { actualizarCarrito, vaciarCarrito, traerCarrito } from "./gestores/gestorCarrito.js";
import { buscarProducto } from "./gestores/gestorProductos.js";

window.addEventListener("load", () => {
    autorizacion("Usuario");
    cargarDatosNavbar();
    mostrarCarrito();
    

    const btnFinalizar = document.querySelector(".btn-success");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", finalizarCompra);
    }

    
    const btnVaciar = document.querySelector(".card .btn-danger");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", accionVaciarCarrito);
    }


    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", cerrarSesion);
    }
});

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const objetoCarrito = traerCarrito();

    contenedorCarrito.innerHTML = "";

    if (!objetoCarrito || !objetoCarrito.productos || objetoCarrito.productos.length === 0) {
        contenedorCarrito.innerHTML = `<p class="text-center alert alert-warning">Tu carrito está vacío.</p>`;
        actualizarResumen();
        return;
    }

    objetoCarrito.productos.forEach(item => {
        const infoProducto = buscarProducto(item.idProd);

        if (infoProducto) {
            const cardHtml = `
            <div class="card mb-3 p-3">
                <div class="row g-0 align-items-center">
                    
                </div>
            </div>
            `;
            contenedorCarrito.innerHTML += cardHtml;
        }
    });

    asignarBotonesCambio();
    actualizarResumen();
}

function actualizarResumen() {
    const objetoCarrito = traerCarrito();
    const contenedorResumen = document.getElementById("contenedorResumen");
    const totalCarrito = document.getElementById("totalCarrito");

    let resumenHtml = "";
    let total = 0;

    if (objetoCarrito && objetoCarrito.productos) {
        objetoCarrito.productos.forEach(item => {
            const infoProducto = buscarProducto(item.idProd);
            if (infoProducto) {
                const subtotalProducto = infoProducto.precioMinorista * item.cantidad;
                total += subtotalProducto;

                resumenHtml += `
                <div class="d-flex justify-content-between my-2 small">
                    <span>${infoProducto.nombre} (x${item.cantidad})</span>
                    <span>$${subtotalProducto}</span>
                </div>
                `;
            }
        });
    }

    contenedorResumen.innerHTML = resumenHtml || '<p class="text-muted small">No hay productos</p>';
    totalCarrito.innerHTML = `$${total}`;
}

function asignarBotonesCambio() {
    document.querySelectorAll(".btn-sumar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            cambiarCantidad(id, 1);
        });
    });

    document.querySelectorAll(".btn-restar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            cambiarCantidad(id, -1);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.closest(".btn-eliminar").getAttribute("data-id");
            eliminarProductoDelCarrito(id);
        });
    });
}

function cambiarCantidad(id, cambio) {
    const objetoCarrito = traerCarrito();
    const producto = objetoCarrito.productos.find(item => item.idProd === id);

    if (producto) {
        producto.cantidad += cambio;

        if (producto.cantidad <= 0) {
            eliminarProductoDelCarrito(id);
            return;
        }

        actualizarCarrito(objetoCarrito);
        mostrarCarrito();
    }
}

function eliminarProductoDelCarrito(id) {
    const objetoCarrito = traerCarrito();
    objetoCarrito.productos = objetoCarrito.productos.filter(item => item.idProd !== id);
    actualizarCarrito(objetoCarrito);
    mostrarCarrito();
}

function accionVaciarCarrito() {
    const objetoCarrito = traerCarrito();
    if (!objetoCarrito || !objetoCarrito.productos || objetoCarrito.productos.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }
    
    
        vaciarCarrito();
        mostrarCarrito();
    
}

function finalizarCompra() {
    const objetoCarrito = traerCarrito();

    if (!objetoCarrito || !objetoCarrito.productos || objetoCarrito.productos.length === 0) {
        alert("Tu carrito está vacío, agregá algún producto.");
        return;
    }

    alert("¡Gracias por tu compra!");
    vaciarCarrito();
    mostrarCarrito();
}