import { buscarCategoriaPorID, traerTodasLasCategorias } from "./gestores/gestorCategorias.js";
import { buscarEtiquetaPorID } from "./gestores/gestorEtiquetas.js";
import { autorizacion } from "./gestores/gestorLogin.js";
import { traerTodosLosProductos } from "./gestores/gestorProductos.js";
import { cargarDatosNavbar } from "./navbar.js";

const contenedorProductos = document.getElementById("contenedorProductos");
const formFiltrar = document.getElementById("formFiltrar");
const inputBusquedaNombre = document.getElementById("inputBusquedaNombre");
const selectCategoria = document.getElementById("selectCategoria");

window.addEventListener("load", () => {
  autorizacion("Usuario");
  cargarDatosNavbar();
  listarTodosLosProductos();
  cargarFiltrado()
});

function listarTodosLosProductos() {
  const listado = traerTodosLosProductos();
  listarProductos(listado)
}

function listarProductos(listado) {
  contenedorProductos.innerHTML = "";
  for (const prod of listado) {
    const tarjetaProd = crearTarjetaProd(prod);
    contenedorProductos.appendChild(tarjetaProd);
  }
  agregarPopoversDeBootstrap()
}
  
function agregarPopoversDeBootstrap() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
}

function crearTarjetaProd(prod) {
  // div de la columna y card
  const divCol = document.createElement("div");
  divCol.classList.add("col");

  const divCard = document.createElement("div");
  divCard.classList.add("card", "h-100", "shadow-sm", "mx-auto");

  // --------- Encabezado de la tarjeta con la imagen y la categoria -------
  const divContenedorImg = document.createElement("div");
  divContenedorImg.classList.add("position-relative", "bg-white", "text-center", "rounded-top");
  
  // imagen
  const img = document.createElement("img");
  img.classList.add("card-img-top", "p-4");
  img.setAttribute("src", prod.imagenURL);
  img.setAttribute("alt", prod.nombre);

  // categoria
  const spanCategoria = document.createElement("span");
  spanCategoria.classList.add("badge", "bg-danger-subtle", "text-dark", "position-absolute", "top-0", "start-0", "m-3", "shadow-sm", "extra-small");
  const categoria = buscarCategoriaPorID(prod.categoria) || {nombre: "Sin clasificar", descripcion: "-"}
  spanCategoria.textContent = categoria.nombre; 
  // para el tooltip de bootstrap
  spanCategoria.setAttribute("data-bs-toggle", "tooltip");
  spanCategoria.setAttribute("data-bs-title", categoria.descripcion);

  divContenedorImg.append(img, spanCategoria);

  //--------------- Cuerpo de la tarjeta --------------------
  const divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");

  // BLOQUE SUPERIOR con la info del producto
  const divDatosSuperiores = document.createElement("div");

  // titulo
  const h3 = document.createElement("h3");
  h3.classList.add("card-title", "text-center", "h5", "mb-1");
  h3.textContent = prod.nombre;

  // etiquetas
  const divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("text-center", "mb-2");
  generarEtiquetas(prod.etiquetas, divEtiquetas)

  // descripcion
  const pDescripcion = document.createElement("p");
  pDescripcion.classList.add("text-muted", "text-center", "small", "px-2", "mb-3");
  pDescripcion.textContent = prod.descripcion || "Sin descripción.";

  // BLOQUE INFERIOR con las cajas de precios, selector de cantidad, boton añadir y subtotal -------

  // cajas de precios (minorista y mayorista)
  const divRowPrecios = document.createElement("div");
  divRowPrecios.classList.add("row", "g-2", "text-center", "mb-3");

  // minorista
  const divColMinorista = document.createElement("div");
  divColMinorista.classList.add("col-6");
  const divBoxMinorista = document.createElement("div");
  divBoxMinorista.classList.add("p-2", "border", "rounded", "border-rosa");
  divBoxMinorista.setAttribute("id", `box-min-${prod.id}`)
  const spanLabelMin = document.createElement("span");
  spanLabelMin.classList.add("d-block", "small", "text-pink");
  spanLabelMin.textContent = "Por unidad";
  const spanPrecioMin = document.createElement("span");
  spanPrecioMin.classList.add("fw-bold", "h5", "text-dark");
  spanPrecioMin.textContent = `$${prod.precioMinorista}`;
  divBoxMinorista.append(spanLabelMin, spanPrecioMin);
  divColMinorista.appendChild(divBoxMinorista);

  // mayorista
  const divColMayorista = document.createElement("div");
  divColMayorista.classList.add("col-6");
  const divBoxMayorista = document.createElement("div");
  divBoxMayorista.classList.add("p-2", "border", "rounded");
  divBoxMayorista.setAttribute("id", `box-may-${prod.id}`)
  const spanLabelMay = document.createElement("span");
  spanLabelMay.classList.add("d-block", "small", "text-pink");
  spanLabelMay.textContent = "Mayorista";
  const spanPrecioMay = document.createElement("span");
  spanPrecioMay.classList.add("fw-bold", "h5");
  spanPrecioMay.textContent = `$${prod.precioMayorista}`;
  divBoxMayorista.append(spanLabelMay, spanPrecioMay);
  divColMayorista.appendChild(divBoxMayorista);

  // aclaración de la cant minima para precio mayorista
  const divColAclaracion = document.createElement("div");
  divColAclaracion.classList.add("col-12", "mt-1");
  const pAclaracion = document.createElement("p");
  pAclaracion.classList.add("text-muted", "extra-small", "d-block", "text-center", "m-0");
  pAclaracion.innerHTML = `*Precio mayorista llevando <strong>${prod.cantMayorista} unidades</strong> o más.`;
  divColAclaracion.appendChild(pAclaracion);

  divRowPrecios.append(divColMinorista, divColMayorista, divColAclaracion);

  // Controles inferiores
  const divControlesInferiores = document.createElement("div");

  const divRowControles = document.createElement("div");
  divRowControles.classList.add("row", "g-2", "mb-2");

  // selector de cantidad -----
  const divColInput = document.createElement("div");
  divColInput.classList.add("col-6");
  
  const divInputGroup = document.createElement("div");
  divInputGroup.classList.add("input-group", "input-group-sm", "mb-1");
  //boton menos
  const btnMenosCant = document.createElement("button");
  btnMenosCant.classList.add("btn", "btn-outline-primary");
  btnMenosCant.textContent = "-";
  btnMenosCant.setAttribute("type", "button");
  btnMenosCant.addEventListener("click", () => modificarCantidad(prod, "restar"));
  //input de la cantidad
  const inputCant = document.createElement("input");
  inputCant.classList.add("form-control", "text-center", "fw-bold");
  inputCant.setAttribute("type", "number");
  inputCant.setAttribute("value", 1);
  inputCant.setAttribute("min", 1);
  inputCant.setAttribute("id", `input-${prod.id}`);
  inputCant.addEventListener("change", () => modificarCantidad(prod))
  //boton mas
  const btnMasCant = document.createElement("button");
  btnMasCant.classList.add("btn", "btn-outline-primary");
  btnMasCant.textContent = "+";
  btnMasCant.setAttribute("type", "button");
  btnMasCant.addEventListener("click", () => modificarCantidad(prod, "sumar"));

  divInputGroup.append(btnMenosCant, inputCant, btnMasCant);

  // stock disponible
  const smallStock = document.createElement("small");
  smallStock.classList.add("text-muted", "extra-small", "d-block", "text-center", "mt-1");
  smallStock.innerHTML = `Disponibles: <span class="fw-bold">${prod.stock} u.</span>`;

  divColInput.append(divInputGroup, smallStock);

  // boton agregar al carrito
  const divColBtnAgregar = document.createElement("div");
  divColBtnAgregar.classList.add("col-6");
  
  const btnAgregarAlCarrito = document.createElement("button");
  btnAgregarAlCarrito.classList.add("btn", "btn-primary", "btn-sm", "w-100", "shadow-sm");
  btnAgregarAlCarrito.innerHTML = `<i class="bi bi-cart-plus me-1"></i> Añadir`;
  btnAgregarAlCarrito.addEventListener("click", () => agregarProdAlCarrito(prod, inputCant));
  divColBtnAgregar.appendChild(btnAgregarAlCarrito);

  divRowControles.append(divColInput, divColBtnAgregar);

  // Subtotal ----
  const divTotal = document.createElement("div");
  divTotal.classList.add("fw-bold", "border-top", "pt-2", "text-center", "d-flex", "justify-content-between", "align-items-center", "px-1");
  
  const spanTotal = document.createElement("span");
  spanTotal.classList.add("small", "text-secondary");
  spanTotal.textContent = "Subtotal: ";

  const spanCantTotal = document.createElement("span");
  spanCantTotal.classList.add("h5", "m-0", "fw-bold", "text-success");
  spanCantTotal.setAttribute("id", `span-${prod.id}`);
  actualizarSubTotal(spanCantTotal, 1, prod.cantMayorista, prod.precioMinorista, prod.precioMayorista)

  divTotal.append(spanTotal, spanCantTotal);

  // --- appends finales ---
  divDatosSuperiores.append(h3, divEtiquetas, pDescripcion);
  divControlesInferiores.append(divRowPrecios, divRowControles, divTotal);
  divCardBody.append(divDatosSuperiores, divControlesInferiores);
  divCard.append(divContenedorImg, divCardBody);
  divCol.appendChild(divCard);

  return divCol;
}

