import { autorizacion } from "./gestores/gestorLogin.js";
import { traerTodosLosProductos } from "./gestores/gestorProductos.js";
import { cargarDatosNavbar } from "./navbar.js";

const contenedorProductos = document.getElementById("contenedorProductos");

window.addEventListener("load", () => {
  autorizacion("Usuario");
  cargarDatosNavbar();
  //   listarTodosLosProductos();
});

// - listarProductos
function listarTodosLosProductos() {
  const listado = traerTodosLosProductos();
  contenedorProductos.innerHTML = "";
  for (const prod of listado) {
    const tarjetaProd = crearTarjetaProd(prod);
    contenedorProductos.appendChild(tarjetaProd);
  }
}

function crearTarjetaProd(prod) {
  const divCol = document.createElement("div");
  divCol.classList.add("col");

  const divCard = document.createElement("div");
  divCard.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", prod.imagenURL);
  img.setAttribute("alt", prod.nombre);
  img.addEventListener("click", () => alert("abre el modal"));

  const divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body", "justify-content-center");

  const h3 = document.createElement("h3");
  h3.classList.add("card-title", "text-center", "h5");
  h3.textContent = prod.nombre;

  const divSelectorCant = document.createElement("div");
  divSelectorCant.classList.add(
    "d-flex",
    "justify-content-center",
    "selector-cantidad",
  );

  const btnMenosCant = document.createElement("button");
  btnMenosCant.classList.add("btn", "btn-primary");
  btnMenosCant.textContent = "-";
  btnMenosCant.setAttribute("type", "button");
  btnMenosCant.addEventListener("click", () =>
    modificarCantidad(prod.id, "restar"),
  );

  const inputCant = document.createElement("input");
  inputCant.classList.add("form-control");
  inputCant.setAttribute("type", "text");
  inputCant.setAttribute("value", 0);
  inputCant.setAttribute("min", 0);
  // inputCant.setAttribute("name", "")
  inputCant.setAttribute("id", prod.id);

  const btnMasCant = document.createElement("button");
  btnMasCant.classList.add("btn", "btn-primary");
  btnMasCant.textContent = "+";
  btnMasCant.setAttribute("type", "button");
  btnMasCant.addEventListener("click", () =>
    modificarCantidad(prod.id, "sumar"),
  );

  const divPrecioMinorista = document.createElement("div");
  divPrecioMinorista.classList.add("card-text", "text-center");

  const spanPrecioMinorista = document.createElement("span");
  spanPrecioMinorista.textContent = "Precio minorista: ";

  const spanCantPrecioMinorista = document.createElement("span");
  spanCantPrecioMinorista.classList.add("p-4");
  spanCantPrecioMinorista.textContent = `$${prod.precioMinorista}`;

  const divPrecioMayorista = document.createElement("div");
  divPrecioMayorista.classList.add("card-text", "text-center");

  const spanPrecioMayorista = document.createElement("span");
  spanPrecioMayorista.textContent = "Precio mayorista: ";

  const spanCantPrecioMayorista = document.createElement("span");
  spanCantPrecioMayorista.textContent = `$${prod.precioMayorista}`;

  const pCantidadMayorista = document.createElement("p");
  pCantidadMayorista.classList.add("text-center", "small");
  pCantidadMayorista.textContent = `(Comprando +${prod.cantMayorista}u.)`;

  const divStock = document.createElement("div");
  divStock.classList.add("card-text", "text-center");

  const spanStock = document.createElement("span");
  spanStock.textContent = "Stock disponible: ";

  const spanCantStock = document.createElement("span");
  spanCantStock.textContent = `${prod.stock}u.`;

  const divTotal = document.createElement("div");
  divTotal.classList.add("sub-total", "p-4", "m-4", "h5", "text-center");
  const spanTotal = document.createElement("span");
  spanTotal.classList.add("small");
  spanTotal.textContent = "Total: ";

  const spanCantTotal = document.createElement("span");
  spanCantTotal.setAttribute("id", `span-${prod.id}`);
  spanCantTotal.textContent = calcularSubTotal(
    inputCant.value,
    prod.cantMayorista,
    prod.precioMinorista,
    prod.precioMayorista,
  );

  const btnAgregarAlCarrito = document.createElement("button");
  btnAgregarAlCarrito.classList.add("btn", "btn-primary", "w-100");
  btnAgregarAlCarrito.textContent = "Añadir al carrito";
  btnAgregarAlCarrito.addEventListener("click", () => {
    alert("Añadido al carrito (mentira)");
  });

  divTotal.append(spanTotal, spanCantTotal);
  divStock.append(spanStock, spanCantStock);
  divPrecioMayorista.append(
    spanPrecioMayorista,
    spanCantPrecioMayorista,
    pCantidadMayorista,
  );
  divPrecioMinorista.append(spanPrecioMinorista, spanCantPrecioMinorista);
  divSelectorCant.append(btnMenosCant, inputCant, btnMasCant);
  divCardBody.append(
    h3,
    divSelectorCant,
    divPrecioMinorista,
    divPrecioMayorista,
    divStock,
    divTotal,
    btnAgregarAlCarrito,
  );
  divCard.append(img, divCardBody);
  divCol.appendChild(divCard);

  //   divTotal.append(spanTotal, spanCantTotal);
  //   divStock.append(spanStock, spanCantStock);
  //   divPrecioMayorista.append(
  //     spanPrecioMayorista,
  //     spanCantPrecioMayorista,
  //     pCantidadMayorista,
  //   );
  //   divPrecioMinorista.append(spanPrecioMinorista, spanCantPrecioMinorista);
  //   divSelectorCant.append(btnMenosCant, inputCant, btnMasCant);
  //   divCardBody.append(
  //     h3,
  //     divSelectorCant,
  //     divPrecioMinorista,
  //     divPrecioMayorista,
  //     divStock,
  //     divTotal,
  //     btnAgregarAlCarrito,
  //   );
  //   divCard.append(img, divCardBody);
  //   divCol.appendChild(divCard);

  return divCol;
}

function modificarCantidad(id, operacion) {
  const input = document.getElementById(id);
  const span = document.getElementById(`span-${id}`);
  let cant;
  if (operacion === "restar") {
    if (Number(input.value) > 0) {
      cant = Number(input.value) - 1;
      input.value = cant;
      // span.value = calcularSubTotal(cant,)
    }
  } else {
    input.value = Number(input.value) + 1;
  }
}

function calcularSubTotal(cantidad, cantMin, pMin, pMay) {
  if (cantidad < cantMin) {
    return cantidad * pMin;
  } else {
    return cantidad * pMay;
  }
}

// - agregarProductoAlCarrito
//   - toma la cantidad del input y
// - modificarCantidad
//   - cambia la cantidad en el input (min 1, max stock)
//   - FUNCTION calcularSubTotal
// - filtrarProductos
