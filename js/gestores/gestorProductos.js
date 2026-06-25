import { generarID } from "../utilidades.js";

export function agregarProducto(producto) {
  const listadoProductos = traerTodosLosProductos();
  producto.id = generarID("PROD")
  listadoProductos.push(producto);
  actualizarListadoProductos(listadoProductos);
}

function actualizarListadoProductos(arregloNuevo) {
  localStorage.setItem("productos", JSON.stringify(arregloNuevo));
}

export function traerTodosLosProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

export function buscarProducto(id) {
  const listadoProductos = traerTodosLosProductos();
  return listadoProductos.find((prod) => prod.id === id);
}

export function eliminarProducto(id) {
  const listadoProductos = traerTodosLosProductos();
  const nuevaLista = listadoProductos.filter(prod => prod.id !== id);
  actualizarListadoProductos(nuevaLista);
}

export function modificarProducto(id, nuevoProd) {
  const listadoProductos = traerTodosLosProductos();
  const producto = listadoProductos.find((prod) => prod.id === id);
  if (producto) {
    producto.nombre = nuevoProd.nombre
    producto.descripcion = nuevoProd.descripcion
    producto.precioMinorista = nuevoProd.precioMinorista
    producto.precioMayorista = nuevoProd.precioMayorista
    producto.cantMayorista = nuevoProd.cantMayorista
    producto.stock = nuevoProd.stock
    producto.categoria = nuevoProd.categoria
    producto.etiquetas = nuevoProd.etiquetas
    producto.imagenURL = nuevoProd.imagenURL
  }  
  actualizarListadoProductos(listadoProductos)
}

