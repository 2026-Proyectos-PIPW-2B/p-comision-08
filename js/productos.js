import {
  buscarCategoriaPorID,
  traerTodasLasCategorias,
  cargarListadoPredeterminadoCategorias,
  buscarCategoria,
} from "./gestores/gestorCategorias.js";
import {
  traerTodasLasEtiquetas,
  cargarListadoPredeterminadoEtiquetas,
  buscarEtiqueta,
} from "./gestores/gestorEtiquetas.js";
import { autorizacion } from "./gestores/gestorLogin.js";
import {
  agregarProducto,
  eliminarProducto,
  modificarProducto,
  traerTodosLosProductos,
  buscarProductoPorNombre,
  borrarProductos,
  cargarListadoPredeterminadoProductos,
} from "./gestores/gestorProductos.js";
import { cargarDatosNavbar } from "./navbar.js";
import {
  feedback,
  generarID,
  lanzarToast,
  limpiarEstados,
  validarCadena,
} from "./utilidades.js";

const formRegistrarProducto = document.getElementById("formRegistrarProducto");
const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const inputPrecioMinorista = document.getElementById("inputPrecioMinorista");
const inputPrecioMayorista = document.getElementById("inputPrecioMayorista");
const inputCantMay = document.getElementById("inputCantMay");
const inputStock = document.getElementById("inputStock");
const selectCategoria = document.getElementById("selectCategoria");
const selectImagen = document.getElementById("selectImagen");
const inputImgURL = document.getElementById("inputImgURL");

const modalInputNombre = document.getElementById("modalInputNombre");
const modalInputDescripcion = document.getElementById("modalInputDescripcion");
const modalInputPrecioMinorista = document.getElementById(
  "modalInputPrecioMinorista",
);
const modalInputPrecioMayorista = document.getElementById(
  "modalInputPrecioMayorista",
);
const modalInputCantMay = document.getElementById("modalInputCantMay");
const modalInputStock = document.getElementById("modalInputStock");
const modalSelectCategoria = document.getElementById("modalSelectCategoria");
const modalContenedorEtiquetas = document.getElementById(
  "modalContenedorEtiquetas",
);
const modalSelectImagen = document.getElementById("modalSelectImagen");
const modalInputImgURL = document.getElementById("modalInputImgURL");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const btnGuardarCambios = document.getElementById("btnGuardarCambios");
const btnListadoPred = document.getElementById("btnListadoPred");
const btnBorrarProductos = document.getElementById("btnBorrarProductos");

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  inicializarForm();
  listarProductos();
  btnListadoPred.addEventListener("click", cargarListadoPredeterminado);
  btnBorrarProductos.addEventListener("click", () => {
    borrarProductos();
    listarProductos();
  });
});

function inicializarForm() {
  cargarCategoriasEnSelect("selectCategoria");
  cargarEtiquetasEnCheckboxes("contenedorEtiquetas");

  cargarImagenVistaPrevia("imgPreview", "inputImgURL", "selectImagen");
  selectImagen.addEventListener("change", () =>
    cargarImagenVistaPrevia("imgPreview", "inputImgURL", "selectImagen"),
  );
  inputImgURL.addEventListener("input", () =>
    cargarImagenVistaPrevia("imgPreview", "inputImgURL", "selectImagen"),
  );

  formRegistrarProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarEstados("#formRegistrarProducto");

    const validacion = validarFormRegistrarProd();
    if (validacion.resultado) {
      formRegistrarProducto.reset();
      limpiarEstados("#formRegistrarProducto");
      cargarImagenVistaPrevia("imgPreview", "inputImgURL", "selectImagen");
      agregarProducto(validacion.obj);
      mensajeExitoso("Producto creado correctamente");
      listarProductos();
    }
  });
}

function cargarImagenVistaPrevia(idVistaPrevia, idInput, idSelect) {
  const imgVistaPrevia = document.getElementById(idVistaPrevia);
  const input = document.getElementById(idInput);
  const select = document.getElementById(idSelect);
  let urlPersonalizada = input.value;
  let nombreImagen = select.value;
  let urlImg;
  let alt = "imagen del producto";

  // si existe prioriza el URL del input antes que el select
  if (urlPersonalizada !== "") {
    urlImg = urlPersonalizada;
  } else {
    if (nombreImagen === "sin-foto") {
      urlImg = `img/sin-foto.jpg`;
    } else {
      urlImg = `img/${nombreImagen}.png`;
    }
    alt = nombreImagen;
  }
  imgVistaPrevia.setAttribute("src", urlImg);
  imgVistaPrevia.setAttribute("alt", alt);
}

