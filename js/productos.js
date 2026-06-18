import { autorizacion } from "./gestores/gestorLogin.js";
import { modificarProducto } from "./gestores/gestorProductos.js";
import { cargarDatosNavbar } from "./navbar.js";

const modalInputNombre = document.getElementById("modalInputNombre");
const modalInputDescripcion = document.getElementById("modalInputDescripcion");
const modalInputPrecio = document.getElementById("modalInputPrecio");
const modalInputStock = document.getElementById("modalInputStock");
const modalSelectCategoria = document.getElementById("modalSelectCategoria");
const modalSelectEtiqueta = document.getElementById("modalSelectEtiqueta");
const btnGuardarCambios = document.getElementById("btnGuardarCambios");

const productoEj = {
  idProd: "123",
  nombre: "alfajor rasta",
  descripcion: "alfajor nacional artesanal",
  precioMinorista: 1200,
  precioMayorista: 1000,
  stock: 300,
  categoria: "alfajor",
  etiquetas: "idEtiqueta1",
  imagen: "",
};

window.addEventListener("load", () => {
  autorizacion("Administrador");
  cargarDatosNavbar();
  cargarBoton();
  btnGuardarCambios.addEventListener("click", guardarCambios);
});

function cargarProducto(prod) {
  modalInputNombre.value = prod.nombre;
  modalInputDescripcion.value = prod.descripcion;
  modalInputPrecio.value = prod.precioMinorista;
  modalInputStock.value = prod.stock;
  modalSelectCategoria.value = prod.categoria;
  modalSelectEtiqueta.value = prod.etiquetas;
}
function editarProd() {
  cargarProducto(productoEj);
}

function cargarBoton() {
  const tdBoton = document.getElementById("td-boton");
  const btn = document.createElement("button");
  btn.classList.add("btn", "btn-primary");
  btn.setAttribute("data-bs-toggle", "modal");
  btn.setAttribute("data-bs-target", "#modalFormulario");
  btn.innerHTML = `<i class="bi bi-pencil-square"></i> Editar`;
  btn.addEventListener("click", editarProd);
  tdBoton.appendChild(btn);
}

function guardarCambios() {
  const nombre = modalInputNombre.value;
  const descripcion = modalInputDescripcion.value;
  const precio = modalInputPrecio.value;
  const stock = modalInputStock.value;
  const categoria = modalSelectCategoria.value;
  const etiquetas = modalSelectEtiqueta.value;

  const prodActualizado = {
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    etiquetas,
  };
  modificarProducto(prodActualizado);
}
