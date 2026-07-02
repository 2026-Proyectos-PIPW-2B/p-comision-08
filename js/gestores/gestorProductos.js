import { generarID } from "../utilidades.js";
import { buscarCategoria } from "./gestorCategorias.js";
import { buscarEtiqueta } from "./gestorEtiquetas.js";

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

export function buscarProductoPorNombre(nombre) {
  const listadoProductos = traerTodosLosProductos();
  return listadoProductos.find((prod) => prod.nombre === nombre);
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

export function borrarProductos(){
  localStorage.removeItem("productos")
}

export function cargarListadoPredeterminadoProductos() {
  const listado = [
    {
      nombre: "Bon o Bon Clásico 15g",
      descripcion:
        "Oblea rellena con crema de maní y bañado en chocolate con leche.",
      precioMinorista: 900,
      precioMayorista: 750,
      cantMayorista: 24,
      stock: 180,
      categoria: "Chocolates",
      etiquetas: ["Nuevo"],
      imagenURL: "img/bon-o-bon.png",
    },
    {
      nombre: "Jorgito Blanco",
      descripcion:
        "Alfajor de dos tapas con dulce de leche, cobertura de chocolate blanco y baño azucarado.",
      precioMinorista: 1300,
      precioMayorista: 1100,
      cantMayorista: 20,
      stock: 120,
      categoria: "Alfajores",
      etiquetas: ["Nacional", "Oferta"],
      imagenURL: "img/jorgito-blanco.png",
    },
    {
      nombre: "Guaymallén Triple Chocolate",
      descripcion:
        "Alfajor triple relleno con dulce de leche y cubierto con chocolate.",
      precioMinorista: 1600,
      precioMayorista: 1350,
      cantMayorista: 18,
      stock: 95,
      categoria: "Alfajores",
      etiquetas: ["Nacional"],
      imagenURL: "img/guaymallen-triple-chocolate.png",
    },
    {
      nombre: "Mogul Extreme Frutilla",
      descripcion:
        "Gomitas blandas sabor frutilla elaboradas con gelatina y saborizantes frutales.",
      precioMinorista: 2500,
      precioMayorista: 2100,
      cantMayorista: 12,
      stock: 70,
      categoria: "Gomitas",
      etiquetas: ["Oferta"],
      imagenURL: "img/mogul-extreme-frutilla.png",
    },
    {
      nombre: "Mogul Mix Ácido",
      descripcion: "Mix de gomitas con cobertura ácida y sabor frutilla.",
      precioMinorista: 2700,
      precioMayorista: 2300,
      cantMayorista: 12,
      stock: 55,
      categoria: "Gomitas",
      etiquetas: ["Nuevo", "Edición Limitada"],
      imagenURL: "img/mogul-mix-acido.png",
    },
    {
      nombre: "Fini Ositos Veganos",
      descripcion:
        "Gomitas con sabores frutales elaboradas sin ingredientes de origen animal.",
      precioMinorista: 3400,
      precioMayorista: 2900,
      cantMayorista: 10,
      stock: 45,
      categoria: "Gomitas",
      etiquetas: ["Nuevo", "Edición Limitada", "Importado"],
      imagenURL: "img/fini-ositos-veganos.png",
    },
    {
      nombre: "Chupetín Pico Dulce",
      descripcion:
        "Chupetín duro sabor multifruta elaborado con azúcar y saborizantes naturales.",
      precioMinorista: 500,
      precioMayorista: 380,
      cantMayorista: 50,
      stock: 500,
      categoria: "Chupetines",
      etiquetas: ["Oferta", "Nacional"],
      imagenURL: "img/pico-dulce.png",
    },
    {
      nombre: "Chupetín Yummy Pop",
      descripcion:
        "Chupetín de distintos sabores con centro relleno líquido de fruta.",
      precioMinorista: 650,
      precioMayorista: 520,
      cantMayorista: 40,
      stock: 320,
      categoria: "Chupetines",
      etiquetas: ["Nuevo", "Importado"],
      imagenURL: "img/chupetin.png",
    },
    {
      nombre: "Milka Chocolate con Leche 55g",
      descripcion:
        "Tableta de chocolate con leche elaborada con cacao y leche de alta calidad.",
      precioMinorista: 2300,
      precioMayorista: 1950,
      cantMayorista: 15,
      stock: 90,
      categoria: "Chocolates",
      etiquetas: ["Nuevo"],
      imagenURL: "img/milka-chocolate-con-leche.png",
    },
    {
      nombre: "Arcor Butter Toffees",
      descripcion:
        "Caramelos masticables elaborados con leche y manteca, de textura suave y sabor intenso.",
      precioMinorista: 1900,
      precioMayorista: 1600,
      cantMayorista: 20,
      stock: 240,
      categoria: "Caramelos",
      etiquetas: ["Oferta"],
      imagenURL: "img/arcor-butter-toffees.png",
    },
    {
      nombre: "Arcor Caramelos Mentol",
      descripcion:
        "Caramelos duros sabor menta elaborados con aceites esenciales y azúcar.",
      precioMinorista: 1700,
      precioMayorista: 1450,
      cantMayorista: 20,
      stock: 210,
      categoria: "Caramelos",
      etiquetas: ["Oferta", "Edición Limitada"],
      imagenURL: "img/arcor-caramelos-mentol.png",
    },
    {
      nombre: "Chocolate Águila Clásico 100g",
      descripcion:
        "Chocolate semiamargo elaborado con pasta y manteca de cacao, ideal para consumir o cocinar.",
      precioMinorista: 3200,
      precioMayorista: 2700,
      cantMayorista: 10,
      stock: 65,
      categoria: "Chocolates",
      etiquetas: ["Nuevo", "Sin TACC"],
      imagenURL: "img/chocolate-aguila-clasico.png",
    },
  ];

  for (const prod of listado) {
    const produ = buscarProductoPorNombre(prod.nombre);
    if (!produ) {
      let idCateg = buscarCategoria(prod.categoria).id;

      let listaEtiquetasID = [];
      for (const etiqueta of prod.etiquetas) {
        let idEtiq = buscarEtiqueta(etiqueta).id;
        listaEtiquetasID.push(idEtiq);
      }

      prod.categoria = idCateg;
      prod.etiquetas = listaEtiquetasID;

      agregarProducto(prod);
    }
  }
}