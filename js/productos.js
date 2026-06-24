import { autorizacion } from "./gestores/gestorLogin.js";
import { agregarProducto, modificarProducto, traerTodosLosProductos } from "./gestores/gestorProductos.js";
import { cargarDatosNavbar } from "./navbar.js";
import { feedback, generarID, limpiarEstados, validarCadena } from "./utilidades.js";

const formRegistrarProducto = document.getElementById("formRegistrarProducto");
const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const inputPrecioMinorista = document.getElementById("inputPrecioMinorista");
const inputPrecioMayorista = document.getElementById("inputPrecioMayorista");
const inputCantMay = document.getElementById("inputCantMay");
const inputStock = document.getElementById("inputStock");
const selectCategoria = document.getElementById("selectCategoria");
const checkEtiquetas = document.querySelectorAll(".check-etiqueta");
const selectImagen = document.getElementById("selectImagen");
const inputImgURL = document.getElementById("inputImgURL");
const imgPreview = document.getElementById("imgPreview");

const tbodyProductos = document.getElementById("tbodyProductos");
const divTabla = document.getElementById("divTabla");
const divMensajeTabla = document.getElementById("divMensajeTabla");


// const modalInputNombre = document.getElementById("modalInputNombre");
// const modalInputDescripcion = document.getElementById("modalInputDescripcion");
// const modalInputPrecioMinorista = document.getElementById("modalInputPrecioMinorista");
// const modalInputPrecioMayorista = document.getElementById("modalInputPrecioMayorista");
// const modalinputCantMay = document.getElementById("modalinputCantMay");
// const modalInputStock = document.getElementById("modalInputStock");
// const modalSelectCategoria = document.getElementById("modalSelectCategoria");

// const btnModalGuardarCambios = document.getElementById("btnGuardarCambios");

// const productoEj = {
//   idProd: "123",
//   nombre: "alfajor rasta",
//   descripcion: "alfajor nacional artesanal",
//   precioMinorista: 1200,
//   precioMayorista: 1000,
//   cantmin: 10,
//   stock: 300,
//   categoria: "alfajor",
//   etiquetas: ["idEtiqueta1"],
//   imagen: "",
// };

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  inicializar();
  listarProductos()
});

function inicializar() {
  cargarImagenVistaPrevia();
  selectImagen.addEventListener("change", cargarImagenVistaPrevia);
  inputImgURL.addEventListener("input", cargarImagenVistaPrevia);

  formRegistrarProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarEstados("#formRegistrarProducto")
    
    const validacion = validarFormRegistrarProd();
    if (validacion.resultado) {      
      formRegistrarProducto.reset()
      limpiarEstados("#formRegistrarProducto")
      cargarImagenVistaPrevia();
      registrarProducto(validacion.obj)
      mensajeExitoso("Producto creado correctamente")
      listarProductos()
    }
  });
}

function cargarImagenVistaPrevia() {
  let urlPersonalizada = inputImgURL.value;
  let nombreImagen = selectImagen.value;
  let urlImg;
  let alt = "imagen del producto";

  // si existe prioriza el URL del input antes que el select
  if (urlPersonalizada !== "") {
    urlImg = urlPersonalizada;
  } else {
    if (nombreImagen === "sin-foto") {
      urlImg = `/img/sin-foto.jpg`;
    } else {
      urlImg = `/img/${nombreImagen}.png`;
    }
    alt = nombreImagen
  }
  imgPreview.setAttribute("src", urlImg);
  imgPreview.setAttribute("alt", alt);
}

function registrarProducto(prod) {
  prod.id = generarID("PROD")
  agregarProducto(prod)
}

function mensajeExitoso(msj) {
  alert(msj)
}

