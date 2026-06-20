import { autorizacion } from "./gestores/gestorLogin.js";
import { modificarProducto } from "./gestores/gestorProductos.js";
import { cargarDatosNavbar } from "./navbar.js";

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

// const modalInputNombre = document.getElementById("modalInputNombre");
// const modalInputDescripcion = document.getElementById("modalInputDescripcion");
// const modalInputPrecioMinorista = document.getElementById("modalInputPrecioMinorista");
// const modalInputPrecioMayorista = document.getElementById("modalInputPrecioMayorista");
// const modalinputCantMay = document.getElementById("modalinputCantMay");
// const modalInputStock = document.getElementById("modalInputStock");
// const modalSelectCategoria = document.getElementById("modalSelectCategoria");

// const btnModalGuardarCambios = document.getElementById("btnGuardarCambios");

const productoEj = {
  idProd: "123",
  nombre: "alfajor rasta",
  descripcion: "alfajor nacional artesanal",
  precioMinorista: 1200,
  precioMayorista: 1000,
  cantmin: 10,
  stock: 300,
  categoria: "alfajor",
  etiquetas: ["idEtiqueta1"],
  imagen: "",
};

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  inicializar();
});

function inicializar() {
  cargarImagenVistaPrevia();
  selectImagen.addEventListener("change", cargarImagenVistaPrevia);
  inputImgURL.addEventListener("input", cargarImagenVistaPrevia);

  formRegistrarProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    // limpiarEstados()

    const validacion = validarFormRegistrarProd();
    if (validacion.resultado) {
      // formRegistrarProducto.reset()
      // limpiarEstados()
      // registrarProducto(validacion.obj)
      // listarProductos()
      // mensajeExitoso()
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

function limpiarEstados() {}

function registrarProducto(prod) {}

function mensajeExitoso() {}

function validarFormRegistrarProd() {
  const validacion = { resultado: true };

  return validacion;
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

// function cargarBoton() { // esta se va cuando haga la de listar prod, ahi se le agrega al boton editar de c/u
//   const tdBoton = document.getElementById("td-boton");
//   const btn = document.createElement("button");
//   btn.classList.add("btn", "btn-primary");
//   btn.setAttribute("data-bs-toggle", "modal");
//   btn.setAttribute("data-bs-target", "#modalFormulario");
//   btn.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
//   btn.addEventListener("click", editarProd);
//   tdBoton.appendChild(btn);
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