function generarEtiquetas(idsEtiqEnProd, contenedor) {
  idsEtiqEnProd.forEach(id => {
    const etiqueta = buscarEtiquetaPorID(id)
    const span = document.createElement("span");
    span.classList.add("badge", "bg-light", "text-secondary", "border", "rounded-pill", "extra-small", "px-2", "me-1");
    span.textContent = `#${etiqueta.nombre}`;
    span.setAttribute("data-bs-toggle", "tooltip");
    span.setAttribute("data-bs-title", etiqueta.descripcion);
    contenedor.appendChild(span)
  });
}

function modificarCantidad(prod, operacion) {
  const { id, cantMayorista, precioMinorista, precioMayorista, stock } = prod;
  const input = document.getElementById(`input-${id}`);
  const span = document.getElementById(`span-${id}`);
  
  let cant = Number(input.value);
  switch (operacion) {
    case "restar":
      cant = cant > 1 ? cant - 1 : cant;
      break;
    case "sumar":
      cant = cant < stock ? cant + 1 : cant;
      break;
    default: // cuando borra o escribe a mano numeros mayores al stock
      if( cant < 1){
        cant = 1 // se lo reseteo a 1 si puso cero o numeros negativos
      } else if (cant > stock ){
        cant = stock; // si puso un numero mayor al stock le pongo el stock como tope
      }
      break;
  }
  input.value = cant;
  destacarPrecio(prod, cant)
  actualizarSubTotal(span, cant, cantMayorista, precioMinorista, precioMayorista)
}