function validarFormRegistrarProd() {
  const nombre = inputNombre.value
  const descripcion = inputDescripcion.value
  const precioMinorista = Number(inputPrecioMinorista.value)
  const precioMayorista = Number(inputPrecioMayorista.value)
  const cantMayorista = Number(inputCantMay.value)
  const stock = Number(inputStock.value)
  const categoria = selectCategoria.value
  
  const checkboxesMarcados = document.querySelectorAll(".check-etiqueta:checked")
  const etiquetas = Array.from(checkboxesMarcados).map(checkbox => checkbox.value)
  // ver si las etiquetas las agregamos por el nombre o por el ID. 
  
  // si ingresa un URL personalizado lo prioriza, sino toma de las precargadas
  let imagenURL 
  if (inputImgURL.value !== "") { 
    imagenURL = inputImgURL.value;
  } else {
    // este if es porque la imagen "sin-foto.jpg" es jpg y el resto son png
    if (selectImagen.value === "sin-foto") {
      imagenURL = `/img/${selectImagen.value}.jpg`;
    } else {
      imagenURL = `/img/${selectImagen.value}.png`;
    }
  }

  const validacion = { 
    resultado: true,
    obj: { nombre, descripcion, precioMinorista, precioMayorista, cantMayorista, stock, categoria, etiquetas, imagenURL}
  };
  
  
  // Hacer las validaciones

  const validacionNombre = validarCadena(nombre,5,20)
  if(!validacionNombre) {
    validacion.resultado = false
    feedback(inputNombre,"feedbackNombre", `ERROR: El nombre debe tener entre 5 a 20 caracteres.`)
  } else {
    feedback(inputNombre,"feedbackNombre")
  }

  const validacionDescripcion = validarCadena(descripcion,5,100)
  if(!validacionDescripcion) {
    validacion.resultado = false
    feedback(inputDescripcion,"feedbackDescripcion", `ERROR: La descripción debe tener entre 5 a 100 caracteres.`)
  } else {
    feedback(inputDescripcion,"feedbackDescripcion")
  }


  if(precioMinorista === 0) {
    validacion.resultado = false
    feedback(inputPrecioMinorista,"feedbackPrecioMinorista", `ERROR: Debe ingresar un precio.`)
  } else {
    feedback(inputPrecioMinorista,"feedbackPrecioMinorista")
  }

  if(precioMayorista === 0) {
    validacion.resultado = false
    feedback(inputPrecioMayorista,"feedbackPrecioMayorista", `ERROR: Debe ingresar un precio.`)
  } else {
    feedback(inputPrecioMayorista,"feedbackPrecioMayorista")
  }

  if(cantMayorista === 0) {
    validacion.resultado = false
    feedback(inputCantMay,"feedbackCantMay", `ERROR: Debe ingresar una cantidad.`)
  } else {
    feedback(inputCantMay,"feedbackCantMay")
  }

  if(stock === 0) {
    validacion.resultado = false
    feedback(inputStock,"feedbackStock", `ERROR: Debe ingresar una cantidad.`)
  } else {
    feedback(inputStock,"feedbackStock")
  }

  if(categoria === "") {
    validacion.resultado = false
    feedback(selectCategoria,"feedbackCategoria", `ERROR: Debe seleccionar una categoría.`)
  } else {
    feedback(selectCategoria,"feedbackCategoria")
  }

  // es valido siempre porque son opcionales
  checkEtiquetas.forEach(elemento => {
    elemento.classList.add("is-valid")
  })
  
  // pone como valido al que usa
  if (inputImgURL.value !== "") {
    inputImgURL.classList.add("is-valid")
  } else {
    selectImagen.classList.add("is-valid")
  }

  return validacion;
}

