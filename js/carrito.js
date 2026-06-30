import { autorizacion, cerrarSesion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  actualizarCarrito,
  vaciarCarrito,
  traerCarrito,
} from "./gestores/gestorCarrito.js";
import { buscarProducto } from "./gestores/gestorProductos.js";

const btnFinalizar = document.querySelector(".btn-success");
const btnVaciar = document.querySelector(".card .btn-danger");

window.addEventListener("load", () => {
  autorizacion("Usuario");
  cargarDatosNavbar();
  mostrarCarrito();
  agregarEventListeners();
});

function agregarEventListeners() {
  btnFinalizar.addEventListener("click", finalizarCompra);
  btnVaciar.addEventListener("click", accionVaciarCarrito);
}

function mostrarCarrito() {
  const rowCarrito = document.getElementById("rowCarrito");
  const contenedorCarrito = document.getElementById("contenedorCarrito");
  const carrito = traerCarrito();

  //   contenedorCarrito.innerHTML = "";

  if (!carrito || carrito.productos.length === 0) {
    rowCarrito.classList.add("justify-content-center");
    contenedorCarrito.innerHTML = `
    <div class="text-center card p-4 shadow-sm">
        <p class="">Tu carrito está vacío.</p>
        <div class="">
            <a href="/catalogo.html"><button type="button" class="btn btn-primary">Ir al catálogo</button></a>
        </div>
    </div>
    `;
    actualizarResumen();
  } else {
    rowCarrito.classList.remove("justify-content-center");

    for (const producto of carrito.productos) {
      const prod = buscarProducto(producto.idProd);
      const card = crearTarjeta(prod, producto.cantidad);
      //   contenedorCarrito.appendChild(card);
    }

    actualizarResumen();
  }
}

function crearTarjeta(prod, cant) {
  console.log(prod, cant);
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = prod.nombre;

  return card;
}

function actualizarResumen() {
  const carrito = traerCarrito();
  const colResumen = document.getElementById("colResumen");
  const contenedorResumen = document.getElementById("contenedorResumen");
  const totalCarrito = document.getElementById("totalCarrito");

  if (carrito.productos.length === 0) {
    colResumen.classList.add("d-none");
  } else {
    colResumen.classList.remove("d-none");
  }

  let resumenHtml = "";
  let total = 0;

  if (carrito && carrito.productos) {
    carrito.productos.forEach((item) => {
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

  contenedorResumen.innerHTML =
    resumenHtml || '<p class="text-muted small">No hay productos</p>';
  totalCarrito.innerHTML = `$${total}`;
}

function cambiarCantidad(id, cambio) {
  const objetoCarrito = traerCarrito();
  const producto = objetoCarrito.productos.find((item) => item.idProd === id);

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
  objetoCarrito.productos = objetoCarrito.productos.filter(
    (item) => item.idProd !== id,
  );
  actualizarCarrito(objetoCarrito);
  mostrarCarrito();
}

function accionVaciarCarrito() {
  const objetoCarrito = traerCarrito();
  if (
    !objetoCarrito ||
    !objetoCarrito.productos ||
    objetoCarrito.productos.length === 0
  ) {
    alert("El carrito ya está vacío.");
    return;
  }

  vaciarCarrito();
  mostrarCarrito();
}

function finalizarCompra() {
  const objetoCarrito = traerCarrito();

  if (
    !objetoCarrito ||
    !objetoCarrito.productos ||
    objetoCarrito.productos.length === 0
  ) {
    alert("Tu carrito está vacío, agregá algún producto.");
    return;
  }

  alert("¡Gracias por tu compra!");
  vaciarCarrito();
  mostrarCarrito();
}
