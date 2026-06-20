

//   {
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
// }

export function agregarProducto(producto) {
  const listadoProductos = traerTodosLosProductos();
  const nuevoProd = producto
  nuevoProd.id = crearID()
  listadoProductos.push(nuevoProd);
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

export function modificarProducto(id, nuevoProd) {
  const listadoProductos = traerTodosLosProductos();
  const producto = listadoProductos.find((prod) => prod.id === id);
  if (producto) {
    producto.nombre = nuevoProd.nombre
    producto.descripcion = nuevoProd.descripcion
    producto.precioMinorista = nuevoProd.precioMinorista
    producto.precioMayorista = nuevoProd.precioMayorista
    producto.cantmin = nuevoProd.cantmin
    producto.stock = nuevoProd.stock
    producto.categoria = nuevoProd.categoria
    producto.etiquetas = nuevoProd.etiquetas
    producto.imagen = nuevoProd.imagen
  }
  actualizarListadoProductos(listadoProductos)
}

export function eliminarProducto(id) {
  const listadoProductos = traerTodosLosProductos();
  const nuevaLista = listadoProductos.filter(
    (prod) => prod.id !== id,
  );
  actualizarListadoProductos(nuevaLista);
}