function listarProductos() {
  const contenedorListado = document.getElementById("divContenedorListado")
  const listado = traerTodosLosProductos();

  contenedorListado.innerHTML = ""
  if (listado.length === 0) {
    contenedorListado.innerHTML = `<p class=" text-center p-5 shadow-sm mx-auto bg-white rounded">Aun no has registrado productos.</p>`
  } else {
    for (const prod of listado) {
      const divContenedor = document.createElement("div")
      divContenedor.classList.add("col", "mb-3")

      const divCard = document.createElement("div")
      divCard.classList.add("card", "shadow-sm")
      
      const divRow = document.createElement("div")
      divRow.classList.add("row", "g-0", "align-items-center")
      
      // imagen
      const divImagen = document.createElement("div")
      divImagen.classList.add("col-md-3", "text-center", "p-3")

      const img = document.createElement("img")
      img.setAttribute("src", prod.imagenURL)
      img.setAttribute("alt", prod.nombre)
      img.classList.add("img-fluid", "rounded")


      // info del prod
      const divInfo = document.createElement("div")
      divInfo.classList.add("col-md-9")
      
      const divCardBody = document.createElement("div")
      divCardBody.classList.add("card-body", "d-flex", "flex-column", "h-100")
      
      const nombre = document.createElement("p")
      nombre.classList.add("h5", "card-title", "fw-bold")
      nombre.textContent = prod.nombre
      
      const descripcion = document.createElement("p")
      descripcion.classList.add("card-text", "text-muted", "mb-2")
      descripcion.textContent = prod.descripcion
      
      const divRowPreciosCatStock = document.createElement("div")
      divRowPreciosCatStock.classList.add("row", "g-3", "my-1")
      
      const divPrimerColumna = document.createElement("div")
      divPrimerColumna.classList.add("col-sm-6")
      
      const parrafoPrecios = document.createElement("p")
      parrafoPrecios.classList.add("mb-1", "fw-bold")
      parrafoPrecios.textContent = "Precios:"

      const ulPrecios = document.createElement("ul")
      ulPrecios.classList.add("list-unstyled", "ps-2", "mb-0")

      const liMinorista = document.createElement("li")
      const spanMinorista = document.createElement("span")
      spanMinorista.classList.add("text-secondary")
      spanMinorista.textContent = "Minorista: "
      const spanMinoristaPrecio = document.createElement("span")
      spanMinoristaPrecio.classList.add("fw-semibold", "text-dark")
      spanMinoristaPrecio.textContent = `$${prod.precioMinorista}`
      
      const liMayorista = document.createElement("li")
      const spanMayorista = document.createElement("span")
      spanMayorista.classList.add("text-secondary")
      spanMayorista.textContent = "Mayorista: "
      const spanMayoristaPrecio = document.createElement("span")
      spanMayoristaPrecio.classList.add("fw-semibold")
      spanMayoristaPrecio.textContent = `$${prod.precioMayorista}`
      const smallCantMay = document.createElement("small")
      smallCantMay.classList.add("text-muted", "d-block")
      smallCantMay.innerHTML = `(A partir de <span class="fw-semibold">${prod.cantMayorista}</span> unidades)`



      const divSegundaColumna = document.createElement("div")
      divSegundaColumna.classList.add("col-sm-6")
      
      const parrafoCategoria = document.createElement("p")
      parrafoCategoria.classList.add("card-text")
      const spanNombreCat = document.createElement("span")
      spanNombreCat.classList.add("fw-bold")
      spanNombreCat.textContent = "Categoría: "
      const spanBadgeCategoria = document.createElement("span")
      spanBadgeCategoria.classList.add("badge", "bg-danger-subtle", "px-3", "py-2", "text-dark", "shadow-sm")
      spanBadgeCategoria.textContent = prod.categoria
      
      const parrafoStock = document.createElement("p")
      parrafoStock.classList.add("card-text")
      const spanNombreStock = document.createElement("span")
      spanNombreStock.classList.add("fw-bold")
      spanNombreStock.textContent = "Stock: "
      const spanStock = document.createElement("span")
      spanStock.classList.add("fw-semibold")
      spanStock.textContent = `${prod.stock} u.`


      const divEtiquetasYBotones = document.createElement("div")
      divEtiquetasYBotones.classList.add("d-flex", "flex-column", "flex-sm-row", "justify-content-between", "align-items-sm-center", "pt-3", "border-top", "mt-2", "gap-2")
      const divEtiquetas = document.createElement("div")
      const smallEtiquetas = document.createElement("small")
      smallEtiquetas.classList.add("text-secondary", "d-inline-block", "me-2")
      smallEtiquetas.textContent = "Etiquetas:"
      divEtiquetas.append(smallEtiquetas)
      crearBadgesDeEtiquetas(divEtiquetas, prod.id)

      const divBotones = document.createElement("div")
      divBotones.classList.add("d-flex", "gap-2")
      const btnEditar = document.createElement("button")
      btnEditar.classList.add("btn", "btn-primary", "btn-sm", "d-flex", "align-items-center", "gap-1")
      btnEditar.innerHTML = `<i class="bi bi-pencil-square"></i>Editar`
      btnEditar.setAttribute("data-bs-toggle","modal")
      btnEditar.setAttribute("data-bs-target","#modalFormulario")
      btnEditar.addEventListener("click", () => cargarModalEditarProd(prod))

      const btnEliminar = document.createElement("button")
      btnEliminar.classList.add("btn", "btn-danger", "btn-sm", "d-flex", "align-items-center", "gap-1")
      btnEliminar.innerHTML = `<i class="bi bi-trash"></i>Eliminar`

      // appends
      
      divBotones.append(btnEditar,btnEliminar)
      divEtiquetasYBotones.append(divEtiquetas,divBotones)
      parrafoStock.append(spanNombreStock, spanStock)
      parrafoCategoria.append(spanNombreCat, spanBadgeCategoria)
      divSegundaColumna.append(parrafoCategoria, parrafoStock)
      liMayorista.append(spanMayorista, spanMayoristaPrecio, smallCantMay)
      liMinorista.append(spanMinorista, spanMinoristaPrecio)
      ulPrecios.append(liMinorista, liMayorista)
      divPrimerColumna.append(parrafoPrecios, ulPrecios)
      divRowPreciosCatStock.append(divPrimerColumna, divSegundaColumna)
      divCardBody.append(nombre, descripcion, divRowPreciosCatStock, divEtiquetasYBotones)
      divInfo.appendChild(divCardBody)
      divImagen.appendChild(img)
      divRow.append(divImagen, divInfo)
      divCard.appendChild(divRow)
      divContenedor.appendChild(divCard)
      contenedorListado.appendChild(divContenedor)
    }
  }
}