function mensajeExitoso(msj) {
  lanzarToast(msj,"verde");
}

function validarFormRegistrarProd() {
  const nombre = inputNombre.value;
  const descripcion = inputDescripcion.value;
  const precioMinorista = Number(inputPrecioMinorista.value);
  const precioMayorista = Number(inputPrecioMayorista.value);
  const cantMayorista = Number(inputCantMay.value);
  const stock = Number(inputStock.value);
  const categoria = selectCategoria.value;

  const checkboxesMarcados = document.querySelectorAll(
    ".check-etiqueta:checked",
  );
  const etiquetas = Array.from(checkboxesMarcados).map(
    (checkbox) => checkbox.value,
  );

  // si ingresa un URL personalizado lo prioriza, sino toma de las precargadas
  let imagenURL;
  if (inputImgURL.value !== "") {
    imagenURL = inputImgURL.value;
  } else {
    // este if es porque la imagen "sin-foto.jpg" es jpg y el resto son png
    if (selectImagen.value === "sin-foto") {
      imagenURL = `img/${selectImagen.value}.jpg`;
    } else {
      imagenURL = `img/${selectImagen.value}.png`;
    }
  }

  const validacion = {
    resultado: true,
    obj: {
      nombre,
      descripcion,
      precioMinorista,
      precioMayorista,
      cantMayorista,
      stock,
      categoria,
      etiquetas,
      imagenURL,
    },
  };

  // validaciones

  const validacionNombre = validarCadena(nombre, 5, 100);
  if (!validacionNombre) {
    validacion.resultado = false;
    feedback(
      inputNombre,
      "feedbackNombre",
      `ERROR: El nombre debe tener entre 5 a 100 caracteres.`,
    );
  } else {
    feedback(inputNombre, "feedbackNombre");
  }

  const validacionDescripcion = validarCadena(descripcion, 5, 100);
  if (!validacionDescripcion) {
    validacion.resultado = false;
    feedback(
      inputDescripcion,
      "feedbackDescripcion",
      `ERROR: La descripción debe tener entre 5 a 100 caracteres.`,
    );
  } else {
    feedback(inputDescripcion, "feedbackDescripcion");
  }

  if (precioMinorista === 0) {
    validacion.resultado = false;
    feedback(
      inputPrecioMinorista,
      "feedbackPrecioMinorista",
      `ERROR: Debe ingresar un precio.`,
    );
  } else {
    feedback(inputPrecioMinorista, "feedbackPrecioMinorista");
  }

  if (precioMayorista === 0) {
    validacion.resultado = false;
    feedback(
      inputPrecioMayorista,
      "feedbackPrecioMayorista",
      `ERROR: Debe ingresar un precio.`,
    );
  } else {
    feedback(inputPrecioMayorista, "feedbackPrecioMayorista");
  }

  if (cantMayorista === 0) {
    validacion.resultado = false;
    feedback(
      inputCantMay,
      "feedbackCantMay",
      `ERROR: Debe ingresar una cantidad.`,
    );
  } else {
    feedback(inputCantMay, "feedbackCantMay");
  }

  if (stock === 0) {
    validacion.resultado = false;
    feedback(inputStock, "feedbackStock", `ERROR: Debe ingresar una cantidad.`);
  } else {
    feedback(inputStock, "feedbackStock");
  }

  feedback(selectCategoria, "feedbackCategoria");

  // es valido siempre porque son opcionales
  const checkEtiquetas = document.querySelectorAll(".check-etiqueta");
  checkEtiquetas.forEach((elemento) => {
    elemento.classList.add("is-valid");
  });

  // pone como valido al que usa
  if (inputImgURL.value !== "") {
    inputImgURL.classList.add("is-valid");
  } else {
    selectImagen.classList.add("is-valid");
  }

  return validacion;
}

