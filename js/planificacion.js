const sesionLocalStorage = localStorage.getItem("sesion");
console.log(sesionLocalStorage);

if (sesionLocalStorage === null) {
  loguear();
} else {
  redirigir(sesionLocalStorage);
}

const usuariosRegistrados = [
  {
    nombre: "pepe",
    contra: "123pepe",
    rol: "usuario",
    carrito: [],
    historial: [],
  },
  {
    nombre: "fabri",
    contra: "bokee123",
    rol: "admin",
  },
  {
    nombre: "tincho",
    contra: "alfajor123",
    rol: "rol",
  },
];
localStorage.setItem("usuarios", usuariosRegistrados);

function loguear() {
  // const nombre = document.getElementById("nombre").value
  // const contra = document.getElementById("contra").value
  // const usuariosLocalStorage = localStorage.getItem("usuarios")
  // // busca el que tiene el mismo nombre
  //     // se fija si coincide la contra
  //     // OK? Crea la sesion
  //     const sesion = {
  //         usuario: nombre,
  //         rol: "admin"
  //     }
  //     localStorage.setItem("sesion", sesion)
  //     // a donde lo mando?
  //     redirigir(sesion)
  //     // si rol es "usuario" => catalogo.html
  //     // si rol es "admin" => usuarios.html
}

function redirigir(sesion) {
  if (sesion.rol === "admin") {
    window.location.href = "./usuarios.html";
  } else {
    window.location.href = "./catalogo.html";
  }
}

