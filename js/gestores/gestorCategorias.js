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
  return listaCategorias.find((categoria) => categoria.id === id) || {descripcion: "Sin clasificar"};
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

export function cargarListadoPredeterminadoCategorias() {
  const listado = [
    {
      nombre: "Alfajores",
      descripcion:
        "Alfajores de dos capas de galletitas rellenas con dulce de leche cubiertos en chocolate.",
    },
    {
      nombre: "Gomitas",
      descripcion:
        "Dulces suaves y masticables elaborados principalmente con azúcar.",
    },
    {
      nombre: "Chupetines",
      descripcion:
        "Golosina de caramelo duro o blando que se sostiene mediante un palito",
    },
    {
      nombre: "Chocolates",
      descripcion:
        "Alimento elaborado a partir de las semillas del árbol del cacao.",
    },
    {
      nombre: "Caramelos",
      descripcion:
        "Golosinas populares elaboradas a base de azúcar fundido, agua y jarabe de glucosa.",
    },
  ];
  for (const categoria of listado) {
    const categ = buscarCategoria(categoria.nombre)
    if (!categ) {
      agregarCategoria(categoria);
    }
  }
}