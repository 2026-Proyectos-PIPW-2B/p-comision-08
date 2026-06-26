import { generarID } from "../utilidades.js";

export function agregarEtiqueta(objEtiqueta) {
  const { nombre, descripcion } = objEtiqueta;

  const listaEtiquetas = traerTodasLasEtiquetas();

  const nuevaEtiqueta = {
    nombre,
    descripcion,
    id: generarID("ETI"),
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

  return listaEtiquetas.find((etiqueta) => etiqueta.nombre === nombre);
}

export function buscarEtiquetaPorID(id) {
  const listaEtiquetas = traerTodasLasEtiquetas();
  return listaEtiquetas.find((etiqueta) => etiqueta.id === id);
}

export function modificarEtiqueta(id, obj) {
  const listaEtiquetas = traerTodasLasEtiquetas();

  for (const etiqueta of listaEtiquetas) {
    if (etiqueta.id === id) {
      etiqueta.nombre = obj.nombre;
      etiqueta.descripcion = obj.descripcion;
    }
  }

  actualizarListadoEtiquetas(listaEtiquetas);
}

export function eliminarEtiqueta(nombre) {
  const listaEtiquetas = traerTodasLasEtiquetas();

  const nuevaLista = listaEtiquetas.filter(
    (etiqueta) => etiqueta.nombre !== nombre,
  );

  actualizarListadoEtiquetas(nuevaLista);
}

export function borrarTodasLasEtiquetas() {
  localStorage.removeItem("etiquetas");
}

export function cargarListadoPredeterminadoEtiquetas() {
  const listado = [
    {
      nombre: "Nuevo",
      descripcion: "Producto nuevo en el catálogo.",
    },
    {
      nombre: "Sin TACC",
      descripcion: "Alimento que no contiene trigo, avena, cebada y centeno.",
    },
    {
      nombre: "Oferta",
      descripcion: "Precio disminuido sobre cierto tiempo.",
    },
    {
      nombre: "Nacional",
      descripcion: "Producto de industria nacional.",
    },
  ];

  for (const etiqueta of listado) {
    const etiq = buscarEtiqueta(etiqueta.nombre)
    if (!etiq) {
      agregarEtiqueta(etiqueta);
    }
  }
}