/*
------------------------------------------
usuarios.js
*import {agregar, editar, eliminar, traerTodos} from ./gestorUsuarios.js
*import {autenticar} from ./gestorAutenticacion.js

window.onload = () => {
  autenticar()
}
  - registrarUsuario()
    gestorUsuarios.agregar()
    listarUsuarios()
    
  - cambiarEstado()
    gestorUsuarios.editar(estado)
    listarUsuarios()
  
  
  - eliminarUsuario()
    gestorUsuarios.eliminar()
    listarUsuarios()

  -listarUsuarios()
    - traerTodos()
    - genera la tabla con el listado


------------------------------------
gestorUsuarios.js
  - agregar()
  - editar()
  - eliminar()
  - buscar()
  - traerTodos()


--------------------------------------
index.js (login)
*import {autenticar} from ./gestorAutenticacion.js

window.onload = () => {
  autenticar()
}
  - iniciarSesion()
    - trae los valores del form nombre y contraseña
    - llama a la funcion gestorAutenticacion.autenticar(nombre y contraseña)
      - si estaba ok redirijo a la pagina que corresponde por el rol
      - si falla muestra error


----------------------------------
gestorAutenticacion.js
*import {buscar} from ./gestorUsuarios.js


  - autenticar(nombre, contraseña)
    - si existe un usuario con ese nombre con buscar(nombre)
      - si coincide la contraseña con la del usuario
      - si esta todo ok
        - crea una sesion, es un objeto con el nombre y rol del usuario que devolvio antes
          sube al localstorage esto "sesion": "{"nombre": "pepito", "rol": "usuario" }"
       - devuelve el usuario
      - si esta todo mal devuelve vacioo error
    - si esta todo mal devuelve vacio o error

  - cerrarSesion()
    - borrar del localstorage la clave "sesion"

  - estaLogueado(rolHabilitado)
    - se fija en localstorage si existe el "sesion"
      - si no existe el sesion lo manda al login
      - si existe la sesion,
        - se fija si esta habilitado, sino lo redirige
        - se fija si el rol del usuario en la sesion coincide con el rolHabilitado
          - si no coincide el rol lo redirige al correspondiente: 
            - catalogo.html si es usuario 
            - usuarios.html si es admin

----------------------------------
productos.js
*import {agregar, editar, traerTodos} from ./gestorProductos.js
*import {autenticar} from ./gestorAutenticacion.js

window.onload = () => {
  autenticar()
}

  - registrarProducto()
    gestorProductos.agregar()
    listarProductos()
    
  - editarProducto()
      - abre el modal con el formulario lleno de los datos del producto
      - modificas los datos que quieras en el formulario
      - cuando apretas el boton del form, llama gestorProductos.editar(producto, productoCambiado) pasandole por parametro el producto y los cambios
      - llama a listarProductos() para que muestre la lista actualizada
  
  - eliminarProducto()
    gestorProductos.eliminar()
    listarProductos()

  -listarProductos()
    - llama a traerTodos() para que le de un arreglo con todos los productos
    - genera la tabla con los productos del arreglo


----------------------------------
gestorProductos.js

- agregar()

- editar(producto, productoCambiado)
  - busca el producto en localstorage
  - le cambia los valores a los del productoCambiado
  - lo guarda en localstorage

- eliminar()

- buscar(id)

- traerTodos()

-----------------------------------

etiquetas.js
*import {agregar, editar, buscar, eliminar, traerTodos} from ./gestorEtiquetas.js
*import {autenticar} from ./gestorAutenticacion.js

window.onload = () => {
  autenticar()
}


  - registrarEtiqueta()
    gestorEtiquetas.agregar()
    listarEtiquetas()
    
  - editarEtiqueta()
      - abre el modal con el formulario lleno de los datos de la Etiqueta
      - modificas los datos que quieras en el formulario
      - cuando apretas el boton del form, llama gestorEtiquetas.editar(Etiqueta, EtiquetaCambiada) pasandole por parametro la Etiqueta y los cambios
      - llama a listarEtiquetas() para que muestre la lista actualizada
  
  - eliminarEtiqueta()
    gestorEtiquetas.eliminar()
    listarEtiquetas()

  -listarEtiquetas()
    - llama a traerTodos() para que le de un arreglo con todos los Etiquetas
    - genera la tabla con los Etiquetas del arreglo



-----------------------------------
gestorEtiquetas.js
Operaciones CreateReadUpdateDelete
- agregar
- buscar
- traerTodos
- editar
- eliminar

-----------------------------------

Categorias.js
*import {agregar, editar, buscar, eliminar, traerTodos} from ./gestorCategorias.js
*import {autenticar} from ./gestorAutenticacion.js

window.onload = () => {
  autenticar()
}


  - registrarCategoria()
    gestorCategorias.agregar()
    listarCategorias()
    
  - editarCategoria()
      - abre el modal con el formulario lleno de los datos de la Categoria
      - modificas los datos que quieras en el formulario
      - cuando apretas el boton del form, llama gestorCategorias.editar(Categoria, CategoriaCambiada) pasandole por parametro la Categoria y los cambios
      - llama a listarCategorias() para que muestre la lista actualizada
  
  - eliminarCategoria()
    gestorCategorias.eliminar()
    listarCategorias()

  -listarCategorias()
    - llama a traerTodos() para que le de un arreglo con todos los Categorias
    - genera la tabla con los Categorias del arreglo



-----------------------------------
gestorCategorias.js
Operaciones CreateReadUpdateDelete
- agregar
- buscar
- traerTodos
- editar
- eliminar

-----------------------------------
carrito.js
*import {editar, buscar} from ./gestorUsuarios.js
*import {autenticar} from ./gestorAutenticacion.js

window.onload = () => {
  autenticar()
}


- mostrarCarrito
  - trae el carrito con la funcion gestorCarrito.buscar(idCarrito)
  - crea la tabla con la info del carrito traido

-modificarCantidad


- finalizarCompra
  

- vaciarCarrito
  - gestorCarrito.eliminar

- seguirComprando

- mostrarTotal

----------------------------------
gestorCarrito.js
  - agregar
  - buscar
  - editar
  - eliminar


-----------------------------------
catalogo.js




---------------------------------
      Estructuras de datos
---------------------------------


usuario = {
  nombre: "pepito",
  contrasenia: "asdfasd"
  rol: "usuario",
  estado: true,
  carrito: idCarrito
}

producto = {
  idProd,
  nombre,
  descripcion,
  precioMinorista,
  precioMayorista,
  stock,
  categoria,
  etiquetas: [idEtiqueta1, idEtiqueta2],
  imagen
}

etiqueta = {
  idEtiqueta,
  nombre,
  descripcion
}

categoria = {
  nombre,
  descripcion,
}

carrito = {
  idCarrito: 12323,
  usuario: nombreUsuario,
  productos: [
    {
      idProd,
      cant
    },
    {
      idProd,
      cant
    }
  ]
}

sesion = {

}

*/
