import { generarID } from "../utilidades.js";

export function agregarCategoria(objCategoria) {
  const { nombre, descripcion } = objCategoria;
  const listaCategorias = traerTodasLasCategorias();
  const nuevaCategoria = {
    nombre,
    descripcion,
    id: generarID("CAT"),
  };

  listaCategorias.push(nuevaCategoria);

  actualizarListadoCategorias(listaCategorias);
}

function actualizarListadoCategorias(arregloNuevo) {
  localStorage.setItem("categorias", JSON.stringify(arregloNuevo));
}

export function traerTodasLasCategorias() {
  return JSON.parse(localStorage.getItem("categorias")) || [];
}

export function buscarCategoria(nombre) {
  const listaCategorias = traerTodasLasCategorias();
  return listaCategorias.find((categoria) => categoria.nombre === nombre);
}

export function buscarCategoriaPorID(id) {
  const listaCategorias = traerTodasLasCategorias();
  return listaCategorias.find((categoria) => categoria.id === id);
}

export function modificarCategoria(id, obj) {
  const listaCategorias = traerTodasLasCategorias();

  for (const categoria of listaCategorias) {
    if (categoria.id === id) {
      categoria.nombre = obj.nombre;
      categoria.descripcion = obj.descripcion;
    }
  }

  actualizarListadoCategorias(listaCategorias);
}

export function eliminarCategoria(id) {
  const listaCategorias = traerTodasLasCategorias();

  const nuevaLista = listaCategorias.filter((categoria) => categoria.id !== id);

  actualizarListadoCategorias(nuevaLista);
}

export function borrarTodasLasCategorias() {
  localStorage.removeItem("categorias");
}