function listarProductos() {
  const contenedorListado = document.getElementById("divContenedorListado");
  const listado = traerTodosLosProductos();

  contenedorListado.innerHTML = "";
  if (listado.length === 0) {
    contenedorListado.innerHTML = `<p class=" text-center p-5 shadow-sm mx-auto bg-white rounded">Aun no has registrado productos.</p>`;
  } else {
    for (const prod of listado) {
      const divContenedor = document.createElement("div");
      divContenedor.classList.add("col", "mb-3");

      const divCard = document.createElement("div");
      divCard.classList.add("card", "shadow-sm");

      const divRow = document.createElement("div");
      divRow.classList.add("row", "g-0", "align-items-center");

      // imagen
      const divImagen = document.createElement("div");
      divImagen.classList.add("col-md-3", "text-center", "p-3");

      const img = document.createElement("img");
      img.setAttribute("src", prod.imagenURL);
      img.setAttribute("alt", prod.nombre);
      img.classList.add("img-fluid", "rounded");

      // info del prod
      const divInfo = document.createElement("div");
      divInfo.classList.add("col-md-9");

      const divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body", "d-flex", "flex-column", "h-100");

      const nombre = document.createElement("p");
      nombre.classList.add("h5", "card-title", "fw-bold");
      nombre.textContent = prod.nombre;

      const descripcion = document.createElement("p");
      descripcion.classList.add("card-text", "text-muted", "mb-2");
      descripcion.textContent = prod.descripcion;

      const divRowPreciosCatStock = document.createElement("div");
      divRowPreciosCatStock.classList.add("row", "g-3", "my-1");

      const divPrimerColumna = document.createElement("div");
      divPrimerColumna.classList.add("col-sm-6");

      const parrafoPrecios = document.createElement("p");
      parrafoPrecios.classList.add("mb-1", "fw-bold");
      parrafoPrecios.textContent = "Precios:";

      const ulPrecios = document.createElement("ul");
      ulPrecios.classList.add("list-unstyled", "ps-2", "mb-0");

      const liMinorista = document.createElement("li");
      const spanMinorista = document.createElement("span");
      spanMinorista.classList.add("text-secondary");
      spanMinorista.textContent = "Minorista: ";
      const spanMinoristaPrecio = document.createElement("span");
      spanMinoristaPrecio.classList.add("fw-semibold", "text-dark");
      spanMinoristaPrecio.textContent = `$${prod.precioMinorista}`;

      const liMayorista = document.createElement("li");
      const spanMayorista = document.createElement("span");
      spanMayorista.classList.add("text-secondary");
      spanMayorista.textContent = "Mayorista: ";
      const spanMayoristaPrecio = document.createElement("span");
      spanMayoristaPrecio.classList.add("fw-semibold");
      spanMayoristaPrecio.textContent = `$${prod.precioMayorista}`;
      const smallCantMay = document.createElement("small");
      smallCantMay.classList.add("text-muted", "d-block");
      smallCantMay.innerHTML = `(A partir de <span class="fw-semibold">${prod.cantMayorista}</span> unidades)`;

      const divSegundaColumna = document.createElement("div");
      divSegundaColumna.classList.add("col-sm-6");

      const parrafoCategoria = document.createElement("p");
      parrafoCategoria.classList.add("card-text");
      const spanNombreCat = document.createElement("span");
      spanNombreCat.classList.add("fw-bold");
      spanNombreCat.textContent = "Categoría: ";
      const spanBadgeCategoria = document.createElement("span");
      spanBadgeCategoria.classList.add(
        "badge",
        "bg-danger-subtle",
        "px-3",
        "py-2",
        "text-dark",
        "shadow-sm",
      );
      let categ = buscarCategoriaPorID(prod.categoria);
      spanBadgeCategoria.textContent = categ.nombre || "Sin Clasificar";
      // tooltip de bootstrap en la categoria
      spanBadgeCategoria.setAttribute("data-bs-toggle", "tooltip");
      spanBadgeCategoria.setAttribute("data-bs-title", categ.descripcion);

      const parrafoStock = document.createElement("p");
      parrafoStock.classList.add("card-text");
      const spanNombreStock = document.createElement("span");
      spanNombreStock.classList.add("fw-bold");
      spanNombreStock.textContent = "Stock: ";
      const spanStock = document.createElement("span");
      spanStock.classList.add("fw-semibold");
      spanStock.textContent = `${prod.stock} u.`;

      const divEtiquetasYBotones = document.createElement("div");
      divEtiquetasYBotones.classList.add(
        "d-flex",
        "flex-column",
        "flex-sm-row",
        "justify-content-between",
        "align-items-sm-center",
        "pt-3",
        "border-top",
        "mt-2",
        "gap-2",
      );
      const divEtiquetas = document.createElement("div");
      const smallEtiquetas = document.createElement("small");
      smallEtiquetas.classList.add("text-secondary", "d-inline-block", "me-2");
      smallEtiquetas.textContent = "Etiquetas:";
      divEtiquetas.append(smallEtiquetas);
      crearBadgesDeEtiquetas(divEtiquetas, prod.etiquetas);

      const divBotones = document.createElement("div");
      divBotones.classList.add("d-flex", "gap-2");
      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "btn",
        "btn-primary",
        "btn-sm",
        "d-flex",
        "align-items-center",
        "gap-1",
      );
      btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i>Editar`;
      btnEditar.setAttribute("data-bs-toggle", "modal");
      btnEditar.setAttribute("data-bs-target", "#modalFormulario");
      btnEditar.addEventListener("click", () => cargarModalEditarProd(prod));

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "btn",
        "btn-danger",
        "btn-sm",
        "d-flex",
        "align-items-center",
        "gap-1",
      );
      btnEliminar.innerHTML = `<i class="bi bi-trash"></i>Eliminar`;
      btnEliminar.addEventListener("click", () => {
        eliminarProducto(prod.id);
        lanzarToast("Producto eliminado correctamente","verde")
        listarProductos();
      });

      // appends

      divBotones.append(btnEditar, btnEliminar);
      divEtiquetasYBotones.append(divEtiquetas, divBotones);
      parrafoStock.append(spanNombreStock, spanStock);
      parrafoCategoria.append(spanNombreCat, spanBadgeCategoria);
      divSegundaColumna.append(parrafoCategoria, parrafoStock);
      liMayorista.append(spanMayorista, spanMayoristaPrecio, smallCantMay);
      liMinorista.append(spanMinorista, spanMinoristaPrecio);
      ulPrecios.append(liMinorista, liMayorista);
      divPrimerColumna.append(parrafoPrecios, ulPrecios);
      divRowPreciosCatStock.append(divPrimerColumna, divSegundaColumna);
      divCardBody.append(
        nombre,
        descripcion,
        divRowPreciosCatStock,
        divEtiquetasYBotones,
      );
      divInfo.appendChild(divCardBody);
      divImagen.appendChild(img);
      divRow.append(divImagen, divInfo);
      divCard.appendChild(divRow);
      divContenedor.appendChild(divCard);
      contenedorListado.appendChild(divContenedor);

      // Pop Overs de Bootstrap para los badges de las etiquetas del producto
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]',
      );
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
      );
    }
  }
}

function crearBadgesDeEtiquetas(contenedor, etiquetasEnElProd) {
  const listadoEtiquetasCompleto = traerTodasLasEtiquetas();
  for (const etiqueta of listadoEtiquetasCompleto) {
    for (const idEtiqueta of etiquetasEnElProd) {
      if (etiqueta.id === idEtiqueta) {
        const span = document.createElement("span");
        span.classList.add("badge", "bg-secondary", "me-1");
        span.textContent = etiqueta.nombre;
        span.setAttribute("data-bs-toggle", "tooltip");
        span.setAttribute("data-bs-title", etiqueta.descripcion);
        contenedor.appendChild(span);
      }
    }
  }
}

function cargarCategoriasEnSelect(idSelect) {
  const select = document.getElementById(idSelect);
  select.innerHTML = "";
  const listadoCategorias = traerTodasLasCategorias();

  const optSeleccione = document.createElement("option");
  optSeleccione.setAttribute("selected", "");
  optSeleccione.setAttribute("disabled", "");
  optSeleccione.setAttribute("value", "");
  optSeleccione.textContent = "Seleccione una categoria...";
  select.appendChild(optSeleccione);

  for (const categoria of listadoCategorias) {
    const opt = document.createElement("option");
    opt.setAttribute("value", categoria.id);
    opt.textContent = categoria.nombre;
    select.appendChild(opt);
  }
}

function cargarEtiquetasEnCheckboxes(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = "";
  const listadoEtiquetas = traerTodasLasEtiquetas();

  for (const etiqueta of listadoEtiquetas) {
    const divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");

    const inputCheck = document.createElement("input");
    if (idContenedor.includes("modal")) {
      inputCheck.classList.add("form-check-input", "check-etiqueta-modal");
    } else {
      inputCheck.classList.add("form-check-input", "check-etiqueta");
    }
    inputCheck.setAttribute("type", "checkbox");
    inputCheck.setAttribute("value", etiqueta.id);
    inputCheck.setAttribute("id", etiqueta.id);
    inputCheck.setAttribute("name", etiqueta.nombre);

    const labelCheck = document.createElement("label");
    labelCheck.classList.add("form-check-label");
    labelCheck.setAttribute("for", etiqueta.id);
    labelCheck.textContent = etiqueta.nombre;

    divFormCheck.append(inputCheck, labelCheck);
    contenedor.appendChild(divFormCheck);
  }
}

function cargarModalEditarProd(producto) {
  inicializarFormModal();
  cargarDatosDelProductoEnFormModal(producto);
}

function inicializarFormModal() {
  // crear dinamicamente los checkbox y las options del select
  cargarCategoriasEnSelect("modalSelectCategoria");
  cargarEtiquetasEnCheckboxes("modalContenedorEtiquetas");

  // cargar vista previa de imagen y handlers
  cargarImagenVistaPrevia(
    "modalImgPreview",
    "modalInputImgURL",
    "modalSelectImagen",
  );
  modalSelectImagen.addEventListener("change", () => {
    cargarImagenVistaPrevia(
      "modalImgPreview",
      "modalInputImgURL",
      "modalSelectImagen",
    );
  });
  modalInputImgURL.addEventListener("input", () => {
    cargarImagenVistaPrevia(
      "modalImgPreview",
      "modalInputImgURL",
      "modalSelectImagen",
    );
  });
  limpiarEstados("#modalFormEditar");
}

function cargarDatosDelProductoEnFormModal(producto) {
  modalInputNombre.value = producto.nombre;
  modalInputDescripcion.value = producto.descripcion;
  modalInputPrecioMinorista.value = producto.precioMinorista;
  modalInputPrecioMayorista.value = producto.precioMayorista;
  modalInputCantMay.value = producto.cantMayorista;
  modalInputStock.value = producto.stock;

  // cargar la categoria
  modalSelectCategoria.value = buscarCategoriaPorID(producto.categoria).id;

  // cargar las etiquetas
  const checkboxes = document.querySelectorAll(".check-etiqueta-modal");
  for (const cb of checkboxes) {
    cb.removeAttribute("checked");
    for (const idEtiquetaEnElProducto of producto.etiquetas) {
      if (cb.id === idEtiquetaEnElProducto) {
        cb.setAttribute("checked", true);
      }
    }
  }

  // cargar la imagen
  const options = document.querySelectorAll("#modalSelectImagen option");
  for (const opt of options) {
    opt.removeAttribute("selected");
  }
  if (producto.imagenURL.includes("http")) {
    modalInputImgURL.value = producto.imagenURL;
  } else {
    modalInputImgURL.value = "";
    for (const opt of options) {
      if (producto.imagenURL.includes(opt.value)) {
        opt.setAttribute("selected", true);
      }
    }
  }
  cargarImagenVistaPrevia(
    "modalImgPreview",
    "modalInputImgURL",
    "modalSelectImagen",
  );

  // cargar el boton guardar cambios con la funcion que modifica el producto y agregar el id como parametro
  btnGuardarCambios.onclick = () => guardarCambios(producto.id);
}

function guardarCambios(id) {
  const modalFormEditar = document.getElementById("modalFormEditar");
  const nombre = modalInputNombre.value;
  const descripcion = modalInputDescripcion.value;
  const precioMinorista = Number(modalInputPrecioMinorista.value);
  const precioMayorista = Number(modalInputPrecioMayorista.value);
  const cantMayorista = Number(modalInputCantMay.value);
  const stock = Number(modalInputStock.value);
  const categoria = modalSelectCategoria.value;

  const checkboxesMarcados = document.querySelectorAll(
    ".check-etiqueta-modal:checked",
  );
  const etiquetas = Array.from(checkboxesMarcados).map((cb) => cb.value);

  // si ingresa un URL personalizado lo prioriza, sino toma de las precargadas
  let imagenURL;
  if (modalInputImgURL.value !== "") {
    imagenURL = modalInputImgURL.value;
  } else {
    // este if es porque la imagen "sin-foto.jpg" es jpg y el resto son png
    if (modalSelectImagen.value === "sin-foto") {
      imagenURL = `/img/${modalSelectImagen.value}.jpg`;
    } else {
      imagenURL = `/img/${modalSelectImagen.value}.png`;
    }
  }

  const prodModificado = {
    nombre,
    descripcion,
    precioMinorista,
    precioMayorista,
    cantMayorista,
    stock,
    categoria,
    etiquetas,
    imagenURL,
  };

  limpiarEstados("#modalFormEditar");
  // Validar Form
  const validacion = validarFormModal(prodModificado);
  if (validacion) {
    modificarProducto(id, prodModificado);
    modalFormEditar.reset();
    limpiarEstados("#modalFormEditar");
    mensajeExitoso("Producto modificado correctamente");
    btnCerrarModal.click();
    listarProductos();
  }
}

function validarFormModal(obj) {
  let resultado = true;

  const validacionNombre = validarCadena(obj.nombre, 5, 100);
  if (!validacionNombre) {
    resultado = false;
    feedback(
      modalInputNombre,
      "feedbackNombreModal",
      `ERROR: El nombre debe tener entre 5 a 100 caracteres.`,
    );
  } else {
    feedback(modalInputNombre, "feedbackNombreModal");
  }

  const validacionDescripcion = validarCadena(obj.descripcion, 5, 100);
  if (!validacionDescripcion) {
    resultado = false;
    feedback(
      modalInputDescripcion,
      "feedbackDescripcionModal",
      `ERROR: La descripción debe tener entre 5 a 100 caracteres.`,
    );
  } else {
    feedback(modalInputDescripcion, "feedbackDescripcionModal");
  }

  if (obj.precioMinorista === 0) {
    resultado = false;
    feedback(
      modalInputPrecioMinorista,
      "feedbackPrecioMinoristaModal",
      `ERROR: Debe ingresar un precio.`,
    );
  } else {
    feedback(modalInputPrecioMinorista, "feedbackPrecioMinoristaModal");
  }

  if (obj.precioMayorista === 0) {
    resultado = false;
    feedback(
      modalInputPrecioMayorista,
      "feedbackPrecioMayoristaModal",
      `ERROR: Debe ingresar un precio.`,
    );
  } else {
    feedback(modalInputPrecioMayorista, "feedbackPrecioMayoristaModal");
  }

  if (obj.cantMayorista === 0) {
    resultado = false;
    feedback(
      modalInputCantMay,
      "feedbackCantMayModal",
      `ERROR: Debe ingresar una cantidad.`,
    );
  } else {
    feedback(modalInputCantMay, "feedbackCantMayModal");
  }

  if (obj.stock === 0) {
    resultado = false;
    feedback(
      modalInputStock,
      "feedbackStockModal",
      `ERROR: Debe ingresar una cantidad.`,
    );
  } else {
    feedback(modalInputStock, "feedbackStockModal");
  }

  feedback(modalSelectCategoria, "feedbackCategoriaModal");

  // es valido siempre porque son opcionales
  const modalCheckEtiquetas = document.querySelectorAll(
    ".check-etiqueta-modal",
  );
  modalCheckEtiquetas.forEach((cb) => {
    cb.classList.add("is-valid");
  });

  // pone como valido al que usa
  if (inputImgURL.value !== "") {
    modalInputImgURL.classList.add("is-valid");
  } else {
    modalSelectImagen.classList.add("is-valid");
  }

  return resultado;
}

export function cargarListadoPredeterminado() {
  cargarListadoPredeterminadoCategorias();
  cargarCategoriasEnSelect("selectCategoria");
  cargarListadoPredeterminadoEtiquetas();
  cargarEtiquetasEnCheckboxes("contenedorEtiquetas");
  cargarListadoPredeterminadoProductos()
  listarProductos();
}