function crearBadgesDeEtiquetas(contenedor, idProducto) {
  // aca llamaria a la funcion del gestor producto para traer los IDS de etiquetas que tiene el producto
  // y despues al gestor etiquetas para traer los nombres de c/u segun su id, por ahora va hardcodeada
  const listado = [
    {id: "ET-asd32ha-23ad", nombre: "Oferta", descripcion: "Ofertas de la semana"},
    {id: "ET-xcvweas-12zx", nombre: "Nuevo", descripcion: "Productos nuevos"},
    {id: "ET-hgjyjt3-j5yf", nombre: "SINTACC", descripcion: "Productos libres de gluten"},
  ]

  for (const etiqueta of listado) {
    const span = document.createElement("span")
    span.classList.add("badge", "bg-secondary", "me-1")
    span.textContent = etiqueta.nombre
    contenedor.appendChild(span)
  }
}

function cargarModalEditarProd(producto) {
  // acomodar el html del modal primero y despues con los ID bien puestos hay que
  // traer las etiquetas y categorias disponibles para crear dinamicamnt los checkbox y las options del select
  // una vez esten listos, cargar los datos del prod en el form
}





// function inicializar() {
//   cargarBoton();
//   btnModalGuardarCambios.addEventListener("click", guardarCambios);
// }

// function cargarProductoEnModal(prod) { // carga el prod en el modal
//   modalInputNombre.value = prod.nombre;
//   modalInputDescripcion.value = prod.descripcion;
//   modalInputPrecioMinorista.value = prod.precioMinorista;
//   modalInputPrecioMayorista.value = prod.precioMayorista;
//   modalinputCantMay.value = prod.cantmin;
//   modalInputStock.value = prod.stock;
//   modalSelectCategoria.value = prod.categoria;
//   // modalSelectEtiqueta.value = prod.etiquetas;
// }
// function editarProd() {
//   cargarProductoEnModal(productoEj);
// }

// function guardarCambios() {
//   const nombre = modalInputNombre.value;
//   const descripcion = modalInputDescripcion.value;
//   const precio = modalInputPrecio.value;
//   const stock = modalInputStock.value;
//   const categoria = modalSelectCategoria.value;
//   const etiquetas = modalSelectEtiqueta.value;

//   const prodActualizado = {
//     nombre,
//     descripcion,
//     precio,
//     stock,
//     categoria,
//     etiquetas,
//   };
//   modificarProducto(prodActualizado);
// }