function destacarPrecio(prod, cant) {
  const { id, cantMayorista } = prod;
  const boxMin = document.getElementById(`box-min-${id}`)
  const boxMay = document.getElementById(`box-may-${id}`)
  if (cant >= cantMayorista) {
    boxMay.classList.add("border-rosa");
    boxMin.classList.remove("border-rosa");
  } else {
    boxMay.classList.remove("border-rosa");
    boxMin.classList.add("border-rosa");
  }
}

function actualizarSubTotal(span, cantidad, cantMin, pMin, pMay) {
  const subTotal = cantidad < cantMin ? cantidad * pMin : cantidad * pMay
  span.textContent = `$${subTotal}`;
}

// - agregarProductoAlCarrito
function agregarProdAlCarrito(prod, input) {
  // llamar a la funcion del gestor carrito para agregar (ponerla cuando fabri mergee)
  // agregarProdAlCarrito(prod,input.cant)

  // mensaje exitoso
  alert(`Añadido al carrito: ${prod.nombre} x${input.value}`)
  
  // resetear la tarjeta
  input.value = 1
  modificarCantidad(prod)
}


// - filtrarProductos
function cargarFiltrado() {
  const categorias = traerTodasLasCategorias()
  for (const categ of categorias) {
    const opt = document.createElement("option")
    opt.setAttribute("value", categ.id)
    opt.textContent = categ.nombre
    selectCategoria.appendChild(opt)
  }
  inputBusquedaNombre.addEventListener("input", filtrarProductos)
  selectCategoria.addEventListener("change", filtrarProductos)
}

function filtrarProductos() {
  const nombre = inputBusquedaNombre.value.trim().toLowerCase()
  const categoria = selectCategoria.value 
  const listadoProductos = traerTodosLosProductos()  
  
  let filtrado = listadoProductos.filter(p => p.nombre.toLowerCase().includes(nombre))
  if (categoria) {
    filtrado = filtrado.filter(p => p.categoria === categoria)
  }
    
  listarProductos(filtrado)
}