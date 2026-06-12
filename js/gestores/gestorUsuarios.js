export function agregarUsuario(nombre, rol, contrasenia) {
  const listaUsuarios = traerTodosLosUsuarios();
  const nuevoUsuario = {
    nombre,
    contrasenia,
    rol,
    estado: true,
    carrito: "",
  };
  listaUsuarios.push(nuevoUsuario);
  actualizarListadoUsuarios(listaUsuarios);
}

function actualizarListadoUsuarios(arregloNuevo) {
  localStorage.setItem("usuarios", JSON.stringify(arregloNuevo));
}

export function traerTodosLosUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

export function buscar(nombre) {
  const listaUsuarios = traerTodosLosUsuarios();
  let encontrado = listaUsuarios.find((usuario) => usuario.nombre === nombre);
  return encontrado;
}

export function eliminarUsuario(nombre) {
  const listaUsuarios = traerTodosLosUsuarios();
  const nuevaLista = listaUsuarios.filter(
    (usuario) => usuario.nombre === nombre,
  );
  actualizarListadoUsuarios(nuevaLista);
}
