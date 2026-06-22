export function agregarCategoria(objCategoria) {
  const { nombre, descripcion } = objCategoria;
  const listaCategorias = traerTodasLasCategorias();
  const nuevaCategoria = {
    nombre,
    descripcion,
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

  return listaCategorias.find(
    (categoria) => categoria.nombre === nombre
  );
}


export function eliminarCategoria(nombre) {
  const listaCategorias = traerTodasLasCategorias();

  const nuevaLista = listaCategorias.filter(
    (categoria) => categoria.nombre !== nombre
  );

  actualizarListadoCategorias(nuevaLista);
}