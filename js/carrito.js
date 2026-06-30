import { autorizacion, cerrarSesion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  actualizarCarrito,
  vaciarCarrito,
  traerCarrito,
} from "./gestores/gestorCarrito.js";
import { buscarProducto } from "./gestores/gestorProductos.js";

const btnFinalizar = document.getElementById("btnFinalizarCompra");
const btnVaciar = document.getElementById("btnVaciarCarrito");

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

    contenedorCarrito.innerHTML = "";

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
        contenedorCarrito.appendChild(card);
    }

    actualizarResumen();
  }
}

function crearTarjeta(prod, cant) {
  const { id, nombre, cantMayorista, precioMinorista, precioMayorista, stock, imagenURL } = prod;
  
  // que precio aplica y subtotal
  const esMayorista = cant >= cantMayorista;
  const precioUnitario = esMayorista ? precioMayorista : precioMinorista;
  const subtotal = precioUnitario * cant;

  // crear card
  const card = document.createElement("div");
  card.classList.add("card", "border-0", "shadow-sm", "p-3", "rounded-4", "bg-white", "mb-3", "position-relative");

  card.innerHTML = `
    <button class="btn text-danger border-0 bg-transparent position-absolute bottom-0 end-0 m-2 btn-eliminar" title="Eliminar">
      <i class="bi bi-trash3-fill fs-5"></i>
    </button>
    
    <div class="row align-items-center g-3">
      <div class="col-4 col-sm-2 text-center">
        <div class="bg-light p-2 rounded-3 d-flex align-items-center justify-content-center divImagen" >
          <img src="${imagenURL}" alt="${nombre}" class="img-fluid object-fit-contain" />
        </div>
      </div>

      <div class="col-8 col-sm-5">
        <h3 class="h6 mb-1 fw-semibold text-dark text-capitalize text-start">${nombre}</h3>
        <div class="d-flex align-items-center gap-2">
          <span class="text-secondary extra-small">Precio minorista:</span>
          <span class="fw-semibold ${!esMayorista ? 'text-pink' : 'text-dark'} small">$${precioMinorista}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="text-secondary extra-small">Precio mayorista:</span>
          <span class="fw-semibold ${esMayorista ? 'text-pink' : 'text-dark'} small">$${precioMayorista}</span>
        </div>
      </div>

      <div class="col-12 col-sm-5 d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column align-items-center justify-content-center gap-2">
          <div class="input-group input-group-sm">
            <button class="btn btn-outline-primary btn-restar" type="button">-</button>
            <input class="form-control text-center fw-bold shadow-none" type="number" value="${cant}" min="1" id="input-${id}" />
            <button class="btn btn-outline-primary btn-sumar" type="button">+</button>
          </div>
          <small class="text-muted extra-small">Disponibles: <span class="fw-bold">${stock} u.</span></small>
        </div>

        <div class="text-center d-flex justify-content-center align-self-start">
          <span class="h5 m-0 fw-bold text-success">$${subtotal}</span>
        </div>
      </div>

    </div>
  `;

  // agregar eventos
  const btnRestar = card.querySelector(".btn-restar");
  const btnSumar = card.querySelector(".btn-sumar");
  const input = card.querySelector("input[type='number']");
  const btnEliminar = card.querySelector(".btn-eliminar");

  btnRestar.addEventListener("click", () => cambiarCantidad(id, -1));
  btnSumar.addEventListener("click", () => {
    if (cant < stock) {
      cambiarCantidad(id, 1);
    } else {
      alert("Llegaste al límite del stock disponible.");
    }
  });

  input.addEventListener("change", () => {
    let nuevaCant = Number(input.value);
    if (nuevaCant < 1) {
      nuevaCant = 1;
      input.value = nuevaCant
    }
    if (nuevaCant > stock) {
      nuevaCant = stock;
      input.value = stock
    }
    
    const diferencia = nuevaCant - cant;
    if (diferencia !== 0) {
      cambiarCantidad(id, diferencia);
    }
  });

  btnEliminar.addEventListener("click", () => eliminarProductoDelCarrito(id));

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
        const aplicaMayorista = item.cantidad >= infoProducto.cantMayorista;
        const precioAplicado = aplicaMayorista ? infoProducto.precioMayorista : infoProducto.precioMinorista;
        const subtotalProducto = precioAplicado * item.cantidad;
        
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

  contenedorResumen.innerHTML = resumenHtml;
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
