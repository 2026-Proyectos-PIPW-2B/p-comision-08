export function agregarEtiqueta(objEtiqueta) {
  const { nombre, descripcion } = objEtiqueta;

  const listaEtiquetas = traerTodasLasEtiquetas();

  const nuevaEtiqueta = {
    nombre,
    descripcion,
  };

  listaEtiquetas.push(nuevaEtiqueta);

  actualizarListadoEtiquetas(listaEtiquetas);
}


function actualizarListadoEtiquetas(arregloNuevo) {
  localStorage.setItem("etiquetas", JSON.stringify(arregloNuevo));
}


export function traerTodasLasEtiquetas() {
  return JSON.parse(localStorage.getItem("etiquetas")) || [];
}


export function buscarEtiqueta(nombre) {
  const listaEtiquetas = traerTodasLasEtiquetas();

  return listaEtiquetas.find(
    (etiqueta) => etiqueta.nombre === nombre
  );
}


export function eliminarEtiqueta(nombre) {
  const listaEtiquetas = traerTodasLasEtiquetas();

  const nuevaLista = listaEtiquetas.filter(
    (etiqueta) => etiqueta.nombre !== nombre
  );

  actualizarListadoEtiquetas(nuevaLista);
}